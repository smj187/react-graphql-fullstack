import React, { useEffect } from "react"

import { useForm, useToast, useValidation, useApplication } from "../../../../hooks"
import { H2, Icon, TextField, Button, H3, Span, Spinner } from "../../../../components"
import { Container, Header, StyledLink, Loading, Content, FileSizeWrapper } from "./styles"

export const Config = () => {
	const { config, onUpdateConfig } = useApplication()
	const { addToastMessage } = useToast()
	const { validateNumber } = useValidation()
	const { onChange, onSubmit, values, setValues } = useForm(onUpdateSystemConfig, {
		image: 0,
		video: 0,
		audio: 0,
		document: 0
	})
	useEffect(() => {
		if (config) {
			setValues({
				...values,
				image: config.image,
				video: config.video,
				audio: config.audio,
				document: config.document,
				createdAt: config.createdAt,
				updatedAt: config.updatedAt,
				updatedBy: config.updatedBy.username
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [config])

	async function onUpdateSystemConfig() {
		const clientError = {
			image: validateNumber(values.image),
			video: validateNumber(values.video),
			audio: validateNumber(values.audio),
			document: validateNumber(values.document)
		}
		if (clientError.image || clientError.video || clientError.audio || clientError.document) {
			setValues({ ...values, errors: clientError })
		} else {
			const serverError = await onUpdateConfig({
				image: +values.image,
				video: +values.video,
				audio: +values.audio,
				document: +values.document
			})
			if (!serverError) {
				addToastMessage("Configuration updated.")
			} else {
				setValues({
					...values,
					errors: serverError.graphQLErrors[0].extensions.code.errors
				})
			}
		}
	}
	return (
		<Container>
			<Header>
				<H2>Configuration</H2>
				<StyledLink to="/">
					<Icon name="Close" size="48" />
				</StyledLink>
			</Header>

			{!config ? (
				<Loading>
					<Spinner />
				</Loading>
			) : (
				<Content onSubmit={onSubmit}>
					<H2>Some messages may have files attached.</H2>
					<H3> Limit their sizes for images, videos, audios and documents.</H3>
					<FileSizeWrapper
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
					</FileSizeWrapper>

					<Button>Save Changes</Button>
				</Content>
			)}
		</Container>
	)
}
