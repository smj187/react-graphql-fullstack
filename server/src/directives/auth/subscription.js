import { SchemaDirectiveVisitor, AuthenticationError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import Channel from "../../models/channel"

class SubscriptionDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			if (!context.connection.context.user) {
				throw new AuthenticationError("Invalid/Expired token. Please sign in again.")
			}

			const isMessageSubscription = info.path.key === "newMessage"
			const channel = await Channel.findById(context.connection.variables.id)
			if (isMessageSubscription && channel.isPrivate) {
				console.log("isPrivate")
				const { createdBy, users } = channel
				const reqUser = context.connection.context.user

				const isCreator = createdBy._id.toString() === reqUser.id
				const isMember = users.map(u => u.toString()).includes(reqUser.id)

				if (!isCreator && !isMember) {
					throw new AuthenticationError("Request not authorized, CHANNEL MEMBER")
				}
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default SubscriptionDirective
