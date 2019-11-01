import "dotenv/config"
import mongoose from "mongoose"
import axios from "axios"

export const SERVER_URL = process.env.SERVER_URL

export let ADMIN_TOKEN = null
export let USER_TOKEN = null
export let MODERATOR_TOKEN = null

export const SET_ADMIN_TOKEN = token => (ADMIN_TOKEN = token)
export const SET_USER_TOKEN = token => (USER_TOKEN = token)
export const SET_MODERATOR_TOKEN = token => (MODERATOR_TOKEN = token)

export const connect = async () => {
	await disconnect()
	return await mongoose.connect(process.env.TEST_SUITE, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
}

export const request = async (query, authorization = null) => {
	return await axios({
		url: SERVER_URL,
		method: "post",
		data: { query },
		headers: { authorization }
	})
}

export const disconnect = async () => {
	await mongoose
		.connect(process.env.TEST_SUITE, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		})
		.then(res => {
			for (var i in mongoose.connection.collections) {
				mongoose.connection.collections[i].deleteMany(function() {})
			}
		})
	mongoose.disconnect()
}
