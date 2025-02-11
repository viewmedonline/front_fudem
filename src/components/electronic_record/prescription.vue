<template>
  <v-form autocomplete="off" ref="formPrescription" v-model="formPrescription" lazy-validation>
    <v-card class="elevation-3">
      <v-card-title primary-title class="blue-grey darken-1">
        <span class="subheading white--text text-capitalize">Medicamentos</span>
      </v-card-title>
      <v-divider light class="vm-border-color-2"></v-divider>
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs8 v-if="useListMedicines">
              <v-autocomplete v-model="medications" :items="items" :readonly="validateRead()"
                :label="$t('title.medications')" persistent-hint prepend-icon="" return-object item-text="description"
                @change="selectMedicine">
                <template v-slot:item="{ item }">
                  <div class="medicine-item">
                    <span class="medicine-name">{{ item.description }}</span>
                    <span class="medicine-details">
                      ({{ item.generic }})
                    </span>
                  </div>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs8 v-else>
              <v-text-field :readonly="validateRead()" v-model="medications" :label="$t('title.medications')">
                <!-- <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                  <v-btn
                    dark
                    small
                    icon
                    color="grey white--text"
                    @click="appendListMedicines"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-slide-x-reverse-transition> -->
              </v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-checkbox :readonly="validateRead()" label="Lista Precargada" v-model="useListMedicines"></v-checkbox>
            </v-flex>
            <v-flex xs2>
              <v-text-field type="number" label="Administrar" max="10" min="1" v-model="dispense"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-radio-group v-model="presentation" row :rules="[rules.required]">
                <v-radio label="Gota(s)" value="Gota(s)"></v-radio>
                <v-radio label="Gel" value="Gel"></v-radio>
                <v-radio label="Tableta(s)" value="Tableta(s)"></v-radio>
                <v-radio label="Ampolla(s)" value="Ampolla(s)"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs2>
              <v-select label="Cada" :items="hoursList" v-model="hours"></v-select>
            </v-flex>
            <v-flex xs6>
              <v-radio-group v-model="administration" row :rules="[rules.required]" label="Via de Administración:">
                <v-radio label="Oftálmica" value="Oftálmica"></v-radio>
                <v-radio label="Oral" value="Oral"></v-radio>
                <v-radio label="Intramuscular" value="Intramuscular"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs6>
              <v-radio-group v-model="eyeApplication" row label="Aplicación en:">
                <v-radio label="Ojo Izq" value="Ojo Izq"></v-radio>
                <v-radio label="Ojo Der" value="Ojo Der"></v-radio>
                <v-radio label="Ambos Ojos" value="Ambos Ojos"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs4 row>
              <v-text-field type="number" label="Numero de dias que se aplicara el tratamiento" min="1"
                :rules="[rules.required]" v-model="treatmentDays"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea label="Recomendaciones" v-model="recomendations"></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-btn dark small color="primary" @click="appendListMedicines">
                Añadir
                <v-icon>add</v-icon>
              </v-btn>
              <!-- <v-btn dark small color="primary" @click="savePrescription">
                save
                <v-icon>add</v-icon>
              </v-btn> -->
            </v-flex>
            <v-flex xs12 class="text-sm-left">
              <v-data-table :headers="headers" :items="prescription" class="elevation-1"
                rows-per-page-text="Filas por pagina">
                <template slot="items" slot-scope="props">
                  <td>
                    {{ props.item.medicine }} -
                    {{ props.item.active_ingredient }}
                  </td>
                  <td>
                    {{ props.item.doses }}
                  </td>
                  <td>
                    {{ props.item.recomendation }}
                  </td>
                  <td class="justify-center layout px-0">
                    <v-icon :disabled="validateRead()" class="mt-3" @click="deleteItem(props.item)">
                      delete
                    </v-icon>
                  </td>
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
