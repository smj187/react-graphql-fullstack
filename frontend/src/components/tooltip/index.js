import React from "react"
import { css } from "styled-components"
import ReactSimpleToolip from "react-simple-tooltip"

export const Tooltip = ({ render, content, placement }) => {
	return (
		<ReactSimpleToolip
			content={content}
			placement={placement}
			zIndex={99999}
			fontSize="1.2rem"
			padding={10}
			customCss={css`
				white-space: nowrap;
			`}
		>
			{render}
		</ReactSimpleToolip>
	)
}
