import React, { useState, useContext, useEffect, createContext } from "react"
import styled, { css } from "styled-components"

const ToastContext = createContext()

const StyledToast = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: baseline;
	justify-content: space-between;
	position: fixed;

	left: 68rem;
	bottom: 2rem;
	padding: 0.65rem 1.5rem 0.75rem;
	cursor: pointer;
	z-index: 99999;
	border-radius: 0.1rem;
	font-size: 1.1rem;

	@media (max-width: 1440px) {
		left: unset;
		right: 3rem;
	}

	color: ${({ theme }) => theme.color7};
	background-color: ${({ theme }) => theme.color2};
	box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.shadow1};

	animation: fadein 0.5s;
	@keyframes fadein {
		from {
			bottom: 0;
			opacity: 0;
		}
		to {
			bottom: 2rem;
			opacity: 1;
		}
	}

	${({ fadeout }) =>
		fadeout &&
		css`
			animation: fadeout 1.05s;
			@keyframes fadeout {
				from {
					bottom: 2rem;
					opacity: 1;
				}
				to {
					bottom: 0rem;
					opacity: 0;
				}
			}
		`};
`

const Text = styled.span`
	flex: 1;
`

const Close = styled.span`
	color: ${({ theme }) => theme.yellow1};
	margin-left: 0.75rem;
`

export const ProvideToast = ({ children }) => {
	const { toast, addToastMessage, remove } = useProvideToast()
	const [faded, setFaded] = useState(false)

	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => {
				onClose()
			}, 4000)
			return () => clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toast])

	const onClose = () => {
		setFaded(true)
		setTimeout(() => {
			remove()
			setFaded(false)
		}, 1000)
	}

	return (
		<ToastContext.Provider value={{ toast, addToastMessage, remove }}>
			{toast && (
				<StyledToast onClick={onClose} fadeout={faded}>
					<Text>{toast}</Text>
					<Close>close</Close>
				</StyledToast>
			)}
			{children}
		</ToastContext.Provider>
	)
}

export const useProvideToast = () => {
	const [toast, setToast] = useState("")

	const addToastMessage = content => setToast(content)
	const remove = () => setToast(null)

	return { toast, addToastMessage, remove }
}

export const useToast = () => {
	return useContext(ToastContext)
}
