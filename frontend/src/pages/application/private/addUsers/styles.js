import styled, { css } from "styled-components"
export const Container = styled.div`
	display: flex;
	flex-direction: column;

	width: 35rem;
	margin: -1.2rem;
	padding: 2.2rem;

	${({ hasLoaded }) =>
		hasLoaded &&
		css`
			height: 35rem;
			display: flex;
			align-items: center;
			justify-content: center;
		`};

	> :first-child {
		margin-bottom: 1rem;
	}
`
export const UsersWrapper = styled.div`
	height: 25rem;
	width: 100%;
	overflow-x: hidden;
	overflow-y: scroll;

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
export const User = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0.5rem 1rem;

	border-left: 5px solid ${({ theme, isMember }) => (isMember ? theme.purple1 : "transparent")};

	> :first-child {
		margin-right: 1rem;
	}

	> :nth-child(2) {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	> :nth-child(3) {
		margin-left: 1rem;
		${({ isMember }) =>
			isMember
				? css`
						cursor: not-allowed;
						color: ${({ theme }) => theme.color6};
				  `
				: css`
						color: ${({ theme }) => theme.color5};

						cursor: pointer;

						:hover {
							color: ${({ theme }) => theme.purple1};
						}
				  `};
	}
	> :nth-child(4) {
		margin: 0 1rem;

		${({ isMember }) =>
			!isMember
				? css`
						cursor: not-allowed;
						color: ${({ theme }) => theme.color6};
				  `
				: css`
						color: ${({ theme }) => theme.color5};

						cursor: pointer;

						:hover {
							color: ${({ theme }) => theme.red1};
						}
				  `};
	}

	:hover {
		background-color: ${({ theme }) => theme.color7};
	}
`

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;

	padding-top: 2rem;

	margin-bottom: 0rem;
	margin-top: auto;
	border-top: 1px solid ${({ theme }) => theme.purple1};
`
