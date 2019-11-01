import React from "react"
import ReactResponsiveModal from "react-responsive-modal"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_CHANNEL, UPDATE_CHANNEL, GET_CHANNELS } from "../../../../graphql"
import { useForm } from "../../../../hooks"
import { Avatar, Spinner, TextField, Switch, Upload } from "../../../../components"
import { Form, AvatarWrapper, LockWrapper, BtnWrapper, Error, H2, Span, Button } from "./styles"

export const Edit = ({ id, isOpen, onClose, onSuccess }) => {
	const { onChange, onSubmit, values, setValues, state, setState } = useForm(
		onUpdateChannel,
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

	const [updateChannelMutation] = useMutation(UPDATE_CHANNEL)

	async function onUpdateChannel() {
		await updateChannelMutation({
			variables: {
				id: data.channel.id,
				avatar: values.avatar,
				name: values.name,
				isLocked: values.isLocked
			},
			refetchQueries: [{ query: GET_CHANNELS }]
		})
			.then(() => {
				setValues({ ...values, errors: null })
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
