import styled from "styled-components"
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

export const Content = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	min-height: 80vh;

	> :nth-child(3) {
		width: 50vw;
		margin: 10vh 0 2vh 0;
	}
`

export const Image = styled.img`
	height: auto;
	position: absolute;
	bottom: 5rem;
	left: 40vw;
	height: 25rem;
	min-width: 20rem;

	z-index: -99999;
`
