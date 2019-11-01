import React from "react"
import { Link } from "react-router-dom"

export const Error404 = () => {
	const to = "/" // location.state
	console.log("to", to)

	return (
		<div>
			<h1>404</h1>
			<Link to={to}>take me back</Link>
		</div>
	)
}
