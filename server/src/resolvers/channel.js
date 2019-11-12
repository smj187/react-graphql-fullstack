import { withFilter } from "apollo-server-express"
import { Channel, Message } from "../models"
import { upload } from "../utils"

export default {
	Query: {
		channels: async (parent, args, context, info) => {
			return await Channel.find({ isPrivate: null })
				.populate("createdBy")
				.populate("updatedBy")
				.sort({ position: "ascending" })
		},
		publicChannels: async (parent, args, context, info) => {
			console.time()
			const channels = await Channel.find({ isPrivate: null }).sort({ position: "ascending" })
			return channels

			const asyncFunc = async channel => {
				let message = null
				if (channel.messages[0]) {
					message = await Message.findById(channel.messages[0]).populate("createdBy")
				}

				return {
					name: channel.name,
					avatar: channel.avatar,
					id: channel._id,
					content: message ? message.content : null,
					createdBy: message ? message.createdBy.username : null
				}
			}
			return await Promise.all(channels.map(channel => asyncFunc(channel))).then(data => {
				return data
			})
		},
		privateChannels: async (parent, args, { user }, info) => {
			return await Channel.find({ users: { $in: [user.id] } })
				.populate("createdBy")
				.populate("users")
		},
		channel: async (parent, { id }, context, info) => {
			return await Channel.findById(id)
				.populate("createdBy")
				.populate("updatedBy")
				.populate("users")
		},

		privateChannel: async (parent, { id }, context, info) => {
			return await Channel.findById(id).populate("users")
		}
	},

	Mutation: {
		createChannel: async (parent, { name }, { user }, info) => {
			const position = await Channel.countDocuments()
			const createdBy = user.id
			await Channel.create({ name, isLocked: false, position: position + 1, createdBy })
			return true
		},

		updateChannel: async (parent, { id, name, avatar, isLocked }, { user }, info) => {
			let url = null
			console.log("upload", avatar)

			if (avatar) {
				url = await upload(avatar, "channels/")
				console.log("avatar found")
			}

			const updatedAt = Date.now()
			const updatedBy = user.id
			const query = { _id: id }
			const update = { $set: { name, avatar: url, isLocked, updatedAt, updatedBy } }
			const options = { new: true, useFindAndModify: false }

			await Channel.findByIdAndUpdate(query, update, options)
			setTimeout(() => {
				console.log("updated")
			}, 2000)
			return true
		},

		reorderChannels: async (parent, { ids }, context, info) => {
			const channels = await Channel.find({ name: { $ne: null } })
			channels.forEach(async channel => {
				const query = { _id: channel._id }
				const update = { $set: { position: ids.findIndex(o => channel._id.equals(o.id)) } }
				const options = { new: true, useFindAndModify: false }

				await Channel.findByIdAndUpdate(query, update, options)
			})

			return true
		},

		deleteChannel: async (parent, { id }, context, info) => {
			await Channel.findByIdAndDelete(id)
			return true
		},

		createPrivateChannel: async (parent, { partner }, { user, pubsub }, info) => {
			const isPrivate = true
			const users = [user.id, partner._id]
			const createdBy = user.id
			return await Channel.create({ isPrivate, users, createdBy }).then(r =>
				r
					.populate("users")
					.populate("createdBy")
					.execPopulate()
			)

			// const created = await Channel.findById({ _id: channel._id })
			// 	.populate("users")
			// 	.populate("createdBy")
			// pubsub.publish("NEW_CHANNEL", { newChannel: created, userId: partner._id })

			// return true
		},

		addToPrivateChannel: async (parent, { channelId, userId }, context, info) => {
			const query = { _id: channelId }
			const update = { $push: { users: userId } }
			const options = { new: true, useFindAndModify: false }
			await Channel.findByIdAndUpdate(query, update, options)
			return true
		},

		removeFromPrivateChannel: async (parent, { channelId, userId }, context, info) => {
			const query = { _id: channelId }
			const update = { $pull: { users: userId } }
			const options = { new: true, useFindAndModify: false }
			const result = await Channel.findByIdAndUpdate(query, update, options)
			if (result.users.length < 2) {
				await Channel.findByIdAndDelete(channelId)
			}
			return true
		},

		deletePrivateChannel: async (parent, { channelId }, context, info) => {
			await Channel.findByIdAndDelete(channelId)
			return true
		},
		deleteAllChannels: async (parent, args, context, info) => {
			await Channel.deleteMany({})
			return true
		}
	},

	Subscription: {
		newChannel: {
			subscribe: withFilter(
				(parent, args, { pubsub }, info) => {
					// console.log("@auth?", pubsub)
					return pubsub.asyncIterator("NEW_CHANNEL")
				},
				(payload, variables) => {
					console.log("PAYLOAD-->", payload.userId.toString() === variables.userId)
					return payload.userId.toString() === variables.userId
				}
			)
		}
	}
}
