import React, { useState, useReducer } from "react"
import ReactResponsiveModal from "react-responsive-modal"
import { useQuery } from "@apollo/react-hooks"

import { GET_CONFIG } from "../../graphql"
import { useChat } from "../../hooks"
import { Span, H2, Icon, Button, StyledTextarea } from ".."

import { Container, Spacer, Label, Input } from "./styles"
import { ContainerError, ModalContainer, FileWrapper, ImagePeview, Footer } from "./styles"
import { MediaPeview } from "./styles"

export const ChatInput = () => {
	return (
		<Container>
			<FileMessage />
			<Spacer />
			<TextMessage />
		</Container>
	)
}

const TextMessage = () => {
	const [input, setInput] = useState("")

	const { createTextMessage } = useChat()

	const onCreateTextMessage = e => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault()

			const tags = input
				.split(" ")
				.filter(w => (w.match(/#/g) || []).length === 1 && w.charAt(0) === "#")

			const content = input
				.split(" ")
				.filter(w => !tags.includes(w))
				.join(" ")

			createTextMessage(content, tags)
			setInput("")
		}
	}

	return (
		<StyledTextarea
			minRows={1}
			value={input}
			onChange={e => setInput(e.target.value)}
			placeholder="Say something.."
			maxRows={6}
			onKeyDown={onCreateTextMessage}
		/>
	)
}

const FileMessage = () => {
	const { data } = useQuery(GET_CONFIG)

	const { createFileMessage } = useChat()

	const reducer = (state, action) => {
		switch (action.type) {
			case "CLOSE_MODAL":
				return { ...state, modal: { isOpen: false } }

			case "INVALID_IMAGE_SIZE":
				return {
					...state,
					error: {
						isOpen: true,
						message: `Your image file is too large! File size is limited to ${action.value} kb.`
					}
				}
			case "INVALID_VIDEO_SIZE":
				return {
					...state,
					error: {
						isOpen: true,
						message: `Your video file is too large! File size is limited to ${action.value} kb.`
					}
				}
			case "INVALID_AUDIO_SIZE":
				return {
					...state,
					error: {
						isOpen: true,
						message: `Your audio file is too large! File size is limited to ${action.value} kb.`
					}
				}
			case "INVALID_DOCUMENT_SIZE":
				return {
					...state,
					error: {
						isOpen: true,
						message: `Your document file is too large! File size is limited to ${action.value} kb.`
					}
				}

			case "OPEN_MODAL":
				return {
					...state,
					modal: {
						isOpen: true
					},
					file: action.file,
					image: action.image
				}
			case "UPDATE_INPUT":
				return { ...state, input: action.value }
			case "CLOSE_ERROR_MODAL":
				return { ...state, error: { isOpen: false, message: "" } }
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		error: {
			isOpen: false,
			message: ""
		},
		modal: {
			isOpen: false
		},
		input: "",
		content: null,
		tags: null,
		file: null
	})

	const fileUpload = e => {
		const file = e.target.files[0]
		const type = file.type
		const size = file.size

		if (type.includes("image/") && size > data.config.image) {
			dispatch({ type: "INVALID_IMAGE_SIZE", value: data.config.image / 1000 })
		} else if (type.includes("video/") && size > data.config.video) {
			dispatch({ type: "INVALID_VIDEO_SIZE", value: data.config.video / 1000 })
		} else if (type.includes("audio/") && size > data.config.audio) {
			dispatch({ type: "INVALID_AUDIO_SIZE", value: data.config.audio / 1000 })
		} else if (
			!type.includes("image/") &&
			!type.includes("video/") &&
			!type.includes("audio/") &&
			size > data.config.document
		) {
			dispatch({ type: "INVALID_DOCUMENT_SIZE", value: data.config.document / 1000 })
		} else {
			dispatch({
				type: "OPEN_MODAL",
				file,
				image: type.includes("image/") ? window.URL.createObjectURL(file) : null
			})
		}
	}

	const onCreateFileMessage = (e, btn) => {
		if ((e.keyCode === 13 && e.shiftKey === false) || btn) {
			e.preventDefault()

			const tags = state.input
				.split(" ")
				.filter(w => (w.match(/#/g) || []).length === 1 && w.charAt(0) === "#")

			const content = state.input
				.split(" ")
				.filter(w => !tags.includes(w))
				.join(" ")

			createFileMessage(content, tags, state.file)
			dispatch({ type: "CLOSE_MODAL" })
		}
	}

	return (
		<>
			<Label htmlFor="fileMessage">
				<Input
					type="file"
					name="fileMessage"
					multiple={false}
					id="fileMessage"
					onChange={fileUpload}
				/>
				<Icon name="FileAdd" size="26" />
			</Label>
			<ReactResponsiveModal
				open={state.modal.isOpen}
				onClose={() => dispatch({ type: "CLOSE_MODAL" })}
				center
				showCloseIcon={false}
				focusTrapped={false}
			>
				<ModalContainer>
					{state.file && (
						<FileWrapper>
							{state.file.type.includes("image/") && (
								<ImagePeview src={state.image} />
							)}
							{state.file.type.includes("video/") && (
								<MediaPeview>
									<Icon name="FileVideo" size="96" />
								</MediaPeview>
							)}
							{state.file.type.includes("audio/") && (
								<MediaPeview>
									<Icon name="FileAudio" size="96" />
								</MediaPeview>
							)}
							{!state.file.type.includes("image/") &&
								!state.file.type.includes("video/") &&
								!state.file.type.includes("audio/") && (
									<MediaPeview>
										<Icon name="File" size="96" />
									</MediaPeview>
								)}

							<Span>{state.file.name}</Span>
						</FileWrapper>
					)}

					<div>
						<StyledTextarea
							minRows={1}
							value={state.input}
							onChange={e =>
								dispatch({ type: "UPDATE_INPUT", value: e.target.value })
							}
							placeholder="Add comment (optional)"
							maxRows={6}
							onKeyDown={onCreateFileMessage}
						/>
					</div>
					<Footer>
						<Button flat onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
							Abort
						</Button>
						<Button onClick={e => onCreateFileMessage(e, true)}>Upload</Button>
					</Footer>
				</ModalContainer>
			</ReactResponsiveModal>

			<ReactResponsiveModal
				open={state.error.isOpen}
				onClose={() => dispatch({ type: "CLOSE_ERROR_MODAL" })}
				center
				showCloseIcon={false}
				focusTrapped={false}
			>
				<ContainerError>
					<H2>Error</H2>
					<Span>{state.error.message}</Span>
					<div>
						<Button confirm onClick={() => dispatch({ type: "CLOSE_ERROR_MODAL" })}>
							OK
						</Button>
					</div>
				</ContainerError>
			</ReactResponsiveModal>
		</>
	)
}
