import styled from "styled-components"
import { Link } from "react-router-dom"
import { Icon, Span } from "../../../../components"

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

export const Content = styled.div`
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

export const ListWrapper = styled.div`
	border: 2px dashed ${({ theme }) => theme.color5};
	padding: 1rem 1.5rem;
	width: auto;
	max-width: 55rem;
	min-width: 40rem;
	margin-top: 3rem;
`

export const ChannelWrapper = styled.div`
	display: grid;
	grid-template-columns: 4rem auto 3.5rem 3.5rem 3.5rem;

	padding: 1rem;
	margin: 0.5rem 0;

	border: 2px solid ${({ theme }) => theme.color5};
	background-color: ${({ theme }) => theme.color9};

	> :nth-child(1) {
		grid-column: 1;
		grid-row: 1 / 3;
		> :first-child {
			cursor: grab;
		}
	}

	> :nth-child(2) {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	> :nth-child(3),
	> :nth-child(4),
	> :nth-child(5) {
		font-size: 1rem;
		color: ${({ theme }) => theme.color4};
		grid-row: 1 / 3;
	}

	> :nth-child(3) {
		grid-column: 3;
		> :first-child {
			cursor: grab;
		}
	}

	> :nth-child(4) {
		grid-column: 4;
	}

	> :nth-child(5) {
		grid-column: 5;
	}

	:hover {
		background-color: ${({ theme }) => theme.color6};
	}
`

export const AddChannelWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 1rem;
	margin: 0.5rem 0;
	border: 2px solid ${({ theme }) => theme.color5};

	> ${Span} {
		margin-right: 1.5rem;
		margin-bottom: 0.2rem;
		width: auto;
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
