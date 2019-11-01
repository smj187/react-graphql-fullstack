import styled, { css } from "styled-components"

import { Form, PasswordFieldWrapper, SwitchWrapper } from "../styles"

export const RegisterForm = styled(Form)`
	> :nth-child(1) {
		text-align: center;
		font-size: 2.5rem;
	}

	> :nth-child(2) {
		margin-top: 2rem;
	}

	> :nth-child(3) {
		margin-top: 1rem;
	}

	> :nth-child(4) {
		margin-top: 1rem;
	}

	> :nth-child(5) {
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	> :nth-child(6) {
		margin-top: 1rem;
		max-width: 100%;
	}
`

export const AcceptWrapper = styled.div`
	display: flex;
	align-items: center;

	> :first-child {
		color: ${({ theme, hasAccepted }) => (hasAccepted ? theme.purple1 : theme.color5)};
		margin-right: 0.9rem;
		cursor: pointer;
		border: 1px solid;
		border-radius: 0.15rem;

		${({ hasAccepted }) =>
			!hasAccepted
				? css`
						border-color: ${({ theme }) => theme.color5};

						svg {
							visibility: hidden;
						}
				  `
				: css`
						border-color: transparent;
				  `};
	}

	> :last-child {
		color: ${({ theme }) => theme.color4};
		font-size: 1.05rem;
	}
`

export { PasswordFieldWrapper, SwitchWrapper }
