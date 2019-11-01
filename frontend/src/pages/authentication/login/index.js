import React, { useReducer } from "react"
import { Redirect } from "react-router-dom"
import ReactModal from "react-responsive-modal"

import { useAuth, useForm, useValidation } from "../../../hooks"
import { H2, Icon, Span, Button, TextField, Strong } from "../../../components"
import { LoginForm, PasswordFieldWrapper, ModalContainer, SwitchWrapper } from "./styles"

export const Login = ({ changeToRegister }) => {
	const { signIn, resetPassword } = useAuth()
	const { validateEmail } = useValidation()

	const { onChange, onSubmit, values, setValues } = useForm(onUserLogin, {
		email: "email2@test.com",
		password: "passwd#12"
	})

	const reducer = (state, action) => {
		switch (action.type) {
			case "TOGGLE_SHOW_PASSWORD":
				return { ...state, showPassword: !state.showPassword }
			case "REDIRECT":
				return { ...state, loginSuccess: true }
			case "SHOW_MODAL":
				return { ...state, showResetModal: true }
			case "CLOSE_MODAL":
				return { ...state, showResetModal: false }
			default:
				return state
		}
	}
	const [state, dispatch] = useReducer(reducer, {
		showPassword: false,
		showResetModal: false,
		loginSuccess: false
	})

	const toggleShowPassword = () => {
		dispatch({ type: "TOGGLE_SHOW_PASSWORD" })
		const input = document.getElementById("password")
		input.type = input.type === "text" ? "password" : "text"
	}

	async function onUserLogin() {
		const clientError = {
			email: validateEmail(values.email)
		}
		if (clientError.email) {
			setValues({ ...values, errors: clientError })
		} else {
			const response = await signIn(values.email, values.password)
			if (response !== true) {
				const errors = {
					email: response.email || null,
					password: response.password || null
				}
				setValues({ ...values, errors })
			} else {
				dispatch({ type: "REDIRECT" })
			}
		}
	}

	async function onPasswordResetMail() {
		const clientError = {
			email: validateEmail(values.email)
		}
		if (clientError.email) {
			setValues({ ...values, errors: clientError })
		} else {
			const response = await resetPassword(values.email)
			if (response === true) {
				setValues({ ...values, errors: null })
				dispatch({ type: "SHOW_MODAL" })
			} else {
				setValues({ ...values, errors: response })
			}
		}
	}

	return (
		<LoginForm onSubmit={onSubmit} animate={setTimeout(() => true, 50)}>
			<H2>Welcome back!</H2>
			<Span>We are happy to see you again!</Span>

			<TextField
				type="email"
				label="E-MAIL"
				name="email"
				placeholder=""
				value={values.email}
				onChange={onChange}
				error={values.errors && values.errors.email}
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

			<Span link onClick={onPasswordResetMail}>
				Forgot Password?
			</Span>
			<Button type="submit">Login</Button>
			<SwitchWrapper>
				<Span>Don't have an Account?</Span>
				<Span link onClick={changeToRegister}>
					Register
				</Span>
			</SwitchWrapper>

			<ReactModal
				open={state.showResetModal}
				// onClose={() => setState({ ...state, showResetModal: false })}
				onClose={() => dispatch({ type: "CLOSE_MODAL" })}
				center
				showCloseIcon={false}
				focusTrapped={false}
			>
				<ModalContainer>
					<H2>Instructions send</H2>
					<Span>
						We send you instructions to reset your password to{" "}
						<Strong>{values.email}</Strong>. Please check your Inbox and Spamfolder.
					</Span>
					<Button onClick={() => dispatch({ type: "CLOSE_MODAL" })}>Okay</Button>
				</ModalContainer>
			</ReactModal>

			{state.loginSuccess && <Redirect to="/" />}
		</LoginForm>
	)
}
