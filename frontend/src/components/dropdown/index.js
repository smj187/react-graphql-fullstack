import React from "react"
import styled, { css } from "styled-components"

import { Icon, Span } from ".."

const StyledIcon = styled(Icon)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	z-index: 999;

	> :first-child {
		color: ${({ theme, marked }) => (marked === true ? theme.red1 : theme.color5)};

		cursor: pointer;

		:hover {
			transition: 0.25s;
			transform: scale(1.025);
			color: ${({ theme, red }) => (red ? theme.red1 : theme.color2)};
		}
	}

	> :nth-child(2) {
		margin-left: 1rem;
	}
`

const Wrapper = styled.div`
	position: relative;
	display: inline-block;

	${({ isOpen }) =>
		isOpen &&
		css`
			> :nth-child(2) {
				display: block;
			}
		`};
`

const Content = styled.div`
	display: none;
	position: absolute;
	background-color: ${({ theme }) => theme.color8};
	min-width: 10rem;
	box-shadow: 0px 0.5rem 1rem 0px ${({ theme }) => theme.shadow1};
	border-radius: 0.25rem;
	z-index: 1;
	right: 0rem;
	top: -2rem;
`

const Item = styled.div`
	color: black;
	padding: 0.8rem 1rem;
	text-decoration: none;
	display: flex;
	align-items: center;
	cursor: pointer;

	> :first-child {
		margin-right: 0.75rem;
		color: ${({ theme }) => theme.color2};
	}

	> :nth-child(2) {
		font-size: 1.15rem;
	}

	:hover {
		> :first-child,
		> :nth-child(2) {
			color: ${({ theme }) => theme.color8};
		}
		overflow: hidden;
		background-color: ${({ theme }) => theme.purple1};
	}
`

export const Dropdown = ({ isOpen, onEdit, onDelete }) => {
	return (
		<Wrapper isOpen={isOpen}>
			<StyledIcon name="MoreVert" size="24" />
			<Content>
				<Item onClick={onEdit}>
					<Icon name="Edit" size="21" />
					<Span>Edit</Span>
				</Item>
				<Item onClick={onDelete}>
					<Icon name="Trash" size="17" />
					<Span>Delete</Span>
				</Item>
			</Content>
		</Wrapper>
	)
}
