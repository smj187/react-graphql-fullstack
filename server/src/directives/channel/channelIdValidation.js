import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import Channel from "../../models/channel"

class ChannelIdValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { id } = args
			console.log("id", id)

			const errors = {}
			const channel = await Channel.findById({ id })
			if (!channel) {
				errors.channel = `Channel with ID ${id} does not exist`
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, { ...args, avatar: stream }, context, info)
		}
	}
}

export default ChannelIdValidation
