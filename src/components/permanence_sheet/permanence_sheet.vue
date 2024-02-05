<template lang="">
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <!-- <v-btn flat icon @click="show_notes = false"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        > -->
        <span class="subheading white--text text-capitalize"
          >Hoja de Permanencia</span
        >
      </v-card-title>
      <v-card-text>
        <v-form
          style="margin-top: 25px"
          ref="form"
          autocomplete="off"
          v-model="form_permanence"
          lazy-validation
        >
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="companion"
                  label="Acompañante"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="surgery"
                  label="Cirugía"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex xs6>
                <v-menu
                  ref="menu_time"
                  v-model="menu_time"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Desde"
                      prepend-icon="access_time"
                      :rules="[rules.required]"
                      value="12hr"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu_time"
                    v-model="time"
                    full-width
                    value="12hr"
                    @click:minute="$refs.menu_time.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  ref="menu_time2"
                  v-model="menu_time2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time2"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time2"
                      label="Hasta"
                      prepend-icon="access_time"
                      :rules="[rules.required]"
                      value="12hr"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu_time2"
                    v-model="time2"
                    full-width
                    value="12hr"
                    @click:minute="$refs.menu_time2.save(time2)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex>
                <v-btn
                  :loading="loading"
                  large
                  color="primary"
                  @click="savePermanenceSheet()"
                >
                  Generar
                </v-btn></v-flex
              >
            </v-layout>
          </v-container>
        </v-form>
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
          <v-toolbar-title>Hoja de permanencia</v-toolbar-title>
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
import writtenNumber from "written-number";
import { getPreview } from "../../componentServs/file";
writtenNumber.defaults.lang = "es";
moment.locale("es");
export default {
  name: "permanence_sheet",
  data: () => ({
    companion: "",
    surgery: "",
    menu_time: false,
    time: "",
    menu_time2: false,
    time2: "",
    form_permanence: false,
    pdf_document: "",
    dialog: false,
    loading: false,
    rules: {
      required: (value) => !!value || "Este campo es requerido",
    },
  }),
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    async savePermanenceSheet() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        const { forename, surname } = this.$store.getters.getPatient;
        let fecha = moment();

        let dia = writtenNumber(fecha.date());
        let mes = fecha.format("MMMM");
        let año = writtenNumber(fecha.year());
        const file = await getPreview({
          name: "permanency_sheet.html",
          data: {
            name: this.companion,
            patient_name: `${forename} ${surname}`,
            surgery: this.surgery,
            from: this.time,
            to: this.time2,
            day_month: dia,
            month: mes,
            year: año,
          },
        });
        const blob = new Blob([file.data], { type: "application/pdf;base64" });
        const link = window.URL.createObjectURL(blob);
        this.pdf_document = link;
        this.dialog = true;
        this.clear();
      }
      this.loading = false;
    },
  },
  watch: {
    menu_time(val) {
      if (!val) {
        this.time = moment(this.time, "HH:mm").format("hh:mm A");
      } else {
        if (this.time) this.time = moment(this.time, "hh:mm A").format("HH:mm");
      }
    },
    menu_time2(val) {
      if (!val) {
        this.time2 = moment(this.time2, "HH:mm").format("hh:mm A");
      } else {
        if (this.time2)
          this.time2 = moment(this.time2, "hh:mm A").format("HH:mm");
      }
    },
  },
};
</script>
