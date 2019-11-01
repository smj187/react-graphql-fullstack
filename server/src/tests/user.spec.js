import { expect } from "chai"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { request, USER_TOKEN, ADMIN_TOKEN } from "./database"
import { User } from "../models"

describe("users", () => {
	describe("send mail, unauthenticated req, updateAccount, profile", async () => {
		it("send reset password email", async () => {
			const mutation = `mutation {
					resetPasswordMail(email: "user@test.com")
				}`

			const { data } = await request(mutation)
			expect(data.data.resetPasswordMail).to.be.true
		}),
			it("send invite user email", async () => {
				const mutation = `mutation {
					inviteUserMail(email: "not-registered@test.com")
				}`

				const { data } = await request(mutation, USER_TOKEN)
				expect(data.data.inviteUserMail).to.be.true
			}),
			it("compare two passwords", async () => {
				const user = await User.findOne({ username: "user" })
				const mutation = `mutation {
					comparePasswords(id: "${user._id}" password: "passwd12345")
				}`

				const { data } = await request(mutation, USER_TOKEN)
				expect(data.data.comparePasswords).to.be.false // true
			}),
			it("info about some users' profile", async () => {
				const user = await User.findOne({ username: "user" })
				const query = `query {
					user(id: "${user._id}") {
						username
						firstname
						lastname
						bio
						createdAt
					}
				}`

				const { data } = await request(query, USER_TOKEN)
				expect({
					username: data.data.user.username,
					firstname: data.data.user.firstname,
					lastname: data.data.user.lastname,
					bio: data.data.user.bio
				}).to.eql({
					username: "user",
					firstname: null,
					lastname: null,
					bio: null
				})
				expect(data.data.user.createdAt).to.be.not.null
			}),
			it("update user account", async () => {
				const user = await User.findOne({ username: "user" })
				const mutation = `mutation {
					updateUser(
						id: "${user._id}",
						username: "updatedUsername"
						firstname: "firstname",
						lastname: "lastname",
						bio: "some text",
						email: "updated@test.com",
						password: "updated12345"
					)
				}`

				await request(mutation, USER_TOKEN)
				const updated = await User.findById(user._id)

				expect({
					username: updated.username,
					firstname: updated.firstname,
					lastname: updated.lastname,
					bio: updated.bio,
					email: updated.email
				}).to.eql({
					username: "updatedUsername",
					firstname: "firstname",
					lastname: "lastname",
					bio: "some text",
					email: "updated@test.com"
				})
				expect(await bcrypt.compare("updated12345", updated.password)).to.be.true
			})
	}),
		describe("admin:  change role, compare password, deleteUser", async () => {
			let user = null
			before(async () => {
				const mutation = `mutation {
					signUp(email: "delete@test.com", username: "delete", password: "passwd12345") {
						id
						token
					}
				}`
				const { data } = await request(mutation, ADMIN_TOKEN)
				user = await User.findById(data.data.signUp.id)
			}),
				it("change user role", async () => {
					const mutation = `mutation {
						changeRole(id: "${user._id}" role: "moderator")
					}`

					await request(mutation, ADMIN_TOKEN)
					const users = await User.find({})
					const moderators = users.filter(u => u.role === "moderator")
					expect(moderators.length).to.eq(2)
				}),
				it("suspend account", async () => {
					const mutation = `mutation {
						suspendUser(id: "${user._id}")
					}`

					await request(mutation, ADMIN_TOKEN)
					const users = await User.find({})
					const suspended = users.filter(u => u.suspended === true)
					expect(suspended.length).to.eq(1)
				}),
				it("delete user account", async () => {
					const before = await User.find({})
					const mutation = `mutation {
						deleteUser(id: "${user.id}")
					}`

					await request(mutation, ADMIN_TOKEN)
					const after = await User.find({})
					expect(before.length - 1).to.eq(after.length)
				})
		})
})
