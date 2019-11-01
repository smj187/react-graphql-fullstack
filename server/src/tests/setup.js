import bcrypt from "bcryptjs"

import { connect } from "./database"
import { User } from "../models"

before(async () => {
	await connect()
	// await User.create({
	// 	username: "admin",
	// 	password: await bcrypt.hash("passwd12345", 12),
	// 	email: "admin@test.com",
	// 	role: "admin"
	// })
})
