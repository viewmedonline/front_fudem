import axios from "axios";

function saveAntecedent(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.post(process.env.VUE_APP_ROOT_API + "/records", obj.body, {
					headers: {
						'Authorization': obj.token
					}
				})
				.then(result => {
					resolve(result.data.documents[0]);
				})
				.catch(error => {
					
					reject(error.response);
				});
		} catch (err) {
			console.log("err in saveConsultation: ", err);
		}
	});
}
function updateAntecedent(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.put(process.env.VUE_APP_ROOT_API + "/records/"+obj.idRecord, obj.body, {
					headers: {
						'Authorization': obj.token
					}
				})
				.then(result => {
					resolve(result.data.documents[0]);
				})
				.catch(error => {
					
					reject(error.response);
				});
		} catch (err) {
			console.log("err in saveConsultation: ", err);
		}
	});
}

function getAntecedent(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.get(process.env.VUE_APP_ROOT_API + "/records/"+obj.idRecord, {
					headers: {
						'Authorization': obj.token
					}
				})
				.then(result => {
					resolve(result.data.documents[0]);
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
	saveAntecedent,
	updateAntecedent,
	getAntecedent
}