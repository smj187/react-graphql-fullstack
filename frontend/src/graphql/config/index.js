import gql from "graphql-tag"

export const GET_CONFIG = gql`
	query GET_CONFIG {
		config {
			image
			video
			audio
			document
			createdAt
			updatedAt
			updatedBy {
				username
			}
		}
	}
`

export const UPDATE_CONFIG = gql`
	mutation UPDATE_CONFIG($image: Int!, $video: Int!, $audio: Int!, $document: Int!) {
		updateConfig(image: $image, video: $video, audio: $audio, document: $document)
	}
`
