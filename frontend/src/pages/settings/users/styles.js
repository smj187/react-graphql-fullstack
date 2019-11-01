import styled, { css } from "styled-components"
import { Button, Icon, H1, H2, H3 } from "../../../components"
import { Form, Header, StyledLink, StyledIcon } from "../styles"

export const UsersFrom = styled(Form)`
	> :nth-child(4) {
		margin: 1rem 0 1.5rem auto;
	}
`

export const Wrapper = styled.div`
	${({ tableHeaderWrapper }) =>
		tableHeaderWrapper &&
		css`
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
		`};

	${({ userWrapper }) =>
		userWrapper &&
		css`
			display: flex;
			align-items: center;
			/* justify-content: center; */

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
		`};

	${({ spinnerWrapper }) =>
		spinnerWrapper &&
		css`
			height: 15rem;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;

			> :last-child {
				width: auto;
				font-size: 1.1rem;
				margin-top: 2rem;
			}
		`};
`

export const Table = styled.table`
	width: 100%;
	/* border: 1px solid black; */
	border-collapse: collapse;
	th,
	td {
		/* border: 1px solid black; */
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

export { Header, StyledLink, StyledIcon, Button, Icon, H1, H2, H3 }
