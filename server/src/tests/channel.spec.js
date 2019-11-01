import { expect } from "chai"

import { request, USER_TOKEN, ADMIN_TOKEN, MODERATOR_TOKEN } from "./database"
import { Channel, User } from "../models"

describe("channels", () => {
	describe("public channels", async () => {
		it("create public channel", async () => {
			const mutation1 = `mutation { createChannel(name: "channel #1" isLocked: false) }`
			const mutation2 = `mutation { createChannel(name: "channel #20" isLocked: false) }`
			const mutation3 = `mutation { createChannel(name: "channel #15" isLocked: false) }`
			const mutation4 = `mutation { createChannel(name: "no permission to create" isLocked: false) }`

			await request(mutation1, MODERATOR_TOKEN)
			await request(mutation2, MODERATOR_TOKEN)
			await request(mutation3, ADMIN_TOKEN)
			await request(mutation3, ADMIN_TOKEN)
			const { data } = await request(mutation4, USER_TOKEN)
			expect(data.errors[0].message).to.eq("Request not authorized, MODERATOR ADMIN")

			const channels = await Channel.find({})
			expect(channels.length).to.eq(3)
		}),
			it("update public channel", async () => {
				const channel = await Channel.findOne({ name: "channel #1" })
				const mutation = `mutation {
          updateChannel(id: "${channel._id}" name: "channel #10" isLocked: true)
        }`

				await request(mutation, MODERATOR_TOKEN)
				const updated = await Channel.findById(channel._id)
				expect(updated.name).to.eq("channel #10")
			}),
			it("get public channel details", async () => {
				const channel = await Channel.findOne({ name: "channel #10" })
				const query = `query {
          channel(id: "${channel._id}") {
            id
            name
            isLocked
            avatar
          }
        }`

				const { data } = await request(query, MODERATOR_TOKEN)
				expect(data.data.channel.name).to.eq(channel.name)
			}),
			it("get all public channels", async () => {
				const query = `query {
          channels {
            id
            name
            position
          }
        }`

				const { data } = await request(query, USER_TOKEN)
				expect(data.data.channels.length).to.eq(3)
			}),
			it("reorder channels", async () => {
				const channels = await Channel.find({})
				const mutation = `mutation {
          reorderChannels(ids: [
            {id: "${channels[0]._id}", position: 0},
            {id: "${channels[1]._id}", position: 2},
            {id: "${channels[2]._id}", position: 1},
          ])
        }`

				const { data } = await request(mutation, MODERATOR_TOKEN)
				expect(data.data.reorderChannels).to.be.true
			}),
			it("delete channel", async () => {
				const channel = await Channel.findOne({ name: "channel #10" })
				const mutation = `mutation {
          deleteChannel(channelId: "${channel._id}")
        }`

				await request(mutation, MODERATOR_TOKEN)
				const channels = await Channel.find({})
				expect(channels.length).to.eq(2)
			})
	}),
		describe("private channels", async () => {
			it("create private channel", async () => {
				const partner = await User.findOne({ username: "moderator" })
				const mutation = `mutation {
          createPrivateChannel(partnerId: "${partner._id}")
        }`

				await request(mutation, USER_TOKEN)
				const channels = await Channel.find({ name: null })
				expect(channels.length).to.eq(1)
			}),
				it("get all private channels", async () => {
					const query = `query {
            privateChannels {
              id
              users {
                username
              }
              createdBy {
                username
              }
            }
          }`

					const { data } = await request(query, MODERATOR_TOKEN)
					expect(data.data.privateChannels.length).to.eq(1)
				}),
				it("add to private channel", async () => {
					const channel = await Channel.findOne({ name: null })
					const admin = await User.findOne({ username: "admin" })
					const mutation = `mutation {
            addToPrivateChannel(channelId: "${channel._id}" userId: "${admin._id}")
          }`

					await request(mutation, USER_TOKEN)
					const { users } = await Channel.findById(channel._id)
					expect(users.length).to.eq(3)
				}),
				it("remove from private channel", async () => {
					const channel = await Channel.findOne({ name: null })
					const admin = await User.findOne({ username: "admin" })
					const mutation = `mutation {
            removeFromPrivateChannel(channelId: "${channel._id}" userId: "${admin._id}")
          }`

					await request(mutation, USER_TOKEN)
					const { users } = await Channel.findById(channel._id)
					expect(users.length).to.eq(2)
				}),
				it("delete private channel", async () => {
					const channel = await Channel.findOne({ name: null })
					const mutation = `mutation {
            deletePrivateChannel(channelId: "${channel._id}")
          }`

					await request(mutation, USER_TOKEN)
					const channels = await Channel.find({})
					expect(channels.length).to.eq(2)
				})
		})
})
