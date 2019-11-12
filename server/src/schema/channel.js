import { gql } from "apollo-server-express"

export default gql`
	extend type Query {
		channels: [PublicChannel!]! @auth
		publicChannels: [Channel]! @auth
		channel(id: ID): Channel! @auth

		privateChannel(id: ID!): PrivateChannel! @channelIdValidation @auth
		privateChannels: [PrivateChannel!]! @auth
	}

	extend type Mutation {
		createChannel(name: String!): Boolean! @createChannelValidation @restricted @auth
		updateChannel(id: ID!, name: String!, avatar: Upload, isLocked: Boolean!): Boolean!
			@updateChannelValidation
			@restricted
			@auth
		reorderChannels(ids: [ReorderInput!]!): Boolean!
			@reorderChannelsValidation
			@restricted
			@auth
		deleteChannel(id: ID!): Boolean! @restricted @auth

		createPrivateChannel(partnerId: ID!): PrivateChannel! @createPrivateChannelValidation @auth
		addToPrivateChannel(channelId: ID!, userId: ID!): Boolean!
			@restricted
			@addUserToChannelValidation
			@auth
		removeFromPrivateChannel(channelId: ID!, userId: ID!): Boolean!
			@restricted
			@removeUserFromChannelValidation
			@auth
		deletePrivateChannel(channelId: ID!): Boolean! @restricted @auth

		deleteAllChannels: Boolean!
	}

	extend type Subscription {
		newChannel(userId: ID!): PrivateChannel! @auth
	}

	input ReorderInput {
		id: ID!
		position: Int!
	}

	type Channel {
		id: ID
		name: String
		avatar: String
		isLocked: Boolean
		position: Int
		users: [User!]
		createdAt: Date
		createdBy: User
		updatedAt: Date
		updatedBy: User
	}

	type PrivateChannel {
		id: ID
		isPrivate: Boolean
		users: [User!]
		createdAt: Date
		createdBy: User
	}

	type PublicChannel {
		id: ID!
		name: String!
		avatar: String
		isLocked: Boolean!
		position: Int!
		createdAt: Date!
		createdBy: User
		updatedAt: Date
		updatedBy: User
	}
`
