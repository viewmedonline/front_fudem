<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formRxFinalGlassesRef"
      v-model="formRxFinalGlasses"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize"
            >{{ $t("title.rx") }} {{ $t("title.final_glasses") }}</span
          >
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.sphere") }}</span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.cylinder") }}</span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2"
                  >{{ $t("title.axis") }} ({{ $t("title.degrees") }})</span
                >
              </v-flex>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.prism") }}</span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.rx_add") }}</span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.av") }}</span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs2>
                <v-text-field
                  :label="$t('title.re')"
                  v-model="rxFinalGafas.ojoDer.esfera"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoDer.cilindro"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoDer.eje"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoDer.Prisma"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoDer.ADD"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoDer.av"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs2>
                <v-text-field
                  :label="$t('title.le')"
                  v-model="rxFinalGafas.ojoIzq.esfera"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoIzq.cilindro"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoIzq.eje"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoIzq.Prisma"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoIzq.ADD"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalGafas.ojoIzq.av"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="rxFinalGafas.ocupation"
                  :rules="[]"
                  :readonly="validateRead()"
                  label="Ocupacion"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-select
                  v-model="rxFinalGafas.type_lenses"
                  :rules="[]"
                  :readonly="validateRead()"
                  :items="lenses_list"
                  label="Tipo de lentes"
                  multiple
                >
                </v-select>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="rxFinalGafas.observation"
                  :rules="[]"
                  :readonly="validateRead()"
                  label="Observaciones"
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
import { getLenses } from "../../componentServs/master";
export default {
  name: "rx_final_glasses",
  data() {
    return {
      lenses_list: [],
      formRxFinalGlasses: false,
      rxFinalGafas: {
        ojoDer: {
          esfera: null,
          cilindro: null,
          eje: null,
          Prisma: null,
          ADD: null,
          av: null,
        },
        ojoIzq: {
          esfera: null,
          cilindro: null,
          eje: null,
          Prisma: null,
          ADD: null,
          av: null,
        },
        ocupation: null,
        type_lenses: null,
        observation: null,
      },
      rules: {
        // required: v => false // !!v || this.$t('title.field_required')
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
    saveRxFinalGlasses() {
      return new Promise((resolve, reject) => {
        if (this.$refs.formRxFinalGlassesRef.validate()) {
          resolve(this.rxFinalGafas);
        } else {
          reject(false);
        }
      });
    },
    setRxFinalGlasses() {
      if (this.storeConsultation.rxFinalGafas)
        this.rxFinalGafas = this.storeConsultation.rxFinalGafas;
    },
    async getListLenses() {
      getLenses().then((response) => {
        this.lenses_list = response.map((x) => x.description);
      });
    },
  },
  mounted() {
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setRxFinalGlasses();
    });
    this.getListLenses();
    this.rxFinalGafas.ocupation = this.$store.getters.getPatient.occupation;
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
