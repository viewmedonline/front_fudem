import axios from "axios";

function getMedicines(type, all) {
  if (all) {
    all = "/" + true;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/medicines/" + type + all, {
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

function saveMedicines(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.VUE_APP_ROOT_API + "/medicines", data, {
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

function updateMedicines(data, id) {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.VUE_APP_ROOT_API + "/medicines/" + id, data, {
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

function savePrescriptions(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.VUE_APP_ROOT_API + "/prescription", data, {
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

function updatePrescriptions(data, id) {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.VUE_APP_ROOT_API + "/prescription/" + id, data, {
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

function findPrescriptions(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/prescription/" + id, {
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
  getMedicines,
  saveMedicines,
  savePrescriptions,
  findPrescriptions,
  updatePrescriptions,
  updateMedicines,
};
