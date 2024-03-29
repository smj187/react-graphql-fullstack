import nodemailer from "nodemailer"

export default async function resetPasswordMail(email, password) {
	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_SERVER_HOST,
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL_SERVER_ADDRESS,
			pass: process.env.MAIL_SERVER_PASSWORD
		}
	})

	const message = {
		from: `"Server" <${process.env.MAIL_SERVER_ADDRESS}>`,
		to: `"email" <${email}>`,
		subject: "Password Reset Email",
		html: `
		<html>
			<body>
				<h2>Reset your password</h2>
				<p>You have requested a new password.</p>
				<p>The new autogenerated password: ${password}</p>
				<div>
					<span>Thanks, your DEV Team</span>
				</div>
			</body>
		</html>
		`
	}

	console.log("new passwd", password)

	// transporter.sendMail(message, (error, info) => {
	// 	if (error) {
	// 		return console.log(error)
	// 	}
	// 	console.log("Message sent: %s", info.messageId)
	// })
}
