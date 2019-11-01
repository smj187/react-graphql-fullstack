import styled from "styled-components"
import { Button, Icon, H1, H2, H3, Span } from "../../../components"
import { Form, Header, StyledLink, StyledIcon } from "../styles"

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

export { Form, Header, StyledLink, StyledIcon, Button, Icon, H1, H2, H3, Span }
