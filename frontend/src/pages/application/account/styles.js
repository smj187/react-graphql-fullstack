import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 10vw;

	overflow: auto;
	width: 100%;
	height: 100vh;
`

export const Header = styled.div`
	display: flex;
	align-items: center;
	min-height: 9rem;
	margin-bottom: 1.5rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 50rem;

	> :first-child {
		font-size: 4rem;
		font-weight: 900;
	}
`

export const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;

	margin-left: auto;
	margin-right: 3rem;

	> :first-child {
		color: ${({ theme }) => theme.color5};
	}

	:hover > :first-child {
		color: ${({ theme }) => theme.color2};
	}
`

export const Loading = styled.div`
	height: calc(100vh - 11.5rem);
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-left: 25vw;
	padding-top: 20vh;

	> :nth-child(2) {
		margin-top: 2rem;
		width: auto;
	}
`

export const Content = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 8.5rem;
`

export const AppearanceWrapper = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 7rem 13rem auto;
	width: 100%;
	padding: 1.75rem 0;

	> :nth-child(4),
	> :nth-child(5) {
		grid-column: 1 / 4;
	}

	> :nth-child(5) {
		margin-top: 1rem;
		width: 30rem;
	}
`

export const ErrorWrapper = styled.div`
	margin-top: 1.25rem;
`

export const Error = styled.span`
	font-size: 1rem;
	margin-top: 0.25rem;
	padding: 0.25rem 0.5rem;

	color: ${({ theme }) => theme.color10};
	background-color: ${({ theme }) => theme.red1};
`

export const AboutWrapper = styled.div`
	padding: 1.75rem 0;
	> :nth-child(1),
	> :nth-child(2),
	> :nth-child(3) {
		width: 30rem;
	}

	> :nth-child(2) {
		margin: 0.75rem 0;
	}
`

export const AccountWrapper = styled.div`
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
`
