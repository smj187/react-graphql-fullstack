import React, { useState, useEffect } from "react"
import Moment from "react-moment"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { useToast, useApplication } from "../../../../hooks"
import { Icon, Spinner, Avatar, Confirm, Button, H2, Span } from "../../../../components"
import { Container, Header, StyledLink, Loading, Content, StyledIcon } from "./styles"
import { ListWrapper, ChannelWrapper, AddChannelWrapper } from "./styles"

import { Add } from "./add"
import { Edit } from "./edit"

export const Channels = () => {
	const { addToastMessage } = useToast()
	const {
		fetchChannelSettings,
		channelSettings,
		onReorderChannels,
		onDeleteChannel
	} = useApplication()

	const [state, setState] = useState({
		isLoaded: false,
		channels: [],
		showEditModal: false,
		selectedChannelId: null,
		selectedChannelName: "",
		showAddModal: false,
		showDeleteConfirmModal: false
	})

	useEffect(() => {
		fetchChannelSettings()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (channelSettings) {
			let diff = Object.keys(channelSettings).reduce((diff, key) => {
				if (state.channels[key] === channelSettings[key]) return diff
				return {
					...diff,
					[key]: channelSettings[key]
				}
			}, {})
			if (diff !== {}) {
				setState({ ...state, channels: channelSettings })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [channelSettings])

	if (channelSettings && !state.isLoaded) {
		setState({ ...state, channels: channelSettings, isLoaded: true })
	}

	const onDragEnd = async result => {
		if (!result.destination || !state.channels) {
			return
		}

		const reorder = (list, startIndex, endIndex) => {
			const result = Array.from(list)
			const [removed] = result.splice(startIndex, 1)
			result.splice(endIndex, 0, removed)
			return result
		}

		const reordered = reorder(state.channels, result.source.index, result.destination.index)
		setState({ ...state, channels: reordered })

		const store = reordered.map(({ id, position }) => ({ id, position }))
		await onReorderChannels(store)
	}

	async function onDeleteSelectedChannel() {
		const serverError = await onDeleteChannel(state.selectedChannelId)
		if (!serverError) {
			addToastMessage("Channel was successfully deleted!")
		}
	}

	return (
		<Container>
			<Header>
				<H2>Channels</H2>
				<StyledLink to="/">
					<Icon name="Close" size="48" />
				</StyledLink>
			</Header>

			{!channelSettings ? (
				<Loading>
					<Spinner />
				</Loading>
			) : (
				<Content>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="droppable">
							{provided => (
								<ListWrapper
									loaded={state.isLoaded}
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{state.channels.map((channel, index) => (
										<Draggable
											key={channel.id}
											draggableId={channel.id}
											index={index}
										>
											{provided => (
												<ChannelWrapper
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<div>
														<Avatar
															avatar={channel.avatar}
															name={channel.name}
															notClickable="true"
															size="50"
														/>
													</div>
													<Span>{channel.name}</Span>

													<StyledIcon
														marked={channel.isLocked}
														name="Lock2"
														size="21"
													/>

													<StyledIcon
														red
														name="Trash"
														size="19"
														onClick={() => {
															setState({
																...state,
																showDeleteConfirmModal: true,
																selectedChannelId: channel.id,
																selectedChannelName: channel.name
															})
														}}
													/>
													<StyledIcon
														name="Edit"
														size="25"
														onClick={() => {
															setState({
																...state,
																showEditModal: true,
																selectedChannelId: channel.id
															})
														}}
													/>

													<Span>
														<Moment fromNow>{channel.createdAt}</Moment>{" "}
														• {channel.createdBy.username}
													</Span>
												</ChannelWrapper>
											)}
										</Draggable>
									))}
									{provided.placeholder}
									<AddChannelWrapper>
										<Span>Or create a new channel...</Span>
										<Button
											type="button"
											onClick={() =>
												setState({ ...state, showAddModal: true })
											}
										>
											Add Now
										</Button>
									</AddChannelWrapper>
								</ListWrapper>
							)}
						</Droppable>
					</DragDropContext>
				</Content>
			)}
			<Edit
				id={state.selectedChannelId}
				isOpen={state.showEditModal}
				onClose={e => {
					e.preventDefault()
					setState({ ...state, showEditModal: false, selectedChannelId: null })
				}}
				onSuccess={() => {
					addToastMessage("Channel updated successfully!")
					setState({
						...state,
						showEditModal: false,
						isLoaded: false,
						selectedChannelId: null
					})
				}}
			/>
			<Add
				isOpen={state.showAddModal}
				onClose={e => {
					e.preventDefault()
					setState({ ...state, showAddModal: false })
				}}
				onSuccess={() => {
					addToastMessage("Added New Channel")
					setState({ ...state, showAddModal: false })
				}}
			/>
			<Confirm
				heading={`Delete ${state.selectedChannelName}`}
				message="Are you sure you want to delete this channel? This process cannot be undone."
				action="Delete Channel"
				isOpen={state.showDeleteConfirmModal}
				onClose={() => setState({ ...state, showDeleteConfirmModal: false })}
				onSuccess={onDeleteSelectedChannel}
			/>
		</Container>
	)
}
