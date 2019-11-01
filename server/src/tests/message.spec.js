import { expect } from "chai"

import { request, USER_TOKEN, ADMIN_TOKEN, MODERATOR_TOKEN } from "./database"
import { Channel, Message, User } from "../models"

describe("channels", () => {
	describe("create, get, update, reacto to and delete message", async () => {
		let channel = null
		before(async () => {
			const mutation = `mutation {
        createChannel(name: "public" isLocked: false)
      }`
			await request(mutation, ADMIN_TOKEN)
			channel = await Channel.findOne({ name: "public" })
		}),
			it("create channel message", async () => {
				const mutation = `mutation {
          createMessage(channelId: "${channel._id}" content: "test" tags: ["#test"]) {
            id
            channelId
            content
            tags
            createdBy {
              username
            }
          }
        }`

				const { data } = await request(mutation, USER_TOKEN)
				expect({
					content: data.data.createMessage.content,
					tags: data.data.createMessage.tags
				}).to.eql({ content: "test", tags: ["#test"] })
			}),
			it("update channel message", async () => {
				const message = await Message.findOne({})
				const mutation = `mutation {
          updateMessage(messageId: "${message._id}" content: "updated" tags: null) {
            id
            content
            tags
            createdBy {
              username
            }
          }
        }`

				const { data } = await request(mutation, MODERATOR_TOKEN)
				expect({
					content: data.data.updateMessage.content,
					tags: data.data.updateMessage.tags
				}).to.eql({
					content: "updated",
					tags: null
				})
			}),
			it("get all messages", async () => {
				const query = `query {
          messages(channelId: "${channel._id}") {
            id
            content
            tags
            createdBy {
              username
            }
          }
        }`

				const { data } = await request(query, USER_TOKEN)
				expect(data.data.messages.length).to.eq(1)
			}),
			it("react to message", async () => {
				const message = await Message.findOne({})
				const mutation = `mutation {
          reactToMessage(messageId: "${message._id}" reaction: "rocket") {
            id
						rocket {
							counter
							users
						}
          }
        }`

				const { data } = await request(mutation, USER_TOKEN)
				const { _id } = await User.findOne({ username: "user" })

				expect(data.data.reactToMessage.rocket.counter).to.eq(1)
				expect(data.data.reactToMessage.rocket.users[0].toString()).to.eq(_id.toString())

				const { data: req2 } = await request(mutation, USER_TOKEN)

				expect(req2.data.reactToMessage.rocket.counter).to.eq(0)
				expect(req2.data.reactToMessage.rocket.users.length).to.eq(0)
			}),
			it("delete message", async () => {
				const message = await Message.findOne({})
				const mutation = `mutation {
          deleteMessage(channelId: "${channel._id}" messageId: "${message._id}")
        }`

				await request(mutation, ADMIN_TOKEN)
				const messages = await Message.find({})
				expect(messages.length).to.eq(0)
			})
	})
})
