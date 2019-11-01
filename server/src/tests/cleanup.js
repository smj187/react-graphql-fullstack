import { disconnect } from "./database"

after(async () => {
	await disconnect()
})
