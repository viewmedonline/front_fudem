import axios from "axios";

function savePdf(data) {
	return new Promise((resolve, reject) => {
		axios.post(process.env.VUE_APP_ROOT_API + "/report/save", data, {
			headers: {
				'content-type': 'application/json',
				'Authorization': ""
			}
		}).then(result => {
			resolve(result.data.documents)
		}).catch(error => {
			reject(error.response.data.message)
		})
	})
}

function sendFile(arr, name, token) {
	return new Promise((resolve, reject) => {
		axios.put(process.env.VUE_APP_ROOT_API  + "/store_file/" + name, arr, {
			headers: {
				'content-type': 'multipart/form-data',
				'Authorization': token
			}
		}).then(result => {
			resolve(result.data.documents[0])
		}).catch(error => {
			reject(error.response.data.message)
		})
	})
}
function getImage(id, token) {
	return new Promise((resolve, reject) => {
		try {
			axios.get(process.env.VUE_APP_ROOT_API + "/get_file/" + id, {
				responseType: 'blob',
				headers: {
					'content-type': 'multipart/form-data',
					'Authorization': token
				}
			})
				.then(result => {
					resolve(result)
				}).catch(error => {
					reject(error)
				})
		} catch (err) {
			console.log('err in Get Image: ', err);

		}
	})
}

function getPreview(data) {
	return new Promise((resolve, reject) => {
		try {
			axios.post(process.env.VUE_APP_ROOT_API + "/report/preview", data, {
				responseType: 'blob',
				headers: {
					'content-type': 'application/json',
				}
			})
				.then(result => {
					resolve(result)
				}).catch(error => {
					reject(error)
				})
		} catch (err) {
			console.log('err in Get Image: ', err);

		}
	})
}

function deleteFile(id) {
	return new Promise((resolve, reject) => {
		try {
			axios.delete(process.env.VUE_APP_ROOT_API + "/delete_file/" + id, {
				headers: {
				}
			})
				.then(result => {
					resolve(result)
				}).catch(error => {
					reject(error)
				})
		} catch (err) {
			console.log('err in deleteFile: ', err);

		}
	})
}
export {
	sendFile,
	getImage,
	getPreview,
	savePdf,
	deleteFile
}