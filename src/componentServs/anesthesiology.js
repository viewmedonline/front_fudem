import axios from "axios";

function saveSheetAnesthesiology(data) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + "/anesthesiology_sheet", data, {
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

function getListAnesthesiology(patientId) {
    return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_ROOT_API + "/anesthesiology_sheet/"+patientId, {
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


export {
    saveSheetAnesthesiology,getListAnesthesiology
}