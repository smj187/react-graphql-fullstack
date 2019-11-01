import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
	border: 1px solid blue;
	width: auto;
`

const Label = styled.label`
	display: block;
	margin: 0.2em;
	cursor: pointer;
	padding: 0.2em;
`

const Input = styled.input`
	display: none;

	+ label:active:before {
		transform: scale(0);
	}

	:checked + label:before {
		background-color: MediumSeaGreen;
		border-color: MediumSeaGreen;
		color: #fff;
	}
	:disabled + label:before {
		transform: scale(1);
		border-color: #aaa;
	}
	:checked:disabled + label:before {
		transform: scale(1);
		background-color: #bfb;
		border-color: #bfb;
	}
`

export const Checkbox = ({ id, value, label, checked, onChange, ...props }) => (
	<Wrapper>
		<Input type="checkbox" id={id} />
		<Label htmlFor={id}>{label}</Label>
	</Wrapper>
)
