import React, { useReducer } from "react"

import { useAuth, useApplication } from "../../../hooks"
import { Span, H2, Avatar, Spinner, Profile } from "../../../components"
import { Container, Channels, Channel } from "./styles"

export const Users = props => {
	const { currentUser } = useAuth()
	const { users, onCreatePrivateChat } = useApplication()

	const reducer = (state, action) => {
		switch (action.type) {
			case "OPEN_PRIVATE_CHANNEL":
				if (action.payload.isLocked) {
					return { ...state, showErrorModal: true }
				}
				onCreatePrivateChat(action.payload)
				return state

			case "OPEN_USER_MODAL":
				return { ...state, showUserProfile: true, selectedUser: action.payload }
			case "CLOSE_USER_MODAL":
				return { ...state, showUserProfile: false, selectedUser: -1 }

			case "CLOSE_ERROR_MODAL":
				return { ...state, showErrorModal: false }

			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		showErrorModal: false,
		showUserProfile: false,
		selectedUser: null
	})

	if (props.location.pathname.match(/settings/)) {
		return <div />
	}

	return (
		<Container hasLoaded={!!users}>
			{!users ? (
				<Spinner />
			) : (
				<Channels>
					<H2>Users</H2>
					{users.map((user, index) => (
						<Channel
							key={index}
							onClick={() => dispatch({ type: "OPEN_USER_MODAL", payload: user })}
						>
							<div>
								<Avatar avatar={user.avatar} name={user.username} size="30" />
							</div>
							<Span>{user.username}</Span>
						</Channel>
					))}
				</Channels>
			)}
			<Profile
				userId={state.selectedUser && state.selectedUser.id}
				isOpen={state.showUserProfile}
				showMessageButton={state.selectedUser && state.selectedUser.id !== currentUser.id}
				onOpenChat={() =>
					dispatch({ type: "OPEN_PRIVATE_CHANNEL", payload: state.selectedUser })
				}
				onClose={() => dispatch({ type: "CLOSE_USER_MODAL" })}
			/>
		</Container>
	)
}
