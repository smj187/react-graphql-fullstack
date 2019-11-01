import styled from "styled-components"
import { Form, Header, StyledLink } from "../styles"

export const InviteForm = styled(Form)`
	> :nth-child(1),
	> :nth-child(2),
	> :nth-child(3) {
		z-index: 100;
	}
`

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;

	margin-top: 3rem;
	width: 30rem;
	z-index: 2;

	@media (max-width: 1112px) {
		width: 100%;
	}

	> :last-child {
		margin-top: 1rem;
	}
`

export const ContentWrapper = styled.div`
	width: 100%;
	height: calc(100vh - 20rem);
	position: relative;
	z-index: 1;
`

export const Image = styled.img`
	height: auto;
	width: 25%;
	position: absolute;
	top: 0;
	right: 0;
	min-width: 35rem;
	z-index: -1;
`

export { Header, StyledLink }
