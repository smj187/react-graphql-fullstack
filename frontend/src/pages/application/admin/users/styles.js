import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { Icon } from "../../../../components"

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

	> :nth-child(3) {
		margin: 2.5rem 0 1rem 0;

		input {
			width: 30rem;
		}
	}
`

export const Table = styled.table`
	width: 80%;
	border-collapse: collapse;
	th,
	td {
		border-collapse: collapse;
	}

	thead {
		border-bottom: 2px solid ${({ theme }) => theme.purple1};
	}

	td,
	tr {
		font-size: 1.15rem;
		padding: 1rem;
	}

	tbody > tr {
		:nth-child(2n) {
			background-color: ${({ theme }) => theme.color7};
		}

		:hover {
			background-color: ${({ theme }) => theme.color6};
		}
	}

	tr {
		text-align: left;

		> :first-child {
			width: auto;
		}

		> :nth-child(2) {
			width: auto;
		}

		> :nth-child(3) {
			width: 8rem;
		}

		> :nth-child(4) {
			width: 12.5rem;
			padding-right: 0;
		}

		> :nth-child(6) {
			> :first-child {
				padding-left: 0.5rem;
			}
		}

		> :nth-child(5),
		> :nth-child(6),
		> :nth-child(7) {
			width: 3.5rem;
		}
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

export const TableHeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 0.8rem 1rem;
	font-weight: 500;
	cursor: pointer;

	color: ${({ theme }) => theme.color2};
	background-color: ${({ theme, active }) => (active ? theme.color6 : "transparent")};

	> :first-child {
		margin-right: 0.75rem;
		width: auto;
	}

	> :nth-child(2),
	> :nth-child(3) {
		color: ${({ theme }) => theme.color4};
	}

	> :nth-child(2) {
		display: ${({ sort }) => (sort === "ASCD" || sort === null ? "block" : "none")};
	}

	> :nth-child(3) {
		display: ${({ sort }) => (sort === "DESC" ? "block" : "none")};
	}
`

export const UserWrapper = styled.div`
	display: flex;
	align-items: center;

	${({ suspended }) =>
		suspended &&
		css`
			border-left: 4px solid ${({ theme }) => theme.red1};
			height: 100%;
			margin: -1rem;
			padding: 1rem;
			padding-left: calc(1rem - 4px);
		`};

	> :nth-child(2) {
		margin: 0 1rem;
	}

	${({ suspended }) =>
		suspended &&
		css`
			> :last-child {
				color: ${({ theme }) => theme.red1};
			}
		`};
`
