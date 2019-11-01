import styled, { css } from "styled-components"
import { Button, Icon, H1, H2, H3 } from "../../../components"
import { Form, Header, StyledLink } from "../styles"

export const AccountForm = styled(Form)`
	${({ isLoaded }) =>
		isLoaded &&
		css`
			> :nth-child(4) {
				padding-top: 4rem;
				padding-left: 12rem;
				min-height: 13.875rem;
			}

			> :nth-child(7) {
				padding-top: 4rem;
				padding-left: 12rem;
				min-height: 19.9375rem;
			}
		`}

	> :last-child {
		min-height: 2.4rem;
	}
`

export const Wrapper = styled.div`
	${({ appearanceWrapper }) =>
		appearanceWrapper &&
		css`
			display: grid;
			align-items: center;
			grid-template-columns: 7rem 13rem auto;
			width: 100%;
			min-height: 13.875rem;
			padding: 1.75rem 0;

			> :nth-child(4),
			> :nth-child(5) {
				grid-column: 1 / 4;
			}

			> :nth-child(5) {
				margin-top: 1rem;
				width: 30rem;
			}
		`};

	${({ errorWrapper, hasError }) =>
		errorWrapper &&
		hasError &&
		css`
			margin-top: 1.25rem;
		`};

	${({ aboutWrapper }) =>
		aboutWrapper &&
		css`
			padding: 1.75rem 0;
			min-height: 19.9375rem;

			> :nth-child(1),
			> :nth-child(2),
			> :nth-child(3) {
				width: 30rem;
			}

			> :nth-child(2) {
				margin: 0.75rem 0;
			}
		`};

	${({ accountWrapper }) =>
		accountWrapper &&
		css`
			display: flex;
			flex-direction: column;
			padding: 1.75rem 0;

			> :first-child {
				width: 30rem;
			}

			> :last-child {
				margin-top: 1.5rem;
				margin-left: 21rem;
				margin-right: auto;
			}

			${({ showPasswordChange }) =>
				showPasswordChange
					? css`
							> :nth-child(2),
							> :nth-child(3) {
								width: 30rem;
							}
							> :nth-child(2) {
								margin: 0.85rem 0;
							}
					  `
					: css`
							> :nth-child(2) {
								margin-top: 0.65rem;
								width: fit-content;
							}
					  `}
		`};
`

export const Error = styled.span`
	font-size: 1rem;
	margin-top: 0.25rem;
	padding: 0.25rem 0.5rem;

	color: ${({ theme }) => theme.color10};
	background-color: ${({ theme }) => theme.red1};
`

export const Textarea = styled.textarea`
	outline: none;
	border: none;
	resize: none;
	font-size: 1em;
	font-family: inherit;
	width: 100%;
	padding: 12px 25px 12px 65px;
	border-radius: 3px;
	border: 1px solid transparent;
`

export { Header, StyledLink, Button, Icon, H1, H2, H3 }
