<template>
  <v-container v-if="!show_description">
    <div style="background-color: #004969; height: 50px"></div>
    <v-form
      autocomplete="off"
      ref="formPsychologistSheet"
      v-model="formPsychologistSheet"
      lazy-validation
    >
      <v-stepper v-model="e6" vertical non-linear>
        <v-stepper-step
          :step="9999"
          :edit-icon="'add'"
          complete
          :editable="signatureExist"
          @click="validateStepper(9999)"
        >
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                Crear formulario del desarrollo y seguimiento del proceso
                psicoterapeutico
              </h3>
              <h5 v-if="!signatureExist" style="color: red">
                Debe tener un firma cargada para poder continuar con el proceso
              </h5>
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
                      <v-flex xs12 class="title-div">
                        1. Información del proceso terapeutico
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="psychologistForm1.sessionNumber"
                          label="Numero de sesiones"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6 ml-3>
                        <v-radio-group
                          label="Estado del proceso"
                          v-model="psychologistForm1.stateProcess"
                          row
                        >
                          <v-radio label="Activo" value="Activo"></v-radio>
                          <v-radio label="Cierre" value="Cierre"></v-radio>
                          <v-radio
                            label="Deserción"
                            value="Deserción"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                      <v-flex xs6>
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
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="dateFormatted"
                              label="Fecha Inicio"
                              persistent-hint
                              prepend-icon="event"
                              @blur="date = parseDate(dateFormatted)"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            :close-on-content-click="false"
                            v-model="date"
                            no-title
                            @input="menu1 = false"
                            locale="es"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs6>
                        <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="dateFormatted2"
                              label="Fecha Fin"
                              persistent-hint
                              prepend-icon="event"
                              @blur="date2 = parseDate(dateFormatted2)"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            :close-on-content-click="false"
                            v-model="date2"
                            no-title
                            @input="menu2 = false"
                            locale="es"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 class="title-div">
                        2. Descripción del problema
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          v-model="psychologistForm1.problemSummary"
                          label="Resumen de la problematica y sintomas"
                        ></v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
                          v-model="psychologistForm1.diagnosticImpression"
                          :items="diagnosticImpressionList"
                          label="Impresión diagnostica"
                          autocomplete
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 class="title-div">
                        3. Posible diagnostico segun codigo DSM-V
                      </v-flex>
                      <v-flex xs12>
                        <v-autocomplete
                          v-model="psychologistForm1.diagnostic"
                          :items="diagnosisList"
                          label="Diagnostico"
                          persistent-hint
                          prepend-icon=""
                          @change="addDiagnosis"
                        >
                        </v-autocomplete>
                      </v-flex>
                      <v-flex xs12>
                        <v-data-table
                          :headers="headers"
                          :items="diagnosesSelectList"
                          class="elevation-1"
                        >
                          <template v-slot:items="props">
                            <td>{{ props.item }}</td>
                            <td class="justify-center">
                              <v-icon medium @click="deleteItem(props.item)">
                                delete
                              </v-icon>
                            </td>
                          </template>
                        </v-data-table>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-layout row wrap justify-end>
                    <v-flex xs8 offset-xs2>
                      <v-btn
                        color="primary"
                        @click="submit"
                        :loading="psychologist_sheet"
                        >{{ $t("title.save") }}</v-btn
                      >
                      <v-btn flat @click="clear">{{
                        $t("title.cancel")
                      }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <div
          v-for="(item, z) in rowsOpened"
          :key="item._id"
          v-if="signatureExist"
        >
          <v-stepper-step
            :step="z"
            complete
            :edit-icon="item.pdf ? 'picture_as_pdf' : 'assignment'"
            :editable="true"
            @click="openDescription(item, z)"
          >
            <div>
              Formulario de desarrollo y seguimiento del proceso
              psicoterapeutico
            </div>

            <v-layout row wrap>
              <v-flex xs3>
                <small>{{ format_date(item.createdAt) }}</small>
              </v-flex>
            </v-layout>
          </v-stepper-step>
          <v-stepper-content :step="z" complete :editable="true">
            <iframe
              color="grey lighten-1"
              class="mb-5"
              :src="pdf_document"
              type="application/pdf"
              width="90%"
              height="100%"
              frameborder="0"
              style="height: 75vh"
            ></iframe>
          </v-stepper-content>
        </div>
      </v-stepper>
    </v-form>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-card-title style="background-color: #004969; height: 70px">
        <v-btn
          flat
          icon
          @click="show_description = false || validateStepper(9999)"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <span class="subheading white--text text-capitalize"
          >4. Historial de sesiones</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md px-0 py-0>
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn
                color="primary"
                style="width: 100%"
                large
                @click="showFormDescription = true"
                >Añadir descripción</v-btn
              >
            </v-flex>
            <v-flex xs10 offset-xs1 v-if="showFormDescription">
              <v-textarea
                label="Descripción de la sesión"
                v-model="descriptionValue"
                outline
              ></v-textarea>
            </v-flex>
            <v-flex xs6 offset-xs6 v-if="showFormDescription">
              <v-btn color="primary" large @click="addDescription"
                >Guardar</v-btn
              >
              <v-btn color="primary" large @click="showFormDescription = false"
                >Cancelar</v-btn
              >
            </v-flex>
            <v-flex xs12 pa-4>
              <v-data-table
                :headers="[
                  {
                    text: '# de sesión',
                    align: 'start',
                    sortable: false,
                    value: 'key',
                  },
                  { text: 'Fecha', value: 'date', sortable: false },
                  {
                    text: 'Descripción',
                    value: 'description',
                    sortable: false,
                  },
                ]"
                :items="selectionRow.descriptions"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.index + 1 }}</td>
                  <td>{{ props.item.date }}</td>
                  <td style="word-wrap: break-word; text-align: justify">
                    {{ props.item.description }}
                  </td>
                  <!-- <td class="justify-center">
                    <v-icon medium @click="deleteItem(props.item)">
                      delete
                    </v-icon>
                  </td> -->
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12>
              <v-btn
                :disabled="
                  Object.keys(selectionRow) == 0 ||
                  selectionRow.descriptions.length == 0
                "
                color="primary"
                style="width: 100%"
                large
                :loading="loadingDescription"
                @click="closed"
                >Cerrar formulario de desarrollo</v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import moment from "moment";
