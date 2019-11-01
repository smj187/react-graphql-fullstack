import React, { createContext, useState, useEffect, useContext } from "react"
import { useMutation, useLazyQuery } from "@apollo/react-hooks"

import { useAuth } from "./useAuth"
import { GET_CHANNEL, GET_MESSAGES, CREATE_MESSAGE, UPDATE_MESSAGE } from "../graphql"
import { DELETE_MESSAGE } from "../graphql"

export const ChatContext = createContext()

export const ChatContextProvider = props => {
	const [currentChannel, setCurrentChannel] = useState(null)
	const [channel, setChannel] = useState({ id: null, name: null, avatar: null, isLocked: false })
	const [messages, setMessages] = useState([])

	const [fetchChannel, { data: channelData }] = useLazyQuery(GET_CHANNEL, {
		variables: { id: currentChannel }
	})

	const [fetchMessages, { data: messageData }] = useLazyQuery(GET_MESSAGES, {
		variables: { id: currentChannel }
	})

	const { currentUser } = useAuth()

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
			// console.log("set messages", channel.id !== currentChannel)
			setMessages(messageData.messages)
			console.log(messageData.messages)
		}
	}, [currentChannel, channelData, messageData])

	// CREATE MESSAGE
	const [createMessageMutation] = useMutation(CREATE_MESSAGE)
	async function createTextMessage(content, tags) {
		createMessageMutation({
			variables: { id: channel.id, content, tags }
		})
			.then(({ data }) => {
				const message = data.createMessage
				message["createdBy"].username = currentUser.username
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
				setMessages([...messages, message])
			})
			.catch(err => {
				console.log("createFileMessage", err)
			})
	}

	const [updateMessageMutation] = useMutation(UPDATE_MESSAGE)
	async function updateMessage(e, id) {
		// TODO: implement update message functionality
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
