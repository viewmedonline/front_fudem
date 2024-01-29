import axios from "axios";

function saveSheetNutritionist(data) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + "/nutritionist_sheet", data, {
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
    saveSheetNutritionist,
}