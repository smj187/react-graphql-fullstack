import React, { useState, useEffect } from "react"
import Moment from "react-moment"
import ReactResponsiveModal from "react-responsive-modal"

import { useChat } from "../../hooks"
import { StyledTextarea, Span, Icon, Avatar, Button, Input } from "../index"
import { Container, Footer, MetaWrapper, TagWrapper, Tag, AddTag, Error } from "./styles"

export const EditMessage = ({ message, isOpen, onClose }) => {
	const [editMessage, setEditMessage] = useState(null)
	const [tag, setTag] = useState("")
	const [error, setError] = useState({ tags: null })

	const { deleteMessage, updateMessage } = useChat()

	useEffect(() => {
		if (message) {
			setEditMessage(message)
			console.log("got", message)
		}
	}, [message])

	const addTagToMessage = (e, isButton) => {
		if (e.keyCode === 13 || isButton) {
			console.log("add", tag)
			if (!tag) {
				setError({ tags: "Please provide a valid tag" })
			} else if (tag.charAt(0) !== "#") {
				setError({ tags: "A tag needs to start with '#'" })
			} else if (editMessage.tags.includes(tag)) {
				setError({ tags: "Tag already in list" })
			} else {
				setEditMessage({ ...editMessage, tags: [...editMessage.tags, tag] })
				setTag("")
			}
		}
	}

	if (!message || !editMessage) {
		return <div />
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
				<div>
					<Avatar name={message.createdBy.username} size="75" />
				</div>
				<MetaWrapper>
					<Span>{message.createdBy.username} </Span>
					<Span>
						<Moment fromNow>{message.createdAt}</Moment>
					</Span>
				</MetaWrapper>
				<div> {error.tags && <Error>{error.tags}</Error>}</div>
				<StyledTextarea
					minRows={1}
					value={editMessage.content}
					placeholder=""
					onChange={e => setEditMessage({ ...editMessage, content: e.target.value })}
					maxRows={10}
				/>
				<TagWrapper>
					{editMessage.tags &&
						editMessage.tags.map((tag, index) => (
							<Tag
								key={index}
								onClick={() => {
									console.log("rm", tag)
									setEditMessage({
										...editMessage,
										tags: editMessage.tags.filter(t => t !== tag)
									})
								}}
							>
								<Span>{tag}</Span>
								<Icon name="Close" size="24" />
							</Tag>
						))}
					<AddTag>
						<Input
							value={tag}
							onChange={e => setTag(e.target.value)}
							onKeyDown={addTagToMessage}
						/>
						<div>
							<Icon name="Close" size="24" onClick={e => addTagToMessage(e, true)} />
						</div>
					</AddTag>
				</TagWrapper>

				<Footer>
					<Button
						delete
						onClick={() => {
							deleteMessage(message.id)
							onClose()
						}}
					>
						Delete Message
					</Button>
					<Button flat onClick={onClose}>
						Abort
					</Button>
					<Button
						onClick={() => {
							updateMessage(editMessage)
							onClose()
						}}
					>
						Update
					</Button>
				</Footer>
			</Container>
		</ReactResponsiveModal>
	)
}
