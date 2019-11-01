import { Schema, model } from "mongoose"

const userSchema = new Schema(
	{
		username: { type: String, default: null },
		password: { type: String, default: null },
		email: { type: String, default: null },
		role: { type: String, enum: ["user", "moderator", "admin"], default: "user" },
		suspended: { type: Boolean, default: null },
		avatar: { type: String, default: null },
		firstname: { type: String, default: null },
		lastname: { type: String, default: null },
		bio: { type: String, default: null },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: null },
		activeAt: { type: Date, default: Date.now }
	},
	{ timestamps: { createdAt: true, updatedAt: false, activeAt: true } }
)

export default model("User", userSchema)
