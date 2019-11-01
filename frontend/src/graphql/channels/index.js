import gql from "graphql-tag"

export const GET_CHANNELS = gql`
	query GET_CHANNELS {
		channels {
			id
			name
			isLocked
			avatar
			position
			createdAt
			createdBy {
				username
			}
			updatedAt
			updatedBy {
				username
			}
		}
	}
`

export const GET_CHANNEL = gql`
	query GET_CHANNEL($id: ID!) {
		channel(id: $id) {
			id
			name
			isLocked
			avatar
			position
			createdAt
			createdBy {
				username
			}
			updatedAt
			updatedBy {
				username
			}
		}
	}
`

export const CREATE_CHANNEL = gql`
	mutation CREATE_CHANNEL($name: String!) {
		createChannel(name: $name)
	}
`

export const UPDATE_CHANNEL = gql`
	mutation UPDATE_CHANNEL($id: ID!, $avatar: Upload, $name: String!, $isLocked: Boolean!) {
		updateChannel(id: $id, avatar: $avatar, name: $name, isLocked: $isLocked)
	}
`

export const DELETE_CHANNEL = gql`
	mutation DELETE_CHANNEL($id: ID!) {
		deleteChannel(id: $id)
	}
`

export const REORDER_CHANNELS = gql`
	mutation REORDER_CHANNELS($ids: [ReorderInput!]!) {
		reorderChannels(ids: $ids)
	}
`

export const GET_PUBLIC_CHANNELS = gql`
	query GET_PUBLIC_CHANNELS {
		publicChannels {
			id
			name
			avatar
			content
			createdBy
		}
	}
`
