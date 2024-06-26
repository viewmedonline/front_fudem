<template lang="">
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <span class="subheading white--text text-capitalize"
          >FORMULARIO DE ENTREVISTA CLINICA PARA ADULTOS
        </span>
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md px-0 py-0>
          <v-form
            style="margin-top: 25px"
            ref="formClinicalInterview"
            v-model="formClinicalInterview"
            autocomplete="off"
            lazy-validation
          >
            <v-layout row wrap>
              <v-flex xs12 class="title-div"> I. DATOS PERSONALES </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="dateInit"
                  label="Fecha de inicio"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="timeConsultation"
                  label="Hora de consulta"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="patientName"
                  label="Nombre del paciente"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="patPhone"
                  label="Numero de telefono"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="title-div">
                II. HISTORIA DEL PROBLEMA
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="reasonConsultation"
                  label="Motivo de consulta"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="firstTimeBad"
                  label="¿Cuándo se dio cuenta por primera vez que algo iba mal?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="causesOfProblem"
                  label="¿Cuáles fueron las causas o circunstancia en que apareció el problema?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="symptomsCharacteristics"
                  label="Curso y características del síntoma o síntomas: (¿Cuándo empezó, se quitó, incrementó, ha habido cambios, empeoró?, etc.)"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="currentSymptoms"
                  label="Estado actual del síntoma: ¿los síntomas se están solucionando en este momento?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="symptomPhenomenon"
                  label="Fenómenos o situaciones asociadas al síntoma: elementos que acompañan en otras áreas de la vida (por ejemplo, en el área laboral, pareja, estudios, familia, etc: "
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12 class="title-div"> III. HISTORIA FAMILIAR </v-flex>
              <v-flex xs6>
                <v-select
                  outline
                  v-model="civilState"
                  :items="['Soltero/a', 'Casado/a','Acompañado/a', 'Separado/a', 'Viudo/a']"
                  label="Estado civil"
                >
                </v-select>
              </v-flex>
              <v-flex xs6>
                <v-radio-group v-model="haveChildren" label="¿Tiene hijos?" row>
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 v-if="civilState != 'Viudo/a'">
                <v-textarea
                  v-model="whatLikeRelation"
                  label="¿Cómo es su relación con su pareja?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  outline
                  v-model="nameSon"
                  label="Nombre del hijo o hija"
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  outline
                  v-model="ageSon"
                  label="Edad"
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-radio-group v-model="liveWithYou" label="Vive con usted" row>
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  v-model="relationParents"
                  label="¿Cómo es la relación con sus padres?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-radio-group
                  v-model="hasBrother"
                  label="¿Tiene hermanos?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 class="title-div">
                IV. HISTORIA PERSONAL Y DEL DESARROLLO
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="relevantAspects"
                  label="Aspectos relevantes de su infancia y adolescencia"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="significantPerson"
                  label="¿Quiénes son las personas significativas en su vida? (no familiares) ¿Tiene amigos?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="workActually"
                  label="¿Trabaja actualmente?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6 v-if="workActually == 'Si'">
                <v-text-field
                  v-model="workDescription"
                  label="¿dónde trabaja y desde cuándo?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="dependents"
                  type="number"
                  label="¿Cuántas personas dependen económicamente de usted?"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 v-if="workActually == 'No'">
                <v-text-field
                  v-model="notWorkDescription"
                  label="¿a qué se debe?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="workActually == 'No'">
                <v-text-field
                  v-model="howMaintainedEconomy"
                  label="¿Como se mantiene economicamente?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="title-div">
                V. HISTORIAL DE ENFERMEDADES O TRASTORNOS MENTALES
              </v-flex>
              <v-flex :class="psychiatricTreatment == 'Si' ? 'xs6' : 'xs12'">
                <v-radio-group
                  v-model="psychiatricTreatment"
                  label="¿Ha recibido terapia psicológica anteriormente?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6 v-if="psychiatricTreatment == 'Si'">
                <v-text-field
                  v-model="psychiatricTreatmentDescription"
                  label="¿cuándo fue?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="psychiatricTreatment == 'Si'">
                <v-textarea
                  v-model="psychiatricConsultingPrevius"
                  label="¿Su consulta previa estaba relacionada con el problema actual o era con respecto a otro problema?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="medicalPsiTreatment"
                  label="¿Ha recibido medicamento psicofármaco?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 v-if="medicalPsiTreatment == 'Si'">
                <v-textarea
                  v-model="whatsMedication"
                  label="¿Qué medicamento toma?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="drinkHabits"
                  label="¿Cuáles son sus hábitos de bebida? (¿qué bebe?, ¿con qué frecuencia?)"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-select
                  outline
                  v-model="drinkFrequency"
                  :items="['Poco', 'Moderado', 'Mucho']"
                  label="¿Cuanto bebe?"
                >
                </v-select>
              </v-flex>
              <v-flex xs12 v-if="drinkFrequency != 'Mucho'">
                <v-textarea
                  v-model="questionDrink"
                  label="Si actualmente no bebe en exceso, ¿Ha habido algún período en su vida en el que bebiera mucho más? (¿Con qué frecuencia?, ¿qué bebía?, ¿cuándo?, ¿cuánto tiempo duró ese período?) "
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs8 v-if="drinkFrequency == 'Mucho'">
                <v-radio-group
                  v-model="drinkAlcohol"
                  label="¿Alguna vez faltó al trabajo o a clases o a sus ocupaciones porque estaba alcoholizado o de resaca?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs4 v-if="drinkAlcohol == 'Si'">
                <v-text-field
                  v-model="frequencyAbsences"
                  label="¿con qué frecuencia?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="drinkFrequency == 'Mucho'">
                <v-radio-group
                  v-model="reduceDrink"
                  label="¿Ha intentado reducir o eliminar el consumo de alcohol?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 v-if="drinkFrequency == 'Mucho'">
                <v-radio-group
                  v-model="drinkProblem"
                  label="¿Su consumo de alcohol le ha causado problemas con otras personas? ¿Le ha causados problemas con la ley?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs10 v-if="drinkFrequency == 'Mucho'">
                <v-radio-group
                  v-model="drinkProblemPsychological"
                  label="¿Su consumo de alcohol le ha causado problemas psicológicos, como sentirse deprimido o ansioso, problemas para dormir o irritabilidad?  "
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 class="title-div">
                VI. ABUSO FÍSICO, PSICOLÓGICO, SEXUAL
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="abuseExist"
                  label="¿Tiene problemas o conflictos con alguien de su entorno?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="fightsExist"
                  label="¿Se ve envuelto en peleas?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="ridiculeParents"
                  label="¿Recibe burlas o humillaciones de parte de alguien de su entorno?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="physicalAbuseExist"
                  label="¿Recibe golpes o maltrato físico de parte de alguien de su entorno?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="otherAbuseExist"
                  label="¿Recibe algún otro tipo de maltrato o abuso de parte de alguien de su entorno, físico, psicológico o sexual?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 class="title-div"> VII. TENDENCIAS SUICIDAS </v-flex>
              <v-flex :class="suicideAttempt == 'Si' ? 'xs6' : 'xs12'">
                <v-radio-group
                  v-model="suicideAttempt"
                  label="¿Alguna vez ha intentado quitarse la vida?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6 v-if="suicideAttempt == 'Si'">
                <v-textarea
                  outline
                  v-model="suicideAttemptDescription"
                  label="¿cuándo fue?, ¿qué método utilizó?,¿cuántos intentos ha tenido?, ¿qué pasaba con su vida en ese momento? "
                  row
                >
                </v-textarea>
              </v-flex>
              <v-flex xs12 v-if="suicideAttempt == 'Si'">
                <v-textarea
                  outline
                  v-model="whatDidAfterSuicideAttempts"
                  label="¿Qué hizo luego de sus intentos suicidas? ¿Buscó ayuda?"
                  row
                >
                </v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-btn color="primary" @click="saveClinicalInterview" large :loading="loading">
                  Guardar
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import moment from "moment";
import { saveInterviewAdults } from "../../componentServs/psyProcess";
import { getPreview } from "../../componentServs/file";

