import { gql } from "apollo-server"

export default gql`
	extend type Query {
		messages(id: ID!, pageSize: Int, page: Int): [Message!]! @restricted @auth
	}

	extend type Mutation {
		fileTest(file: Upload): Boolean! @createMessageValidation

		createMessage(id: ID!, content: String, tags: [String!], file: Upload): Message!
			@createMessageValidation
			@auth

		updateMessage(id: ID!, content: String, tags: [String!], file: String): Message!
			@updateMessageValidation
			@restricted
			@auth

		reactToMessage(id: ID!, reaction: String!): Message! @reactionValidation @restricted @auth

		deleteMessage(id: ID!): Boolean! @restricted @auth

		clearOutChannel(id: ID!): Boolean! @auth
	}

	extend type Subscription {
		newMessage(id: ID!): Message! @restricted @auth
	}

	type Reaction {
		counter: Int
		users: [String!]
	}

	type Message {
		id: ID!
		channelId: String
		content: String
		tags: [String!]
		heart: Reaction
		up: Reaction
		down: Reaction
		laugh: Reaction
		confused: Reaction
		cheer: Reaction
		rocket: Reaction
		eyes: Reaction
		file: String
		createdBy: User
		createdAt: Date
		updatedBy: User
		updatedAt: Date
	}
`