import React, { useReducer } from "react"

import { useApplication } from "../../../hooks"
import { Span, H1, H2, Avatar, Icon, Spinner, Error } from "../../../components"
import { Container, Private, Users, User } from "./styles"
import { Channels, Header, ChannelWrapper, Channel, AvatarWrapper, Name } from "./styles"

export const Selection = props => {
	const {
		setActiveChannel,
		privateChannels,
		fetchCommunityChannel,
		fetchPrivateChannel,
		communityChannels,
		onDeletePrivateChat,
		fetchCommunityChannelMessages,
		fetchPrivateChannelMessages
	} = useApplication()

	const reducer = (state, action) => {
		switch (action.type) {
			case "OPEN_CHANNEL":
				if (action.payload.isLocked) {
					return { ...state, showErrorModal: true }
				}
				setActiveChannel({ id: action.payload.id, isPrivate: false, hasUpdate: false })
				fetchCommunityChannel()
				fetchCommunityChannelMessages()
				return state

			case "OPEN_PRIVATE_CHANNEL":
				setActiveChannel({ id: action.payload.id, isPrivate: true, hasUpdate: false })
				fetchPrivateChannel()
				fetchPrivateChannelMessages()
				return { ...state, open: action.payload.id }

			case "DELETE_PRIVATE_CHANNEL":
				onDeletePrivateChat(action.payload.id)
				return state

			case "CLOSE_ERROR_MODAL":
				return { ...state, showErrorModal: false }

			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, { showErrorModal: false })

	if (props.location.pathname.match(/settings/)) {
		return <div />
	}

	return (
		<Container>
			<Header>
				<H1>Messages</H1>
			</Header>
			<ChannelWrapper hasLoaded={!!communityChannels} channels>
				{!communityChannels ? (
					<Spinner />
				) : (
					<Channels>
						<H2>Community</H2>
						{communityChannels.map((channel, index) => (
							<Channel
								key={index}
								to={`/channels/${channel.id}`}
								onClick={() => dispatch({ type: "OPEN_CHANNEL", payload: channel })}
							>
								<AvatarWrapper
									isActive={channel.id === window.location.pathname.slice(10)}
								>
									<Avatar avatar={channel.avatar} name={channel.name} size="30" />
								</AvatarWrapper>
								<Name isActive={channel.id === window.location.pathname.slice(10)}>
									<Span>{channel.name}</Span>
								</Name>

								{channel.isLocked && <Icon name="Lock2" size="20" />}
							</Channel>
						))}
					</Channels>
				)}
			</ChannelWrapper>
			<ChannelWrapper hasLoaded={!!privateChannels} privateChannels>
				{!privateChannels ? (
					<Spinner />
				) : (
					<Channels>
						<H2>Private</H2>
						{privateChannels.map((channel, index) => (
							<Private key={index}>
								<AvatarWrapper
									isActive={channel.id === window.location.pathname.slice(9)}
									onClick={() =>
										dispatch({
											type: "OPEN_PRIVATE_CHANNEL",
											payload: channel
										})
									}
								>
									<Avatar
										avatar={channel.avatar}
										name={channel.users
											.slice(1)
											.map(u => u.username)
											.join()}
										size="30"
									/>
								</AvatarWrapper>

								<Users
									to={`/private/${channel.id}`}
									onClick={() =>
										dispatch({
											type: "OPEN_PRIVATE_CHANNEL",
											payload: channel
										})
									}
								>
									{channel.users.slice(1).map((user, index) => (
										<User
											key={index}
											isactive={
												channel.id === window.location.pathname.slice(9)
											}
										>{`${user.username}${
											channel.users.slice(1).length - 1 === index ? "" : ","
										}`}</User>
									))}
								</Users>
								<Icon
									name="Close"
									size="25"
									onClick={() =>
										dispatch({
											type: "DELETE_PRIVATE_CHANNEL",
											payload: channel
										})
									}
								/>
							</Private>
						))}
					</Channels>
				)}
			</ChannelWrapper>

			<Error
				message="You cannot access this channel. This channel is locked at the moment. Please try again later."
				isOpen={state.showErrorModal}
				onClose={() => dispatch({ type: "CLOSE_ERROR_MODAL" })}
			/>
		</Container>
	)
}
