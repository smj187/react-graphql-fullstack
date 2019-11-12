import React from "react"

import { useForm, useToast, useValidation, useApplication } from "../../../hooks"
import { H2, H3, Icon, TextField, Button } from "../../../components"
import { Container, Header, StyledLink, Image, Content } from "./styles"
import InviteFriendImage from "../../../assets/stock/invite2.png"

export const Invite = () => {
	const { onInviteFriend } = useApplication()
	const { addToastMessage } = useToast()
	const { validateEmail } = useValidation()
	const { onChange, onSubmit, values, setValues } = useForm(onSendInviteEmail, {
		email: ""
	})

	async function onSendInviteEmail() {
		const invalid = validateEmail(values.email)
		if (invalid) {
			setValues({ ...values, error: { email: invalid } })
		} else {
			const error = await onInviteFriend(values.email)
			if (!error) {
				addToastMessage("Invite has been sent")
				setValues({ email: "" })
			} else {
				setValues({
					...values,
					error: error.graphQLErrors[0].extensions.code.errors.email
				})
			}
		}
	}
	return (
		<Container>
			<Header>
				<H2>Invite A Friend</H2>
				<StyledLink to="/">
					<Icon name="Close" size="48" />
				</StyledLink>
			</Header>

			<Content onSubmit={onSubmit}>
				<H2>Chatting works best with others.</H2>
				<H3>
					Collaborate, get feedback on your posts, chat together on ideas or meet new
					people.
				</H3>
				<TextField
					type="email"
					label="email address"
					name="email"
					placeholder="example@email.com"
					value={values.email}
					onChange={onChange}
					error={values.error && values.error}
				/>
				<Button>Send Invite</Button>
				<Image src={InviteFriendImage} />
			</Content>
		</Container>
	)
}
