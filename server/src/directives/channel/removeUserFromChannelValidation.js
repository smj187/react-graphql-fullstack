import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import Channel from "../../models/channel"
import User from "../../models/user"

class RemoveUserFromChannelValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { channelId, userId } = args

			const errors = {}

			const channelExists = await Channel.findById(channelId)
			if (!channelExists) {
				errors.channel = `Could not find channel ${channelId}`
			}

			const user = await User.findById(userId)
			if (!user) {
				errors.user = `Could not find user ${userId}`
			}

			const channel = await Channel.findOne({ users: { $in: userId } })
			if (!channel) {
				errors.channel = `User is not in channel ${channelId}`
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default RemoveUserFromChannelValidation
