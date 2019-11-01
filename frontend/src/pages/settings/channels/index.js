import React, { useState, useEffect } from "react"
import Moment from "react-moment"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_CHANNELS, REORDER_CHANNELS, DELETE_CHANNEL } from "../../../graphql"
import { useToast } from "../../../hooks"
import { Icon, Spinner, Avatar, Confirm, Button } from "../../../components"
import { Form, Header, StyledLink, H1, H2, H3, Span, StyledIcon } from "./styles"
import { AddChannelWrapper, ChannelWrapper, ListWrapper } from "./styles"

import { Edit } from "./edit"
import { Add } from "./add"

export const Channels = () => {
	const { addToastMessage } = useToast()

	const [state, setState] = useState({
		isLoaded: false,
		channels: [],
		showEditModal: false,
		selectedChannelId: null,
		selectedChannelName: "",
		showAddModal: false,
		showDeleteConfirmModal: false
	})

	const { data } = useQuery(GET_CHANNELS)
	const [reorderChannelMutation] = useMutation(REORDER_CHANNELS)
	const [deleteChannelMutation] = useMutation(DELETE_CHANNEL)

	useEffect(() => {
		if (data) {
			let diff = Object.keys(data.channels).reduce((diff, key) => {
				if (state.channels[key] === data.channels[key]) return diff
				return {
					...diff,
					[key]: data.channels[key]
				}
			}, {})
			if (diff !== {}) {
				setState({ ...state, channels: data.channels })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	if (data && !state.isLoaded) {
		setState({ ...state, channels: data.channels, isLoaded: true })
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
		reorderChannelMutation({ variables: { ids: store } })
			.then(() => {})
			.catch(err => console.log("onDragEnd", err))
	}

	async function onDeleteChannel() {
		await deleteChannelMutation({
			variables: { id: state.selectedChannelId },
			refetchQueries: [{ query: GET_CHANNELS }]
		})
			.then(() => {
				addToastMessage("Channel was successfully deleted!")
			})
			.catch(err => {
				console.error("onDeleteChannel", err)
			})
	}

	return (
		<Form>
			<Header>
				<H1>Manage Channels</H1>
				<StyledLink to="/chat/channels">
					<Icon name="Close" size="32" />
				</StyledLink>
			</Header>

			<H2>Manage all Channels</H2>
			<H3>
				You can change the order of channels by using drag and drop into their new order.
			</H3>

			{!data ? (
				<Spinner margin="9rem 0 0 20rem" />
			) : (
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
													<Moment fromNow>{channel.createdAt}</Moment> •{" "}
													{channel.createdBy.username}
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
										onClick={() => setState({ ...state, showAddModal: true })}
									>
										Add Now
									</Button>
								</AddChannelWrapper>
							</ListWrapper>
						)}
					</Droppable>
				</DragDropContext>
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
				onSuccess={onDeleteChannel}
			/>
		</Form>
	)
}
