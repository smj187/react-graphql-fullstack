import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
	width: ${({ size }) => size};
	height: ${({ size }) => size};
	position: relative;
`
const StyledImage = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	max-width: 100%;
	max-height: 100%;
	border-radius: 0.25rem;
	box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.shadow1};
`

export const Image = ({ url, size = "10rem", ...rest }) => (
	<Wrapper size={size} {...rest}>
		<StyledImage src={url} />
	</Wrapper>
)
