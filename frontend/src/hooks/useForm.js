import { useState } from "react"

export const useForm = (callback, initialValue = {}, initialState = {}) => {
	const [values, setValues] = useState(initialValue)
	const [state, setState] = useState(initialState)

	const onChange = event => {
		setValues({ ...values, [event.target.name]: event.target.value })
	}

	const onSubmit = e => {
		e.preventDefault()

		callback()
	}

	return { onSubmit, onChange, values, setValues, state, setState }
}
