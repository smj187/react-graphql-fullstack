import { Schema, model } from "mongoose"

const messageSchema = new Schema(
	{
		channelId: { type: Schema.Types.ObjectId, ref: "Channel" },
		content: { type: String, default: null },
		tags: { type: [String], default: null },
		file: { type: String },
		heart: { counter: { type: Number, default: 0 }, users: { type: [String], default: [] } },
		up: { counter: { type: Number, default: 0 }, users: { type: [String], default: [] } },
		down: { counter: { type: Number, default: 0 }, users: { type: [String], default: [] } },
		laugh: { counter: { type: Number, default: 0 }, users: { type: [String], default: [] } },
		confused: { counter: { type: Number, default: 0 }, users: { type: [String], default: [] } },
		cheer: { counter: { type: Number, default: 0 }, users: { type: [String], default: [] } },
		rocket: { counter: { type: Number, default: 0 }, users: { type: [String], default: [] } },
		eyes: { counter: { type: Number, default: 0 }, users: { type: [String], default: [] } },
		createdBy: { type: Schema.Types.ObjectId, ref: "User" },
		createdAt: { type: Date, default: Date.now },
		updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
		updatedAt: { type: Date }
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
)

export default model("Message", messageSchema)
