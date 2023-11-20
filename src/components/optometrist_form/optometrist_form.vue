<template>
  <v-container>
    <!-- <v-form autocomplete="off"> -->
    <v-card class="mx-auto elevation-0 blue-grey lighten-5">
      <v-card-title class="title font-weight-regular justify-space-between">
        <div
          v-if="
            storeConsultation.objOptometrist &&
            storeConsultation.objOptometrist.data
          "
        >
          {{ physicianEval }}
        </div>
        <div v-else>
          {{ $store.state.physician.forename }}
          {{ $store.state.physician.surname }}
        </div>
        <div>
          <span>{{ $t("title.step") }}&nbsp;</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="pasoTitle"
          ></v-avatar>
        </div>
      </v-card-title>

      <v-divider></v-divider>

      <v-window v-model="paso">
        <v-window-item :value="0">
          <antecedent class="px-2 py-2" ref="antecedentRef"></antecedent>
          <general_data_opt
            class="px-2 py-2"
            ref="generalDataOptRef"
          ></general_data_opt>
        </v-window-item>
        <v-window-item :value="1">
          <visual_acuity_opt
            class="px-2 py-2"
            ref="visualAcuityRef"
          ></visual_acuity_opt>
          <autorefraction_a
            class="px-2 py-2"
            ref="autoRefractionRef"
          ></autorefraction_a>
          <keratometry class="px-2 py-2" ref="keratometryRef"></keratometry>
          <lensometry class="px-2 py-2" ref="lensometryRef"></lensometry>
        </v-window-item>
        <v-window-item :value="2">
          <refraction class="px-2 py-2" ref="refractionRef"></refraction>
          <rx_final_glasses
            class="px-2 py-2"
            ref="rxFinalGlassesRef"
          ></rx_final_glasses>
        </v-window-item>
        <v-window-item :value="3">
          <rx_final_contact_lenses
            class="px-2 py-2"
            ref="rxFinalContactLensesRef"
          ></rx_final_contact_lenses>
          <rx_final_far_vision
            class="px-2 py-2"
            ref="rxFinalFarVisionRef"
          ></rx_final_far_vision>
          <rx_final_next_vision
            class="px-2 py-2"
            ref="rxFinalNextVisionRef"
          ></rx_final_next_vision>
          <rx_final_intermediate
            class="px-2 py-2"
            ref="rxFinalIntermediateVisionRef"
          ></rx_final_intermediate>
        </v-window-item>
        <v-window-item :value="4">
          <diagnosis class="px-2 py-2" ref="diagnosisRef"></diagnosis>
          <retinalCamera
            class="px-2 py-2"
            ref="retinalCameraRef"
            :disabled_options="true"
          ></retinalCamera>
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
              <v-btn
                slot-scope="{ active, toggle }"
                :color="active ? 'primary' : 'blue-grey lighten-4'"
                :input-value="active"
                icon
                @click="toggle, paginationChange(n)"
              >
                <!-- Si se quieren saltas los pasos en ves de "paginationChange" colocar "paso - 1" -->
                <v-avatar
                  class="subheading white--text"
                  size="32"
                  v-text="n"
                ></v-avatar>
              </v-btn>
            </v-item>
          </v-item-group>
        </v-spacer>
        <v-btn
          color="primary"
          depressed
          :loading="loading"
          @click="buttonNext"
          :disabled="storePhysician.role != 'optometrist' && paso == total - 1"
          >{{ paso < total - 1 ? $t("title.next") : $t("title.save") }}</v-btn
        >
      </v-card-actions>
    </v-card>
    <!-- </v-form> -->

    <!-- Save Alert -->
    <v-dialog v-model="alert" hide-overlay persistent width="300">
      <v-card :color="alertColor" dark>
        <v-card-text>
          {{ alertMsg }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
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
  </v-container>
</template>
<script>
const antecedent = () => import("@/components/electronic_record/antecedent");
const general_data_opt = () =>
  import("@/components/electronic_record/general_data_opt");
const visual_acuity_opt = () =>
  import("@/components/electronic_record/visual_acuity_opt");
const autorefraction_a = () =>
  import("@/components/electronic_record/autorefraction_a");
const keratometry = () => import("@/components/electronic_record/keratometry");
const lensometry = () => import("@/components/electronic_record/lensometry");
const rx_final_glasses = () =>
  import("@/components/electronic_record/rx_final_glasses");
const refraction = () => import("@/components/electronic_record/refraction");
const rx_final_contact_lenses = () =>
  import("@/components/electronic_record/rx_final_contact_lenses");
const rx_final_far_vision = () =>
  import("@/components/electronic_record/rx_final_far_vision");
const rx_final_next_vision = () =>
  import("@/components/electronic_record/rx_final_next_vision");
const rx_final_intermediate = () =>
  import("@/components/electronic_record/rx_final_intermediate");
const diagnosis = () => import("@/components/electronic_record/diagnosis");
const endConsultation = () =>
  import("@/components/electronic_record/end_consultation");
const retinalCamera = () =>
  import("@/components/electronic_record/retinal_camera");

import moment from "moment";
import { EventBus } from "@/store/eventBus";
import * as consultationServ from "@/componentServs/consultation";
import * as recordServ from "@/componentServs/records";
import * as personServ from "@/componentServs/person";

export default {
  name: "preliminary_form",
  data: () => ({
    paso: 0,
    total: 5, // Define la cantidad de pasos
    lastValidate: 0,
    consultation: {
      record: {},
    },
    loading: false,
    alert: false,
    alertMsg: "Guardando...",
    alertColor: "primary",
    insertAntecedent: true,
    dialog: false,
    dialogErr: false,
    physicianEval: null,
    retinal_photo: null,
  }),
  methods: {
    saveBrandLenses(consulting) {
      let objAux = {
        idPerson: consulting.person,
        body: {
          brandLenses: {
            ojoDer: consulting.rxFinalLentesContacto.ojoDer.brand,
            ojoIzq: consulting.rxFinalLentesContacto.ojoIzq.brand,
          },
        },
      };
      personServ
        .updatePerson(objAux)
        .then((resultUpdPerson) => {})
        .catch((err) => {
          console.log("error: ", err);
          reject();
        });
    },
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
    back() {
      this.paso--;
      window.setTimeout(function () {
        this.scrollTo(0, 0);
      }, 500);
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
            if (result == "ok") this.saveOptometrist();
            else this.paso++;
          })
          .catch((err) => {});
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
    validateNextOrSave() {
      return new Promise((resolve, reject) => {
        switch (
          parseInt(this.paso) // Evalua el formulario segun el caso
        ) {
          case 0:
            //resolve()
            this.$refs.antecedentRef
              .saveAntecedent()
              .then((result) => {
                this.consultation.record.antecedent = result;

                this.$refs.generalDataOptRef
                  .saveGeneralDataOpt()
                  .then((result) => {
                    if (this.consultation.reasonConsultation) {
                      this.consultation.reasonConsultation =
                        result.reasonConsultation;
                    }
                    if (this.consultation.generalData) {
                      this.consultation.generalData.typeLense =
                        result.typeLense;
                    }

                    if (this.paso > this.lastValidate) this.lastValidate = 0;
                    resolve();
                  })
                  .catch((err) => {
                    reject();
                  });
              })
              .catch((err) => {
                this.$refs.generalDataOptRef
                  .saveGeneralDataOpt()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
              });
            break;
          case 1:
            //resolve()
            this.$refs.visualAcuityRef
              .saveVisualAcuity()
              .then((result) => {
                this.consultation.agudezaVisualOPT = result;

                this.$refs.autoRefractionRef
                  .saveAutoRefractionA()
                  .then((result) => {
                    this.consultation.autorefraccionA = result;
                    this.$refs.keratometryRef
                      .saveKeratometry()
                      .then((result) => {
                        this.consultation.queratometria = result;
                        this.$refs.lensometryRef
                          .saveLensometry()
                          .then((result) => {
                            this.consultation.lensometria = result;
                            if (this.paso > this.lastValidate)
                              this.lastValidate = 1;

                            resolve();
                          })
                          .catch((err) => {
                            reject();
                          });
                      })
                      .catch((err) => {
                        reject();
                      });
                  })
                  .catch((err) => {
                    this.$refs.lensometryRef
                      .saveLensometry()
                      .then((result) => {
                        reject();
                      })
                      .catch((err) => {
                        reject();
                      });
                  });
              })
              .catch((err) => {
                this.$refs.autoRefractionRef
                  .saveAutoRefractionA()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });

                this.$refs.keratometryRef
                  .saveKeratometry()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
                this.$refs.lensometryRef
                  .saveLensometry()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
              });
            break;
          case 2:
            //resolve()
            this.$refs.refractionRef
              .saveRefraction()
              .then((result) => {
                this.consultation.refraccion = result;
                this.$refs.rxFinalGlassesRef
                  .saveRxFinalGlasses()
                  .then((result) => {
                    this.consultation.rxFinalGafas = result;

                    if (this.paso > this.lastValidate) this.lastValidate = 2;
                    resolve();
                  })
                  .catch((err) => {
                    // console.log("error: ", err)
                    reject();
                  });
              })
              .catch((err) => {
                this.$refs.rxFinalGlassesRef
                  .saveRxFinalGlasses()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
              });

            break;
          case 3:
            //resolve()
            
            this.$refs.rxFinalContactLensesRef
              .saveRxFinalContactLenses()
              .then((result) => {
                this.consultation.rxFinalLentesContacto = result;

                this.$refs.rxFinalFarVisionRef
                  .saveRxFinalFarVision()
                  .then((result) => {
                    this.consultation.rxFinalVisionLejano = result;

                    this.$refs.rxFinalNextVisionRef
                      .saveRxFinalNearVision()
                      .then((result) => {
                        this.consultation.rxFinalVisionProxima = result;

                        this.$refs.rxFinalIntermediateVisionRef
                          .saveRxFinalIntermediateVision()
                          .then((result) => {
                            this.consultation.rxFinalVisionIntermedia = result;

                            if (this.paso > this.lastValidate)
                              this.lastValidate = 3;
                            resolve();
                          })
                          .catch((err) => {
                            // console.log("error: ", err)
                            reject();
                          });
                      })
                      .catch((err) => {
                        this.$refs.rxFinalIntermediateVisionRef
                          .saveRxFinalIntermediateVision()
                          .then((result) => {
                            reject();
                          })
                          .catch((err) => {
                            reject();
                          });
                      });
                  })
                  .catch((err) => {
                    this.$refs.rxFinalNextVisionRef
                      .saveRxFinalNearVision()
                      .then((result) => {
                        reject();
                      })
                      .catch((err) => {
                        reject();
                      });

                    this.$refs.rxFinalIntermediateVisionRef
                      .saveRxFinalIntermediateVision()
                      .then((result) => {
                        reject();
                      })
                      .catch((err) => {
                        reject();
                      });
                  });
              })
              .catch((err) => {
                this.$refs.rxFinalFarVisionRef
                  .saveRxFinalFarVision()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });

                this.$refs.rxFinalNextVisionRef
                  .saveRxFinalNearVision()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });

                this.$refs.rxFinalIntermediateVisionRef
                  .saveRxFinalIntermediateVision()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
              });
            break;
          case 4:
            this.$refs.diagnosisRef
              .saveDiagnosis()
              .then(async (result) => {
                this.consultation.observationsOphthalmology =
                  result.observationsOphthalmology;
                this.consultation.diagnosticoObservaciones =
                  result.diagnosticoObservaciones;
                this.consultation.receta = result.receta;

                if (this.paso > this.lastValidate) this.lastValidate = 4;
                resolve("ok");
              })
              .catch((err) => {
                // console.log("error: ", err)
                reject();
              });
            break;
        }
      });
    },
    validateOptometrist() {
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
            // console.log("Error en Optometria: ", error)
            this.dialogErr = true;
          }
        }, 1000);
      }
    },
    createObjOptometrist(objAux) {
      return new Promise((resolve, reject) => {
        // Nuevo objeto para guardar la informacion de preliminares
        let objOptometristAux = {};

        // Atributos del esquema de consulta a excluir dentro del objOptometrist
        let exclude = [
          "objPreliminary",
          "objOphthalmology",
          //'objOptometrist'
        ];

        // Funcion async para controlar la ejecucion del ciclo y mantener la integridad de la funcion
        async function createObjOptometristAsync(body, vm) {
          for (let i in body) {
            if (!exclude.includes(i)) {
              objOptometristAux[i] = body[i];
            }
          }

          body.objOptometrist = {
            data: objOptometristAux,
          };

          if (objOptometristAux.objOptometrist) {
            objOptometristAux.objOptometrist.control.active = true;
            objOptometristAux.objOptometrist.control.updated_at =
              moment().toISOString();
            objOptometristAux.objOptometrist.control.updated_by =
              vm.$store.getters.getPhysician._id;

            body.objOptometrist.control =
              objOptometristAux.objOptometrist.control;
          }
        }

        createObjOptometristAsync(objAux.body, this).then((result) => {
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
              EventBus.$emit("ophthalmologist", true);
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
    saveOptometrist() {
      //if (this.$refs.formDiagnosisRef.validate()) {

      this.loading = true;
      this.alert = true;
      this.consultation.person = this.$store.getters.getPatient._id;
      this.consultation.sucursalId = this.storeSucursal;
      let objAux = {
        body: this.consultation,
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

        this.createObjOptometrist(objAux).then((result) => {
          consultationServ
            .updatedConsultation(objAux)
            .then((result) => {
              this.saveBrandLenses(this.consultation);
              // console.log("Actualizo preliminares"
              this.updateOrSaveAntecedents()
                .then((resultAntecedents) => {
                  this.saveStoreConsultation(result)
                    .then((result) => {})
                    .catch((err) => {});
                })
                .catch((err) => {
                  console.log(
                    "No se pudo almacenar la informacion de los antecedentes"
                  );
                  this.alert = false;
                });
            })
            .catch((err) => {
              console.log("No se registro optometria: ", err);
              this.alert = false;
            });
        });
      } else {
        this.createObjOptometrist(objAux).then((result) => {
          consultationServ
            .saveConsultation(objAux)
            .then((result) => {
              this.saveBrandLenses(this.consultation);
              this.updateOrSaveAntecedents()
                .then((resultAntecedents) => {
                  this.saveStoreConsultation(result[0])
                    .then((result) => {})
                    .catch((err) => {});
                })
                .catch((err) => {
                  console.log(
                    "No se pudo almacenar la informacion de los antecedentes"
                  );
                  this.alert = false;
                });
            })
            .catch((err) => {
              console.log("No se registro optometria: ", err);
              this.alert = false;
            });
        });
      }
      //}
    },
    setAntecedentData() {
      this.$refs.antecedentRef.setDataAntecedent();
    },
    updateOrSaveAntecedents() {
      return new Promise((resolve, reject) => {
        let objAux = {
          body: this.consultation.record,
          token: null,
        };

        if (this.insertAntecedent) {
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

    setConsultationData() {
      this.$refs.generalDataOptRef.setPersonData();
      this.$refs.visualAcuityRef.setVisualAcuity();
      this.$refs.autoRefractionRef.setAutoRefractionA();
      this.$refs.keratometryRef.setKeratometry();
      this.$refs.refractionRef.setRefraction();
      this.$refs.rxFinalGlassesRef.setRxFinalGlasses();
      this.$refs.lensometryRef.setLensometry();
      this.$refs.rxFinalContactLensesRef.setRxFinalLentesContacto();
      this.$refs.rxFinalFarVisionRef.setRxFinalFarVisionRef();
      this.$refs.rxFinalNextVisionRef.setrxFinalVisionProxima();
      this.$refs.rxFinalIntermediateVisionRef.setrxFinalVisionIntermedia();
      this.$refs.diagnosisRef.setDiagnostics();
      this.$refs.retinalCameraRef.setDataRetinalCamera();

      this.consultation.objPreliminary = this.storeConsultation.objPreliminary;
      this.consultation.objOptometrist = this.storeConsultation.objOptometrist;
      this.consultation.objOphthalmology =
        this.storeConsultation.objOphthalmology;
      this.consultation.record = this.storeConsultation.record;
      this.consultation.generalData = this.storeConsultation.generalData;
      this.consultation.reasonConsultation =
        this.storeConsultation.reasonConsultation;

      // console.log("entre: ", this.consultation)
    },
  },
  created() {
    if (
      this.storeConsultation.objOptometrist &&
      this.storeConsultation.objOptometrist.data
    ) {
      let objAux = new Object();
      objAux = {
        body: {
          _id: this.storeConsultation.objOptometrist.data
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
      this.storePhysician.role.toLowerCase() == "optometrist"
    ) {
      if (!this.storeConsultation.objPreliminary) {
        this.dialog = true;
      } else if (
        Object.keys(this.storeConsultation.objPreliminary).length < 2
      ) {
        this.dialog = true;
      } else this.validateOptometrist();
    } else this.validateOptometrist();
  },
  mounted() {
    EventBus.$on("optometrist", (value) => {
      this.validateOptometrist();
    });
  },
  components: {
    antecedent,
    general_data_opt,
    visual_acuity_opt,
    autorefraction_a,
    keratometry,
    lensometry,
    refraction,
    rx_final_glasses,
    rx_final_contact_lenses,
    rx_final_far_vision,
    rx_final_next_vision,
    rx_final_intermediate,
    diagnosis,
    endConsultation,
    retinalCamera,
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
        case 4:
          return this.$t("title.keratometry");
        case 5:
          return this.$t("title.lensometry");
        case 6:
          return this.$t("title.refraction");
        case 7:
          return this.$t("title.rx") + this.$t("title.final_glasses");
        case 8:
          return (
            this.$t("title.rx") +
            this.$t("title.final") +
            " " +
            this.$t("title.contact_lenses")
          );
        case 9:
          return (
            this.$t("title.rx") +
            this.$t("title.final") +
            " " +
            this.$t("title.far_vision")
          );
        case 10:
          return (
            this.$t("title.rx") +
            this.$t("title.final") +
            " " +
            this.$t("title.near_vision")
          );
        case 11:
          return (
            this.$t("title.rx") +
            this.$t("title.final") +
            " " +
            this.$t("title.intermediate_vision")
          );
        case 12:
          return this.$t("title.diagnosis_and_observations");
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
<style></style>
