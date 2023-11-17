import axios from "axios";

function saveSheetSurgery(data) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + "/surgery_sheet", data, {
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
    saveSheetSurgery,
}