<template>
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <span class="subheading white--text text-capitalize"
          >Hoja de Evaluación Médico Internista</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md px-0 py-0>
          <v-form
            ref="form"
            autocomplete="off"
            v-model="form_evaluation_intern"
            lazy-validation
          >
            <v-layout row wrap>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-radio-group
                    v-model="appointmentType"
                    row
                  >
                  <span style="margin-right: 10px;">Tipo de cita:</span>
                    <v-radio label="Primera Vez" value="Primera Vez"></v-radio>
                    <v-radio label="Control" value="Control"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6></v-flex>
                <v-flex xs4>
                  <v-select
                    v-model="preoperative_diagnosis"
                    class="text-field-width"
                    :items="[
                      'Cataratas',
                      'Estrabismo',
                      'Ninguno',
                      'Pterigion',
                      'Retinopatia Diabetica',
                      'Trabeculectomia',
                      'Tumor de Parpado',
                      'Vitrectomia',
                    ]"
                    label="Diagnostico Preoperatorio"
                  ></v-select>
                </v-flex>
                <v-flex xs8></v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="history_clinic"
                    class="text-field-width"
                    label="Historia Clínica"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="personal_record"
                    class="text-field-width"
                    label="Antecedentes Personales"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-flex xs12>
                <v-card-title primary-title class="blue-grey darken-1">
                  <span class="subheading white--text text-capitalize"
                    >Examen Físico</span
                  >
                </v-card-title>
              </v-flex>
              <v-layout row wrap>
                <v-flex xs3>
                  <v-text-field
                    v-model="blood_pressure"
                    class="text-field-width"
                    label="PA"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    v-model="heart_rate"
                    class="text-field-width"
                    label="FC"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    v-model="respiratory_rate"
                    class="text-field-width"
                    label="FR"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    v-model="oxygen_saturation"
                    class="text-field-width"
                    label="SATO2"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="physical_state"
                    class="text-field-width"
                    label="Estado Físico"
                  >
                  </v-textarea>
                </v-flex>
              </v-layout>
              <v-flex xs12>
                <v-card-title primary-title class="blue-grey darken-1">
                  <span class="subheading white--text text-capitalize"
                    >Exámenes de Laboratorio</span
                  >
                </v-card-title>
              </v-flex>
              <v-layout row wrap>
                <v-flex xs2>
                  <v-text-field
                    v-model="ht"
                    class="text-field-width"
                    label="HT"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    v-model="hb"
                    class="text-field-width"
                    label="HB"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    v-model="platelets"
                    class="text-field-width"
                    label="Plaquetas"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    v-model="tp"
                    class="text-field-width"
                    label="TP"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    v-model="tpt"
                    class="text-field-width"
                    label="TPT"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs2>
                  <v-text-field
                    v-model="inr"
                    class="text-field-width"
                    label="INR"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    v-model="glucose"
                    class="text-field-width"
                    label="Glucosa"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    v-model="vih"
                    class="text-field-width"
                    label="Elisa/VIH"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    v-model="ego"
                    class="text-field-width"
                    label="EGO"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    v-model="HbA1C"
                    class="text-field-width"
                    label="HbA1C"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="radiography"
                    class="text-field-width"
                    label="Radiografía de Torax"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="electrocardiogram"
                    class="text-field-width"
                    label="Electrocardiograma"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="comments"
                    class="text-field-width"
                    label="Comentarios"
                  >
                  </v-textarea>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    v-model="surgical_risk"
                    class="text-field-width"
                    :items="['Bajo', 'Intermedio', 'Alto']"
                    label="Riesgo Quirúrgico"
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    v-model="functional_capacity"
                    class="text-field-width"
                    :items="['1-4 METS', '4-10 METS']"
                    label="Capacidad Funcional"
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    v-model="clinical_predictors"
                    class="text-field-width"
                    :items="['Menores', 'Intermedios', 'Mayores']"
                    label="Predictores Clinicos"
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    v-model="clasification_asa"
                    class="text-field-width"
                    :items="['I', 'II', 'III', 'IV', 'V']"
                    label="Clasificacion ASA"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="plan"
                    class="text-field-width"
                    label="Plan"
                  >
                  </v-textarea>
                </v-flex>
              </v-layout>
              <v-flex xs12 style="text-align: start">
                <v-btn
                  :loading="loading_preview"
                  large
                  color="primary"
                  @click="previewEvaluation()"
                >
                  Vista Previa
                </v-btn>
                <v-btn
                  :loading="loading"
                  large
                  color="primary"
                  @click="saveEvaluation()"
                >
                  Guardar
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
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
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title
            >Hoja de evaluación médico internista</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text style="padding: 0; height: 93vh; background-color: grey">
          <iframe
            :src="pdf_document"
            type="application/pdf"
            frameborder="0"
            style="width: 100%; height: 100%"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { getPreview, savePdf } from "../../componentServs/file";
