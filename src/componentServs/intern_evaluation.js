import axios from "axios";

function saveSheetEvaluationMI(data) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + "/evaluation", data, {
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
    saveSheetEvaluationMI,
}