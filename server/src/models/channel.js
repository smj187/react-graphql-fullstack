import { Schema, model } from "mongoose"

const channelSchema = new Schema(
	{
		name: { type: String, default: null },
		avatar: { type: String, default: null },
		isLocked: { type: Boolean, default: null },
		isPrivate: { type: Boolean, default: null },
		position: { type: Number, default: 0 },
		users: [{ type: Schema.Types.ObjectId, ref: "User", default: null }],
		messages: [{ type: Schema.Types.ObjectId, ref: "Message", default: null }],
		createdAt: { type: Date, default: Date.now },
		createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
		updatedAt: { type: Date, default: null },
		updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
)
export default model("Channel", channelSchema)
