import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 20rem;
	height: 100vh;

	/* box-shadow: inset 1px 4px 9px -6px; */
	/* box-shadow: inset 5px 0 5px -5px rgba(0, 0, 0, 0.15), inset -5px 0 5px -5px rgba(0, 0, 0, 0.15); */

	color: ${props => props.theme.theme2};
	background: ${props => props.theme.theme1};
	/* background: #000; */

	> :last-child {
		margin-top: auto;
	}
`

export const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2rem;
	margin-bottom: 1.5rem;
`

export const ProfileWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 4.25rem;
	width: 100%;
	border-top: 1px solid ${({ theme }) => theme.shadow1};

	> :first-child {
		margin: 0 1rem;
	}

	> :nth-child(2) {
		width: auto;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 1.1rem;
	}

	> :nth-child(3) {
		margin-left: auto;
		margin-right: 0.5rem;
		color: ${({ theme }) => theme.color5};
	}
`

export const StyledLink = styled(Link)`
	height: 3rem;
	width: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;

	> :first-child {
		color: ${({ theme }) => theme.color5};

		:hover {
			transition: 0.25s;
			transform: scale(1.075);
			color: ${({ theme }) => theme.color2};
		}
	}
`

export const Image = styled.img`
	height: 6rem;
	margin-top: 2rem;
`

export const ChannelWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
	height: calc(100vh - 8rem - 4.25rem);

	:hover {
		::-webkit-scrollbar-thumb {
			background: ${({ theme }) => theme.purple1};
		}
	}

	::-webkit-scrollbar-track {
		background: ${({ theme }) => theme.color9};
	}

	::-webkit-scrollbar {
		width: 5px;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 2px;
		background: transparent;
	}
`

export const ChannelLink = styled(Link)`
	text-decoration: none;
`

export const Channel = styled.div`
	/* border: 1px solid red; */
	display: grid;
	grid-template-columns: ${({ hasNewMessages }) =>
		hasNewMessages ? "4.6rem auto 2rem" : "4.6rem auto"};
	align-items: center;
	padding: 0.5rem;
	cursor: pointer;

	> :nth-child(1) {
		margin: 0 1rem;
		grid-column: 1;
		grid-row: 1/3;
	}

	> :nth-child(2) {
		font-size: 1.25rem;
		padding-right: 0.5rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	${({ hasNewMessages }) =>
		hasNewMessages &&
		css`
			> :nth-child(3) {
				margin-left: auto;
				margin-right: 1rem;

				grid-column: 3;
				grid-row: 1/3;
			}
		`};

	> :last-child {
		font-size: 0.9rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	:hover {
		background-color: ${({ theme }) => theme.color5};
	}
`

export const Badge = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 23px;
	height: 23px;
	border-radius: 50%;
	font-size: 0.9rem;
	color: ${({ theme }) => theme.color9};
	background-color: ${({ theme }) => theme.purple1};

	:hover {
		background-color: ${({ theme }) => theme.purple2};
	}
`
