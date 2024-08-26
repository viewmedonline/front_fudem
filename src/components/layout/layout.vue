<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :mini-variant="drawer"
      class="primary"
      dark
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile
          @click="fixedCompst('consultation')"
          v-if="$route.query.p && $route.query.c != 'R'"
        >
          <v-list-tile-action>
            <v-icon>folder_shared</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-if="$route.query.c == 'H'"
              >Historial</v-list-tile-title
            >
            <v-list-tile-title v-else>{{
              $t("title.consultation")
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          @click="fixedCompst('reports')"
          v-if="$route.query.c == 'R'"
        >
          <v-list-tile-action>
            <v-icon>format_list_bulleted</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>REPORTES</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="light" app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <img src="../../assets/img/Logo-Viewmed.svg" aspect-ratio="1" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="storePhysician.role == 'Institution' || user_admin">
        <v-menu offset-y>
          <v-btn slot="activator" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="fixedCompst('account')">
              <v-list-tile-title>{{ $t("title.myaccount") }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    <v-content class="vm-bg-qflow">
      <v-layout fill-height row>
        <v-flex
          xs12
          sm3
          v-if="
            dataStore.patient &&
            Object.keys(storePatient).length > 0 &&
            !dataStore.reports
          "
        >
          <vmPatient v-if="showVmData"></vmPatient>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.consultation">
          <vmTabs v-if="showVmData"></vmTabs>
        </v-flex>
        <v-flex xs12 v-if="dataStore.account">
          <vmAccount></vmAccount>
        </v-flex>
        <v-flex xs12 v-if="dataStore.reports">
          <vmReport></vmReport>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.imaging">
          <vmImaging></vmImaging>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.patient_form">
          <vmPatientform></vmPatientform>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.constancy">
          <vmConstancy></vmConstancy>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.nurse">
          <vmNursingSheet></vmNursingSheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.reference">
          <vmReferenceSheet></vmReferenceSheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.constancy_disability">
          <vmConstancyDisability></vmConstancyDisability>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.surgery_sheet">
          <vmSurgerySheet></vmSurgerySheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.internist_evaluation_sheet">
          <VmInternistEvaluationSheet></VmInternistEvaluationSheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.pediatrics_sheet">
          <vmPediatricsSheet></vmPediatricsSheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.nutritionist_sheet">
          <vmNutritionistSheet></vmNutritionistSheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.anesthesiology_sheet">
          <vmAnesthesiologytSheet></vmAnesthesiologytSheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.permanence_sheet">
          <vmPermanencetSheet></vmPermanencetSheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.psychologist_sheet">
          <vmPsychologistSheet></vmPsychologistSheet>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.clinical_interview_1">
          <vmClinicalInterview1></vmClinicalInterview1>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.clinical_interview_2">
          <vmClinicalInterview2></vmClinicalInterview2>
        </v-flex>
        <v-flex xs12 sm9 v-if="dataStore.prescription">
          <vmPrescription></vmPrescription>
        </v-flex>
      </v-layout>
    </v-content>

    <!-- Medico no registrado -->
    <v-dialog v-model="dialogPhy" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ $t("title.attention") }}
        </v-card-title>

        <v-card-text>
          {{ $t("content.doctor_not_found") }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialogError('dialogPhy')">
            {{ $t("title.agree") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Paciente no registrado -->
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ $t("title.attention") }}
        </v-card-title>

        <v-card-text>
          {{ $t("content.patiend_not_found") }}
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
    <!-- Token no valido para el usuario de qflow -->
    <v-dialog v-model="dialogToken" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ $t("title.attention") }}
        </v-card-title>

        <v-card-text>
          No posee autorizacion para visualizar la información
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialogError('dialogToken')">
            {{ $t("title.agree") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Sucursal no enviada -->
    <v-dialog v-model="dialogSucursal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ $t("title.attention") }}
        </v-card-title>

        <v-card-text> Disculpe no se especifico la sucursal </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialogError('dialogSucursal')">
            {{ $t("title.agree") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSucursalExist" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ $t("title.attention") }}
        </v-card-title>

        <v-card-text>
          Disculpe la sucursal especificada no se encuentra registrada.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialogError('dialogSucursalExist')"
          >
            {{ $t("title.agree") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
const vmPatient = () => import("@/components/patient/patient_bar");
const vmTabs = () => import("@/components/layout/tabsComponent");
const vmAccount = () => import("@/components/account/account");
const vmImaging = () => import("@/components/imaging_form/imaging_form");
const vmPatientform = () => import("@/components/patient/patient_form");
const vmConstancy = () => import("@/components/history_form/history_cons");
const vmReport = () => import("@/components/report/report");
const vmNursingSheet = () => import("@/components/nursing_sheet/nursing_sheet");
const vmReferenceSheet = () =>
  import("@/components/reference_sheet/reference_sheet");
const vmConstancyDisability = () =>
  import("@/components/constancy_disability/constancy_disability");
const vmSurgerySheet = () => import("@/components/surgery_sheet/surgery_sheet");
const VmInternistEvaluationSheet = () =>
  import("@/components/internist_evaluation_sheet/internist_evaluation_sheet");
const vmPediatricsSheet = () =>
  import("@/components/pediatrics_sheet/pediatrics_sheet");
const vmNutritionistSheet = () =>
  import("@/components/nutritionist_sheet/nutritionist_sheet");
const vmAnesthesiologytSheet = () =>
  import("@/components/anesthesiology_sheet/anesthesiology_sheet");
const vmPermanencetSheet = () =>
  import("@/components/permanence_sheet/permanence_sheet");
const vmPsychologistSheet = () =>
  import("@/components/psychologist_sheet/psychologist_sheet");
const vmClinicalInterview1 = () =>
  import("@/components/psychologist_sheet/clinical_interview_1");
const vmClinicalInterview2 = () =>
  import("@/components/psychologist_sheet/clinical_interview_2");
const vmPrescription = () => import("@/components/prescription/prescription");

import moment from "moment";
import { EventBus } from "@/store/eventBus";
import * as personServ from "@/componentServs/person";
import * as userServ from "@/componentServs/user";
import * as consultationServ from "@/componentServs/consultation";
import * as sucursalServ from "@/componentServs/sucursal";
import { getLastConsultation } from "../../componentServs/consultation";

export default {
  name: "layout",
  data: () => ({
    drawer: true,
    showVmData: false,
    dialog: false,
    dialogToken: false,
    dialogPhy: false,
    dialogSucursal: false,
    dialogSucursalExist: false,
    listSucursal: null,
    dialogSucursal: false,
    dialogSucursalExist: false,
    user_admin: false,
  }),
  beforeCreate() {
    if (this.$route.query.c)
      this.$route.query.c = this.$route.query.c.toUpperCase();
  },
  created() {
    this.$store.commit({
      type: "showTypeConsulting",
      state: this.$route.query.c,
    });
    if (this.$route.query.p) this.findPatient();
    else this.findPhysician();

    if (
      this.$route.query.s &&
      this.$route.query.c != "H" &&
      this.$route.query.c != "R"
    )
      this.findSucursal();
    else {
      if (
        this.$route.query.p &&
        this.$route.query.c != "H" &&
        this.$route.query.c != "R"
      ) {
        this.dialogSucursal = true;
        return;
      }
    }
    setTimeout(async () => {
      const result = await getLastConsultation({
        body: { person: this.$store.getters.getPatient._id },
      });
      this.$store.commit({
        type: "setLastConsultation",
        state: result,
      });
    }, 500);
  },
  methods: {
    async getSucursal() {
      await sucursalServ.listSucursalFudem().then(async (response) => {
        this.listSucursal = response;
        for (const item of this.listSucursal) {
          let objAux = {
            body: {
              UnitId: item.UnitId,
            },
            token: sessionStorage.getItem("pussy"),
          };

          await sucursalServ
            .getSucursal(objAux)
            .then(async (result) => {
              if (result.length > 0) {
                return await this.updateSucursal(item, result[0]._id);
              } else {
                return await this.CreateSucursal(item);
              }
            })
            .then(async (sucursal) => {
              console.log(sucursal);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        window.close();
      });
    },
    updateSucursal(sucursalData, sucursalId) {
      return new Promise((resolve, reject) => {
        let objAux = {
          body: {
            id: sucursalId,
            Name: sucursalData.Name,
            Description: sucursalData.Description,
            ParentUnitId: sucursalData.ParentUnitId,
            UnitType: sucursalData.UnitType,
          },
          token: sessionStorage.getItem("pussy"),
        };
        sucursalServ.updateSucursal(objAux).then((result) => {
          resolve(result);
        });
      });
    },
    CreateSucursal(sucursalData) {
      return new Promise((resolve, reject) => {
        let objAux = {
          body: {
            UnitId: sucursalData.UnitId,
            ParentUnitId: sucursalData.ParentUnitId,
            Name: sucursalData.Name,
            Description: sucursalData.Description,
            UnitType: sucursalData.UnitType,
          },
          token: sessionStorage.getItem("pussy"),
        };
        sucursalServ.createSucursal(objAux).then((result) => {
          resolve(result);
        });
      });
    },
    dialogError(dialog) {
      this[dialog] = false;
      EventBus.$emit("offValidateClose", true);
      window.close();
    },
    display(val) {
      this.$router.push({
        name: val,
      });
    },
    fixedCompst(val) {
      this.dataStore.patient = false;
      this.dataStore.consultation = false;
      this.dataStore.account = false;
      this.dataStore.nurse = false;
      this.dataStore.imaging = false;
      this.dataStore.patient_form = false;
      this.dataStore.reports = false;
      this.dataStore.pediatrics_sheet = false;
      this.dataStore.nutritionist_sheet = false;
      this.dataStore.anesthesiology_sheet = false;
      this.dataStore.permanence_sheet = false;
      this.dataStore.psychologist_sheet = false;
      this.dataStore.clinical_interview_1 = false;
      this.dataStore.clinical_interview_2 = false;
      this.dataStore.prescription = false;
      switch (val) {
        case "consultation":
          this.dataStore.patient = true;
          this.dataStore.consultation = true;
          break;
        case "account":
          this.dataStore.account = true;
          break;
        case "imaging":
          this.dataStore.patient = true;
          this.dataStore.imaging = true;
          break;
        case "patient_form":
          this.dataStore.patient = true;
          this.dataStore.patient_form = true;
          break;
        case "reports":
          this.dataStore.reports = true;
          this.dataStore.consultation = false;
          break;

        default:
          this.dataStore.consultation = true;
      }
      this.commitCompst();
    },
    findSucursal() {
      let objAux = {
        body: {
          UnitId: this.$route.query.s,
        },
        token: null,
      };
      sucursalServ
        .getSucursal(objAux)
        .then(async (result) => {
          if (result.length > 0) {
            this.$store.commit({
              type: "showSucursal",
              state: result[0]._id,
            });
          } else {
            if (this.$route.query.reload <= 2 || !this.$route.query.reload) {
              if (
                !this.$route.query.reload ||
                parseInt(this.$route.query.reload) < 2
              ) {
                await this.getSucursal();
                //add reload page params to url
                let reload = parseInt(
                  this.$route.query.reload ? this.$route.query.reload : 0
                );
                reload++;
                if (!this.$route.query.reload)
                  window.location = window.location.href + "&reload=" + reload;
                else
                  window.location = window.location.href.replace(
                    "reload=" + this.$route.query.reload,
                    "reload=" + reload
                  );
                window.location.reload();
              } else {
                this.dialogSucursalExist = true;
              }
            } else {
              this.dialogSucursalExist = true;
            }
            return;
          }
        })
        .catch(async (error) => {
          if (
            !this.$route.query.reload ||
            parseInt(this.$route.query.reload) < 2
          ) {
            await this.getSucursal();
            //add reload page params to url
            let reload = parseInt(
              this.$route.query.reload ? this.$route.query.reload : 0
            );
            reload++;
            if (!this.$route.query.reload)
              window.location = window.location.href + "&reload=" + reload;
            else
              window.location = window.location.href.replace(
                "reload=" + this.$route.query.reload,
                "reload=" + reload
              );
            window.location.reload();
          } else {
            this.dialogSucursalExist = true;
          }
          console.log("error: ", error);
          return;
        });
    },
    commitCompst() {
      this.$store.commit({
        type: "showCompst",
        state: this.dataStore,
      });
    },
    findPatient() {
      let objAux = {
        body: {
          idQflow: this.$route.query.p,
        },
        token: null,
      };
      personServ
        .getPerson(objAux)
        .then((result) => {
          if (result) {
            this.findPhysician(result);
          } else this.dialog = true;
        })
        .catch((err) => {
          this.dialog = true;
        });
    },
    findPhysician(patient) {
      let objAux = {
        body: {
          idUserFudem: this.$route.query.m,
        },
        token: null,
      };
      userServ
        .getUser(objAux)
        .then((result) => {
          if (result.token != this.$route.query.t) {
            this.dialogToken = true;
            return;
          } else {
            // Llenado del Store del Paciente
            if (this.$route.query.p) {
              this.$store.commit({
                type: "patient",
                state: patient,
              });
            }

            // Llenado de Data del Medico
            delete objAux.idUserFudem;
            objAux.body.user = result._id;

            personServ.getPerson(objAux).then((result2) => {
              if (
                result.role == "Admision" ||
                result.role == "Institution" ||
                result.role == "Intern"
              ) {
                this.$store.commit({
                  type: "physician",
                  state: result,
                });
              } else {
                this.$store.commit({
                  type: "physician", ///aplica para todos los profesionales
                  state: result2,
                });
              }
              this.user_admin =
                this.$store.getters.getPhysician.user.idUserFudem ==
                "PRUEBAOFTA"
                  ? true
                  : false;
              if (this.$route.query.p && this.$route.query.c != "R") {
                // Validacion de Consulta en Progreso
                this.getConsultationProgress()
                  .then((result) => {
                    this.showVmData = true;
                    this.fixedCompst("consultation");
                  })
                  .catch((err) => {
                    console.log("Error: ", err);
                  });
              } else {
                this.dataStore.reports = true;
                this.dataStore.consultation = false;
                this.$store.commit({
                  type: "showCompst",
                  state: this.dataStore,
                });
              }
            });
          }
        })
        .catch((err) => {
          this.dialogPhy = true;
        });
    },
    getConsultationProgress() {
      return new Promise((resolve, reject) => {
        let objAux = {
          body: {
            person: this.$store.getters.getPatient._id,
          },
          active: true,
          token: sessionStorage.getItem("pussy"),
        };

        consultationServ
          .getListConsultation(objAux)
          .then((result) => {
            // console.log("consultation: ", result)
            if (result.length > 0) {
              if (
                !moment(result[0].control.created_at).format("L") !=
                moment().format("L")
              ) {
                // console.log("Fechas bien cargo la consulta")
                this.$store.commit({
                  type: "consultation",
                  state: result[0],
                });
                // this.showVmData = true
                resolve();
              } else {
                // Debo eliminar la consulta porque es vieja
                // console.log("Debo eliminar la consulta porque es vieja")
                let obj = {
                  body: result[0],
                  idConsultation: result[0]._id,
                  token: null,
                };

                obj.body.control.active = false;
                obj.body.control.updated_at = moment().toISOString();

                consultationServ
                  .updatedConsultation(obj)
                  .then((result) => {
                    // console.log("Elimino preliminares viejos");
                    // this.showVmData = true
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              }
            } else {
              // this.showVmData = true
              resolve();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  computed: {
    dataStore: {
      get: function () {
        return this.$store.getters.getComps;
      },
    },
    storePhysician() {
      return this.$store.getters.getPhysician;
    },
    storePatient() {
      return this.$store.getters.getPatient;
    },
    storeSucursal() {
      return this.$store.getters.getSucursal;
    },
  },
  components: {
    vmPatient,
    vmTabs,
    vmAccount,
    vmImaging,
    vmPatientform,
    vmConstancy,
    vmReport,
    vmNursingSheet,
    vmReferenceSheet,
    vmConstancyDisability,
    vmSurgerySheet,
    VmInternistEvaluationSheet,
    vmPediatricsSheet,
    vmNutritionistSheet,
    vmAnesthesiologytSheet,
    vmPermanencetSheet,
    vmPsychologistSheet,
    vmClinicalInterview1,
    vmClinicalInterview2,
    vmPrescription,
  },
  props: {
    source: String,
  },
};
</script>
