import React, { useState, useContext, createContext } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { SIGN_IN_USER, SIGN_UP_USER, RESET_PASSWORD_MAIL, GET_USER } from "../graphql"

import jwt from "jsonwebtoken"

const AuthContext = new createContext()

export const ProvideAuth = ({ children }) => {
	const auth = useProvideAuth()
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useProvideAuth = () => {
	const [signInMutation] = useMutation(SIGN_IN_USER)
	const [signUpMutation] = useMutation(SIGN_UP_USER)
	const [resetPasswordMailMutation] = useMutation(RESET_PASSWORD_MAIL)

	const [currentUser, setCurrentUser] = useState({ id: null, role: null, username: null })

	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		try {
			const token = localStorage.getItem("token")
			const { exp, id, role, username } = jwt.decode(token)

			if (!id) {
				return false
			}

			if (exp < (new Date().getTime() + 1) / 1000) {
				console.log("token expired")
				localStorage.removeItem("token")
				return false
			}

			setCurrentUser({ id, role, username })
		} catch (e) {
			// console.log("Could not decode jwt")
			localStorage.removeItem("token")
			return false
		}

		return true
	})

	// const { data } = useQuery(GET_USER, {
	// 	variables: { id: currentUser.id },
	// 	skip: !currentUser.id
	// })
	// if (data) {
	// 	console.log("data")
	// }

	// React.useEffect(() => {
	// 	console.log("listen:", currentUser)
	// }, [currentUser])

	async function signIn(email, password) {
		return await signInMutation({ variables: { email, password } })
			.then(({ data }) => {
				setIsAuthenticated(true)
				const { id, role } = jwt.decode(data.signIn.token)
				setCurrentUser({ id, role })

				localStorage.setItem("token", data.signIn.token)
				return true
			})
			.catch(({ graphQLErrors }) => {
				console.log("err", graphQLErrors[0])
				return graphQLErrors[0].code.errors
			})
	}

	async function signUp(email, username, password) {
		return await signUpMutation({ variables: { email, username, password } })
			.then(({ data }) => {
				setIsAuthenticated(true)
				const { id, role } = jwt.decode(data.signUp.token)
				setCurrentUser({ id, role })

				localStorage.setItem("token", data.signUp.token)
				return true
			})
			.catch(({ graphQLErrors }) => {
				console.log("graphQLErrors", graphQLErrors[0])
				return graphQLErrors[0].code.errors
			})
	}

	async function resetPassword(email) {
		console.log("resetPassword", email)
		return await resetPasswordMailMutation({ variables: { email } })
			.then(() => {
				console.log("reseted")
				return true
			})
			.catch(({ graphQLErrors }) => {
				console.log("resetPassword", graphQLErrors)
				return graphQLErrors[0].code.errors
			})
	}

	async function signOut() {
		setIsAuthenticated(false)
		setCurrentUser({ id: null, role: null })
		localStorage.removeItem("token")
		console.log("sign out")
	}

	return { signIn, signUp, signOut, resetPassword, isAuthenticated, currentUser }
}

export const useAuth = () => {
	return useContext(AuthContext)
}
