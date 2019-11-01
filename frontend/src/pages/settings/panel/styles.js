import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { StyledIcon } from "../styles"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	height: 100vh;
	width: 17rem;
	color: ${({ theme }) => theme.color2};
	border-right: 1px solid ${({ theme }) => theme.shadow2};
	/* background: #000000c4; */

	> :first-child {
		width: auto;
		font-size: 2.2rem;
		color: ${({ theme }) => theme.color2};
		margin-bottom: 3rem;
		margin-top: 10rem;
	}

	> :last-child {
		margin-top: auto;
		margin-bottom: 2rem;
	}
`

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	padding-left: 3rem;

	height: 4rem;
	width: 17rem;

	border-right: 5px solid ${({ theme, isActive }) => (isActive ? theme.purple1 : "none")};

	> :nth-child(2) {
		margin-left: 1.35rem;
		font-size: 1.5rem;
	}

	> :nth-child(1),
	> :nth-child(2) {
		color: ${({ theme, isActive }) => (isActive ? theme.color2 : theme.color5)};
	}

	:hover {
		> :nth-child(1),
		> :nth-child(2) {
			color: ${({ theme }) => theme.color2};
		}
	}

	${({ last }) =>
		last &&
		css`
			cursor: pointer;
			font-size: 1.1rem;
			> :nth-child(1),
			> :nth-child(2) {
				color: ${({ theme }) => theme.red1};
			}

			:hover {
				> :nth-child(1),
				> :nth-child(2) {
					color: ${({ theme }) => theme.red2};
				}
			}
		`};
`

export const StyledLink = styled(Link)`
	text-decoration: none;
	margin: 0.25rem 0;
`

export const Spacer = styled.div`
	width: 20rem;
	padding: 1.5rem 0 0.5rem;

	> :last-child {
		margin-left: 1.75rem;
		font-size: 1.15rem;
		color: ${({ theme }) => theme.color9};
	}
`

export { StyledIcon }
