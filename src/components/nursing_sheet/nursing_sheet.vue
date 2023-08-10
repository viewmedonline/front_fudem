<template>
  <v-container v-if="!show_notes">
    <div style="background-color: #004969; height: 50px"></div>
    <v-form
      autocomplete="off"
      ref="formNurseSheet"
      v-model="formNurseSheet"
      lazy-validation
    >
      <v-stepper v-model="e6" vertical non-linear>
        <v-stepper-step
          :step="9999"
          :edit-icon="'add'"
          complete
          :editable="true"
          @click="validateStepper(9999)"
        >
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Crear Hoja de Enfermeria</h3>
            </div>
          </v-card-title>
        </v-stepper-step>
        <v-stepper-content :step="9999">
          <v-layout py-1>
            <v-flex xs12 class="px-2 py-2">
              <v-card class="elevation-3">
                <v-card-text>
                  <v-container fluid grid-list-md px-0 py-0>
                    <v-layout row wrap>
                      <v-flex xs2>
                        <v-text-field
                          disabled
                          label="N° de expediente"
                          v-model="num_exp"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          disabled
                          label="Paciente"
                          v-model="pat_name"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field
                          disabled
                          label="Edad"
                          v-model="pat_age"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          disabled
                          slot="activator"
                          v-model="dateFormatted"
                          label="Fecha"
                          persistent-hint
                          prepend-icon="event"
                          @blur="date = parseDate(dateFormatted)"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          label="FR. Cardiaca"
                          v-model="heart_rate"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          label="T/A"
                          v-model="blood_pressure"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-layout row wrap justify-end>
                    <v-flex xs8 offset-xs2>
                      <v-btn
                        color="primary"
                        @click="submit"
                        :disabled="alert"
                        :loading="saving_sheet"
                        >{{ $t("title.save") }}</v-btn
                      >
                      <v-btn flat @click="clear">{{
                        $t("title.cancel")
                      }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <div v-for="(item, z) in nurseSheetList" :key="item._id">
          <v-stepper-step
            :step="z"
            complete
            :edit-icon="'assignment'"
            :editable="true"
            @click="showNotes(item,z)"
          >
            {{ item.name }}
            <v-layout row wrap>
              <v-flex>
                <small>{{ format_date(item.date) }}</small>
              </v-flex>
              <v-flex style="margin-left: 150px" v-if="item.pdf != null">
                <v-icon x-large style="margin-top: -30px; color: #d50f0f"
                  >picture_as_pdf</v-icon
                >
              </v-flex>
            </v-layout>
          </v-stepper-step>
          <v-stepper-content :step="z" complete :editable="true">
            <iframe color="grey lighten-1" class="mb-5"
            :src="pdf_document" 
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
    </v-form>
  </v-container>
  <!-- formulario de añadir notas -->
  <v-container v-else>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <v-btn flat icon @click="show_notes = false"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <span class="subheading white--text text-capitalize"
          >Hoja de Enfermeria {{ data_sheet.date }}</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md px-0 py-0>
          <v-layout row wrap>
            <v-flex xs2>
              <v-text-field
                disabled
                label="N° de expediente"
                v-model="data_sheet.num_exp"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                disabled
                label="Paciente"
                v-model="data_sheet.pat_name"
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field
                disabled
                label="Edad"
                v-model="data_sheet.pat_age"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                disabled
                slot="activator"
                v-model="data_sheet.date"
                label="Fecha"
                persistent-hint
                prepend-icon="event"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                disabled
                label="FR. Cardiaca"
                v-model="data_sheet.heart_rate"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                disabled
                label="T/A"
                v-model="data_sheet.blood_pressure"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-stepper style="box-shadow: none !important">
                <v-stepper-step
                  :step="9999"
                  :edit-icon="'add'"
                  complete
                  :editable="true"
                  @click="formAddNotes = true"
                >
                  <div>
                    <h3 class="">Crear Nota de Enfermeria</h3>
                  </div>
                </v-stepper-step>
              </v-stepper>
            </v-flex>
            <v-flex xs12>
              <div v-if="formAddNotes">
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date2"
                          label="Picker without buttons"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date2"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs6>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
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
                          label="Picker in menu"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="time_picker"
                        full-width
                        @click:minute="$refs.menu2.save(time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12>
                    <Vueditor ref="editor" :rules="[rules.required]">
                    </Vueditor>
                  </v-flex>
                  <v-flex xs12 offset-xs8>
                    <v-btn
                      color="primary"
                      @click="addNotes"
                      :loading="saving_note"
                      >Guardar</v-btn
                    >
                    <v-btn flat @click="formAddNotes = false">Cancelar</v-btn>
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
            <v-flex xs12 v-if="!formAddNotes">
              <v-list two-line>
                <template v-for="(item, index) in data_sheet.notes_nurses">
                  <v-list-tile :key="item._id" avatar ripple @click="">
                    <v-list-tile-content>
                      <v-container fluid>
                        <v-layout>
                          <v-flex xs2>
                            <v-btn
                              fab
                              style="height: 40px; width: 40px"
                              icon
                              color="primary"
                            >
                              <v-icon medium style="margin-top: 30%"
                                >assignment</v-icon
                              >
                            </v-btn>
                          </v-flex>
                          <v-flex xs2>
                            <div>Nota</div>
                            <small>{{ format_date(item.date, true) }}</small>
                          </v-flex>
                          <v-flex xs2>
                            <v-img
                              style="background-size: contain"
                              width="200"
                              height="100"
                              :src="
                                getSignatureBase64(
                                  item.responsible.digital_signature
                                )
                              "
                            />
                          </v-flex>
                          <v-flex xs4 offset-xs2>
                            <v-btn flat large @click="showNotesSaved(item)"
                              >Ver Nota</v-btn
                            >
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider
                    v-if="index + 1 < data_sheet.notes_nurses.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list>
            </v-flex>
            <v-flex xs4 offset-xs8 v-if="!formAddNotes">
              <v-btn
                color="primary"
                @click="closeSheet()"
                small
                :loading="close_sheet"
                >Cerrar Hoja de Enfermeria</v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-model="alert" max-width="500" v-if="alert">
      <v-card>
        <v-card-title primary-title class="blue-grey darken-1 headline"
          >Nota de enfermeria</v-card-title
        >

        <v-card-text>
          <div><b>Fecha:</b> {{ format_date(data_note_saved.date, true) }}</div>
          <div>
            <b>Responsable:</b> {{ data_note_saved.responsible.forename }}
            {{ data_note_saved.responsible.surname }}
          </div>
          <div><b>Nota:</b></div>
          <div
            v-html="data_note_saved.note"
            style="
              background-color: #ededed;
              border-radius: 5px;
              box-shadow: 10px; /* box-shadow: 60px -16px teal; */
              box-shadow: 4px 4px darkgrey;
            "
          ></div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="alert = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import moment from "moment";
import {
  getSheetList,
  addNotes,
  addSheetNurse,
  closeSheet,
} from "../../componentServs/nurses_sheet";
import { getImage } from "../../componentServs/file";

export default {
  name: "nurse_sheet",
  components: {},
  data: (vm) => ({
    patient: {},
    data_sheet: {},
    data_note_saved: {},
    num_exp: "",
    pat_name: "",
    pat_age: "",
    heart_rate: "",
    blood_pressure: "",
    formNurseSheet: false,
    formAddNotes: false,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    date2: new Date().toISOString().substr(0, 10),
    alert: false,
    menu: false,
    time: moment().format("hh:mm A"),
    time_picker: moment().format("hh:mm"),
    menu2: false,
    e6: 1,
    rules: {
      required: (v) => !!v || vm.$t("title.field_required"),
    },
    nurseSheetList: [],
    show_notes: false,
    saving_note: false,
    saving_sheet: false,
    close_sheet: false,
    pdf_document:null
  }),
  watch: {
    time_picker(val) {
      this.time = moment(val, "hh:mm").format("hh:mm A");
    },
  },
  async created() {
    this.patient = this.$store.getters.getPatient;
    const { idQflow, forename, surname, birthdate } =
      this.$store.getters.getPatient;
    this.num_exp = idQflow;
    this.pat_name = `${forename} ${surname}`;
    this.pat_age = moment().diff(birthdate, "years");
    this.nurseSheetList = await getSheetList(this.patient._id, null);
  },
  methods: {
    async closeSheet() {
      this.close_sheet = true;
      if (confirm("¿Esta seguro que desea cerrar la hoja de enfermeria?")) {
        await closeSheet(this.data_sheet._id);
        this.show_notes = false;
        this.nurseSheetList = await getSheetList(this.patient._id, null);
      }
      this.close_sheet = false;
    },
    async showNotesSaved(item) {
      this.data_note_saved = item;
      this.alert = true;
    },
    async addNotes() {
      this.saving_note = true;
      try {
        let obj_new_note = {
          note: this.$refs.editor.getContent(),
          date: moment(`${this.date2} ${this.time}`).format("YYYY-MM-DD HH:mm"),
          responsible: this.$store.getters.getPhysician._id,
        };
        await addNotes(this.data_sheet._id, obj_new_note);
        this.saving_note = false;
      } catch (error) {
        console.log(error);
        this.saving_note = false;
      }
      this.formAddNotes = false;
      this.nurseSheetList = await getSheetList(this.patient._id);
      this.data_sheet.notes_nurses = (
        await getSheetList(this.patient._id, this.data_sheet._id)
      )[0].notes_nurses;
    },
    getSignatureBase64(signature) {
      return `${signature}`;
    },
    format_date(date, time = false) {
      if (time) {
        return moment(date).format("DD/MM/YYYY hh:mm A");
      } else {
        return moment(date).format("YYYY-MM-DD");
      }
    },
    async showNotes(item,pos) {
      if (!item.pdf) {
        this.data_sheet = {
          _id: item._id,
          date: this.format_date(item.date),
          num_exp: this.patient.idQflow,
          pat_name: `${this.patient.forename} ${this.patient.surname}`,
          pat_age: item.age,
          heart_rate: item.heart_rate,
          blood_pressure: item.blood_pressure,
          notes_nurses: item.notes_nurses,
        };
        this.show_notes = true;
      } else {
        this.validateStepper(pos);
        const file = await getImage(item.pdf, null);
        const blob = new Blob([file.data], { type: "application/pdf;base64" });
        const link = window.URL.createObjectURL(blob);
        this.pdf_document = link;
      }
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");

      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    validateStepper(val) {
      if (val == this.e6) {
        this.e6 = 99999999999999999;
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async submit() {
      this.saving_sheet = true;
      try {
        if (this.$refs.formNurseSheet.validate()) {
          let obj_sheet = {
            patient: this.patient._id,
            name: "Hoja de Enfermeria",
            date: this.date,
            responsable: this.$store.getters.getPhysician._id,
            heart_rate: this.heart_rate,
            blood_pressure: this.blood_pressure,
          };
          await addSheetNurse(obj_sheet);

          this.nurseSheetList = await getSheetList(this.patient._id, null);
          this.clear();
        }
      } catch (error) {
        console.log(error);
      }
      this.saving_sheet = false;
    },
    clear() {
      this.blood_pressure = "";
      this.heart_rate = "";
    },
  },
};
</script>
<style>
.v-image__image--cover {
  background-size: contain;
}
.v-list--two-line .v-list__tile {
  height: 150px;
}
</style>
