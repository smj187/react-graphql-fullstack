import React from "react"
import { Switch, Route, withRouter } from "react-router-dom"
import styled from "styled-components"

import { Channel } from "./channel"
import { Panel } from "./panel"

import { ChatContextProvider } from "../../hooks"

const Container = styled.div`
	display: flex;
	flex-wrap: nowrap;
`

const Wrapper = styled.div`
	width: 100%;
`

export const Test = () => <h1>working!</h1>

const SomeComponent = withRouter(props => <Channel {...props} />)

export const Chat = () => {
	return (
		<Container>
			<ChatContextProvider>
				<Panel />
				<Wrapper>
					<Switch>
						<Route path="/chat/channels/:id" component={SomeComponent} />
					</Switch>
				</Wrapper>
			</ChatContextProvider>
		</Container>
	)
}
