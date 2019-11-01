import { SchemaDirectiveVisitor, AuthenticationError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"

class SensitivDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			console.log("ProtectionDirective", context.user)

			const result = await resolve.call(this, root, args, context, info)

			if (!context.user) return null

			const isAdmin = context.user.role === "admin"
			const isSelf = context.user.id === root._id.toString()

			return isAdmin || isSelf ? result : null
		}
	}
}

export default SensitivDirective
