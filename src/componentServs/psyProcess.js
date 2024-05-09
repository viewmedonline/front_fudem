import axios from "axios";

function savePsiProcess(data) {
  return new Promise((resolve, reject) => {
    let url = `${process.env.VUE_APP_ROOT_API}/psi_process`;
    try {
      axios
        .post(url, data,{
          headers: {},
        })
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    } catch (error) {
      console.log("getSheetList: ", error);
    }
  });
}

function closedPsiProcess(data) {
  return new Promise((resolve, reject) => {
    let url = `${process.env.VUE_APP_ROOT_API}/psi_process/closed`;
    try {
      axios
        .post(url, data,{
          headers: {},
        })
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    } catch (error) {
      console.log("getSheetList: ", error);
    }
  });
}

function getPsyProcess(data) {
  return new Promise((resolve, reject) => {
    let url = `${process.env.VUE_APP_ROOT_API}/psi_process`;
    try {
      axios
        .get(url,{
          headers: {},
        })
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    } catch (error) {
      console.log("getSheetList: ", error);
    }
  });
}

function updatePsiProcess(data) {
  return new Promise((resolve, reject) => {
    let url = `${process.env.VUE_APP_ROOT_API}/psi_process/${data._id}`;
    try {
      axios
        .put(url, {data:data.data},{
          headers: {},
        })
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    } catch (error) {
      console.log("getSheetList: ", error);
    }
  });
}




export {savePsiProcess,getPsyProcess,updatePsiProcess,closedPsiProcess};
