import React, { useState } from "react"
import Moment from "react-moment"

import { useChat } from "../../../hooks"
import { Span, Avatar, Search, Icon, Confirm, Tooltip } from "../../../components"
import { ChatInput, EditMessage, Profile } from "../../../components"
import { Container, Navbar, ChatWindow, Empty, EmptyImage, Message, StyledIcon } from "./styles"
import { MetaWrapper, TagWrapper, Tag, FileWrapper, Updated, Image, Video } from "./styles"
import { Audio, Document } from "./styles"

import EmptyImagePicture from "../../../assets/2.png"

export const Channel = () => {
	const [state, setState] = useState({
		search: "",
		selectedId: -1,
		height: 41,
		showConfirmModal: false,
		showErrorModal: false,
		showEditModal: false,
		showUserModal: false,
		selectedUserId: -1
	})

	const { channel, messages, deleteMessage, editMessage, setEditMessage } = useChat()

	// TODO: pagination
	// TODO: subscriptions
	// TODO: private messages

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
					<Message
						key={index}
						isFirst={index === 0 && messages.length === 1}
						isLast={index === messages.length - 1}
					>
						<div>
							<Avatar
								name={message.createdBy.username}
								size="55"
								onClick={() => {
									setState({
										...state,
										showUserModal: true,
										selectedUserId: message.createdBy.id
									})
								}}
							/>
						</div>
						<MetaWrapper>
							<Span
								onClick={() => {
									setState({
										...state,
										showUserModal: true,
										selectedUserId: message.createdBy.id
									})
								}}
							>
								{message.createdBy.username}{" "}
							</Span>
							<Span>
								<Moment fromNow>{message.createdAt}</Moment>
							</Span>
						</MetaWrapper>
						<StyledIcon
							name="MoreVert"
							size="24"
							onClick={() => {
								setEditMessage(message)
								setState({ ...state, showEditModal: true })
							}}
						/>
						<Span>
							{message.content}
							{message.updatedAt && (
								<Tooltip
									content={new Date(message.updatedAt).toLocaleString()}
									render={<Updated>(updated)</Updated>}
								/>
							)}
						</Span>
						{message.tags && (
							<TagWrapper>
								{message.tags.map((tag, index) => (
									<Tag key={index}>
										<Span>{tag}</Span>
									</Tag>
								))}
							</TagWrapper>
						)}

						{message.file && message.file.url && (
							<FileWrapper
								isVideo={message.file.format.includes("video")}
								isAudio={message.file.format.includes("audio")}
							>
								{message.file.format === "image" && (
									<Image
										src={message.file.url}
										alt="message image"
										onClick={() => window.open(message.file.url, "_blank")}
									/>
								)}
								{message.file.format === "video" && (
									<Video width="320" height="240" controls>
										<source src={message.file.url} />
										Your browser does not support the video tag.
									</Video>
								)}
								{message.file.format === "audio" && (
									<Audio controls>
										<source src={message.file.url} />
										Your browser does not support the audio tag.
									</Audio>
								)}
								{message.file.format === "document" && (
									<Document>
										<Icon
											name="File"
											size="52"
											onClick={() => window.open(message.file.url, "_blank")}
										/>
									</Document>
								)}
							</FileWrapper>
						)}
					</Message>
				))}
				{channel.id !== null && messages.length === 0 && (
					<Empty visible={() => setTimeout(() => true, 2000)}>
						<EmptyImage src={EmptyImagePicture} />
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
			<EditMessage
				message={editMessage}
				isOpen={state.showEditModal}
				onClose={() => setState({ ...state, showEditModal: false })}
			/>

			<Profile
				userId={state.selectedUserId}
				isOpen={state.showUserModal}
				onClose={() => setState({ ...state, showUserModal: false })}
			/>
		</Container>
	)
}
