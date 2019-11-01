import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import generator from "generate-password"

import { User, Channel, Message } from "../models"
import { resetPasswordMail, inviteUserMail, upload } from "../utils"

export default {
	Query: {
		users: async (parent, { pageSize = 2, page = 0 }, context, info) => {
			return await User.find()
				.skip(pageSize * page)
				.limit(pageSize)
		},
		user: async (parent, { id }, context, info) => {
			return await User.findById(id)
		}
	},

	Mutation: {
		test: async (parent, { file, id }, context, info) => {
			// console.log(context.req.headers)
			// console.log("file", file)

			const url = await upload(file, "users/")
			console.log("done->", url)

			return true
		},
		signUp: async (parent, { email, username, password }, context, info) => {
			const hashed = await bcrypt.hash(password, 12)
			const created = await User.create({ email, username, password: hashed })

			const payload = {
				id: created.id,
				username: created.username,
				email: created.email,
				createdAt: created.createdAt,
				role: created.role
			}
			const secret = process.env.JWT_SECRET
			const options = { expiresIn: "7d" }
			const token = jwt.sign(payload, secret, options)
			return { id: created._id, token }
		},

		signIn: async (parent, args, { id }, info) => {
			const query = { _id: id }
			const update = { $set: { activeAt: Date.now() } }
			const options = { new: true, useFindAndModify: false }
			const user = await User.findByIdAndUpdate(query, update, options)

			const payload = {
				id: user.id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				role: user.role,
				activeAt: Date.now()
			}

			const secret = process.env.JWT_SECRET
			const jwtOptions = { expiresIn: "7d" }
			const token = jwt.sign(payload, secret, jwtOptions)
			return { id: user._id, token }
		},

		updateUser: async (parent, args, context, info) => {
			const { id, avatar, username, firstname, lastname, bio, email, newPassword } = args

			let url = null
			if (avatar && typeof avatar === "object") {
				url = await upload(avatar, "users/")
			}

			const updatedAt = Date.now()
			const query = { _id: id }
			const update = {}
			if (username) update.username = username
			update.avatar = url ? url : null
			update.firstname = firstname ? firstname : null
			update.lastname = lastname ? lastname : null
			update.bio = bio ? bio : null
			if (email) update.email = email
			if (newPassword) update.password = await bcrypt.hash(newPassword, 12)
			if (updatedAt) update.updatedAt = updatedAt

			const options = { new: true, useFindAndModify: false }
			const result = await User.findByIdAndUpdate(query, update, options)
			return result !== null
		},

		changeRole: async (parent, { id, role }, context, info) => {
			const query = { _id: id }
			const update = { $set: { role } }
			const options = { new: true, useFindAndModify: false }
			await User.findByIdAndUpdate(query, update, options)
			return true
		},

		suspendUser: async (parent, { id }, context, info) => {
			const user = await User.findById(id)
			const suspend = user.suspended === null || user.suspended === false

			const query = { _id: id }
			const update = { $set: { suspended: suspend ? true : false } }
			const options = { useFindAndModify: false }
			await User.findByIdAndUpdate(query, update, options)
			return true
		},

		comparePasswords: async (parent, { id, password }, context, info) => {
			const user = await User.findById(id)
			return await bcrypt.compare(password, user.password)
		},

		deleteUser: async (parent, { id }, context, info) => {
			const _user = await User.findById(id)

			// delete all references in other private channels and delete channel if it only consits of 2 users
			const references = await Channel.find({ users: { $in: [_user.id] } }).populate("users")
			for (const reference of references) {
				if (reference.users.length < 3) {
					await Channel.findByIdAndDelete({ _id: reference._id })
				}
			}

			// delete all messages
			await Message.deleteMany({ createdBy: id })

			// delete user himself
			await User.findByIdAndDelete(id)

			return true
		},

		resetPasswordMail: async (parent, { email }, context, info) => {
			const user = await User.findOne({ email })

			const password = generator.generate({ length: 10, numbers: true })
			const hashed = await bcrypt.hash(password, 12)

			const query = { _id: user.id }
			const update = { password: hashed }
			const options = { new: true, useFindAndModify: false }
			await User.findByIdAndUpdate(query, update, options)

			resetPasswordMail(email, password)

			return true
		},

		inviteUserMail: async (parent, { email }, { user }, info) => {
			inviteUserMail(email)
			return true
		}
	}
}
