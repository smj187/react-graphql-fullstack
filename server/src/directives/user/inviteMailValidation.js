import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { isEmail } from "validator"

import User from "../../models/user"

class InviteMailValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { email } = args

			const errors = {}

			if (!isEmail(email)) {
				errors.email = "Please provide a valid email address"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			const exists = await User.findOne({ email })
			if (exists) {
				errors.email = "This user is already registered"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default InviteMailValidation
