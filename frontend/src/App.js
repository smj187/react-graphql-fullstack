import React from "react"
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"

import { Application } from "./pages/application"
import { Authentication } from "./pages/authentication"
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
				<ProtectedRoute path="/" component={Application} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
