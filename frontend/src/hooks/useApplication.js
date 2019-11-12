import React, { createContext, useState, useEffect, useContext } from "react"
import { useMutation, useLazyQuery, useSubscription } from "@apollo/react-hooks"

import { useAuth } from "./useAuth"
import {
	USERS,
	PRIVATE_CHANNELS,
	PRIVATE_CHANNEL,
	ADD_TO_PRIVATE_CHANNEL,
	REMOVE_FROM_PRIVATE_CHANNEL,
	COMMUNITY_CHANNELS,
	COMMUNITY_CHANNEL,
	CREATE_PRIVATE_CHANNEL,
	DELETE_PRIVATE_CHANNEL,
	CREATE_MESSAGE,
	GET_MESSAGES,
	NEW_MESSAGE_SUBSCRIPTION,
	GET_CONFIG,
	DELETE_MESSAGE,
	UPDATE_MESSAGE,
	GET_USER,
	UPDATE_USER,
	DELETE_USER,
	INVITE_FRIEND,
	UPDATE_CONFIG,
	GET_USERS,
	SUSPEND_USER,
	GET_CHANNELS,
	DELETE_CHANNEL,
	REORDER_CHANNELS,
	CREATE_CHANNEL,
	UPDATE_CHANNEL
} from "../graphql"

export const AppContext = createContext()

