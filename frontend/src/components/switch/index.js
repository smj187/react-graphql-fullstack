import React from "react"
import styled from "styled-components"

export const Container = styled.div`
	position: relative;
	margin: 5px 0 0 auto;
`

export const Label = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 42px;
	height: 26px;
	border-radius: 15px;
	background: ${({ theme }) => theme.color5};
	cursor: pointer;
	&::after {
		content: "";
		display: block;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin: 3px;
		margin-top: 4px;
		background: ${({ theme }) => theme.color9};
		box-shadow: 1px 3px 3px 1px ${({ theme }) => theme.shadow1};
		transition: 0.2s;
	}
`
export const Switcher = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 42px;
	height: 26px;
	&:checked + ${Label} {
		background: ${({ theme }) => theme.purple1};
		&::after {
			content: "";
			display: block;
			border-radius: 50%;
			width: 18px;
			height: 18px;
			margin-left: 21px;
			transition: 0.2s;
		}
	}
`
export const Switch = ({ id, checked, onChange }) => {
	return (
		<Container>
			<Switcher id={id} type="checkbox" checked={checked} onChange={onChange} />
			<Label htmlFor={id} />
		</Container>
	)
}
