<template>
  <v-container>
    <!-- <v-form autocomplete="off"> -->
    <v-card class="mx-auto elevation-0 blue-grey lighten-5">
      <v-card-title class="title font-weight-regular justify-space-between">
        <div v-if="
          storeConsultation.objOphthalmology &&
          storeConsultation.objOphthalmology.data
        ">
          {{ physicianEval }}
        </div>
        <div v-else>
          {{ $store.state.physician.forename }}
          {{ $store.state.physician.surname }}
        </div>
        <div>
          <span>{{ $t("title.step") }}&nbsp;</span>
          <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="pasoTitle"></v-avatar>
        </div>
      </v-card-title>

      <v-divider></v-divider>

      <v-window v-model="paso">
        <v-window-item :value="0">
          <antecedent class="px-2 py-2" ref="antecedentRef"></antecedent>
          <previous_surgeries class="px-2 py-2" ref="previousSurgeriesRef"></previous_surgeries>
          <general_data_oft class="px-2 py-2" ref="generalDataOftRef"></general_data_oft>
          <clinic_history class="px-2 py-2" ref="clinicHistoryRef"></clinic_history>
          <preliminary_data class="px-2 py-2" ref="preliminaryDataRef"></preliminary_data>
        </v-window-item>
        <v-window-item :value="1">
          <diagnosis_oft class="px-2 py-2" ref="diagnosisOftRef"></diagnosis_oft>
          <observations class="px-2 py-2" ref="observationsRef"></observations>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="paso === 0" flat @click="back()">{{
          $t("title.back")
          }}</v-btn>
        <v-spacer>
          <v-item-group v-model="paso" class="text-xs-center" mandatory>
            <v-item v-for="n in total" :key="`btn-${n}`">
              <v-btn slot-scope="{ active, toggle }" :color="active ? 'primary' : 'blue-grey lighten-4'"
                :input-value="active" icon @click="toggle, paginationChange(n)">
                <!-- Si se quieren saltas los pasos en ves de "paginationChange" colocar "paso - 1" -->
                <v-avatar class="subheading white--text" size="32" v-text="n"></v-avatar>
              </v-btn>
            </v-item>
          </v-item-group>
        </v-spacer>

        <v-btn color="primary" :loading="loading" depressed @click="buttonNext" :disabled="storePhysician.role != 'ophthalmologist' && paso == total - 1
          ">{{ paso < total - 1 ? $t("title.next") : $t("title.save") }}</v-btn>
      </v-card-actions>
    </v-card>
    <!-- </v-form> -->

    <!-- Save Alert -->
    <v-dialog v-model="alert" hide-overlay persistent width="300">
      <v-card :color="alertColor" dark>
        <v-card-text>
          {{ alertMsg }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Atention Alert -->
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ $t("title.attention") }}
        </v-card-title>

        <v-card-text>
          {{ $t("content.msg_without_preliminary") }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialogError('dialog')">
            {{ $t("title.agree") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Error -->
    <v-dialog v-model="dialogErr" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ $t("title.attention") }}
        </v-card-title>

        <v-card-text>
          {{ $t("title.an_error_has_occurred") }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialogError('dialogErr', true)">
            {{ $t("title.accepted") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal End Consultation -->
    <endConsultation ref="viewDialog"></endConsultation>
    <v-snackbar color="info darken-1 black--text mb-3" v-model="alert_photo_retinal" style="font-weight: bold"
      :timeout="0">
      Posee una fotografía de retina
      <v-btn color="black" flat @click="alert_photo_retinal = false">
        Cerrar
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
const antecedent = () => import("@/components/electronic_record/antecedent");
const general_data_oft = () =>
  import("@/components/electronic_record/general_data_oft");
const clinic_history = () =>
  import("@/components/electronic_record/clinic_history");
const preliminary_data = () =>
  import("@/components/electronic_record/preliminary_data");
const diagnosis_oft = () =>
  import("@/components/electronic_record/diagnosis_oft");
const observations = () =>
  import("@/components/electronic_record/observations");
const endConsultation = () =>
  import("@/components/electronic_record/end_consultation");
const previous_surgeries = () =>
  import("@/components/electronic_record/previous_surgeries");

import moment from "moment";
import { EventBus } from "@/store/eventBus";
import * as consultationServ from "@/componentServs/consultation";
import * as recordServ from "@/componentServs/records";
import * as personServ from "@/componentServs/person";
export default {
  name: "preliminary_form",
  data: () => ({
    paso: 0,
    total: 2, // Define la cantidad de pasos
    lastValidate: 0,
    loading: false,
    alert: false,
    alertMsg: "Guardando...",
    alertColor: "primary",
    insertAntecedent: true,
    dialog: false,
    dialogErr: false,
    consultation: {
      record: {},
    },
    physicianEval: null,
    alert_photo_retinal: false,
  }),
  methods: {
    dialogError(dialog, reload = false) {
      this[dialog] = false;
      EventBus.$emit("offValidateClose", true);
      if (reload) location.reload();
      else window.close();
    },
    paginationChange(paso) {
      window.setTimeout(function () {
        this.scrollTo(0, 0);
      }, 500);
      paso--;
      if (paso == this.paso + 1) {
        // Si el paso seleccionado es el siguiente en la lista
        this.buttonNext();
      } else if (paso < this.lastValidate) {
        // Si el paso seleccionado es menor al ultimo paso validado (Evaluar si aplica)
        this.paso = paso;
      } else if (paso < this.paso) {
        // Retrocede pasos
        this.paso = paso;
      }
    },
    buttonNext() {
      // console.log(this.paso)
      if (this.paso <= this.total) {
        window.setTimeout(function () {
          this.scrollTo(0, 0);
        }, 500);
        // Condicion colocado para no reiniciar el conteo de los pasos
        this.validateNextOrSave()
          .then((result) => {
            if (result == "ok") this.saveOphthalmology();
            else this.paso++;
          })
          .catch((err) => { });
      }
    },
    back() {
      this.paso--;
      window.setTimeout(function () {
        this.scrollTo(0, 0);
      }, 500);
    },
    validateNextOrSave() {
      return new Promise((resolve, reject) => {
        switch (
        parseInt(this.paso) // Evalua el formulario segun el caso
        ) {
          case 0:
            // resolve()
            // if (this.storeConsultation.objPreliminary) {
            //   // this.alert_photo_retinal =
            //   //   this.storeConsultation.objPreliminary.data.retinal_photo == "Si"
            //   //     ? true
            //   //     : false;
            // }

            this.$refs.antecedentRef
              .saveAntecedent()
              .then(async (result) => {
                try {
                  const previousSurgeries =
                    await this.$refs.previousSurgeriesRef.savePreviousSurgeries();
                  this.consultation.record.cirugias = previousSurgeries;

                  this.consultation.record.antecedent = result;
                  this.$refs.generalDataOftRef
                    .saveGeneralDataOft()
                    .then((result) => {
                      // console.log("resultado datos generales: ", result)
                      this.consultation.optometriaOft = result;
                      // Ver que se va a almacenar aqui

                      this.$refs.clinicHistoryRef
                        .saveClinicHistory()
                        .then((result) => {
                          // console.log("resultado historia clinica: ", result)
                          this.consultation.historyClinic = result;
                          this.$refs.preliminaryDataRef
                            .savePreliminaryData()
                            .then((result) => {
                              if (!this.consultation.objPreliminary) {
                                this.consultation.objPreliminary = {
                                  data: {},
                                };
                              }

                              this.consultation.objPreliminary.data.retinal_photo =
                                result.retinal_photo;
                              this.consultation.objPreliminary.data.retinal_findings =
                                result.retinal_findings;
                              this.consultation.objPreliminary.data.retinal_observations =
                                result.retinal_observations;
                              this.consultation.objPreliminary.data.retinal_notes =
                                result.retinal_notes;
                              this.consultation.datapreliminar = result;
                              if (this.paso > this.lastValidate)
                                this.lastValidate = 0;
                              resolve();
                            })
                            .catch((err) => {
                              console.log("error: ", err);
                              reject();
                            });
                          // if (this.paso > this.lastValidate)
                          //   this.lastValidate = 0;
                          // resolve();
                        })
                        .catch((err) => {
                          reject();
                        });
                    })
                    .catch((err) => {
                      this.$refs.clinicHistoryRef
                        .saveClinicHistory()
                        .then((result) => {
                          reject();
                        })
                        .catch((err) => {
                          reject();
                        });
                    });
                } catch (error) {
                  console.log("Error en previousSurgeries: ", error);
                  reject();
                }
              })
              .catch((err) => {
                this.$refs.generalDataOftRef
                  .saveGeneralDataOft()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
                this.$refs.clinicHistoryRef
                  .saveClinicHistory()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
              });
            break;
          case 1:
            // resolve()
            this.$refs.diagnosisOftRef
              .saveDiagnosisOft()
              .then((result) => {
                // console.log("resultado diagnosticos: ", result)
                this.consultation.diagnostic = result.diagnostic;
                //this.consultation.daysPostOperatory = result.daysPostOperatory;
                this.$refs.observationsRef
                  .saveObservations()
                  .then((result) => {
                    this.consultation.observaciones = result;
                    //habilitar para que funcione la nueva interfaz de medicamentos usar el commit 721cae5 para poner el modulo de observaciones correctamente
                    this.consultation.observaciones = {
                      observacion: result.observacion,
                    };
                    this.consultation.prescription_of = result.prescription;
                    this.consultation.next_appointment =
                      result.next_appointment;
                    if (this.paso > this.lastValidate) this.lastValidate = 1;
                    resolve("ok");
                  })
                  .catch((err) => {
                    // console.log("error: ", err)
                    reject();
                  });
              })
              .catch((err) => {
                console.log(err);
              });

            break;
        }
      });
    },
    validatePreliminary() {
      if (!this.storeConsultation._id) {
        try {
          this.getAntecedent();
        } catch (error) {
          this.dialogErr = true;
        }
      } else {
        setTimeout(() => {
          try {
            this.insertAntecedent = false;
            setTimeout(() => {
              this.setAntecedentData();
              setTimeout(() => {
                this.setConsultationData();
              }, 500);
            }, 500);
          } catch (error) {
            // console.log("Error en oftalmologia: ", error)
            this.dialogErr = true;
          }
        }, 2000);
      }
    },
    getAntecedent() {
      if (this.$store.getters.getPatient.record) {
        let objAux = {
          idRecord: this.$store.getters.getPatient.record,
          token: null,
        };
        recordServ
          .getAntecedent(objAux)
          .then((result) => {
            // console.log("antecedentes guardados: ", result)
            if (result) {
              this.$store.commit({
                type: "consultation",
                state: { record: result },
              });
              setTimeout(() => {
                this.setAntecedentData();
              }, 500);
            }
          })
          .catch((err) => {
            this.dialogErr = true;
          });
      }
    },
    setAntecedentData() {
      this.$refs.antecedentRef.setDataAntecedent();
    },
    setConsultationData() {
      this.$refs.generalDataOftRef.setPersonData();
      this.$refs.clinicHistoryRef.setDataConsultation();
      this.$refs.preliminaryDataRef.setDataConsultation();
      this.$refs.diagnosisOftRef.setDataConsultation();
      this.$refs.observationsRef.setDataConsultation();
      this.$refs.previousSurgeriesRef.setDataAntecedent();
      this.consultation.objPreliminary = this.storeConsultation.objPreliminary;
      this.consultation.objOptometrist = this.storeConsultation.objOptometrist;
      this.consultation.objOphthalmology =
        this.storeConsultation.objOphthalmology;
      this.consultation.record = this.storeConsultation.record;
    },
    updateOrSaveAntecedents() {
      return new Promise((resolve, reject) => {
        let objAux = {
          body: this.consultation.record,
          token: null,
        };

        if (!this.$store.getters.getPatient.record) {
          recordServ
            .saveAntecedent(objAux)
            .then((result) => {
              // console.log("resultado del insert: ", result)
              objAux.idPerson = this.$store.getters.getPatient._id;
              objAux.body = { record: result._id };
              objAux.body.control = {
                updated_at: moment().toISOString(),
              };
              personServ
                .updatePerson(objAux)
                .then((resultUpdPerson) => {
                  let patient = this.$store.getters.getPatient;
                  patient.record = result._id;

                  this.$store.commit({
                    type: "patient",
                    state: patient,
                  });
                  resolve();
                })
                .catch((err) => {
                  console.log("error: ", err);
                  reject();
                });
            })
            .catch((err) => {
              console.log("error: ", err);
              reject();
            });
        } else {
          objAux.idRecord = this.$store.getters.getPatient.record;

          // Como el registro de la consulta guarda _id debo eliminarlo para no tener conflictos con el mongodb
          if (objAux.body._id) {
            delete objAux.body._id;
            delete objAux.body.control;
          }

          recordServ
            .updateAntecedent(objAux)
            .then((result) => {
              resolve();
            })
            .catch((err) => {
              console.log("error: ", err);
              reject();
            });
        }
      });
    },
    createObjOphthalmology(objAux) {
      return new Promise((resolve, reject) => {
        // Nuevo objeto para guardar la informacion de preliminares
        let objOphthalmologyAux = {};

        // Atributos del esquema de consulta a excluir dentro del objOphthalmology
        let exclude = [
          "objPreliminary",
          //'objOphthalmology',
          "objOptometrist",
        ];
        // Funcion async para controlar la ejecucion del ciclo y mantener la integridad de la funcion
        async function createObjOphthalmologyAsync(body, vm) {
          for (let i in body) {
            if (!exclude.includes(i)) {
              objOphthalmologyAux[i] = body[i];
            }
          }
          body.objOphthalmology = {
            data: objOphthalmologyAux,
          };

          if (objOphthalmologyAux.objOphthalmology) {
            objOphthalmologyAux.objOphthalmology.control.active = true;
            objOphthalmologyAux.objOphthalmology.control.updated_at =
              moment().toISOString();
            objOphthalmologyAux.objOphthalmology.control.updated_by =
              vm.$store.getters.getPhysician._id;

            body.objOphthalmology.control =
              objOphthalmologyAux.objOphthalmology.control;
          }
        }
        createObjOphthalmologyAsync(objAux.body, this).then((result) => {
          setTimeout(() => {
            // console.log("termine de crear la parte de consulta: ", JSON.stringify(objAux.body.objPreliminary))
            resolve();
          }, 1000);
        });
      });
    },
    saveStoreConsultation(result) {
      return new Promise((resolve, reject) => {
        consultationServ
          .getConsultation({
            idConsultation: result._id,
            token: null,
          })
          .then((result) => {
            this.$store.commit({
              type: "consultation",
              state: result,
            });
            setTimeout(() => {
              EventBus.$emit("preliminary", true);
              EventBus.$emit("optometrist", true);
              EventBus.$emit("offValidateClose", true);
              setTimeout(
                () => (
                  (this.loading = false),
                  (this.alertMsg = "Guardado"),
                  (this.alertColor = "success")
                ),
                1000
              );
              setTimeout(() => {
                this.alert = false;
                this.$refs.viewDialog.changeDialog();
                this.alertMsg = "Guardando...";
                this.alertColor = "primary";
              }, 2000);

              resolve();
            }, 500);
          })
          .catch((err) => reject());
      });
    },
    saveOphthalmology() {
      this.loading = true;
      this.alert = true;
      this.consultation.person = this.$store.getters.getPatient._id;
      this.consultation.sucursalId = this.storeSucursal;
      let consultation = {}
      let consutltationCopy = { ...this.consultation }
      Object.entries(consutltationCopy).forEach(([key, value]) => {
        if (key == "objOphthalmology" || key == "objOptometrist") {

          if (value && "data" in value) {
            let dataObj = {}

            Object.entries(value.data).forEach(([key2, value2]) => {
              if (key2 == "objOphthalmology" || key2 == "objOptometrist") return
              dataObj[key2] = value2
            })

            consultation[key] = {
              data: dataObj,
              control: dataObj.control
            }

          }
        } else {
          consultation[key] = value
        }
      })

      let objAux = {
        body: consultation,
        token: null,
      };
      objAux.body.responsableConsultation =
        this.$store.getters.getPhysician._id;
      if (
        !this.storeConsultation.typeConsultation &&
        this.$store.getters.getTypeConsulting == "E"
      ) {
        objAux.body.typeConsultation = this.$store.getters.getTypeConsulting;
      }
      if (this.storeConsultation._id) {
        objAux.idConsultation = this.storeConsultation._id;
        objAux.body.control = this.storeConsultation.control;
        //objAux.body.control.active = false;
        objAux.body.control.updated_at = moment().toISOString();
        objAux.body.control.updated_by = this.$store.getters.getPhysician._id;

        this.createObjOphthalmology(objAux).then((result) => {
          consultationServ
            .updatedConsultation(objAux)
            .then((result) => {
              // console.log("Actualizo preliminares"
              this.updateOrSaveAntecedents()
                .then((resultAntecedents) => {

                  this.saveStoreConsultation(result)
                    .then((result) => { })
                    .catch((err) => { });
                })
                .catch((err) => {
                  console.log(
                    "No se pudo almacenar la informacion de los antecedentes"
                  );
                  this.alert = false;
                });
            })
            .catch((err) => {
              console.log("No se registro oftalmologia: ", err);
              this.alert = false;
            });
        });
      } else {
        this.createObjOphthalmology(objAux).then((result) => {
          consultationServ
            .saveConsultation(objAux)
            .then((result) => {
              this.updateOrSaveAntecedents()
                .then((resultAntecedents) => {


                  this.saveStoreConsultation(result[0])
                    .then((result) => { })
                    .catch((err) => { });
                })
                .catch((err) => {
                  console.log(
                    "No se pudo almacenar la informacion de los antecedentes"
                  );
                  this.alert = false;
                });
            })
            .catch((err) => {
              console.log("No se actualizo oftalmologia: ", err);
            });
        });
      }
    },
  },
  created() {
    if (
      this.storeConsultation.objOphthalmology &&
      this.storeConsultation.objOphthalmology.data
    ) {
      let objAux = new Object();
      objAux = {
        body: {
          _id: this.storeConsultation.objOphthalmology.data
            .responsableConsultation,
        },
      };

      personServ
        .getPerson(objAux)
        .then((result) => {
          this.physicianEval = result.forename + " " + result.surname;
        })
        .catch((error) => {
          this.closeSession(error);
        });
    }
    if (
      this.typeConsultation == "N" &&
      this.storePhysician.role.toLowerCase() == "ophthalmologist"
    ) {
      if (!this.storeConsultation.objPreliminary) {
        this.dialog = true;
      } else if (
        Object.keys(this.storeConsultation.objPreliminary).length < 2
      ) {
        this.dialog = true;
      } else this.validatePreliminary();
    } else this.validatePreliminary();
  },
  mounted() {
    EventBus.$on("ophthalmologist", (value) => {
      this.validatePreliminary();
    });
  },
  components: {
    antecedent,
    general_data_oft,
    clinic_history,
    preliminary_data,
    diagnosis_oft,
    observations,
    endConsultation,
    previous_surgeries,
  },
  computed: {
    currentTitle() {
      switch (this.paso) {
        case 0:
          return this.$t("title.antecedents");
        case 1:
          return this.$t("title.general_data");
        case 2:
          return this.$t("title.visual_acuity");
        case 3:
          return this.$t("title.autorefraction") + "A";
        default:
          return "Account created";
      }
    },
    pasoTitle() {
      return this.paso + 1;
    },
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
    storePhysician() {
      return this.$store.getters.getPhysician;
    },
    typeConsultation() {
      return this.$store.getters.getTypeConsulting;
    },
    storeSucursal() {
      return this.$store.getters.getSucursal;
    },
  },
};
</script>
