import React from "react"
import ReactTextareaAutoSize from "react-textarea-autosize"
import styled from "styled-components"

import { Icon } from "../index"

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	> :last-child {
		display: ${({ hasError }) => (hasError ? "block" : "none")};
	}
`

const Label = styled.label`
	font-size: 1.1rem;
	text-transform: capitalize;
	margin-bottom: 0.25rem;
	cursor: auto;

	color: ${({ theme, hasError }) => (hasError ? theme.red2 : theme.color4)};
`
const Input = styled.input`
	outline: none;
	border: none;
	resize: none;
	padding: 0.55rem 0.6rem;

	font-family: inherit;
	font-size: 1.1rem;
	border: 1px solid;
	border-radius: 0.15rem;

	border-color: ${({ theme, hasError }) => (hasError ? theme.red2 : theme.color5)};
	color: ${({ theme }) => theme.color2};
	background-color: ${({ theme }) => theme.color8};

	:focus {
		border-color: ${({ theme, hasError }) => (hasError ? theme.red2 : theme.purple1)};
	}
`

export const StyledTextarea = styled(ReactTextareaAutoSize)`
	outline: none;
	border: 1px solid;
	resize: none;
	width: 100%;
	padding: 0.55rem 0.6rem;
	font-family: inherit;
	font-size: 1.1rem;
	border-radius: 0.15rem;

	border-color: ${({ theme, hasError }) => (hasError ? theme.red2 : theme.color5)};
	color: ${({ theme }) => theme.color2};
	background-color: ${({ theme }) => theme.color8};

	:focus {
		border-color: ${({ theme, hasError }) => (hasError ? theme.red2 : theme.purple1)};
	}
`

const Error = styled.span`
	font-size: 1rem;
	margin-top: 0.25rem;
	padding: 0.25rem 0.5rem;

	color: ${({ theme }) => theme.color10};
	background-color: ${({ theme }) => theme.red1};
`

export const TextField = ({ id, label, type, name, value, onChange, placeholder, error }) => {
	return (
		<Wrapper hasError={!!error}>
			<Label hasError={!!error}>{label}</Label>
			<Input
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				hasError={!!error}
			/>
			<Error>{error}</Error>
		</Wrapper>
	)
}

export const Textarea = ({ label, name, placeholder, value, onChange, error }) => {
	return (
		<Wrapper hasError={!!error}>
			<Label hasError={!!error}>{label}</Label>
			<StyledTextarea
				minRows={3}
				maxRows={6}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			<Error>{error}</Error>
		</Wrapper>
	)
}

const SearchWrapper = styled.div`
	position: relative;
	> :first-child {
		position: absolute;
		top: 0.59rem;
		left: 0.55rem;
		color: ${({ theme }) => theme.color5};
	}

	> :last-child {
		padding-left: 2.35rem;

		::placeholder {
			color: ${({ theme }) => theme.color5};
		}
	}
`

export const Search = ({ value, placeholder, onChange }) => {
	return (
		<SearchWrapper>
			<Icon name="Search" size="24" />
			<Input
				type="text"
				name="search"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</SearchWrapper>
	)
}
