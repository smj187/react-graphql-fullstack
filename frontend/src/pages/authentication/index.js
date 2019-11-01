import React, { useState } from "react"

import { Container } from "./styles"

import { Background } from "./background"
import { Login } from "./login"
import { Register } from "./register"

export const Authentication = () => {
	const [state, setState] = useState({ isLogin: true })

	const changeToRegister = () => setState({ isLogin: false })
	const changeToLogin = () => setState({ isLogin: true })

	return (
		<Container>
			<Background />
			{state.isLogin ? (
				<Login changeToRegister={changeToRegister} />
			) : (
				<Register changeToLogin={changeToLogin} />
			)}
		</Container>
	)
}
