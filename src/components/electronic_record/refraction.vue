<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formRefractionRef"
      v-model="formRefraction"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.refraction")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs2 offset-xs2>
                <span class="body-2"
                  ><v-checkbox
                    :label="$t('title.cycle')"
                    v-model="refraccion.ciclo"
                    :readonly="validateRead()"
                  ></v-checkbox
                ></span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2"
                  ><v-checkbox
                    :label="$t('title.est')"
                    v-model="refraccion.est"
                    :readonly="validateRead()"
                  ></v-checkbox
                ></span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2"
                  ><v-checkbox
                    :label="$t('title.dinm')"
                    v-model="refraccion.dinm"
                    :readonly="validateRead()"
                  ></v-checkbox
                ></span>
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
                <span class="body-2">Adición</span>
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
                  v-model="refraccion.ojoDer.esfera"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="refraccion.ojoDer.cilindro"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="refraccion.ojoDer.eje"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="refraccion.ojoDer.add"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="refraccion.ojoDer.av"
                  :rules="[]"
                  :readonly="validateRead()"
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
                  v-model="refraccion.ojoIzq.esfera"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="refraccion.ojoIzq.cilindro"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="refraccion.ojoIzq.eje"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="refraccion.ojoIzq.add"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="refraccion.ojoIzq.av"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs3 offset-xs1>
                <v-text-field
                  v-model="refraccion.ppc"
                  :rules="[]"
                  :readonly="validateRead()"
                  label="PPC"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="refraccion.ct"
                  :rules="[]"
                  :readonly="validateRead()"
                  label="CT"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="refraccion.rp"
                  :rules="[]"
                  :readonly="validateRead()"
                  label="Reflejos Pupilares"
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
  name: "refraction",
  data() {
    return {
      formRefraction: false,
      refraccion: {
        ciclo: false,
        est: false,
        dinm: false,
        ppc: null,
        ct: null,
        rp: null,
        ojoDer: {
          esfera: null,
          cilindro: null,
          eje: null,
          av: null,
          add: null,
        },
        ojoIzq: {
          esfera: null,
          cilindro: null,
          eje: null,
          av: null,
          add: null,
        },
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
    saveRefraction() {
      return new Promise((resolve, reject) => {
        if (this.$refs.formRefractionRef.validate()) {
          resolve(this.refraccion);
        } else {
          reject(false);
        }
      });
    },
    setRefraction() {
      if (this.storeConsultation.refraccion) {
        this.refraccion.ciclo = this.storeConsultation.refraccion.ciclo;
        this.refraccion.est = this.storeConsultation.refraccion.est;
        this.refraccion.dinm = this.storeConsultation.refraccion.dinm;
        if (this.storeConsultation.refraccion.ojoDer) {
          this.refraccion.ojoDer = this.storeConsultation.refraccion.ojoDer;
        } else {
          this.refraccion.ojoDer = {
            esfera: null,
            cilindro: null,
            eje: null,
            av: null,
            add: null,
          };
        }

        if (this.storeConsultation.refraccion.ojoIzq) {
          this.refraccion.ojoIzq = this.storeConsultation.refraccion.ojoIzq;
        } else {
          this.refraccion.ojoIzq = {
            esfera: null,
            cilindro: null,
            eje: null,
            av: null,
            add: null,
          };
        }
        this.refraccion.ppc = this.storeConsultation.refraccion.ppc;
        this.refraccion.ct = this.storeConsultation.refraccion.ct;
        this.refraccion.rp = this.storeConsultation.refraccion.rp;
      }
    },
  },
  mounted() {
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setRefraction();
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
