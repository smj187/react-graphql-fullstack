import { gql } from "apollo-server"

export default gql`
	extend type Query {
		users(pageSize: Int, page: Int): [User!]! @auth
		user(id: ID!): UserProfile! @auth
	}

	extend type Mutation {
		test(file: Upload, id: String): Boolean! @updateUserValidation
		signUp(email: String!, username: String!, password: String!): Login! @signUpValidation
		signIn(email: String!, password: String!): Login! @signInValidation
		resetPasswordMail(email: String!): Boolean! @resetMailValidation
		inviteUserMail(email: String!): Boolean @inviteMailValidation @auth
		comparePasswords(id: ID!, password: String!): Boolean! @restricted @auth

		updateUser(
			id: ID!
			avatar: Upload
			username: String
			firstname: String
			lastname: String
			bio: String
			email: String
			confirmPassword: String
			newPassword: String
		): Boolean! @restricted @updateUserValidation @auth
		changeRole(id: ID!, role: String!): Boolean! @changeRoleValidation @restricted @auth
		suspendUser(id: ID!): Boolean! @restricted @auth
		deleteUser(id: ID!): Boolean! @restricted @auth
	}

	enum Role {
		ADMIN
		MODERATOR
		SELF
		OWNER
		USER
		UNKNOWN
	}

	type Me {
		id: ID!
		username: String!
		email: String!
		avatar: String
		firstname: String
		lastname: String
		bio: String
		createdAt: Date!
		updatedAt: Date!
		activeAt: Date!
	}

	type Login {
		id: ID!
		token: String!
	}

	type UserProfile {
		id: ID!
		username: String!
		avatar: String
		firstname: String
		lastname: String
		bio: String
		email: String!
		createdAt: Date!
		updatedAt: Date
		suspended: Boolean
	}

	type User {
		id: ID!

		email: String
		role: String
		token: String
		suspended: Boolean

		username: String
		avatar: String
		firstname: String
		lastname: String
		bio: String
		createdAt: Date
		updatedAt: Date
		activeAt: Date
	}
`
