import React from "react"

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import { Chat } from "./pages/chat"
import { Settings } from "./pages/settings"
import { Authentication } from "./pages/authentication"
import { Error404 } from "./pages/error/404"
import { Error401 } from "./pages/error/401"

import { useAuth } from "./hooks"

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useAuth()

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	)
}

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Authentication} />
				<ProtectedRoute path="/chat" component={Chat} />
				<ProtectedRoute path="/settings" component={Settings} />

				<ProtectedRoute path="/404" component={Error404} />
				<ProtectedRoute path="/401" component={Error401} />
				<ProtectedRoute path="/" render={() => <Redirect to="/404" />} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
