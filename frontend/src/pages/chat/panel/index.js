import React, { useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"

import { GET_PUBLIC_CHANNELS } from "../../../graphql"
import { useAuth, useChat } from "../../../hooks"
import { Span, Avatar, Icon } from "../../../components"
import { Container, ProfileWrapper, StyledLink, Image, LogoWrapper } from "./styles"
import { ChannelWrapper, Channel, ChannelLink } from "./styles"
import Logo from "../../../assets/test.png"

export const Panel = () => {
	const { currentUser } = useAuth()

	const { data: channelData } = useQuery(GET_PUBLIC_CHANNELS)

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

			<ChannelWrapper>
				{channelData &&
					channelData.publicChannels.map((channel, index) => (
						<ChannelLink
							to={`/chat/channels/${channel.id}`}
							onClick={() => setCurrentChannel(channel.id)}
							key={index}
						>
							<Channel>
								<div>
									<Avatar avatar={channel.avatar} name={channel.name} size="40" />
								</div>
								<Span>{channel.name}</Span>

								<Span>
									{channel.content && `${channel.createdBy}: ${channel.content}`}
								</Span>
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
