import React from "react"
import ReactResponsiveModal from "react-responsive-modal"
import { useForm, useApplication } from "../../../../../hooks"
import { TextField, Button, H2, H3 } from "../../../../../components"
import { Form, Wrapper } from "./styles"

export const Add = ({ isOpen, onClose, onSuccess }) => {
	const { onCreateChannel } = useApplication()
	const { onChange, onSubmit, values, setValues } = useForm(onCreateNewChannel, {
		name: ""
	})

	async function onCreateNewChannel() {
		const serverError = await onCreateChannel(values.name)
		if (!serverError) {
			setValues({ name: "" })
			onSuccess()
		} else {
			setValues({ ...values, errors: serverError.graphQLErrors[0].code.errors })
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
			<Form onSubmit={onSubmit}>
				<H2>Create A New Channel</H2>
				<H3>Pick a new unique name.</H3>
				<TextField
					type="text"
					label="name"
					name="name"
					placeholder="My new Channel"
					value={values.name}
					onChange={onChange}
					error={values.errors && values.errors.name}
				/>
				<Wrapper>
					<Button flat type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button>Create</Button>
				</Wrapper>
			</Form>
		</ReactResponsiveModal>
	)
}
