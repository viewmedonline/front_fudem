import axios from "axios";

function getSheetList(id_patient, id_sheet) {
    return new Promise((resolve, reject) => {
        let url = `${process.env.VUE_APP_ROOT_API}/nurse_sheet/${id_patient}`
        if (id_sheet) {
            url = `${url}/${id_sheet}`
        }
        try {
            axios.get(url,
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
            console.log('getSheetList: ', error)
        }
    })
}

function addNotes(id_sheet, data) {
    return new Promise((resolve, reject) => {
        try {
            axios.put(`${process.env.VUE_APP_ROOT_API}/nurse_sheet/note/${id_sheet}`,
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
            console.log('addNotes: ', error)
        }
    })
}

function addSheetNurse(data) {
    return new Promise((resolve, reject) => {
        try {
            axios.post(`${process.env.VUE_APP_ROOT_API}/nurse_sheet/`,
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
            console.log('addNotes: ', error)
        }
    })
}

function closeSheet(id_sheet) {
    return new Promise((resolve, reject) => {
        try {
            axios.put(`${process.env.VUE_APP_ROOT_API}/nurse_sheet/close/${id_sheet}`,
                {},
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
            console.log('addNotes: ', error)
        }
    })
}

function updateSheet(data){
    return new Promise((resolve, reject) => {
        try {
            axios.put(`${process.env.VUE_APP_ROOT_API}/nurse_sheet/${data.id}`,
                data.body,
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
            console.log('updateSheet: ', error)
        }
    })
}
export {
    getSheetList,
    addNotes,
    addSheetNurse,
    closeSheet,
    updateSheet
}