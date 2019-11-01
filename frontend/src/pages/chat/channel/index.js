import React, { useState } from "react"
import Moment from "react-moment"

import { useChat } from "../../../hooks"
import { Span, Avatar, Search, Icon, Button, Confirm } from "../../../components"
import { ChatInput, StyledTextarea } from "../../../components"
import { Container, Navbar, ChatWindow, Empty, Image, Message, StyledIcon } from "./styles"
import { MetaWrapper, TagWrapper, Tag, EditMenu, FileWrapper } from "./styles"

import EmptyImage from "../../../assets/2.png"

export const Channel = () => {
	const [state, setState] = useState({
		search: "",
		selectedId: -1,
		height: 41,
		showConfirmModal: false,
		showErrorModal: true
	})

	const { channel, messages, deleteMessage } = useChat()

	// TODO: pagination
	// TODO: subscriptions
	// TODO: update message
	// TODO: private messages
	// TODO: corret file representation for image, video, audio and else
	// TODO: update most recent message in channel selection

	return (
		<Container>
			<Navbar>
				{channel.id !== null && (
					<>
						<div>
							<Avatar
								notClickable
								avatar={channel.avatar}
								name={channel.name}
								size="55"
							/>
						</div>
						<Span>#{channel.name}</Span>
						<Search
							value={state.search}
							onChange={e => setState({ search: e.target.value })}
							placeholder="Search.."
						/>
					</>
				)}
			</Navbar>
			<ChatWindow height={state.height}>
				{messages.map((message, index) => (
					<Message key={index} isEditing={state.selectedId === message.id}>
						<div>
							<Avatar name={message.createdBy.username} size="55" />
						</div>

						<MetaWrapper>
							<Span>{message.createdBy.username} </Span>
							<Span>
								<Moment fromNow>{message.createdAt}</Moment>
							</Span>
						</MetaWrapper>

						<StyledIcon
							name="MoreVert"
							size="24"
							onClick={() => {
								setState({
									...state,
									selectedId: state.selectedId !== message.id ? message.id : null
								})
							}}
						/>

						<Span>{message.content}</Span>

						{message.tags && (
							<TagWrapper isEditing={state.selectedId === message.id}>
								{message.tags.map((tag, index) => (
									<Tag key={index} isEditing={state.selectedId === message.id}>
										<Span>{tag}</Span>
										<Icon name="Close" size="24" />
									</Tag>
								))}
							</TagWrapper>
						)}

						{state.selectedId === message.id && (
							<EditMenu>
								<Button
									delete2
									onClick={() => setState({ ...state, showConfirmModal: true })}
								>
									Delete
								</Button>
								<Button flat>Abort</Button>
								<Button>Save</Button>
							</EditMenu>
						)}
					</Message>
				))}
				{channel.id !== null && messages.length == 0 && (
					<Empty visible={() => setTimeout(() => true, 2000)}>
						<Image src={EmptyImage} />
						<Span>No conversation yet...</Span>
					</Empty>
				)}
			</ChatWindow>
			<ChatInput />

			<Confirm
				heading="Delete Message?"
				message="Are you sure you want to delete this message? This process cannot be undone."
				action="Delete Message"
				isOpen={state.showConfirmModal}
				onClose={() => setState({ ...state, showConfirmModal: false })}
				onSuccess={() => deleteMessage(state.selectedId)}
			/>
		</Container>
	)
}
