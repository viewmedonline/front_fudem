<template lang="">
  <v-container>
    <div style="background-color: #004969; height: 50px"></div>
    <v-stepper v-model="e6" vertical non-linear>
      <v-stepper-step
        :step="9999"
        :edit-icon="'add'"
        complete
        :editable="true"
        @click="validateStepper(9999)"
      >
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Crear Reporte de Anestesiología</h3>
          </div>
        </v-card-title>
      </v-stepper-step>
      <v-stepper-content :step="9999">
        <v-container>
          <v-card>
            <v-card-title primary-title class="blue-grey darken-1">
              <!-- <v-btn flat icon @click="show_notes = false"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        > -->
              <span class="subheading white--text text-capitalize"
                >Reporte de Anestesiología</span
              >
            </v-card-title>
            <v-card-text>
              <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                  <v-flex xs3>
                    <b>Expediente:</b>
                  </v-flex>
                  <v-flex xs3>
                    <b>Nombre:</b>
                  </v-flex>
                  <v-flex xs3>
                    <b>Edad:</b>
                  </v-flex>
                  <v-flex xs3>
                    <b>Sexo:</b>
                  </v-flex>
                  <v-flex xs3>
                    {{ num_exp }}
                  </v-flex>
                  <v-flex xs3>
                    {{ pat_name }}
                  </v-flex>
                  <v-flex xs3>
                    {{ pat_age }}
                  </v-flex>
                  <v-flex xs3>
                    {{ pat_gender }}
                  </v-flex>
                </v-layout>
                <v-form
                  style="margin-top: 25px"
                  ref="form"
                  autocomplete="off"
                  v-model="form_anesthesiology"
                  lazy-validation
                >
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            class="text-field-width"
                            v-model="date"
                            label="Fecha de Operación"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          locale="es-es"
                          v-model="date_picker"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs6>
                      <v-menu
                        ref="menu_time"
                        v-model="menu_time"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="time"
                            label="Hora de Operación"
                            prepend-icon="access_time"
                            value="12hr"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu_time"
                          v-model="time"
                          full-width
                          value="12hr"
                          @click:minute="$refs.menu_time.save(time)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        v-model="diagnosesPre"
                        label="Diagnostico Pre-operatorio"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        v-model="medicalRecords"
                        label="Antecedentes Médicos del paciente"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        v-model="typeAnesthesia"
                        label="Tipo de anestesia"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        v-model="anesthesiaTechnique"
                        label="Técnica de anestesia"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        v-model="ClassificationAsa"
                        label="Clasificación ASA"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-card>
                        <v-card-title primary-title class="blue-grey darken-1">
                          <span class="subheading white--text text-capitalize"
                            >Signos vitales</span
                          >
                        </v-card-title>
                        <v-card-text style="padding: 10px">
                          <v-layout row wrap>
                            <v-flex xs12>
                              <table style="width: 100%">
                                <tr>
                                  <td>Hora</td>
                                  <td>15'</td>
                                  <td>30'</td>
                                  <td>45'</td>
                                  <td>60'</td>
                                  <td>15'</td>
                                  <td>30'</td>
                                  <td>45'</td>
                                  <td>60'</td>
                                  <td>15'</td>
                                  <td>30'</td>
                                  <td>45'</td>
                                  <td>60'</td>
                                </tr>
                                <tr>
                                  <td>TA</td>
                                  <td
                                    v-for="(taItem, key) in taPositionList"
                                    :key="key"
                                  >
                                    <v-text-field
                                      class="input-vital-signs"
                                      single-line
                                      outline
                                      v-model="taPositionList[key]"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>FC</td>
                                  <td
                                    v-for="(faItem, key) in fcPositionList"
                                    :key="key"
                                  >
                                    <v-text-field
                                      class="input-vital-signs"
                                      single-line
                                      outline
                                      v-model="fcPositionList[key]"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>FR</td>
                                  <td
                                    v-for="(frItem, key) in frPositionList"
                                    :key="key"
                                  >
                                    <v-text-field
                                      class="input-vital-signs"
                                      single-line
                                      outline
                                      v-model="frPositionList[key]"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>T°</td>
                                  <td
                                    v-for="(tempItem, key) in tempPositionList"
                                    :key="key"
                                  >
                                    <v-text-field
                                      class="input-vital-signs"
                                      single-line
                                      outline
                                      v-model="tempPositionList[key]"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>PSO2</td>
                                  <td
                                    v-for="(posItem, key) in pso2PositionList"
                                    :key="key"
                                  >
                                    <v-text-field
                                      class="input-vital-signs"
                                      single-line
                                      outline
                                      v-model="pso2PositionList[key]"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>PCO2</td>
                                  <td
                                    v-for="(pcoItem, key) in pco2PositionList"
                                    :key="key"
                                  >
                                    <v-text-field
                                      class="input-vital-signs"
                                      single-line
                                      outline
                                      v-model="pco2PositionList[key]"
                                    />
                                  </td>
                                </tr>
                              </table>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12>
                      <v-card>
                        <v-card-title primary-title class="blue-grey darken-1">
                          <span class="subheading white--text text-capitalize"
                            >Medicamentos y Soluciones Administradas</span
                          >
                        </v-card-title>
                        <v-card-text>
                          <v-layout row wrap>
                            <v-flex xs5>
                              <v-text-field
                                v-model="medicine"
                                label="Medicamentos Administrados"
                              >
                              </v-text-field>
                            </v-flex>
                            <v-flex xs5>
                              <v-text-field v-model="dose" label="Dosis">
                              </v-text-field>
                            </v-flex>
                            <v-flex xs2>
                              <v-btn
                                large
                                color="primary"
                                @click="addItemMedicine()"
                              >
                                Agregar
                              </v-btn>
                            </v-flex>
                            <v-flex xs12>
                              <v-data-table
                                :headers="headersMedicines"
                                :items="itemsMedicines"
                                class="elevation-1"
                              >
                                <template v-slot:items="props">
                                  <td>{{ props.item.description }}</td>
                                  <td>
                                    {{ props.item.doses }}
                                  </td>
                                  <td>
                                    <v-icon
                                      small
                                      @click="deleteItemMedicine(props.item)"
                                    >
                                      delete
                                    </v-icon>
                                  </td>
                                </template>
                              </v-data-table>
                            </v-flex>
                            <!-- Soluciones administradas -->
                            <v-flex xs5>
                              <v-text-field
                                v-model="solution"
                                label="Soluciones Administradas"
                              >
                              </v-text-field>
                            </v-flex>
                            <v-flex xs5>
                              <v-text-field
                                v-model="dose_solution"
                                label="Dosis"
                              >
                              </v-text-field>
                            </v-flex>
                            <v-flex xs2>
                              <v-btn
                                large
                                color="primary"
                                @click="addItemSolution()"
                              >
                                Agregar
                              </v-btn>
                            </v-flex>
                            <v-flex xs12>
                              <v-data-table
                                :headers="headersSolutions"
                                :items="itemsSolutions"
                                class="elevation-1"
                              >
                                <template v-slot:items="props">
                                  <td>{{ props.item.description }}</td>
                                  <td>
                                    {{ props.item.doses }}
                                  </td>
                                  <td>
                                    <v-icon
                                      small
                                      @click="deleteItemSolution(props.item)"
                                    >
                                      delete
                                    </v-icon>
                                  </td>
                                </template>
                              </v-data-table>
                            </v-flex>
                            <v-flex xs12>
                              <v-btn
                                large
                                color="primary"
                                @click="saveAnesthesiologySheet()"
                              >
                                Guardar
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-container>
      </v-stepper-content>
      <div v-for="(item, z) in listAnesthesiology" :key="item._id">
        <v-stepper-step
          :step="z"
          complete
          :edit-icon="'assignment'"
          :editable="true"
          @click="showNotes(item, z)"
        >
          Reporte de Anestesiología
          <v-layout row wrap>
            <v-flex>
              <small>{{ item.date }}</small>
            </v-flex>
            <v-flex style="margin-left: 150px" v-if="item.pdf != null">
              <v-icon x-large style="margin-top: -30px; color: #d50f0f"
                >picture_as_pdf</v-icon
              >
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
          <!-- <v-layout row wrap>
              <v-flex xs12 class="text-xs-right">
                <v-btn @click="Print(z)" fab dark small color="primary">
                  <v-icon>print</v-icon>
                </v-btn>
              </v-flex>
            </v-layout> -->
        </v-stepper-content>
      </div>
    </v-stepper>
  </v-container>
