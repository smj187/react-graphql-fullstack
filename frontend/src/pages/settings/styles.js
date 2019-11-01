import styled from "styled-components"
import { Link } from "react-router-dom"
import { Icon } from "../../components"

export const Form = styled.form`
	display: flex;
	flex-direction: column;

	padding-left: 7.5rem;
	padding-right: 3.5rem;
	padding-bottom: 8.5rem;
	color: ${theme => theme.color2};
	min-height: 100vh;
	overflow-y: auto;
	overflow-x: hidden;

	@media (max-width: 996px) {
		padding-left: 1.5rem;
		padding-right: 0;
	}

	@media (min-width: 1440px) {
		width: calc(996px + 7rem);
	}
`

export const Header = styled.div`
	display: flex;
	align-items: center;
	min-height: 9rem;
	margin-bottom: 1.5rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	@media (min-width: 1440px) {
		width: 996px;
	}
`

export const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 2.5rem;
	height: 2.5rem;
	margin-left: auto;
	margin-right: 3rem;

	> :first-child {
		color: ${({ theme }) => theme.color1};
	}

	:hover {
		background-color: ${({ theme }) => theme.color6};
	}
`

export const StyledIcon = styled(Icon)`
	display: flex;
	align-items: center;
	justify-content: center;

	> :first-child {
		color: ${({ theme, marked }) => (marked === true ? theme.red1 : theme.color5)};

		cursor: pointer;

		:hover {
			transition: 0.25s;
			transform: scale(1.1);
			color: ${({ theme, red }) => (red ? theme.red1 : theme.color2)};
		}
	}

	> :nth-child(2) {
		margin-left: 1rem;
	}
`
