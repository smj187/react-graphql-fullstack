import React from "react"
import ReactResponsiveModal from "react-responsive-modal"
import { useMutation } from "@apollo/react-hooks"

import { CREATE_CHANNEL, GET_CHANNELS } from "../../../../graphql"
import { useForm } from "../../../../hooks"
import { TextField, Button, H2, H3 } from "../../../../components"
import { Form, Wrapper } from "./styles"

export const Add = ({ isOpen, onClose, onSuccess }) => {
	const { onChange, onSubmit, values, setValues } = useForm(onCreateChannel, {
		name: ""
	})

	const [createChannelMutation] = useMutation(CREATE_CHANNEL)

	async function onCreateChannel() {
		await createChannelMutation({
			variables: { name: values.name },
			refetchQueries: [{ query: GET_CHANNELS }]
		})
			.then(() => {
				setValues({ name: "" })
				onSuccess()
			})
			.catch(({ graphQLErrors }) => {
				setValues({ ...values, errors: graphQLErrors[0].code.errors })
			})
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
