<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formRxFinalFarVisionRef"
      v-model="formRxFinalFarVision"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize"
            >RX Final Doble Orden</span
          >
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs4 offset-xs1>
                <v-select
                  label="RX Final"
                  :items="listRx"
                  v-model="rxFinal"
                  item-text="description"
                  item-value="value"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs2 offset-xs2>
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
                <span class="body-2">{{ $t("title.av") }}</span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                {{ $t("title.re") }}:
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoDer.esfera"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoDer.cilindro"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoDer.eje"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoDer.prisma"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoDer.av"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                {{ $t("title.le") }}:
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoIzq.esfera"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoIzq.cilindro"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoIzq.eje"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoIzq.prisma"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="rxFinalValue.ojoIzq.av"
                  :rules="[]"
                  :readonly="validateRead()"
                  :disabled="!rxFinal"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs4 offset-xs1>
                <v-select
                  v-model="type_lenses"
                  :rules="[]"
                  :readonly="validateRead()"
                  :items="lenses_list"
                  label="Tipo de lentes"
                >
                </v-select>
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
  name: "rx_final_far_vision",
  data() {
    return {
      formRxFinalFarVision: false,
      lenses_list: [],

      rxFinalValue: {
        type_lenses: "",
        ojoDer: {
          esfera: null,
          cilindro: null,
          eje: null,
          prisma: null,
          av: null,
        },
        ojoIzq: {
          esfera: null,
          cilindro: null,
          eje: null,
          prisma: null,
          av: null,
        },
      },
      rxFinalVisionLejano: {
        type_lenses: "",
        ojoDer: {
          esfera: null,
          cilindro: null,
          eje: null,
          prisma: null,
          av: null,
        },
        ojoIzq: {
          esfera: null,
          cilindro: null,
          eje: null,
          prisma: null,
          av: null,
        },
      },
      rxFinalVisionProxima: {
        type_lenses: "",
        ojoDer: {
          esfera: null,
          cilindro: null,
          eje: null,
          prisma: null,
          av: null,
        },
        ojoIzq: {
          esfera: null,
          cilindro: null,
          eje: null,
          prisma: null,
          av: null,
        },
      },
      rxFinalVisionIntermedia: {
        type_lenses: "",
        ojoDer: {
          esfera: null,
          cilindro: null,
          eje: null,
          prisma: null,
          av: null,
        },
        ojoIzq: {
          esfera: null,
          cilindro: null,
          eje: null,
          prisma: null,
          av: null,
        },
      },
      rxFinal: null,
      listRx: [
        { value: "1", description: "Visión Lejana" },
        { value: "2", description: "Visión Proxima" },
        { value: "3", description: "Visión Intermedia" },
      ],
      rules: {
        // required: v => false // !!v || this.$t('title.field_required')
      },
    };
  },
  methods: {
    async getListLenses() {
      getLenses().then((response) => {
        this.lenses_list = response.map((x) => x.description);
      });
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
    saveRxFinalDoble() {
      return new Promise((resolve, reject) => {
        if (this.$refs.formRxFinalFarVisionRef.validate()) {
          resolve({
            rxFinalVisionLejano: this.rxFinalVisionLejano,
            rxFinalVisionProxima: this.rxFinalVisionProxima,
            rxFinalVisionIntermedia: this.rxFinalVisionIntermedia,
          });
        } else {
          reject(false);
        }
      });
    },
    setRxFinalDoble() {
      if (this.storeConsultation.rxFinalVisionLejano)
        this.rxFinalVisionLejano = this.storeConsultation.rxFinalVisionLejano;
      if (this.storeConsultation.rxFinalVisionProxima)
        this.rxFinalVisionProxima = this.storeConsultation.rxFinalVisionProxima;
      if (this.storeConsultation.rxFinalVisionIntermedia)
        this.rxFinalVisionIntermedia =
          this.storeConsultation.rxFinalVisionIntermedia;
      if (this.storeConsultation.rx_doble_lenses)
        this.type_lenses = this.storeConsultation.rx_doble_lenses;
    },
  },
  mounted() {
    this.getListLenses();
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setRxFinalDoble();
    });
  },
  watch: {
    rxFinal: function (val) {
      switch (val) {
        case "1":
          this.rxFinalValue = this.rxFinalVisionLejano;
          break;
        case "2":
          this.rxFinalValue = this.rxFinalVisionProxima;
          break;
        case "3":
          this.rxFinalValue = this.rxFinalVisionIntermedia;
          break;
      }
    },
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
