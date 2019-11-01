import bcrypt from "bcryptjs"
import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { isEmail, isAlphanumeric, isLength } from "validator"

import User from "../../models/user"
import { fileInformation } from "../../utils"

class UpdateUserValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const {
				id,
				avatar,
				username,
				firstname,
				lastname,
				bio,
				email,
				confirmPassword,
				newPassword
			} = args

			const errors = {}
			let stream
			if (avatar && typeof avatar === "object") {
				const { mimetype, createReadStream, filesize } = await fileInformation(avatar)
				stream = createReadStream()
				const valid = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
				if (!valid.includes(mimetype)) {
					errors.avatar = "Invalid avatar format (jpeg, png or gif required)"
				}
				if (filesize > 150000) {
					errors.avatar = "Image size is limited to 150Kb"
				}
			}
			if (username) {
				const usernameExists = await User.findOne({ username })
				if (usernameExists && usernameExists._id.toString() !== id) {
					errors.username = "This username has already been taken"
				}

				if (!isAlphanumeric(username) || !isLength(username, { min: 4, max: 32 })) {
					errors.username =
						"Username must contain be alphanumberic and between 4 - 32 characters"
				}
			} else {
				errors.username = "Please enter a valid username"
			}

			if (firstname && !isLength(firstname, { min: 0, max: 64 })) {
				errors.firstname = "Firstname must not be longer than 64 characters"
			}

			if (lastname && !isLength(lastname, { min: 0, max: 64 })) {
				errors.lastname = "Firstname must not be longer than 64 characters"
			}

			if (bio && !isLength(bio, { min: 0, max: 65536 })) {
				errors.lastname = "Your biographq must not be longer than 65536 characters"
			}

			if (email) {
				const emailExists = await User.findOne({ email })
				if (emailExists && emailExists._id.toString() !== id) {
					errors.email = "This email already exists with an existing account"
				}

				if (!isEmail(email)) {
					errors.email = "Please provide a valid email address"
				}
			} else {
				errors.email = "Please enter a valid email address"
			}

			if (!confirmPassword && newPassword) {
				errors.confirmPassword = "Please enter your current password"
			}

			if (confirmPassword && !newPassword) {
				errors.newPassword = "Please enter a new password"
			}

			if (newPassword) {
				const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
				if (!re.test(newPassword)) {
					errors.newPassword =
						"The password must contain at least 8 characters, one letter, one number and at one special character of '@$!%*#?&'"
				}
			}

			if (confirmPassword && newPassword) {
				const user = await User.findById(id)
				const valid = await bcrypt.compare(confirmPassword, user.password)
				if (!valid) {
					errors.confirmPassword = "Invalid password, please try again"
				}
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, { ...args, avatar: stream }, context, info)
		}
	}
}

export default UpdateUserValidation
