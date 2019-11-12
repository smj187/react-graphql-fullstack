import React, { useEffect } from "react"

import { useForm, useToast, useValidation, useApplication } from "../../../hooks"
import { Span, H2, H3, Button } from "../../../components"
import { TextField, Textarea, Confirm, Avatar, Upload, Spinner, Icon } from "../../../components"
import { Container, Header, Loading, StyledLink, Error, Content } from "./styles"
import { AppearanceWrapper, ErrorWrapper, AboutWrapper, AccountWrapper } from "./styles"

export const Account = () => {
	const { fetchUser, user, onDeleteUser, onUpdateUser } = useApplication()
	const { addToastMessage } = useToast()
	const { validateEmail, validateName, validateUsername } = useValidation()
	const { onChange, onSubmit, values, setValues, state, setState } = useForm(
		onUpdateUserAccount,
		{
			loaded: false,
			id: -1,
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

	useEffect(() => {
		fetchUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (user) {
			setValues({
				...values,
				id: user.id,
				loaded: true,
				username: user.username,
				avatar: user.avatar || null,
				firstname: user.firstname || "",
				lastname: user.lastname || "",
				bio: user.bio || "",
				email: user.email,
				createdAt: user.createdAt
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

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
			const serverError = await onUpdateUser({
				id: values.id,
				avatar: values.avatar,
				username: values.username,
				firstname: values.firstname,
				lastname: values.lastname,
				bio: values.bio,
				email: values.email,
				confirmPassword: values.confirmPassword,
				newPassword: values.newPassword
			})
			if (!serverError) {
				addToastMessage("Account Updated.")
				setValues({ ...values, showPasswordChange: false, errors: null })
				setState({ ...state, showPasswordChange: false })
			} else {
				setValues({
					...values,
					errors: serverError.graphQLErrors[0].extensions.code.errors
				})
			}
		}
	}

	return (
		<Container>
			<Header>
				<H2>My Account</H2>
				<StyledLink to="/">
					<Icon name="Close" size="48" />
				</StyledLink>
			</Header>
			{!user ? (
				<Loading>
					<Spinner />
					<Span>Loading data..</Span>
				</Loading>
			) : (
				<Content onSubmit={onSubmit}>
					<H2>Customize your appearance.</H2>
					<H3>Upload a custom avatar or change your username.</H3>
					<AppearanceWrapper>
						<Avatar avatar={values.avatar} name={values.username} notClickable />
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
						<ErrorWrapper hasError={values.errors && values.errors.avatar}>
							{values.errors && values.errors.avatar && (
								<Error>{values.errors.avatar}}</Error>
							)}
						</ErrorWrapper>
						<TextField
							type="text"
							label="username"
							name="username"
							placeholder="Username"
							value={values.username}
							onChange={onChange}
							error={values.errors && values.errors.username}
						/>
					</AppearanceWrapper>

					<H2>About Me</H2>
					<H3>Enter some personal details to that the community can get to know you.</H3>
					<AboutWrapper>
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
					</AboutWrapper>

					<H2>Account</H2>
					<H3>Change your credentials with caution.</H3>
					<AccountWrapper showPasswordChange={state.showPasswordChange}>
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
								<Span
									link
									onClick={() => setState({ ...state, showPasswordChange: true })}
								>
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
					</AccountWrapper>
					<Button>Save Changes</Button>
				</Content>
			)}

			<Confirm
				heading="Delete Account?"
				message="Are you sure you want to delete your account? This process cannot be undone."
				action="Delete Account"
				isOpen={state.showConfirmModal}
				onClose={() => setState({ ...state, showConfirmModal: false })}
				onSuccess={() => onDeleteUser(user.id)}
			/>
		</Container>
	)
}
