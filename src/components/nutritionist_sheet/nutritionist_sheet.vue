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
              <v-flex xs12>
                <v-textarea
                  outline
                  v-model="diagnosisReference"
                  label="Diagnósticos de Referencia"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <!-- <v-card-title primary-title class="blue-grey darken-1">
                  <span class="subheading white--text text-capitalize"
                    >Problemas actuales y antecedentes familiares</span
                  >
                </v-card-title> -->
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Problemas actuales y antecedentes familiares</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs3>
                        <v-checkbox v-model="colitis" label="Colitis">
                        </v-checkbox>
                      </v-flex>
                      <v-flex xs3>
                        <v-checkbox v-model="gastritis" label="Gastritis">
                        </v-checkbox>
                      </v-flex>
                      <v-flex xs3>
                        <v-checkbox
                          v-model="constipation"
                          label="Estreñimiento"
                        >
                        </v-checkbox>
                      </v-flex>
                      <v-flex xs3>
                        <v-checkbox v-model="diarrhea" label="Diarrea">
                        </v-checkbox>
                      </v-flex>
                      <v-flex xs3>
                        <v-checkbox v-model="diabetes" label="Diabetes">
                        </v-checkbox>
                      </v-flex>
                      <v-flex xs3>
                        <v-checkbox v-model="hta" label="Hipertension Arterial">
                        </v-checkbox>
                      </v-flex>
                      <v-flex xs6> </v-flex>
                      <v-flex xs6>
                        <v-text-field v-model="other" label="Otro">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Exámenes de laboratorio</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-text-field
                          v-model="previousSurgeries"
                          label="¿Cirugías previas?"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          v-model="currentMedication"
                          label="¿Toma algún tipo de medicamento?"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          v-model="medicationSince"
                          label="¿Desde cuándo?"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="glycemia" label="Glicemia">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="hemoglobin" label="Hemoglobina">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="triglycerides"
                          label="Trigliceridos"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="cholesterol" label="Colesterol">
                        </v-text-field>
                      </v-flex>

                      <v-flex xs3>
                        <v-text-field v-model="creatine" label="Creatina">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="uricAcid" label="Ácido Urico">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="albumin" label="Albumina">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="hematocytes" label="Hematocitos">
                        </v-text-field>
                      </v-flex>

                      <v-flex xs3>
                        <v-text-field v-model="hgli" label="H. Glicosilada">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="hdl" label="HDL"> </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="sodium" label="Sodio">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="ld" label="LD"> </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="calcium" label="Calcio">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model="magnesium" label="Magnesio">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Estilo de vida</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs3>
                        <v-select
                          v-model="activity"
                          class="text-field-width"
                          :items="activityList"
                          label="Actividad"
                          autocomplete
                        ></v-select>
                      </v-flex>
                      <v-flex xs3>
                        <v-menu
                          ref="menu"
                          v-model="menuDateFrom"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="timeFrom"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="timeFrom"
                              label="Desde"
                              prepend-icon="access_time"
                              value="12hr"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menuDateFrom"
                            v-model="timeFrom"
                            full-width
                            value="12hr"
                            @click:minute="$refs.menu.save(timeFrom)"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs3>
                        <v-menu
                          ref="menu2"
                          v-model="menuDateTo"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="timeTo"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="timeTo"
                              label="Hasta"
                              prepend-icon="access_time"
                              value="12hr"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menuDateTo"
                            v-model="timeTo"
                            full-width
                            value="12hr"
                            @click:minute="$refs.menu2.save(timeTo)"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          v-model="foodConsumed"
                          label="Alimentos Consumidos"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-btn large color="primary" @click="addItemActivity()">
                          Agregar
                        </v-btn>
                      </v-flex>
                      <v-flex xs12>
                        <v-data-table
                          :headers="headersActivity"
                          :items="itemsActivity"
                          class="elevation-1"
                        >
                          <template v-slot:items="props">
                            <td>{{ props.item.activity }}</td>
                            <td>
                              Hora Inicio: {{ props.item.horary.from }}
                              <span v-if="props.item.horary.to"
                                >Hora Final: {{ props.item.horary.to }}</span
                              >
                            </td>
                            <td>
                              {{ props.item.foot }}
                            </td>
                            <td>
                              <v-icon
                                small
                                @click="deleteItemActivity(props.item)"
                              >
                                delete
                              </v-icon>
                            </td>
                          </template>
                        </v-data-table>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Consumos (cantidades y frecuencias)</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-select
                          v-model="consumption"
                          autocomplete
                          class="text-field-width"
                          :items="consumedList"
                          label="Consumo"
                        ></v-select>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          v-model="quatityAndFrecuency"
                          label="Cantidad y Frecuencia"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-btn
                          large
                          color="primary"
                          @click="addItemConsumption()"
                        >
                          Agregar
                        </v-btn>
                      </v-flex>
                      <v-flex xs12>
                        <v-data-table
                          :headers="headersConsumption"
                          :items="itemsConsumption"
                          class="elevation-1"
                        >
                          <template v-slot:items="props">
                            <td>{{ props.item.consumption }}</td>
                            <td>
                              {{ props.item.quatityAndFrecuency }}
                            </td>
                            <td>
                              <v-icon
                                small
                                @click="deleteItemConsumption(props.item)"
                              >
                                delete
                              </v-icon>
                            </td>
                          </template>
                        </v-data-table>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Indicadores dietéticos</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-textarea
                          outline
                          v-model="unpleasantFood"
                          label="Alimentos que no son de su agrado"
                        ></v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          outline
                          v-model="allergicFood"
                          label="Alérgico a algún alimento"
                        ></v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          outline
                          v-model="intolerantFood"
                          label="Intolerante a algún alimento"
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize"
                      >Datos antropométricos</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="weight"
                          label="Peso (lb)"
                          @input="IMC"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="size"
                          label="Talla (cm)"
                          @input="IMC"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="goalWeight"
                          label="Peso meta (lb)"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          readonly
                          v-model="idealWeight"
                          label="Peso ideal (lb)"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          v-model="imc"
                          readonly
                          label="IMC (kg/m2)"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-select
                          v-model="nutritionalStatus"
                          class="'text-field-width'"
                          readonly
                          :items="nutritionalStatusList"
                          label="Estado de nutrición"
                        ></v-select>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="waistCircumference"
                          label="Circunferencia de cintura (cm)"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="cho"
                          label="CHO (%)"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="chon"
                          label="CHON (%)"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="cooh"
                          label="COOH (%)"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          outline
                          v-model="prescribedDiet"
                          label="Dieta Prescrita"
                        ></v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          outline
                          v-model="comments"
                          label="Comentarios"
                        ></v-textarea>
                      </v-flex>

                      <v-flex>
                        <v-btn
                          :loading="loading"
                          large
                          color="primary"
                          @click="saveNutritionistSheet()"
                        >
                          Guardar
                        </v-btn></v-flex
                      >
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
import {saveSheetNutritionist} from '../../componentServs/nutritionist'
import { getActivity, getComsumed } from "../../componentServs/master";
export default {
  name: "surgery_sheet",
  data: () => ({
    num_exp: "",
    pat_name: "",
    pat_age: "",
    pat_gender: "",
    form_pediatrics: false,
    colitis: false,
    timeFrom: null,
    menuDateFrom: false,
    timeTo: null,
    menuDateTo: false,
    foodConsumed: "",
    consumption: "",
    quatityAndFrecuency: "",
    activity: "",
    diagnosisReference:"",
    colitis:"",
    gastritis:"",
    constipation:"",
    diarrhea:"",
    diabetes:"",
    hta:"",
    other:"",
    previousSurgeries:"",
    currentMedication:"",
    medicationSince:"",
    glycemia:"",
    hemoglobin:"",
    triglycerides:"",
    cholesterol:"",
    creatine:"",
    uricAcid:"",
    albumin:"",
    hematocytes:"",
    hgli:"",
    hdl:"",
    sodium:"",
    ld:"",
    calcium:"",
    magnesium:"",
    activity:"",
    foodConsumed:"",
    unpleasantFood:"",
    allergicFood:"",
    intolerantFood:"",
    weight:"",
    size:"",
    goalWeight:"",
    idealWeight:"",
    imc:"",
    nutritionalStatus:"",
    waistCircumference:"",
    cho:"",
    chon:"",
    cooh:"",
    prescribedDiet:"",
    comments:"",
    rules: {
      required: (value) => !!value || "Este campo es requerido",
    },
    loading: false,
    size:"",
    weight:"",
    imc:"",
    activityList:[],
    consumedList:[],
    nutritionalStatus:"",
    nutritionalStatusList: ['Desnutricion I', 'Peso Normal', 'Sobrepeso','Obesidad Grado I','Obesidad Grado II','Obesidad Grado III'],
    itemsActivity: [],
    itemsConsumption: [],
    headersActivity: [
      {
        text: "Actividad",
        align: "center",
        sortable: false,
        value: "activity",
      },
      { text: "Horario", align: "center", value: "horary" },
      { text: "Alimentos Consumidos", align: "center", value: "foot" },
      { text: "Acción", align: "center", value: "name", sortable: false },
    ],
    headersConsumption: [
      {
        text: "Consumo",
        align: "center",
        sortable: false,
        value: "consumption",
      },
      {
        text: "Cantidad y Frecuencia",
        align: "center",
        value: "quatityAndFrecuency",
      },
      { text: "Acción", align: "center", value: "name", sortable: false },
    ],
  }),
  methods: {
    IMC() {
      if (this.size > 0 && this.weight > 0) {
        let alturaMts = this.size / 100;
        let pesoKg = this.weight * 0.453592
        let imc = pesoKg / (alturaMts * alturaMts);
        this.imc = imc.toFixed(1)
      }
    },
    addItemActivity() {
      this.itemsActivity.push({
        activity: this.activity,
        horary: {
          from: this.timeFrom,
          to: this.timeTo,
        },
        foot: this.foodConsumed,
      });
      this.activity = "";
      this.timeFrom = null;
      this.timeTo = null;
      this.foodConsumed = "";
    },
    deleteItemActivity(item) {
      const index = this.itemsActivity.indexOf(item);
      this.itemsActivity.splice(index, 1);
    },
    addItemConsumption() {
      this.itemsConsumption.push({
        consumption: this.consumption,
        quatityAndFrecuency: this.quatityAndFrecuency,
      });
      this.consumption = "";
      this.quatityAndFrecuency = "";
    },
    deleteItemConsumption(item) {
      const index = this.itemsConsumption.indexOf(item);
      this.itemsConsumption.splice(index, 1);
    },
    clear() {
      this.$refs.form.reset();
    },
    async saveNutritionistSheet() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        const objRequest = {
          name: "nutritionist_sheet.html",
          data: {
            num_exp: this.num_exp,
            pat_name: this.pat_name,
            pat_age: this.pat_age,
            pat_gender: this.pat_gender,
            date: moment().format("YYYY-MM-DD"),
            patient: this.$store.getters.getPatient._id,
            responsible: this.$store.getters.getPhysician._id,
            diagnosisRefer: this.diagnosisReference,
            colitis: this.colitis,
            gastritis: this.gastritis,
            constipation: this.constipation,
            diarrhea: this.diarrhea,
            diabetes: this.diabetes,
            hta: this.hta,
            otherRecords: this.other,
            previousSurgery: this.previousSurgeries,
            currentMedication: this.currentMedication,
            currentMedicationFrom: this.medicationSince,
            glycemia: this.glycemia,
            hemoglobin: this.hemoglobin,
            triglycerides: this.triglycerides,
            cholesterol: this.cholesterol,
            creatinine: this.creatine,
            uricAcid: this.uricAcid,
            albumin: this.albumin,
            hematocrit: this.hematocytes,
            glycosylatedh: this.hgli,
            hdl: this.hdl,
            sodium: this.sodium,
            ld: this.ld,
            calcium: this.calcium,
            magnesium: this.magnesium,
            unpleasantFoods: this.unpleasantFood,
            allergicFoods: this.allergicFood,
            intolerableFoods: this.intolerantFood,
            weight: this.weight,
            idealWeight: this.idealWeight,
            goalWeight: this.goalWeight,
            size: this.size,
            imc: this.imc,
            nutritionalStatus: this.nutritionalStatus,
            WaistCircumference: this.waistCircumference,
            cho: this.cho,
            chon: this.chon,
            cooh: this.cooh,
            prescribedDiet: this.prescribedDiet,
            comments: this.comments,
            lifestyle: this.itemsActivity,
            consumptionFrequency: this.itemsConsumption,            
            phy_name: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            digital_signature: this.$store.getters.getPhysician.digital_signature,
          }
        };  
        await saveSheetNutritionist(objRequest)      
        this.clear();
      }
      this.loading = false;
    },
  },
  watch: {
    imc(val){
      let valueResponse = ""
      if(val < 18) valueResponse = this.nutritionalStatusList[0]
      if(val >= 19 && val <= 24.9) valueResponse = this.nutritionalStatusList[1]
      if(val >= 25 && val <= 29.9) valueResponse = this.nutritionalStatusList[2]
      if(val >=  30  && val <= 34.9) valueResponse = this.nutritionalStatusList[3]
      if(val >=  35  && val <= 39.9) valueResponse = this.nutritionalStatusList[4]
      if(val >=  40 ) valueResponse = this.nutritionalStatusList[5]

      this.nutritionalStatus = valueResponse

      const idealWeightVar = this.pat_gender == "Masculino"  ? ((this.size-100)+3)*2.205 : ((this.size-100)-3)*2.205
      this.idealWeight = idealWeightVar.toFixed(1)
    },
    menuDateFrom(val) {
      if (!val) {
        this.timeFrom = moment(this.timeFrom, "HH:mm").format("hh:mm A");
      } else {
        if (this.timeFrom)
          this.timeFrom = moment(this.timeFrom, "hh:mm A").format("HH:mm");
      }
    },
    menuDateTo(val) {
      if (!val) {
        this.timeTo = moment(this.timeTo, "HH:mm").format("hh:mm A");
      } else {
        if (this.timeTo)
          this.timeTo = moment(this.timeTo, "hh:mm A").format("HH:mm");
      }
    },    
  },
  async mounted() {
    this.consumedList = await getComsumed()
    this.activityList = await getActivity()

    const { idQflow, forename, surname, birthdate, gender } =
      this.$store.getters.getPatient;
    this.num_exp = idQflow;
    this.pat_name = `${forename} ${surname}`;
    this.pat_age = moment().diff(birthdate, "years");
    this.pat_gender = (gender == "Male" || gender.toLowerCase() == "masculino") ? "Masculino" : "Femenino";
  },
};
</script>
