import axios from "axios";

function getPerson(objAux) {
    return new Promise((resolve, reject) => {
        try {
            axios.put(process.env.VUE_APP_ROOT_API + "/persons",
                objAux.body, {
                    headers: {
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

function getPersonList(objAux) {
    return new Promise((resolve, reject) => {
        try {
            axios.put(process.env.VUE_APP_ROOT_API + "/persons",
                objAux.body, {
                    headers: {
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

function updatePerson(objAux) {
    return new Promise((resolve, reject) => {
        try {
            axios.put(process.env.VUE_APP_ROOT_API + "/persons/" + objAux.idPerson,
                objAux.body, {
                    headers: {
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
    getPerson,
    getPersonList,
    updatePerson
}