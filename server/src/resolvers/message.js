import { withFilter } from "apollo-server-express"
import { Channel, Message } from "../models"
import { upload } from "../utils"

export default {
	Query: {
		messages: async (parent, { id, pageSize = 100, page = 0 }, context, info) => {
			const messages = await Message.find({ channelId: id })
				.populate("createdBy")
				.sort({ createdAt: 1 })
				.skip(pageSize * page)
				.limit(pageSize)

			return messages.map(message => {
				if (message._doc.tags && message._doc.tags.length === 0) delete message._doc.tags
				if (message._doc.heart.counter === 0) delete message._doc.heart
				if (message._doc.up.counter === 0) delete message._doc.up
				if (message._doc.down.counter === 0) delete message._doc.down
				if (message._doc.laugh.counter === 0) delete message._doc.laugh
				if (message._doc.confused.counter === 0) delete message._doc.confused
				if (message._doc.cheer.counter === 0) delete message._doc.cheer
				if (message._doc.rocket.counter === 0) delete message._doc.rocket
				if (message._doc.eyes.counter === 0) delete message._doc.eyes
				return { ...message._doc, id: message._id }
			})
		},
		message: async (parent, { id }, content, info) => {
			return await Message.findById(id).populate("createdBy")
		}
	},
	Mutation: {
		fileTest: async (parent, { stream, type }, context, info) => {
			const url = await upload(stream, "messages/", type)
			console.log("done->", url)

			return true
		},
		createMessage: async (parent, args, context, info) => {
			console.time()
			const { id, content, tags, stream, type } = args
			const { user, pubsub } = context
			const message = await Message.create({
				channelId: id,
				content,
				tags,
				createdBy: user.id
			}).then(message => message.populate("createdBy").execPopulate())

			// add file to message
			if (stream) {
				// upload(stream, "messages/", type).then(() => console.log("done"))
				const url = await upload(stream, "messages/", type)
				const query = { _id: message.id }
				const update = { $set: { file: { url, format: type } } }
				const options = { new: true, useFindAndModify: false }
				const file = await Message.findByIdAndUpdate(query, update, options).then(message =>
					message.populate("createdBy").execPopulate()
				)
				pubsub.publish("NEW_MESSAGE", { newMessage: file })
				return file
			} else {
				pubsub.publish("NEW_MESSAGE", { newMessage: message })
			}
			console.timeEnd()
			return message
		},
		updateMessage: async (parent, { id, content, tags }, { user }, info) => {
			const updatedBy = user.id
			const updatedAt = Date.now()

			const query = { _id: id }
			const update = { $set: { content, tags, updatedBy, updatedAt } }
			const options = { new: true, useFindAndModify: false }
			await Message.findByIdAndUpdate(query, update, options)
			return true
		},

		reactToMessage: async (parent, { id, reaction }, { user }, info) => {
			const message = await Message.findById(id)

			const addReaction = async (inc, push) => {
				const query = { _id: id }
				const update = { $inc: inc, $push: push }
				const options = { new: true, useFindAndModify: false }
				return await Message.findByIdAndUpdate(query, update, options)
			}

			const removeReaction = async (dec, pull) => {
				const query = { _id: id }
				const update = {
					$inc: dec,
					$pull: pull
				}
				const options = { new: true, useFindAndModify: false }
				return await Message.findByIdAndUpdate(query, update, options)
			}

			if (reaction === "heart") {
				return !message[reaction].users.includes(user.id)
					? await addReaction({ "heart.counter": 1 }, { "heart.users": user.id })
					: await removeReaction({ "heart.counter": -1 }, { "heart.users": user.id })
			} else if (reaction === "up") {
				return !message[reaction].users.includes(user.id)
					? await addReaction({ "up.counter": 1 }, { "up.users": user.id })
					: await removeReaction({ "up.counter": -1 }, { "up.users": user.id })
			} else if (reaction === "down") {
				return !message[reaction].users.includes(user.id)
					? await addReaction({ "down.counter": 1 }, { "down.users": user.id })
					: await removeReaction({ "down.counter": -1 }, { "down.users": user.id })
			} else if (reaction === "laugh") {
				return !message[reaction].users.includes(user.id)
					? await addReaction({ "laugh.counter": 1 }, { "laugh.users": user.id })
					: await removeReaction({ "laugh.counter": -1 }, { "laugh.users": user.id })
			} else if (reaction === "confused") {
				return !message[reaction].users.includes(user.id)
					? await addReaction({ "confused.counter": 1 }, { "confused.users": user.id })
					: await removeReaction(
							{ "confused.counter": -1 },
							{ "confused.users": user.id }
					  )
			} else if (reaction === "cheer") {
				return !message[reaction].users.includes(user.id)
					? await addReaction({ "cheer.counter": 1 }, { "cheer.users": user.id })
					: await removeReaction({ "cheer.counter": -1 }, { "cheer.users": user.id })
			} else if (reaction === "rocket") {
				return !message[reaction].users.includes(user.id)
					? await addReaction({ "rocket.counter": 1 }, { "rocket.users": user.id })
					: await removeReaction({ "rocket.counter": -1 }, { "rocket.users": user.id })
			} else if (reaction === "eyes") {
				return !message[reaction].users.includes(user.id)
					? await addReaction({ "eyes.counter": 1 }, { "eyes.users": user.id })
					: await removeReaction({ "eyes.counter": -1 }, { "eyes.users": user.id })
			}
		},

		deleteMessage: async (parent, { id }, context, info) => {
			const res = await Message.findByIdAndDelete(id)
			return res !== null
		},

		clearOutChannel: async (parent, { id }, context, info) => {
			await Message.deleteMany()

			await Channel.findByIdAndUpdate(
				{ _id: id },
				{ $set: { messages: [] } },
				{ new: true, useFindAndModify: false }
			)

			return true
		}
	},

	Subscription: {
		newMessage: {
			subscribe: withFilter(
				(parent, args, { pubsub }, info) => pubsub.asyncIterator("NEW_MESSAGE"),
				({ newMessage }, { id }) => newMessage.channelId.equals(id)
			)
		}
	}
}

// // create the message
// const createdBy = user.id
// let file = null

// if (stream) {
// 	file = {
// 		url: await upload(stream, "messages/", type),
// 		format: type
// 	}
// }
// const create = { channelId: id, content, tags, file, createdBy }
// Object.keys(create).forEach(key => create[key] == null && delete create[key])
// const message = await Message.create(create).then(message =>
// 	message.populate("createdBy").execPopulate()
// )

// // push message to channel
// const channelQuery = { _id: id }
// const push = { $set: { messages: message } }
// const options = { new: true, useFindAndModify: false }
// Channel.findByIdAndUpdate(channelQuery, push, options).exec()

// // tell pubsub a new message has arived
// Message.findById({ _id: message._id })
// 	.populate("createdBy")
// 	.exec((_, createdMessage) => {
// 		if (createdMessage) {
// 			pubsub.publish("NEW_MESSAGE", {
// 				newMessage: createdMessage,
// 				id: id
// 			})
// 		}
// 	})

// console.timeEnd()
// return message
