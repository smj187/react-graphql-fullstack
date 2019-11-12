import React, { useEffect } from "react"
import { useForm, useToast, useApplication } from "../../../../hooks"
import { Spinner, Avatar, Confirm, Profile, Search } from "../../../../components"
import { H2, H3, Icon, Span } from "../../../../components"
import { Container, Header, StyledLink, Loading, Content } from "./styles"
import { Table, StyledIcon, TableHeaderWrapper, UserWrapper } from "./styles"

export const Users = () => {
	const { adminUsers, fetchAdminUsers, onSuspendUser, onDeleteUser } = useApplication()

	const { addToastMessage } = useToast()
	const { onChange, values, state, setState } = useForm(
		() => {},
		{
			search: ""
		},
		{
			refetch: false,
			selectedUserId: -1,
			selectedUsername: "",
			showSuspendModal: false,
			suspensionAction: "add",
			showUserProfile: false,
			showDeleteConfirm: false,

			users: [],
			cached: [],
			filtered: [],
			username: null,
			fullname: null,
			role: null,
			createdAt: null
		}
	)

	useEffect(() => {
		fetchAdminUsers()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (adminUsers) {
			setState({ ...state, users: adminUsers, cached: adminUsers, loaded: true })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [adminUsers])

	useEffect(() => {
		const str = values.search.toLowerCase()
		const filtered = state.users.filter(user => {
			return (
				user.username
					.toString()
					.toLowerCase()
					.includes(str) ||
				(user.firstname &&
					user.firstname
						.toString()
						.toLowerCase()
						.includes(str)) ||
				(user.lastname &&
					user.lastname
						.toString()
						.toLowerCase()
						.includes(str)) ||
				user.role
					.toString()
					.toLowerCase()
					.includes(str) ||
				new Date(user.createdAt).toLocaleString().includes(str)
			)
		})

		setState({ ...state, filtered })

		if (str.trim().length === 0) {
			setState({ ...state, filtered: [] })
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.search])

	const sorting = name => {
		state.users.sort((a, b) => {
			if (state[name] === "DESC") return a[name] > b[name] ? 1 : -1
			else return a[name] < b[name] ? 1 : -1
		})
		setState({
			...state,
			username:
				name === "username"
					? !state.username || state.username === "ASCD"
						? "DESC"
						: "ASCD"
					: null,
			fullname:
				name === "fullname"
					? !state.fullname || state.fullname === "ASCD"
						? "DESC"
						: "ASCD"
					: null,
			role: name === "role" ? (!state.role || state.role === "ASCD" ? "DESC" : "ASCD") : null,
			createdAt:
				name === "createdAt"
					? !state.createdAt || state.createdAt === "ASCD"
						? "DESC"
						: "ASCD"
					: null
		})
	}

	async function onSuspendUserAccount() {
		const serverError = await onSuspendUser(state.selectedUserId)
		if (!serverError) {
			addToastMessage("Updated Suspension.")
			const edited = state.users.filter(u => u.id === state.selectedUserId)[0]
			const user = { ...edited, suspended: !edited.suspended }
			const users = [...state.users.filter(u => u.id !== state.selectedUserId), user]
			setState({
				...state,
				users,
				selectedUserId: -1,
				showSuspendModal: false,
				suspensionAction: "add"
			})
		}
	}

	async function onDeleteUserAccount() {
		const errror = onDeleteUser(state.selectedUserId)
		if (!errror) {
			addToastMessage("User has been deleted.")
			const users = state.users.filter(u => u.id !== state.selectedUserId)
			setState({ ...state, selectedUserId: -1, users, showDeleteConfirm: false })
		}
	}

	return (
		<Container>
			<Header>
				<H2>Users</H2>
				<StyledLink to="/">
					<Icon name="Close" size="48" />
				</StyledLink>
			</Header>

			{!adminUsers ? (
				<Loading>
					<Spinner />
				</Loading>
			) : (
				<Content>
					<H2>A list of all registered users.</H2>
					<H3>You can suspend and delete users here.</H3>

					<Search value={values.search} onChange={onChange} placeholder="Search.." />
					<Table>
						<thead>
							<tr>
								<th>
									<TableHeaderWrapper
										sort={state.username}
										active={state.username}
										onClick={() => sorting("username")}
									>
										<Span>Username</Span>
										<Icon name="SortAlphaAsc" size="19" />
										<Icon name="SortAlphaDesc" size="19" />
									</TableHeaderWrapper>
								</th>
								<th>
									<TableHeaderWrapper
										sort={state.fullname}
										active={state.fullname}
										onClick={() => sorting("fullname")}
									>
										<Span>Fullname</Span>
										<Icon name="SortAlphaAsc" size="19" />
										<Icon name="SortAlphaDesc" size="19" />
									</TableHeaderWrapper>
								</th>
								<th>
									<TableHeaderWrapper
										sort={state.role}
										active={state.role}
										onClick={() => sorting("role")}
									>
										<Span>Role</Span>
										<Icon name="SortAlphaAsc" size="19" />
										<Icon name="SortAlphaDesc" size="19" />
									</TableHeaderWrapper>
								</th>
								<th>
									<TableHeaderWrapper
										sort={state.createdAt}
										active={state.createdAt}
										onClick={() => sorting("createdAt")}
									>
										<Span>Created At</Span>
										<Icon name="SortNumericAsc" size="19" />
										<Icon name="SortNumbericDesc" size="19" />
									</TableHeaderWrapper>
								</th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{state.users !== [] &&
								state[`${values.search === "" ? "users" : "filtered"}`].map(
									(user, index) => (
										<tr key={index}>
											<td>
												<UserWrapper suspended={user.suspended}>
													<Avatar
														notClickable="true"
														avatar={user.avatar}
														name={user.username}
														size="36"
													/>
													<span>{user.username}</span>
													{user.suspended && (
														<Icon
															name="ExclamationTriangle"
															size="18"
														/>
													)}
												</UserWrapper>
											</td>
											<td>{transformFullname(user)}</td>
											<td>{transformRole(user.role)}</td>
											<td>{new Date(user.createdAt).toLocaleString()}</td>
											<td>
												<StyledIcon
													red
													marked={user.suspended}
													name="UserSlash"
													size="21"
													onClick={() => {
														setState({
															...state,
															selectedUserId: user.id,
															suspensionAction: user.suspended
																? "remove"
																: "add",
															showSuspendModal: true
														})
													}}
												/>
											</td>
											<td>
												<StyledIcon
													red
													name="UserDetail"
													size="27"
													onClick={() => {
														setState({
															...state,
															selectedUserId: user.id,
															showUserProfile: true
														})
													}}
												/>
											</td>
											<td>
												<StyledIcon
													red
													name="Trash"
													size="19"
													onClick={() => {
														setState({
															...state,
															selectedUserId: user.id,
															selectedUsername: user.username,
															showDeleteConfirm: true
														})
													}}
												/>
											</td>
										</tr>
									)
								)}
						</tbody>
					</Table>
				</Content>
			)}

			<Confirm
				heading={state.suspensionAction === "add" ? "Suspend User?" : "Remove Suspension?"}
				message={
					state.suspensionAction === "add"
						? "Are you sure you want to suspend this user?"
						: "Are you sure you want to remove the suspension for this user?"
				}
				action={state.suspensionAction === "add" ? "Suspend User" : "Remove"}
				isOpen={state.showSuspendModal}
				onClose={() => setState({ ...state, showSuspendModal: false })}
				onSuccess={onSuspendUserAccount}
			/>

			<Profile
				userId={state.selectedUserId}
				isOpen={state.showUserProfile}
				onClose={() => setState({ ...state, showUserProfile: false })}
			/>

			<Confirm
				heading={`Delete ${state.selectedUsername}`}
				message="Are you sure you want to delete this account? This process cannot be undone."
				action="Delete Account"
				isOpen={state.showDeleteConfirm}
				onClose={() => setState({ ...state, showDeleteConfirm: false })}
				onSuccess={onDeleteUserAccount}
			/>
		</Container>
	)
}

const transformFullname = user => {
	if (user.firstname === null && user.lastname === null) return ""
	if (user.firstname === null && user.lastname !== null) return user.lastname
	if (user.firstname !== null && user.lastname === null) return user.firstname
	return `${user.firstname} ${user.lastname}`
}

const transformRole = role => {
	if (role === "moderator") return "MOD"
	return role.toUpperCase()
}
