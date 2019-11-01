import styled, { css } from "styled-components"
import { Button, Icon, H1, H2, H3 } from "../../../components"
import { Form, Header, StyledLink } from "../styles"

export const Wrapper = styled.div`
	${({ sizeWrapper }) =>
		sizeWrapper &&
		css`
			display: grid;
			grid-template-columns: 15rem 6rem 10rem;
			grid-row-gap: 1rem;
			align-items: center;
			padding: 1rem 0 1.5rem;

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

			> :nth-child(3n) {
				/* margin-left: -25.33rem; */
			}
		`};

	${({ metaWrapper }) =>
		metaWrapper &&
		css`
			display: flex;
			flex-wrap: wrap;
			margin: 1.5rem 0 3rem;

			> :nth-child(2),
			> :nth-child(3),
			> :nth-child(4) {
				font-size: 1.25rem;
			}

			> :first-child {
				width: 100%;
				margin-bottom: 0.5rem;
			}
		`}
`

export { Form, Header, StyledLink, Button, Icon, H1, H2, H3 }
