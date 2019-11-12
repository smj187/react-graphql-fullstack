import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { Span } from "../../../components"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 20rem;
	height: 100vh;
`

export const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 6rem;
	width: 20rem;
	border-bottom: 1px solid ${({ theme }) => theme.shadow2};

	> :first-child {
		width: auto;
		font-size: 2.2rem;
		font-weight: 900;
		letter-spacing: 1px;
	}
`

export const ChannelWrapper = styled.div`
	width: 20rem;
	margin-top: 2rem;
	overflow-x: hidden;
	overflow-y: scroll;

	${({ channels, privateChannels }) =>
		(channels &&
			css`
				height: calc(50vh - 5rem);
			`) ||
		(privateChannels &&
			css`
				height: calc(50vh - 5rem);
				margin-bottom: 0;
			`)};

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

	${({ hasLoaded }) =>
		!hasLoaded
			? css`
					display: flex;
					justify-content: center;
					align-items: center;
			  `
			: css`
					padding: 0.25rem 1rem;
			  `};
`

export const Channels = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	> :first-child {
		margin-bottom: 1rem;
	}
`

export const Channel = styled(Link)`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0.5rem 0 0.6rem 0;

	cursor: pointer;
	text-decoration: none;

	> :nth-child(2) {
		width: auto;
		margin-left: 1rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 1.1rem;
		letter-spacing: 0.8px;
		padding-right: 1rem;
		color: ${({ theme }) => theme.color5};
	}

	> :nth-child(3) {
		margin-left: auto;
		margin-right: 0.5rem;

		color: ${({ theme }) => theme.color5};
	}

	:hover {
		> :first-child > div {
			background-color: ${({ theme }) => theme.color3};
		}
		> :nth-child(2) > span {
			color: ${({ theme }) => theme.color3};
		}
		> :nth-child(3) {
			color: ${({ theme }) => theme.red1};
		}
	}
`

export const Private = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	cursor: pointer;
	text-decoration: none;

	> :first-child {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem 0.6rem 0;
		text-decoration: none;
	}

	> :nth-child(2) {
		width: auto;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 1.1rem;
		flex: 1;
		letter-spacing: 0.8px;
		color: ${({ theme }) => theme.color5};
		padding: 0.6rem 0.5rem 0.75rem 1rem;
	}

	> :nth-child(3) {
		margin-left: auto;
		padding: 0.6rem 0.25rem 0.8rem 0.25rem;
		color: ${({ theme }) => theme.color5};
	}

	:hover {
		> :first-child > div {
			background-color: ${({ theme }) => theme.color3};
		}
		> :nth-child(2) > span {
			color: ${({ theme }) => theme.color3};
		}
		> :nth-child(3) {
			color: ${({ theme }) => theme.red1};
		}
	}
`

export const AvatarWrapper = styled.div`
	/* > div {
		background-color: ${({ theme, isActive }) => isActive && theme.color3};
	} */
`

export const Users = styled(Link)`
	text-decoration: none;
`

export const User = styled(Span)`
	width: auto;
	margin-left: auto;
	margin-right: 0.1rem;
	text-decoration: none;

	color: ${({ theme, isactive }) => (isactive ? theme.color3 : theme.color5)};
`

export const Name = styled.div`
	> span {
		width: auto;
		margin-left: auto;
		margin-right: 0.1rem;

		color: ${({ theme, isActive }) => (isActive ? theme.color3 : theme.color5)};
	}
`
