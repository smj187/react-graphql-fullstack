import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_USER, UPDATE_USER, DELETE_USER } from "../../../graphql"
import { useAuth, useForm, useToast, useValidation } from "../../../hooks"
import { Span, TextField, Textarea, Confirm, Avatar, Upload, Spinner } from "../../../components"
import { AccountForm, Header, Wrapper, StyledLink, Error, Button, Icon, H1, H2, H3 } from "./styles"

export const Account = () => {
	const { currentUser, signOut } = useAuth()
	const { addToastMessage } = useToast()
	const { validateEmail, validateName, validateUsername } = useValidation()
	const { onChange, onSubmit, values, setValues, state, setState } = useForm(
		onUpdateUserAccount,
		{
			loaded: false,
			username: "",
			avatar: null,
			firstname: "",
			lastname: "",
			bio: "",
			email: "",
			confirmPassword: "",
			newPassword: ""
		},
		{
			showPasswordChange: false,
			showConfirmModal: false
		}
	)

	const { data } = useQuery(GET_USER, {
		variables: { id: currentUser.id },
		skip: !currentUser.id
	})

	if (data && data.user && !values.loaded) {
		setValues({
			...values,
			loaded: true,
			username: data.user.username,
			avatar: data.user.avatar || null,
			firstname: data.user.firstname || "",
			lastname: data.user.lastname || "",
			bio: data.user.bio || "",
			email: data.user.email,
			createdAt: data.user.createdAt
		})
	}

	const [updateUserMutation] = useMutation(UPDATE_USER)
	const [deleteUserMutation] = useMutation(DELETE_USER)

	async function onUpdateUserAccount() {
		const clientError = {
			username: validateUsername(values.username),
			firstname: validateName(values.firstname),
			lastname: validateName(values.lastname),
			email: validateEmail(values.email)
		}

		if (
			clientError.username ||
			clientError.firstname ||
			clientError.lastname ||
			clientError.email
		) {
			setValues({ ...values, errors: clientError })
		} else {
			updateUserMutation({
				variables: {
					id: currentUser.id,
					avatar: values.avatar,
					username: values.username,
					firstname: values.firstname,
					lastname: values.lastname,
					bio: values.bio,
					email: values.email,
					confirmPassword: values.confirmPassword,
					newPassword: values.newPassword
				},
				refetchQueries: [{ query: GET_USER, variables: { id: currentUser.id } }]
			})
				.then(() => {
					addToastMessage("Account Updated.")
					setValues({ ...values, showPasswordChange: false, errors: null })
					setState({ ...state, showPasswordChange: false })
				})
				.catch(({ graphQLErrors }) => {
					console.log("onUpdateUserAccount", graphQLErrors)
					setValues({ ...values, errors: graphQLErrors[0].code.errors })
				})
		}
	}

	async function onDeleteUserAccount() {
		console.log("sign out and delete from database")
		deleteUserMutation({ variables: { id: currentUser.id } })
			.then(() => {
				signOut()
			})
			.catch(err => console.error("onDeleteUserAccount", err))
	}

	return (
		<AccountForm onSubmit={onSubmit} isLoaded={!data}>
			<Header>
				<H1>My Account</H1>
				<StyledLink to="/chat/channels">
					<Icon name="Close" size="32" />
				</StyledLink>
			</Header>

			<H2>Customize your appearance.</H2>
			<H3>Upload a custom avatar or change your username.</H3>

			{!data && <Spinner />}
			{data && (
				<Wrapper appearanceWrapper>
					<Avatar avatar={values.avatar} name={values.username} />
					<Upload onChange={e => setValues({ ...values, avatar: e.target.files[0] })} />
					<Button
						delete
						type="button"
						onClick={() => setValues({ ...values, avatar: null })}
					>
						Remove
					</Button>
					<Wrapper errorWrapper hasError={values.errors && values.errors.avatar}>
						{values.errors && values.errors.avatar && (
							<Error>{values.errors.avatar}}</Error>
						)}
					</Wrapper>
					<TextField
						type="text"
						label="username"
						name="username"
						placeholder="Username"
						value={values.username}
						onChange={onChange}
						error={values.errors && values.errors.username}
					/>
				</Wrapper>
			)}

			<H2>About Me</H2>
			<H3>Enter some personal details to that the community can get to know you.</H3>

			{!data && <Spinner />}
			{data && (
				<Wrapper aboutWrapper>
					<TextField
						type="text"
						label="firstname"
						name="firstname"
						placeholder="Firstname"
						value={values.firstname}
						onChange={onChange}
						error={values.errors && values.errors.firstname}
					/>
					<TextField
						type="text"
						label="lastname"
						name="lastname"
						placeholder="Lastname"
						value={values.lastname}
						onChange={onChange}
						error={values.errors && values.errors.lastname}
					/>
					<Textarea
						label="Your Story"
						name="bio"
						placeholder="What would you like people to know about you?"
						value={values.bio}
						onChange={onChange}
						error={values.errors && values.errors.bio}
					/>
				</Wrapper>
			)}

			<H2>Account</H2>
			<H3>Change your credentials with caution.</H3>

			<Wrapper accountWrapper showPasswordChange={state.showPasswordChange}>
				<TextField
					type="email "
					label="email address"
					name="email"
					placeholder="example@email.com"
					value={values.email}
					onChange={onChange}
					error={values.errors && values.errors.email}
				/>

				{state.showPasswordChange ? (
					<>
						<TextField
							type="password"
							label="confirm password"
							name="confirmPassword"
							placeholder=""
							value={values.confirmPassword}
							onChange={onChange}
							error={values.errors && values.errors.confirmPassword}
						/>
						<TextField
							type="password"
							label="New Password"
							name="newPassword"
							placeholder=""
							value={values.newPassword}
							onChange={onChange}
							error={values.errors && values.errors.newPassword}
						/>
					</>
				) : (
					<>
						<Span link onClick={() => setState({ ...state, showPasswordChange: true })}>
							Change Password?
						</Span>
					</>
				)}

				<Button
					delete
					type="button"
					onClick={() => setState({ ...state, showConfirmModal: true })}
				>
					Delete Account
				</Button>
			</Wrapper>
			<Button>Save Changes</Button>
			<Confirm
				heading="Delete Account?"
				message="Are you sure you want to delete your account? This process cannot be undone."
				action="Delete Account"
				isOpen={state.showConfirmModal}
				onClose={() => setState({ ...state, showConfirmModal: false })}
				onSuccess={onDeleteUserAccount}
			/>
		</AccountForm>
	)
}
