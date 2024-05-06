<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formDiagnosisOftRef"
      v-model="formDiagnosisOft"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.diagnostic")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs6 v-if="useListDiagnoses">
                <v-autocomplete
                  v-model="diagnostico"
                  :items="listDiagnoses"
                  :readonly="validateRead()"
                  :label="$t('title.diagnostic')"
                  persistent-hint
                  prepend-icon=""
                  return-object
                  :item-text="descriptionDx"
                  @change="selectDx"
                  :rules="[
                    (v) =>
                      !!v || validateLenghtTable || $t('title.field_required'),
                  ]"
                >
                </v-autocomplete>
              </v-flex>
              <v-flex xs3>
                <v-select
                  v-model="eyeDiagnoses"
                  :items="['OJO DERECHO', 'OJO IZQUIERDO', 'AMBOS OJOS']"
                  label="Post operatorio"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  v-model="dayPostOperatory"
                  :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
                  label="Dia post operatorio"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                  <v-slide-x-reverse-transition
                    slot="append-outer"
                    mode="out-in"
                  >
                    <v-btn
                      dark
                      small
                      icon
                      :disabled="Object.keys(diagnostico).length == 0 || !eyeDiagnoses"
                      color="grey white--text"
                      @click="appendListDiagnosis()"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-slide-x-reverse-transition>
                </v-select>
              </v-flex>
              <v-flex xs10 class="text-sm-left">
                <v-chip
                  v-for="chips in chipsDiagnostic"
                  :key="chips.code"
                  label
                >
                  {{ `${chips.code} - ${chips.diagnostic[localeLang]}` }}
                  <v-icon class="pl-1" size="20px" @click="deleteDx(chips)"
                    >close</v-icon
                  >
                </v-chip>
              </v-flex>
              <v-flex xs12 class="text-sm-left">
                <v-data-table
                  :headers="headers"
                  :items="diagnosisAssigned"
                  class="elevation-1"
                  rows-per-page-text="Filas por pagina"
                >
                  <template slot="items" slot-scope="props">
                    <td>
                      {{
                        `${props.item.code} - ${props.item.diagnostic[localeLang]}`
                      }}
                    </td>
                    <td class="justify-center layout px-0">
                      <v-icon
                        :disabled="validateRead()"
                        class="mt-3"
                        @click="deleteItem(props.item)"
                      >
                        delete
                      </v-icon>
                    </td>
                  </template>
                  <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                      {{ $t("content.diagnosis_required") }}
                    </v-alert>
                  </template>
                </v-data-table>
              </v-flex>
              <!-- <v-flex xs6 class="text-xs-center">
                        <v-card
                          color="info"
                          class="d-flex align-center"
                          dark
                        >
                            <v-card-title primary-title>
                                <span class="subheading">Incluye:</span>
                            </v-card-title>
                            <v-card-text>
                                <span v-for="(include, i) in includeDx" :key="i">{{include}}</span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs6 class="text-xs-center">
                        <v-card
                          color="error"
                          class="d-flex align-center"
                          dark
                        >
                            <v-card-title primary-title>
                                <span class="subheading">Descarta:</span>
                            </v-card-title>
                            <v-card-text>
                                <span v-for="(discard, i) in discardDx" :key="i">{{discard}}</span>
                            </v-card-text>
                        </v-card>
                    </v-flex> -->
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { EventBus } from "@/store/eventBus";
import * as diagnosesServ from "@/componentServs/diagnoses";
import * as consultationServ from "@/componentServs/consultation";
export default {
  name: "diagnosis_oft",
  data: () => ({
    formDiagnosisOft: false,
    diagnostico: {},
    levelDx: 0,
    codeDx: null,
    isEditing: true,
    chipsDiagnostic: [],
    listDiagnoses: [],
    includeDx: [],
    discardDx: [],
    diagnosisAssigned: [],
    selectedDiagnoses: false,
    eyeDiagnoses:null,
    dayPostOperatory:null,
    headers: [
      {
        text: "Diagnostico",
        align: "left",
        sortable: false,
        value: "name",
      },
      {
        text: "Acciones",
        align: "center",
        sortable: false,
        value: "name",
      },
    ],
    rules: {
      required: (v) => !!v || this.$t("title.field_required"),
    },
    useListDiagnoses: true,
    diagnosticoText: null,
  }),
  methods: {
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
    descriptionDx(item) {
      if (item.diagnostic) {
        // console.log("mensaje: ", typeof item.diagnostic)
        return `${item.code} - ${item.diagnostic[this.localeLang]}`;
      }
    },
    deleteItem(item) {
      const index = this.diagnosisAssigned.indexOf(item);
      confirm("¿Esta seguro que desea eliminar este diagnostico?") &&
        this.diagnosisAssigned.splice(index, 1);
    },
    appendListDiagnosis() {
        if (Object.keys(this.diagnostico).length > 0) {
          this.diagnostico.diagnostic.es = this.diagnostico.diagnostic.es+" - "+ this.eyeDiagnoses
          this.diagnosisAssigned.push(this.diagnostico);
          this.diagnostico = {};
          this.chipsDiagnostic = [];
          this.includeDx = [];
          this.discardDx = [];
          this.levelDx = 0;
          this.codeDx = null;
          this.eyeDiagnoses = null
          this.getDiagnoses();
        } else {
          alert("Debe Indicar el Diagnostigo");
          return;
        }
    },
    selectDx(val) {
      this.diagnostico = val;

      //if (val.level + 1 < 3 ) { Ya no se tomaran en cuenta los 3 niveles del IC10
      this.chipsDiagnostic.push(val);
      this.levelDx = val.level;
      this.codeDx = val.code;
      this.includeDx = val.include;
      this.discardDx = val.discard;
      // setTimeout(() => {
      //    this.diagnostico = {}
      // }, 50)
      this.selectedDiagnoses = true;
      this.getDiagnoses();
      //}
    },
    deleteDx(val) {
      this.chipsDiagnostic = this.chipsDiagnostic.filter((item) => {
        return item.level < val.level;
      });
      if (this.chipsDiagnostic.length > 0) {
        let position = this.chipsDiagnostic.length - 1;
        this.levelDx = this.chipsDiagnostic[position].level + 1;
        this.codeDx = this.chipsDiagnostic[position].code;
        this.diagnostico = {};
      } else {
        this.levelDx = 0;
        this.codeDx = null;
      }
      this.selectedDiagnoses = false;
      this.getDiagnoses();
    },
    getDiagnoses() {
      let objAux = {
        body: {
          level: 0,
        },
        token: {},
      };
      if (this.codeDx) objAux.body.code = this.codeDx;

      diagnosesServ
        .getDiagnoses(objAux)
        .then((result) => {
          // LO COMENTADO FILTRABA LOS RESULTADOS SOLO PARA MOSTRAR DIAGNOSTICOS DE OFTALMOLOGIA
          // if (this.levelDx == 0) {
          //     this.listDiagnoses = result.filter(item => {return item.code == 'H00-H59'})
          // } else this.listDiagnoses = result
          this.listDiagnoses = result.filter((x) => !x.disable);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
    saveDiagnosisOft() {
      return new Promise((resolve, reject) => {
        if (
          this.$refs.formDiagnosisOftRef.validate() &&
          this.diagnosisAssigned.length > 0
        ) {
          resolve({diagnostic:this.diagnosisAssigned,daysPostOperatory:this.dayPostOperatory});
        } else {
          reject(false);
        }
      });
    },
    setDataConsultation() {
      if (this.storeConsultation.diagnostic) {
        this.diagnosisAssigned = this.storeConsultation.diagnostic;
        this.dayPostOperatory = this.storeConsultation.daysPostOperatory
      }
    },
  },
  mounted() {
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setDataConsultation();
    });
  },
  computed: {
    validateLenghtTable() {
      if (this.diagnosisAssigned.length > 0) return true;
      else return false;
    },
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
    localeLang() {
      return this.$i18n.locale;
    },
    tabsActive() {
      return this.$store.getters.getTabsValidate;
    },
    getPhisician() {
      return this.$store.getters.getPhysician;
    },
  },
  created() {
    this.getDiagnoses();
    let objAux = {
      body: {
        person: this.$store.getters.getPatient._id,
      },
      token: sessionStorage.getItem("pussy"),
    };
    consultationServ.getLastConsultation(objAux).then((result) => {
      if (result && result.diagnostic && result.diagnostic.length > 0) {
        let disct = result.diagnostic;
        for (let i in disct) {
          this.diagnosisAssigned.push(disct[i]);
        }
      }
    });
  },
};
</script>
