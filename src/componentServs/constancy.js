import axios from "axios";

function saveConstancy(obj) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(process.env.VUE_APP_ROOT_API + "/constancy/insert", obj.body, {
                    headers: {
                        'Authorization': obj.token
                    }
                })
                .then(result => {
                    resolve(result.data.documents);
                })
                .catch(error => {

                    reject(error.response);
                });
        } catch (err) {
            console.log("err in saveConstancy: ", err);
        }
    });
}

function getListConstancy(obj) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .put(process.env.VUE_APP_ROOT_API + "/constancy/", obj.body, {
                    headers: {
                        'Authorization': obj.token
                    }
                })
                .then(result => {
                    resolve(result.data.documents);
                })
                .catch(error => {

                    reject(error.response);
                });
        } catch (err) {
            console.log("err in listConstancy: ", err);
        }
    });
}



export {
    saveConstancy,
    getListConstancy,
}