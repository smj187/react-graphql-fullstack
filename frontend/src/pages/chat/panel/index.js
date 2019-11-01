import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"

import { GET_PUBLIC_CHANNELS, GET_USERS } from "../../../graphql"
import { useAuth, useChat } from "../../../hooks"
import { H1, H2, Span, Avatar, Icon } from "../../../components"
import { Container, ProfileWrapper, StyledLink, Image, LogoWrapper } from "./styles"
import { ChannelWrapper, Channel, ChannelLink, Badge, TabWrapper, Tab } from "./styles"
import Logo from "../../../assets/test.png"

export const Panel = () => {
	const { currentUser } = useAuth()

	const [state, setState] = useState({ activeTab: "channels", newMessages: 0 })

	const { data: channelData } = useQuery(GET_PUBLIC_CHANNELS)
	const { data: userData } = useQuery(GET_USERS)

	const { currentChannel, setCurrentChannel } = useChat()
	useEffect(() => {
		// console.log(currentChannel, channelData)
		if (channelData && !currentChannel) {
			setCurrentChannel(channelData.publicChannels[0].id || null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChannel, channelData])
	return (
		<Container>
			<LogoWrapper>
				<Image src={Logo} />
			</LogoWrapper>
			<TabWrapper>
				<Tab
					onClick={() => setState({ activeTab: "channels" })}
					active={state.activeTab === "channels"}
				>
					<Icon name="Conversation" size="20" />
					<Span> Channels</Span>
				</Tab>
				<Tab
					onClick={() => setState({ activeTab: "users" })}
					active={state.activeTab === "users"}
				>
					<Icon name="Group" size="22" />
					<Span>Users</Span>
				</Tab>
			</TabWrapper>
			<ChannelWrapper>
				{channelData &&
					state.activeTab === "channels" &&
					channelData.publicChannels.map((channel, index) => (
						<ChannelLink
							to={`/chat/channels/${channel.id}`}
							onClick={() => setCurrentChannel(channel.id)}
							key={index}
						>
							<Channel hasNewMessages={state.newMessages > 0}>
								<div>
									<Avatar avatar={channel.avatar} name={channel.name} size="40" />
								</div>
								<Span>{channel.name}</Span>

								{state.newMessages > 0 && (
									<div>
										<Badge>2</Badge>
									</div>
								)}
								<Span>
									{channel.content && `${channel.createdBy}: ${channel.content}`}
								</Span>
							</Channel>
						</ChannelLink>
					))}
				{userData &&
					state.activeTab === "users" &&
					userData.users.map((user, index) => (
						<ChannelLink to={`/chat/private/${user.id}`} key={index}>
							<Channel hasNewMessages={state.newMessages > 0}>
								<div>
									<Avatar name={user.username} size="40" />
								</div>
								<Span>{user.username}</Span>

								{state.newMessages > 0 && (
									<div>
										<Badge>2</Badge>
									</div>
								)}
								<Span></Span>
							</Channel>
						</ChannelLink>
					))}
			</ChannelWrapper>
			<ProfileWrapper>
				<div>
					<Avatar name={currentUser.username} size="42" />
				</div>
				<Span>{currentUser.username}</Span>
				<StyledLink to="/settings/account">
					<Icon name="Settings" size="28" />
				</StyledLink>
			</ProfileWrapper>
		</Container>
	)
}
