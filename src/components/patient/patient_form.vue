<template>
  <v-container>
    <v-layout justify-center row>
      <v-flex xs12 class="pb-2">
        <v-card class="elevation-3">
          <v-card-title primary-title class="blue-grey darken-1">
            <h3 class="title font-weight-thin mb-0 white--text text-capitalize">{{ $t('title.personal_information') }}</h3>
          </v-card-title>
          <v-divider light class="vm-border-color-2"></v-divider>
          <v-card-text>
            <v-container grid-list-md text-xs-left>
              <v-layout row wrap>
                <v-flex xs6>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.number_of_expedient') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.idQflow}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.registrationdate">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.registration_date') }}:&nbsp;</span>
                  <span class="body-1">{{date(storePatient.registrationdate)}}</span>
                </v-flex>
                <v-flex xs6>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $tc('title.forename', 2) }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.forename}}</span>
                </v-flex>
                <v-flex xs6>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $tc('title.surname', 2) }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.surname}}</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic">{{ $t('title.age') }}:&nbsp;</span>
                  <span class="body-1">{{age(storePatient.birthdate)}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.birthdate">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.birthdate') }}:&nbsp;</span>
                  <span class="body-1">{{date(storePatient.birthdate)}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.id_document">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.identification_document') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.id_document}}</span>
                </v-flex>
                <v-flex xs6  v-if="storePatient.gender">
                  <span class="body-1 font-weight-light font-italic">{{ $t('title.genero') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.gender}}</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic">{{ $t('title.phone') }}:&nbsp;</span>
                  <span class="body-1" v-for="(phones, i) in storePatient.phone" :key="i">{{phones}} {{storePatient.phone.length == i + 1 ? "" : " / &nbsp;"}}</span>
                </v-flex>
                <v-flex xs6>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.cellphone') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.celphone}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.address.country">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.country') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.address.country}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.address.state">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.state') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.address.state}}</span>
                </v-flex>
                
                <v-flex xs12>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.address') }}:&nbsp;</span>
                  <span class="body-1">{{Object.keys(storePatient.address).length > 0 ? storePatient.address.street : ""}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.housinglocation">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.housing_location') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.housinglocation}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.email">
                  <span class="body-1 font-weight-light font-italic">{{ $t('title.email') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.email}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.occupation">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.occupation') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.occupation}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.profession">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.education') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.profession}}</span>
                </v-flex>
                <v-flex xs6>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.read_write') }}:&nbsp;</span>
                  <!-- <span class="body-1">{{storePatient.readWrtite}}</span> -->
                  <span class="body-1">{{boolean(storePatient.readWrtite)}}</span>
                </v-flex>
                <v-flex xs6>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.use_lenses') }}:&nbsp;</span>
                  <!-- <span class="body-1">{{storePatient.lenses}}</span> -->
                  <span class="body-1">{{boolean(storePatient.lenses)}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.category">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.category') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.category}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.nationality">
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.nationality') }}:&nbsp;</span>
                  <span class="body-1">{{storePatient.nationality}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.expfudemcare">
                  <span class="body-1 font-weight-light font-italic">EXP Fudem Care:&nbsp;</span>
                  <span class="body-1">{{storePatient.expfudemcare}}</span>
                </v-flex>
                <v-flex xs6 v-if="storePatient.expstatus">
                  <span class="body-1 font-weight-light font-italic">EXP Exactus:&nbsp;</span>
                  <span class="body-1">{{storePatient.expstatus}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  name: "patient_form",
  methods: {
    boolean(value) {
      if(value) {
        return this.$t('title.yes');
      } else {
        return this.$t('title.not');
      }
    },
    date(value) {
      let date = value.slice(0,10)
      return moment(date, 'YYYY-MM-DD').locale(this.$i18n.locale).format("L");
    },
    age(value) {
      return moment().diff(value, "years", false);
    }
  },
  computed: {
    storePatient() {
      return this.$store.getters.getPatient;
    },
  },
};
</script>

<style>
</style>
              