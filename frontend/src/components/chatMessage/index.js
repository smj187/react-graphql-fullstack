import React, { useEffect, useReducer, useRef } from "react"
import Moment from "react-moment"

import { useAuth, useApplication } from "../../hooks"
import { Avatar, Span, Icon, Image, Tooltip, Profile, Dropdown, Confirm, Button } from ".."
import { UpdateMessage } from ".."
import { Container, Meta, Content, Tags, File, Document } from "./styles"

export const ChatMessage = ({ isLast, message }) => {
	const { currentUser } = useAuth()
	const { onCreatePrivateChat, onDeleteMessage, onUpdateMessage } = useApplication()

	const reducer = (state, action) => {
		switch (action.type) {
			case "OPEN_PRIVATE_CHANNEL":
				if (action.payload.isLocked) {
					return { ...state, showErrorModal: true }
				}
				onCreatePrivateChat(action.payload)
				return state

			case "OPEN_USER_MODAL":
				return { ...state, showUserProfile: true, selectedUser: action.payload }
			case "CLOSE_USER_MODAL":
				return { ...state, showUserProfile: false, selectedUser: -1 }

			case "TOGGLE_MENU":
				return { ...state, showMenu: !state.showMenu, selectedMessageId: action.payload }
			case "CLOSE_MENU":
				return { ...state, showMenu: false }

			case "OPEN_DELETE_CONFIRM":
				return { ...state, showDeleteConfirm: true }
			case "CLOSE_DELETE_CONFIRM":
				return { ...state, showDeleteConfirm: false }
			case "DELETE_MESSAGE_SUCCESS":
				onDeleteMessage(state.selectedMessageId)
				return { ...state, showDeleteConfirm: false, selectedMessageId: null }

			case "SHOW_UPDATE_MODAL":
				return { ...state, showUpdateModal: true }

			case "CLOSE_UPDATE_MODAL":
				return { ...state, showUpdateModal: false }

			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		selectedMessageId: null,
		selectedUser: null,
		showUserProfile: false,
		showMenu: false,
		showDeleteConfirm: false,
		showUpdateModal: false
	})

	function useOutsideFocus(ref) {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target) && state.showMenu) {
				dispatch({ type: "CLOSE_MENU" })
			}
		}

		useEffect(() => {
			document.addEventListener("mousedown", handleClickOutside)
			return () => {
				document.removeEventListener("mousedown", handleClickOutside)
			}
		})
	}

	const wrapperRef = useRef(null)
	useOutsideFocus(wrapperRef)

	return (
		<Container isLast={isLast}>
			<Avatar
				name={message.createdBy.username}
				size="40"
				onClick={() => dispatch({ type: "OPEN_USER_MODAL", payload: message.createdBy })}
			/>
			<Meta>
				<Span
					onClick={() =>
						dispatch({ type: "OPEN_USER_MODAL", payload: message.createdBy })
					}
				>
					{message.createdBy.username}
				</Span>
				<Tooltip
					content={new Date(message.createdAt).toLocaleString()}
					render={
						<Span>
							<Moment fromNow>{message.createdAt}</Moment>
						</Span>
					}
				/>
			</Meta>

			<div
				ref={wrapperRef}
				onClick={() => dispatch({ type: "TOGGLE_MENU", payload: message.id })}
			>
				<Dropdown
					isOpen={state.showMenu}
					onEdit={() => dispatch({ type: "SHOW_UPDATE_MODAL" })}
					onDelete={() => dispatch({ type: "OPEN_DELETE_CONFIRM" })}
				/>
			</div>

			{message.content && (
				<Content>
					<Span>
						{message.content}
						{message.updatedAt && (
							<Tooltip
								content={new Date(message.updatedAt).toLocaleString()}
								render={<Span>(updated)</Span>}
							/>
						)}
					</Span>
				</Content>
			)}

			{message.tags && (
				<Tags>
					{message.tags.map((tag, index) => (
						<Span key={index}>{tag}</Span>
					))}
				</Tags>
			)}

			{message.file && message.file.url && (
				<File isImage={message.file.format === "image"}>
					{message.file.format === "image" && (
						<Image
							url={message.file.url}
							size="12.5rem"
							onClick={() => {
								window.open(message.file.url, "_blank")
							}}
						/>
					)}
					{message.file.format === "audio" && (
						<audio controls>
							<source src={message.file.url} />
							Your browser does not support the audio element.
						</audio>
					)}
					{message.file.format === "video" && (
						<video width="320" height="240" controls>
							<source src={message.file.url} />
							Your browser does not support the video tag.
						</video>
					)}
					{message.file.url &&
						message.file.format !== "image" &&
						message.file.format !== "video" &&
						message.file.format !== "audio" && (
							<Document>
								<Icon name="File" size="48" />
								<Button
									flat
									onClick={() => window.open(message.file.url, "_blank")}
								>
									Download
								</Button>
							</Document>
						)}
				</File>
			)}

			<Profile
				userId={state.selectedUser && state.selectedUser.id}
				isOpen={state.showUserProfile}
				showMessageButton={state.selectedUser && state.selectedUser.id !== currentUser.id}
				onOpenChat={() =>
					dispatch({ type: "OPEN_PRIVATE_CHANNEL", payload: state.selectedUser })
				}
				onClose={() => dispatch({ type: "CLOSE_USER_MODAL" })}
			/>
			<UpdateMessage
				updateMessage={message}
				isOpen={state.showUpdateModal}
				onClose={() => dispatch({ type: "CLOSE_UPDATE_MODAL" })}
				onUpdate={onUpdateMessage}
			/>
			<Confirm
				heading="Delete Message?"
				message="Are you sure you want to delete this message? This process cannot be undone."
				action="Delete Message"
				isOpen={state.showDeleteConfirm}
				onClose={() => dispatch({ type: "CLOSE_DELETE_CONFIRM" })}
				onSuccess={() => dispatch({ type: "DELETE_MESSAGE_SUCCESS" })}
			/>
		</Container>
	)
}
