import axios from "axios";

function getUser (objAux) {
	return new Promise((resolve, reject) => {
		try {
			axios.put(process.env.VUE_APP_ROOT_API + "/users",
				objAux.body,
				{
					headers:
					{
						'Authorization': objAux.token
					}
				}).then(result => {
					resolve(result.data.documents[0])
				}).catch(error => {
					reject(error.response.data.message)
				})
		} catch (error) {
			console.log('contacts_confirmed: ', error)
		}
	})
}

export {
	getUser
}