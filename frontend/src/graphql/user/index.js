import gql from "graphql-tag"

export const USERS = gql`
	query USERS {
		users(pageSize: 999, page: 0) {
			id
			avatar
			username
		}
	}
`

export const INVITE_FRIEND = gql`
	mutation SEND_INVITE_MAIL($email: String!) {
		inviteUserMail(email: $email)
	}
`

export const RESET_PASSWORD_MAIL = gql`
	mutation RESET_PASSWORD_MAIL($email: String!) {
		resetPasswordMail(email: $email)
	}
`

export const GET_USERS = gql`
	query ALL_USERS {
		users(pageSize: 10, page: 0) {
			id
			avatar
			username
			firstname
			lastname
			suspended
			role
			email
			createdAt
			activeAt
		}
	}
`

export const GET_USER = gql`
	query GET_USER($id: ID!) {
		user(id: $id) {
			id
			username
			avatar
			firstname
			lastname
			bio
			email
			createdAt
			suspended
		}
	}
`

export const UPDATE_USER = gql`
	mutation UPDATE_USER(
		$id: ID!
		$avatar: Upload
		$username: String
		$firstname: String
		$lastname: String
		$bio: String
		$email: String
		$confirmPassword: String
		$newPassword: String
	) {
		updateUser(
			id: $id
			avatar: $avatar
			username: $username
			firstname: $firstname
			lastname: $lastname
			bio: $bio
			email: $email
			confirmPassword: $confirmPassword
			newPassword: $newPassword
		)
	}
`

export const DELETE_USER = gql`
	mutation DELETE_USER($id: ID!) {
		deleteUser(id: $id)
	}
`

export const SUSPEND_USER = gql`
	mutation SUSPEND_USER($id: ID!) {
		suspendUser(id: $id)
	}
`

export const SIGN_UP_USER = gql`
	mutation SIGN_UP_USER($email: String!, $username: String!, $password: String!) {
		signUp(email: $email, username: $username, password: $password) {
			id
			token
		}
	}
`

export const SIGN_IN_USER = gql`
	mutation SIGN_IN_USER($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			id
			token
		}
	}
`
