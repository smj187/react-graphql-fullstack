import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { isEmail, isAlphanumeric, isLength } from "validator"
import User from "../../models/user"

class SignUpValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { email, username, password } = args

			const errors = {}
			if (!isEmail(email)) {
				errors.email = "Please provide a valid email address"
			}

			if (!isAlphanumeric(username) || !isLength(username, { min: 4, max: 32 })) {
				errors.username = "Username must be alphanumberic and between 4 - 32 characters"
			}
			const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
			if (!re.test(password)) {
				errors.password =
					"The password must contain at least 8 characters, one letter, one number and at one special character of '@$!%*#?&'"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			const emailExists = await User.findOne({ email })
			if (emailExists) {
				errors.email = "This email already exists with an existing account"
			}
			const usernameExists = await User.findOne({ username })
			if (usernameExists) {
				errors.username = "This username has already been taken"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default SignUpValidation
