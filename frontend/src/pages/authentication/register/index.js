import React, { useReducer } from "react"
import { Redirect } from "react-router-dom"

import { useAuth, useForm, useValidation } from "../../../hooks"
import { H2, Icon, Span, Button, TextField, Underline } from "../../../components"
import { RegisterForm, PasswordFieldWrapper, AcceptWrapper, SwitchWrapper } from "./styles"

export const Register = ({ changeToLogin }) => {
	const { signUp } = useAuth()
	const { validateEmail, validateUsername, validatePassword } = useValidation()

	const { onChange, onSubmit, values, setValues } = useForm(onUserRegister, {
		email: "",
		username: "",
		password: ""
	})

	const reducer = (state, action) => {
		switch (action.type) {
			case "TOGGLE_SHOW_PASSWORD":
				return { ...state, showPassword: !state.showPassword }
			case "REDIRECT":
				return { ...state, registerSuccess: true }
			case "TOGGLE_ACCEPT":
				return { ...state, hasAccepted: !state.hasAccepted }
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		showPassword: false,
		registerSuccess: false,
		hasAccepted: false
	})

	const toggleShowPassword = () => {
		dispatch({ type: "TOGGLE_SHOW_PASSWORD" })
		const input = document.getElementById("password")
		input.type = input.type === "text" ? "password" : "text"
	}

	async function onUserRegister() {
		const clientError = {
			email: validateEmail(values.email),
			password: validatePassword(values.password),
			username: validateUsername(values.username)
		}
		if (clientError.email || clientError.password || clientError.username) {
			setValues({ ...values, errors: clientError })
		} else {
			const response = await signUp(values.email, values.username, values.password)
			if (response === true) {
				dispatch({ type: "REDIRECT" })
			} else {
				const errors = {
					email: response.email || null,
					username: response.username || null,
					password: response.password || null
				}
				setValues({ ...values, errors })
			}
		}
	}

	return (
		<RegisterForm onSubmit={onSubmit} animate={setTimeout(() => true, 50)}>
			<H2>Create Account</H2>

			<TextField
				type="email"
				label="E-MAIL"
				name="email"
				placeholder=""
				value={values.email}
				onChange={onChange}
				error={values.errors && values.errors.email}
			/>

			<TextField
				type="text"
				label="USERNAME"
				name="username"
				placeholder=""
				value={values.username}
				onChange={onChange}
				error={values.errors && values.errors.username}
			/>

			<PasswordFieldWrapper hasError={values.errors && values.errors.password}>
				<TextField
					id="password"
					type="password"
					label="PASSWORD"
					name="password"
					placeholder=""
					value={values.password}
					onChange={onChange}
					error={values.errors && values.errors.password}
				/>
				<Icon
					onClick={toggleShowPassword}
					name={state.showPassword ? "VisibilityOff" : "Visibility"}
					size="28"
				/>
			</PasswordFieldWrapper>

			<AcceptWrapper hasAccepted={state.hasAccepted}>
				<Icon
					onClick={() => dispatch({ type: "TOGGLE_ACCEPT" })}
					name={state.hasAccepted ? "CheckboxChecked" : "CheckboxUnchecked"}
					size="28"
				/>
				<Span>
					I have read and agree to the <Underline>privacy policy</Underline>,
					<Underline> terms of service</Underline>, and
					<Underline> community guidlines</Underline>.
				</Span>
			</AcceptWrapper>

			<Button type="submit" disabled={!state.hasAccepted}>
				Register
			</Button>
			<SwitchWrapper>
				<Span> Already have an Account?</Span>
				<Span link onClick={changeToLogin}>
					Login instead
				</Span>
			</SwitchWrapper>

			{state.registerSuccess && <Redirect to="/" />}
		</RegisterForm>
	)
}
