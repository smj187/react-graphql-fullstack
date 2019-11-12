import styled, { css } from "styled-components"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 15rem;
	height: calc(100vh - 6rem);
	margin-top: 6rem;
	overflow-x: hidden;
	overflow-y: scroll;
	background-color: ${({ theme }) => theme.color8};
	border-left: 1px solid ${({ theme }) => theme.shadow2};

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

export const Channel = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0.5rem 0 0.6rem 0;

	cursor: pointer;
	text-decoration: none;

	> :first-child {
		margin-right: 1rem;
		> div {
			/* background-color: ${({ theme }) => theme.color5}; */
		}
	}

	> :nth-child(2) {
		width: auto;
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
		display: none;

		color: ${({ theme }) => theme.color5};
	}

	:hover {
		> :first-child > div {
			background-color: ${({ theme }) => theme.color3};
		}
		> :nth-child(2) {
			color: ${({ theme }) => theme.color3};
		}
		> :nth-child(3) {
			color: ${({ theme }) => theme.purple1};
		}
	}
`
