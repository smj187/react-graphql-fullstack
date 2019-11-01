import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"

class UpdateConfigValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { image, video, audio, document } = args

			const errors = {}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			if (image < 0 || image > 50000000) {
				errors.image = "Image size must be between 0 and 50000000 kb"
			}

			if (video < 0 || video > 50000000) {
				errors.video = "Video size must be between 0 and 50000000 kb"
			}

			if (audio < 0 || audio > 50000000) {
				errors.audio = "Audio size must be between 0 and 50000000 kb"
			}

			if (document < 0 || document > 50000000) {
				errors.document = "Document size must be between 0 and 50000000 kb"
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			return await resolve.call(this, root, args, context, info)
		}
	}
}

export default UpdateConfigValidation
