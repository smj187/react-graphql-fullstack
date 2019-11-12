import React, { useState } from "react"
import ReactResponsiveModal from "react-responsive-modal"

import { Button, Span, H2, StyledTextarea, Input, Icon } from ".."
import { Container, Footer, TagWrapper, Tags, Tag, Error } from "./styles"

export const UpdateMessage = ({ updateMessage, isOpen, onClose, onUpdate }) => {
	const [state, setState] = useState(() => updateMessage || null)
	const [tag, setTag] = useState("")
	const [error, setError] = useState(null)

	const removeTag = tag => {
		setState({ ...state, tags: state.tags.filter(t => t !== tag) })
		setError(null)
	}

	const addTag = () => {
		if (!tag) {
			setError("Please provide a valid tag")
		} else if (tag.charAt(0) !== "#") {
			setError("A tag needs to start with '#'")
		} else if (tag.length > 32) {
			setError("Tag is limited to 32 characters")
		} else if (state.tags && state.tags.includes(tag)) {
			setError("Tag already in list")
		} else {
			setState({ ...state, tags: [state.tags, tag].filter(e => e !== null) })
			setTag("")
			setError(null)
		}
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
				<H2>Update Content</H2>
				<div>
					<StyledTextarea
						value={state.content}
						onChange={e => setState({ ...state, content: e.target.value })}
						minRows={1}
						maxRows={10}
						placeholder="Say something..."
					/>
				</div>
				<H2>Update Tags</H2>
				<div>{error && <Error>{error}</Error>}</div>
				<TagWrapper>
					<Input value={tag} onChange={e => setTag(e.target.value)} placeholder="#new" />
					<Button onClick={addTag}>Add</Button>
					<Tags>
						{state.tags &&
							state.tags.map((tag, index) => (
								<Tag key={index} onClick={() => removeTag(tag)}>
									<Span> {tag}</Span>
									<Icon name="Close" size="24" />
								</Tag>
							))}
					</Tags>
				</TagWrapper>

				<Footer>
					<Button flat onClick={onClose}>
						Abort
					</Button>
					<Button
						onClick={() => {
							onUpdate(state)
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
