<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formHistoryRef"
      v-model="formHistory"
      lazy-validation
    >
      <v-card-title primary-title class="blue-grey darken-1">
        <span class="subheading white--text text-capitalize"
          >Constancias Médicas</span
        >
      </v-card-title>
      <v-stepper v-model="e6" vertical non-linear>
        <v-stepper-step
          :step="9999"
          :edit-icon="'add'"
          complete
          v-if="storePhysician.user && storePhysician.user.role == 'Physician'"
          :editable="true"
          @click="validateStepper(9999)"
        >
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Crear Constancia Médica</h3>
            </div>
          </v-card-title>
        </v-stepper-step>
        <v-stepper-content
          :step="9999"
          v-if="storePhysician.user && storePhysician.user.role == 'Physician'"
        >
          <v-layout py-1>
            <v-flex xs12 class="px-2 py-2">
              <v-card class="elevation-3">
                <v-card-text>
                  <v-container fluid grid-list-md px-0 py-0>
                    <v-layout row wrap>
                      <v-flex xs2>
                        <v-text-field
                          :readonly="true"
                          :label="$t('title.number_of_expedient')"
                          v-model="idQflow"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          :readonly="true"
                          :label="$t('title.patient')"
                          v-model="nameconsult"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field
                          :readonly="true"
                          :label="$t('title.age')"
                          v-model="agepatient"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="dateFormatted"
                            label="Date"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date = parseDate(dateFormatted)"
                          ></v-text-field>
                          <v-date-picker locale="es-es"
                            v-model="date"
                            no-title
                            @input="menu1 = false"
                          >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">{{
                              $t("title.cancel")
                            }}</v-btn>
                            <v-btn
                              flat
                              color="primary"
                              @click="$refs.menu.save(dateFormatted)"
                              >Ok</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12>
                        <Vueditor ref="editor" :rules="[rules.required]">
                        </Vueditor>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-layout row wrap justify-end>
                    <v-flex xs6>
                      <v-btn
                        color="primary"
                        @click="preview"
                        :disabled="alert"
                        :loading="alert"
                        >{{ $t("title.pre_view") }}</v-btn
                      >
                      <v-btn
                        color="primary"
                        @click="saveConsult"
                        :disabled="alert"
                        :loading="alert"
                        >{{ $t("title.save") }}</v-btn
                      >
                      <v-btn flat @click="dischargeImaging">{{
                        $t("title.clear")
                      }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <div v-for="(history, z) in historyConstancy" :key="z">
          <v-stepper-step
            :step="z"
            complete
            :edit-icon="'assignment'"
            :editable="true"
            @click="show_report(history._id, z, history.pdf)"
          >
            {{ history.pdf ? "Constancia de Incapacidad" : history.name }}
            <small>{{ history.date }}</small>
          </v-stepper-step>
          <v-stepper-content :step="z" complete :editable="true">
            <v-layout row wrap v-if="!history.pdf">
              <v-flex
                xs12
                class="text-xs-right text-md-right text-sm-right text-lg-right"
              >
                <v-btn @click="generatePdf(z)" fab dark small color="primary">
                  <v-icon>picture_as_pdf</v-icon>
                </v-btn>
                <v-btn @click="Print(z)" fab dark small color="primary">
                  <v-icon>print</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <iframe
              color="grey lighten-1"
              class="mb-5"
              :src="pdf_document_constancy"
              type="application/pdf"
              width="90%"
              height="100%"
              frameborder="0"
              style="height: 75vh"
              v-if="history.pdf"
            ></iframe>
            <history_constancy_inf
              v-else
              class="px-2 py-2"
              :myProp="history.Constancy"
              ref="history_constancy_inf_ref"
              :id="'constan' + z"
            ></history_constancy_inf>
          </v-stepper-content>
        </div>
      </v-stepper>
    </v-form>
    <v-dialog v-model="alert" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Guardando
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- DIALOGO DE CONFIRMACION DE ELIMINAR CONSULTA PDF -->
    <v-dialog v-model="dialogPreview" width="85%" class="modalPreview">
      <history_constancy_inf_preview
        class="px-2 py-2"
        :propdataPreview="dataPreview"
        ref="history_constancy_inf_preview"
        v-if="dialogPreview"
      ></history_constancy_inf_preview>
    </v-dialog>
  </v-container>
</template>
<script>
const vue2Dropzone = () => import("vue2-dropzone");
const history_constancy_inf = () =>
  import("@/components/history_form/history_constancy_inf");
const history_constancy_inf_preview = () =>
  import("@/components/history_form/history_constancy_inf_preview");

import "vue2-dropzone/dist/vue2Dropzone.min.css";
import * as fileServ from "@/componentServs/file";
import * as consultationServ from "@/componentServs/consultation";
import * as constancyServ from "@/componentServs/constancy";
import moment from "moment";
import html2canvas from "html2canvas";
import { EventBus } from "@/store/eventBus";
import jsPDF from "jspdf";
import { getImage } from "../../componentServs/file";
export default {
  name: "history_cons",
  components: {
    vueDropzone: vue2Dropzone,
    history_constancy_inf,
    history_constancy_inf_preview,
  },
  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    menu: false,
    descriptionConstancy: null,
    e6: 1,
    dialogPreview: false,
    dropzoneOptions: {
      url: "https://httpbin.org/post",
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
    agepatient: null,
    alert: false,
    idQflow: null,
    historyConstancy: [],
    pdf_document: null,
    showReport: false,
    showPdf: false,
    showNew: false,
    infPatient: [],
    position: null,
    dataPreview: {},
    show: false,
    rules: {
      required: (v) => !!v || vm.$t("title.field_required"),
    },
    formHistory: false,
    saving: vm.$t("title.saving"),
    pdf_document_constancy: null,
  }),
  methods: {
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
        this.listConstancy();
      });
    },
    dateConsultig(dateConsult) {
      if (dateConsult.objPreliminary)
        return dateConsult.objPreliminary.control.created_at;
      else if (dateConsult.objOphthalmology)
        return dateConsult.objOphthalmology.control.created_at;
      else return dateConsult.objOptometrist.control.created_at;
    },
    langTypeConsulting(typeConsulting) {
      let response = this.Consultations.filter((item) => {
        return item.value == typeConsulting;
      });
      return response[0].text;
    },
    validateStepper(val) {
      if (val == this.e6) {
        this.e6 = 99999999999999999;
      }
    },
    listConstancy() {
      let objAux = {
        body: {
          person: this.$store.getters.getPatient._id,
        },
        active: false,
        token: sessionStorage.getItem("pussy"),
      };
      this.historyConstancy = [];
      constancyServ.getListConstancy(objAux).then((result) => {
        for (let i in result) {
          this.historyConstancy.push({
            name: result[i].person.forename + " " + result[i].person.surname,
            date: moment(result[i].date, "YYYY-MM-DD")
              .locale(this.$i18n.locale)
              .format("L"),
            file: null,
            id: result[i]._id,
            Constancy: result[i],
            pdf: result[i].pdf,
          });
        }
      });
    },
    Print(e) {
      let ua = navigator.userAgent;

      setTimeout(() => {
        html2canvas(document.getElementById("constan" + e), {
          allowTaint: true,
        }).then((canvas) => {
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
        }, 200);
      });
    },
    generatePdf(e) {
      /*let ua = navigator.userAgent
        setTimeout(() => {
            html2canvas(document.querySelector("#constan"+e), {
              allowTaint: true
            })
            .then(canvas => {
              let image = canvas.toDataURL("image/jpg",1.0);
              var doc = new jsPDF("p", "mm", "a4");

              let width = doc.internal.pageSize.getWidth();
              let height = doc.internal.pageSize.getHeight();
              doc.addImage(image, "jpg", 0, 0,width,0);
              doc.save(this.storePatient.idQflow+'-'+moment().format()+'.pdf');
            })
            .catch(error => {
              console.log("Error: ",error)
            });
        }, 500);*/

      var doc = new jsPDF("p", "mm", "a4");
      let constancia = document.querySelector("#constan" + e);

      function getImage(id) {
        return new Promise((resolve, reject) => {
          html2canvas(constancia.querySelector(id), {
            allowTaint: true,
          })
            .then((canvas) => {
              let image = canvas.toDataURL("image/jpg", 1.0);
              //doc.addImage(image, "jpg", 0, 0);
              resolve(image);
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        });
      }

      getImage(".infoLogo")
        .then((image) => {
          doc.addImage(image, "jpg", 140, 0);

          doc.fromHTML(constancia.querySelector(".infoPatient"), 15, 5, {
            width: 180,
          });

          doc.fromHTML(constancia.querySelector(".infConstancy"), 15, 30, {
            width: 180,
          });

          return getImage(".digitalSignature");
        })
        .then((image2) => {
          doc.addImage(image2, "jpg", 0, 230);
          doc.save(
            this.storePatient.idQflow + "-" + moment().format() + ".pdf"
          );
        });
    },
    dischargeImaging() {
      this.$refs.editor.setContent("");
    },
    preview() {
      if (this.$refs.editor.getContent() != "") {
        this.dialogPreview = true;
        this.dataPreview = {
          description: this.$refs.editor.getContent(),
          date: this.date,
          responsableconstancy: this.storePhysician,
          person: this.storePatient,
        };
      } else {
        alert("Debe indicar todos los Campos");
        return;
      }
    },
    saveConsult() {
      let cantidad = this.$refs.editor.getContent();

      if (this.$refs.editor.getContent() != "") {
        this.alert = true;
        this.single = null;
        let objAux = {
          body: {
            person: this.$store.getters.getPatient._id,
            description: this.$refs.editor.getContent(),
            control: {
              active: false,
            },
            date: this.date,
            responsableconstancy: this.$store.getters.getPhysician._id,
          },
          token: sessionStorage.getItem("pussy"),
        };
        constancyServ.saveConstancy(objAux).then((result) => {
          this.alert = false;
          this.listConstancy();
          this.$refs.editor.setContent("");
        });
      } else {
        alert("Debe indicar todos los Campos");
        return;
      }
    },
    show_document(document, pos) {
      this.pdf_document = document;
      this.showPdf = true;
      this.showReport = false;
      this.showNew = false;
      this.validateStepper(pos);
    },
    async show_report(document, pos, pdf) {
      this.validateStepper(pos)
      if (pdf) {
        const file = await getImage(pdf, null);
        const blob = new Blob([file.data], { type: "application/pdf;base64" });
        const link = window.URL.createObjectURL(blob);
        this.pdf_document_constancy = link;
      }
      this.showPdf = true;
      this.showReport = true;
      this.showNew = false;
      this.position = pos;
      // this.validateStepper(pos);
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
    this.nameconsult =
      this.storePatient.forename + " " + this.storePatient.surname;
    this.agepatient = moment().diff(
      this.storePatient.birthdate,
      "years",
      false
    );
    this.idQflow = this.storePatient.idQflow;
    this.listConstancy();
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  mounted() {
    EventBus.$on("listHistory", (value) => {
      this.listConstancy();
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
  filters: {
    date(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    age(value) {
      return moment().diff(value, "years", false);
    },
  },
};
</script>
