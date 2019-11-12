import React from "react"

import { useAuth } from "../../../hooks"
import { Icon, Tooltip } from "../../../components"
import { Container, Logo, StyledLink, Wrapper } from "./styles"

export const Panel = () => {
	const { signOut } = useAuth()

	return (
		<Container>
			<Logo>R</Logo>
			<Tooltip
				content="Users"
				placement="right"
				render={
					<StyledLink to="/settings/users">
						<Wrapper>
							<Icon name="Group" size="30" />
						</Wrapper>
					</StyledLink>
				}
			/>

			<Tooltip
				content="System"
				placement="right"
				render={
					<StyledLink to="/settings/config">
						<Wrapper>
							<Icon name="Slider" size="28" />
						</Wrapper>
					</StyledLink>
				}
			/>

			<Tooltip
				content="Channels"
				placement="right"
				render={
					<StyledLink to="/settings/channels">
						<Wrapper>
							<Icon name="Conversation" size="28" />
						</Wrapper>
					</StyledLink>
				}
			/>

			<Tooltip
				content="Invite"
				placement="right"
				render={
					<StyledLink to="/settings/invite">
						<Wrapper>
							<Icon name="UserPlus" size="31" />
						</Wrapper>
					</StyledLink>
				}
			/>

			<Tooltip
				content="Account"
				placement="right"
				render={
					<StyledLink to="/settings/account">
						<Wrapper>
							<Icon name="AddressCard" size="28" />
						</Wrapper>
					</StyledLink>
				}
			/>

			<Tooltip
				content="Sign Out"
				placement="right"
				render={
					<Wrapper onClick={signOut} last>
						<Icon name="SignOutAlt" size="28" />
					</Wrapper>
				}
			/>
		</Container>
	)
}
