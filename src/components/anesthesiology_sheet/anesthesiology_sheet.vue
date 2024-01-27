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
                      <v-flex xs8 offset-xs2>
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
                            <td v-for="taItem,key in taPositionList" :key="key"><v-text-field outline v-model="taPositionList[key]" /></td>
                          </tr>
                          <tr>
                            <td>FC</td>
                            <td v-for="faItem,key in faPositionList" :key="key"><v-text-field outline v-model="faPositionList[key]" /></td>
                          </tr>    
                          <tr>
                            <td>FR</td>
                            <td v-for="frItem,key in frPositionList" :key="key"><v-text-field outline v-model="frPositionList[key]" /></td>
                          </tr>   
                          <tr>
                            <td>T°</td>
                            <td v-for="tempItem,key in tempPositionList" :key="key"><v-text-field outline v-model="tempPositionList[key]" /></td>
                          </tr>  
                          <tr>
                            <td>PSO2</td>
                            <td v-for="posItem,key in pso2PositionList" :key="key"><v-text-field outline v-model="pso2PositionList[key]" /></td>
                          </tr>   
                          <tr>
                            <td>PCO2</td>
                            <td v-for="pcoItem,key in pco2PositionList" :key="key"><v-text-field outline v-model="pco2PositionList[key]" /></td>
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
                        <v-btn large color="primary" @click="addItemMedicine()">
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
                            <td>{{ props.item.medicine }}</td>
                            <td>
                              {{ props.item.dose }}
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
                        <v-text-field v-model="dose_solution" label="Dosis">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-btn large color="primary" @click="addItemSolution()">
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
                            <td>{{ props.item.solution }}</td>
                            <td>
                              {{ props.item.dose }}
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
</template>
<style>
  td {
    text-align: center;
    width: 7%;
  }
</style>
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
    medicine: "",
    dose: "",
    solution: "",
    dose_solution: "",
    itemsSolutions: [],
    itemsMedicines: [],
    taPositionList:Array(12),
    faPositionList:Array(12),
    frPositionList:Array(12),
    tempPositionList:Array(12),
    pso2PositionList:Array(12),
    pco2PositionList:Array(12),
    headersMedicines: [
      {
        text: "Medicamento Administrado",
        align: "center",
        sortable: false,
        value: "medicine",
      },
      {
        text: "Dosis",
        align: "center",
        value: "dose",
      },
      { text: "Acción", align: "center", value: "name", sortable: false },
    ],
    headersSolutions: [
      {
        text: "Soluciones Administradas",
        align: "center",
        sortable: false,
        value: "medicine",
      },
      {
        text: "Dosis",
        align: "center",
        value: "dose",
      },
      { text: "Acción", align: "center", value: "name", sortable: false },
    ],
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
    addItemMedicine() {
      this.itemsMedicines.push({
        medicine: this.medicine,
        dose: this.dose,
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
        solution: this.solution,
        dose: this.dose_solution,
      });
      this.solution = "";
      this.dose_solution = "";
    },
    deleteItemSolution(item) {
      const index = this.itemsSolutions.indexOf(item);
      this.itemsSolutions.splice(index, 1);
    },
  },
  watch: {
    taPositionList(val){
      console.log(val);
    },
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
