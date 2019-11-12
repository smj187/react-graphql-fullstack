import { SchemaDirectiveVisitor, AuthenticationError, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import Message from "../../models/message"
import Channel from "../../models/channel"

class RestrictionDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { user: reqUser } = context

			const isUser = reqUser.role === "user"
			const isMod = reqUser.role === "moderator"
			const isAdmin = reqUser.role === "admin"

			// CONFIG
			const isConfig = info.path.key === "config" || info.path.key === "updateConfig"

			if (isConfig) {
				if (!isAdmin) {
					throw new AuthenticationError("Request not authorized, ADMIN")
				}
			}

			// MESSAGES
			const isDeleteMessage = info.path.key === "deleteMessage"
			const isUpdateMessage = info.path.key === "updateMessage"
			const isPrivateMessage = info.path.key === "messages"

			if (isPrivateMessage) {
				const channel = await Channel.findById(args.id)
				if (!channel) {
					throw new ApolloError(`Could not find chanenl ${args.id}`)
				}

				if (channel.isPrivate) {
					const { createdBy, users } = channel

					const isCreator = createdBy._id.toString() === reqUser.id
					const isMember = users.map(u => u.toString()).includes(reqUser.id)

					if (!isCreator && !isMember) {
						throw new AuthenticationError("Request not authorized, CHANNEL MEMBER")
					}
				}
			}

			if (isDeleteMessage || isUpdateMessage) {
				const message = await Message.findById(args.id)
				if (!message) {
					throw new AuthenticationError(`No such message with ID ${args.id}`)
				}
				const isOwner = message.createdBy.toString() === reqUser.id
				if (isUser && !isOwner) {
					throw new AuthenticationError("Request not authorized, OWNER MODERATOR ADMIN")
				}
			}

			// USERS
			const isUsers = info.path.key === "users"
			const isUpdateUser = info.path.key === "updateUser"
			const isChangeRole = info.path.key === "changeRole"
			const isComparePasswords = info.path.key === "comparePasswords"
			const isDeleteUser = info.path.key === "deleteUser"

			if (isUsers || isChangeRole) {
				if (!isAdmin) {
					throw new AuthenticationError("Request not authorized, ADMIN")
				}
			}
			if (isUpdateUser || isComparePasswords) {
				const isMe = args.id === reqUser.id
				console.log(args.id)

				if (!isMe) {
					throw new AuthenticationError("Request not authorized, SELF")
				}
			}
			if (isDeleteUser) {
				const isMe = args.id === reqUser.id
				if (!isMe && !isAdmin) {
					throw new AuthenticationError("Request not authorized, SELF ADMIN")
				}
			}

			// CHANNELS
			const isDeleteChannel = info.path.key === "deleteChannel"
			const isReorderChannels = info.path.key === "reorderChannels"
			const isUpdateChannel = info.path.key === "updateChannel"
			const isCreateChannel = info.path.key === "createChannel"
			const isDeletePrivateChannel = info.path.key === "deletePrivateChannel"
			const isAddToPrivateChannel = info.path.key === "addToPrivateChannel"
			const isRemoveFromPrivateChannel = info.path.key === "removeFromPrivateChannel"

			if (isAddToPrivateChannel || isRemoveFromPrivateChannel) {
				const channel = await Channel.findById(args.channelId)
				const isMember = channel.users.includes(reqUser.id)
				const isCreator = channel.createdBy._id.toString() === reqUser.id
				if (!isCreator && !isMember) {
					throw new AuthenticationError("Request not authorized, NO MEMBER")
				}
			}

			if (isDeletePrivateChannel) {
				const channel = await Channel.findById(args.channelId)
				const isCreator = channel.createdBy._id.toString() === reqUser.id
				if (!isCreator) {
					throw new AuthenticationError("Request not authorized, NOT CREATOR")
				}
			}

			if (isDeleteChannel || isReorderChannels || isUpdateChannel || isCreateChannel) {
				if (!isAdmin && !isMod) {
					throw new AuthenticationError("Request not authorized, MODERATOR ADMIN")
				}
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default RestrictionDirective
