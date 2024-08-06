<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formPreviousSurgeriesRef"
      v-model="formPreviousSurgeries"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.previous_surgeries")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-card>
                <v-card-title primary-title>
                  <span class="body-2">{{ $t("title.right_eye") }}</span>
                </v-card-title>
                <v-divider light></v-divider>
                <v-card-text>
                  <v-container fluid grid-list-md px-0 py-0>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.cataract')}`"
                          v-model="cirugias[getPosition('cataratas')].eyeRight"
                        ></v-switch>
                      </v-flex>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.glaucoma')}`"
                          v-model="cirugias[getPosition('glaucoma')].eyeRight"
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.squint')}`"
                          v-model="cirugias[getPosition('estrabismo')].eyeRight"
                        ></v-switch>
                      </v-flex>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.retina')}`"
                          v-model="cirugias[getPosition('retina')].eyeRight"
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.plastic')}`"
                          v-model="cirugias[getPosition('plastica')].eyeRight"
                        ></v-switch>
                      </v-flex>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.terigion')}`"
                          v-model="cirugias[getPosition('pterigion')].eyeRight"
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs12 align-center>
                        <v-switch
                          :label="`${$t('antecedent.corneal_surgery')}`"
                          v-model="
                            cirugias[getPosition('Cirugía de Córnea')].eyeRight
                          "
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs12 sm6>
                        <v-text-field
                          v-model="othersEyeRight"
                          :label="$t('title.others')"
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6>
              <v-card>
                <v-card-title primary-title>
                  <span class="body-2">{{ $t("title.left_eye") }}</span>
                </v-card-title>
                <v-divider light></v-divider>
                <v-card-text>
                  <v-container fluid grid-list-md px-0 py-0>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.cataract')}`"
                          v-model="cirugias[getPosition('cataratas')].eyeLeft"
                        ></v-switch>
                      </v-flex>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.glaucoma')}`"
                          v-model="cirugias[getPosition('glaucoma')].eyeLeft"
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.squint')}`"
                          v-model="cirugias[getPosition('estrabismo')].eyeLeft"
                        ></v-switch>
                      </v-flex>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.retina')}`"
                          v-model="cirugias[getPosition('retina')].eyeLeft"
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.plastic')}`"
                          v-model="cirugias[getPosition('plastica')].eyeLeft"
                        ></v-switch>
                      </v-flex>
                      <v-flex xs6>
                        <v-switch
                          :label="`${$t('antecedent.terigion')}`"
                          v-model="cirugias[getPosition('pterigion')].eyeLeft"
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs12 justify-center>
                        <v-switch
                          :label="`${$t('antecedent.corneal_surgery')}`"
                          v-model="
                            cirugias[getPosition('Cirugía de Córnea')].eyeLeft
                          "
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs12 sm6>
                        <v-text-field
                          v-model="othersEyeLeft"
                          :label="$t('title.others')"
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "surgeries",
  data() {
    return {
      formPreviousSurgeries: false,
      cirugias: [
        {
          name: "cataratas",
          eyeRight: false,
          eyeLeft: false,
        },
        {
          name: "glaucoma",
          eyeRight: false,
          eyeLeft: false,
        },
        {
          name: "estrabismo",
          eyeRight: false,
          eyeLeft: false,
        },
        {
          name: "retina",
          eyeRight: false,
          eyeLeft: false,
        },
        {
          name: "plastica",
          eyeRight: false,
          eyeLeft: false,
        },
        {
          name: "pterigion",
          eyeRight: false,
          eyeLeft: false,
        },
        {
          name: "Cirugía de Córnea",
          eyeRight: false,
          eyeLeft: false,
        },
      ],
      othersEyeRight: null,
      othersEyeLeft: null,
    };
  },
  methods: {
    getPosition(name) {
      let index = this.cirugias.findIndex((item) => {
        return item.name == name;
      });
      return index.toString();
    },
    savePreviousSurgeries() {
      return new Promise((resolve, reject) => {
        if (this.$refs.formPreviousSurgeriesRef.validate()) {
          if (this.cirugias.length > 0) {
            let valor = {
              cirugias: this.cirugias,
              othersEyeRight: this.othersEyeRight,
              othersEyeLeft: this.othersEyeLeft,
            };
            resolve(valor);
          } else reject(false);
        } else {
          reject(false);
        }
      });
    },
    setDataAntecedent() {
      let aux = [];

      function removeDuplicates(originalArray, prop) {
        let newArray = [];
        let lookupObject = {};

        for (let i in originalArray) {
          lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (let i in lookupObject) {
          newArray.push(lookupObject[i]);
        }
        return newArray;
      }

      if (this.storeConsultation.record.cirugias) {
        if (this.storeConsultation.record.cirugias.cirugias.length > 0) {
          aux = aux.concat(this.cirugias);
          aux = aux.concat(this.storeConsultation.record.cirugias.cirugias);
          this.cirugias = removeDuplicates(aux, "name");
        }
        if (this.storeConsultation.record.cirugias.othersEyeRight) {
          this.othersEyeRight =
            this.storeConsultation.record.cirugias.othersEyeRight;
        }
        if (this.storeConsultation.record.cirugias.othersEyeLeft) {
          this.othersEyeLeft =
            this.storeConsultation.record.cirugias.othersEyeLeft;
        }
      }
    },
  },
  computed: {
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
  },
};
</script>
