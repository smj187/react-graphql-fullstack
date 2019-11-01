import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { isEmail } from "validator"
import bcrypt from "bcryptjs"
import User from "../../models/user"

class SignInValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { email, password } = args

			const errors = {}
			if (!isEmail(email)) {
				errors.email = "Please provide a valid email address"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			const found = await User.findOne({ email })

			if (!found) {
				errors.email = "No user with this email address found"
			} else {
				const match = await bcrypt.compare(password, found.password)
				if (!match) {
					errors.password = "Password not correct"
				}
			}

			if (found && found.suspended) {
				errors.email = "This account is suspended and cannot be used"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, { id: found.id }, info)
		}
	}
}

export default SignInValidation
