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

export const ChatWindow = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-height: calc(100vh - 5rem);
	flex: 1;
	border-left: 1px solid ${({ theme }) => theme.shadow2};

	> :nth-child(2) {
		width: auto;
		font-size: 4rem;
	}

	> :nth-child(3) {
		width: auto;
		margin-top: 2rem;
		color: ${({ theme }) => theme.color5};
	}
`
