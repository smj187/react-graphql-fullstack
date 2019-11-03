import React, { createContext, useState, useEffect, useContext } from "react"
import { useMutation, useLazyQuery, useSubscription } from "@apollo/react-hooks"

import { useAuth } from "./useAuth"
import {
	GET_CHANNEL,
	GET_MESSAGES,
	CREATE_MESSAGE,
	UPDATE_MESSAGE,
	MESSAGE_SUBSCRIPTION
} from "../graphql"
import { DELETE_MESSAGE } from "../graphql"

export const ChatContext = createContext()

export const ChatContextProvider = props => {
	const [currentChannel, setCurrentChannel] = useState(null)
	const [channel, setChannel] = useState({ id: null, name: null, avatar: null, isLocked: false })
	const [messages, setMessages] = useState([])
	const [editMessage, setEditMessage] = useState(null)

	const [fetchChannel, { data: channelData }] = useLazyQuery(GET_CHANNEL, {
		variables: { id: currentChannel }
	})

	const [fetchMessages, { data: messageData }] = useLazyQuery(GET_MESSAGES, {
		variables: { id: currentChannel }
	})

	const { currentUser } = useAuth()

	const { data: newMessageData } = useSubscription(MESSAGE_SUBSCRIPTION, {
		variables: { id: channel.id }
	})

	useEffect(() => {
		if (currentChannel) {
			setMessages([])
			setChannel({ id: null, name: null, avatar: null, isLocked: false })

			fetchChannel()
			fetchMessages()
		}

		if (channelData) {
			setChannel({
				id: channelData.channel.id,
				isLocked: channelData.channel.isLocked,
				name: channelData.channel.name,
				avatar: channelData.channel.avatar
			})
		}

		if (messageData) {
			setMessages(messageData.messages)
			console.log(messageData.messages)
		}

		if (newMessageData) {
			setMessages([...messages, newMessageData])
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChannel, channelData, messageData, newMessageData])

	const [createMessageMutation] = useMutation(CREATE_MESSAGE)
	async function createTextMessage(content, tags) {
		createMessageMutation({
			variables: { id: channel.id, content, tags }
		})
			.then(({ data }) => {
				const message = data.createMessage
				message["createdBy"].username = currentUser.username
				message["createdBy"].id = currentUser.id
				setMessages([...messages, message])
			})
			.catch(err => {
				console.log("createTextMessage", err)
			})
	}

	async function createFileMessage(content, tags, file) {
		createMessageMutation({ variables: { id: channel.id, content, tags, file } })
			.then(({ data }) => {
				const message = data.createMessage
				message["createdBy"].username = currentUser.username
				message["createdBy"].id = currentUser.id
				setMessages([...messages, message])
			})
			.catch(err => {
				console.log("createFileMessage", err)
			})
	}

	const [updateMessageMutation] = useMutation(UPDATE_MESSAGE)
	async function updateMessage(message) {
		updateMessageMutation({ variables: { id: message.id, content: message.content } })
			.then(() => {
				const toUpdate = messages.find(m => m.id === message.id)
				toUpdate["content"] = message.content
				toUpdate["tags"] = message.tags
				console.log(toUpdate)
				const filtered = messages.filter(m => m.id !== message.id)
				setMessages([...filtered, toUpdate])
			})
			.catch(err => {
				console.log("updateMessageMutation", err)
			})
	}

	const [deleteMessageMutation] = useMutation(DELETE_MESSAGE)
	async function deleteMessage(id) {
		deleteMessageMutation({
			variables: { id }
		})
			.then(() => {
				const removed = messages.filter(m => m.id !== id)
				setMessages(removed)
			})
			.catch(err => {
				console.error("deleteMessage", err)
			})
	}

	return (
		<ChatContext.Provider
			value={{
				currentChannel,
				setCurrentChannel,
				channel,
				messages,
				editMessage,
				setEditMessage,
				setChannel,
				updateMessage,
				createTextMessage,
				createFileMessage,
				deleteMessage
			}}
		>
			{props.children}
		</ChatContext.Provider>
	)
}

export const useChat = () => {
	return useContext(ChatContext)
}
