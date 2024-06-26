<template>
  <v-content>
    <v-tabs v-model="tab" color="#004969" grow>
      <v-tabs-slider color="red"></v-tabs-slider>

      <v-tab style="color: aliceblue" v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4 offset-xs4>
                <v-avatar
                  :tile="false"
                  class="vm-border-color"
                  size="90px"
                  color="white"
                >
                  <v-icon>gesture</v-icon>
                </v-avatar>
              </v-flex>
              <v-flex class="py-2" xs4 offset-xs4>
                <span class="headline primary--text">{{
                  $t("title.digital_signature")
                }}</span>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title>
                    {{ $t("title.doctors") }}
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="search"
                      :label="$t('title.search')"
                      single-line
                      hide-details
                      :maxlength="30"
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    style="width: 100%"
                    :headers="headers"
                    :items="users"
                    :search="search"
                  >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-center">{{ props.item.name }}</td>
                      <td class="text-xs-center">{{ props.item.specialty }}</td>
                      <td class="justify-center text-xs-center">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(props.item.id)"
                          >edit</v-icon
                        >
                      </td>
                    </template>
                    <v-alert
                      slot="no-results"
                      :value="true"
                      color="error"
                      icon="warning"
                      >{{ $t("title.your_search") }} "{{ search }}"
                      {{ $t("title.no_results") }}.</v-alert
                    >
                  </v-data-table>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-layout row wrap grid-list-lg>
              <v-flex xs4 pa-2>
                <v-select
                  :items="catalogueList"
                  label="Seleccione Catalago"
                  item-text="name"
                  item-value="id"
                  v-model="catalogue"
                  @change="selectCatalogue"
                ></v-select>
              </v-flex>
              <v-flex xs4 pa-2 v-if="catalogue == 1">
                <v-autocomplete
                  v-model="diagnosisSelected"
                  :items="diagnosis"
                  label="Diagnosticos Existentes"
                  persistent-hint
                  prepend-icon=""
                  return-object
                  @change="changeDiagnosis()"
                  item-text="diagnostic.es"
                >
                  <template v-slot:selection="data">
                    <span>{{ data.item.diagnostic.es }}</span>
                  </template>
                  <template v-slot:item="data">
                    <v-list-tile-content
                      :style="
                        data.item.disable
                          ? 'color: red; font-weight:bold'
                          : null
                      "
                      v-text="data.item.diagnostic.es"
                    ></v-list-tile-content>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs4 pa-2 v-if="catalogue != 1 && catalogue">
                <v-autocomplete
                v-model="diagnosisMasterSelected"
                  :items="masterList"
                  label="Diagnosticos Existentes"
                  persistent-hint
                  prepend-icon=""
                  return-object
                  @change="changeDiagnosis()"
                  item-text="diagnostic"
                >
                  <template v-slot:selection="data">
                    <span>{{ data.item.diagnostic }}</span>
                  </template>
                  <template v-slot:item="data">
                    <v-list-tile-content
                      :style="
                        data.item.disable
                          ? 'color: red; font-weight:bold'
                          : null
                      "
                      v-text="data.item.diagnostic"
                    ></v-list-tile-content>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs4 pa-2 v-if="catalogue && !diagnosisSelected && !diagnosisMasterSelected">
                <v-btn color="primary" @click="new_diagnosis" medium>
                  Añadir registro
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  v-model="dateFromFormat"
                  label="Desde"
                  prepend-icon="event"
                  readonly
                  @click="modalFrom = true"
                ></v-text-field>
                <v-dialog
                  ref="dialogFrom"
                  v-model="modalFrom"
                  :return-value.sync="dateFrom"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-date-picker locale="es-es" v-model="dateFrom" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modalFrom = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialogFrom.save(dateFrom)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="dateToFormat"
                  label="Hasta"
                  prepend-icon="event"
                  readonly
                  @click="modalTo = true"
                ></v-text-field>
                <v-dialog
                  ref="dialogTo"
                  v-model="modalTo"
                  :return-value.sync="dateTo"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-date-picker locale="es-es" v-model="dateTo" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modalTo = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialogTo.save(dateTo)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  large
                  color="primary"
                  @click="generateReport(1)"
                  ><v-icon>mdi-download</v-icon>Consultas Preliminares</v-btn
                >
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  large
                  color="primary"
                  @click="generateReport(2)"
                  ><v-icon>mdi-download</v-icon>Consultas Optometría</v-btn
                >
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  large
                  color="primary"
                  @click="generateReport(3)"
                  ><v-icon>mdi-download</v-icon>Consultas Oftalmologicas</v-btn
                >
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  large
                  color="primary"
                  @click="generateReport(4)"
                  ><v-icon>mdi-download</v-icon>Consultas Medico
                  Internista</v-btn
                >
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  large
                  color="primary"
                  @click="generateReport(5)"
                  ><v-icon>mdi-download</v-icon>Consultas Pediatricas</v-btn
                >
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  color="primary"
                  @click="generateReport(6)"
                  large
                  ><v-icon>mdi-download</v-icon>Consultas Nutricionista</v-btn
                >
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  color="primary"
                  @click="generateReport(7)"
                  large
                  ><v-icon>mdi-download</v-icon>Seguimiento Psicoterapéutico</v-btn
                >
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  color="primary"
                  @click="generateReport(8)"
                  large
                  ><v-icon>mdi-download</v-icon>Entrevista Psicologica Niños</v-btn
                >
              </v-flex>
              <v-flex xs4>
                <v-btn
                  style="width: 90%"
                  color="primary"
                  @click="generateReport(9)"
                  large
                  ><v-icon>mdi-download</v-icon>Entrevista Psicologica Adultos</v-btn
                >
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            $t("title.upload_digital_signature")
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <vue-dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  @vdropzone-removed-file="removeFile"
                ></vue-dropzone>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">{{
            $t("title.close")
          }}</v-btn>
          <v-btn color="blue darken-1" flat @click="saveDigital">{{
            $t("title.save")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="alert" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $t("title.saving") }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="loadingModal" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Generando Reporte...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showSaveOrUpdateDiagnoses" persistent width="500">
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Diagnostico"
                :autofocus="true"
                v-model="diagnosis_txt"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-btn color="primary" @click="saveDiagnosis" medium>
                Guardar
              </v-btn>
            </v-flex>
            <v-flex xs4 v-if="diagnosisSelected || diagnosisMasterSelected ">
              <v-btn
                :color="
                  (diagnosisSelected && diagnosisSelected.disable) || (diagnosisMasterSelected && diagnosisMasterSelected.disable)
                    ? 'success'
                    : 'warning'
                "
                @click="disabledDiagnoses"
                medium
                >{{
                  (diagnosisSelected && diagnosisSelected.disable) || (diagnosisMasterSelected && diagnosisMasterSelected.disable)
                    ? "Habilitar"
                    : "Deshabilitar"
                }}</v-btn
              >
            </v-flex>
            <v-flex xs4>
              <v-btn @click="cancelEditDiagnoses()" medium> Cancelar </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
const vue2Dropzone = () => import("vue2-dropzone");
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import * as personServ from "@/componentServs/person";
import {
  getDiagnoses,
  insertDiagnoses,
  getDiagnosesMaster,
  insertDiagnosesMaster,
} from "@/componentServs/diagnoses";
import * as fileServ from "@/componentServs/file";
import { getReport } from "@/componentServs/report";
import moment from "moment";
export default {
  name: "account",
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailHeight: 100,
        addRemoveLinks: true,
        dictDefaultMessage: this.$t("title.digital_signature"),
        dictRemoveFile: this.$t("title.delete_file"),
        dictUploadCanceled: this.$t("title.cancel_load"),
        acceptedFiles: "image/png",
        parallelUploads: 1,
        maxFiles: 1,
        acceptedFileTypes: ".png",
        init: function () {
          this.on("maxfilesexceeded", function (file) {
            alert(this.$t("content.only_one_file"));
            this.removeFile(file);
          });
        },
      },
      alert: false,
      dialog: false,
      search: "",
      spinerSignature: false,
      showSaveOrUpdateDiagnoses: false,
      headers: [
        {
          text: this.$t("title.fullname"),
          align: "center",
          value: "name",
        },
        {
          text: this.$t("title.specialty"),
          align: "center",
          value: "specialty",
        },
        { text: this.$t("title.action"), align: "center", value: "accion" },
      ],
      catalogueList: [
        { id: 1, name: "Diagnostico CIE-10" },
        { id: 2, name: "Diagnostico DSM-V" },
        { id: 3, name: "Diagnostico preoperatorio (MI,PED)" },
        { id: 4, name: "Impresion diagnostica(Psicologia)"}
      ],
      masterList:[],
      catalogue: null,
      users: [],
      userId: null,
      tab: 0,
      items: ["Firma Digital"],
      diagnosis: [],
      diagnosisSelected: null,
      diagnosisMasterSelected: null,
      diagnosis_txt: "",
      add_diagnosis: false,
      user_admin: false,
      date: null,
      dateFrom: null,
      dateFromFormat: null,
      dateTo: null,
      dateToFormat: null,
      modalTo: false,
      modalFrom: false,
      loadingModal: false,
    };
  },
  watch: {
    dateFrom(val) {
      this.dateFromFormat = moment(val, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    dateTo(val) {
      this.dateToFormat = moment(val, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
  },
  methods: {
    async selectCatalogue() {
      let caseEval = {
          2: "dsm-v",
          3: "preoperative",
          4: "impression-diagnostic"
        }

        let type = caseEval[this.catalogue]
      if(this.catalogue !=1)
      this.masterList = await getDiagnosesMaster(type)
    },
    async cancelEditDiagnoses() {
      this.showSaveOrUpdateDiagnoses = false;
      this.diagnosis_txt = "";
      this.diagnosisSelected = null;
      this.diagnosisMasterSelected = null;
      
    },
    async generateReport(report) {
      this.loadingModal = true;
      switch (report) {
        case 1:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "preliminary",
            "Reporte Preliminares"
          );
          break;
        case 2:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "optometry",
            "Reporte Optometria"
          );
          break;
        case 3:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "ophthalmology",
            "Reporte Oftalmología"
          );
          break;
        case 4:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "internist",
            "Reporte Internista"
          );
          break;
        case 5:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "pediatrist",
            "Reporte Pediatria"
          );
          break;
        case 6:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "nutritionist",
            "Reporte Nutricionista"
          );
          break;
        case 7:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "psychologist1",
            "Reporte Psicoterapéutico"
          );
          break;
        case 8:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "psychologist2",
            "Reporte Psicologica Niños"
          );
          break;
        case 9:
          await getReport(
            this.dateFromFormat,
            this.dateToFormat,
            "psychologist3",
            "Reporte Psicologica Adultos"
          );
          break;
      }
      this.loadingModal = false;
    },
    async disabledDiagnoses() {
      let objAux = null
      if(this.catalogue == 1){
         objAux = this.diagnosisSelected;
        objAux.disable = this.diagnosisSelected.disable
          ? !this.diagnosisSelected.disable
          : true;
        await insertDiagnoses(objAux);
      }
      else{
        objAux = this.diagnosisMasterSelected;
        objAux.disable = this.diagnosisMasterSelected.disable
          ? !this.diagnosisMasterSelected.disable
          : true;
        await insertDiagnosesMaster(objAux);
      }
      this.clearDiagnoses();
      this.getListDiagnoses();
      this.cancelEditDiagnoses();
    },
    new_diagnosis() {
      this.showSaveOrUpdateDiagnoses = true;
      this.diagnosis_txt = "";
    },
    async saveDiagnosis() {
      let objAux = {};

      if (this.catalogue == 1) {
        if (this.diagnosisSelected) {
          this.diagnosisSelected.diagnostic.es = this.diagnosis_txt;
          this.diagnosisSelected.diagnostic.en = this.diagnosis_txt;
          objAux = this.diagnosisSelected;
        } else {
          objAux = {
            diagnostic: {
              es: this.diagnosis_txt,
              en: this.diagnosis_txt,
            },
          };
        }
        await insertDiagnoses(objAux);
      }else{
        let caseEval = {
          2: "dsm-v",
          3: "preoperative",
          4: "impression-diagnostic"
        }

        let type = caseEval[this.catalogue]
        if (this.diagnosisMasterSelected) {
          this.diagnosisMasterSelected.diagnostic = this.diagnosis_txt;
          objAux = this.diagnosisMasterSelected;
        } else {
          objAux = {
            diagnostic: this.diagnosis_txt,
            type: type,
          };
        }
        await insertDiagnosesMaster(objAux);
        this.selectCatalogue()
      }
      this.clearDiagnoses();
      this.getListDiagnoses();
      this.cancelEditDiagnoses();
    },
    clearDiagnoses() {
      this.add_diagnosis = false;
      this.diagnosis_txt = "";
      this.diagnosisSelected = null;
      this.diagnosisMasterSelected = null;
    },
    changeDiagnosis() {
      this.showSaveOrUpdateDiagnoses = true;
      this.add_diagnosis = true;
      if (this.diagnosisSelected || this.diagnosisMasterSelected) {
        this.diagnosis_txt = this.catalogue == 1 ? this.diagnosisSelected.diagnostic.es : this.diagnosisMasterSelected.diagnostic;
      } else {
        this.diagnosis_txt = "";
      }
    },
    editItem(id) {
      this.$refs.myVueDropzone.removeAllFiles();
      this.userId = id;
      this.dialog = true;
      let userAux = {
        body: {
          _id: id,
        },
        token: sessionStorage.getItem("pussy"),
      };
      personServ
        .getPerson(userAux)
        .then((result) => {
          if (result.digital_signature) {
            fileServ
              .getImage(
                result.digital_signature,
                sessionStorage.getItem("pussy")
              )
              .then((result) => {
                let vm = this;
                let file = new File([result.data], "Imagen", {
                  type: "image/png",
                });
                let filedrop = {
                  size: result.data.size,
                  name: this.$t("title.digital_signature"),
                  type: "image/png",
                };
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                  vm.$refs.myVueDropzone.manuallyAddFile(file, reader.result);
                };
              });
          }
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
    saveDigital() {
      if (this.$refs.myVueDropzone.getAcceptedFiles()[0]) {
        let fd = new FormData();
        let blob = new Blob([this.$refs.myVueDropzone.getAcceptedFiles()[0]], {
          type: this.$refs.myVueDropzone.getAcceptedFiles()[0].type,
        });
        fd.append("file", blob);
        fileServ
          .sendFile(
            fd,
            this.$refs.myVueDropzone.getAcceptedFiles()[0].name,
            sessionStorage.getItem("pussy")
          )
          .then((result2) => {
            this.alert = true;
            let objAux = {
              token: sessionStorage.getItem("pussy"),
              idPerson: this.userId,
              body: {
                digital_signature: result2.id,
              },
            };

            personServ
              .updatePerson(objAux)
              .then((result) => {
                setTimeout(() => (this.alert = false), 2000);
                setTimeout(() => (this.dialog = false), 2099);
              })
              .catch((error) => {
                this.closeSession(error);
                console.log(error);
              });
          });
      }
    },
    removeFile(file) {
      let auxPhotos = [];
      for (let i in this.photos) {
        if (this.photos[i] != this.photos[file.name.split(" ")[1]]) {
          auxPhotos.push(this.photos[i]);
        }
      }
      this.photos = auxPhotos;
    },
    getUserList() {
      let userAux = {
        body: {
          role: [
            "Physician",
            "optometrist",
            "ophthalmologist",
            "nurse",
            "pediatrist",
            "nutritionist",
            "internist",
            "psychologist",
          ],
        },
        token: sessionStorage.getItem("pussy"),
      };
      personServ
        .getPersonList(userAux)
        .then((result) => {
          result.forEach((elem) => {
            this.users.push({
              id: elem._id,
              name: elem.forename + " " + elem.surname,
              specialty: elem.role.charAt(0).toUpperCase() + elem.role.slice(1),
              accion: null,
            });
          });
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
    display(val) {
      this.$router.push({
        name: val,
      });
    },
    getListDiagnoses() {
      getDiagnoses({}).then((result) => {
        this.diagnosis = result;
      });
    },
  },
  created() {
    this.user_admin =
      this.$store.getters.getPhysician.user.idUserFudem == "PRUEBAOFTA"
        ? true
        : false;
    if (this.user_admin) {
      this.items.push("Administrador de diagnosticos");
      this.items.push("Reportes de Consultas");
    }

    this.getUserList();
  },
  mounted() {
    this.getListDiagnoses();
  },
  computed: {
    contDrop: function () {
      this.$refs.myVueDropzone.getAcceptedFiles();
    },
  },
  props: {
    source: String,
  },
};
</script>
