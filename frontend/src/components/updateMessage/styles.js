import styled from "styled-components"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: -1.2rem;
	width: 35rem;
	height: auto;
	padding: 2.2rem;

	> :first-child {
		margin-bottom: 1.5rem;
	}

	> :nth-child(2) > textarea {
		min-height: 41px;
	}

	> :nth-child(3) {
		margin: 1rem 0;
	}
`

export const TagWrapper = styled.div`
	display: grid;
	grid-template-columns: auto 11rem;

	> :nth-child(2) {
		margin-left: 1rem;
	}
`

export const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	grid-column: 1 / 3;
	margin-top: 1rem;
`

export const Tag = styled.div`
	display: flex;
	align-items: center;

	border: 1px solid ${({ theme }) => theme.red1};
	border-radius: 0.35rem;
	margin-right: 0.25rem;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	margin-top: 0.25rem;

	> :first-child {
		margin-right: 0.5rem;

		color: ${({ theme }) => theme.color4};
	}

	> :nth-child(2) {
		color: ${({ theme }) => theme.red1};
	}

	:hover {
		background: ${({ theme }) => theme.color6};
	}
`

export const Error = styled.div`
	font-size: 1rem;
	width: 100%;
	padding: 0.25rem 0.5rem;
	margin-bottom: 1rem;

	color: ${({ theme }) => theme.color10};
	background-color: ${({ theme }) => theme.red1};
`

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 1rem 0 1rem 1rem;
	padding-bottom: 0;
	margin-top: 1.5rem;

	> :first-child {
		margin-right: 1rem;
	}
`
