import { GraphQLDateTime } from "graphql-iso-date"

import userResolver from "./user"
import channelResolver from "./channel"
import configResolver from "./config"
import messageResolver from "./message"

const customScalarResolver = {
	Date: GraphQLDateTime
}

export default [
	customScalarResolver,
	userResolver,
	channelResolver,
	configResolver,
	messageResolver
]
