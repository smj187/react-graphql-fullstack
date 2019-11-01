import styled from "styled-components"

import { Form, PasswordFieldWrapper, SwitchWrapper } from "../styles"

export const LoginForm = styled(Form)`
	> :nth-child(1) {
		text-align: center;
		font-size: 2.5rem;
	}

	> :nth-child(2) {
		margin-top: 0.75rem;
		text-align: center;
	}

	> :nth-child(3) {
		margin-top: 2rem;
	}

	> :nth-child(4) {
		margin-top: 1rem;
	}

	> :nth-child(5) {
		margin-top: 0.5rem;
		font-size: 1rem;
	}

	> :nth-child(6) {
		margin-top: 1rem;
		max-width: 100%;
	}
`

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: -1.2rem;
	padding: 1.5rem 2rem;
	width: 25rem;
	height: auto;

	> :nth-child(1) {
		margin: 0.75rem 0;
	}

	> :nth-child(2) {
		margin-top: 0.5rem;
		word-wrap: break-word;
		font-size: 1.2rem;
	}

	> :nth-child(3) {
		width: 10rem;
		margin-left: auto;
		margin-top: 1.5rem;
	}
`

export { PasswordFieldWrapper, SwitchWrapper }
