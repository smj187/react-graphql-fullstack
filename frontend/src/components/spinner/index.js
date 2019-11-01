import React from "react"
import styled from "styled-components"

const Wrap = styled.div`
	box-sizing: border-box;
	display: table-cell;
	vertical-align: middle;

	margin: ${({ margin }) => margin};
	padding: ${({ padding }) => padding};
`

const Loading = styled.div`
	box-sizing: border-box;
	position: relative;
	display: inline-block;
	width: 3rem;
	height: 3rem;
	background-color: transparent;
	border-radius: 100%;
	animation: loading-spin 1s infinite linear;

	:after {
		content: "";
		box-sizing: border-box;
		display: inline-block;
		position: absolute;
		width: 110%;
		height: 110%;
		top: -5%;
		left: -5%;
		right: 0;
		bottom: 0;
		border: 5px solid transparent;
		border-radius: 100%;
		box-shadow: 1px 1px 1px ${({ theme }) => theme.purple1};
	}
	@keyframes loading-spin {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}
`

export const Spinner = ({ margin, padding }) => {
	return (
		<Wrap margin={margin} padding={padding}>
			<Loading />
		</Wrap>
	)
}
