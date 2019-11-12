import styled from "styled-components"

export const Form = styled.form`
	margin: -1.2rem;
	width: 32.5rem;
	height: auto;
	padding: 2rem;

	display: flex;
	flex-direction: column;

	> :nth-child(2) {
		margin-bottom: 1rem;
	}
`

export const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;

	margin-top: 1rem;
	padding-top: 1rem;

	> :last-child {
		margin-left: 1rem;
	}
`