import {
  savePsiProcess,
  getPsyProcess,
  updatePsiProcess,
  closedPsiProcess,
} from "../../componentServs/psyProcess";
import { getImage } from "../../componentServs/file";
import { getDiagnosesMaster } from "@/componentServs/diagnoses";

moment.locale("es");

export default {
  name: "psychologist_sheet",
  components: {},
  data: (vm) => ({
    rowsOpened: [],
    selectionRow: {},
    signatureExist: false,
    formPsychologistSheet: false,
    e6: 9999999999999,
    psychologist_sheet: false,
    date: null,
    dateFormatted: null,
    menu1: false,
    date2: null,
    dateFormatted2: null,
    menu2: false,
    show_description: false,
    showFormDescription: false,
    loadingDescription: false,
    pdf_document: null,
    descriptionValue: "",
    psychologistForm1: {
      sessionNumber: null,
      stateProcess: null,
      dateStart: null,
      dateEnd: null,
      problemSummary: null,
      diagnosticImpression: null,
      diagnostic: null,
    },
    diagnosesSelectList: [],
    diagnosticImpressionList: [
      "Depresión",
      "Ansiedad",
      "Trastorno de la conducta",
      "Trastorno de la personalidad",
      "Trastorno de la alimentación",
      "Trastorno del sueño  ",
    ],
    diagnosisList: [],
    headers: [
      {
        text: "Diagnosticos",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Acciones", value: "actions", sortable: false },
    ],
  }),
  watch: {},
  async created() {
    if (!this.$store.getters.getPhysician.digital_signature) {
      this.signatureExist = false;
    } else {
      this.signatureExist = true;
    }
    this.findRowOpen();
  },
  async mounted() {
    this.diagnosisList = (await getDiagnosesMaster("dsm-v")).map(
      (item) => item.diagnostic
    );
  },
  methods: {
    async closed() {
      this.loadingDescription = true;
      const file = await closedPsiProcess({
        name: "psyProcess.html",
        data: {
          name: `${this.$store.getters.getPatient.forename} ${this.$store.getters.getPatient.surname}`,
          age: moment().diff(this.$store.getters.getPatient.birthdate, "years"),
          date: moment(this.selectionRow.createdAt).utc().format("DD/MM/YYYY"),
          dui: this.$store.getters.getPatient.id_document,
          exp: this.$store.getters.getPatient.idQflow,
          descriptions: this.selectionRow.descriptions,
          sesionNumber: this.selectionRow.sessionNumber,
          stateProcess: this.selectionRow.stateProcess,
          dateStart: moment(this.selectionRow.dateStart)
            .utc()
            .format("DD/MM/YYYY"),
          dateEnd: moment(this.selectionRow.dateEnd).utc().format("DD/MM/YYYY"),
          name_prof: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
          problemSummary: this.selectionRow.problemSummary,
          diagnosticImpression: this.selectionRow.diagnosticImpression,
          diagnostic: this.selectionRow.diagnostic,
          type: "Psicologo",
          digital_signature: this.$store.getters.getPhysician.digital_signature,
        },
      });

      await updatePsiProcess({
        _id: this.selectionRow._id,
        data: { pdf: file },
      });
      this.loadingDescription = false;
      this.showFormDescription = false;
      this.show_description = false;
      this.findRowOpen();

      this.selectionRow = {};
    },
    async addDescription() {
      if (this.descriptionValue == "") return;
      this.selectionRow.descriptions.push({
        date: moment().format("DD/MM/YYYY"),
        description: this.descriptionValue,
      });
      await updatePsiProcess({
        _id: this.selectionRow._id,
        data: { descriptions: this.selectionRow.descriptions },
      });
      this.descriptionValue = "";
      this.showFormDescription = false;
      this.clear();
      this.findRowOpen();
    },
    async openDescription(item, pos) {
      if (!item.pdf) {
        this.selectionRow = item;
        this.show_description = true;
      } else {
        this.validateStepper(pos);
        const file = await getImage(item.pdf, null);
        const blob = new Blob([file.data], { type: "application/pdf;base64" });
        const link = window.URL.createObjectURL(blob);
        this.pdf_document = link;
      }
    },
    format_date(date, time = false) {
      if (time) {
        return moment(date, "YYYY-MM-DD HH:mm:ss.sss").format(
          "DD/MM/YYYY hh:mm A"
        );
      } else {
        return moment(date).utc().format("DD/MM/YYYY");
      }
    },
    async findRowOpen() {
      this.rowsOpened = await getPsyProcess();
    },
    async submit() {
      const objData = {
        ...this.psychologistForm1,
        diagnostic: this.diagnosesSelectList,
      };
      objData.dateStart = moment(objData.dateStart, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      objData.dateEnd = moment(objData.dateEnd, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      await savePsiProcess(objData);
      this.clear();
      this.findRowOpen();
    },
    async clear() {
      this.psychologistForm1 = {
        sessionNumber: null,
        stateProcess: null,
        dateStart: null,
        dateEnd: null,
        problemSummary: null,
        diagnosticImpression: null,
        diagnostic: null,
      };
      this.date = null;
      this.dateFormatted = null;
      this.date2 = null;
      this.dateFormatted2 = null;
      this.menu1 = false;
      this.menu2 = false;
      this.diagnosesSelectList = [];
      this.e6 = 1;
      this.validateStepper(9999);
    },
    addDiagnosis() {
      if (
        !this.diagnosesSelectList.includes(this.psychologistForm1.diagnostic)
      ) {
        this.diagnosesSelectList.push(this.psychologistForm1.diagnostic);
      }
      this.psychologistForm1.diagnostic = "";
      this.$nextTick(() => {
        this.psychologistForm1.diagnostic = null;
      });
    },
    deleteItem(item) {
      const index = this.diagnosesSelectList.indexOf(item);
      if (index > -1) {
        this.diagnosesSelectList.splice(index, 1);
      }
    },
    validateStepper(val) {
      if (val == this.e6) {
        this.e6 = 99999999999999999;
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },

  computed: {},

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
      this.psychologistForm1.dateStart = this.dateFormatted;
    },
    date2(val) {
      this.dateFormatted2 = this.formatDate(this.date2);
      this.psychologistForm1.dateEnd = this.dateFormatted2;
    },
  },
};
</script>
<style>
.v-image__image--cover {
  background-size: contain;
}
.v-list--two-line .v-list__tile {
  height: 150px;
}
.title-div {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  background-color: #004969;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
