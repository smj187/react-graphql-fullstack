import { SchemaDirectiveVisitor, AuthenticationError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			if (!context.user) {
				throw new AuthenticationError("Invalid/Expired token. Please sign in again.")
			}
			// console.log("AUTH REQ FROM", context.user.username, "<-- -->", context.user.id)

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default AuthDirective
