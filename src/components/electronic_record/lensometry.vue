<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formLensometryRef"
      v-model="formLensometry"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.lensometry")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs2 offset-xs2>
                <span class="body-2">{{ $t("title.sphere") }}</span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.cylinder") }}</span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.axis") }}</span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.prism") }}</span>
              </v-flex>
              <v-flex xs2>
                <span class="body-2">{{ $t("title.addition") }}</span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs2 text-sm-center class="vm-p-esp">
                {{ $t("title.re") }}:
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoDer.esfera"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoDer.cilindro"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoDer.eje"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoDer.prisma"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoDer.adicion"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs2 text-sm-center class="vm-p-esp">
                {{ $t("title.le") }}:
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoIzq.esfera"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoIzq.cilindro"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoIzq.eje"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoIzq.prisma"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="lensometria.ojoIzq.adicion"
                  :readonly="validateRead()"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4 offset-xs2>
                <v-select
                  v-model="typeLenses"
                  :items="lenses"
                  :label="$t('title.type_of_lenses')"
                  :readonly="validateRead()"
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
export default {
  name: "lensometry",
  data() {
    return {
      formLensometry: false,
      lensometria: {
        ojoDer: {
          esfera: null,
          cilindro: null,
          eje: null,
          adicion: null,
          prisma: null,
        },
        ojoIzq: {
          esfera: null,
          cilindro: null,
          eje: null,
          adicion: null,
          prisma: null,
        },
      },
      itemsAdicion: ["1", "2"],
      rules: {
        // required: v => false // !!v || this.$t('title.field_required')
      },
      typeLenses: null,
      lenses: [
        {
          value: "Simple Vision",
          text: this.$t("opt.simple_vision"),
        },
        {
          value: "Multifocal",
          text: this.$t("opt.multifocal"),
        },
        {
          value: "Bifocal",
          text: this.$t("opt.bifocal"),
        },
        {
          value: "Contact Lens",
          text: this.$t("opt.contact_lens"),
        },
        {
          value: "Special Lenses",
          text: this.$t("opt.special_lenses"),
        },
      ],
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
    saveLensometry() {
      return new Promise((resolve, reject) => {
        if (this.$refs.formLensometryRef.validate()) {
          resolve({
            lensometria: this.lensometria,
            typeLenses: this.typeLenses,
          });
        } else {
          reject(false);
        }
      });
    },
    setLensometry() {
      this.typeLenses = this.storeConsultation.generalData
        ? this.storeConsultation.generalData.typeLense
        : null;
      if (
        this.storeConsultation.objPreliminary &&
        this.tabsActive == "preliminary"
      ) {
        if (this.storeConsultation.objPreliminary.data)
          this.lensometria =
            this.storeConsultation.objPreliminary.data.lensometria;
        else if (this.storeConsultation.lensometria)
          this.lensometria = this.storeConsultation.lensometria;
      } else if (this.storeConsultation.lensometria)
        this.lensometria = this.storeConsultation.lensometria;
    },
  },
  mounted() {
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setLensometry();
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
  },
};
</script>
