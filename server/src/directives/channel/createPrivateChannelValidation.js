import { SchemaDirectiveVisitor, ApolloError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import User from "../../models/user"
import Channel from "../../models/channel"

class CreatePrivateChannelValidation extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async function(root, args, context, info) {
			const { partnerId } = args
			const { user } = context

			const errors = {}
			if (partnerId === user.id) {
				errors.partnerId = `Could not create a channel with yourself ${partnerId}`
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			const partner = await User.findById(partnerId)

			if (!partner) {
				errors.partnerId = `Could not find a user for ${partnerId}`
			}

			// const channel = await Channel.findOne({ users: { $in: [partnerId] } })
			const channels = await Channel.find({
				users: { $size: 2 },
				$or: [
					{
						createdBy: user.id
					},
					{ createdBy: partnerId }
				]
			})
			if (channels.length > 0) {
				errors.partnerId = `Private channel already exists`
			}

			if (Object.keys(errors).length > 0) {
				throw new ApolloError("Server Validation", { errors })
			}

			console.log("CreatePrivateChannelValidation")

			return await resolve.call(this, root, { ...args, partner }, context, info)
		}
	}
}

export default CreatePrivateChannelValidation
