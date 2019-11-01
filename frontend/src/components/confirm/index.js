import React from "react"
import styled from "styled-components"
import ReactResponsiveModal from "react-responsive-modal"
import { H2, Span, Button } from "../index"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: -1.2rem;
	width: 28rem;
	height: auto;
	padding: 2rem 1.5rem 1rem;

	> :first-child {
		margin-bottom: 1.25rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	> :nth-child(2) {
		word-break: break-word;
	}

	> :last-child {
		display: flex;
		justify-content: flex-end;
		margin-top: 1.5rem;
		margin-bottom: 1rem;

		> :last-child {
			margin-left: 1rem;
		}
	}
`

export const Confirm = ({ heading, message, action, isOpen, onClose, onSuccess }) => {
	const onConfirm = () => {
		onClose()
		onSuccess()
	}
	return (
		<ReactResponsiveModal
			open={isOpen}
			onClose={onClose}
			center
			showCloseIcon={false}
			focusTrapped={false}
		>
			<Container>
				<H2>{heading}</H2>
				<Span>{message}</Span>
				<div>
					<Button flat onClick={onClose}>
						Cancel
					</Button>
					<Button confirm onClick={onConfirm}>
						{action}
					</Button>
				</div>
			</Container>
		</ReactResponsiveModal>
	)
}
