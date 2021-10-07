import axios from "axios";

function getListSucursal(obj) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(process.env.VUE_APP_ROOT_API + "/sucursal/list", obj.body, {
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
function getSucursal(obj) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(process.env.VUE_APP_ROOT_API + "/sucursal/list", obj.body, {
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
            console.log("err in listSucursal: ", err);
        }
    });
}
function updateSucursal(obj) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .put(process.env.VUE_APP_ROOT_API + "/sucursalUpdate/"+obj.body.id, obj.body, {
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
            console.log("err in UpdateSucursal: ", err);
        }
    });
}
function createSucursal(obj) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(process.env.VUE_APP_ROOT_API + "/sucursal/", obj.body, {
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
            console.log("err in UpdateSucursal: ", err);
        }
    });
}
function listSucursalFudem() {
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(process.env.VUE_APP_ROOT_API + "/sucursalListFudem", {
                    
                })
                .then(result => {
                    resolve(result.data.documents);
                })
                .catch(error => {
                    reject(error.response);
                });
        } catch (err) {
            console.log("err in UpdateSucursal: ", err);
        }
    });
}


export {
    getListSucursal,
    getSucursal,
    updateSucursal,
    createSucursal,
    listSucursalFudem
}