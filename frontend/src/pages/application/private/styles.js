import styled from "styled-components"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
`

export const Navbar = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	width: calc(100% + 15rem);
	height: 6rem;
	border-bottom: 1px solid ${({ theme }) => theme.shadow2};
	border-left: 1px solid ${({ theme }) => theme.shadow2};

	> :first-child {
		margin-left: 2rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-right: 1rem;
		color: ${({ theme }) => theme.purple1};
	}

	> :nth-child(3) {
		margin: 0 1rem;
		cursor: pointer;
		color: ${({ theme }) => theme.color5};

		:hover {
			color: ${({ theme }) => theme.purple2};
		}
	}

	> :last-child {
		margin-left: auto;
		margin-right: 2rem;
	}
`

export const Users = styled.div`
	display: flex;
	flex-wrap: nowrap;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	flex: 1;

	h2 {
		color: ${({ theme }) => theme.color4};
		font-size: 1.6rem;
		font-weight: 900;
		margin-right: 0.25rem;
		width: auto;
	}
`

export const ChatWindow = styled.div`
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: scroll;
	max-height: calc(100vh - 5rem - 5rem);
	flex: 1;
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
`
