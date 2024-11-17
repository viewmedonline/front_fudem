<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formGeneralDataRef"
      v-model="formGeneralData"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.general_data")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-text-field
                  v-model="expedient"
                  :label="$t('title.number_of_expedient')"
                  :rules="validateRequired"
                  readonly
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="name"
                  :label="$t('title.name')"
                  :rules="validateRequired"
                  readonly
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs6 sm3>
                <v-text-field
                  v-model="gender"
                  :label="$t('title.gender')"
                  :rules="validateRequired"
                  readonly
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6 sm3>
                <v-text-field
                  v-model="age"
                  :label="$t('title.current_age')"
                  :rules="[]"
                  readonly
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6 sm3>
                <v-switch
                  :label="`${$t('title.read_and_write')}`"
                  v-model="readAndWrite"
                  readonly
                ></v-switch>
              </v-flex>
              <v-flex xs6 sm3>
                <v-switch
                  :label="`${$t('title.use_lenses')}`"
                  v-model="useLenses"
                  readonly
                ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  :label="$t('title.reasonforconsultation')"
                  :rules="validateRequired"
                  outline
                  v-model="reasonConsultation"
                  :readonly="validateRead()"
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-select
                  v-model="typeLenses"
                  :items="lenses"
                  :label="$t('title.type_of_lenses')"
                  :rules="[]"
                  :readonly="validateRead()"
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm4 v-if="$route.query.c == 'E'">
                <v-text-field
                  v-model="typeConsultation"
                  :label="$t('title.type_of_consultation')"
                  :rules="validateRequired"
                  readonly
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm4 v-else>
                <v-select
                  v-model="typeConsultation"
                  :items="Consultations"
                  :label="$t('title.type_of_consultation')"
                  :rules="validateRequired"
                  :readonly="validateRead()"
                >
                </v-select>
              </v-flex>
              <!-- <v-flex xs12 sm4>
                        <v-checkbox 
                            v-model="postOperativePatient" 
                            :label="$t('title.post_operative_patient')" >
                        </v-checkbox>
                    </v-flex> -->
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  name: "general_data",
  data() {
    return {
      expedient: null,
      name: null,
      gender: null,
      age: null,
      readAndWrite: false,
      useLenses: false,
      typeLenses: null,
      reasonConsultation: null,
      typeConsultation: null,
      // postOperativePatient: false,
      formGeneralData: false,
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
      typeConsultation2: null,
      Consultations: [
        {
          value: "Post Operative Patient",
          text: this.$t("title.post_operative_patient"),
        },
        {
          value: "For the first time",
          text: this.$t("title.for_the_first_time"),
        },
        {
          value: "Control",
          text: this.$t("title.control"),
        },
        {
          value: "one day post surgery",
          text: "1er Dia Post-Quirúrgico",
        },
        {
          value: "one week post surgery",
          text: "1ra Semana Post-Quirurgico",
        },
        {
          value: "three week post surgery",
          text: "3ra Semana Post-Quirurgico",
        },
        {
          value: "four week post surgery",
          text: "4ta Semana Post-Quirurgico",
        },
      ],
      rules: {
        required: (v) => !!v || this.$t("title.field_required"),
      },
    };
  },
  methods: {
    validateRead() {
      if (this.storeConsultation.objPreliminary) {
        if (this.storeConsultation.objPreliminary.data) return true;
        return false;
      }
    },
    saveGeneralData() {
      return new Promise((resolve, reject) => {
        if (this.$refs.formGeneralDataRef.validate()) {
          let valor = {
            reasonConsultation: this.reasonConsultation,
            generalData: {
              typeLense: this.typeLenses,
            },
            typeConsultation:
              this.$route.query.c == "E"
                ? this.$route.query.c
                : this.typeConsultation,
          };
          resolve(valor);
        } else {
          reject(false);
        }
      });
    },
    setPersonData() {
      this.expedient = this.storePatient.idQflow;
      this.name = this.storePatient.forename;
      if (this.storePatient.surname) {
        this.name += " " + this.storePatient.surname;
      }
      this.gender = this.storePatient.gender;
      this.age = moment().diff(this.storePatient.birthdate, "years");
      this.readAndWrite = this.storePatient.readWrtite;
      this.useLenses = this.storePatient.lenses;

      if (this.$route.query.c == "E")
        this.typeConsultation = this.$t("title.type_consulting.E");
      else
        this.typeConsultation = this.storeConsultation.generalData
          ? this.storeConsultation.typeConsultation
          : "";

      // Validando si existe el ojbPreliminary y luego si existe el data del mismo
      if (this.storeConsultation.objPreliminary) {
        if (this.storeConsultation.objPreliminary.data) {
          this.typeLenses =
            this.storeConsultation.objPreliminary.data.generalData.typeLense ||
            null;
          this.reasonConsultation =
            this.storeConsultation.objPreliminary.data.reasonConsultation ||
            null;
        } else {
          this.typeLenses = this.storeConsultation.generalData
            ? this.storeConsultation.generalData.typeLense
            : null;
          this.reasonConsultation = this.storeConsultation.reasonConsultation
            ? this.storeConsultation.reasonConsultation
            : null;
        }
      } else {
        this.typeLenses = this.storeConsultation.generalData
          ? this.storeConsultation.generalData.typeLense
          : null;
        this.reasonConsultation = this.storeConsultation.reasonConsultation
          ? this.storeConsultation.reasonConsultation
          : null;
      }
    },
  },
  created() {
    this.setPersonData();
  },
  computed: {
    storePatient() {
      return this.$store.getters.getPatient;
    },
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
    storeTypeConsulting() {
      return this.$store.getters.getTypeConsulting;
    },
    validateRequired() {
      if (this.$store.getters.getTypeConsulting == "E") return [];
      else return [this.rules.required];
    },
  },
};
</script>
