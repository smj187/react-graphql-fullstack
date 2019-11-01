import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"

class ChangeRoleValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { role } = args
			if (role !== "admin" && role !== "moderator" && role !== "user") {
				throw new ApolloError("Server Validation", {
					errors: { role: "Invalid user type format" }
				})
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default ChangeRoleValidation
