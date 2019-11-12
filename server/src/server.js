import "dotenv/config"
import { ApolloServer, PubSub, makeExecutableSchema } from "apollo-server-express"
import { execute, subscribe } from "graphql"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { createServer } from "http"

import mongoose from "mongoose"
import express from "express"
import jwt from "jsonwebtoken"
import http from "http"
import uuidv4 from "uuid/v4"

import schema from "./schema"
import resolvers from "./resolvers"
import schemaDirectives from "./directives"

const app = express()
const pubsub = new PubSub()

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	schemaDirectives,

	subscriptions: {
		path: "/subscriptions",
		onConnect: async req => {
			// console.log("async rec", req)

			let user = null
			const token = req.authorization.replace("Bearer ", "")
			try {
				user = jwt.verify(token, process.env.JWT_SECRET)
			} catch (e) {}

			return { user }

			// if (!context.user) {
			// 	throw new AuthenticationError("Invalid/Expired token. Please sign in again.")
			// }
		}
	},

	context: async ({ req, connection }) => {
		let user = null
		if (connection) {
			if (connection.context && connection.context.authorization) {
				const token = connection.context.authorization.replace("Bearer ", "")
				try {
					user = jwt.verify(token, process.env.JWT_SECRET)
				} catch (e) {}
			}

			return { connection, user, pubsub }
		}
		if (req) {
			if (req.headers && req.headers.authorization) {
				const token = req.headers.authorization.replace("Bearer ", "")

				try {
					user = jwt.verify(token, process.env.JWT_SECRET)
				} catch (e) {}
			}
			return { req, user, pubsub }
		}
	},
	formatError: error => {
		const id = uuidv4()

		console.log("----------------------------")
		console.log(error)
		console.log(error.extensions.exception)
		return error

		error.extensions["id"] = id
		delete error.extensions.exception

		const ret = {
			message: error.message,
			path: error.path,
			code: error.extensions.code,
			id: id
		}
		// console.log("ret", ret)
		// console.log(error)
		console.log("----------------------------")
		console.log()
		// return error
		return ret
	}
})

server.applyMiddleware({ app, path: "/graphql" })
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

let databaseUrl = process.env.DATABASE_URL
if (process.env.IS_TEST) {
	databaseUrl = process.env.TEST_SUITE
	console.log("Server is running in test mode")
}

mongoose.connect(databaseUrl, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
	httpServer.listen({ port: process.env.SERVER_PORT }, () => {
		// new SubscriptionServer(
		// 	{
		// 		execute,
		// 		subscribe,
		// 		schema,
		// 		onConnect: async params => {
		// 			console.log("onConnect")
		// 		}
		// 	},
		// 	{
		// 		server: server,
		// 		path: "/subscriptions"
		// 	}
		// )
		console.log(`Server running at http://localhost:${process.env.SERVER_PORT}/graphql`)
	})
})
