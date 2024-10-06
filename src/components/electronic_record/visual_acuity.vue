<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formVisualAcuityRef"
      v-model="formVisualAcuity"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.visual_acuity")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs3 offset-xs2>
                <span class="body-2">{{ $t("title.no_correction") }}</span>
              </v-flex>
              <v-flex xs3>
                <span class="body-2">{{ $t("title.with_correction") }}</span>
              </v-flex>
              <v-flex xs3>
                <span class="body-2">Optotipo</span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                {{ $t("title.re") }}:
              </v-flex>
              <v-flex xs3>
                <v-select
                  v-model="visualAcuity.ojoDer.sinCorreccion"
                  :items="listAv"
                  :readonly="validateRead()"
                  :rules="validateRequired"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  v-model="visualAcuity.ojoDer.correccion"
                  :items="listAv"
                  :readonly="validateRead()"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  v-model="visualAcuity.ojoDer.optotipo"
                  :items="listOptotipo"
                  :readonly="validateRead()"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                {{ $t("title.le") }}:
              </v-flex>
              <v-flex xs3>
                <v-select
                  v-model="visualAcuity.ojoIzq.sinCorreccion"
                  :items="listAv"
                  :readonly="validateRead()"
                  :rules="validateRequired"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  v-model="visualAcuity.ojoIzq.correccion"
                  :items="listAv"
                  :readonly="validateRead()"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  v-model="visualAcuity.ojoIzq.optotipo"
                  :items="listOptotipo"
                  :readonly="validateRead()"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex offset-xs3 xs6>
                <v-textarea
                  outline
                  name="input-7-1"
                  v-model="visualAcuity.observation"
                  :label="$t('title.observations')"
                  :hint="$t('title.general_observation')"
                  :readonly="validateRead()"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { EventBus } from "@/store/eventBus";
export default {
  name: "visual_acuity",
  data() {
    return {
      formVisualAcuity: false,
      visualAcuity: {
        ojoDer: {
          sinCorreccion: null,
          correccion: null,
          optotipo: null,
        },
        ojoIzq: {
          sinCorreccion: null,
          correccion: null,
          optotipo: null,
        },
        observation: null,
      },
      listAv: [
        "20/15",
        "20/20",
        "20/25",
        "20/30",
        "20/40",
        "20/50",
        "20/60",
        "20/70",
        "20/80",
        "20/90",
        "20/100",
        "20/150",
        "20/200",
        "20/400",
        "20/800",
        "20/1600",
        "20/3200",
        "Cuenta dedos",
        "Mov. Manos",
        "Percepcion a Luz",
        "No Percepcion a Luz",
        "No Colabora",
        "No Aplica",
        "Fija y sigue movimientos",
        "Protesis",
      ],
      listOptotipo: ["Números", "Letras", "E direccional", "Figuras"],
      rules: {
        required: (v) => !!v || this.$t("title.field_required"),
      },
    };
  },
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
          if (this.getPhisician.role !== "Admision") {
            if (this.$store.getters.getTypeConsulting != "E") {
              return true;
            } else if (this.$store.getters.getTypeConsulting == "E") {
              if (this.storeConsultation.objPreliminary) {
                if (this.storeConsultation.objPreliminary.data) return true;
                else return false;
              }
            }
          } else if (this.storeConsultation.objPreliminary) {
            if (this.storeConsultation.objPreliminary.data) return true;
            else return false;
          }
          break;
      }
    },
    saveVisualAcuity() {
      return new Promise((resolve, reject) => {
        if (this.$refs.formVisualAcuityRef.validate()) {
          resolve(this.visualAcuity);
        } else {
          reject(false);
        }
      });
    },
    setVisualAcuity() {
      if (
        this.storeConsultation.objPreliminary &&
        this.tabsActive == "preliminary"
      ) {
        if (this.storeConsultation.objPreliminary.data)
          this.visualAcuity =
            this.storeConsultation.objPreliminary.data.agudezaVisual;
        else if (this.storeConsultation.agudezaVisual)
          this.visualAcuity = this.storeConsultation.agudezaVisual;
      } else if (this.storeConsultation.agudezaVisual)
        this.visualAcuity = this.storeConsultation.agudezaVisual;
    },
  },
  mounted() {
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setVisualAcuity();
    });
  },
  computed: {
    tabsActive() {
      return this.$store.getters.getTabsValidate;
    },
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
    getPhisician() {
      return this.$store.getters.getPhysician;
    },
    validateRequired() {
      if (this.$store.getters.getTypeConsulting == "E") return [];
      else return [this.rules.required];
    },
  },
};
</script>
