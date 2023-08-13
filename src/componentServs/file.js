import axios from "axios";
 
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
export {
	sendFile,
	getImage,
	getPreview
}