import React from "react"
import ReactResponsiveModal from "react-responsive-modal"
import { useQuery } from "@apollo/react-hooks"

import { GET_CHANNEL } from "../../../../../graphql"
import { useForm, useApplication } from "../../../../../hooks"
import { Avatar, Spinner, TextField, Switch, Upload } from "../../../../../components"
import { H2, Span, Button } from "../../../../../components"
import { Form, AvatarWrapper, LockWrapper, BtnWrapper, Error } from "./styles"

export const Edit = ({ id, isOpen, onClose, onSuccess }) => {
	const { onUpdateChannel } = useApplication()
	const { onChange, onSubmit, values, setValues, state, setState } = useForm(
		onUpdateCurrentChannel,
		{
			avatar: null,
			name: "",
			isLocked: false
		},
		{
			isLoaded: false,
			oldId: null
		}
	)

	const { data } = useQuery(GET_CHANNEL, { variables: { id }, skip: !id })

	if (data && id !== state.oldId) {
		setValues({
			avatar: data.channel.avatar,
			name: data.channel.name,
			isLocked: data.channel.isLocked
		})
		setState({
			...state,
			isLoaded: true,
			oldId: id
		})
	}

	async function onUpdateCurrentChannel() {
		const serverError = await onUpdateChannel(
			data.channel.id,
			values.avatar,
			values.name,
			values.isLocked
		)
		if (!serverError) {
			setValues({ ...values, errors: null })
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
			{!data ? (
				<Spinner />
			) : (
				<Form onSubmit={onSubmit}>
					<H2>Edit {data.channel.name}</H2>
					<Span>created at: {new Date(data.channel.createdAt).toLocaleString()}</Span>
					<Span>created by: {data.channel.createdBy.username}</Span>
					<Span>
						{data.channel.updatedAt !== null &&
							"updated at " + new Date(data.channel.updatedAt).toLocaleString()}
					</Span>
					<Span>
						{data.channel.updatedBy &&
							data.channel.updatedBy.username &&
							"updated by " + data.channel.updatedBy.username}
					</Span>
					<AvatarWrapper>
						<Avatar
							avatar={values.avatar}
							name={values.name}
							notClickable="true"
							size="80"
						/>
						<Upload
							onChange={e => setValues({ ...values, avatar: e.target.files[0] })}
						/>
						<Button
							delete
							type="button"
							onClick={() => setValues({ ...values, avatar: null })}
						>
							Remove
						</Button>
						<div>
							{values.errors && values.errors.avatar && (
								<Error>{values.errors.avatar}</Error>
							)}
						</div>
					</AvatarWrapper>
					<LockWrapper>
						<Switch
							id="checkboxLocked"
							checked={values.isLocked}
							onChange={() => setValues({ ...values, isLocked: !values.isLocked })}
						/>
						<Span>Users cannot send messages anymore.</Span>
					</LockWrapper>
					<TextField
						type="text"
						label="name"
						name="name"
						placeholder="Name"
						value={values.name}
						onChange={onChange}
						error={values.errors && values.errors.name}
					/>

					<BtnWrapper>
						<Button flat onClick={onClose}>
							Cancel
						</Button>
						<Button>Save Changes</Button>
					</BtnWrapper>
				</Form>
			)}
		</ReactResponsiveModal>
	)
}
