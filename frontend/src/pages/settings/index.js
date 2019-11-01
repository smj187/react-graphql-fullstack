import React from "react"
import styled from "styled-components"

import { Switch, Route, Redirect, withRouter } from "react-router-dom"

import { Panel } from "./panel"
import { Users } from "./users"
import { Channels } from "./channels"
import { Invite } from "./invite"
import { Configuration } from "./configuration"
import { Account } from "./account"

import { useAuth } from "../../hooks"

const Container = styled.div`
	width: 100%;
	display: flex;
	overflow: hidden;

	min-width: 996px;
`

const SomeComponent = withRouter(props => <Panel {...props} />)

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: calc(100% - 17rem);
	background: ${({ theme }) => theme.color9};
	/* background: #000000c4; */
`

const AdminRoute = ({ component: Component, ...rest }) => {
	const {
		currentUser: { role }
	} = useAuth()

	return (
		<Route
			{...rest}
			render={props => (role === "admin" ? <Component {...props} /> : <Redirect to="/401" />)}
		/>
	)
}

const ModeratorRoute = ({ component: Component, ...rest }) => {
	const {
		currentUser: { role }
	} = useAuth()

	return (
		<Route
			{...rest}
			render={props => (role !== "user" ? <Component {...props} /> : <Redirect to="/401" />)}
		/>
	)
}

export const Settings = () => {
	return (
		<Container>
			<SomeComponent />
			<Wrapper>
				<Switch>
					<AdminRoute exact path="/settings/users" component={Users} />
					<AdminRoute exact path="/settings/configuration" component={Configuration} />
					<ModeratorRoute exact path="/settings/channels" component={Channels} />
					<Route exact path="/settings/invite" component={Invite} />
					<Route exact path="/settings/account" component={Account} />
					<Route
						path="/"
						render={() => (
							// <Redirect to={{ pathname: "/404", state: { to: "/settings/users" } }} />
							<Redirect to="/404" />
						)}
					/>
				</Switch>
			</Wrapper>
		</Container>
	)
}
