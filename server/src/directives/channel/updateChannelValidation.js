import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { isLength } from "validator"
import Channel from "../../models/channel"

import { fileInformation } from "../../utils"

class UpdateChannelValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { id, name, avatar, isLocked } = args

			const errors = {}

			let stream
			console.log("avatar", avatar)

			if (avatar && typeof avatar === "object") {
				const { mimetype, createReadStream, filesize } = await fileInformation(avatar)
				stream = createReadStream()
				const valid = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
				if (!valid.includes(mimetype)) {
					errors.avatar = "Invalid file format (jpeg, png or gif required)"
				}
				if (filesize > 150000) {
					errors.avatar = "Image size is limited to 150Kb"
				}
			}
			if (!isLength(name, { min: 4, max: 32 })) {
				errors.name = "Name must be alphanumberic and between 4 - 32 characters"
			}

			const channel = await Channel.findOne({ name })
			if (channel && channel._id.toString() !== id) {
				errors.name = "Name has already been taken"
			}

			if (typeof isLocked !== "boolean") {
				errors.isLocked = "Invalid type, true or false required"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, { ...args, avatar: stream }, context, info)
		}
	}
}

export default UpdateChannelValidation
