import gql from "graphql-tag"

export const GET_MESSAGES = gql`
	query GET_MESSAGES($id: ID!) {
		messages(id: $id) {
			id
			content
			tags
			heart {
				counter
				users
			}
			up {
				counter
				users
			}
			down {
				counter
				users
			}
			laugh {
				counter
				users
			}
			confused {
				counter
				users
			}
			cheer {
				counter
				users
			}
			rocket {
				counter
				users
			}
			eyes {
				counter
				users
			}
			file {
				url
				format
			}
			createdBy {
				username
				id
			}
			createdAt
			updatedBy {
				username
			}
			updatedAt
		}
	}
`

export const GET_MESSAGE = gql`
	query GET_MESSAGE($id: ID!) {
		message(id: $id) {
			id
			content
			tags
			heart {
				counter
				users
			}
			up {
				counter
				users
			}
			down {
				counter
				users
			}
			laugh {
				counter
				users
			}
			confused {
				counter
				users
			}
			cheer {
				counter
				users
			}
			rocket {
				counter
				users
			}
			eyes {
				counter
				users
			}
			file {
				url
				format
			}
			createdBy {
				username
				id
			}
			createdAt
			updatedBy {
				username
			}
			updatedAt
		}
	}
`

export const CREATE_MESSAGE = gql`
	mutation CREATE_MESSAGE($id: ID!, $content: String, $tags: [String!], $file: Upload) {
		createMessage(id: $id, content: $content, tags: $tags, file: $file) {
			id
			content
			tags
			heart {
				counter
				users
			}
			up {
				counter
				users
			}
			down {
				counter
				users
			}
			laugh {
				counter
				users
			}
			confused {
				counter
				users
			}
			cheer {
				counter
				users
			}
			rocket {
				counter
				users
			}
			eyes {
				counter
				users
			}
			file {
				url
				format
			}
			createdBy {
				username
				id
			}
			createdAt
			updatedBy {
				username
			}
			updatedAt
		}
	}
`

export const DELETE_MESSAGE = gql`
	mutation DELETE_MESSAGE($id: ID!) {
		deleteMessage(id: $id)
	}
`

export const UPDATE_MESSAGE = gql`
	mutation UPDATE_MESSAGE($id: ID!, $content: String, $tags: [String!]) {
		updateMessage(id: $id, content: $content, tags: $tags)
	}
`

export const NEW_MESSAGE_SUBSCRIPTION = gql`
	subscription NEW_MESSAGE_SUBSCRIPTION($id: ID!) {
		newMessage(id: $id) {
			id
			isPrivate
			content
			tags
			heart {
				counter
				users
			}
			up {
				counter
				users
			}
			down {
				counter
				users
			}
			laugh {
				counter
				users
			}
			confused {
				counter
				users
			}
			cheer {
				counter
				users
			}
			rocket {
				counter
				users
			}
			eyes {
				counter
				users
			}
			file {
				url
				format
			}
			createdBy {
				username
			}
			createdAt
			updatedBy {
				username
			}
			updatedAt
		}
	}
`
