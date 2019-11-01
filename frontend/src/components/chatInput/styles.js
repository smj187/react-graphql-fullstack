import styled from "styled-components"

export const Container = styled.div`
	width: 100%;
	padding: 1rem 2rem;
	position: relative;
	border-top: 1px solid ${({ theme }) => theme.color6};

	> :nth-child(3) {
		padding-left: 3.8rem;
	}
`

export const Spacer = styled.div`
	position: absolute;
	height: 28px;
	width: 1px;
	top: 1.4rem;
	left: 5rem;
	border-right: 1px solid ${({ theme }) => theme.color5};
`

// FILE MESSAGES
export const Label = styled.label`
	cursor: pointer;
	position: absolute;
	left: 2.75rem;
	top: 1.4rem;

	> :last-child {
		color: ${({ theme }) => theme.purple1};
	}

	:hover > :last-child {
		color: ${({ theme }) => theme.purple2};
	}
`
export const Input = styled.input.attrs({ type: "file" })`
	display: none;
`

export const ContainerError = styled.div`
	display: flex;
	flex-direction: column;
	margin: -1.2rem;
	width: 28rem;
	height: auto;
	padding: 2rem 1.5rem 1rem;

	> :first-child {
		margin-bottom: 1.25rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	> :nth-child(2) {
		font-size: 1.1rem;
		word-break: break-word;
	}

	> :last-child {
		display: flex;
		justify-content: flex-end;
		margin-top: 1.5rem;
		margin-bottom: 1rem;

		> :last-child {
			margin-left: 1rem;
			padding: 0.4rem 0.45rem;
			height: auto;
			width: 5rem;
		}
	}
`
export const ModalContainer = styled.div`
	width: 40rem;
	margin: -1.2rem;
	display: flex;
	flex-direction: column;

	> :nth-child(2) {
		width: 100%;
		padding: 0 2rem;

		> :first-child {
			height: auto;
			min-height: 43px;
		}
	}
`

export const FileWrapper = styled.div`
	height: 15rem;
	width: -webkit-fill-available;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1.5rem;
	border: 2px dashed ${({ theme }) => theme.purple1};
	border-radius: 0.25rem;
	padding: 1rem;

	> :last-child {
		margin: auto auto auto 2rem;
		font-size: 1.1rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`

export const ImagePeview = styled.img`
	height: 85%;
	border-radius: 0.25rem;
`

export const MediaPeview = styled.div`
	> :first-child {
		color: ${({ theme }) => theme.color3};
	}
`

export const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	margin-top: 1rem;
	padding: 1rem 2rem 2rem 0;

	> :last-child {
		margin-left: 1rem;
	}
`
