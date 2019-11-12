import cloudinary from "cloudinary"
import streamToBuffer from "fast-stream-to-buffer"

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async function upload(file, folder, type) {
	let resource_type = "auto"
	if (type === "image") {
		resource_type = "image"
	}
	if (type === "video" || type === "audio") {
		resource_type = "video"
	}
	return new Promise((resolve, reject) => {
		streamToBuffer(file, (err, buffer) => {
			cloudinary.v2.uploader
				.upload_stream({ folder, resource_type }, (err, result) => {
					if (err) {
						throw new Error(`Could not upload type: `)
					}
					return resolve(result.secure_url)
				})
				.end(buffer)
		})
	})
}
