import React from "react"
import styled from "styled-components"

import { H2, Strong } from ".."

export const Container = styled.div`
	width: 100%;
	height: 5rem;
	border-bottom: 1px solid ${({ theme }) => theme.shadow2};
	position: relative;

	> :first-child {
		font-size: 1.2rem;
		position: absolute;
		left: 0.5rem;
		bottom: 0.5rem;
		word-break: break-all;
		overflow: hidden;
		padding-right: 1rem;
	}
`

export const FirstMessage = ({ name, type }) => (
	<Container>
		<H2>
			Welcome to the be beginning of the <Strong>#{name}</Strong>-{type}.
		</H2>
	</Container>
)
