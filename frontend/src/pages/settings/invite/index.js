import React from "react"
import { useMutation } from "@apollo/react-hooks"

import { INVITE_FRIEND } from "../../../graphql"
import { useForm, useToast, useValidation } from "../../../hooks"
import { Icon, H1, H2, H3, TextField, Button } from "../../../components"
import { InviteForm, Header, StyledLink, InputWrapper, ContentWrapper, Image } from "./styles"

import InviteFriendImage from "../../../assets/stock/invite2.png"

export const Invite = () => {
	const { addToastMessage } = useToast()
	const { validateEmail } = useValidation()
	const { onChange, onSubmit, values, setValues } = useForm(onSendInviteEmail, {
		email: ""
	})

	const [inviteFriendMutation] = useMutation(INVITE_FRIEND)

	async function onSendInviteEmail() {
		const invalid = validateEmail(values.email)
		if (invalid) {
			setValues({ ...values, error: { email: invalid } })
		} else {
			inviteFriendMutation({ variables: { email: values.email } })
				.then(() => {
					addToastMessage("Invite has been sent")
					setValues({ email: "" })
				})
				.catch(({ graphQLErrors }) => {
					console.error("graphQLErrors", graphQLErrors)
					setValues({ ...values, error: { email: graphQLErrors[0].code.errors.email } })
				})
		}
	}

	return (
		<InviteForm onSubmit={onSubmit}>
			<Header>
				<H1>Invite A Friend</H1>
				<StyledLink to="/chat/channels">
					<Icon name="Close" size="32" />
				</StyledLink>
			</Header>
			<H2>Chatting works best with others.</H2>
			<H3>
				Collaborate, get feedback on your posts, chat together on ideas or meet new people.
			</H3>
			<ContentWrapper>
				<InputWrapper>
					<TextField
						type="email"
						label="email address"
						name="email"
						placeholder="example@email.com"
						value={values.email}
						onChange={onChange}
						error={values.error && values.error.email}
					/>
					<Button>Send Invite</Button>
				</InputWrapper>
				<Image src={InviteFriendImage} />
			</ContentWrapper>
		</InviteForm>
	)
}
