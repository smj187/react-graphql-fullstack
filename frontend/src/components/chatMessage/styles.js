import styled, { css } from "styled-components"

export const Container = styled.div`
	display: grid;
	grid-template-columns: 4rem auto 1.5rem;
	padding: 0.5rem 1rem 1rem 1rem;
	width: 100%;
	padding: 1rem 2rem 0.5rem 2rem;

	${({ isLast, theme }) =>
		!isLast &&
		css`
			border-bottom: 1px solid ${theme.shadow2};
		`};

	> :first-child {
		grid-column: 1;
		grid-row: 1 / 10;
	}

	> :nth-child(3) {
		grid-column: 3;
		grid-row: 1 / 10;
		visibility: hidden;
	}

	:hover {
		> :nth-child(3) {
			visibility: unset;
		}
	}
`

export const Meta = styled.div`
	display: flex;
	align-items: baseline;

	> :first-child {
		width: auto;
		cursor: pointer;
		font-size: 1.2rem;
		color: ${({ theme }) => theme.color3};

		:hover {
			text-decoration: underline;
		}
	}

	> :nth-child(2) > span {
		width: auto;
		margin-left: 0.25rem;
		font-size: 0.95rem;
		cursor: pointer;
		color: ${({ theme }) => theme.color5};
	}
`

export const Content = styled.div`
	margin-top: 0.5rem;
	> span {
		font-size: 1.2rem;

		> div > span {
			margin-left: 0.25rem;
			font-size: 1rem;
			cursor: pointer;
		}
	}
`

export const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	> span {
		font-size: 1.1rem;
		width: auto;
		margin-right: 0.1rem;
	}
`

export const File = styled.div`
	margin-top: 1rem;

	${({ isImage }) =>
		isImage &&
		css`
			> div {
				cursor: pointer;
			}
		`};
`

export const Document = styled.div`
	display: flex;
	align-items: center;

	> :first-child {
		color: ${({ theme }) => theme.color4};
		margin-right: 1rem;
	}

	> :nth-child(2) {
		box-shadow: none;
	}
`
