<template>
  <v-container style="width: 800px">
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <!-- <v-btn flat icon @click="show_notes = false"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        > -->
        <span class="subheading white--text text-capitalize"
          >Constancia de Incapacidad</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md px-0 py-0>
          <v-layout row wrap>
            <v-form
              autocomplete="off"
              ref="form"
              v-model="form"
              lazy-validation
            >
              <v-flex xs12>
                <v-radio-group v-model="column" row :rules="[rules.required]">
                  <v-radio
                    label="Incapacidad por Consulta Médica"
                    value="1"
                  ></v-radio>
                  <v-radio
                    label="Incapacidad por procedimiento Quirurgico o no Quirurgico"
                    value="2"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Diagnostico o Pronostico"
                  v-model="diagnosis"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Dias"
                  v-model="days"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Extendida en"
                  v-model="extended"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
            </v-form>
          </v-layout>
          <v-layout row wrap justify-end>
            <v-flex xs6>
              <v-btn
                color="primary"
                @click="preview"
                :loading="loading_preview"
                >{{ $t("title.pre_view") }}</v-btn
              >
              <v-btn
                color="primary"
                @click="save_contancy_disability"
                :loading="loading_save"
                >{{ $t("title.save") }}</v-btn
              >
              <v-btn flat @click="clear">{{ $t("title.clear") }}</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
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
          <v-toolbar-title>Hoja de Referencia Médica</v-toolbar-title>
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
import moment from "moment";
import { getPreview } from "../../componentServs/file";
import { saveConstancyPdf } from "../../componentServs/constancy";
moment.locale("es");
export default {
  name: "constancy_disability",
  data(vm) {
    return {
      column: "",
      diagnosis: "",
      days: "",
      extended: "",
      loading_preview: false,
      loading_save: false,
      form: false,
      dialog: false,
      pdf_document: "",
      rules: {
        required: (v) => !!v || vm.$t("title.field_required"),
      },
    };
  },
  methods: {
    async preview() {
      if (this.$refs.form.validate()) {
        this.loading_preview = true;
        const file = await getPreview({
          name:
            this.column == "1"
              ? "constancy_disability_1.html"
              : "constancy_disability_2.html",
          data: {
            name: `${this.$store.getters.getPatient.forename} ${this.$store.getters.getPatient.surname}`,
            age: moment().diff(
              this.$store.getters.getPatient.birthdate,
              "years"
            ),
            diagnosis: this.diagnosis,
            days: this.days,
            city: this.extended,
            day_month: moment().format("DD"),
            month: moment().format("MMMM"),
            year: moment().format("YYYY"),
            name_prof: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            type:
              this.$store.getters.getPhysician.role == "intern"
                ? "Médico Internista"
                : "Oftalmólogo",
            digital_signature:
              this.$store.getters.getPhysician.digital_signature,
          },
        });
        const blob = new Blob([file.data], { type: "application/pdf;base64" });
        const link = window.URL.createObjectURL(blob);
        this.dialog = true;
        this.pdf_document = link;
        this.loading_preview = false;
      }
    },
    async save_contancy_disability() {
      if (this.$refs.form.validate()) {
        this.loading_save = true;
        await saveConstancyPdf({
          name:
            this.column == "1"
              ? "constancy_disability_1.html"
              : "constancy_disability_2.html",
          data: {
            name: `${this.$store.getters.getPatient.forename} ${this.$store.getters.getPatient.surname}`,
            age: moment().diff(
              this.$store.getters.getPatient.birthdate,
              "years"
            ),
            diagnosis: this.diagnosis,
            days: this.days,
            city: this.extended,
            day_month: moment().format("DD"),
            month: moment().format("MMMM"),
            year: moment().format("YYYY"),
            name_prof: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            type:
              this.$store.getters.getPhysician.role == "intern"
                ? "Médico Internista"
                : "Oftalmólogo",
            digital_signature:
              this.$store.getters.getPhysician.digital_signature,
            patient: this.$store.getters.getPatient._id,
            responsible: this.$store.getters.getPhysician._id,
            date: moment().format("YYYY-MM-DD"),
            control:{
              active:false
            }
          },
        });
        this.loading_save = false;
        this.clear();
      }
    },
    clear() {
      this.column = "";
      this.diagnosis = "";
      this.days = "";
      this.extended = "";
      this.$refs.form.reset();
    },
  },
};
</script>
