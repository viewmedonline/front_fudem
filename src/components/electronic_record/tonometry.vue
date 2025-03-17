<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formTonometryRef"
      v-model="formTonometry"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.tonometry")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs2 offset-xs1>
                <span class="body-2">{{ $t("title.auto_tonometry") }}</span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs1 text-sm-left class="vm-p-esp">
                {{ $t("title.re") }}:
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="tonometria.ojoDer"
                  :rules="[rules.required]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2 offset-xs2>
                <v-checkbox v-model="not_cooperate" label="No colabora">
                </v-checkbox>
              </v-flex>
              <v-flex xs2>
                <v-select
                  :disabled="!not_cooperate"
                  v-model="reason"
                  :items="reason_list"
                  label="Seleccione"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs1 text-sm-left class="vm-p-esp">
                {{ $t("title.le") }}:
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="tonometria.ojoIzq"
                  :readonly="validateRead()"
                  :rules="[rules.required]"
                >
                </v-text-field>
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
  name: "tonometry",
  data() {
    return {
      formTonometry: false,
      tonometria: {
        ojoDer: null,
        ojoIzq: null,
      },
      not_cooperate: null,
      reason: null,
      reason_list: [
        "Menor de edad",
        "Discapacidad",
        "Adulto mayor con dificultad",
      ],
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
    saveTonometry() {
      return new Promise((resolve, reject) => {
        if (this.$refs.formTonometryRef.validate()) {
          resolve({
            tonometria: this.tonometria,
            reason: this.reason,
          });
        } else {
          reject(false);
        }
      });
    },
    setTonometry() {
      if (
        this.storeConsultation.objPreliminary &&
        this.tabsActive == "preliminary"
      ) {
        if (this.storeConsultation.objPreliminary.data)
          this.tonometria =
            this.storeConsultation.objPreliminary.data.tonometria;
        else if (this.storeConsultation.tonometria)
          this.tonometria = this.storeConsultation.tonometria;
      } else if (this.storeConsultation.tonometria) {
        this.tonometria = this.storeConsultation.tonometria;

        this.not_cooperate = this.storeConsultation.reason ? true : false;
        this.reason = this.storeConsultation.reason;
      }
    },
  },
  mounted() {
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setTonometry();
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
