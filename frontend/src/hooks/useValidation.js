export const useValidation = () => {
	const validatePassword = password => {
		if (!password || !password.trim().length) {
			return "Password must not be empty"
		}
		if (password.trim().length < 8) {
			return "Password is too weak (minimum length is 8)"
		}
		const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
		if (!re.test(password)) {
			return "The password must contain at least one special character of '@$!%*#?&'"
		}
		return null
	}

	const validateUsername = username => {
		if (!username || !username.trim().length) {
			return "Username must not be empty"
		}
		if (username.trim().length < 3) {
			return "Username is too short (minimum length is 3)"
		}
		if (username.trim().length > 32) {
			return "Username is too long (maximum length is 32)"
		}
	}

	const validateName = name => {
		if (name.trim().length > 32) {
			return "This field has a character limitation of 32 character."
		}
	}

	const validateEmail = email => {
		if (!email || !email.trim().length) {
			return "Email must not be empty"
		} else {
			const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
			if (!email.match(regEx)) {
				return "Email must be a valid email address"
			} else {
				return null
			}
		}
	}

	const validateNumber = number => {
		if (!Number.isInteger(+number)) {
			return "Not a valid number"
		}
	}

	const validateTimeFormat = time => {
		if (!new RegExp(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/g).test(time)) {
			return "Invalid format"
		}
	}

	const validateAvatar = file => {
		if (!file.type.includes("image/jpeg")) {
			return "Invalid image format (.png or .jpq required)"
		}
		if (file.size > 55000) {
			return "Image size is restricted to 55Kb"
		}
	}

	const validateChannelName = name => {
		if (!name || !name.trim().length) {
			return "Name must not be empty"
		}
		if (name.trim().length < 3) {
			return "Name is too short (minimum length is 3)"
		}
		if (name.trim().length > 32) {
			return "Name is too long (maximum length is 32)"
		}
	}

	return {
		validatePassword,
		validateEmail,
		validateName,
		validateUsername,
		validateNumber,
		validateTimeFormat,
		validateAvatar,
		validateChannelName
	}
}
