import React from "react"
import { css } from "styled-components"
import ReactSimpleToolip from "react-simple-tooltip"

export const Tooltip = ({ render, content }) => {
	return (
		<ReactSimpleToolip
			content={content}
			customCss={css`
				white-space: nowrap;
			`}
		>
			{render}
		</ReactSimpleToolip>
	)
}
