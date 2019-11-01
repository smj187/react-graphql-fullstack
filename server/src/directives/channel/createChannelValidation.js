import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { isLength } from "validator"
import Channel from "../../models/channel"

class CreateChannelValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { name } = args

			const errors = {}
			if (!isLength(name, { min: 4, max: 32 })) {
				errors.name = "Name must be alphanumberic and between 4 - 32 characters"
			}

			const nameExists = await Channel.findOne({ name })
			if (nameExists) {
				errors.name = "This name has already been taken"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default CreateChannelValidation
