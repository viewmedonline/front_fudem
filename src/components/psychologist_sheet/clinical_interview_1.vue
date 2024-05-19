<template lang="">
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <span class="subheading white--text text-capitalize"
          >FORMULARIO DE ENTREVISTA CLINICA PARA NIÑEZ Y ADOLESCENCIA
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
                  label="Nombre completo del niño, niña o adolescente"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="patientAge"
                  label="Edad"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="responsableName"
                  label="Nombre completo del responsable"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="responsableDui"
                  label="DUI del responsable"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="responsablePhone"
                  label="Telefono"
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
              <v-flex xs6>
                <v-textarea
                  v-model="symptomsPresent"
                  label="Síntomas presentes:"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-textarea
                  v-model="appearanceProblem"
                  label="Fecha de aparición del problema"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12 class="title-div"> III. HISTORIA FAMILIAR </v-flex>
              <v-flex xs6>
                <v-textarea
                  v-model="informationDad"
                  label="Información del padre"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-textarea
                  v-model="informationMom"
                  label="Información de la madre"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="abandonmentParents"
                  label="En caso de abandono de los padres, explicar motivos"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12 class="title-div">
                IV. HISTORIAL DE SALUD FAMILIAR, INFORMACION DE EMBARAZO Y
                HISTORIA DEL DESARROLLO
              </v-flex>
              <v-flex xs6>
                <v-radio-group
                  v-model="recordFamilyExist"
                  label="¿Existen antecedentes médicos familiares?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6>
                <v-radio-group
                  v-model="recordPsychiatricFamilyExist"
                  label="¿Existen antecedentes psiquiátricos familiares?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="recordFamilyAbuseExist"
                  label="¿Existen antecedentes en la familia de abuso de sustancias (alcohol o drogas)?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="pregnancyMother"
                  label="¿Cómo fue el embarazo de la madre? ¿Presento problemas durante el embarazo?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="pregnancyMotherNumber"
                  label="¿Cuántos embarazos ha tenido la madre?"
                  outline
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="howWasPregnancy"
                  label="¿Cómo fue el embarazo?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-radio-group
                  v-model="pregnancyMotherProblem"
                  label="¿La madre presentó algún problema en el embarazo?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6>
                <v-radio-group
                  v-model="pregnancyMotherAbuse"
                  label="¿La madre abusó de drogas o alcohol durante el embarazo? "
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="pregnancyMotherPsiProblem"
                  label="¿La madre presentó algún problema médico o psiquiátrico durante el embarazo?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 class="title-div">
                V. ANTECEDENTES PERINATALES
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="childBirth"
                  label="¿Cómo fue el parto del niño, niña o adolescente?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="cordComplication"
                  label="¿Sufrió el niño o la madre alguna complicación durante el parto?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>

              <v-flex xs12 class="title-div"> VI. ÁREA CONDUCTUAL </v-flex>
              <v-flex xs6>
                <v-textarea
                  v-model="childsRoutine"
                  label="¿Cómo es la rutina diaria del niño?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-textarea
                  v-model="sleepCycle"
                  label="¿Cómo es su ciclo de sueño?"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12 class="title-div"> VII. AREA VISUAL </v-flex>
              <v-flex xs4>
                <v-radio-group v-model="fixGaze" label="¿Fija la mirada?" row>
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs4>
                <v-radio-group v-model="useGlasses" label="¿Usa lentes?" row>
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs4>
                <v-radio-group
                  v-model="visualProblem"
                  label="¿Tiene algún problema visual?"
                  row
                >
                  <v-radio label="Si" value="Si" color="primary"></v-radio>
                  <v-radio label="No" value="No" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 v-if="visualProblem == 'Si'">
                <v-textarea
                  v-model="visualProblemDescription"
                  label="Explicar problema visual"
                  outline
                ></v-textarea>
              </v-flex>
              <v-flex xs12 class="title-div"> VIII. AREA SOCIAL </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="makeFriendsEasily"
                  label="¿Hace amigos con facilidad?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="whyNotMakeFriendsEasily"
                  label="¿Por qué no hace amigos con facilidad?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="fightWithOtherChildren"
                  label="¿Por qué cosas se pelea con otros niños?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="relationshipWithChildrenOfOtherSex"
                  label="¿Cómo se relaciona con los niños de otro sexo?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="whatHeLikesToDoInHisFreeTime"
                  label="¿Qué le gusta hacer en su tiempo libre?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="whatDoIsAlone"
                  label="¿Qué hace cuando está solo/a?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="whatNotLikeDo"
                  label="¿Qué no le gusta hacer?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="favoriteGames"
                  label="¿Cuáles son sus juegos favoritos?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="whatSportsHeLikes"
                  label="¿Qué tipo de deportes le gustan?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="whatTVShowsHeWatches"
                  label="¿Qué programas de televisión mira?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="title-div"> IX.AREA EMOCIONAL </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="wahtMakesHimHappy"
                  label="¿Qué lo hace feliz?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="wahtMakesHimSad"
                  label="¿Qué lo entristece?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="wahtMakesHimAngry"
                  label="¿Qué lo enoja?"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="wahtMakesHimAfraid"
                  label="¿Qué le da miedo?"
                  outline
                ></v-text-field>
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
import { saveInterviewChildren } from "../../componentServs/psyProcess";
import { getPreview } from "../../componentServs/file";

