<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formDiagnosisRef"
      v-model="formDiagnosis"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.diagnosis_and_observations")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs12 text-sm-left>
                <span class="body-2">{{ $t("title.right_eye") }}</span>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.hyperopia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[0].eyeRight"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.myopia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[1].eyeRight"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.astigmatism')}`"
                  v-model="diagnosticoObservaciones.diagnostico[2].eyeRight"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.presbyopia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[3].eyeRight"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.emmetropia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[4].eyeRight"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.amblyopia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[5].eyeRight"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.anisometropia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[6].eyeRight"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${capilatize($t('antecedent.squint'))}`"
                  v-model="diagnosticoObservaciones.diagnostico[7].eyeRight"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 text-sm-left>
                <span class="body-2">{{ $t("title.left_eye") }}</span>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.hyperopia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[0].eyeLeft"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.myopia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[1].eyeLeft"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.astigmatism')}`"
                  v-model="diagnosticoObservaciones.diagnostico[2].eyeLeft"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.presbyopia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[3].eyeLeft"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.emmetropia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[4].eyeLeft"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.amblyopia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[5].eyeLeft"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${$t('antecedent.anisometropia')}`"
                  v-model="diagnosticoObservaciones.diagnostico[6].eyeLeft"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  :label="`${capilatize($t('antecedent.squint'))}`"
                  v-model="diagnosticoObservaciones.diagnostico[7].eyeLeft"
                  :readonly="validateRead()"
                ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs12 sm8>
                <v-textarea
                  name="input-7-1"
                  :label="$t('title.observations')"
                  v-model="diagnosticoObservaciones.Observaciones"
                  outline
                  :rules="[]"
                  :hint="$t('title.write_your_observations')"
                  :readonly="validateRead()"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <prescription type="1" ref="prescriptionRef" />
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.observationsOphthalmology")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout align-center justify-center row fill-height>
              <v-layout align-center justify-center row fill-height>
                <v-flex xs12 sm8>
                  <v-textarea
                    name="input-7-1"
                    :label="$t('title.observationsOphthalmology')"
                    v-model="observationsOphthalmology"
                    outline
                    :rules="[]"
                    :hint="$t('title.observationsOphthalmology')"
                    :readonly="validateRead()"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize"
            >¿Se dió Receta?</span
          >
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout align-center row fill-height>
              <v-flex xs6>
                <v-radio-group v-model="receta" row :readonly="validateRead()">
                  <v-radio label="Si" color="success" value="SI"></v-radio>
                  <v-radio label="No" color="red" value="NO"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6>
                <v-radio-group
                  v-model="refer_to_ofta"
                  label="¿Se refiere a oftalmologo?"
                  row
                  :readonly="validateRead()"
                >
                  <v-radio label="Si" color="success" value="SI"></v-radio>
                  <v-radio label="No" color="red" value="NO"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
const prescription = () =>
  import("@/components/electronic_record/prescription");

import { EventBus } from "@/store/eventBus";
export default {
  components: {
    prescription,
  },
  name: "diagnosis",
  data() {
    return {
      refer_to_ofta: null,
      formDiagnosis: false,
      rules: {
        required: (v) => false, // !!v || this.$t('title.field_required')
      },
      diagnosticoObservaciones: {
        diagnostico: [
          {
            name: "hyperopia",
            eyeRight: false,
            eyeLeft: false,
          },
          {
            name: "myopia",
            eyeRight: false,
            eyeLeft: false,
          },
          {
            name: "astigmatism",
            eyeRight: false,
            eyeLeft: false,
          },
          {
            name: "presbyopia",
            eyeRight: false,
            eyeLeft: false,
          },
          {
            name: "emmetropia",
            eyeRight: false,
            eyeLeft: false,
          },
          {
            name: "amblyopia",
            eyeRight: false,
            eyeLeft: false,
          },
          {
            name: "anisometropia",
            eyeRight: false,
            eyeLeft: false,
          },
          {
            name: "squint",
            eyeRight: false,
            eyeLeft: false,
          },
        ],
        Observaciones: null,
      },
      observationsOphthalmology: null,
      receta: "NO",
      prescriptionRef: null,
    };
  },
  methods: {
    capilatize: (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(),
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
    saveDiagnosis() {
      return new Promise(async (resolve, reject) => {
        if (this.$refs.formDiagnosisRef.validate()) {
          let dataPrescription;
          try {
            dataPrescription =
              await this.$refs.prescriptionRef.savePrescription();
          } catch (error) {
            dataPrescription = null;
          }

          let objAux = {
            diagnosticoObservaciones: this.diagnosticoObservaciones,
            observationsOphthalmology: this.observationsOphthalmology,
            refer_to_ofta: this.refer_to_ofta,
            receta: this.receta,
            prescription: dataPrescription ? dataPrescription[0]._id : null,
          };
          resolve(objAux);
        } else {
          reject(false);
        }
      });
    },
    setDiagnostics() {
      if (this.storeConsultation.refer_to_ofta) {
        this.refer_to_ofta = this.storeConsultation.refer_to_ofta;
      }
      if (this.storeConsultation.diagnosticoObservaciones) {
        if (
          this.storeConsultation.diagnosticoObservaciones.diagnostico.length > 0
        )
          this.diagnosticoObservaciones =
            this.storeConsultation.diagnosticoObservaciones;
      }
      if (this.storeConsultation.observationsOphthalmology) {
        this.observationsOphthalmology =
          this.storeConsultation.observationsOphthalmology;
      }
      if (this.storeConsultation.receta) {
        this.receta = this.storeConsultation.receta;
      }
    },
  },
  mounted() {
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setDiagnostics();
    });
  },
  computed: {
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
    tabsActive() {
      return this.$store.getters.getTabsValidate;
    },
    getPhisician() {
      return this.$store.getters.getPhysician;
    },
  },
};
</script>
