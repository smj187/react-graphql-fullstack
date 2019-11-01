export default function fileInformation(file) {
	return new Promise(async (resolves, rejects) => {
		const { filename, mimetype, createReadStream } = await file
		let filesize = 0
		let fileStream = createReadStream()
		fileStream.on("data", chunk => {
			filesize += chunk.length
		})
		fileStream.once("end", () =>
			resolves({
				filename,
				mimetype,
				filesize,
				fileStream,
				createReadStream
			})
		)
		fileStream.on("error", rejects)
	})
}
