import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 10vw;

	overflow: auto;
	width: 100%;
	height: 100vh;
`

export const Header = styled.div`
	display: flex;
	align-items: center;
	min-height: 9rem;
	margin-bottom: 1.5rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 50rem;

	> :first-child {
		font-size: 4rem;
		font-weight: 900;
	}
`

export const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;

	margin-left: auto;
	margin-right: 3rem;

	> :first-child {
		color: ${({ theme }) => theme.color5};
	}

	:hover > :first-child {
		color: ${({ theme }) => theme.color2};
	}
`

export const Loading = styled.div`
	height: calc(100vh - 11.5rem);
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-left: 25vw;
	padding-top: 20vh;

	> :nth-child(2) {
		margin-top: 2rem;
		width: auto;
	}
`

export const Content = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 8.5rem;
`

export const FileSizeWrapper = styled.div`
	display: grid;
	grid-template-columns: 15rem 6rem 10rem;
	grid-row-gap: 1rem;
	align-items: center;
	padding: 1rem 0 1.5rem;
	margin-top: 2rem;

	> :nth-child(2),
	> :nth-child(5),
	> :nth-child(8),
	> :nth-child(11) {
		label,
		input {
			text-align: center;
			max-width: 5rem;
		}
	}

	${({ hasImageError }) =>
		hasImageError &&
		css`
			> :nth-child(3) {
				margin-bottom: 1.5rem;
			}
		`};

	${({ hasVideoError }) =>
		hasVideoError &&
		css`
			> :nth-child(6) {
				margin-bottom: 1.5rem;
			}
		`};

	${({ hasAudioError }) =>
		hasAudioError &&
		css`
			> :nth-child(9) {
				margin-bottom: 1.5rem;
			}
		`};

	${({ hasDocumentError }) =>
		hasDocumentError &&
		css`
			> :nth-child(12) {
				margin-bottom: 1.5rem;
			}
		`};
`
