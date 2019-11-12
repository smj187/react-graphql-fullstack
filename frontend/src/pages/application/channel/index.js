import React, { useRef, useEffect, useState } from "react"

import { useApplication } from "../../../hooks"
import { H1 } from "../../../components"
import { Search, CreateMessage, ChatMessage, FirstMessage } from "../../../components"
import { Container, Navbar, ChatWindow } from "./styles"

export const Channel = () => {
	const {
		activeChannel,
		setActiveChannel,
		communityChannel,
		communityChannelMessages
	} = useApplication()

	const el = useRef(null)

	const [state, setState] = useState({ scroll: true, search: "", filtered: [] })

	useEffect(() => {
		if (communityChannelMessages && state.scroll) {
			setState({ ...state, initScoll: false })
			el.current.scrollIntoView({ block: "end", behavior: "smooth" })
		}
		if (activeChannel.hasUpdate) {
			el.current.scrollIntoView({ block: "end", behavior: "smooth" })
			setActiveChannel({ ...activeChannel, hasUpdate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [communityChannelMessages, activeChannel.hasUpdate])

	useEffect(() => {
		if (state.search !== "") {
			const filtered = communityChannelMessages.filter(m => {
				if (m.content && m.content.includes(state.search)) {
					return true
				}

				if (m.tags && m.tags.find(m => m.includes(state.search))) {
					return true
				}
				return false
			})
			setState({ ...state, filtered })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.search])

	return (
		<Container>
			<Navbar>
				<H1>#{communityChannel && communityChannel.name}</H1>
				<Search
					placeholder="Search..."
					value={state.search}
					onChange={e => setState({ ...state, search: e.target.value })}
				/>
			</Navbar>
			<ChatWindow>
				{communityChannel && <FirstMessage name={communityChannel.name} type="channel" />}

				{communityChannelMessages && !state.search
					? communityChannelMessages.map((message, index) => (
							<div key={index}>
								<ChatMessage
									message={message}
									isLast={communityChannelMessages.length - 1 === index}
								/>
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
		</Container>
	)
}
