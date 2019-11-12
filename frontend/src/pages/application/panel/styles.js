import styled from "styled-components"
import { Link } from "react-router-dom"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 5rem;
	height: 100vh;
	border-right: 1px solid ${({ theme }) => theme.shadow2};

	> :first-child {
		margin-bottom: auto;
	}

	> :last-child {
		margin-top: auto;
		margin-bottom: 1rem;

		:hover > :first-child > svg {
			color: ${({ theme }) => theme.red1};
		}
	}
`

export const Logo = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 5rem;

	font-size: 3.5rem;
	font-weight: 900;
	width: 5rem;
`

export const StyledLink = styled(Link)`
	text-decoration: none;
	margin: 1rem 0;
`

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3rem;
	width: 3rem;
	cursor: pointer;

	> :first-child {
		color: ${({ theme }) => theme.color5};

		:hover {
			transition: 0.25s;
			transform: scale(1.05);
			color: ${({ theme, last }) => (last ? theme.red1 : theme.color2)};
		}
	}
`
