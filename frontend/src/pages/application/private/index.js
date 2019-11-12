import React, { useReducer, useRef, useEffect } from "react"
import { useApplication } from "../../../hooks"
import { H2, Icon } from "../../../components"
import { Search, CreateMessage, FirstMessage, ChatMessage } from "../../../components"
import { Container, Navbar, Users, ChatWindow } from "./styles"

import { AddUsers } from "./addUsers"

export const Private = () => {
	const {
		privateChannel,
		privateChannelMessages,
		activeChannel,
		setActiveChannel
	} = useApplication()
	const el = useRef(null)

	const reducer = (state, action) => {
		switch (action.type) {
			case "SHOW_ADD_MODAL":
				return { ...state, showAddMenu: true }
			case "CLOSE_ADD_MODAL":
				return { ...state, showAddMenu: false }
			case "SET_INIT_SCROLL":
				return { ...state, scroll: false }
			case "UPDATE_FILTERED":
				return { ...state, filtered: action.payload }
			case "UPDATE_SEARCH":
				return { ...state, search: action.payload }
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		showAddMenu: false,
		scroll: true,
		search: "",
		filtered: []
	})

	useEffect(() => {
		if (privateChannelMessages && state.scroll) {
			dispatch({ type: "SET_INIT_SCROLL" })
			el.current.scrollIntoView({ block: "end", behavior: "smooth" })
		}
		if (activeChannel.hasUpdate) {
			el.current.scrollIntoView({ block: "end", behavior: "smooth" })
			setActiveChannel({ ...activeChannel, hasUpdate: false })
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [privateChannelMessages, activeChannel.hasUpdate])

	useEffect(() => {
		if (state.search !== "") {
			const filtered = privateChannelMessages.filter(m => {
				if (m.content && m.content.includes(state.search)) {
					return true
				}

				if (m.tags && m.tags.find(m => m.includes(state.search))) {
					return true
				}
				return false
			})
			dispatch({ type: "UPDATE_FILTERED", payload: filtered })
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.search])

	return (
		<Container>
			<Navbar>
				<Icon name="Group" size="44" />
				<Users>
					{privateChannel &&
						privateChannel.users.map((user, index) => (
							<H2 key={index}>
								{`${user.username}${
									privateChannel.users.length - 1 === index ? "" : ","
								}`}
							</H2>
						))}
				</Users>
				{privateChannel && (
					<Icon
						name="GroupAdd"
						size="44"
						onClick={() => dispatch({ type: "SHOW_ADD_MODAL" })}
					/>
				)}
				<Search
					placeholder="Search..."
					value={state.search}
					onChange={e => dispatch({ type: "UPDATE_SEARCH", payload: e.target.value })}
				/>
			</Navbar>
			<ChatWindow>
				{privateChannel && (
					<FirstMessage
						name={privateChannel.users.map(
							(user, index) =>
								`${user.username}${
									privateChannel.users.length - 1 === index ? "" : ","
								}`
						)}
						type="group"
					/>
				)}

				{privateChannelMessages && !state.search
					? privateChannelMessages.map((message, index) => (
							<div key={index}>
								<ChatMessage message={message} />
							</div>
					  ))
					: state.filtered.map((message, index) => (
							<div key={index}>
								<ChatMessage
									message={message}
									isLast={state.filtered.length - 1 === index}
								/>
							</div>
					  ))}
				<div id="el" ref={el}></div>
			</ChatWindow>
			<CreateMessage />
			<AddUsers
				channel={privateChannel}
				isOpen={state.showAddMenu}
				onClose={() => dispatch({ type: "CLOSE_ADD_MODAL" })}
			/>
		</Container>
	)
}
