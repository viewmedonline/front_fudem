import axios from "axios";

function getComsumed() {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/master/consumed", {
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
      })
      .then((result) => {
        resolve(result.data.documents);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
}

function getActivity() {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/master/activity", {
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
      })
      .then((result) => {
        resolve(result.data.documents);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
}

function getLenses() {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/master/lenses", {
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
      })
      .then((result) => {
        resolve(result.data.documents);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
}

function getTypeConsultations() {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/master/consultations", {
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
      })
      .then((result) => {
        resolve(result.data.documents);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
}

function getMedicinePresentations() {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/master/medicine_presentation", {
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
      })
      .then((result) => {
        resolve(result.data.documents);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
}

function getMedicineAdministration() {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/master/medicine_administration", {
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
      })
      .then((result) => {
        resolve(result.data.documents);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
}

export {
  getComsumed,
  getActivity,
  getLenses,
  getTypeConsultations,
  getMedicinePresentations,
  getMedicineAdministration,
};
