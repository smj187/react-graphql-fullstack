import styled from "styled-components"

export const Container = styled.div`
	margin: -1.2rem;
	width: 42rem;
	height: auto;
	padding: 2rem 1.5rem 1rem;

	display: grid;
	grid-template-columns: 7rem auto;

	> :first-child {
		grid-column: 1;
		grid-row: 1 / 6;
		margin: 0 auto;
	}

	> :nth-child(3) {
		width: 97%;
	}

	> :nth-child(4) {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		min-height: 41px;
		width: 97%;
	}

	> :last-child {
		grid-column: 1 / 3;
	}
`

export const MetaWrapper = styled.div`
	> :first-child {
		font-size: 1.2rem;
		width: auto;
	}

	> :nth-child(2) {
		width: auto;
		margin-left: 0.25rem;
		font-size: 0.95rem;
		color: ${({ theme }) => theme.color5};
	}
`

export const TagWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`

export const Tag = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	width: auto;
	border: 1px solid ${({ theme }) => theme.red1};
	background: ${({ theme }) => theme.color8};
	padding: 0.25rem 0.5rem;
	border-radius: 0.25rem;
	margin-right: 0.5rem;
	margin-top: 0.25rem;

	> :first-child {
		font-size: 1.1rem;
	}

	> :last-child {
		margin-left: 0.4rem;
		color: ${({ theme }) => theme.red1};
	}

	:hover {
		background: ${({ theme }) => theme.color6};
	}
`

export const AddTag = styled.div`
	position: relative;

	> :first-child {
		width: 8rem;
		padding: 0.35rem 0.6rem 0.35rem 0.6rem;
		margin-top: 0.25rem;
	}

	div {
		background: white;
		position: absolute;
		top: 0.18rem;
		right: 0.08rem;
		height: 29px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: ${({ theme }) => theme.purple1};

		div {
			cursor: pointer;
			svg {
				transform: rotate(45deg);
			}
		}
	}
`

export const Error = styled.div`
	font-size: 1rem;
	width: 100%;
	padding: 0.25rem 0.5rem;
	margin-top: 0.5rem;

	color: ${({ theme }) => theme.color10};
	background-color: ${({ theme }) => theme.red1};
`

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: 2rem;
	padding-bottom: 1.2rem;
	border-top: 1px solid ${({ theme }) => theme.color5};
	margin: 2rem 1rem 0 1rem;

	> :first-child {
		margin-right: auto;
	}

	> :last-child {
		margin-left: 1rem;
	}
`
