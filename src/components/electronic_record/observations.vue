<template>
  <v-container>
    <v-form
      autocomplete="off"
      ref="formObservationsRef"
      v-model="formObservations"
      lazy-validation
    >
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize"
            >Plan De Manejo</span
          >
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  label="Plan De Manejo"
                  v-model="observations"
                  outline
                  :counter="maxHeigthText"
                  :rules="[rules.length(maxHeigthText)]"
                  :readonly="validateRead()"
                ></v-textarea>
              </v-flex>
              <prescription type="2" ref="prescriptionRef" />
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card class="elevation-3 mt-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">{{
            $t("title.next_appointment")
          }}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <!-- <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        v-model="menu"
                        :nudge-right="40"
                        :return-value.sync="dateFormatted"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        >
                        <v-text-field
                            slot="activator"
                            v-model="dateFormatted"
                            label="Fecha"
                            prepend-icon="event"
                            @blur="date = parseDate(dateFormatted)"
                            readonly
                        ></v-text-field>
                        <v-date-picker locale="es-es" 
                            ref="date" 
                            v-model="date" 
                            no-title scrollable
                            :min="date"
                        >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">{{$t("title.cancel")}}</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(dateFormatted)">OK</v-btn>
                        </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
            </v-container> -->
          <v-container id="input-usage" grid-list-xl fluid>
            <v-layout wrap>
              <v-flex xs4>
                <v-text-field
                  v-model="dateFormatted"
                  prepend-icon="event"
                  :label="$t('title.next_appointment')"
                ></v-text-field>
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
const prescription = () =>
  import("@/components/electronic_record/prescription");
export default {
  name: "observations",
  components: {
    prescription,
  },
  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)), --> Para utilizar en caso de que se necesite el datepicker
    dateFormatted: null,
    menu: false,
    dosis: null,
    formObservations: false,
    prescriptionRef: null,
    observations: null,
    medications: null,
    maxHeigthText: 500,
    isEditing: true,

    rules: {
      required: (v) => !!v || this.$t("title.field_required"),
      length: (len) => (v) =>
        (v || "").length <= len || `Invalid character length, required ${len}`,
    },
  }),
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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
    saveObservations() {
      return new Promise(async (resolve, reject) => {
        if (this.$refs.formObservationsRef.validate()) {
          let dataPrescription;
          try {
            dataPrescription =
              await this.$refs.prescriptionRef.savePrescription();
          } catch (error) {
            dataPrescription = null;
          }

          let valor = {
            observacion: this.observations,
            prescription: dataPrescription ? dataPrescription[0]._id : null,
          };
          resolve(valor);
        } else {
          reject(false);
        }
      });
    },
    setDataConsultation() {
      if (this.storeConsultation.observaciones) {
        this.observations = this.storeConsultation.observaciones.observacion;
        if (this.storeConsultation.next_appointment)
          this.dateFormatted = this.storeConsultation.next_appointment;
      }
    },
  },
  mounted() {
    EventBus.$on("changeTabReload", (value) => {
      this.$forceUpdate();
      this.setDataConsultation();
    });
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    storeConsultation() {
      return this.$store.getters.getConsultation;
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
};
</script>
