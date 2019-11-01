import { expect } from "chai"

import { request, ADMIN_TOKEN } from "./database"
import { Config } from "../models"

describe("config", () => {
	describe("get config, update config", async () => {
		it("gets all the default config", async () => {
			const query = `query {
				config {
					image
					video
					audio
					document
					createdAt
					updatedAt
					updatedBy {
						username
					}
				}
			}`

			const { data } = await request(query, ADMIN_TOKEN)
			expect({
				image: data.data.config.image,
				video: data.data.config.video,
				audio: data.data.config.audio,
				document: data.data.config.document,
				updatedAt: data.data.config.updatedAt,
				updatedBy: data.data.config.updatedBy
			}).to.eql({
				image: 500,
				video: 8000,
				audio: 2000,
				document: 1000,
				updatedAt: null,
				updatedBy: null
			})
		}),
			it("updates all the config", async () => {
				const mutation = `mutation {
					updateConfig(image: 501 video: 8001 audio: 2001 document: 1001)
				}`

				await request(mutation, ADMIN_TOKEN)
				const config = await Config.findOne({})
				expect({
					image: config.image,
					video: config.video,
					audio: config.audio,
					document: config.document
				}).to.eql({
					image: 501,
					video: 8001,
					audio: 2001,
					document: 1001
				})
			})
	})
})
