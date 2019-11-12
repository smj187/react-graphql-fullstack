import React, { useState } from "react"
import ReactResponsiveModal from "react-responsive-modal"

import { useApplication } from "../../hooks"
import { StyledTextarea, Icon, H1, Span, Button, Image } from ".."

import { Container, Spacer, Label, Input, Upload } from "./styles"
import { Wrapper, Footer, ErrorContainer, Error, FileWrapper, IconWrapper } from "./styles"
import { Spinner } from "../spinner"

export const CreateMessage = () => {
	const { onCreateMessage } = useApplication()

	const [isFileMessage, setIsFileMessage] = useState(false)
	const [message, setMessage] = useState({ message: "", tags: null })

	const onCreateTextMessage = e => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault()

			const tags = message.message
				.split(" ")
				.filter(w => (w.match(/#/g) || []).length === 1 && w.charAt(0) === "#")

			const content = message.message
				.split(" ")
				.filter(w => !tags.includes(w))
				.join(" ")

			onCreateMessage({ message: content, tags: tags })
			setMessage({ message: "", tags: null })
		}
	}

	return (
		<Container>
			<FileMessage
				isOpen={isFileMessage}
				onOpen={() => setIsFileMessage(true)}
				onClose={() => setIsFileMessage(false)}
			/>
			<Spacer />
			<StyledTextarea
				value={message.message}
				onChange={e => setMessage({ message: e.target.value })}
				onKeyDown={onCreateTextMessage}
				maxRows={10}
				placeholder="Say something..."
			/>
		</Container>
	)
}

export const FileMessage = ({ isOpen, onOpen, onClose }) => {
	const { config, onCreateMessage } = useApplication()
	const [state, setState] = useState({ message: "", file: null, error: null, uploading: false })

	const isImage = (type = "") => type.includes("image/")
	const isVideo = (type = "") => type.includes("video/")
	const isAudio = (type = "") => type.includes("audio/")

	const fileUpload = e => {
		const file = e.target.files[0]
		const type = file.type
		const size = file.size

		if (isImage(type) && size > config.image) {
			const message = `Image file is too large. Size is limited to ${config.image /
				1000 /
				1000} Mb.`
			setState({ ...state, error: message })
		} else if (isVideo(type) && size > config.video) {
			const message = `Video size is too large. Size is limited to ${config.video /
				1000 /
				1000} Mb.`
			setState({ ...state, error: message })
		} else if (isAudio(type) && size > config.audio) {
			const message = `Audio size is too large. Size is limited to ${config.audio /
				1000 /
				1000} Mb.`
			setState({ ...state, error: message })
		} else if (size > config.document) {
			const message = `Document size is too large. Size is limited to ${config.document /
				1000 /
				1000} Mb.`
			setState({ ...state, error: message })
		}
		setState({
			...state,
			file,
			image: isImage(type) ? window.URL.createObjectURL(file) : null
		})
		onOpen()
	}

	const onCreateFileMessage = async (e, isConfirm) => {
		if ((e.keyCode === 13 && e.shiftKey === false) || isConfirm) {
			e.preventDefault()

			const tags = state.message
				.split(" ")
				.filter(w => (w.match(/#/g) || []).length === 1 && w.charAt(0) === "#")

			const content = state.message
				.split(" ")
				.filter(w => !tags.includes(w))
				.join(" ")
			setState({ ...state, uploading: true })
			await onCreateMessage({ message: content, tags: tags, file: state.file })
			setState({ message: "", file: null, error: null, uploading: false })
			onClose()
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
				<Icon name="FileUpload" size="24" />
			</Label>
			<ReactResponsiveModal
				open={isOpen}
				onClose={() => {
					setState({ message: "", file: null, error: null, uploading: false })
					onClose()
				}}
				center
				showCloseIcon={false}
				focusTrapped={false}
			>
				{state.error ? (
					<ErrorContainer>
						<Error>
							<Icon name="ErrorWarning" size="65" />
							<H1>{state.error}</H1>
						</Error>
						<Footer>
							<Button flat onClick={onClose}>
								Close
							</Button>
						</Footer>
					</ErrorContainer>
				) : state.uploading ? (
					<Upload>
						<Spinner />
						<Span>Uploading file...</Span>
					</Upload>
				) : (
					<>
						<Wrapper>
							{state.file && (
								<FileWrapper>
									{isImage(state.file.type) && (
										<>
											<Image url={state.image} />
											<Span>{state.file.name}</Span>
										</>
									)}
									{isVideo(state.file.type) && (
										<>
											<IconWrapper>
												<Icon name="FileVideo" size="64" />
											</IconWrapper>

											<Span>{state.file.name}</Span>
										</>
									)}
									{isAudio(state.file.type) && (
										<>
											<IconWrapper>
												<Icon name="FileAudio" size="72" />
											</IconWrapper>

											<Span>{state.file.name}</Span>
										</>
									)}
									{!isImage(state.file.type) &&
										!isVideo(state.file.type) &&
										!isAudio(state.file.type) && (
											<>
												<IconWrapper>
													<Icon name="File" size="72" />
												</IconWrapper>

												<Span>{state.file.name}</Span>
											</>
										)}
								</FileWrapper>
							)}
							<div>
								<StyledTextarea
									minRows={1}
									value={state.message}
									onChange={e => setState({ ...state, message: e.target.value })}
									onKeyDown={onCreateFileMessage}
									maxRows={4}
									placeholder="Add a comment (optional)"
								/>
							</div>
							<Footer>
								<Button
									flat
									onClick={() => {
										setState({
											message: "",
											file: null,
											error: null,
											uploading: false
										})
										onClose()
									}}
								>
									Abort
								</Button>
								<Button
									onClick={e => {
										onCreateFileMessage(e, true)
									}}
								>
									Upload
								</Button>
							</Footer>
						</Wrapper>{" "}
					</>
				)}
			</ReactResponsiveModal>
		</>
	)
}
