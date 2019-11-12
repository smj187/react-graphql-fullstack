import gql from "graphql-tag"

export const COMMUNITY_CHANNELS = gql`
	query COMMUNITY_CHANNELS {
		channels {
			id
			name
			isLocked
			avatar
		}
	}
`

export const COMMUNITY_CHANNEL = gql`
	query COMMUNITY_CHANNEL($id: ID!) {
		channel(id: $id) {
			id
			name
			isLocked
			avatar
		}
	}
`

export const PRIVATE_CHANNELS = gql`
	query PRIVATE_CHANNELS {
		privateChannels {
			id
			isPrivate
			users {
				username
			}
			createdAt
			createdBy {
				username
			}
		}
	}
`

export const PRIVATE_CHANNEL = gql`
	query PRIVATE_CHANNEL($id: ID!) {
		channel(id: $id) {
			id
			users {
				id
				username
			}
			createdAt
			createdBy {
				id
				username
			}
		}
	}
`

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

export const ADD_TO_PRIVATE_CHANNEL = gql`
	mutation ADD_TO_PRIVATE_CHANNEL($channelId: ID!, $userId: ID!) {
		addToPrivateChannel(channelId: $channelId, userId: $userId)
	}
`

export const REMOVE_FROM_PRIVATE_CHANNEL = gql`
	mutation REMOVE_FROM_PRIVATE_CHANNEL($channelId: ID!, $userId: ID!) {
		removeFromPrivateChannel(channelId: $channelId, userId: $userId)
	}
`

export const CREATE_PRIVATE_CHANNEL = gql`
	mutation ADD_TO_PRIVATE($id: ID!) {
		createPrivateChannel(partnerId: $id) {
			id
			createdAt
			createdBy {
				id
				username
			}
			users {
				id
				username
			}
		}
	}
`
export const DELETE_PRIVATE_CHANNEL = gql`
	mutation DELETE_PRIVATE_CHANNEL($id: ID!) {
		deletePrivateChannel(channelId: $id)
	}
`
