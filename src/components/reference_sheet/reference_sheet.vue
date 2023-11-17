<template lang="">
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <!-- <v-btn flat icon @click="show_notes = false"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        > -->
        <span class="subheading white--text text-capitalize"
          >Hoja de Referencia Médica</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md px-0 py-0>
          <v-layout row wrap>
            <v-flex xs12>
              <v-stepper v-model="e6" style="box-shadow: none !important">
                <v-stepper-step
                  :step="9999"
                  :edit-icon="'add'"
                  complete
                  :editable="true"
                  @click="validateStepper(9999)"
                >
                  <div>
                    <h3 class="">Crear Hoja de Referencia Médica</h3>
                  </div>
                </v-stepper-step>
                <v-stepper-content :step="9999">
                  <v-layout row wrap>
                    <v-flex xs2>
                      <v-text-field
                        disabled
                        label="N° de expediente"
                        v-model="num_exp"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        disabled
                        label="Paciente"
                        v-model="pat_name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-text-field
                        disabled
                        label="Edad"
                        v-model="pat_age"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        disabled
                        slot="activator"
                        v-model="date"
                        label="Fecha"
                        persistent-hint
                        prepend-icon="event"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <Vueditor ref="editor_reference" focus> </Vueditor>
                    </v-flex>
                    <v-layout row wrap justify-end>
                      <v-flex xs6>
                        <v-btn
                          color="primary"
                          @click="preview"
                          :loading="loading_reference_preview"
                          >{{ $t("title.pre_view") }}</v-btn
                        >
                        <v-btn
                          color="primary"
                          @click="save_reference"
                          :loading="loading_reference"
                          >{{ $t("title.save") }}</v-btn
                        >
                        <v-btn flat @click="clearReference">{{
                          $t("title.clear")
                        }}</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-layout>
                </v-stepper-content>
                <div v-for="(item, z) in references" :key="item._id">
                  <v-stepper-step
                    :step="z"
                    complete
                    :edit-icon="'assignment'"
                    :editable="true"
                    @click="show_reference(z, item)"
                  >
                    Hoja de Referencia Medica
                    <v-layout row wrap>
                      <v-flex>
                        <small>{{
                          format_date(item.control.created_at)
                        }}</small>
                      </v-flex>
                      <v-flex
                        style="margin-left: 150px"
                        v-if="item.pdf != null"
                      >
                        <v-icon
                          x-large
                          style="margin-top: -30px; color: #d50f0f"
                          >picture_as_pdf</v-icon
                        >
                      </v-flex>
                    </v-layout>
                  </v-stepper-step>
                  <v-stepper-content :step="z" complete :editable="true">
                    <iframe
                      color="grey lighten-1"
                      class="mb-5"
                      :src="pdf_document_reference"
                      type="application/pdf"
                      width="90%"
                      height="100%"
                      frameborder="0"
                      style="height: 75vh"
                    ></iframe>
                    <!-- <v-layout row wrap>
              <v-flex xs12 class="text-xs-right">
                <v-btn @click="Print(z)" fab dark small color="primary">
                  <v-icon>print</v-icon>
                </v-btn>
              </v-flex>
            </v-layout> -->
                  </v-stepper-content>
                </div>
              </v-stepper>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Hoja de Referencia Médica</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text style="padding: 0; height: 93vh; background-color: grey">
          <iframe
            :src="pdf_document"
            type="application/pdf"
            frameborder="0"
            style="width: 100%; height: 100%"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import moment from "moment";
import { getPreview, getImage } from "../../componentServs/file";
import { saveReference, getReference } from "../../componentServs/reference";
export default {
  name: "reference_sheet",
  data() {
    return {
      num_exp: "",
      pat_name: "",
      pat_age: "",
      date: moment().format("DD/MM/YYYY"),
      e6: 1,
      loading_reference: false,
      loading_reference_preview: false,
      show_editor: false,
      dialog: false,
      pdf_document: "",
      pdf_document_reference: "",
      references: [],
    };
  },
  methods: {
    clearReference() {
      this.$refs.editor_reference.setContent("");
    },
    format_date(date, time = false) {
      if (time) {
        return moment(date).format("DD/MM/YYYY hh:mm A");
      } else {
        return moment(date).format("YYYY-MM-DD");
      }
    },
    validateStepper(val) {
      if (val == this.e6) {
        this.e6 = 99999999999999999;
      }
    },
    async preview() {
      this.loading_reference_preview = true;
      const file = await getPreview({
        name: "reference_sheet.html",
        data: {
          content: this.$refs.editor_reference.getContent(),
          name: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
          type:
            this.$store.getters.getPhysician.role == "internist"
              ? "Médico Internista"
              : "Oftalmólogo",
          digital_signature: this.$store.getters.getPhysician.digital_signature,
          pat_name: this.pat_name,
          pat_age: this.pat_age,
          pat_exp: this.num_exp,
          date: this.date,
        },
      });
      const blob = new Blob([file.data], { type: "application/pdf;base64" });
      const link = window.URL.createObjectURL(blob);
      this.dialog = true;
      this.pdf_document = link;
      this.loading_reference_preview = false;
    },
    async save_reference() {
      try {
        this.loading_reference = true;
        await saveReference({
          name: "reference_sheet.html",
          data: {
            content: this.$refs.editor_reference.getContent(),
            name: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
            type:
              this.$store.getters.getPhysician.role == "internist"
                ? "Médico Internista"
                : "Oftalmólogo",
            digital_signature:
              this.$store.getters.getPhysician.digital_signature,
            patient: this.$store.getters.getPatient._id,
            responsible: this.$store.getters.getPhysician._id,
            pat_name: this.pat_name,
            pat_age: this.pat_age,
            pat_exp: this.num_exp,
            date: this.date,
          },
        });
        this.loading_reference = false;
        this.validateStepper(9999);
        this.clearReference();
        this.search_reference_list();
      } catch (error) {
        this.loading_reference = false;
        console.log(error);
      }
    },
    async search_reference_list() {
      try {
        this.references = await getReference(
          this.$store.getters.getPatient._id
        );
      } catch (error) {
        console.log(error);
      }
    },
    async show_reference(pos, item) {
      this.validateStepper(pos);
      const file = await getImage(item.pdf, null);
      const blob = new Blob([file.data], { type: "application/pdf;base64" });
      const link = window.URL.createObjectURL(blob);
      this.pdf_document_reference = link;
    },
  },
  computed: {
    //this.$refs.editor_reference.getContent()
  },
  mounted() {
    const { idQflow, forename, surname, birthdate } =
      this.$store.getters.getPatient;
    this.num_exp = idQflow;
    this.pat_name = `${forename} ${surname}`;
    this.pat_age = moment().diff(birthdate, "years");
    this.search_reference_list();
  },
  watch: {},
};
</script>
