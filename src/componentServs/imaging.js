import axios from "axios";

function saveImaging(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.post(process.env.VUE_APP_ROOT_API + "/imaging/insert", obj.body, {
					headers: {
						'Authorization': obj.token
					}
				})
				.then(result => {
					resolve(result.data.documents);
				})
				.catch(error => {
					
					reject(error.response);
				});
		} catch (err) {
			console.log("err in saveConsultation: ", err);
		}
	});
}
function getListImaging(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.get(process.env.VUE_APP_ROOT_API + "/imaging/"+obj.personId, {
					headers: {
						'Authorization': obj.token
					}
				})
				.then(result => {
					resolve(result.data.documents);
				})
				.catch(error => {
					
					reject(error.response);
				});
		} catch (err) {
			console.log("err in saveConsultation: ", err);
		}
	});
}
function removeImaging(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.put(process.env.VUE_APP_ROOT_API + "/imaging/delete/"+obj.body.imageId,obj.body, {
					headers: {
						'Authorization': obj.token
					}
				})
				.then(result => {
					resolve(result.data.documents);
				})
				.catch(error => {
					
					reject(error.response);
				});
		} catch (err) {
			console.log("err in saveConsultation: ", err);
		}
	});
}

export {
	saveImaging,
	getListImaging,
	removeImaging
}