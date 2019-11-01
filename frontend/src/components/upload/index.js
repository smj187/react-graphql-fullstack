import React from "react"
import styled from "styled-components"

const Label = styled.label`
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0.6rem 1rem;
	font-size: 1.1rem;

	display: inline-block;
	border: 0;
	text-decoration: none;
	vertical-align: middle;
	overflow: hidden;
	cursor: pointer;
	outline: 0;
	z-index: 1;
	transition: all 0.15s ease-in;
	border-radius: 0.15rem;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
		0 1px 5px 0 rgba(0, 0, 0, 0.06);

	color: ${({ theme }) => theme.purple2};
	background-color: ${({ theme }) => theme.color7};

	:hover {
		background-color: ${({ theme }) => theme.color6};
	}
`
const Input = styled.input.attrs({ type: "file" })`
	display: none;
`
const Span = styled.span``

export const Upload = ({ onChange }) => (
	<div>
		<Label htmlFor="avatar">
			<Input
				type="file"
				name="avatar"
				multiple={false}
				id="avatar"
				accept="image/png, image/jpeg, image/gif"
				onChange={onChange}
			/>
			<Span>Upload New Picture</Span>
		</Label>
	</div>
)
