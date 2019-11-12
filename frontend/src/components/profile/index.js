import React from "react"
import styled from "styled-components"
import ReactResponsiveModal from "react-responsive-modal"
import { useQuery } from "@apollo/react-hooks"

import { GET_USER } from "../../graphql"
import { Avatar, H2, Span, Spinner, Button } from "../index"

const Container = styled.div`
	margin: -1.2rem;
	width: 38rem;
	height: 22rem;
	padding: 2rem 1.5rem 1rem;
`

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-column-gap: 2rem;
	margin-top: 1.5rem;

	> :nth-child(1) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		grid-column: 1;
		grid-row: 1 / 13;

		> :nth-child(2) {
			margin-top: 2rem;
			width: auto;
		}

		> :nth-child(3) {
			margin-top: 0.25rem;
			width: auto;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
	}

	> :nth-child(2),
	> :nth-child(4),
	> :nth-child(6) {
		font-size: 1.5rem;
	}

	> :nth-child(3),
	> :nth-child(5),
	> :nth-child(7) {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}

	> :nth-child(8) {
		max-width: 14.5rem;
	}
`

const Error = styled.div`
	font-size: 1.05rem;
	width: auto;
	color: ${({ theme }) => theme.red1};
`

export const Profile = ({ userId, isOpen, onClose, showMessageButton, onOpenChat }) => {
	const { data } = useQuery(GET_USER, {
		variables: { id: userId },
		skip: !userId || userId === -1
	})

	return (
		<ReactResponsiveModal
			open={isOpen}
			onClose={onClose}
			center
			showCloseIcon={false}
			focusTrapped={false}
		>
			<Container>
				{!data ? (
					<Spinner />
				) : (
					<Wrapper>
						<div>
							<Avatar
								avatar={data.user.avatar}
								name={data.user.username}
								notClickable="true"
								size="150"
							/>
							<Span>"{data.user.username}"</Span>
							<Span>
								{data.user.firstname !== null ? data.user.firstname : ""}{" "}
								{data.user.lastname !== null ? data.user.lastname : ""}
							</Span>
							{data.user.suspended === true && <Error>This user is suspended.</Error>}
						</div>

						<H2> Story</H2>
						<Span>{data.user.bio !== null ? data.user.bio : "-"}</Span>
						<H2>Memer since</H2>
						<Span>{new Date(data.user.createdAt).toLocaleString()}</Span>
						<H2>Contact</H2>
						<Span>{data.user.email}</Span>
						{showMessageButton && (
							<Button
								onClick={() => {
									onOpenChat()
									onClose()
								}}
							>
								Start Conversation
							</Button>
						)}
					</Wrapper>
				)}
			</Container>
		</ReactResponsiveModal>
	)
}
