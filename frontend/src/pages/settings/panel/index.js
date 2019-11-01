import React from "react"

import { useAuth } from "../../../hooks"
import { Icon, Span, H2 } from "../../../components"
import { Container, Wrapper, StyledLink } from "./styles"

export const Panel = props => {
	const { signOut, currentUser } = useAuth()
	return (
		<Container>
			<H2>Settings</H2>
			{currentUser.role === "admin" && (
				<StyledLink to="/settings/users">
					<Wrapper isActive={props.location.pathname === "/settings/users"}>
						<Icon name="Group" size="25" />
						<Span>All Users</Span>
					</Wrapper>
				</StyledLink>
			)}
			{currentUser.role === "admin" && (
				<StyledLink to="/settings/configuration">
					<Wrapper isActive={props.location.pathname === "/settings/configuration"}>
						<Icon name="Slider" size="23" />
						<Span>System </Span>
					</Wrapper>
				</StyledLink>
			)}
			{currentUser.role !== "user" && (
				<StyledLink to="/settings/channels">
					<Wrapper isActive={props.location.pathname === "/settings/channels"}>
						<Icon name="Conversation" size="22" />
						<Span>Channels</Span>
					</Wrapper>
				</StyledLink>
			)}

			<StyledLink to="/settings/invite">
				<Wrapper isActive={props.location.pathname === "/settings/invite"}>
					<Icon name="UserPlus" size="29" />
					<Span>Invite Friend</Span>
				</Wrapper>
			</StyledLink>
			<StyledLink to="/settings/account">
				<Wrapper isActive={props.location.pathname === "/settings/account"}>
					<Icon name="AddressCard" size="22" />
					<Span>My Account</Span>
				</Wrapper>
			</StyledLink>
			<Wrapper last onClick={signOut}>
				<Icon name="SignOutAlt" size="21" />
				<Span>Sign Out</Span>
			</Wrapper>
		</Container>
	)
}
