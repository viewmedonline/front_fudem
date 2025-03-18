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
              <v-autocomplete v-model="medications" :items="items" :readonly="validateRead()"
                :rules="useListMedicines ? [rules.required] : []" :label="$t('title.medications')" dense outlined
                :hide-details="true" return-object item-text="description" @change="selectMedicine">
                <template v-slot:item="{ item }">
                  <div class="pa-2">
                    <div class="text-subtitle-1">{{ item.description }} - ({{ item.generic }})</div>
                  </div>
                </template>
                <template v-slot:selection="{ item }">
                  <div class="pa-2">
                    <div class="text-subtitle-1">{{ item.description }} - ({{ item.generic }})</div>
                  </div>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs8 v-else>
              <v-text-field :readonly="validateRead()" v-model="medications" :label="$t('title.medications')" dense
                outlined :hide-details="true" :rules="!useListMedicines ? [rules.required] : []"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-switch :readonly="validateRead()" label="Lista Precargada" v-model="useListMedicines" inset
                dense></v-switch>
            </v-flex>
            <v-flex xs2>
              <v-text-field type="number" label="Administrar" max="10" min="1" :rules="[]" v-model="dispense" dense
                outlined :hide-details="true"></v-text-field>
            </v-flex>

            <v-flex xs6>
              <v-radio-group v-model="presentation" row :rules="useListMedicines ? [rules.required] : []">
                <v-radio v-for="item in medicinePresentations" :key="item.id" :label="item.description"
                  :value="item.description" class="mr-2"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs2>
              <v-select label="Cada" :items="hoursList" v-model="hours" dense outlined :hide-details="true"></v-select>
            </v-flex>

            <v-flex xs6>
              <v-radio-group v-model="administration" row :rules="useListMedicines ? [rules.required] : []">
                <div class="text-subtitle-2 mb-2">Via de Administración:</div>
                <v-radio v-for="item in medicineAdministrations" :key="item.id" :label="item.description"
                  :value="item.description" class="mr-2"></v-radio>
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
              <v-text-field type="number" label="Numero de dias que se aplicara el tratamiento" min="1"
                :rules="useListMedicines && !isPermanent ? [rules.required] : []" v-model="treatmentDays" dense outlined :disabled="isPermanent"
                :hide-details="true"></v-text-field>
            </v-flex>

            <v-flex xs2>
              <v-switch :readonly="validateRead()" label="Permanente" v-model="isPermanent" inset dense></v-switch>
            </v-flex>

            <v-flex xs2 row>
              <v-text-field type="number" label="Cantidad" min="1" v-model="quantity" dense outlined
                :hide-details="true"></v-text-field>
            </v-flex>

            <v-flex xs4 row>
              <v-radio-group v-model="typePrescription" row>
                <v-radio label="Fco" value="Fco" class="mr-2"></v-radio>
                <v-radio label="Tbo" value="Tbo" class="mr-2"></v-radio>
                <v-radio label="Tab" value="Tab" class="mr-2"></v-radio>
                <v-radio label="Amp" value="Amp"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs12>
              <v-textarea label="Recomendaciones" v-model="recomendations" rows="3" outlined dense
                :hide-details="true"></v-textarea>
            </v-flex>

            <v-flex xs12>
              <v-btn color="primary" @click="appendListMedicines" class="text-none" small>
                <v-icon left small>mdi-plus</v-icon>
                Añadir
              </v-btn>
            </v-flex>
            <v-flex xs12 class="text-sm-left">
              <v-data-table :headers="headers" :items="prescription" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.medicine }}</td>
                  <td class="text-xs-left">{{ props.item.doses }}</td>
                  <td class="text-xs-left">{{ props.item.recomendation }}</td>
                  <td class="text-xs-center">
                    <v-icon small class="mr-2" @click="deleteItem(props.item)" :disabled="validateRead()">
                      delete
                    </v-icon>
                  </td>
                </template>
                <template slot="no-data">
                  <v-alert :value="true" color="error" icon="warning">
                    No hay datos disponibles
                  </v-alert>
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
import { getMedicineAdministration, getMedicinePresentations } from "../../componentServs/master";
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
      dispense: 1,
      hours: null,
      administration: 1,
      treatmentDays: null,
      eyeApplication: null,
      typePrescription: null,
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
          value: "medicine",
          sortable: false,
          align: 'left'
        },
        {
          text: "Dosis",
          value: "doses",
          sortable: false,
          align: 'left'
        },
        {
          text: "Recomendaciones",
          value: "recomendation",
          sortable: false,
          align: 'left'
        },
        {
          text: "Acciones",
          value: "action",
          sortable: false,
          align: 'center'
        }
      ],
      items: [],
      rules: {
        required: (v) => !!v || this.$t("title.field_required"),
      },
      isPermanent: false,
      quantity: null,
      pagination: {
        rowsPerPage: 5
      },
      medicinePresentations: [],
      medicineAdministrations: [],
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
    this.getMedicinePresentations();
    this.getMedicineAdministration();
  },
  watch: {
    medications(val) {
      if (val && typeof val === "object" && val.administration.length > 0 && val.presentation.length > 0) {
        this.medicineAdministrations = this.medicineAdministrations
        this.medicinePresentations = this.medicinePresentations
        this.presentation = val.presentation
        this.administration = val.administration
      }
    },
    useListMedicines(val) {
      this.medications = null;
      this.$refs.formPrescription.resetValidation();
      if (!val) {
        this.getMedicinePresentations();
        this.getMedicineAdministration();
      }

    },
    // treatmentDays() {
    //   if (this.isPermanent) {
    //     this.isPermanent = false; 
    //     this.$refs.formPrescription.resetValidation();
    //   }
    // },
    isPermanent() {
      this.treatmentDays = null;
      this.$refs.formPrescription.resetValidation();
    },
  },
  methods: {
    getMedicinePresentations() {
      getMedicinePresentations({}).then((result) => {
        this.medicinePresentations = result;
      });
    },
    getMedicineAdministration() {
      getMedicineAdministration({}).then((result) => {
        this.medicineAdministrations = result;
      });
    },
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
      this.dispense = null;
      this.presentation = null;
      this.hours = null;
      this.administration = 1;
      this.treatmentDays = null;
      this.eyeApplication = null;
      this.typePrescription = null;
      this.recomendations = null;
      this.quantity = null;
      this.isPermanent = false;
      this.$refs.formPrescription.reset();
      this.$refs.formPrescription.resetValidation();
      this.getMedicinePresentations();
      this.getMedicineAdministration();
    },
    deleteItem(item) {
      const index = this.prescription.findIndex(prescripcion =>
        prescripcion.medicine === item.medicine &&
        prescripcion.doses === item.doses
      );

      if (index !== -1) {
        if (confirm("¿Está seguro que desea eliminar este medicamento?")) {
          this.prescription.splice(index, 1);
        }
      }
    },
    dailyMedicationDoses(value) {
      const [number, units] = value.split(' ')
      const quantity = 24 / parseInt(number)
      return `${quantity} veces al dia`
    },
    appendListMedicines() {
      if (this.$refs.formPrescription.validate()) {
        // Validate that required fields for constructing doses string are filled in
        if (!this.useListMedicines || 
            (this.presentation && 
             this.hours && 
             this.administration && 
             (this.isPermanent || this.treatmentDays))) {
          
          // Optional fields validation
          const application = this.eyeApplication
            ? ` - ${this.eyeApplication}`
            : "";
          
          const duration = this.isPermanent 
            ? "Medicamento Permanente" 
            : this.treatmentDays 
              ? `Durante ${this.treatmentDays} día(s)` 
              : "";
          
          const dispense = this.dispense ? this.dispense : "";
          
          const quantityDoses = this.hours 
            ? this.dailyMedicationDoses(this.hours) 
            : "";
          
          const quantity = this.quantity && this.typePrescription 
            ? `- ${this.quantity} ${this.typePrescription}` 
            : '';
          
          // Construct doses string based on available values
          let doses = "";
          
          if (dispense && this.presentation) {
            doses += `${dispense} ${this.presentation}`;
          }
          
          if (this.hours) {
            doses += ` cada ${this.hours}`;
            if (quantityDoses) {
              doses += ` (${quantityDoses})`;
            }
          }
          
          if (this.administration) {
            doses += ` - Vía ${this.administration}${application}`;
          }
          
          if (duration) {
            doses += ` - ${duration}`;
          }
          
          if (quantity) {
            doses += ` ${quantity}`;
          }
          
          // Check if medication already exists
          const existeMedicamento = this.prescription.find(
            (prescripcion) =>
              prescripcion.medicine ===
              (this.medications && typeof this.medications === 'object' 
                ? this.medications.description 
                : this.medications)
          );

          if (!existeMedicamento && this.medications) {
            // Format medicine string based on the type of medications (object or string)
            let medicine = "";
            if (this.medications && typeof this.medications === 'object') {
              medicine = `${this.medications.description || ''} ${this.medications.generic ? '- ' + this.medications.generic : ''}`;
            } else {
              medicine = this.medications || '';
            }
            
            if (medicine.trim() !== '') {
              this.prescription.push({
                medicine: this.medications.description || '',
                active_ingredient: this.medications.generic || '',
                doses: doses.trim(),
                recomendation: this.recomendations || ''
              });
            }
          }

          this.medications = null;
          this.clearForm();
        } else {
          // Show validation message if fields are missing
          this.$store.dispatch("setSnackbar", {
            show: true,
            text: "Por favor complete los campos necesarios para la dosis",
            color: "error"
          });
        }
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
