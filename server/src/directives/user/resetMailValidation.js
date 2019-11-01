import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { isEmail } from "validator"

import User from "../../models/user"

class ResetMailValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { email } = args
			const errors = {}

			if (email) {
				const exists = await User.findOne({ email })
				if (!exists) {
					errors.email = "No user with this email exists"
				}

				if (!isEmail(email)) {
					errors.email = "Please provide a valid email address"
				}
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default ResetMailValidation
