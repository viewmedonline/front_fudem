<template>
  <v-container>
    <!-- <v-form autocomplete="off"> -->
    <v-card class="mx-auto elevation-0 blue-grey lighten-5">
      <v-card-title class="title font-weight-regular justify-space-between">
        <div>
          <span>{{ currentTitle }}</span>
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
          <general_data class="px-2 py-2" ref="generalDataRef"></general_data>
          <antecedent class="px-2 py-2" ref="antecedentRef"></antecedent>
          <!-- <previous_surgeries class="px-2 py-2" ref="previousSurgeriesRef"></previous_surgeries> -->
        </v-window-item>
        <v-window-item :value="1">
          <other_data class="px-2 py-2" ref="otherDataRef"></other_data>
          <visual_acuity
            class="px-2 py-2"
            ref="visualAcuityRef"
          ></visual_acuity>
          <autorefraction_a
            class="px-2 py-2"
            ref="autoRefractionRef"
          ></autorefraction_a>
        </v-window-item>
        <v-window-item :value="2">
          <keratometry class="px-2 py-2" ref="keratometryRef"></keratometry>
          <lensometry class="px-2 py-2" ref="lensometryRef"></lensometry>
          <tonometry class="px-2 py-2" ref="tonometryRef"></tonometry>
          <retinalCamera
            class="px-2 py-2"
            ref="retinalCameraRef"
            title="Fotografía de Retina"
            :disabled_options="false"
          ></retinalCamera>
          <v-container>
            <v-form
              autocomplete="off"
              ref="formPreliminarRef"
              v-model="formPreliminar"
              lazy-validation
            >
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="responsable"
                    label="Realizado Por:"
                    :rules="validateRequired"
                    required
                    :readonly="validateRead()"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
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
          :loading="loading"
          depressed
          :disabled="this.storeConsultation.objPreliminary && paso == total - 1"
          @click="buttonNext"
          >{{ paso < total - 1 ? $t("title.next") : $t("title.save") }}</v-btn
        >
      </v-card-actions>
    </v-card>
    <!-- </v-form> -->
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
    <!-- Dialogo antes de guardar preliminares -->
    <v-dialog v-model="preliminaryAcept" max-width="500">
      <v-card>
        <v-card-text class="headline"> ¡Atencion! </v-card-text>
        <v-card-text>
          {{ $t("content.msg_notification_preliminary") }}
        </v-card-text>
        <v-card-text class="headline">{{
          $t("content.save_preliminary_msg")
        }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="preliminaryAcept = false"
          >
            {{ $t("title.cancel") }}
          </v-btn>

          <v-btn color="green darken-1" flat="flat" @click="savePreliminary">
            {{ $t("title.save") }}
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
          <v-btn color="primary" flat @click="dialogError('dialogErr')">
            {{ $t("title.accepted") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
const antecedent = () => import("@/components/electronic_record/antecedent");
const general_data = () =>
  import("@/components/electronic_record/general_data");
const previous_surgeries = () =>
  import("@/components/electronic_record/previous_surgeries");
const other_data = () => import("@/components/electronic_record/other_data");
const visual_acuity = () =>
  import("@/components/electronic_record/visual_acuity");
const autorefraction_a = () =>
  import("@/components/electronic_record/autorefraction_a");
const keratometry = () => import("@/components/electronic_record/keratometry");
const lensometry = () => import("@/components/electronic_record/lensometry");
const tonometry = () => import("@/components/electronic_record/tonometry");
const retinalCamera = () =>
  import("@/components/electronic_record/retinal_camera");

import moment from "moment";
import { EventBus } from "@/store/eventBus";
import * as consultationServ from "@/componentServs/consultation";
import * as recordServ from "@/componentServs/records";
import * as personServ from "@/componentServs/person";
export default {
  name: "preliminary_form",
  data() {
    return {
      formPreliminar: false,
      insertAntecedent: true,
      loading: false,
      responsable: null,
      paso: 0,
      total: 3, // Define la cantidad de pasos
      lastValidate: 0,
      nopaso: true,
      consultation: {
        record: {},
      },
      loading: false,
      alert: false,
      alertMsg: "Guardando...",
      alertColor: "primary",
      rules: {
        required: (v) => !!v || this.$t("title.field_required"),
      },
      preliminaryAcept: false,
      dialogErr: false,
    };
  },
  methods: {
    dialogError(dialog) {
      this[dialog] = false;
      EventBus.$emit("offValidateClose", true);
      location.reload();
    },
    back() {
      this.paso--;
      window.setTimeout(function () {
        this.scrollTo(0, 0);
      }, 500);
    },
    validateRead() {
      if (this.storeConsultation.objPreliminary) return true;
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
            if (result == "ok") this.prevSavePreliminary();
            else this.paso++;
            // console.log("consultation: ", this.consultation)
          })
          .catch((err) => {});
      }
    },
    validateNextOrSave() {
      return new Promise((resolve, reject) => {
        switch (
          parseInt(this.paso) // Evalua el formulario segun el caso
        ) {
          case 0:
            // resolve();

            this.$refs.generalDataRef
              .saveGeneralData()
              .then((result) => {
                this.consultation.reasonConsultation =
                  result.reasonConsultation;
                this.consultation.generalData = result.generalData;
                this.consultation.typeConsultation = result.typeConsultation;

                // console.log("result generalData: ", result)
                // Nivel 1
                this.$refs.antecedentRef
                  .saveAntecedent()
                  .then((result) => {
                    this.consultation.record.antecedent = result;
                    // console.log("result antecedent: ", result)
                    // Nivel 2
                    window.setTimeout(function () {
                      this.scrollTo(0, 0);
                    }, 500);
                    if (this.paso > this.lastValidate) {
                      this.lastValidate = 0;
                    }
                    resolve();
                  })
                  .catch((err) => {
                    reject();
                  });
              })
              .catch((err) => {
                this.$refs.antecedentRef
                  .saveAntecedent()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
                // this.$refs.previousSurgeriesRef
                //   .savePreviousSurgeries()
                //   .then((result) => {
                //     reject();
                //   })
                //   .catch((err) => {
                //     reject();
                //   });
              });
            break;
          case 1:
            this.$refs.otherDataRef
              .saveOtherData()
              .then((result) => {
                // console.log("result otherData: ", result)
                this.consultation.record.otrosDatos = result;
                // Nivel 1
                this.$refs.visualAcuityRef
                  .saveVisualAcuity()
                  .then((result) => {
                    // console.log("result visualAcuity: ", result)
                    this.consultation.agudezaVisual = result;
                    // Nivel 2
                    this.$refs.autoRefractionRef
                      .saveAutoRefractionA()
                      .then((result) => {
                        // console.log("result autoRefraction: ", result)
                        this.consultation.autorefraccionA = result;
                        // Nivel 3
                        if (this.paso > this.lastValidate)
                          this.lastValidate = 1;
                        resolve();
                      })
                      .catch((err) => {
                        reject();
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
                  });
              })
              .catch((err) => {
                this.$refs.visualAcuityRef
                  .saveVisualAcuity()
                  .then((result) => {
                    this.$refs.autoRefractionRef
                      .saveAutoRefractionA()
                      .then((result) => {
                        reject();
                      })
                      .catch((err) => {
                        reject();
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
                  });
              });
            break;
          case 2:
            // resolve()

            this.$refs.keratometryRef
              .saveKeratometry()
              .then((result) => {
                // console.log("result queratometria: ", result)
                this.consultation.queratometria = result;
                // Nivel 1
                this.$refs.lensometryRef
                  .saveLensometry()
                  .then((result) => {
                    // console.log("result lensometry: ", result)
                    this.consultation.lensometria = result;
                    // Nivel 2
                    this.$refs.tonometryRef
                      .saveTonometry()
                      .then(async (result) => {
                        //TODO Retinal Camera
                        const retinalCamera =
                          await this.$refs.retinalCameraRef.saveRetinalCamera();
                        this.consultation.retinal_photo =
                          retinalCamera.photo_retinal;
                        this.consultation.retinal_findings =
                          retinalCamera.findings_photo;
                        this.consultation.retinal_observations =
                          retinalCamera.observations_photo;
                        this.consultation.retinal_notes =
                          retinalCamera.retinal_notes;
                        // console.log("result tonometry: ", result)
                        this.consultation.tonometria = result;
                        if (this.paso > this.lastValidate)
                          this.lastValidate = 2;
                        resolve("ok");
                      })
                      .catch((err) => {
                        reject();
                      });
                  })
                  .catch((err) => {
                    this.$refs.tonometryRef
                      .saveTonometry()
                      .then((result) => {
                        reject();
                      })
                      .catch((err) => {
                        reject();
                      });
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
                this.$refs.tonometryRef
                  .saveTonometry()
                  .then((result) => {
                    reject();
                  })
                  .catch((err) => {
                    reject();
                  });
              });
            break;
        }
      });
    },
    createObjPreliminary(objAux) {
      return new Promise((resolve, reject) => {
        // Nuevo objeto para guardar la informacion de preliminares
        let objPreliminaryAux = {};

        // Atributos del esquema de consulta a excluir dentro del objPreliminary
        let exclude = [
          //'objPreliminary',
          "objOphthalmology",
          "objOptometrist",
        ];

        // Funcion async para controlar la ejecucion del ciclo y mantener la integridad de la funcion
        async function createObjPreliminaryAsync(body, vm) {
          for (let i in body) {
            if (!exclude.includes(i)) {
              objPreliminaryAux[i] = body[i];
            }
          }

          body.objPreliminary = {
            data: objPreliminaryAux,
          };

          if (objPreliminaryAux.objPreliminary) {
            objPreliminaryAux.objPreliminary.control.active = true;
            objPreliminaryAux.objPreliminary.control.updated_at =
              moment().toISOString();
            objPreliminaryAux.objPreliminary.control.updated_by =
              vm.$store.getters.getPhysician._id;
            body.objPreliminary.control =
              objPreliminaryAux.objPreliminary.control;
          }
        }

        createObjPreliminaryAsync(objAux.body, this).then((result) => {
          setTimeout(() => {
            //console.log("termine de crear la parte de consulta: ", JSON.stringify(objAux.body.objPreliminary))
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
            // Cargo la informacion guardada de la consulta en el store y en la variable local para preliminares
            this.$store.commit({
              type: "consultation",
              state: result,
            });

            this.consultation = result;

            setTimeout(() => {
              if (this.storePhysician.role.toLowerCase() != "admision") {
                EventBus.$emit("optometrist", true);
                EventBus.$emit("ophthalmologist", true);
              }
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
              }, 2000);
              this.alertMsg = "Guardando...";
              this.alertColor = "primary";
              resolve();
            }, 500);
          })
          .catch((err) => reject());
      });
    },
    prevSavePreliminary() {
      if (this.$refs.formPreliminarRef.validate()) {
        this.preliminaryAcept = true;
        return;
      }
    },
    savePreliminary() {
      // Servicio para guardado de preliminares
      if (this.$refs.formPreliminarRef.validate()) {
        this.preliminaryAcept = false;
        this.loading = true;
        this.alert = true;
        this.consultation.responsablePreliminar = this.responsable;
        this.consultation.person = this.$store.getters.getPatient._id;

        let objAux = {
          body: this.consultation,
          token: null,
        };

        if (this.storeConsultation._id) {
          objAux.idConsultation = this.storeConsultation._id;
          objAux.body.control = this.storeConsultation.control;
          objAux.body.control.active = true;
          objAux.body.control.updated_at = moment().toISOString();
          objAux.body.control.updated_by = this.$store.getters.getPhysician._id;

          this.createObjPreliminary(objAux)
            .then((result) => {
              consultationServ
                .updatedConsultation(objAux)
                .then((result) => {
                  // console.log("Actualizo preliminares");
                  // console.log("resultado: ", result)
                  this.updateOrSaveAntecedents()
                    .then((resultAntecedents) => {
                      this.saveStoreConsultation(result)
                        .then((result) => {
                          if (
                            this.$route.query.c != "E" ||
                            this.$route.query.c != "e"
                          ) {
                            setTimeout(() => {
                              window.close();
                            }, 500);
                          }
                        })
                        .catch((err) => {});
                    })
                    .catch((err) => {
                      alert(
                        "No se pudo almacenar la informacion de los antecedentes"
                      );
                    });
                })
                .catch((err) => {
                  alert("No se registro preliminar: ", err);
                });
            })
            .catch((err) => {
              console.log("err: ", err);
            });
          // console.log("objAux: ", objAux)
        } else {
          this.createObjPreliminary(objAux).then((result) => {
            consultationServ
              .saveConsultation(objAux)
              .then((result) => {
                // console.log("Registro preliminares");
                // console.log("resultado: ", result)
                this.updateOrSaveAntecedents()
                  .then((resultAntecedents) => {
                    this.saveStoreConsultation(result[0])
                      .then((result) => {
                        if (this.$route.query.c.toLowerCase() != "e") {
                          setTimeout(() => {
                            window.close();
                          }, 500);
                        }
                      })
                      .catch((err) => {});
                  })
                  .catch((err) => {
                    alert(
                      "No se pudo almacenar la informacion de los antecedentes " +
                        err
                    );
                  });
              })
              .catch((err) => {
                alert("No se actualizo preliminar: " + err);
              });
          });
        }
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
            if (result) {
              this.insertAntecedent = false;
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
    validatePreliminary() {
      if (!this.storeConsultation._id) this.getAntecedent();
      else {
        this.insertAntecedent = false;
        setTimeout(() => {
          this.setAntecedentData();
          this.setConsultationData();
        }, 500);
      }
    },
    setAntecedentData() {
      try {
        setTimeout(() => {
          this.$refs.antecedentRef.setDataAntecedent();
          // setTimeout(() => {
          //   this.$refs.previousSurgeriesRef.setDataAntecedent();
          setTimeout(() => {
            this.$refs.otherDataRef.setDataAntecedent();
          }, 300);
          // }, 300);
        }, 500);
      } catch (error) {
        // console.log("Error en preliminary: ", error)
        this.dialogErr = true;
      }
    },
    setConsultationData() {
      this.$refs.visualAcuityRef.setVisualAcuity();
      this.$refs.autoRefractionRef.setAutoRefractionA();
      this.$refs.keratometryRef.setKeratometry();
      this.$refs.lensometryRef.setLensometry();
      this.$refs.tonometryRef.setTonometry();
      this.responsable = this.storeConsultation.responsablePreliminar;
      this.consultation.objPreliminary = this.storeConsultation.objPreliminary;
      this.consultation.objOptometrist = this.storeConsultation.objOptometrist;
      this.consultation.objOphthalmology =
        this.storeConsultation.objOphthalmology;
      this.consultation.sucursalId = this.storeSucursal;
      if (this.storeConsultation.objPreliminary) {
        if (this.storeConsultation.objPreliminary.data) {
          this.consultation.record =
            this.storeConsultation.objPreliminary.data.record;
        } else if (this.storeConsultation.record) {
          this.consultation.record = this.storeConsultation.record;
        }
      } else if (this.storeConsultation.record) {
        this.consultation.record = this.storeConsultation.record;
      }
    },
  },
  mounted() {
    this.validatePreliminary();

    EventBus.$on("preliminary", (value) => {
      this.validatePreliminary();
    });
  },
  components: {
    general_data,
    antecedent,
    previous_surgeries,
    other_data,
    visual_acuity,
    autorefraction_a,
    keratometry,
    lensometry,
    tonometry,
    retinalCamera,
  },
  computed: {
    storePhysician() {
      return this.$store.getters.getPhysician;
    },
    currentTitle() {
      switch (this.paso) {
        case 0:
        case 1:
        case 2:
          return this.$t("title.preliminary_exams");
          break;
        default:
          return "Account created";
          break;
      }
    },
    pasoTitle() {
      return this.paso + 1;
    },
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
    validateRequired() {
      if (this.$store.getters.getTypeConsulting == "E") return [];
      else return [this.rules.required];
    },
    storeSucursal() {
      return this.$store.getters.getSucursal;
    },
  },
  beforeDestroy() {
    EventBus.$off("preliminary");
  },
};
</script>
<style></style>