</template>
<style>
td {
  text-align: center;
  width: 7%;
}
.input-vital-signs .v-input__slot {
  font-weight: bold;
  font-size: 12px;
}
.input-vital-signs,
.input-vital-signs * {
  padding: 0px !important;
  text-align: center !important;
}
</style>
<script>
import moment from "moment-timezone";
import {
  getListAnesthesiology,
  saveSheetAnesthesiology,
} from "../../componentServs/anesthesiology";
import { getImage } from "../../componentServs/file";

export default {
  name: "anesthesiology_sheet",
  data: () => ({
    e6: 1,
    num_exp: "",
    pat_name: "",
    pat_age: "",
    pat_gender: "",
    form_anesthesiology: false,
    loading: false,
    menu: false,
    date: "",
    date_picker: null,
    menu_time: false,
    time: "",
    medicine: "",
    dose: "",
    solution: "",
    dose_solution: "",
    itemsSolutions: [],
    itemsMedicines: [],
    taPositionList: Array(12),
    fcPositionList: Array(12),
    frPositionList: Array(12),
    tempPositionList: Array(12),
    pso2PositionList: Array(12),
    pco2PositionList: Array(12),
    diagnosesPre: "",
    medicalRecords: "",
    typeAnesthesia: "",
    anesthesiaTechnique: "",
    ClassificationAsa: "",
    listAnesthesiology: [],
    pdf_document: null,
    headersMedicines: [
      {
        text: "Medicamento Administrado",
        align: "center",
        sortable: false,
        value: "description",
      },
      {
        text: "Dosis",
        align: "center",
        value: "doses",
      },
      { text: "Acción", align: "center", value: "name", sortable: false },
    ],
    headersSolutions: [
      {
        text: "Soluciones Administradas",
        align: "center",
        sortable: false,
        value: "description",
      },
      {
        text: "Dosis",
        align: "center",
        value: "doses",
      },
      { text: "Acción", align: "center", value: "name", sortable: false },
    ],
  }),
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    validateStepper(val) {
      if (val == this.e6) {
        this.e6 = 99999999999999999;
      }
    },
    format_date(date, time = false) {
      if (time) {
        return moment(date).format("DD/MM/YYYY hh:mm A");
      } else {
        return moment(date).format("DD/MM/YYYY");
      }
    },
    async saveAnesthesiologySheet() {
      this.loading = true;

      if (this.$refs.form.validate()) {
        await saveSheetAnesthesiology({
          name: "anesthesiology_sheet.html",
          data: {
            num_exp: this.num_exp,
            pat_name: this.pat_name,
            pat_age: this.pat_age,
            pat_gender: this.pat_gender,
            date: moment().format("YYYY-MM-DD"),
            patient: this.$store.getters.getPatient._id,
            responsible: this.$store.getters.getPhysician._id,
            phy_name: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            digital_signature:
              this.$store.getters.getPhysician.digital_signature,
            operationDateFormat: moment(
              `${this.date} ${this.time}`,
              "DD/MM/YYYY hh:mm A"
            ),
            operationDate: this.date,
            operationTime: this.time,
            preoperativeDiagnosis: this.diagnosesPre,
            MedicalHistory: this.medicalRecords,
            typeAnesthesia: this.typeAnesthesia,
            anesthesiaTechnique: this.anesthesiaTechnique,
            asaClassification: this.ClassificationAsa,
            VitalSigns: {
              ta: this.taPositionList,
              fc: this.fcPositionList,
              fr: this.frPositionList,
              temp: this.tempPositionList,
              pso2: this.pso2PositionList,
              pco2: this.pco2PositionList,
            },
            medicines: this.itemsMedicines,
            solutions: this.itemsSolutions,
          },
        });
        this.clear();
        this.validateStepper(9999);
        await this.getListReport();
      }
      this.loading = false;
    },
    addItemMedicine() {
      this.itemsMedicines.push({
        description: this.medicine,
        doses: this.dose,
      });
      this.medicine = "";
      this.dose = "";
    },
    deleteItemMedicine(item) {
      const index = this.itemsMedicines.indexOf(item);
      this.itemsMedicines.splice(index, 1);
    },
    addItemSolution() {
      this.itemsSolutions.push({
        description: this.solution,
        doses: this.dose_solution,
      });
      this.solution = "";
      this.dose_solution = "";
    },
    deleteItemSolution(item) {
      const index = this.itemsSolutions.indexOf(item);
      this.itemsSolutions.splice(index, 1);
    },
    async showNotes(item, pos) {
      this.validateStepper(pos);
      const file = await getImage(item.pdf, null);
      const blob = new Blob([file.data], { type: "application/pdf;base64" });
      const link = window.URL.createObjectURL(blob);
      this.pdf_document = link;
    },
    async getListReport() {
      this.listAnesthesiology = (
        await getListAnesthesiology(this.$store.getters.getPatient._id)
      ).map((x) => {
        x.date = moment.tz(x.date, "America/El_Salvador").format("DD/MM/YYYY");
        return x;
      });
    },
  },
  watch: {
    menu_time(val) {
      if (!val) {
        this.time = moment(this.time, "HH:mm").format("hh:mm A");
      } else {
        if (this.time) this.time = moment(this.time, "hh:mm A").format("HH:mm");
      }
    },
    date_picker(val) {
      this.date = moment(val).format("DD/MM/YYYY");
    },
  },
  async mounted() {
    await this.getListReport();
    moment.locale("es");
    const { idQflow, forename, surname, birthdate, gender } =
      this.$store.getters.getPatient;
    this.num_exp = idQflow;
    this.pat_name = `${forename} ${surname}`;
    this.pat_age = moment().diff(birthdate, "years");
    this.pat_gender =
      gender == "Male" || gender.toLowerCase() == "masculino"
        ? "Masculino"
        : "Femenino";
  },
};
</script>
