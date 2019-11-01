import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import Channel from "../../models/channel"
import Config from "../../models/config"
import { isLength } from "validator"

import { fileInformation } from "../../utils"

class CreateMessageValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { id, content, tags, file } = args
			const { user } = context

			const errors = {}

			if (!content && !tags && !file) {
				errors.channel = `Could not create an empty message`
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			const channel = await Channel.findById(id)
			if (!channel) {
				errors.channel = `Could not find channel ${id}`
			}

			if (channel && channel.isPrivate) {
				const isCreator = channel.createdBy._id.toString() === user.id
				const isMember = channel.users.includes(user.id)
				if (!isCreator && !isMember) {
					errors.channel = `Not authorized to write to channel ${id}`
				}
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			if (content && !isLength(content, { min: 0, max: 65536 })) {
				errors.content = `This message has reached to maximum amount of characters (65536)`
			}

			if (tags) {
				if (!Array.isArray(tags)) {
					errors.tags = "Invalid format for tags (array required)"
				}

				if (tags.length > 100) {
					errors.tags = "Maximal 100 tags allower per message"
				}

				if (new Set(tags).size !== tags.length) {
					errors.tags = "Tags contain duplicate entries"
				}

				const checked = tags.map(
					t => (typeof t === "string" || t instanceof String) && t.includes("#")
				)
				if (checked.includes(false)) {
					errors.tags = "Tags contain invalid values (# required)"
				}
			}

			let stream
			let type
			if (file) {
				const { image, video, audio, document } = await Config.findOne({})
				const { mimetype, createReadStream, filesize } = await fileInformation(file)
				stream = createReadStream()
				if (mimetype.includes("image/")) {
					type = "image"
					if (filesize > image * 1000) {
						errors.file = `Image size is too big. Limit: ${image} kb`
					}
				} else if (mimetype.includes("video/")) {
					type = "video"
					if (filesize > video * 1000) {
						errors.file = `Video size is too big. Limit: ${video} kb`
					}
				} else if (mimetype.includes("audio/")) {
					type = "audio"
					if (filesize > audio * 1000) {
						errors.file = `Audio size is too big. Limit: ${audio} kb`
					}
				} else {
					type = "document"
					if (!mimetype.includes("application/") && !mimetype.includes("text/")) {
						errors.file = `Invalid file format: ${mimetype}`
					}

					if (filesize > document * 1000) {
						errors.file = `Document size is too big. Limit: ${document} kb`
					}
				}
			}
			console.log(errors)

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, { ...args, stream, type }, context, info)
		}
	}
}

export default CreateMessageValidation
