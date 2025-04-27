import axios from "axios";

function saveConsultation(obj) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          process.env.VUE_APP_ROOT_API + "/consultations/insert",
          obj.body,
          {
            headers: {
              Authorization: obj.token,
            },
          }
        )
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response);
        });
    } catch (err) {
      console.log("err in saveConsultation: ", err);
    }
  });
}

function getListConsultation(obj) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          process.env.VUE_APP_ROOT_API + "/consultations/" + obj.active,
          obj.body,
          {
            headers: {
              Authorization: obj.token,
            },
          }
        )
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response);
        });
    } catch (err) {
      console.log("err in saveConsultation: ", err);
    }
  });
}

function getLastConsultation(obj) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(process.env.VUE_APP_ROOT_API + "/consultationsLast", obj.body, {
          headers: {
            Authorization: obj.token,
          },
        })
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response);
        });
    } catch (err) {
      console.log("err in saveConsultation: ", err);
    }
  });
}

function getConsultation(obj) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(
          process.env.VUE_APP_ROOT_API + "/consultation/" + obj.idConsultation,
          {
            headers: {
              Authorization: obj.token,
            },
          }
        )
        .then((result) => {
          resolve(result.data.documents[0]);
        })
        .catch((error) => {
          reject(error.response);
        });
    } catch (err) {
      console.log("err in saveConsultation: ", err);
    }
  });
}

function updatedConsultation(obj) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(
          process.env.VUE_APP_ROOT_API + "/consultation/" + obj.idConsultation,
          obj.body,
          {
            headers: {
              Authorization: obj.token,
            },
          }
        )
        .then((result) => {
          resolve(result.data.documents[0]);
        })
        .catch((error) => {
          reject(error.response);
        });
    } catch (err) {
      console.log("err in saveConsultation: ", err);
    }
  });
}

function deleteConsultation(obj) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(
          process.env.VUE_APP_ROOT_API +
            "/consultation/" +
            obj.body.consultationId,
          obj.body,
          {
            headers: {
              Authorization: obj.token,
            },
          }
        )
        .then((result) => {
          resolve(result.data.documents[0]);
        })
        .catch((error) => {
          reject(error.response);
        });
    } catch (err) {
      console.log("err in DeleteConsultation: ", err);
    }
  });
}
function getListConsultationReport(obj) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(process.env.VUE_APP_ROOT_API + "/consultationsReport", obj.body, {
          headers: {
            Authorization: obj.token,
          },
        })
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response);
        });
    } catch (err) {
      console.log("err in saveConsultation: ", err);
    }
  });
}

function getLastPrescription(userId, type) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(
          `${process.env.VUE_APP_ROOT_API}/lastPrescription/${userId}/${type}`
        )
        .then((result) => {
          resolve(result.data.documents);
        })
        .catch((error) => {
          reject(error.response);
        });
    } catch (err) {
      console.log("err in saveConsultation: ", err);
    }
  });
}

export {
  saveConsultation,
  getListConsultation,
  getConsultation,
  updatedConsultation,
  deleteConsultation,
  getLastConsultation,
  getListConsultationReport,
  getLastPrescription,
};
