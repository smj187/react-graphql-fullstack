import styled from "styled-components"

export const Container = styled.div`
	width: inherit;
	padding: 2rem;
	border-top: 1px solid ${({ theme }) => theme.shadow2};
	border-left: 1px solid ${({ theme }) => theme.shadow2};
	position: relative;

	> :first-child {
		color: ${({ theme }) => theme.color5};
		cursor: pointer;
		width: fit-content;
		position: absolute;
		left: 2.75rem;
		top: 2.5rem;

		:hover {
			color: ${({ theme }) => theme.color4};
		}
	}

	> :nth-child(3) {
		padding-left: 4rem;
	}
`

export const Spacer = styled.div`
	border-right: 1px solid ${({ theme }) => theme.color5};
	width: 1px;
	position: absolute;
	height: calc(100% - 4rem - 4px);
	left: 5rem;
`

export const Label = styled.label`
	cursor: pointer;

	> :last-child {
		color: ${({ theme }) => theme.purple1};
	}

	:hover > :last-child {
		color: ${({ theme }) => theme.purple2};
	}
`
export const Input = styled.input.attrs({ type: "file" })`
	display: none;
`

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: -1.2rem;
	width: 35rem;
	height: auto;
	padding: 1.2rem;

	> :nth-child(2) {
		margin-top: 2rem;
		margin-bottom: 1rem;
		textarea {
			min-height: 41px;
		}
	}
`

export const Upload = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: -1.2rem;
	width: 35rem;
	height: auto;
	min-height: 21.610625rem;
	padding: 1.2rem;

	> :last-child {
		margin-top: 2rem;
		width: auto;
	}
`

export const FileWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	max-height: 10rem;

	> :first-child {
		margin: 0 1rem;
	}

	> :nth-child(2) {
		flex: 1;
		font-size: 1rem;
		font-weight: 900;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-left: 0.5rem;
		color: ${({ theme }) => theme.color4};
	}
`

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;

	margin-top: 1rem;

	> :last-child {
		margin-left: 1rem;
	}
`

export const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: -1.2rem;
	max-width: 25rem;
	padding: 3rem 1.2rem;
	padding-bottom: 1rem;
	height: auto;
`

export const Error = styled.div`
	display: flex;
	align-items: center;

	> :first-child {
		color: ${({ theme }) => theme.red1};
		margin-right: 1rem;
	}

	> :nth-child(2) {
		font-size: 1.5rem;
		flex: 1;
		word-wrap: break-word;
		color: ${({ theme }) => theme.red1};
	}
`

export const IconWrapper = styled.div`
	> :first-child {
		color: ${({ theme }) => theme.color4};
	}
`