import { saveConsultation } from "../../componentServs/consultation";
import { saveSheetEvaluationMI } from "../../componentServs/intern_evaluation";
import moment from "moment";
export default {
  name: "internist_evaluation_sheet",
  data: () => ({
    preoperative_diagnosis: "",
    history_clinic: "",
    personal_record: "",
    blood_pressure: "",
    heart_rate: "",
    respiratory_rate: "",
    oxygen_saturation: "",
    physical_state: "",
    ht: "",
    hb: "",
    platelets: "",
    tp: "",
    tpt: "",
    inr: "",
    glucose: "",
    vih: "",
    ego: "",
    HbA1C: "",
    radiography: "",
    electrocardiogram: "",
    comments: "",
    surgical_risk: "",
    functional_capacity: "",
    clinical_predictors: "",
    clasification_asa: "",
    plan: "",
    loading: false,
    loading_preview: false,
    alert: false,
    dialog: false,
    pdf_document: "",
    form_evaluation_intern: false,
    appointmentType:"Primera Vez",
    rules: {
      required: (value) => !!value || "Este campo es requerido",
    },
  }),
  mounted() {
    console.log(this.$store.getters.getPhysician);
  },
  methods: {
    async saveEvaluation() {
      this.alert = true;
      this.loading = true;
      if (this.$refs.form.validate()) {
        const { idQflow, forename, surname, birthdate, gender } =
          this.$store.getters.getPatient;

        const pdf_id = await saveSheetEvaluationMI({
          name: "intern_evaluation.html",
          data: {
            date: moment().format("DD/MM/YYYY"),
            num_exp: idQflow,
            pat_name: `${forename} ${surname}`,
            pat_gender: gender,
            pat_age: moment().diff(birthdate, "years"),
            preoperative_diagnosis: this.preoperative_diagnosis,
            history_clinic: this.history_clinic,
            personal_record: this.personal_record,
            pa: this.blood_pressure,
            fc: this.heart_rate,
            fr: this.respiratory_rate,
            oxygen_saturation: this.oxygen_saturation,
            physical_state: this.physical_state,
            ht: this.ht,
            hb: this.hb,
            platelets: this.platelets,
            tp: this.tp,
            tpt: this.tpt,
            inr: this.inr,
            glucose: this.glucose,
            vih: this.vih,
            ego: this.ego,
            hba1c: this.HbA1C,
            radiography: this.radiography,
            electrocardiogram: this.electrocardiogram,
            comments: this.comments,
            surgical_risk: this.surgical_risk,
            functional_capacity: this.functional_capacity,
            clinical_predictors: this.clinical_predictors,
            clasification_asa: this.clasification_asa,
            plan: this.plan,
            physician_signature:
              this.$store.getters.getPhysician.digital_signature,
            phy_name: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            responsible: this.$store.getters.getPhysician._id,
            person: this.$store.getters.getPatient._id,
            appointmentType:this.appointmentType
          },
        });
        const data_document_consultation = {
          person: this.$store.getters.getPatient._id,
          name: "Hoja de evaluación médico internista",
          control: {
            active: false,
          },
          dateUpload: moment().format("YYYY-MM-DD"),
          file: pdf_id,
          responsableConsultation: this.$store.getters.getPhysician._id,
        };
        await saveConsultation({
          body: data_document_consultation,
          token: null,
        });
      }
      this.alert = false;
      this.loading = false;
      this.clear();
    },
    clear() {
      this.$refs.form.reset();
    },
    async previewEvaluation() {
      this.alert = true;
      this.loading_preview = true;
      if (this.$refs.form.validate()) {
        const { idQflow, forename, surname, birthdate, gender } =
          this.$store.getters.getPatient;
        const file = await getPreview({
          name: "intern_evaluation.html",
          data: {
            date: moment().format("DD/MM/YYYY"),
            num_exp: idQflow,
            pat_name: `${forename} ${surname}`,
            pat_gender: gender,
            pat_age: moment().diff(birthdate, "years"),
            preoperative_diagnosis: this.preoperative_diagnosis,
            history_clinic: this.history_clinic,
            personal_record: this.personal_record,
            pa: this.blood_pressure,
            fc: this.heart_rate,
            fr: this.respiratory_rate,
            oxygen_saturation: this.oxygen_saturation,
            physical_state: this.physical_state,
            ht: this.ht,
            hb: this.hb,
            platelets: this.platelets,
            tp: this.tp,
            tpt: this.tpt,
            inr: this.inr,
            glucose: this.glucose,
            vih: this.vih,
            ego: this.ego,
            hba1c: this.HbA1C,
            radiography: this.radiography,
            electrocardiogram: this.electrocardiogram,
            comments: this.comments,
            surgical_risk: this.surgical_risk,
            functional_capacity: this.functional_capacity,
            clinical_predictors: this.clinical_predictors,
            clasification_asa: this.clasification_asa,
            plan: this.plan,
            digital_signature:
              this.$store.getters.getPhysician.digital_signature,
            phy_name: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            responsible: this.$store.getters.getPhysician._id,
            person: this.$store.getters.getPatient._id,
            appointmentType:this.appointmentType
          },
        });
        const blob = new Blob([file.data], { type: "application/pdf;base64" });
        const link = window.URL.createObjectURL(blob);
        this.pdf_document = link;
        this.dialog = true;
      }
      this.alert = false;
      this.loading_preview = false;
    },
  },
};
</script>
<style>
.container.grid-list-md .layout:not(:only-child) {
  margin: auto 11px;
}
</style>
