import axios from "axios";

function getDiagnoses(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.put(process.env.VUE_APP_ROOT_API + "/diagnoses", obj.body, {
					headers: {
						'Authorization': obj.token
					}
				})
				.then(result => {
					resolve(result.data.documents);
				})
				.catch(error => {
					console.log(error);
					reject(error.response);
				});
		} catch (err) {
			console.log("err in getDiagnoses: ", err);
		}
	});
}
//insert diagnoses
function insertDiagnoses(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.post(process.env.VUE_APP_ROOT_API + "/diagnoses", obj, {
					headers: {
						'Authorization': ""
					}
				})
				.then(result => {
					resolve(result.data.documents);
				})
				.catch(error => {
					console.log(error);
					reject(error.response);
				});
		} catch (err) {
			console.log("err in insertDiagnoses: ", err);
		}
	});
}

//diagnosis master
function getDiagnosesMaster(type) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.get(process.env.VUE_APP_ROOT_API + "/diagnoses/master/"+type, {
				})
				.then(result => {
					resolve(result.data.documents);
				})
				.catch(error => {
					console.log(error);
					reject(error.response);
				});
		} catch (err) {
			console.log("err in getDiagnosesMaster: ", err);
		}
	});
}
//insert diagnoses
function insertDiagnosesMaster(obj) {
	return new Promise((resolve, reject) => {
		try {
			axios
				.post(process.env.VUE_APP_ROOT_API + "/diagnoses/master", obj, {
					headers: {
						'Authorization': ""
					}
				})
				.then(result => {
					resolve(result.data.documents);
				})
				.catch(error => {
					console.log(error);
					reject(error.response);
				});
		} catch (err) {
			console.log("err in insertDiagnosesMaster: ", err);
		}
	});
}
export {
	getDiagnoses,
	insertDiagnoses,
	getDiagnosesMaster,
	insertDiagnosesMaster
}
