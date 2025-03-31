<template>
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <span class="subheading white--text text-capitalize"
          >Hoja de Cirugía</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md px-0 py-0>
          <v-layout row wrap style="width: 100%">
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
            <v-flex xs3>
              <b>Médico que Indica Cirugía:</b>
            </v-flex>
            <v-flex xs3>
              <b>Diagnostico:</b>
            </v-flex>
            <v-flex xs3 offset-xs8> </v-flex>
            <v-flex xs3>
              {{ physician_history_name }}
            </v-flex>
            <v-flex xs3>
              <ul>
                <li v-for="(item, i) in diagnosis" :key="i">{{ item }}</li>
              </ul>
            </v-flex>
          </v-layout>
          <v-form
            ref="form"
            autocomplete="off"
            v-model="form_surgery_sheet"
            lazy-validation
          >
            <v-layout row wrap style="padding: 20px">
              <v-flex xs6>
                <v-text-field
                  :rules="[rules.required]"
                  class="text-field-width"
                  v-model="surgery"
                  label="Cirugía"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  :rules="[rules.required]"
                  class="text-field-width"
                  v-model="resumen_history"
                  label="Resumen de la Histaria"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  :rules="[rules.required]"
                  class="text-field-width"
                  v-model="biometrics_od"
                  label="Biometría OD"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  :rules="[rules.required]"
                  class="text-field-width"
                  v-model="biometrics_oi"
                  label="Biometría OI"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  :rules="[rules.required]"
                  class="text-field-width"
                  v-model="anesthesia"
                  label="Anestesia Solicitada"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  :rules="[rules.required]"
                  class="text-field-width"
                  v-model="supplies_special"
                  label="Insumos Especiales"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-card-title>
              <span class="subheading text-capitalize"
                ><b>Reporte Post-Operatorio:</b></span
              >
            </v-card-title>
            <v-card-text>
              <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap style="padding: 20px">
                  <v-flex xs4>
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
                          :rules="[rules.required]"
                          class="text-field-width"
                          v-model="date"
                          label="Fecha de Cirugía"
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
                  <v-flex xs4>
                    <v-select
                      :rules="[rules.required]"
                      v-model="eye_operated"
                      class="text-field-width"
                      :items="['Derecho', 'Izquierdo', 'Ambos']"
                      label="Ojo Operado"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      :rules="[rules.required]"
                      class="text-field-width"
                      v-model="time_surgery"
                      type="number"
                      label="Tiempo de Cirugía"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      :rules="[rules.required]"
                      class="text-field-width"
                      v-model="lens_placed"
                      label="Lente Intraocular Colocado"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      :rules="[rules.required]"
                      class="text-field-width"
                      v-model="anesthesia_applied"
                      label="Anestesia Aplicada"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      :rules="[rules.required]"
                      class="text-field-width"
                      v-model="complications"
                      label="Complicaciones"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      :rules="[rules.required]"
                      style="width: 97%"
                      v-model="description"
                      label="Descripción"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      :rules="[rules.required]"
                      class="text-field-width"
                      v-model="biopsy_culture"
                      label="Biopsia o Cultivo"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      :rules="[rules.required]"
                      class="text-field-width"
                      v-model="operation_performed"
                      label="Operación Realizada"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      :rules="[rules.required]"
                      class="text-field-width"
                      v-model="surgeon_name"
                      label="Nombre del Cirujano"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      :rules="[rules.required]"
                      style="width: 97%"
                      v-model="observations"
                      label="Observaciones"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12>
                    <v-img
                      :src="physician_signature"
                      width="150px"
                      height="150px"
                      class="center_img"
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    {{ physician_name }}
                  </v-flex>
                  <v-flex xs12>
                    {{
                      physician_specialty == "intern"
                        ? "Internista"
                        : "Oftalmólogo"
                    }}
                  </v-flex>
                  <v-flex xs12 style="text-align: end">
                    <v-btn
                      color="primary"
                      large
                      style="width: 150px"
                      :loading="loading_save_sheet_surgery"
                      @click="saveSheetSurgery"
                    >
                      Guardar
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 style="text-align: end">
                    <v-btn style="width: 150px" large @click="clear"
                      >Limpiar</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
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
  </v-container>
