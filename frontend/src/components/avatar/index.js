import React from "react"
import styled from "styled-components"
import { Icon } from "../icon"

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	border: none;
	position: relative;
	overflow: hidden;
	text-align: center;
	border-radius: 50%;
	font-family: Arial;
	font-weight: 500;

	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
		0 1px 5px 0 rgba(0, 0, 0, 0.06);
	cursor: ${({ notClickable }) => (notClickable ? "default" : "pointer")};
	height: ${({ size }) => (size ? `${size}px` : "50px")};
	width: ${({ size }) => (size ? `${size}px` : "50px")};
	color: ${({ theme }) => theme.color10};
	background-color: ${({ hasAvatar, background }) => !hasAvatar && background && background};
`

const defaultColors = [
	"#2ecc71",
	"#3498db",
	"#00B4FF",
	"#e67e22",
	"#FFB900",
	"#E81123",
	"#e74c3c",
	"#1abc9c",
	"#2c3e50",
	"#5C2D91",
	"#8e44ad",
	"#107C10"
]

const Image = styled.img`
	margin: 0 auto;
	width: auto;
	height: 85%;
	transform: scale(1.5);
`

const Initial = styled.span`
	font-size: ${({ font }) => `${(+font - 5) / 2}px`};
`

export const Avatar = ({
	avatar,
	size = 80,
	name = " ",
	notClickable = false,
	isPrivate = false,
	...rest
}) => {
	const background = () => {
		if (!name) return "#5C2D91"
		let sum = 0
		for (let i = 0; i < name.length; i++) {
			sum += name.charCodeAt(i)
		}
		return defaultColors[sum % defaultColors.length]
	}

	const image = img => (typeof img === "object" ? window.URL.createObjectURL(img) : img)

	const initial = name => {
		if (!name) return "?"
		return name.trim().length > 0 && name[0].toUpperCase()
	}

	if (isPrivate) {
		return (
			<Container
				size={size}
				hasAvatar={!!avatar}
				background={background}
				notClickable={notClickable}
				{...rest}
			>
				<Initial font={size}>
					<Icon name="Group" />
				</Initial>
			</Container>
		)
	}

	return (
		<Container
			size={size}
			hasAvatar={!!avatar}
			background={background}
			notClickable={notClickable}
			{...rest}
		>
			{avatar ? (
				<Image src={image(avatar)} />
			) : (
				<Initial font={size}>{initial(name)}</Initial>
			)}
		</Container>
	)
}
