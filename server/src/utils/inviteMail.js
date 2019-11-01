import nodemailer from "nodemailer"

export default async function inviteUserMail(email, invitedBy) {
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
		subject: "Invite to join the conversation",
		html: `
		<html>
			<body>
				<h2>Invite to join the conversation</h2>
        <p>You have been invited by ${invitedBy} to join the conversaction.</p>
        <p>
          <a href="${process.env.APPLICATION_URL}">Join</a>
        </p>
				<div>
					<span>Thanks, your DEV Team</span>
				</div>
			</body>
		</html>
		`
	}

	// transporter.sendMail(message, (error, info) => {
	// 	if (error) {
	// 		return console.log(error)
	// 	}
	// 	console.log("Message sent: %s", info.messageId)
	// })
}
