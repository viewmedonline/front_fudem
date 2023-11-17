import axios from "axios";

function saveReference(data) {
    return new Promise((resolve, reject) => {
        try {
            axios.post(`${process.env.VUE_APP_ROOT_API}/reference`,
                data,
                {
                    headers:
                    {
                    }
                }).then(result => {
                    resolve(result.data.documents)
                }).catch(error => {
                    reject(error.response.data.message)
                })
        } catch (error) {
            console.log('saveReference: ', error)
        }
    })
}

function getReference(idUser) {
    return new Promise((resolve, reject) => {
        try {
            axios.get(`${process.env.VUE_APP_ROOT_API}/references/${idUser}`,
                {
                    headers:
                    {
                    }
                }).then(result => {
                    resolve(result.data.documents)
                }).catch(error => {
                    reject(error.response.data.message)
                })
        } catch (error) {
            console.log('getReference: ', error)
        }
    })
}


export {
    saveReference,
    getReference
}