export default {
  data: () => ({
    formClinicalInterview: false,
    dateInit: moment().format("DD/MM/YYYY"),
    timeConsultation: moment().format("hh:mm A"),
    responsableName: "",
    responsableDui: "",
    patientName: "",
    patientAge: "",
    reasonConsultation: "",
    symptomsPresent: "",
    appearanceProblem: "",
    informationDad: "",
    informationMom: "",
    abandonmentParents: "",
    recordFamilyExist: "",
    recordPsychiatricFamilyExist: "",
    recordFamilyAbuseExist: "",
    childsRoutine: "",
    sleepCycle: "",
    fixGaze: "",
    useGlasses: "",
    visualProblem: "",
    visualProblemDescription: "",
    makeFriendsEasily: "",
    whyNotMakeFriendsEasily: "",
    fightWithOtherChildren: "",
    relationshipWithChildrenOfOtherSex: "",
    whatHeLikesToDoInHisFreeTime: "",
    whatDoIsAlone: "",
    whatNotLikeDo: "",
    favoriteGames: "",
    whatSportsHeLikes: "",
    whatTVShowsHeWatches: "",
    wahtMakesHimHappy: "",
    wahtMakesHimSad: "",
    wahtMakesHimAngry: "",
    wahtMakesHimAfraid: "",
    pregnancyMother: "",
    pregnancyMotherNumber: "",
    howWasPregnancy: "",
    pregnancyMotherProblem: "",
    pregnancyMotherAbuse: "",
    pregnancyMotherPsiProblem: "",
    childBirth: "",
    cordComplication: "",
    responsablePhone: "",
    loading: false,
  }),
  methods: {
    clear() {
      this.responsableName = "";
      this.responsableDui = "";
      this.reasonConsultation = "";
      this.symptomsPresent = "";
      this.appearanceProblem = "";
      this.informationDad = "";
      this.informationMom = "";
      this.abandonmentParents = "";
      this.recordFamilyExist = "";
      this.recordPsychiatricFamilyExist = "";
      this.recordFamilyAbuseExist = "";
      this.childsRoutine = "";
      this.sleepCycle = "";
      this.fixGaze = "";
      this.useGlasses = "";
      this.visualProblem = "";
      this.visualProblemDescription = "";
      this.makeFriendsEasily = "";
      this.whyNotMakeFriendsEasily = "";
      this.fightWithOtherChildren = "";
      this.relationshipWithChildrenOfOtherSex = "";
      this.whatHeLikesToDoInHisFreeTime = "";
      this.whatDoIsAlone = "";
      this.whatNotLikeDo = "";
      this.favoriteGames = "";
      this.whatSportsHeLikes = "";
      this.whatTVShowsHeWatches = "";
      this.wahtMakesHimHappy = "";
      this.wahtMakesHimSad = "";
      this.wahtMakesHimAngry = "";
      this.wahtMakesHimAfraid = "";
      this.pregnancyMother = "";
      this.pregnancyMotherNumber = "";
      this.howWasPregnancy = "";
      this.pregnancyMotherProblem = "";
      this.pregnancyMotherAbuse = "";
      this.pregnancyMotherPsiProblem = "";
      this.childBirth = "";
      this.cordComplication = "";
      this.responsablePhone = "";
    },
    async saveClinicalInterview() {
      if (window.confirm("¿Está seguro de guardar la entrevista?") === false)
        return;
      this.loading = true;
      const data = {
        dateInit: this.dateInit,
        timeConsultation: this.timeConsultation,
        patientName: this.patientName,
        patientAge: this.patientAge,
        responsableName: this.responsableName,
        responsableDui: this.responsableDui,
        reasonConsultation: this.reasonConsultation,
        symptomsPresent: this.symptomsPresent,
        appearanceProblem: this.appearanceProblem,
        informationDad: this.informationDad,
        informationMom: this.informationMom,
        abandonmentParents: this.abandonmentParents,
        recordFamilyExist: this.recordFamilyExist,
        recordPsychiatricFamilyExist: this.recordPsychiatricFamilyExist,
        recordFamilyAbuseExist: this.recordFamilyAbuseExist,
        childsRoutine: this.childsRoutine,
        sleepCycle: this.sleepCycle,
        fixGaze: this.fixGaze,
        useGlasses: this.useGlasses,
        visualProblem: this.visualProblem,
        visualProblemDescription: this.visualProblemDescription,
        makeFriendsEasily: this.makeFriendsEasily,
        whyNotMakeFriendsEasily: this.whyNotMakeFriendsEasily,
        fightWithOtherChildren: this.fightWithOtherChildren,
        relationshipWithChildrenOfOtherSex:
          this.relationshipWithChildrenOfOtherSex,
        whatHeLikesToDoInHisFreeTime: this.whatHeLikesToDoInHisFreeTime,
        whatDoIsAlone: this.whatDoIsAlone,
        whatNotLikeDo: this.whatNotLikeDo,
        favoriteGames: this.favoriteGames,
        whatSportsHeLikes: this.whatSportsHeLikes,
        whatTVShowsHeWatches: this.whatTVShowsHeWatches,
        wahtMakesHimHappy: this.wahtMakesHimHappy,
        wahtMakesHimSad: this.wahtMakesHimSad,
        wahtMakesHimAngry: this.wahtMakesHimAngry,
        wahtMakesHimAfraid: this.wahtMakesHimAfraid,
        pregnancyMother: this.pregnancyMother,
        pregnancyMotherNumber: this.pregnancyMotherNumber,
        howWasPregnancy: this.howWasPregnancy,
        pregnancyMotherProblem: this.pregnancyMotherProblem,
        pregnancyMotherAbuse: this.pregnancyMotherAbuse,
        pregnancyMotherPsiProblem: this.pregnancyMotherPsiProblem,
        childBirth: this.childBirth,
        cordComplication: this.cordComplication,
        responsablePhone: this.responsablePhone,
        name_prof: `${this.$store.getters.getPhysician.forename} ${this.$store.getters.getPhysician.surname}`,
        digital_signature: this.$store.getters.getPhysician.digital_signature,
        responsableConsultation: this.$store.getters.getPhysician._id,
        person: this.$store.getters.getPatient._id,
        type: "Psicologo",
      };
      await saveInterviewChildren({
        name: "interview_children.html",
        data,
      });
      this.loading = false;
      this.clear();
      // const file = await getPreview({
      //   name:"interview_children.html",
      //   data
      // });
      // const blob = new Blob([file.data], { type: "application/pdf;base64" });
      // const link = window.URL.createObjectURL(blob);
      // window.open(link)
    },
  },
  async mounted() {
    const { forename, surname, birthdate } = this.$store.getters.getPatient;
    this.patientName = `${forename} ${surname}`;
    this.patientAge = moment().diff(birthdate, "years");
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
