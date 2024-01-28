import axios from "axios";

function saveSheetPediatrics(data) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + "/pediatrics_sheet", data, {
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
    saveSheetPediatrics,
}