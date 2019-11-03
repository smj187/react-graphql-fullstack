import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import Channel from "../../models/channel"
import Message from "../../models/message"
import { isLength } from "validator"

class UpdateMessageValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { id, content, tags, file } = args

			const errors = {}
			const message = await Message.findById(id)
			if (!message) {
				errors.message = `Could not find message ${id}`
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			if (!isLength(content, { min: 0, max: 65536 })) {
				errors.content = `This message has reached to maximum amount of characters (65536)`
			}

			if (tags) {
				if (!Array.isArray(tags)) {
					errors.tags = "Invalid format for tags (array required)"
				}

				if (tags.length > 100) {
					errors.tags = "Maximal 100 tags allower per message"
				}

				if (new Set(tags).size !== tags.length) {
					errors.tags = "Tags contain duplicate entries"
				}

				const checked = tags.map(
					t => (typeof t === "string" || t instanceof String) && t.includes("#")
				)
				if (checked.includes(false)) {
					errors.tags = "Tags contain invalid values (# required)"
				}
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default UpdateMessageValidation
