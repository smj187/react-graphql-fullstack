import styled, { css } from "styled-components"
import { Icon } from "../../../components"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	border-left: 1px solid ${({ theme }) => theme.color6};
	/* width: calc(100% - 20rem); */
	height: 100vh;
	/* background: #555; */

	> :last-child {
		margin-top: auto;
	}
`

export const Navbar = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.color6};

	> :first-child {
		margin: 0 1rem;
	}

	> :nth-child(2) {
		width: auto;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	> :last-child {
		margin-left: auto;
		margin-right: 3rem;
	}
`

export const ChatWindow = styled.div`
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: scroll;
	max-height: calc(100vh - 5rem - 5rem);
	flex: 1;
`

export const Empty = styled.div`
	display: ${({ visible }) => (visible === true ? "flex" : "none")};
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 5rem);

	> :last-child {
		width: auto;
		margin-top: 2rem;
		font-size: 1.35rem;
		color: ${({ theme }) => theme.color4};
	}
`

export const FileWrapper = styled.div`
	height: 12.5rem;
	${({ isVideo }) =>
		isVideo &&
		css`
			height: 17rem;
		`};

	${({ isAudio }) =>
		isAudio &&
		css`
			height: 5rem;
		`};
`

export const Image = styled.img`
	max-width: 100%;
	max-height: 100%;

	border-radius: 0.25rem;
	cursor: pointer;
`

export const Video = styled.video`
	margin-top: 1rem;
`

export const Audio = styled.audio`
	margin-top: 0.5rem;
`

export const Document = styled.div`
	padding: 0.65rem;
	border: 1px solid ${({ theme }) => theme.color5};
	border-radius: 0.25rem;
	width: fit-content;
	margin-top: 0.5rem;

	> :first-child {
		color: ${({ theme }) => theme.color3};
		cursor: pointer;
	}
`

export const EmptyImage = styled.img`
	height: 10vh;
`

export const Message = styled.div`
	display: grid;
	grid-template-columns: 6rem auto 5rem;
	border-left: 5px solid ${({ theme, isEditing }) => (isEditing ? theme.red1 : "transparent")};
	padding-top: 1.25rem;
	margin: 0.5rem 1.5rem 0.5rem 1.5rem;
	padding-bottom: 1rem;

	${({ isLast }) =>
		isLast &&
		css`
			border-bottom: 1px solid none;
		`};

	${({ isFirst }) =>
		isFirst &&
		css`
			border-bottom: 1px solid none;
		`};

	${({ isFirst, isLast }) =>
		!isFirst &&
		!isLast &&
		css`
			border-bottom: 1px solid ${({ theme }) => theme.shadow1};
		`};

	> :first-child {
		grid-column: 1;
		grid-row: 1 / 6;
		margin: 0 auto;
	}

	> :nth-child(3) {
		grid-column: 3;
		grid-row: 1 / 6;
		margin-top: 0.5rem;
		margin-bottom: auto;
		visibility: hidden;
	}

	> :nth-child(4) {
		margin-top: 0.5rem;
		font-size: 1.1rem;
		display: flex;
		align-items: center;
	}

	:hover {
		> :nth-child(3) {
			visibility: unset;
		}
	}
`

export const MetaWrapper = styled.div`
	display: flex;
	align-items: center;

	> :first-child {
		font-size: 1.2rem;
		width: auto;
		cursor: pointer;
		:hover {
			text-decoration: underline;
			color: ${({ theme }) => theme.color3};
		}
	}

	> :nth-child(2) {
		width: auto;
		margin-left: 0.25rem;
		font-size: 0.95rem;
		color: ${({ theme }) => theme.color5};
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

export const TagWrapper = styled.div`
	display: flex;
	margin: 0.25rem 0 0.5rem 0;

	${({ isEditing }) =>
		isEditing === true &&
		css`
			margin-top: 0.75rem;
		`};
`

export const Tag = styled.div`
	cursor: pointer;

	> :first-child {
		padding: 0.15rem 0.2rem;
		font-size: 1.1rem;

		:hover {
			text-decoration: underline;
		}
	}

	${({ isEditing }) =>
		isEditing
			? css`
					margin-right: 0.5rem;
					border: 1px solid ${({ theme }) => theme.red1};
					border-radius: 0.25rem;
					display: flex;
					align-items: center;

					> :first-child {
						color: ${({ theme }) => theme.color4};
					}

					> :nth-child(2) {
						color: ${({ theme }) => theme.red1};
					}

					:hover {
						> :first-child {
							text-decoration: none;
						}
					}
			  `
			: css`
					> :nth-child(2) {
						visibility: hidden;
					}
			  `};
`

export const EditMenu = styled.div`
	height: auto;
	width: 100%;
	margin-top: auto;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	margin: 1.5rem 0;

	button {
		height: auto;
		padding: 0.4rem 0.9rem;
	}

	> :first-child {
		margin-right: auto;
	}

	> :nth-child(2) {
		margin-right: 1rem;
	}
`

export const FileWrapper1 = styled.div`
	max-height: 10rem;
	border: 1px solid red;
`

export const Updated = styled.span`
	font-size: 0.75rem;
	color: ${({ theme }) => theme.color4};
	margin-left: 0.25rem;
	cursor: pointer;
`