</template>
<script>
import moment from "moment";
import { getLastConsultation } from "../../componentServs/consultation";
import { getPerson } from "../../componentServs/person";
import { saveConsultation } from "../../componentServs/consultation";
import { getImage, savePdf } from "../../componentServs/file";
import { saveSheetSurgery } from "../../componentServs/surgery_sheet";
export default {
  name: "surgery_sheet",
  data: () => ({
    num_exp: "",
    pat_name: "",
    pat_age: "",
    pat_gender: "",
    diagnosis: [],
    form_surgery_sheet: false,
    surgery: "",
    resumen_history: "",
    biometrics_od: "",
    biometrics_oi: "",
    anesthesia: "",
    supplies_special: "",
    menu: false,
    date: "",
    date_picker: null,
    eye_operated: "",
    time_surgery: "",
    lens_placed: "",
    anesthesia_applied: "",
    complications: "",
    description: "",
    biopsy_culture: "",
    operation_performed: "",
    surgeon_name: "",
    observations: "",
    physician_name: "",
    physician_history_name: "",
    physician_history_id: "",
    history_id: "",
    physician_signature: "",
    physician_specialty: "",
    alert: false,
    loading_save_sheet_surgery: false,
    rules: {
      required: (value) => !!value || "Este campo es requerido",
    },
  }),
  methods: {
    async saveSheetSurgery() {
      this.loading_save_sheet_surgery = true;
      this.alert = true;
      if (this.$refs.form.validate()) {
        // const file = await getPreview();
        const pdf_id = await saveSheetSurgery({
          name: "surgery_sheet.html",
          data: {
            num_exp: this.num_exp,
            pat_name: this.pat_name,
            pat_age: this.pat_age,
            pat_gender: this.pat_gender,
            diagnosis: this.diagnosis.join(", "),
            surgery: this.surgery,
            resumen_history: this.resumen_history,
            biometrics_od: this.biometrics_od,
            biometrics_oi: this.biometrics_oi,
            anesthesia: this.anesthesia,
            supplies_special: this.supplies_special,
            eye_operated: this.eye_operated,
            time_surgery: this.time_surgery,
            lens_placed: this.lens_placed,
            anesthesia_applied: this.anesthesia_applied,
            complications: this.complications,
            description: this.description,
            biopsy_culture: this.biopsy_culture,
            operation_performed: this.operation_performed,
            surgeon_name: this.surgeon_name,
            observations: this.observations,
            physician_name: this.physician_name,
            physician_history_name: this.physician_history_name,
            responsible: this.physician_history_id,
            history_id: this.history_id,
            patient: this.$store.getters.getPatient._id,
            physician_signature:
              this.$store.getters.getPhysician.digital_signature,
            physician_specialty: this.physician_specialty,
            date_surgery: this.date,
          },
        });

        const data_document_consultation = {
          person: this.$store.getters.getPatient._id,
          name: "Hoja de Cirugía",
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
        this.clear();
      }
      this.loading_save_sheet_surgery = false;
      this.alert = false;
    },
    clear() {
      this.surgery = "";
      this.resumen_history = "";
      this.biometrics_od = "";
      this.biometrics_oi = "";
      this.anesthesia = "";
      this.supplies_special = "";
      this.date = "";
      this.eye_operated = "";
      this.time_surgery = "";
      this.lens_placed = "";
      this.anesthesia_applied = "";
      this.complications = "";
      this.description = "";
      this.biopsy_culture = "";
      this.operation_performed = "";
      this.surgeon_name = "";
      this.observations = "";
      this.$refs.form.reset();
    },
  },
  watch: {
    date_picker(val) {
      this.date = moment(val).format("DD/MM/YYYY");
    },
  },
  async mounted() {
    this.physician_name =
      this.$store.getters.getPhysician.forename +
      " " +
      this.$store.getters.getPhysician.surname;
    this.physician_specialty = this.$store.getters.getPhysician.role;
    if (this.$store.getters.getPhysician.digital_signature) {
      const file = await getImage(
        this.$store.getters.getPhysician.digital_signature,
        null
      );
      const blob = new Blob([file.data], { type: "image/png;base64" });
      const link = window.URL.createObjectURL(blob);
      this.physician_signature = link;
    }

    const { idQflow, forename, surname, birthdate, gender } =
      this.$store.getters.getPatient;
    this.num_exp = idQflow;
    this.pat_name = `${forename} ${surname}`;
    this.pat_age = moment().diff(birthdate, "years");
    this.pat_gender = gender;
    const result = await getLastConsultation({
      body: { person: this.$store.getters.getPatient._id },
    });
    const person_data_phy = await getPerson({
      body: { _id: result.responsableConsultation },
    });
    this.physician_history_id = person_data_phy._id;
    this.history_id = result._id;
    this.physician_history_name = `${person_data_phy.forename} ${person_data_phy.surname}`;
    if (result && result.diagnostic && result.diagnostic.length > 0) {
      let disct = result.diagnostic;
      let arrayDiagnoses = [];
      for (let i in disct) {
        arrayDiagnoses.push(disct[i]["diagnostic"]["es"]);
      }
      this.diagnosis = arrayDiagnoses;
    }
  },
};
</script>
<style>
.text-field-width {
  width: 90%;
}
.center_img {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
