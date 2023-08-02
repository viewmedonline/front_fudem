import axios from "axios";

function getSheetList(id_patient) {
    return new Promise((resolve, reject) => {
        try {
            //process.env.VUE_APP_ROOT_API + "/nurse_sheet"
            axios.get(`${process.env.VUE_APP_ROOT_API}/nurse_sheet/${id_patient}`,
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
            console.log('contacts_confirmed: ', error)
        }
    })
}

export {
    getSheetList
}