<template>
  <v-container>
    <v-form autocomplete="off" ref="formHistoryRef" v-model="formHistory" lazy-validation>
      <v-stepper v-model="e6" vertical non-linear>
        <v-stepper-step :step="9999" :edit-icon="'add'" complete :editable="true" @click="validateStepper(9999)">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ $t("title.upload_file") }}</h3>
            </div>
          </v-card-title>
        </v-stepper-step>
        <v-stepper-content :step="9999">
          <v-layout py-1>
            <v-flex xs12 class="px-2 py-2">
              <v-card class="elevation-3">
                <v-card-text>
                  <v-container fluid grid-list-md px-0 py-0>
                    <v-layout row wrap>
                      <v-flex xs4 offset-xs2>
                        <v-text-field :label="$t('title.description')" v-model="nameconsult"
                          :rules="[rules.required]"></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy
                          transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                          <v-text-field slot="activator" v-model="dateFormatted" label="Date" persistent-hint
                            prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
                          <v-date-picker locale="es-es" v-model="date" no-title @input="menu1 = false">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">{{
                              $t("title.cancel")
                            }}</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(dateFormatted)">Ok</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs8 offset-xs2>
                        <!-- <vue-dropzone
                          id="dropzone"
                          ref="myVueDropzone"
                          :options="dropzoneOptions"
                        ></vue-dropzone> -->
                        <div class="input-file-wrapper">
                          <input type="file" name="uploadField" accept="application/pdf" class="input-file"
                            id="uploadField" :rules="[rules.required]" @change="
                              handleFileChange($event);
                            mostrarNombreArchivo($event);
                            " />
                          <div id="file-name" class="file-name">
                            {{ message }}
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-layout row wrap justify-end>
                    <v-flex xs8 offset-xs2>
                      <v-btn color="primary" @click="saveConsult" :disabled="alert" :loading="alert">{{ $t("title.save")
                        }}</v-btn>
                      <v-btn flat @click="dischargeImaging">{{
                        $t("title.cancel")
                      }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <div v-for="(history, z) in historyConsulting" :key="z">
          <v-stepper-step :step="z" complete :edit-icon="'assignment'" :editable="true" @click="
            history.file
              ? show_document(history.file, z)
              : show_report(history._id, z)
            ">
            {{ history.name}}
            <small>{{ history.date }}</small>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; margin-top: 10px; gap: 5px">
              <small v-if="history.consultation && history.consultation.objOphthalmology.data && Object.keys(history.consultation.objOphthalmology.data).length > 0" class="tags oftalmologo">Oftalmólogo</small>
              <small v-if="history.consultation && history.consultation.objOptometrist.data && Object.keys(history.consultation.objOptometrist.data).length > 0" class="tags optometrista">Optometrista</small>
              <!-- <small class="tags nutricionista">Nutricionista</small>
            <small class="tags internista">Internista</small>
            <small class="tags psicologo">Psicólogo</small>
            <small class="tags pediatra">Pediatra</small> -->
            </div>
          </v-stepper-step>
          <v-stepper-content :step="z" complete :editable="true">
            <v-layout row wrap v-if="storePhysician.role == 'Institution' && history.file">
              <v-flex xs12 class="text-xs-right">
                <v-btn @click="deleteDialog(history.id)" fab dark small color="primary">
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="!history.file">
              <v-flex xs12 class="text-xs-right">
                <v-btn @click="Print(z)" fab dark small color="primary">
                  <v-icon>print</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>

            <iframe color="grey lighten-1" class="mb-5" v-if="history.file" :src="pdf_document" type="application/pdf"
              width="90%" height="100%" frameborder="0" style="height: 75vh"></iframe>
            <history_consultation_inf v-else class="px-2 py-2" :myProp="history.consultation"
              ref="history_consultation_inf_ref" :id="z"></history_consultation_inf>
          </v-stepper-content>
        </div>
        <!-- <div v-for="(file, z) in filesConsulting" :key="file._id">
          <v-stepper-step :step="z+999999" complete :edit-icon="'attachment'" :editable=true  @click="show_document(file.file,z+999999)" >
            {{file.name}}
            <small>{{file.date}}</small>
          </v-stepper-step>
          <v-stepper-content complete :step="z+999999" v-if="file.file">
            <v-layout row wrap v-if="storePhysician.role == 'Institution'">
                <v-flex xs12 class="text-xs-right">
                    <v-btn @click="deleteDialog(file.id)" fab dark small color="primary">
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <iframe color="grey lighten-1" class="mb-5"
            :src="pdf_document" 
            type="application/pdf" 
            width="90%" 
            height="100%" 
            frameborder="0" 
            style="height: 75vh"
            ></iframe>
          </v-stepper-content>
        </div> -->
      </v-stepper>
    </v-form>
    <v-dialog v-model="alert" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Guardando
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- DIALOGO DE CONFIRMACION DE ELIMINAR CONSULTA PDF -->
    <v-dialog v-model="removeDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{
          $t("content.deletePdf")
        }}</v-card-title>

        <v-card-text>
          {{ $t("content.confirmDeletePdf") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="removeDialog = false">
            Cancelar
          </v-btn>

          <v-btn color="green darken-1" flat="flat" @click="deleteFile(idRemoveConsulting)">
            Acepto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const vue2Dropzone = () => import("vue2-dropzone");
const history_consultation_inf = () =>
  import("@/components/history_form/history_consultation_inf");

import "vue2-dropzone/dist/vue2Dropzone.min.css";
import * as fileServ from "@/componentServs/file";
import * as consultationServ from "@/componentServs/consultation";
import moment from "moment";
import html2canvas from "html2canvas";
import { EventBus } from "@/store/eventBus";
import { findPrescriptions } from "../../componentServs/medicines";
const fileWrapper = document.querySelector(".input-file-wrapper");
const fileInput = document.querySelector(".input-file");
const fileNameContainer = document.getElementById("file-name");
// fileInput.addEventListener("dragenter", () => {
//   fileWrapper.classList.add("active");
// });
// fileInput.addEventListener("dragleave", () => {
//   fileWrapper.classList.remove("active");
// });
// fileInput.addEventListener("drop", () => {
//   fileWrapper.classList.remove("active");
// });
export default {
  name: "history_form",
  components: {
    vueDropzone: vue2Dropzone,
    history_consultation_inf,
  },
  data: (vm) => ({
    uploadField: null,
    message: "Arrastra tu archivo PDF aquí o haz clic para seleccionar",
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    menu: false,
    e6: 99,
    removeDialog: false,
    dropzoneOptions: {
      autoProcessQueue: false,
      url: "/dummy",
      thumbnailWidth: 150,
      addRemoveLinks: true,
      acceptedFiles: ".pdf",
      uploadMultiple: false,
      maxFiles: 1,
      dictDefaultMessage:
        '<i class="material-icons">cloud_upload</i> ' +
        vm.$t("title.upload_file"),
    },
    idRemoveConsulting: null,
    fileConsulting: null,
    nameconsult: null,
    alert: false,
    historyConsulting: [],
    filesConsulting: [],
    pdf_document: null,
    showReport: false,
    showPdf: false,
    showNew: false,
    infPatient: [],
    position: null,
    Consultations: [
      {
        value: "Post Operative Patient",
        text: vm.$t("title.post_operative_patient"),
      },
      {
        value: "For the first time",
        text: vm.$t("title.for_the_first_time"),
      },
      {
        value: "Control",
        text: vm.$t("title.control"),
      },
      {
        value: "E",
        text: vm.$t("title.type_consulting.E"),
      },
      {
        value: "one day post surgery",
        text: "1er Dia Post-Quirúrgico",
      },
      {
        value: "one week post surgery",
        text: "1ra Semana Post-Quirurgico",
      },
      {
        value: "three week post surgery",
        text: "3ra Semana Post-Quirurgico",
      },
      {
        value: "four week post surgery",
        text: "4ta Semana Post-Quirurgico",
      },
    ],
    rules: {
      required: (v) => !!v || vm.$t("title.field_required"),
    },
    formHistory: false,
    saving: vm.$t("title.saving"),
    file: null,
    fileName: null,
  }),
  methods: {
    handleFileChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.file = files[0];
        this.fileName = this.file.name;
      }
    },
    mostrarNombreArchivo(event) {
      const files = event.target.files;
      if (files.length > 0) {
        const fileName = files[0].name;
        this.message = `Archivo seleccionado: ${fileName}`;
      } else {
        this.message = "";
      }
    },
    deleteDialog(idConsulting) {
      this.removeDialog = true;
      this.idRemoveConsulting = idConsulting;
    },
    deleteFile(idConsulting) {
      let objAux = {
        body: {
          consultationId: idConsulting,
        },
        token: sessionStorage.getItem("pussy"),
      };

      consultationServ.deleteConsultation(objAux).then((result) => {
        this.removeDialog = false;
        this.idRemoveConsulting = null;
        this.listConsulting();
      });
    },
    dateConsultig(dateConsult) {
      if (dateConsult.objPreliminary.data)
        return dateConsult.objPreliminary.control.created_at;
      else if (dateConsult.objOphthalmology.data)
        return dateConsult.objOphthalmology.control.created_at;
      else return dateConsult.objOptometrist.control.created_at;
    },
    langTypeConsulting(typeConsulting) {
      let response = this.Consultations.filter((item) => {
        return item.value == typeConsulting;
      });
      
      return response[0] ? response[0].text : typeConsulting;
    },
    validateStepper(val) {
      if (val == this.e6) {
        this.e6 = 99999999999999999;
      }
    },
    listConsulting() {
      let objAux = {
        body: {
          person: this.$store.getters.getPatient._id,
        },
        active: false,
        token: sessionStorage.getItem("pussy"),
      };

      consultationServ.getListConsultation(objAux).then((result) => {
        this.historyConsulting = [];
        this.filesConsulting = [];
        async function loadFiles(vm) {
          for (let i in result) {
            if (result[i].file && result[i].file != "") {
              // let newDate = result[i].dateUpload.split("-")
              await fileServ
                .getImage(result[i].file, sessionStorage.getItem("pussy"))
                .then((file) => {
                  let blob = new Blob([file.data], {
                    type: "application/pdf;base64",
                  });
                  let link = window.URL.createObjectURL(blob);
                  vm.historyConsulting.push({
                    name: result[i].name,
                    date: moment(result[i].dateUpload, "YYYY-MM-DD")
                      .locale(vm.$i18n.locale)
                      .format("L"),
                    dateOrder: result[i].dateUpload,
                    file: link,
                    id: result[i]._id,
                    consultation: null,
                  });
                });
            }
            if (!result[i].file) {
              let prescription_oft = null;
              let prescription_opt = null;
              if (result[i].prescription_of)
                prescription_oft = (
                  await findPrescriptions(result[i].prescription_of)
                )[0];
              if (result[i].prescription)
                prescription_opt = (
                  await findPrescriptions(result[i].prescription)
                )[0];

              result[i].prescription_oft_data = prescription_oft;
              result[i].prescription_opt_data = prescription_opt;

              vm.historyConsulting.push({
                name: result[i].typeConsultation
                  ? vm.langTypeConsulting(result[i].typeConsultation)
                  : "",
                date: moment(vm.dateConsultig(result[i]), "YYYY-MM-DD")
                  .locale(vm.$i18n.locale)
                  .format("L"),
                dateOrder: vm.dateConsultig(result[i]),
                file: null,
                id: result[i]._id,
                consultation: result[i],
              });
            }
          }
          vm.historyConsulting.sort(function (a, b) {
            let keyA = new Date(a.dateOrder),
              keyB = new Date(b.dateOrder);
            // Compare the 2 dates
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          });

          return;
        }

        loadFiles(this);
      });
    },
    Print(e) {
      let ua = navigator.userAgent;
      setTimeout(() => {
        html2canvas(document.getElementById(e), { allowTaint: true }).then(
          (canvas) => {
            var windowContent = "<!DOCTYPE html>";
            windowContent += "<html>";
            windowContent += "<head></head>";
            windowContent += "<body>";
            windowContent +=
              '<img src="' +
              canvas.toDataURL() +
              '" style="height: 100%; width: 100%">';
            windowContent += "</body>";
            windowContent += "</html>";
            var printWin = window.open("", "", "width=100%");
            printWin.document.open();
            printWin.document.write(windowContent);
            printWin.document.close();
            if (ua.match(/Trident.*rv\:11\./)) {
              // console.log("IE nav")
              printWin.focus();
              printWin.print();
              setTimeout(() => {
                printWin.close();
              }, 1000);
            } else {
              // console.log("Otro nav")
              printWin.document.addEventListener(
                "load",
                function () {
                  printWin.focus();
                  printWin.print();
                  printWin.close();
                },
                true
              );
            }
          },
          200
        );
      });
    },
    dischargeImaging() {
      this.nameconsult = null;
      this.$refs.myVueDropzone.removeAllFiles();
    },
    saveConsult() {
      if (this.$refs.formHistoryRef.validate()) {
        //   if (this.$refs.myVueDropzone.getAcceptedFiles()[0]) {
        if (this.file) {
          this.alert = true;
          let fd = new FormData();
          // let blob = new Blob([this.$refs.myVueDropzone.getAcceptedFiles()[0]], {
          //   type: this.$refs.myVueDropzone.getAcceptedFiles()[0].type,
          // });
          let blob = new Blob([this.file], {
            type: this.file.type,
          });
          fd.append("file", blob);

          fileServ
            .sendFile(fd, this.fileName, null)
            .then((result) => {
              this.single = null;
              let objAux = {
                body: {
                  person: this.$store.getters.getPatient._id,
                  name: this.nameconsult,
                  control: {
                    active: false,
                  },
                  dateUpload: this.date,
                  file: result.id,
                  responsableConsultation: this.$store.getters.getPhysician._id,
                },
                token: sessionStorage.getItem("pussy"),
              };

              consultationServ.saveConsultation(objAux).then((result) => {
                this.$refs.formHistoryRef.reset();
                setTimeout(
                  () => (
                    (this.alert = false),
                    (this.historyConsulting = []),
                    this.listConsulting()
                  ),
                  2000
                );
                (this.date = new Date().toISOString().substr(0, 10)),
                  (this.nameconsult = null);
                // this.$refs.myVueDropzone.removeAllFiles();
                this.formHistory = false;
                this.file = null;
                this.fileName = null;
                this.message =
                  "Arrastra tu archivo PDF aquí o haz clic para seleccionar";
              });
            })
            .catch((err) => {
              console.log("error: ", err);
              this.alert = false;
            });
        }
      }
    },
    show_document(document, pos) {
      if (this.position == pos) this.e6 = pos;
      this.position = pos;
      this.pdf_document = document;
      this.showPdf = true;
      this.showReport = false;
      this.showNew = false;
      // this.e6 = pos
      this.validateStepper(pos);
    },
    show_report(document, pos) {
      
      if (this.position == pos) this.e6 = pos;
      this.position = pos;
      this.showPdf = false;
      this.showReport = true;
      this.showNew = false;
      // this.e6 = pos
      this.validateStepper(pos);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");

      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  created() {
    this.listConsulting();
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  mounted() {
    EventBus.$on("listHistory", (value) => {
      this.listConsulting();
    });
  },
  computed: {
    storePatient() {
      return this.$store.getters.getPatient;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    storePhysician() {
      return this.$store.getters.getPhysician;
    },
  },
};
</script>
<style>
.tags {
  font-size: 10px;
  color: #ffffff !important;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold !important;
}

.tags.oftalmologo {
  background-color: #1E3A8A;
  /* Azul profundo */
}

.tags.optometrista {
  background-color: #607D8B;
  /* Verde esmeralda */
}

.tags.nutricionista {
  background-color: #F97316;
  /* Naranja vibrante */
}

.tags.internista {
  background-color: #4B5563;
  /* Gris acero */
}

.tags.psicologo {
  background-color: #8B5CF6;
  /* Violeta suave */
}

.tags.pediatra {
  background-color: #FACC15;
  /* Amarillo soleado */
}
</style>
