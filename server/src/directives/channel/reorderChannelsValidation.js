import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import mongoose from "mongoose"

class ReorderChannelsValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { ids } = args

			const errors = {}
			for (const { id } of ids) {
				if (!mongoose.Types.ObjectId.isValid(id)) {
					errors.id = `${id} is not a valid id`
				}
			}
			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default ReorderChannelsValidation
