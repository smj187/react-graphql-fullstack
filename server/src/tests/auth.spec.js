import { expect } from "chai"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { request, SET_ADMIN_TOKEN, SET_MODERATOR_TOKEN, SET_USER_TOKEN } from "./database"
import { User } from "../models"

describe("auth", () => {
	let userToken = null
	let moderatorToken = null
	let adminToken = null
	describe("signUp, signIn, unauthorized request, unauthenticated request, authorized and authenticated", async () => {
		it("sign up as user", async () => {
			const mutation = `mutation {
				signUp(email: "user@test.com", username: "user", password: "passwd12345") {
					id
					token
				}
      }`

			const { data } = await request(mutation)
			SET_USER_TOKEN(data.data.signUp.token)
			userToken = data.data.signUp.token
			const users = await User.find({})
			expect(users.length).to.eq(1)
		}),
			it("sign up as moderator", async () => {
				const mutation = `mutation {
          signUp(email: "moderator@test.com", username: "moderator", password: "passwd12345") {
            id
            token
          }
        }`

				const { data } = await request(mutation)
				const query = { _id: data.data.signUp.id }
				const update = { $set: { role: "moderator" } }
				const options = { useFindAndModify: false }
				await User.findByIdAndUpdate(query, update, options)
				const users = await User.find({})
				expect(users.length).to.eq(2)
			}),
			it("sign up as admin", async () => {
				const mutation = `mutation {
          signUp(email: "admin@test.com", username: "admin", password: "passwd12345") {
            id
            token
          }
        }`

				const { data } = await request(mutation)
				const query = { _id: data.data.signUp.id }
				const update = { $set: { role: "admin" } }
				const options = { useFindAndModify: false }
				await User.findByIdAndUpdate(query, update, options)
				const users = await User.find({})
				expect(users.length).to.eq(3)
			}),
			it("sign in as moderator", async () => {
				const mutation = `mutation {
          signIn(email: "moderator@test.com", password: "passwd12345") {
            id
            token
          }
        }`

				const { data } = await request(mutation)
				SET_MODERATOR_TOKEN(data.data.signIn.token)
				moderatorToken = data.data.signIn.token
				const moderator = jwt.verify(data.data.signIn.token, process.env.JWT_SECRET)
				expect({
					id: moderator.id,
					username: moderator.username,
					role: moderator.role
				}).to.eql({
					id: data.data.signIn.id,
					username: "moderator",
					role: "moderator"
				})
			}),
			it("sign in as admin", async () => {
				const mutation = `mutation {
          signIn(email: "admin@test.com", password: "passwd12345") {
            id
            token
          }
        }`

				const { data } = await request(mutation)
				SET_ADMIN_TOKEN(data.data.signIn.token)
				adminToken = data.data.signIn.token
				const admin = jwt.verify(data.data.signIn.token, process.env.JWT_SECRET)
				expect({
					id: admin.id,
					username: admin.username,
					role: admin.role
				}).to.eql({
					id: data.data.signIn.id,
					username: "admin",
					role: "admin"
				})
			}),
			it("unauthorized request", async () => {
				const query = `query {
		    users {
		      id
		      username
		    }
		  }`

				const userResponse = await request(query, userToken)
				expect(userResponse.data.errors[0].message).to.eq("Request not authorized, ADMIN")
				const modResponse = await request(query, moderatorToken)
				expect(modResponse.data.errors[0].message).to.eq("Request not authorized, ADMIN")
				const adminResponse = await request(query, adminToken)
				expect(adminResponse.data.data.users.length).to.eq(2)
			}),
			it("unauthenticated request", async () => {
				const query = `query {
		    users {
		      id
		      username
		    }
		  }`

				const { data } = await request(query, null)
				expect(data.errors[0].message).to.eq("Invalid/Expired token. Please sign in again.")
			}),
			it("authorized and authenticated request", async () => {
				const query = `query {
		    users {
		      id
		      username
		    }
		  }`
				const { data } = await request(query, adminToken)
				expect(data.data.users.length).to.eq(2)
			})
	})
})
