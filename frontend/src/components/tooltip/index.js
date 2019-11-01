import React from "react"
import Floater from "react-floater"
import disableScroll from "disable-scroll"
import TooltipS from "react-simple-tooltip"
import styled, { css } from "styled-components"

const Container = styled.div`
	> span > span {
		cursor: pointer !important;
		max-width: 5rem;
	}
	border: 1px solid red;
`

export const Tooltip = ({ content, placement = "top", children }) => (
	<TooltipS
		content={content}
		placement={placement}
		customCss={css`
			white-space: nowrap;
			font-size: 0.9rem;
		`}
	>
		{children}
	</TooltipS>
)

// export const Tooltip = ({ cb, placement = "top", content, children }) => {
// 	return (
// 		<Floater
// 			callback={cb}
// 			content={content}
// 			event="hover"
// 			placement={placement}
// 			styles={{
// 				wrapper: {
// 					cursor: "pointer",
// 					display: "inline-flex",
// 					flexDirection: "column"
// 				},
// 				container: {
// 					backgroundColor: "#fff",
// 					color: "#0a0a23",
// 					minHeight: 60,
// 					minWidth: 200,
// 					padding: 20,
// 					position: "relative"
// 				},
// 				content: {
// 					fontSize: 18
// 				},
// 				arrow: {
// 					color: "#fff",
// 					display: "inline-flex",
// 					length: 16,
// 					margin: 8,
// 					position: "absolute",
// 					spread: 32
// 				}
// 			}}
// 		>
// 			{children}
// 		</Floater>
// 	)
// }
