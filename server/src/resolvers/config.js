import { Config } from "../models"

export default {
	Query: {
		config: async (parent, args, context, info) => {
			const config = await Config.findOne({}).populate("updatedBy")
			if (!config) {
				return await Config.create({})
			}
			return config
		}
	},
	Mutation: {
		updateConfig: async (parent, args, { user }, info) => {
			const { id } = await Config.findOne({})
			const { image, video, audio, document } = args
			const updatedAt = Date.now()
			const updatedBy = user.id

			const query = { _id: id }
			const update = { $set: { image, video, audio, document, updatedAt, updatedBy } }
			const options = { new: true, useFindAndModify: false }
			await Config.findByIdAndUpdate(query, update, options)
			return true
		}
	}
}
