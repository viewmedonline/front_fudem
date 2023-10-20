<template>
  <v-container>
    <v-card style="position: fixed; max-width: 25%; width: 20%">
      <v-card-title primary-title class="vm-bg-patient"></v-card-title>
      <v-divider light></v-divider>
      <v-card-text>
        <v-avatar color="patient" size="75px" class="vm-avatar-absolute">
          <v-icon dark>person</v-icon>
        </v-avatar>
        <br />
        <div>
          <span class="body-2 patient--text"
            >{{ storePatient.forename }} {{ storePatient.surname }}</span
          >
        </div>
        <div>
          <span class="title">{{ storePatient.idQflow }}</span>
        </div>
        <div>
          <span class="caption"
            >{{ $t("title.gender") }}:
            <span v-if="storePatient.gender">{{ storePatient.gender }} / </span>
            <span v-if="storePatient.birthdate"
              >{{ age(storePatient.birthdate) }} {{ $t("title.years") }}</span
            ></span
          >
        </div>
        <div v-if="storePatient.birthdate">
          <span class="caption"
            >{{ $t("title.birthdate") }}:
            {{ date(storePatient.birthdate) }}</span
          >
        </div>
        <v-list class="pt-1">
          <v-list-tile @click="fixedCompst('patient_form')">
            <v-list-tile-content>
              <v-list-tile-title>{{
                $t("title.information_patiente")
              }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>assignment_ind</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="fixedCompst('consultation')">
            <v-list-tile-content>
              <v-list-tile-title v-if="$route.query.c == 'H'"
                >Historial</v-list-tile-title
              >
              <v-list-tile-title v-else>{{
                $t("title.consultation")
              }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>folder_shared</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="fixedCompst('imaging')">
            <v-list-tile-content>
              <v-list-tile-title>{{
                $t("title.imagenology")
              }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>perm_media</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="fixedCompst('constancy')">
            <v-list-tile-content>
              <v-list-tile-title>Constancias</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>create</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile
            @click="fixedCompst('internist_evaluation_sheet')"
            v-if="storePhysician.role == 'internist'"
          >
            <v-list-tile-content>
              <v-list-tile-title
                >Hoja de Evaluación MI</v-list-tile-title
              >
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-file-document-edit-outline</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile
            @click="fixedCompst('nursing_sheet')"
            v-if="storePhysician.role == 'nurse' || storePhysician.role == 'Institution'"
          >
            <v-list-tile-content>
              <v-list-tile-title>Hoja de Enfermeria</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-file-document-edit-outline</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile
            @click="fixedCompst('surgery_sheet')"
            v-if="storePhysician.role == 'ophthalmologist'"
          >
            <v-list-tile-content>
              <v-list-tile-title>Hoja de Cirugía</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-file-document-edit-outline</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile
            @click="fixedCompst('reference_sheet')"
            v-if="
              storePhysician.role == 'internist' ||
              storePhysician.role == 'ophthalmologist'
            "
          >
            <v-list-tile-content>
              <v-list-tile-title v-if="storePhysician.role == 'internist'">Hoja de Referencia MI</v-list-tile-title>
              <v-list-tile-title v-else>Hoja de Referencia</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-file-document-edit-outline</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile
            @click="fixedCompst('constancy_disability')"
            v-if="
              storePhysician.role == 'ophthalmologist'
            "
          >
            <v-list-tile-content>
              <v-list-tile-title>Constancia de Incapacidad</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-file-document-edit-outline</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-textarea
            box
            v-model="historyClinic"
            :readonly="!storePhysician.user.role ? true : false"
            name="input-7-4"
            label="Resumen"
            @change="saveHistory()"
            :value="storePatient.historyClinic"
          ></v-textarea>
        </v-list>
      </v-card-text>
    </v-card>
    <v-dialog v-model="saveHistoryDialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Guardando
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
import * as personServ from "@/componentServs/person";
export default {
  name: "patient_bar",
  data: () => ({
    historyClinic: null,
    saveHistoryDialog: false,
  }),
  methods: {
    saveHistory() {
      this.saveHistoryDialog = true;
      let objAux = {
        idPerson: this.$store.getters.getPatient._id,
        body: {
          historyClinic: this.historyClinic,
        },
      };
      personServ
        .updatePerson(objAux)
        .then((resultUpdPerson) => {
          setTimeout(() => {
            this.saveHistoryDialog = false;
          }, 1000);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
    display(val) {
      this.$router.push({
        name: val,
      });
    },
    fixedCompst(val) {
      this.dataStore.patient = false;
      this.dataStore.consultation = false;
      this.dataStore.account = false;
      this.dataStore.imaging = false;
      this.dataStore.patient_form = false;
      this.dataStore.constancy = false;
      this.dataStore.nurse = false;
      this.dataStore.reference = false;
      this.dataStore.constancy_disability = false;
      this.dataStore.surgery_sheet = false;
      this.dataStore.internist_evaluation_sheet = false;
      switch (val) {
        case "consultation":
          this.dataStore.patient = true;
          this.dataStore.consultation = true;
          break;
        case "account":
          this.dataStore.account = true;
          break;
        case "imaging":
          this.dataStore.patient = true;
          this.dataStore.imaging = true;
          break;
        case "constancy":
          this.dataStore.patient = true;
          this.dataStore.constancy = true;
          break;
        case "patient_form":
          this.dataStore.patient = true;
          this.dataStore.patient_form = true;
          break;
        case "nursing_sheet":
          this.dataStore.patient = true;
          this.dataStore.nurse = true;
          break;
        case "reference_sheet":
          this.dataStore.patient = true;
          this.dataStore.reference = true;
          break;
        case "constancy_disability":
          this.dataStore.patient = true;
          this.dataStore.constancy_disability = true;
          break;
        case "surgery_sheet":
          this.dataStore.patient = true;
          this.dataStore.surgery_sheet = true;
          break;
        case "internist_evaluation_sheet":
          this.dataStore.patient = true;
          this.dataStore.internist_evaluation_sheet = true;
          break;
        default:
          this.dataStore.consultation = true;
      }
      this.commitCompst();
    },
    commitCompst() {
      this.$store.commit({
        type: "showCompst",
        state: this.dataStore,
      });
    },
    date(value) {
      let date = value.slice(0, 10);
      return moment(date, "YYYY-MM-DD").locale(this.$i18n.locale).format("L");
    },
    age(value) {
      return moment().diff(value, "years", false);
    },
  },
  created() {
    this.historyClinic = this.storePatient.historyClinic;
  },
  components: {},
  computed: {
    dataStore: {
      get: function () {
        return this.$store.getters.getComps;
      },
    },
    storePatient() {
      return this.$store.getters.getPatient;
    },
    storePhysician() {
      return this.$store.getters.getPhysician;
    },
  },
};
</script>
<style></style>