export const AppContextProvider = props => {
	const { currentUser, signOut } = useAuth()
	const [activeChannel, setActiveChannel] = useState({
		id: null,
		isPrivate: false,
		hasUpdate: false
	})

	// public channels
	const [communityChannels, setCommunityChannels] = useState(null)
	const [fetchCommunityChannels] = useLazyQuery(COMMUNITY_CHANNELS, {
		onCompleted: ({ channels }) => {
			// console.log("fetchCommunityChannels", channels)
			setCommunityChannels(channels)
		}
	})

	// single public channel
	const [communityChannel, setCommunityChannel] = useState(null)
	const [fetchCommunityChannel] = useLazyQuery(COMMUNITY_CHANNEL, {
		variables: { id: activeChannel.id },
		onCompleted: ({ channel }) => {
			// console.log("channel", channel)
			setCommunityChannel(channel)
		}
	})

	// public channel messages
	const [communityChannelMessages, setCommunityChannelMessages] = useState(null)
	const [fetchCommunityChannelMessages] = useLazyQuery(GET_MESSAGES, {
		variables: { id: activeChannel.id },
		onCompleted: ({ messages }) => {
			// console.log("messages", messages)
			setCommunityChannelMessages(messages)
		}
	})

	// private channels
	const [privateChannels, setPrivateChannels] = useState(null)
	const [fetchPrivateChannels] = useLazyQuery(PRIVATE_CHANNELS, {
		onCompleted: ({ privateChannels }) => {
			// console.log("fetchPrivateChannels", privateChannels)
			setPrivateChannels(privateChannels.reverse())
		}
	})

	// single private channel
	const [privateChannel, setPrivateChannel] = useState(null)
	const [fetchPrivateChannel] = useLazyQuery(PRIVATE_CHANNEL, {
		variables: { id: activeChannel.id },
		onCompleted: ({ channel }) => {
			// console.log("fetchPrivateChannel", channel)
			setPrivateChannel(channel)
		}
	})

	// private channel messages
	const [privateChannelMessages, setPrivateChannelMessages] = useState(null)
	const [fetchPrivateChannelMessages] = useLazyQuery(GET_MESSAGES, {
		variables: { id: activeChannel.id },
		onCompleted: ({ messages }) => {
			// console.log("messages", messages)
			setPrivateChannelMessages(messages)
		}
	})

	const [addUserToChannelMutation] = useMutation(ADD_TO_PRIVATE_CHANNEL)
	async function onAddUserToChannel(user) {
		addUserToChannelMutation({
			variables: { channelId: activeChannel.id, userId: user.id }
		})
			.then(() => {
				setPrivateChannel({
					...privateChannel,
					users: [...privateChannel.users, user]
				})
			})
			.catch(err => console.log("onAddUserToChannel", err))
	}

	const [removeUserFromChannelMutation] = useMutation(REMOVE_FROM_PRIVATE_CHANNEL)
	async function onRemoveUserFromChannel(user) {
		removeUserFromChannelMutation({
			variables: { channelId: activeChannel.id, userId: user.id }
		})
			.then(() => {
				setPrivateChannel({
					...privateChannel,
					users: privateChannel.users.filter(({ id }) => id !== user.id)
				})
			})
			.catch(err => console.log("onRemoveUserFromChannel", err))
	}

	const [createPrivateChatMutation] = useMutation(CREATE_PRIVATE_CHANNEL)
	async function onCreatePrivateChat(user) {
		createPrivateChatMutation({ variables: { id: user.id } })
			.then(({ data }) => {
				let channels = privateChannels.reverse()
				channels = [...privateChannels, data.createPrivateChannel]
				channels.reverse()
				setPrivateChannels(channels)
				fetchPrivateChannels()
			})
			.catch(err => console.log("err", err.graphQLErrors[0]))
	}

	const [deletePrivateChatMutation] = useMutation(DELETE_PRIVATE_CHANNEL)
	async function onDeletePrivateChat(id) {
		deletePrivateChatMutation({ variables: { id } })
			.then(() => setPrivateChannels(privateChannels.filter(c => c.id !== id)))
			.catch(err => console.log("onDeletePrivateChat", err))
	}

	const [createMessageMutation] = useMutation(CREATE_MESSAGE)
	async function onCreateMessage(message) {
		await createMessageMutation({
			variables: {
				id: activeChannel.id,
				content: message.message,
				tags: message.tags,
				file: message.file
			},
			refetchQueries: [{ query: GET_MESSAGES, variables: { id: activeChannel.id } }]
		})
			.then(({ data }) => {
				if (!activeChannel.isPrivate) {
					setCommunityChannelMessages([...communityChannelMessages, data.createMessage])
				} else {
					setPrivateChannelMessages([...privateChannelMessages, data.createMessage])
				}
				setActiveChannel({ ...activeChannel, hasUpdate: true })
			})
			.catch(err => console.log("err", err))
	}

	useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
		variables: { id: activeChannel.id },
		skip: !activeChannel.id,
		onSubscriptionData: ({ subscriptionData }) => {
			if (!activeChannel.isPrivate) {
				setCommunityChannelMessages([
					...communityChannelMessages,
					subscriptionData.data.newMessage
				])
			} else {
				setPrivateChannelMessages([
					...privateChannelMessages,
					subscriptionData.data.newMessage
				])
			}
		}
	})

	const [deleteMessageMutation] = useMutation(DELETE_MESSAGE)
	async function onDeleteMessage(id) {
		deleteMessageMutation({ variables: { id } })
			.then(() => {
				if (!activeChannel.isPrivate) {
					const removed = communityChannelMessages.filter(m => m.id !== id)
					setCommunityChannelMessages(removed)
				} else {
					const removed = privateChannelMessages.filter(m => m.id !== id)
					setPrivateChannelMessages(removed)
				}
			})
			.catch(err => console.log("onDeleteMessage", err))
	}

	// update message
	const [updateMessageMutation] = useMutation(UPDATE_MESSAGE)
	async function onUpdateMessage(message) {
		await updateMessageMutation({
			variables: { id: message.id, content: message.content, tags: message.tags }
		})
			.then(() => {
				if (!activeChannel.isPrivate) {
					const messages = communityChannelMessages.map(_message => {
						if (_message.id === message.id) {
							return { ...message, updatedAt: Date.now() }
						}
						return _message
					})
					setCommunityChannelMessages(messages)
				} else {
					const messages = privateChannelMessages.map(_message => {
						if (_message.id === message.id) {
							return { ...message, updatedAt: Date.now() }
						}
						return _message
					})
					setPrivateChannelMessages(messages)
				}
			})
			.catch(err => console.log("onUpdateMessage", err))
	}

	// users
	const [users, setUsers] = useState(null)
	const [fetchUsers] = useLazyQuery(USERS, {
		onCompleted: ({ users }) => {
			// console.log("fetchUsers", users)
			setUsers(users)
		}
	})

	// settings
	const [config, setConfig] = useState(null)
	const [fetchConfig] = useLazyQuery(GET_CONFIG, {
		onCompleted: ({ config }) => {
			// console.log("config", config)
			setConfig(config)
		}
	})

	const [user, setUser] = useState(null)
	const [fetchUser] = useLazyQuery(GET_USER, {
		variables: { id: currentUser.id },
		onCompleted: ({ user }) => {
			setUser(user)
		}
	})

	const [updateUserMutation] = useMutation(UPDATE_USER)
	async function onUpdateUser(user) {
		return await updateUserMutation({
			variables: {
				id: user.id,
				avatar: user.avatar,
				username: user.username,
				firstname: user.firstname,
				lastname: user.lastname,
				bio: user.bio,
				email: user.email,
				confirmPassword: user.confirmPassword,
				newPassword: user.newPassword
			},
			refetchQueries: [{ query: GET_USER, variables: { id: currentUser.id } }]
		})
			.then(() => setUser(user))
			.catch(error => error)
	}

	const [deleteUserMutation] = useMutation(DELETE_USER)
	async function onDeleteUser(id) {
		deleteUserMutation({ variables: { id } })
			.then(() => {
				if (currentUser.id === id) {
					signOut()
				}
				return null
			})
			.catch(err => console.error("onDeleteUser", err))
	}

	const [inviteFriendMutation] = useMutation(INVITE_FRIEND)
	async function onInviteFriend(email) {
		return await inviteFriendMutation({ variables: { email } })
			.then(() => null)
			.catch(error => error)
	}

	const [updateConfigMutation] = useMutation(UPDATE_CONFIG)
	async function onUpdateConfig(_config) {
		return await updateConfigMutation({
			variables: {
				image: _config.image,
				video: _config.video,
				audio: _config.audio,
				document: _config.document
			}
		})
			.then(() =>
				setConfig({
					...config,
					image: _config.image,
					video: _config.video,
					audio: _config.audio,
					document: _config.document
				})
			)
			.catch(error => error)
	}

	const [adminUsers, setAdminUsers] = useState(null)
	const [fetchAdminUsers] = useLazyQuery(GET_USERS, {
		onCompleted: ({ users }) => {
			setAdminUsers(users)
		}
	})

	const [suspendUserMutation] = useMutation(SUSPEND_USER)
	async function onSuspendUser(id) {
		return await suspendUserMutation({
			variables: { id },
			refetchQueries: [{ query: GET_USERS }]
		})
			.then(() => null)
			.catch(error => error)
	}

	const [channelSettings, setChannelSettings] = useState(null)
	const [fetchChannelSettings] = useLazyQuery(GET_CHANNELS, {
		variables: { id: currentUser.id },
		onCompleted: ({ channels }) => {
			setChannelSettings(channels)
		}
	})

	const [reorderChannelMutation] = useMutation(REORDER_CHANNELS)
	async function onReorderChannels(ids) {
		return await reorderChannelMutation({ variables: { ids } })
			.then(() => null)
			.catch(err => console.log("onReorderChannels", err))
	}
	const [deleteChannelMutation] = useMutation(DELETE_CHANNEL)
	async function onDeleteChannel(id) {
		return await deleteChannelMutation({ variables: { id } })
			.then(() => {
				setChannelSettings(channelSettings.filter(c => c.id !== id))
			})
			.catch(err => console.log("onDeleteChannel", err))
	}

	const [createChannelMutation] = useMutation(CREATE_CHANNEL)
	async function onCreateChannel(name) {
		return await createChannelMutation({ variables: { name } })
			.then(() => {
				fetchChannelSettings()
			})
			.catch(err => console.log("onCreateChannel", err))
	}

	const [updateChannelMutation] = useMutation(UPDATE_CHANNEL)
	async function onUpdateChannel(id, name, avatar, isLocked) {
		return await updateChannelMutation({ variables: { id, name, avatar, isLocked } })
			.then(() => null)
			.catch(error => error)
	}

	// initial fetch all relevant data
	useEffect(() => {
		fetchCommunityChannels()
		fetchPrivateChannels()
		fetchUsers()
		fetchConfig()
		if (activeChannel.id === null) {
			const url = window.location.pathname
			const _private = url.includes("/private/") ? url.slice(9) : null
			const _channel = url.includes("/channels/") ? url.slice(10) : null

			if (_private) {
				setActiveChannel({ id: _private, isPrivate: true, hasUpdate: false })
				fetchPrivateChannel()
				fetchPrivateChannelMessages()
			}
			if (_channel) {
				setActiveChannel({ id: _channel, isPrivate: false, hasUpdate: false })
				fetchCommunityChannel()
				fetchCommunityChannelMessages()
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const channels = []

	return (
		<AppContext.Provider
			value={{
				activeChannel,
				setActiveChannel,
				// channels
				communityChannels,
				communityChannel,
				fetchCommunityChannel,

				// private
				privateChannels,
				privateChannel,
				fetchPrivateChannel,
				onAddUserToChannel,
				onRemoveUserFromChannel,
				onCreatePrivateChat,
				onDeletePrivateChat,

				// users
				users,
				channels,

				// messages
				onCreateMessage,
				fetchCommunityChannelMessages,
				communityChannelMessages,
				fetchPrivateChannelMessages,
				privateChannelMessages,
				onDeleteMessage,
				onUpdateMessage,
				setCommunityChannelMessages,

				// settings
				config,
				fetchUser,
				user,
				onDeleteUser,
				onUpdateUser,
				onInviteFriend,
				onUpdateConfig,
				fetchAdminUsers,
				adminUsers,
				onSuspendUser,
				fetchChannelSettings,
				channelSettings,
				onReorderChannels,
				onDeleteChannel,
				onCreateChannel,
				onUpdateChannel
			}}
		>
			{props.children}
		</AppContext.Provider>
	)
}

export const useApplication = () => {
	return useContext(AppContext)
}
