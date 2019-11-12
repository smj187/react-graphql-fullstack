import React from "react"
import ReactResponsiveModal from "react-responsive-modal"

import { useApplication } from "../../../../hooks"
import { H1, Span, Icon, Button, Spinner } from "../../../../components"
import { Avatar } from "../../../../components"
import { Container, UsersWrapper, User, Footer } from "./styles"

export const AddUsers = ({ channel, isOpen, onClose }) => {
	const { users, onAddUserToChannel, onRemoveUserFromChannel } = useApplication()

	return (
		<ReactResponsiveModal
			open={isOpen}
			onClose={onClose}
			center
			showCloseIcon={false}
			focusTrapped={false}
		>
			<Container hasLoaded={!users || !channel}>
				{!users || !channel ? (
					<Spinner />
				) : (
					<>
						<H1>Manage Users </H1>
						<UsersWrapper>
							{users.map((user, index) => {
								const isMember = channel.users.find(u => u.id === user.id)
								// channelData.channel.users.find(u => u.id === user.id) || false
								return (
									<User key={index} isMember={isMember}>
										<div>
											<Avatar
												avatar={user.avatar}
												notClickable
												name={user.username}
												size="30"
											/>
										</div>
										<Span> {user.username}</Span>
										<Icon
											name="UserPlus"
											size="34"
											onClick={() => {
												if (!isMember) {
													onAddUserToChannel(user)
												}
											}}
										/>
										<Icon
											name="UserX"
											size="31"
											onClick={() => {
												if (isMember) {
													onRemoveUserFromChannel(user)
												}
											}}
										/>
									</User>
								)
							})}
						</UsersWrapper>
						<Footer>
							<Button onClick={onClose}>Close</Button>
						</Footer>
					</>
				)}
			</Container>
		</ReactResponsiveModal>
	)
}
