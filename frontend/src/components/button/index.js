import styled, { css } from "styled-components"

export const Button = styled.button`
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0.5rem 0.9rem;
	font-size: 1.1rem;
	width: 100%;
	max-width: 10rem;
	height: 2.4rem;

	position: relative;
	display: inline-block;
	border: 0;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
		0 1px 5px 0 rgba(0, 0, 0, 0.06);
	text-decoration: none;
	vertical-align: middle;
	overflow: hidden;
	cursor: pointer;
	outline: 0;
	z-index: 1;
	transition: all 0.15s ease-in;
	border-radius: 0.15rem;

	color: ${({ theme }) => theme.color8};
	background-color: ${({ theme }) => theme.purple1};

	:hover {
		background-color: ${({ theme }) => theme.purple2};
	}

	${({ disabled }) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: not-allowed;
			:hover {
				background-color: ${({ theme }) => theme.purple1};
			}
		`};

	@keyframes ripple {
		0% {
			width: 0;
			height: 0;
			opacity: 0.5;
		}

		100% {
			width: 150px;
			height: 150px;
			opacity: 0;
		}
	}

	&:before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background-color: currentColor;
		visibility: hidden;
		z-index: 2;
	}

	&:not(:active):before {
		animation: ripple 0.4s cubic-bezier(0, 0, 0.2, 1);
		transition: visibility 0.4s step-end;
	}

	&:active:before {
		visibility: visible;
	}

	${props =>
		props.delete &&
		css`
			color: ${({ theme }) => theme.red1};
			background-color: ${({ theme }) => theme.color10};

			:hover {
				background-color: ${({ theme }) => theme.color6};
			}
		`};

	${({ delete2 }) =>
		delete2 &&
		css`
			color: ${({ theme }) => theme.color9};
			background-color: ${({ theme }) => theme.red1};
			box-shadow: none;
			:hover {
				background-color: ${({ theme }) => theme.red2};
			}
		`};

	${({ remove }) =>
		remove &&
		css`
			box-shadow: none;
			color: ${({ theme }) => theme.red1};
			background-color: ${({ theme }) => theme.color10};

			:hover {
				background-color: ${({ theme }) => theme.color6};
			}
		`};

	${({ flat }) =>
		flat &&
		css`
			box-shadow: none;
			color: ${({ theme }) => theme.purple1};
			background-color: ${({ theme }) => theme.color9};

			:hover {
				background-color: ${({ theme }) => theme.color6};
			}
		`};

	${({ confirm }) =>
		confirm &&
		css`
			color: ${({ theme }) => theme.color10};
			background-color: ${({ theme }) => theme.red1};

			:hover {
				background-color: ${({ theme }) => theme.red2};
			}
		`}
`
