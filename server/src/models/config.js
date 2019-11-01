import { Schema, model } from "mongoose"

const configSchema = new Schema(
	{
		image: { type: Number, default: 500 },
		video: { type: Number, default: 8000 },
		audio: { type: Number, default: 2000 },
		document: { type: Number, default: 1000 },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: null },
		updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
)

export default model("Config", configSchema)
