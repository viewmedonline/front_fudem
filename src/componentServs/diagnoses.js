import axios from "axios";

// function deleteConsultation(obj) {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			let port = ":3000"
// 			if (process.env.ROOT_API.includes("viewmedonline"))
// 				port = ":3072"
// 			axios
// 				.delete(process.env.ROOT_API + "/consultations/" + obj.id, {
// 					data: obj.body,
// 					headers: {
// 						'Authorization': obj.token
// 					}
// 				})
// 				.then(result => {
// 					resolve(result.data.documents);
// 				})
// 				.catch(error => {
// 					console.log(error);
// 					reject(error.response);
// 				});
// 		} catch (err) {
// 			console.log("err in updateConsultation: ", err);
// 		}
// 	});
// }
 
// function contacts_confirmed(objAux) {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			let port = ":3000"
// 			if (process.env.ROOT_API.includes("viewmedonline"))
// 				port = ":3096"
// 			axios.get(process.env.ROOT_API + "/contacts/" + objAux.user1 + "/" + objAux.user2,
// 				{
// 					headers:
// 					{
// 						'Authorization': objAux.token
// 					}
// 				}).then(result => {
// 					resolve(result.data.documents)
// 				}).catch(error => {
// 					reject(error.response.data.message)
// 				})
// 		} catch (error) {
// 			console.log('contacts_confirmed: ', error)
// 		}
// 	})
// }

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
export {
	getDiagnoses,
	insertDiagnoses
}
