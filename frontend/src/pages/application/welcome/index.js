import React from "react"

import { H1, H2, Span, Search } from "../../../components"
import { Container, Navbar, ChatWindow } from "./styles"
import WelcomeImage from "../../../assets/welcome.png"

export const Welcome = () => {
	return (
		<Container>
			<Navbar>
				<H1>Welcome</H1>
				<Search placeholder="Search..." />
			</Navbar>
			<ChatWindow>
				<img src={WelcomeImage} alt="welcome" />
				<H2>Welcome!</H2>
				<Span>Select any channel or user to get started!</Span>
			</ChatWindow>
		</Container>
	)
}
