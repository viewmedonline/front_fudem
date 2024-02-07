<template lang="">
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <span class="subheading white--text text-capitalize"
          >Evaluación Pediátrica</span
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
            v-model="form_pediatrics"
            lazy-validation
          >
            <v-layout row wrap>
              <v-flex xs4>
                <v-select
                  :rules="[rules.required]"
                  v-model="diagnosisPre"
                  class="text-field-width"
                  :items="[
                    'Ninguno',
                    'Cataratas',
                    'Estrabismo',
                    'Pterigion',
                    'Retinopatia Diabetica',
                    'Trabeculectomia',
                    'Tumor de Parpado',
                    'Vitrectomia',
                  ]"
                  label="Diagnóstico preoperatorio"
                ></v-select>
              </v-flex>
              <v-flex xs2>
                <v-select
                  :rules="[rules.required]"
                  v-model="status"
                  class="text-field-width"
                  :items="['Activo', 'Inactivo']"
                  label="Estado"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  v-model="clinicObservation"
                  label="Historia Clinica"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  v-model="recordNP"
                  label="Antecedentes personales NO PATOLÓGICOS"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  v-model="recordP"
                  label="Antecedentes personales PATOLÓGICOS"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  v-model="vaccination"
                  label="Vacunación"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Examen Fisico</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-flex xs12>
                      <v-textarea
                        outline
                        v-model="physicalState"
                        label="Estado Físico"
                      ></v-textarea>
                    </v-flex>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Examen de Laboratorio y Gabinete</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs3>
                        <v-text-field
                          v-model="ht"
                          class="text-field-width"
                          label="HT"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="hb"
                          class="text-field-width"
                          label="HB"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="platelets"
                          class="text-field-width"
                          label="Plaquetas"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="tp"
                          class="text-field-width"
                          label="TP"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="tpt"
                          class="text-field-width"
                          label="TPT"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="inr"
                          class="text-field-width"
                          label="INR"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="glucose"
                          class="text-field-width"
                          label="Glucosa"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="vih"
                          class="text-field-width"
                          label="Elisa/VIH"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="ego"
                          class="text-field-width"
                          label="EGO"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12> </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12></v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="rxTorax"
                  class="text-field-width"
                  label="Radiografía de Torax"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="electroCardio"
                  class="text-field-width"
                  label="Electrocardiograma"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  v-model="comments"
                  label="Comentarios"
                ></v-textarea>
              </v-flex>
              <v-flex xs3>
                <v-select
                  :rules="[rules.required]"
                  v-model="surgicalRisk"
                  class="text-field-width"
                  :items="['Bajo', 'Intermedio', 'Alto']"
                  label="Riesgo Quirúrgico"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  :rules="[rules.required]"
                  v-model="functionalCapacity"
                  class="text-field-width"
                  :items="['1-4 METS', '4-10 METS']"
                  label="Capacidad Funcional"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  :rules="[rules.required]"
                  v-model="clinicalPredictors"
                  class="text-field-width"
                  :items="['Menores', 'Intermedios', 'Mayores']"
                  label="Predictores Clínicos"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  :rules="[rules.required]"
                  v-model="clasificationAsa"
                  class="text-field-width"
                  :items="['I', 'II', 'III', 'IV', 'V']"
                  label="Clasificacion ASA"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  v-model="diagnosis"
                  label="Diagnóstico"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea outline v-model="plan" label="Plan"></v-textarea>
              </v-flex>
              <v-btn
                :loading="loading"
                large
                color="primary"
                @click="savePediatricsSheet()"
              >
                Guardar
              </v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import moment from "moment";
import {saveSheetPediatrics} from '../../componentServs/pediatrics'
export default {
  name: "surgery_sheet",
  data: () => ({
    num_exp: "",
    pat_name: "",
    pat_age: "",
    pat_gender: "",
    form_pediatrics: false,
    loading: false,
    diagnosisPre: "",
    status: "",
    clinicObservation: "",
    recordNP: "",
    recordP: "",
    vaccination: "",
    physicalState: "",
    ht: "",
    hb: "",
    platelets: "",
    tp: "",
    tpt: "",
    inr: "",
    glucose: "",
    vih: "",
    ego: "",
    rxTorax: "",
    electroCardio: "",
    comments: "",
    surgicalRisk: "",
    functionalCapacity: "",
    clinicalPredictors: "",
    clasificationAsa: "",
    diagnosis: "",
    plan: "",
    rules: {
      required: (value) => !!value || "Este campo es requerido",
    },
  }),
  methods: {
    async savePediatricsSheet() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        const objRequest = {
          name: "pediatrics_evaluation.html",
          data: {
            num_exp: this.num_exp,
            pat_name: this.pat_name,
            pat_age: this.pat_age,
            pat_gender: this.pat_gender,
            date: moment().format("YYYY-MM-DD"),
            patient: this.$store.getters.getPatient._id,
            responsible: this.$store.getters.getPhysician._id,
            diagnosisPre: this.diagnosisPre,
            stateDiagnosis: this.status,
            clinicObservation: this.clinicObservation,
            recordNP: this.recordNP,
            recordP: this.recordP,
            vaccination: this.vaccination,
            physicalExam: this.physicalState,
            ht: this.ht,
            hb: this.hb,
            platelets: this.platelets,
            tp: this.tp,
            tpt: this.tpt,
            inr: this.inr,
            glucose: this.glucose,
            vih: this.vih,
            ego: this.ego,
            radiography: this.rxTorax,
            electrocardiogram: this.electroCardio,
            comments: this.comments,
            surgical_risk: this.surgicalRisk,
            functional_capacity: this.functionalCapacity,
            clinical_predictors: this.clinicalPredictors,
            clasification_asa: this.clasificationAsa,
            plan: this.plan,
            diagnosis: this.diagnosis,
            phy_name: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            digital_signature: this.$store.getters.getPhysician.digital_signature,
          }
        };
        await saveSheetPediatrics(objRequest)
        this.clear();
      }
      this.loading = false;
    },
    clear() {
      this.$refs.form.reset();
    },
  },

  async mounted() {
    const { idQflow, forename, surname, birthdate, gender } =
      this.$store.getters.getPatient;
    this.num_exp = idQflow;
    this.pat_name = `${forename} ${surname}`;
    this.pat_age = moment().diff(birthdate, "years");
    this.pat_gender = (gender == "Male" || gender.toLowerCase() == "masculino") ? "Masculino" : "Femenino";
  },
};
</script>
