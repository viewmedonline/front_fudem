<template>
  <v-form autocomplete="off" ref="formPrescription" v-model="formPrescription" lazy-validation>
    <v-card class="rounded-lg elevation-2">
      <v-card-title primary-title class="primary darken-1">
        <span class="text-h6 white--text font-weight-medium">Medicamentos</span>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-text class="pa-4">
        <v-container>
          <v-layout row wrap>
            <v-flex xs8 v-if="useListMedicines">
              <v-autocomplete
                v-model="medications"
                :items="items"
                :readonly="validateRead()"
                :label="$t('title.medications')"
                dense
                outlined
                :hide-details="true"
                return-object
                item-text="description"
                @change="selectMedicine"
              >
                <template v-slot:item="{ item }">
                  <div class="pa-2">
                    <div class="text-subtitle-1">{{ item.description }}</div>
                    <div class="text-caption grey--text">{{ item.generic }}</div>
                  </div>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs8 v-else>
              <v-text-field
                :readonly="validateRead()"
                v-model="medications"
                :label="$t('title.medications')"
                dense
                outlined
                :hide-details="true"
              ></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-switch
                :readonly="validateRead()"
                label="Lista Precargada"
                v-model="useListMedicines"
                inset
                dense
              ></v-switch>
            </v-flex>

            <v-flex xs2>
              <v-text-field
                type="number"
                label="Administrar"
                max="10"
                min="1"
                v-model="dispense"
                dense
                outlined
                :hide-details="true"
              ></v-text-field>
            </v-flex>

            <v-flex xs6>
              <v-radio-group v-model="presentation" row :rules="[rules.required]">
                <v-radio label="Gota(s)" value="Gota(s)" class="mr-2"></v-radio>
                <v-radio label="Gel" value="Gel" class="mr-2"></v-radio>
                <v-radio label="Tableta(s)" value="Tableta(s)" class="mr-2"></v-radio>
                <v-radio label="Ampolla(s)" value="Ampolla(s)"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs2>
              <v-select
                label="Cada"
                :items="hoursList"
                v-model="hours"
                dense
                outlined
                :hide-details="true"
              ></v-select>
            </v-flex>

            <v-flex xs6>
              <v-radio-group v-model="administration" row :rules="[rules.required]">
                <div class="text-subtitle-2 mb-2">Via de Administración:</div>
                <v-radio label="Oftálmica" value="Oftálmica" class="mr-2"></v-radio>
                <v-radio label="Oral" value="Oral" class="mr-2"></v-radio>
                <v-radio label="Intramuscular" value="Intramuscular"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs6>
              <v-radio-group v-model="eyeApplication" row>
                <div class="text-subtitle-2 mb-2">Aplicación en:</div>
                <v-radio label="Ojo Izq" value="Ojo Izq" class="mr-2"></v-radio>
                <v-radio label="Ojo Der" value="Ojo Der" class="mr-2"></v-radio>
                <v-radio label="Ambos Ojos" value="Ambos Ojos"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs2 row>
              <v-text-field
                type="number"
                label="Numero de dias que se aplicara el tratamiento"
                min="1"
                :rules="!isPermanent ? [rules.required] : []"
                v-model="treatmentDays"
                dense
                outlined
                :hide-details="true"
              ></v-text-field>
            </v-flex>

            <v-flex xs2>
              <v-switch
                :readonly="validateRead()"
                label="Permanente"
                v-model="isPermanent"
                inset
                dense
              ></v-switch>
            </v-flex>

            <v-flex xs2 row>
              <v-text-field
                type="number"
                label="Cantidad"
                min="1"
                :rules="[rules.required]"
                v-model="quantity"
                dense
                outlined
                :hide-details="true"  
              ></v-text-field>
            </v-flex>

            <v-flex xs4 row>
              <v-radio-group v-model="eyeApplication" row>
                <v-radio label="Fco" value="Fco" class="mr-2"></v-radio>
                <v-radio label="Tbo" value="Tbo" class="mr-2"></v-radio>
                <v-radio label="Tab" value="Tab" class="mr-2"></v-radio>
                <v-radio label="Amp" value="Amp"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs12>
              <v-textarea
                label="Recomendaciones"
                v-model="recomendations"
                rows="3"
                outlined
                dense
                :hide-details="true"
              ></v-textarea>
            </v-flex>

            <v-flex xs12>
              <v-btn
                color="primary"
                @click="appendListMedicines"
                class="text-none"
                small
              >
                <v-icon left small>mdi-plus</v-icon>
                Añadir
              </v-btn>
            </v-flex>

            <v-flex xs12 class="text-sm-left">
              <v-data-table
                :headers="headers"
                :items="prescription"
                class="elevation-1 rounded-lg"
                :items-per-page="5"
                :footer-props="{
                  'items-per-page-text': 'Filas por pagina'
                }"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="py-3">
                      <div class="font-weight-medium">{{ item.medicine }}</div>
                      <div class="text-caption grey--text">{{ item.active_ingredient }}</div>
                    </td>
                    <td>{{ item.doses }}</td>
                    <td>{{ item.recomendation }}</td>
                    <td class="text-center">
                      <v-btn
                        icon
                        small
                        color="error"
                        :disabled="validateRead()"
                        @click="deleteItem(item)"
                      >
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import {
  getMedicines,
  findPrescriptions,
  savePrescriptions,
  updatePrescriptions,
} from "../../componentServs/medicines";
export default {
  props: {
    type: String,
  },
  name: "prescription",
  data() {
    return {
      formPrescription: false,
      useListMedicines: false,
      assignedMedicines: [],
      assignedRecetas: [],
      medications: null,
      presentation: null,
      recomendations: null,
      dispense: null,
      hours: null,
      administration: null,
      treatmentDays: null,
      eyeApplication: null,
      prescription: [],
      hoursList: [
        "1 Hora",
        "2 Horas",
        "4 Horas",
        "6 Horas",
        "8 Horas",
        "12 Horas",
        "24 Horas",
      ],
      headers: [
        {
          text: "Medicinas",
          align: "left",
          sortable: false,
          value: "medicine",
        },
        {
          text: "Dosis",
          align: "left",
          sortable: false,
          value: "active_ingredient",
        },
        {
          text: "Recomendaciones",
          align: "left",
          sortable: false,
          value: "recomendation",
        },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "name",
        },
      ],
      items: [],
      rules: {
        required: (v) => !!v || this.$t("title.field_required"),
      },
      isPermanent: false,
      quantity: 1
    };
  },
  computed: {
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
  },
  mounted() {
    this.getListMedicines();
    this.setPresciption();
  },
  watch: {
    treatmentDays() {
      this.isPermanent = false;
    },
    isPermanent() {
      this.treatmentDays = null;
    },
  },
  methods: {
    selectMedicine() {
      this.recomendations = this.medications.recomendation;
    },
    async getListMedicines() {
      try {
        this.items = await getMedicines(this.type);
      } catch (error) {
        console.log(error);
      }
    },
    async setPresciption() {
      const prescriptionId =
        this.type == 1
          ? this.storeConsultation.prescription
          : this.storeConsultation.prescription_of;
      if (prescriptionId) {
        let row = await findPrescriptions(prescriptionId);
        this.prescription = row[0].prescription;
      }
    },
    savePrescription() {
      const objSave = {
        prescription: this.prescription,
        place: this.$store.getters.getSucursal,
        patient: this.$store.getters.getPatient._id,
        responsible: this.$store.getters.getPhysician._id,
      };
      return new Promise(async (resolve, reject) => {
        if (this.prescription.length > 0) {
          let response;
          const prescriptionId =
            this.type == 1
              ? this.storeConsultation.prescription
              : this.storeConsultation.prescription_of;
          if (prescriptionId) {
            //update
            response = await updatePrescriptions(objSave, prescriptionId);
            resolve([{ _id: prescriptionId }]);
          }
          response = await savePrescriptions(objSave);
          resolve(response);
        } else {
          reject(null);
        }
      });
    },
    clearForm() {
      this.medications = null;
      this.presentation = null;
      this.dispense = null;
      this.hours = null;
      this.administration = null;
      this.treatmentDays = null;
      this.eyeApplication = null;
      this.recomendations = null;
      this.$refs.formPrescription.resetValidation();
    },
    deleteItem(item) {
      const index = this.assignedMedicines.indexOf(item);

      confirm("¿Esta seguro que desea eliminar este medicamento?") &&
        this.prescription.splice(index, 1);
    },
    appendListMedicines() {
      if (this.$refs.formPrescription.validate()) {
        const application = this.eyeApplication
          ? ` - ${this.eyeApplication}`
          : "";
        const doses = `${this.dispense} ${this.presentation} cada ${this.hours} - Vía ${this.administration} ${application} - durante ${this.treatmentDays} día(s)`;
        // this.assignedMedicines.unshift(
        //   this.medications.description || this.medications
        // );
        // this.assignedRecetas.unshift(doses);
        const existeMedicamento = this.prescription.find(
          (prescripcion) =>
            prescripcion.medicine ===
            (this.medications.description || this.medications)
        );

        if (!existeMedicamento) {
          this.prescription.push({
            medicine: this.medications.description || this.medications,
            doses: doses,
            recomendation: this.recomendations,
          });
        }

        this.medications = null;
        this.clearForm();
      }
    },
    validateRead() {
      switch (this.tabsActive) {
        case "optometrist":
          if (this.getPhisician.role == this.tabsActive) {
            return false;
          } else return true;
          break;
        case "ophthalmology":
          if (this.getPhisician.role == "ophthalmologist") {
            return false;
          } else return true;
          break;
        case "preliminary":
          if (
            this.storeConsultation.objPreliminary ||
            (this.getPhisician.role !== "Admision" &&
              this.$store.getters.getTypeConsulting != "E")
          )
            return true;
          else return false;
          break;
      }
    },
  },
};
</script>
