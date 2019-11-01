import styled, { css } from "styled-components"

export const Span = styled.span`
	font-size: 1.35rem;
	width: 100%;

	color: ${({ theme }) => theme.color2};

	${({ link }) =>
		link &&
		css`
			font-size: 1.1rem;
			color: ${({ theme }) => theme.color4};
			cursor: pointer;
			:hover {
				text-decoration: underline;
			}
		`}
`

export const H1 = styled.h1`
	font-size: 3rem;
	/* font-weight: 900; */
	/* letter-spacing: 1.5px; */

	color: ${({ theme }) => theme.color2};
`

export const H2 = styled.h2`
	/* font-size: 1.875vw; */
	font-size: 1.875rem;
	line-height: 2.2395833333rem;
	font-weight: 600;
	width: 100%;

	color: ${({ theme }) => theme.purple1};
`

export const H3 = styled.h3`
	font-size: 1.4583333333rem;
	font-weight: 500;
	line-height: 1.7708333333rem;
	width: 100%;

	color: ${({ theme }) => theme.color2};
`

export const Strong = styled.strong`
	font-weight: bolder;
`

export const Underline = styled.span`
	text-decoration: underline;
	cursor: pointer;
	:hover {
		color: ${({ theme }) => theme.color2};
	}
`
