import styled, { css } from "styled-components"
import { H2, Span, Button } from "../../../../components"

export const Form = styled.form`
	margin: -1.2rem;
	width: 32.5rem;
	height: auto;
	padding: 2rem 1.5rem 1rem;

	display: flex;
	flex-direction: column;

	> :first-child {
		margin-bottom: 0.5rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	> :nth-child(2),
	> :nth-child(3),
	> :nth-child(4),
	> :nth-child(5) {
		font-size: 1.1rem;
	}

	> :nth-child(5) {
		border-bottom: 1px solid ${({ theme }) => theme.purple1};
		padding-bottom: 1rem;
		margin-bottom: 1rem;
	}

	> :nth-child(7) {
		margin-top: 0.5rem;
		margin-bottom: 1.5rem;
		padding-right: 3.5rem;

		> :last-child {
			width: auto;
		}
	}

	> :last-child {
		margin-top: 2rem;
	}
`

export const AvatarWrapper = styled.div`
	display: grid;
	grid-template-columns: 8rem 10rem 8rem;
	align-items: center;
	justify-items: center;

	> :nth-child(2) {
		label {
			font-size: 0.9rem;
		}
	}

	> :nth-child(3) {
		font-size: 0.9rem;
		margin-left: 1rem;
		padding: 0.4rem 0.8rem;
	}

	> :last-child {
		grid-row: 2;
		grid-column: 1 / 4;
		margin: 0.75rem;
	}
`

export const LockWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;

	> :last-child {
		font-size: 1.15rem;
		margin-left: 0.75rem;
		color: ${({ theme }) => theme.color3};
	}
`

export const BtnWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 1rem;
	padding-top: 1rem;

	> :first-child {
		margin-right: 1rem;
	}
`

export const Wrapper = styled.div`
	${({ avatarWrapper }) => avatarWrapper && css``};

	${({ lockWrapper }) => lockWrapper && css``};

	${({ btnWrapper }) => btnWrapper && css``};
`

export const Error = styled.span`
	font-size: 1rem;
	margin-top: 0.25rem;
	padding: 0.25rem 0.5rem;

	color: ${({ theme }) => theme.color10};
	background-color: ${({ theme }) => theme.red1};
`

export { H2, Span, Button }
