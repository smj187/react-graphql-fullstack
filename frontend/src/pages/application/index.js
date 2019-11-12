import React from "react"
import { Switch, Route, withRouter, Redirect } from "react-router-dom"
import styled from "styled-components"
import { AppContextProvider, useAuth } from "../../hooks"
import { Selection } from "./selection"
import { Channel } from "./channel"
import { Private } from "./private"
import { Users } from "./users"
import { Panel } from "./panel"
import { Welcome } from "./welcome"

import { Account } from "./account"
import { Users as AdminUsers } from "./admin/users"
import { Config } from "./admin/config"
import { Channels } from "./moderator/channels"
import { Invite } from "./invite"

const Container = styled.div`
	display: flex;
	flex-wrap: nowrap;
`

const Wrapper = styled.div`
	width: ${({ location }) =>
		location.pathname.match(/settings/) ? "calc(100% - 5rem)" : "calc(100% - 40rem)"};
`

export const Test = () => <h1>working!</h1>

const AdminRoute = ({ component: Component, ...rest }) => {
	const {
		currentUser: { role }
	} = useAuth()

	return (
		<Route
			{...rest}
			render={props => (role === "admin" ? <Component {...props} /> : <div />)}
		/>
	)
}

const ModeratorRoute = ({ component: Component, ...rest }) => {
	const {
		currentUser: { role }
	} = useAuth()

	return (
		<Route {...rest} render={props => (role !== "user" ? <Component {...props} /> : <div />)} />
	)
}

const ApplicationWithRouter = withRouter(props => (
	<Container>
		<AppContextProvider>
			<Panel />
			<Selection {...props} />
			<Wrapper {...props}>
				<Switch>
					<Route
						exact
						path="/"
						render={() => <Redirect to="/channels/welcome" />}
						component={Welcome}
					/>
					<Route path="/channels/welcome" component={Welcome} />
					<Route path="/channels/:id" component={Channel} />
					<Route path="/private/:id" component={Private} />
					<Route path="/users/:id" component={Private} />
					<AdminRoute exact path="/settings/users" component={AdminUsers} />
					<AdminRoute exact path="/settings/config" component={Config} />
					<ModeratorRoute exact path="/settings/channels" component={Channels} />

					<Route path="/settings/invite" component={Invite} />
					<Route path="/settings/account" component={Account} />
				</Switch>
			</Wrapper>
			<Users {...props} />
		</AppContextProvider>
	</Container>
))

export const Application = () => {
	return <ApplicationWithRouter />
}
