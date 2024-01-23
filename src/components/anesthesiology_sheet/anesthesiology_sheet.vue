<template lang="">
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
                      label="Desde"
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
                  v-model="observations"
                  label="Diagnostico Pre-operatorio"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="observations"
                  label="Antecedentes Médicos del paciente"
                ></v-textarea>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="idealWeight" label="Tipo de anestesia">
                </v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="idealWeight"
                  label="Técnica de anestesia"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="idealWeight" label="Clasificación ASA">
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Signos vitales</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                    hora
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
</template>
<script>
import moment from "moment";

export default {
  name: "anesthesiology_sheet",
  data: () => ({
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
    taListValue:["","","","","","","","","","","",""],
    headers: ["HORA", "15'", "30'", "45'", "60'", "15'", "30'", "45'", "60'", "TA:", "FC:", "Fr:", "T°:", "PSO2:", "PCO2:"],
      rows: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      cols: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]    
  }),
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    saveAnesthesiologySheet() {
      this.loading = true;

      if (this.$refs.form.validate()) {
        this.clear();
      }
      this.loading = false;
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
    moment.locale("es");
    const { idQflow, forename, surname, birthdate, gender } =
      this.$store.getters.getPatient;
    this.num_exp = idQflow;
    this.pat_name = `${forename} ${surname}`;
    this.pat_age = moment().diff(birthdate, "years");
    this.pat_gender = gender == "Male" ? "Masculino" : "Femenino";
  },
};
</script>
