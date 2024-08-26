<template lang="">
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <span class="subheading white--text text-capitalize"
          >Receta Médica</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md px-0 py-0>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn
                large
                color="primary"
                @click="previewPrescription(1)"
                class="white--text"
                >Optometria
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn
                large
                color="primary"
                @click="previewPrescription(2)"
                class="white--text"
                >Oftalmologia
              </v-btn>
            </v-flex>
            <v-flex xs12>
              <iframe
                :src="pdf_document"
                type="application/pdf"
                frameborder="0"
                style="width: 100%; height: 100vh"
              ></iframe>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-model="loadingModal" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Generando Receta Medica...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import moment from "moment";
import { getSucursal } from "../../componentServs/sucursal";
import { getPreview } from "../../componentServs/file";
import { findPrescriptions } from "../../componentServs/medicines";
export default {
  name: "prescription",
  data() {
    return {
      pdf_document: "",
      loadingModal: false,
    };
  },
  methods: {
    async previewPrescription(type) {
      this.loadingModal = true;
      if (this.$store.getters.getLastConsultation) {
        const idPrescription =
          type == 2
            ? this.$store.getters.getLastConsultation.prescription_of
            : this.$store.getters.getLastConsultation.prescription;
        const prescription = (await findPrescriptions(idPrescription))[0];

        const sucursal = await getSucursal({
          body: {
            _id: prescription.place,
          },
        });

        const file = await getPreview({
          name: "prescription.html",
          data: {
            patient: `${this.$store.getters.getPatient.forename} ${this.$store.getters.getPatient.surname}`,
            name_prof: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            prescriptions: prescription.prescription,
            date: moment(prescription.control.created_at).format("DD/MM/YYYY"),
            idQflow: this.$store.getters.getPatient.idQflow,
            place: sucursal[0].Description,
            type: type == 2 ? "Oftalmólogo" : "Optometrista",
            digital_signature:
              this.$store.getters.getPhysician.digital_signature,
          },
        });
        const blob = new Blob([file.data], { type: "application/pdf;base64" });
        const link = window.URL.createObjectURL(blob);
        this.dialog = true;
        this.pdf_document = link;
      }
      this.loadingModal = false;
    },
  },
  computed: {
    //this.$refs.editor_reference.getContent()
  },
  mounted() {},
  watch: {},
};
</script>
