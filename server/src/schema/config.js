import { gql } from "apollo-server"

export default gql`
	extend type Query {
		config: Config! @restricted @auth
	}

	extend type Mutation {
		updateConfig(image: Int!, video: Int!, audio: Int!, document: Int!): Boolean!
			@updateConfigValidation
			@restricted
			@auth
	}

	type Config {
		image: Int!
		video: Int!
		audio: Int!
		document: Int!

		createdAt: Date!
		updatedAt: Date
		updatedBy: User
	}
`