export default {
  data: () => ({
    formClinicalInterview: false,
    rules: {
      required: (value) => !!value || "Campo requerido",
    },
    dateInit: moment().format("DD/MM/YYYY"),
    timeConsultation: moment().format("hh:mm A"),
    patientName: "",
    patientAge: "",
    patPhone: "",
    reasonConsultation: "",
    firstTimeBad: "",
    causesOfProblem: "",
    symptomsCharacteristics: "",
    currentSymptoms: "",
    symptomPhenomenon: "",
    civilState: "",
    haveChildren: "",
    whatLikeRelation: "",
    nameSon: "",
    ageSon: "",
    liveWithYou: "",
    relationParents: "",
    hasBrother: "",
    relevantAspects: "",
    drinkHabits: "",
    significantPerson: "",
    workActually: "",
    workDescription: "",
    dependents: "",
    notWorkDescription: "",
    howMaintainedEconomy: "",
    psychiatricTreatment: "",
    psychiatricTreatmentDescription: "",
    psychiatricConsultingPrevius: "",
    medicalPsiTreatment: "",
    whatsMedication: "",
    drinkFrequency: "",
    questionDrink: "",
    drinkAlcohol: "",
    frequencyAbsences: "",
    reduceDrink: "",
    drinkProblem: "",
    drinkProblemPsychological: "",
    abuseExist: "",
    fightsExist: "",
    ridiculeParents: "",
    physicalAbuseExist: "",
    otherAbuseExist: "",
    suicideAttempt: "",
    suicideAttemptDescription: "",
    whatDidAfterSuicideAttempts: "",
    loading:false
  }),
  async mounted() {
    const { forename, surname, birthdate } = this.$store.getters.getPatient;
    this.patientName = `${forename} ${surname}`;
    this.patientAge = moment().diff(birthdate, "years");
  },
  methods: {
    clear(){
      this.dateInit = moment().format("DD/MM/YYYY");
      this.timeConsultation = moment().format("hh:mm A");
      this.patientName = "";
      this.patPhone = "";
      this.reasonConsultation = "";
      this.firstTimeBad = "";
      this.causesOfProblem = "";
      this.symptomsCharacteristics = "";
      this.currentSymptoms = "";
      this.symptomPhenomenon = "";
      this.civilState = "";
      this.haveChildren = "";
      this.whatLikeRelation = "";
      this.nameSon = "";
      this.ageSon = "";
      this.liveWithYou = "";
      this.relationParents = "";
      this.hasBrother = "";
      this.relevantAspects = "";
      this.significantPerson = "";
      this.workActually = "";
      this.drinkHabits = "";
      this.workDescription = "";
      this.dependents = "";
      this.notWorkDescription = "";
      this.howMaintainedEconomy = "";
      this.psychiatricTreatment = "";
      this.psychiatricTreatmentDescription = "";
      this.psychiatricConsultingPrevius = "";
      this.medicalPsiTreatment = "";
      this.whatsMedication = "";
      this.drinkFrequency = "";
      this.questionDrink = "";
      this.drinkAlcohol = "";
      this.frequencyAbsences = "";
      this.reduceDrink = "";
      this.drinkProblem = "";
      this.drinkProblemPsychological = "";
      this.abuseExist = "";
      this.fightsExist = "";
      this.ridiculeParents = "";
      this.physicalAbuseExist = "";
      this.otherAbuseExist = "";
      this.suicideAttempt = "";
      this.suicideAttemptDescription = "";
      this.whatDidAfterSuicideAttempts = "";
      this.patientAge = ""
    },
    async saveClinicalInterview() {
      if (window.confirm("¿Está seguro de guardar la entrevista?") === false)
        return;
      this.loading = true;
      const data = {
        dateInit: this.dateInit,
        timeConsultation: this.timeConsultation,
        patientName: this.patientName,
        patPhone: this.patPhone,
        patientAge: this.patientAge,
        reasonConsultation: this.reasonConsultation,
        firstTimeBad: this.firstTimeBad,
        causesOfProblem: this.causesOfProblem,
        symptomsCharacteristics: this.symptomsCharacteristics,
        currentSymptoms: this.currentSymptoms,
        symptomPhenomenon: this.symptomPhenomenon,
        civilState: this.civilState,
        haveChildren: this.haveChildren,
        whatLikeRelation: this.whatLikeRelation,
        nameSon: this.nameSon,
        ageSon: this.ageSon,
        liveWithYou: this.liveWithYou,
        relationParents: this.relationParents,
        hasBrother: this.hasBrother,
        relevantAspects: this.relevantAspects,
        significantPerson: this.significantPerson,
        workActually: this.workActually,
        workDescription: this.workDescription,
        dependents: this.dependents,
        notWorkDescription: this.notWorkDescription,
        drinkHabits: this.drinkHabits,
        howMaintainedEconomy: this.howMaintainedEconomy,
        psychiatricTreatment: this.psychiatricTreatment,
        psychiatricTreatmentDescription: this.psychiatricTreatmentDescription,
        psychiatricConsultingPrevius: this.psychiatricConsultingPrevius,
        medicalPsiTreatment: this.medicalPsiTreatment,
        whatsMedication: this.whatsMedication,
        drinkFrequency: this.drinkFrequency,
        questionDrink: this.questionDrink,
        drinkAlcohol: this.drinkAlcohol,
        frequencyAbsences: this.frequencyAbsences,
        reduceDrink: this.reduceDrink,
        drinkProblem: this.drinkProblem,
        drinkProblemPsychological: this.drinkProblemPsychological,
        abuseExist: this.abuseExist,
        fightsExist: this.fightsExist,
        ridiculeParents: this.ridiculeParents,
        physicalAbuseExist: this.physicalAbuseExist,
        otherAbuseExist: this.otherAbuseExist,
        suicideAttempt: this.suicideAttempt,
        suicideAttemptDescription: this.suicideAttemptDescription,
        whatDidAfterSuicideAttempts: this.whatDidAfterSuicideAttempts,
        name_prof: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
        digital_signature: this.$store.getters.getPhysician.digital_signature,
        responsableConsultation: this.$store.getters.getPhysician._id,
        person: this.$store.getters.getPatient._id,
      };

      // const file = await getPreview({
      //   name:"interview_adults.html",
      //   data
      // });
      // const blob = new Blob([file.data], { type: "application/pdf;base64" });
      // const link = window.URL.createObjectURL(blob);
      // window.open(link)
      await saveInterviewAdults({
        name: "interview_adults.html",
        data,
      });
      this.clear();
      this.loading = false
    },
  },
};
</script>
<style>
.title-div {
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #004969;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  text-align: start;
}
</style>
