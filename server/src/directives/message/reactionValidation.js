import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import Channel from "../../models/channel"
import Config from "../../models/config"
import { isLength } from "validator"

class ReactionValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { messageId, reaction } = args
			const { user } = context

			const errors = {}

			if (
				reaction !== "heart" &&
				reaction !== "up" &&
				reaction !== "down" &&
				reaction !== "laugh" &&
				reaction !== "confused" &&
				reaction !== "cheer" &&
				reaction !== "rocket" &&
				reaction !== "eyes"
			) {
				errors.reaction = "Invalid reaction format"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default ReactionValidation
