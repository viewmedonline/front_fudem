import axios from "axios";


function getListSucursal(obj) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(process.env.VUE_APP_ROOT_API + "/sucursal/list", obj.body, {
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
            console.log("err in listConstancy: ", err);
        }
    });
}
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
function getPerson (objAux) {
	return new Promise((resolve, reject) => {
		try {
			axios.put(process.env.VUE_APP_ROOT_API + "/persons",
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
function getConsulting (objAux) {
	return new Promise((resolve, reject) => {
		try {
			axios.post(process.env.VUE_APP_ROOT_API + "/consultationsUpdate",
				objAux.body,
				{
					headers:
					{
						'Authorization': objAux.token
					}
				}).then(result => {
					resolve(result.data.documents)
				}).catch(error => {
					reject(error.response.data.message)
				})
		} catch (error) {
			console.log('contacts_confirmed: ', error)
		}
	})
}
function getUpdateConsulting (objAux) {
	return new Promise((resolve, reject) => {
		try {
			axios.put(process.env.VUE_APP_ROOT_API + "/consultationUpdate/"+objAux.id,
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
function getPersonUpdate (objAux) {
	return new Promise((resolve, reject) => {
		try {
			axios.put(process.env.VUE_APP_ROOT_API + "/listPersons",
				objAux.body,
				{
					headers:
					{
						'Authorization': objAux.token
					}
				}).then(result => {
					resolve(result.data.documents)
				}).catch(error => {
					reject(error.response.data.message)
				})
		} catch (error) {
			console.log('contacts_confirmed: ', error)
		}
	})
}
function getRecordsPatient (objAux) {
	return new Promise((resolve, reject) => {
		try {
			axios.get(process.env.VUE_APP_ROOT_API + "/records/"+objAux.body.id,
				{
					headers:
					{
						'Authorization': objAux.token
					}
				}).then(result => {
					resolve(result.data.documents)
				}).catch(error => {
					reject(error.response.data.message)
				})
		} catch (error) {
			console.log('contacts_confirmed: ', error)
		}
	})
}

export {
    getListSucursal,
    getUser,
    getPerson,
    getConsulting,
    getUpdateConsulting,
    getPersonUpdate,
    getRecordsPatient
    
}