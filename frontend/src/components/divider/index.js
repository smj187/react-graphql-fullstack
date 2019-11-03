import styled from "styled-components"

export const Divider = styled.div`
	display: block;
	margin: 0;
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: ${({ theme }) => theme.shadow1};
`
