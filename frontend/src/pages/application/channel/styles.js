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
	}

	> :last-child {
		margin-left: auto;
		margin-right: 2rem;
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
