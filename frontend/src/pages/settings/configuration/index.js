import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_CONFIG, UPDATE_CONFIG } from "../../../graphql"
import { useForm, useToast, useValidation } from "../../../hooks"
import { Icon, H1, H2, H3, Button, Span, TextField, Strong } from "../../../components"
import { Form, Header, StyledLink, Wrapper } from "./styles"

export const Configuration = () => {
	const { addToastMessage } = useToast()
	const { validateNumber } = useValidation()
	const { onChange, onSubmit, values, setValues } = useForm(onUpdateConfig, {
		loaded: false,
		image: 0,
		video: 0,
		audio: 0,
		document: 0
	})
	const { data } = useQuery(GET_CONFIG)
	const [updateConfigMutation] = useMutation(UPDATE_CONFIG)

	if (data && !values.loaded) {
		setValues({
			...values,
			loaded: true,
			image: data.config.image,
			video: data.config.video,
			audio: data.config.audio,
			document: data.config.document,
			createdAt: data.config.createdAt,
			updatedAt: data.config.updatedAt,
			updatedBy: data.config.updatedBy.username
		})
	}

	async function onUpdateConfig() {
		const clientError = {
			image: validateNumber(values.image),
			video: validateNumber(values.video),
			audio: validateNumber(values.audio),
			document: validateNumber(values.document)
		}
		console.log(clientError)
		if (clientError.image || clientError.video || clientError.audio || clientError.document) {
			setValues({ ...values, errors: clientError })
		} else {
			updateConfigMutation({
				variables: {
					image: +values.image,
					video: +values.video,
					audio: +values.audio,
					document: +values.document
				},
				refetchQueries: [{ query: GET_CONFIG }]
			})
				.then(() => {
					console.log("updated")
					setValues({ ...values, loaded: false })
					addToastMessage("Configuration updated.")
				})
				.catch(({ graphQLErrors }) => {
					console.log("onUpdateUserAccount", graphQLErrors)
					setValues({ ...values, errors: graphQLErrors[0].code.errors })
				})
		}
	}
	return (
		<Form onSubmit={onSubmit}>
			<Header>
				<H1>System Configuration</H1>
				<StyledLink to="/chat/channels">
					<Icon name="Close" size="32" />
				</StyledLink>
			</Header>

			<H2>Some messages may have files attached.</H2>
			<H3> Limit their sizes for images, videos, audios and documents.</H3>

			<Wrapper
				sizeWrapper
				hasImageError={values.errors && values.errors.image}
				hasVideoError={values.errors && values.errors.video}
				hasAudioError={values.errors && values.errors.audio}
				hasDocumentError={values.errors && values.errors.document}
			>
				<Span>Max. image size: </Span>
				<TextField
					type="text"
					label=""
					name="image"
					placeholder="5000"
					value={values.image}
					onChange={onChange}
					error={values.errors && values.errors.image}
				/>
				<Span>kB</Span>
				<Span>Max. video size: </Span>
				<TextField
					type="text"
					label=""
					name="video"
					placeholder="5000"
					value={values.video}
					onChange={onChange}
					error={values.errors && values.errors.video}
				/>
				<Span>kB</Span>
				<Span>Max. audio size: </Span>
				<TextField
					type="text"
					label=""
					name="audio"
					placeholder="5000"
					value={values.audio}
					onChange={onChange}
					error={values.errors && values.errors.audio}
				/>
				<Span>kB</Span>
				<Span>Max. document size: </Span>
				<TextField
					type="text"
					label=""
					name="document"
					placeholder="5000"
					value={values.document}
					onChange={onChange}
					error={values.errors && values.errors.document}
				/>
				<Span>kB</Span>
			</Wrapper>
			<Wrapper metaWrapper>
				<H2>Metadata:</H2>
				<Span>
					approximately created at
					<Strong> {new Date(values.createdAt).toLocaleString()}</Strong>
				</Span>
				<Span>
					last updated at
					<Strong> {new Date(values.updatedAt).toLocaleString()}</Strong>
				</Span>
				<Span>
					updated by user: <Strong>{values.updatedBy}</Strong>
				</Span>
			</Wrapper>
			<Button>Save Changes</Button>
		</Form>
	)
}
