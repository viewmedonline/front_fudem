<template>
  <v-container>
    <v-layout justify-center row>
      <v-flex xs12 class="pb-2 text-history-wrap">
        <v-card class="elevation-2">
          <v-card-title primary-title>
            <h3 class="title font-weight-thin mb-0">
              {{ $t("title.personal_information") }}
            </h3>
          </v-card-title>
          <v-divider light class="vm-border-color-2"></v-divider>
          <v-card-text>
            <v-container grid-list-md text-xs-left>
              <v-layout row wrap>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.number_of_expedient") }}:&nbsp;</span
                  >
                  <span class="body-1">{{ myProp.person.idQflow }}</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.registration_date") }}:&nbsp;</span
                  >
                  <span class="body-1">{{
                    date(myProp.person.registrationdate)
                  }}</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $tc("title.forename", 2) }}:&nbsp;</span
                  >
                  <span class="body-1">{{ myProp.person.forename }}</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $tc("title.surname", 2) }}:&nbsp;</span
                  >
                  <span class="body-1">{{ myProp.person.surname }}</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.age") }}:&nbsp;</span
                  >
                  <span class="body-1">{{
                    myProp.person.birthdate | age
                  }}</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.birthdate") }}:&nbsp;</span
                  >
                  <span class="body-1">{{
                    date(myProp.person.birthdate)
                  }}</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.identification_document") }}:&nbsp;</span
                  >
                  <span class="body-1">{{ myProp.person.id_document }}</span>
                </v-flex>
                <v-flex xs3>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.genero") }}:&nbsp;</span
                  >
                  <span class="body-1">{{ storePatient.gender }}</span>
                </v-flex>
                <v-flex xs3>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.read_write") }}:&nbsp;</span
                  >
                  <span class="body-1">{{
                    boolean(storePatient.readWrtite)
                  }}</span>
                </v-flex>

                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.use_lenses") }}:&nbsp;</span
                  >
                  <span class="body-1">{{ boolean(storePatient.lenses) }}</span>
                </v-flex>
                <!-- <v-flex xs6>
                                  <span
                                    class="body-1 font-weight-light font-italic"
                                  >{{ $t('title.category') }}:&nbsp;</span>
                                  <span class="body-1">{{storePatient.category}}</span>
                                </v-flex> -->
                <v-flex xs6>
                  <span class="body-1 font-weight-light font-italic"
                    >{{ $t("title.nationality") }}:&nbsp;</span
                  >
                  <span class="body-1">{{ storePatient.nationality }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-title primary-title v-if="myProp.objPreliminary.data">
            <h3 class="title font-weight-thin mb-0">
              {{ $t("title.preliminary") }}
            </h3>
          </v-card-title>
          <v-divider
            light
            class="vm-border-color-2"
            v-if="myProp.objPreliminary.data"
          ></v-divider>
          <v-card-text v-if="myProp.objPreliminary.data">
            <v-container
              grid-list-md
              text-xs-left
              v-if="myProp.objPreliminary.data"
            >
              <v-layout row wrap v-if="myProp.typeConsultation">
                <v-flex xs4>
                  <span class="primary--text">Tipo de Consulta</span>
                </v-flex>
                <v-flex xs4>
                  <span class="primary--text">Fecha de Consulta</span>
                </v-flex>
                <v-flex xs4>
                  <span class="primary--text">Hora de Consulta</span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-light font-italic">
                    {{ langTypeConsulting(myProp.typeConsultation) }}
                  </span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-light font-italic">
                    {{ date(myProp.objPreliminary.control.created_at) }}
                  </span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-light font-italic">
                    {{ myProp.control.created_at | hour }}
                  </span>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex
                  xs12
                  v-if="myProp.objPreliminary.data.reasonConsultation"
                >
                  <span class="primary--text">Motivo de la Consulta</span>
                </v-flex>
                <v-flex xs12>
                  <span class="body-1 font-weight-light font-italic">
                    {{ myProp.objPreliminary.data.reasonConsultation }}
                  </span>
                </v-flex>
              </v-layout>

              <v-divider light></v-divider>
              <v-layout row wrap>
                <v-flex xs12 v-if="showAntecedent()">
                  <span class="primary--text">{{
                    $t("title.antecedents")
                  }}</span>
                </v-flex>

                <v-flex
                  xs3
                  v-for="(antecedentes, x) in showAntecedent().antecedentes"
                >
                  <span class="body-1 font-weight-light font-italic">
                    {{ antecedentes.name.toUpperCase() }}:&nbsp;
                  </span>
                  <span class="body-1">{{ boolean(antecedentes.value) }}</span>
                </v-flex>
                <v-flex xs12 v-if="showAntecedent().otros">
                  <span class="body-1"> {{ $t("title.other") }}:&nbsp; </span>
                  <span class="body-1 font-weight-light font-italic">{{
                    showAntecedent().otros
                  }}</span>
                </v-flex>
                <v-flex xs12 v-if="showAntecedent().medicamentosAntecedent">
                  <span class="body-1">
                    {{ $t("antecedent.use_of_medications") }}:&nbsp;
                  </span>
                  <span class="body-1 font-weight-light font-italic">{{
                    showAntecedent().medicamentosAntecedent
                  }}</span>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout
                row
                wrap
                v-if="
                  myProp.objPreliminary.data &&
                  myProp.objPreliminary.data.generalData
                "
              >
                <v-flex xs12>
                  <span class="primary--text">
                    {{ $t("title.type_of_lenses") }}</span
                  >
                </v-flex>
                <v-flex xs12>
                  <v-flex xs12>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.type_of_lenses") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      langTypeLenses(
                        myProp.objPreliminary.data.generalData.typeLense
                      )
                    }}</span>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout row wrap v-if="myProp.record.otrosDatos">
                <v-flex xs12>
                  <span class="primary--text">
                    {{ $t("title.other_data") }}</span
                  >
                </v-flex>
                <v-flex xs12>
                  <span class="body-1 font-weight-light font-italic">
                    {{ $t("antecedent.allergic_to") }}:&nbsp;
                  </span>
                  <span
                    class="body-1"
                    v-if="Array.isArray(myProp.record.otrosDatos.alergias)"
                  >
                    {{ myProp.record.otrosDatos.alergias[0] }}
                  </span>
                  <span class="body-1" v-else>
                    {{ myProp.record.otrosDatos.alergias }}
                  </span>
                </v-flex>
                <v-flex xs12 v-if="myProp.record.otrosDatos">
                  <span class="body-1 font-weight-light font-italic">
                    {{ $t("antecedent.use_of_medications") }}:&nbsp;
                  </span>
                  <span
                    class="body-1"
                    v-if="Array.isArray(myProp.record.otrosDatos.medicamentos)"
                  >
                    {{ myProp.record.otrosDatos.medicamentos[0] }}
                  </span>
                  <span class="body-1" v-else>
                    {{ myProp.record.otrosDatos.medicamentos }}
                  </span>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout
                row
                wrap
                class="pt-1"
                v-if="myProp.objPreliminary.data.agudezaVisual"
              >
                <v-flex xs12>
                  <span class="primary--text">{{
                    $t("title.visual_acuity")
                  }}</span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-medium">
                    {{ $t("title.right_eye") }}
                  </span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-light font-italic">
                    {{ $t("title.with_correction") }}:&nbsp;
                  </span>
                  <span class="body-1">{{
                    myProp.objPreliminary.data.agudezaVisual.ojoDer
                      .correccion || " - "
                  }}</span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-light font-italic">
                    {{ $t("title.no_correction") }}:&nbsp;
                  </span>
                  <span class="body-1">{{
                    myProp.objPreliminary.data.agudezaVisual.ojoDer
                      .sinCorreccion || " - "
                  }}</span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-medium">
                    {{ $t("title.left_eye") }}
                  </span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-light font-italic">
                    {{ $t("title.with_correction") }}:&nbsp;
                  </span>
                  <span class="body-1">{{
                    myProp.objPreliminary.data.agudezaVisual.ojoIzq
                      .correccion || " - "
                  }}</span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-light font-italic">
                    {{ $t("title.no_correction") }}:&nbsp;
                  </span>
                  <span class="body-1">{{
                    myProp.objPreliminary.data.agudezaVisual.ojoIzq
                      .sinCorreccion || " - "
                  }}</span>
                </v-flex>
                <v-flex xs12>
                  <span class="body-1 font-weight-light font-italic">
                    {{ $t("title.observations") }}:&nbsp;
                  </span>
                  <span class="body-1">{{
                    myProp.objPreliminary.data.agudezaVisual.observation ||
                    " - "
                  }}</span>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout row wrap class="pt-1">
                <v-flex xs12>
                  <span class="primary--text">Tonometria</span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-medium">
                    {{ $t("title.right_eye") }}:&nbsp;
                  </span>
                  <span class="body-1">{{
                    (myProp.objPreliminary.data.tonometria &&
                      myProp.objPreliminary.data.tonometria.ojoDer) ||
                    " - "
                  }}</span>
                </v-flex>
                <v-flex xs4>
                  <span class="body-1 font-weight-medium">
                    {{ $t("title.left_eye") }}:&nbsp;
                  </span>
                  <span class="body-1">{{
                    (myProp.objPreliminary.data.tonometria &&
                      myProp.objPreliminary.data.tonometria.ojoIzq) ||
                    " - "
                  }}</span>
                </v-flex>
                <v-flex xs4 v-if="myProp.objPreliminary.data.reason">
                  <span class="body-1 font-weight-medium">
                    No colabora:&nbsp
                  </span>
                  <span class="body-1">{{
                    (myProp.objPreliminary.data &&
                      myProp.objPreliminary.data.reason) ||
                    " - "
                  }}</span>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <span class="primary--text">Camara de retina</span>
                </v-flex>
                <v-flex xs3>
                  <span style="font-weight: bold"
                    >Fotografía de retina:
                    <span class="body-1">{{
                      myProp.objPreliminary.data.retinal_photo || "-"
                    }}</span></span
                  >
                </v-flex>
                <v-flex xs3>
                  <span style="font-weight: bold"
                    >Hallazgo en fotografía:
                    <span class="body-1">{{
                      myProp.objPreliminary.data.retinal_findings || "-"
                    }}</span></span
                  >
                </v-flex>
                <v-flex xs3>
                  <span style="font-weight: bold"
                    >Observaciones en fotografía:
                    <span class="body-1">{{
                      myProp.objPreliminary.data.retinal_observations || "-"
                    }}</span></span
                  >
                </v-flex>
                <v-flex xs3>
                  <span style="font-weight: bold"
                    >Notas:
                    <span class="body-1">{{
                      myProp.objPreliminary.data.retinal_notes || "-"
                    }}</span></span
                  >
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout row wrap class="pt-1">
                <v-flex xs12>
                  <span class="primary--text">Realizado Por</span>
                </v-flex>
                <v-flex xs6>
                  <span class="body-1 font-weight-medium">
                    Responsable:&nbsp;
                  </span>
                  <span class="body-1">{{
                    myProp.objPreliminary.data.responsablePreliminar || " - "
                  }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider light v-if="myProp.objPreliminary.data"></v-divider>
          <v-card-title primary-title>
            <h3 class="title font-weight-thin mb-0">
              {{ $t("title.consultation_information") }}
            </h3>
          </v-card-title>
          <v-divider light class="vm-border-color-2"></v-divider>
          <v-card-text>
            <v-container grid-list-md text-xs-left>
              <v-layout row wrap v-if="myProp.next_appointment">
                <v-flex xs12>
                  <span class="primary--text"
                    >{{ $t("title.next_appointment") }}:&nbsp;</span
                  >
                </v-flex>
                <v-flex xs12>
                  <span class="body-1 font-weight-light font-italic">
                    {{ myProp.next_appointment || " - " }}
                  </span>
                </v-flex>
              </v-layout>
              <v-divider light v-if="myProp.next_appointment"></v-divider>

              <v-layout row wrap>
                <v-flex xs12>
                  <span class="primary--text"
                    >{{ $t("title.date_Consulting") }}:&nbsp;</span
                  >
                </v-flex>
                <v-flex xs12>
                  <span class="body-1 font-weight-light font-italic">
                    {{ date(dateConsultig(myProp.control.created_at)) }}
                    {{ dateConsultig(myProp.control.created_at) | hour }}
                  </span>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <span class="primary--text">¿Se dió Receta?&nbsp;</span>
                </v-flex>
                <v-flex xs12>
                  <span class="body-1 font-weight-light font-italic">
                    {{ myProp.receta }}
                  </span>
                </v-flex>
              </v-layout>

              <v-divider light></v-divider>
              <v-layout row wrap v-if="myProp.reasonConsultation">
                <v-flex xs12>
                  <span class="primary--text">{{
                    $t("title.reasonforconsultation")
                  }}</span>
                </v-flex>
                <v-flex xs12>
                  <span class="body-1 font-weight-light font-italic">
                    {{ myProp.reasonConsultation || " - " }}
                  </span>
                </v-flex>
              </v-layout>
              <v-divider light v-if="myProp.objOphthalmology.data"></v-divider>
              <v-layout
                row
                wrap
                v-if="
                  myProp.objOphthalmology.data &&
                  myProp.objOphthalmology.data.historyClinic
                "
              >
                <v-flex xs12>
                  <span class="primary--text">Historia Clinica</span>
                </v-flex>
                <v-flex xs12>
                  <span class="body-1 font-weight-light font-italic">
                    {{ myProp.objOphthalmology.data.historyClinic || " - " }}
                  </span>
                </v-flex>
              </v-layout>
              <v-divider light v-if="myProp.objOphthalmology.data"></v-divider>
              <v-layout
                row
                wrap
                v-if="
                  myProp.objOphthalmology.data &&
                  myProp.objOphthalmology.data.generalData
                "
              >
                <v-flex xs12>
                  <span class="primary--text">
                    {{ $t("title.type_of_lenses") }}</span
                  >
                </v-flex>
                <v-flex xs12>
                  <v-flex xs12>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.type_of_lenses") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      langTypeLenses(
                        myProp.objOphthalmology.data.generalData.typeLense
                      ) || " - "
                    }}</span>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <!-- JUNIOR ANTECEDENTES -->
              <v-layout row wrap v-if="showAntecedent()">
                <v-flex xs12>
                  <span class="primary--text">{{
                    $t("title.antecedents")
                  }}</span>
                </v-flex>
                <v-flex
                  xs3
                  v-for="(antecedentes, x) in showAntecedent().antecedentes"
                  :key="x"
                >
                  <span class="body-1 font-weight-light font-italic">
                    {{ antecedentes.name.toUpperCase() }}:&nbsp;
                  </span>
                  <span class="body-1">{{ boolean(antecedentes.value) }}</span>
                </v-flex>
                <v-flex xs12 v-if="showAntecedent().otros">
                  <span class="body-1"> {{ $t("title.other") }}:&nbsp; </span>
                  <span class="body-1 font-weight-light font-italic">{{
                    showAntecedent().otros
                  }}</span>
                </v-flex>
                <v-flex xs12 v-if="showAntecedent().medicamentosAntecedent">
                  <span class="body-1">
                    {{ $t("antecedent.use_of_medications") }}:&nbsp;
                  </span>
                  <span class="body-1 font-weight-light font-italic">{{
                    showAntecedent().medicamentosAntecedent
                  }}</span>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-else>
                <v-flex xs12>
                  <span class="primary--text">{{
                    $t("title.antecedents")
                  }}</span>
                </v-flex>
                <v-flex xs12>
                  <div class="text-xs-center">
                    <v-card color="green accent-2">
                      <v-card-text>
                        Informe al personal de Tecnología de FUDEM para
                        solventar los antecedentes en esta consulta.
                      </v-card-text>
                    </v-card>
                  </div>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout row wrap v-if="showSurgeries()">
                <v-flex xs12 v-if="myProp.record.cirugias.cirugias.length > 0">
                  <span class="primary--text">{{
                    $t("title.previous_surgeries")
                  }}</span>
                </v-flex>
                <v-flex xs6 v-if="myProp.record.cirugias.cirugias.length > 0">
                  <v-flex xs12>
                    <span class="primary--text">{{
                      $t("title.right_eye")
                    }}</span>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex
                        xs6
                        v-for="(cirugias, j) in myProp.record.cirugias.cirugias"
                      >
                        <span class="body-1 font-weight-light font-italic">
                          {{ capilatize(cirugias.name) }}:&nbsp;
                        </span>
                        <span class="body-1">{{
                          boolean(cirugias.eyeRight)
                        }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
                <v-flex xs6 v-if="myProp.record.cirugias.cirugias.length > 0">
                  <v-flex xs12>
                    <span class="primary--text">{{
                      $t("title.left_eye")
                    }}</span>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex
                        xs6
                        v-for="(cirugias, j) in myProp.record.cirugias.cirugias"
                      >
                        <span class="body-1 font-weight-light font-italic">
                          {{
                            capilatize(myProp.record.cirugias.cirugias[j].name)
                          }}:&nbsp;
                        </span>
                        <span class="body-1">{{
                          boolean(myProp.record.cirugias.cirugias[j].eyeLeft)
                        }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
                <v-flex
                  xs12
                  v-if="myProp.objPreliminary && myProp.objPreliminary.data"
                >
                  <v-layout row wrap>
                    <v-flex xs6>
                      <span class="body-1 font-weight-light font-italic">
                        {{ $t("title.others") }}:&nbsp;
                      </span>
                      <span class="body-1">{{
                        myProp.record.cirugias.othersEyeRight
                      }}</span>
                    </v-flex>
                    <v-flex xs6>
                      <span class="body-1 font-weight-light font-italic">
                        {{ $t("title.others") }}:&nbsp;
                      </span>
                      <span class="body-1">{{
                        myProp.record.cirugias.othersEyeLeft
                      }}</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-else>
                <v-flex xs12>
                  <span class="primary--text">{{
                    $t("title.previous_surgeries")
                  }}</span>
                </v-flex>
                <v-flex xs12>
                  <div class="text-xs-center">
                    <v-card color="green accent-2">
                      <v-card-text>
                        Ha ocurrido un error al almacenar las
                        {{ $t("title.previous_surgeries") }} en esta consulta.
                      </v-card-text>
                    </v-card>
                  </div>
                </v-flex>
              </v-layout>
              <v-divider light v-if="myProp.objOphthalmology.data"></v-divider>
              <div v-if="myProp.objOptometrist.data">
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOptometrist.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">{{
                      $t("title.visual_acuity")
                    }}</span>
                  </v-flex>
                  <v-flex xs3> </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.no_correction") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.with_correction") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.ph") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.auto_tonometry") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.agudezaVisualOPT && myProp.objOptometrist.data.agudezaVisualOPT.ojoDer
                        .sinCorreccion || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.agudezaVisualOPT && myProp.objOptometrist.data.agudezaVisualOPT.ojoDer
                        .correccion || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.agudezaVisualOPT && myProp.objOptometrist.data.agudezaVisualOPT.ojoDer.ph ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.agudezaVisualOPT && myProp.objOptometrist.data.agudezaVisualOPT.ojoDer
                        .autoTonometria || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.agudezaVisualOPT && myProp.objOptometrist.data.agudezaVisualOPT.ojoIzq
                        .sinCorreccion || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.agudezaVisualOPT && myProp.objOptometrist.data.agudezaVisualOPT.ojoIzq
                        .correccion || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.agudezaVisualOPT && myProp.objOptometrist.data.agudezaVisualOPT.ojoIzq.ph ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.agudezaVisualOPT && myProp.objOptometrist.data.agudezaVisualOPT.ojoIzq
                        .autoTonometria || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs12>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.observations") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      (myProp.objPreliminary.data.agudezaVisualOPT &&
                        myProp.objPreliminary.data.agudezaVisualOPT
                          .observation) ||
                      " - "
                    }}</span>
                  </v-flex>
                </v-layout>

                <v-divider light></v-divider>
                <v-layout row wrap class="pt-1">
                  <v-flex xs12>
                    <span class="primary--text mt-2">{{
                      $t("title.autorefraction")
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.autorefraccionA
                        ? myProp.objOptometrist.data.autorefraccionA.ojoDer
                            .esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.autorefraccionA
                        ? myProp.objOptometrist.data.autorefraccionA.ojoDer
                            .cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.autorefraccionA
                        ? myProp.objOptometrist.data.autorefraccionA.ojoDer.eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.autorefraccionA
                        ? myProp.objOptometrist.data.autorefraccionA.ojoIzq
                            .esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.autorefraccionA
                        ? myProp.objOptometrist.data.autorefraccionA.ojoIzq
                            .cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.autorefraccionA
                        ? myProp.objOptometrist.data.autorefraccionA.ojoIzq.eje
                        : " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOptometrist.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">{{
                      $t("title.keratometry")
                    }}</span>
                  </v-flex>
                  <v-flex xs2> </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere_keratonom") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder_keratonom") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1">
                      {{
                        myProp.objOptometrist.data.queratometria
                          ? myProp.objOptometrist.data.queratometria.ojoDer
                              .esfera
                          : " - "
                      }}
                    </span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.queratometria
                        ? myProp.objOptometrist.data.queratometria.ojoDer.ejeEs
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.queratometria
                        ? myProp.objOptometrist.data.queratometria.ojoDer
                            .cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.queratometria
                        ? myProp.objOptometrist.data.queratometria.ojoDer.ejeCil
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.queratometria
                        ? myProp.objOptometrist.data.queratometria.ojoIzq.esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.queratometria
                        ? myProp.objOptometrist.data.queratometria.ojoIzq.ejeEs
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.queratometria
                        ? myProp.objOptometrist.data.queratometria.ojoIzq
                            .cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.queratometria
                        ? myProp.objOptometrist.data.queratometria.ojoIzq.ejeCil
                        : " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>

                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOptometrist.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">{{
                      $t("title.lensometry")
                    }}</span>
                  </v-flex>
                  <v-flex xs2> </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.prism") }}&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.addition") }}&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoDer.esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoDer.cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoDer.eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoDer.prisma
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoDer.adicion
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoIzq.esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoIzq.cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoIzq.eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoIzq.prisma
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.ojoIzq.adicion
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic"
                      >Tipo de lentes:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.lensometria
                        ? myProp.objOptometrist.data.lensometria.typeLenses
                        : " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>

                <v-divider
                  light
                  v-if="myProp.objOptometrist.data.tonometria"
                ></v-divider>

                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOptometrist.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">{{
                      $t("title.refraction")
                    }}</span>
                  </v-flex>
                  <v-flex xs2> </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.av") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      Adición
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoDer.esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoDer.cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoDer.eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoDer.av
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoDer.add
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoIzq.esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoIzq.cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoIzq.eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoIzq.av
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ojoIzq.add
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center">
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.cycle") }}:
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion ? boolean(myProp.objOptometrist.data.refraccion.ciclo) : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center">
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.est") }}:
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion ? boolean(myProp.objOptometrist.data.refraccion.est) : " - "  
                    }}</span>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center">
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.dinm") }}:
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? boolean(myProp.objOptometrist.data.refraccion.dinm)
                        : " - "
                    }}</span>
                  </v-flex>

                  <v-flex xs4 class="text-xs-center">
                    <span class="body-1 font-weight-medium"> PPC: </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ppc
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center">
                    <span class="body-1 font-weight-medium"> CT: </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.ct
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center">
                    <span class="body-1 font-weight-medium">
                      Reflejos pupilares:
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.refraccion
                        ? myProp.objOptometrist.data.refraccion.rp
                        : " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider
                  light
                  v-if="myProp.objOptometrist.data.refraccion"
                ></v-divider>
                <v-layout row wrap v-if="myProp.objOptometrist.data">
                  <v-flex xs12>
                    <span class="primary--text">RX Final Gafas</span>
                  </v-flex>
                  <v-flex xs1> </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.prism") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.addition") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.av") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1 font-weight-medium"> OD </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoDer && myProp.objOptometrist.data.rxFinalGafas.ojoDer.esfera ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoDer && myProp.objOptometrist.data.rxFinalGafas.ojoDer.cilindro ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoDer && myProp.objOptometrist.data.rxFinalGafas.ojoDer.eje ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoDer && myProp.objOptometrist.data.rxFinalGafas.ojoDer.Prisma ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoDer && myProp.objOptometrist.data.rxFinalGafas.ojoDer.ADD ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoDer && myProp.objOptometrist.data.rxFinalGafas.ojoDer.av || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1 font-weight-medium"> OI </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoIzq && myProp.objOptometrist.data.rxFinalGafas.ojoIzq.esfera ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoIzq && myProp.objOptometrist.data.rxFinalGafas.ojoIzq.cilindro ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoIzq && myProp.objOptometrist.data.rxFinalGafas.ojoIzq.eje ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoIzq && myProp.objOptometrist.data.rxFinalGafas.ojoIzq.Prisma ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoIzq && myProp.objOptometrist.data.rxFinalGafas.ojoIzq.ADD ||
                      " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalGafas &&  myProp.objOptometrist.data.rxFinalGafas.ojoIzq && myProp.objOptometrist.data.rxFinalGafas.ojoIzq.av || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-light font-italic"
                      >Tipo de lentes:&nbsp;
                    </span>
                    <span class="body-1">{{
                      typeof myProp.objOptometrist.data.rxFinalGafas.type_lenses =="object" ? myProp.objOptometrist.data.rxFinalGafas.type_lenses.join() : myProp.objOptometrist.data.rxFinalGafas.type_lenses
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic">
                      Ocupacion:
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data &&
                      myProp.objOptometrist.data.rxFinalGafas
                        ? myProp.objOptometrist.data.rxFinalGafas.ocupation
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic">
                      Observaciones:
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data &&
                      myProp.objOptometrist.data.rxFinalGafas
                        ? myProp.objOptometrist.data.rxFinalGafas.observation
                        : " - "
                    }}</span>
                  </v-flex>
                  
                </v-layout>
                <v-divider
                  light
                  v-if="myProp.objOptometrist.data.rxFinalGafas"
                ></v-divider>
                <v-layout row wrap v-if="myProp.objOptometrist.data">
                  <v-flex xs12>
                    <span class="primary--text"
                      >RX Final Lentes de Contacto</span
                    >
                  </v-flex>
                  <v-flex xs12>
                    <span class="body-1 font-weight-medium font-italic">
                      OD
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.sphere") }}
                    </span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.cylinder") }}
                    </span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.axis") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.cb") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.rx_contact_lenses_dia") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.av") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.brand") }}
                    </span>
                  </v-flex>

                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoDer
                        .esfera || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoDer
                        .cilindro || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoDer
                        .eje || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoDer
                        .cb || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoDer
                        .dia || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoDer
                        .av || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoDer
                        .brand || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs12>
                    <span class="body-1 font-weight-medium font-italic">
                      OI
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.sphere") }}
                    </span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.cylinder") }}
                    </span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.axis") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.cb") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.rx_contact_lenses_dia") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.av") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium font-italic">
                      {{ $t("title.brand") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoIzq
                        .esfera
                    }}</span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoIzq
                        .cilindro || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs1>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoIzq
                        .eje || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoIzq
                        .cb || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoIzq
                        .dia || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoIzq
                        .av || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalLentesContacto.ojoIzq
                        .brand || " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider
                  light
                  v-if="myProp.objOptometrist.data.rxFinalLentesContacto"
                ></v-divider>
                <v-layout row wrap v-if="myProp.objOptometrist.data">
                  <v-flex xs12>
                    <span class="primary--text">RX Final Visión Lejana</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.prism") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      Adicion:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.av") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2 style="position: absolute;margin-top: 5%;margin-left: -30px;">
                    <span class="body-1 font-weight-medium"> OD </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer
                        .esfera : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer
                        .cilindro : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer
                        .eje : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer
                        .prisma : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer
                        .adicion : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoDer
                        .av : " - "
                    }}</span>
                  </v-flex>

                  <v-flex xs2 style="position: absolute;margin-top: 7%;margin-left: -30px;">
                    <span class="body-1 font-weight-medium"> OI </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq
                        .esfera : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq
                        .cilindro : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq
                        .eje : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq
                        .prisma : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq
                        .adicion : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq ? myProp.objOptometrist.data.rxFinalVisionLejano.ojoIzq
                        .av : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic"
                      >Tipo de lentes:&nbsp;
                    </span>
                    <span class="body-1">{{
                      typeof myProp.objOptometrist.data.rxFinalVisionLejano.type_lenses =="object" ? myProp.objOptometrist.data.rxFinalVisionLejano.type_lenses.join() : myProp.objOptometrist.data.rxFinalVisionLejano.type_lenses
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic"
                      >Observaciones:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionLejano
                        .observation || " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light v-if="myProp.objOptometrist.data"></v-divider>
                <v-layout row wrap v-if="myProp.objOptometrist.data">
                  <v-flex xs12>
                    <span class="primary--text">RX Final Visión Proxima</span>
                  </v-flex>
                  <v-flex xs2> </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      Eje (Grados):&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.prism") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.av") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium"> OD </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                            .esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                            .cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                            .eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                            .prisma
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoDer
                            .av
                        : " - "
                    }}</span>
                  </v-flex>

                  <v-flex xs2>
                    <span class="body-1 font-weight-medium"> OI </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                            .esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                            .cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                            .eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                            .prisma
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionProxima.ojoIzq
                            .av
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic"
                      >Tipo de lentes:&nbsp;
                    </span>
                    <span class="body-1">{{
                      typeof myProp.objOptometrist.data.rxFinalVisionProxima.type_lenses =="object" ? myProp.objOptometrist.data.rxFinalVisionProxima.type_lenses.join() : myProp.objOptometrist.data.rxFinalVisionProxima.type_lenses
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic"
                      >Observaciones:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionProxima
                        ? myProp.objOptometrist.data.rxFinalVisionProxima
                            .observation
                        : " - "
                    }}</span>
                  </v-flex>
                </v-layout>

                <v-divider
                  light
                  v-if="myProp.objOptometrist.data.rxFinalVisionProxima"
                ></v-divider>
                <v-layout row wrap v-if="myProp.objOptometrist.data">
                  <v-flex xs12>
                    <span class="primary--text"
                      >RX Final Visión Intermedia</span
                    >
                  </v-flex>
                  <v-flex xs2> </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.sphere") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.cylinder") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.axis") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.prism") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.av") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-medium"> OD </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                            .esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                            .cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                            .eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                            .prisma
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoDer
                            .av
                        : " - "
                    }}</span>
                  </v-flex>

                  <v-flex xs2>
                    <span class="body-1 font-weight-medium"> OI </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                            .esfera
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                            .cilindro
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                            .eje
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                            .prisma
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia.ojoIzq
                            .av
                        : " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic"
                      >Tipo de lentes:&nbsp;
                    </span>
                    <span class="body-1">{{
                      typeof myProp.objOptometrist.data.rxFinalVisionIntermedia.type_lenses =="object" ? myProp.objOptometrist.data.rxFinalVisionIntermedia.type_lenses.join() : myProp.objOptometrist.data.rxFinalVisionIntermedia.type_lenses
                    }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="body-1 font-weight-light font-italic"
                      >Observaciones:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOptometrist.data.rxFinalVisionIntermedia
                        ? myProp.objOptometrist.data.rxFinalVisionIntermedia
                            .observation
                        : " - "
                    }}</span>
                  </v-flex>
                </v-layout>

                <v-divider
                  light
                  v-if="myProp.objOptometrist.data.rxFinalVisionIntermedia"
                ></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOptometrist.data"
                >
                  <v-flex xs12>
                    <span class="primary--text"
                      >Diagnostico y Observaciones</span
                    >
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium primary--text">
                      {{ $t("title.right_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium primary--text">
                      {{ $t("title.left_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-layout row wrap>
                          <v-flex
                            xs4
                            v-for="(diagnostic, v) in myProp.objOptometrist.data
                              .diagnosticoObservaciones.diagnostico"
                            v-if="
                              myProp.diagnosticoObservaciones.diagnostico[v]
                                .eyeRight == true
                            "
                          >
                            <span class="body-1 font-weight-light font-italic">
                              {{
                                capilatize(
                                  $t(
                                    "antecedent." +
                                      myProp.objOptometrist.data
                                        .diagnosticoObservaciones.diagnostico[v]
                                        .name
                                  )
                                )
                              }}&nbsp;
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6>
                        <v-layout row wrap>
                          <v-flex
                            xs4
                            v-for="(diagnostic, h) in myProp.objOptometrist.data
                              .diagnosticoObservaciones.diagnostico"
                            v-if="
                              myProp.diagnosticoObservaciones.diagnostico[h]
                                .eyeLeft == true
                            "
                          >
                            <span class="body-1 font-weight-light font-italic">
                              {{
                                capilatize(
                                  $t(
                                    "antecedent." +
                                      myProp.objOptometrist.data
                                        .diagnosticoObservaciones.diagnostico[h]
                                        .name
                                  )
                                )
                              }}&nbsp;
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex
                    xs12
                    v-if="
                      myProp.objOptometrist.data.diagnosticoObservaciones
                        .Observaciones
                    "
                  >
                    <span class="body-1 font-weight-medium">
                      Observaciones:
                    </span>
                  </v-flex>
                  <v-flex xs12>
                    <span class="body-1 font-weight-light">
                      {{
                        myProp.objOptometrist.data.diagnosticoObservaciones
                          .Observaciones
                      }}
                    </span>
                  </v-flex>
                  <v-divider light></v-divider>
                  <v-layout row wrap class="pt-1" v-if="myProp.prescription">
                    <v-flex xs12>
                      <span class="primary--text">Medicamentos Optometria</span>
                    </v-flex>
                    <v-flex xs12>
                      <ul>
                        <li
                          v-for="(item, index) in myProp.prescription_opt_data
                            .prescription"
                          :key="index"
                        >
                          {{ item.medicine }}
                          {{ item.doses }}
                        </li>
                      </ul>
                      <!-- <span class="">{{ myProp.prescription_oft_data.prescription }}</span> -->
                    </v-flex>
                  </v-layout>
                </v-layout>
                <v-divider light></v-divider>
              </div>
              <div v-if="myProp.objOphthalmology.data">
                <v-divider
                  light
                  v-if="myProp.objOphthalmology.data"
                ></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.observationsOphthalmology"
                >
                  <v-flex xs12>
                    <span class="primary--text">{{
                      $t("title.observationsOphthalmologyOpt")
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1">{{
                      myProp.observationsOphthalmology
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider
                  light
                  v-if="myProp.observationsOphthalmology"
                ></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">{{ $t("title.ppm") }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.ppm.ojoDer
                        .dato || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.ppm.ojoIzq
                        .dato || " - "
                    }}</span>
                  </v-flex>
                  <v-flex
                    xs12
                    v-if="
                      myProp.objOphthalmology.data.datapreliminar.ppm.ojoDer
                        .dato == 'OTRO' ||
                      myProp.objOphthalmology.data.datapreliminar.ppm.ojoIzq
                        .dato == 'OTRO'
                    "
                  >
                    <v-layout row wrap class="pt-1">
                      <v-flex xs6>
                        <span
                          class="body-1 font-weight-medium"
                          v-show="
                            myProp.objOphthalmology.data.datapreliminar.ppm
                              .ojoDer.dato == 'OTRO'
                          "
                        >
                          {{ $t("title.description") }}:&nbsp;
                        </span>
                        <span class="body-1">{{
                          myProp.objOphthalmology.data.datapreliminar.ppm.ojoDer
                            .otro || " - "
                        }}</span>
                      </v-flex>
                      <v-flex xs6>
                        <span
                          class="body-1 font-weight-medium"
                          v-show="
                            myProp.objOphthalmology.data.datapreliminar.ppm
                              .ojoIzq.dato == 'OTRO'
                          "
                        >
                          {{ $t("title.description") }}:&nbsp;
                        </span>
                        <span class="body-1">{{
                          myProp.objOphthalmology.data.datapreliminar.ppm.ojoIzq
                            .otro || " - "
                        }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-flex xs12>
                    <span class="primary--text"
                      >{{ $t("title.visual_acuity") }} Oftalmología</span
                    >
                  </v-flex>
                  <v-flex xs3> </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.no_correction") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      {{ $t("title.with_correction") }}:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      Optotipo
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1 font-weight-light font-italic">
                      Autorefracción:&nbsp;
                    </span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .ojoDer.sc || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .ojoDer.cc || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .ojoDer.optotipo || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .ojoDer.autocorreccion || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs3>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}
                    </span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .ojoIzq.sc || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .ojoIzq.cc || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .ojoIzq.optotipo || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .ojoIzq.autocorreccion || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs12>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.agudezavisual
                        .observation || " - "
                    }}</span>
                  </v-flex>
                </v-layout>

                <v-divider light></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">Exámen Externo</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.examenexterno
                        .ojoder || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.examenexterno
                        .ojoizq || " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">Biomicroscopio</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.biomicroscopio
                        .ojoder || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.biomicroscopio
                        .ojoizq || " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">Fundoscopía</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.fundoscopia
                        .ojoder || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.fundoscopia
                        .ojoizq || " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">Gonioscopia</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.gonioscopia
                        .ojoder || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.gonioscopia
                        .ojoizq || " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">Tonometría</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.right_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.tonometria
                        .ojoder || " - "
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.left_eye") }}:&nbsp;
                    </span>
                    <span class="body-1">{{
                      myProp.objOphthalmology.data.datapreliminar.tonometria
                        .ojoizq || " - "
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <!-- <v-layout row wrap class="pt-1">
                  <v-flex xs12>
                    <span class="primary--text"
                      >Dia Post Operatorio:</span 
                    > {{myProp.daysPostOperatory}}
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider> -->
                <v-layout
                  row
                  wrap
                  class="pt-1"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-flex xs12>
                    <span class="primary--text">Diagnóstico Oftalmología</span>
                  </v-flex>

                  <v-flex
                    xs12
                    v-for="(proced, v) in filterDuplicate(
                      myProp.objOphthalmology.data.diagnostic
                    )"
                    :key="v"
                  >
                    <v-layout>
                      <v-flex xs12>
                        <span class="body-1"
                          >-
                          {{
                            langDiagnostic(
                              myProp.objOphthalmology.data.diagnostic[v]
                                .diagnostic
                            )
                          }}</span
                        >
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <span class="primary--text">Plan de Manejo</span>
                  </v-flex>
                  <v-flex
                    xs12
                    v-if="myProp.objOphthalmology.data.observaciones"
                  >
                    <span class="">{{
                      myProp.objOphthalmology.data.observaciones.observacion
                    }}</span>
                  </v-flex>
                </v-layout>

                <v-divider light></v-divider>
                <v-layout row wrap class="pt-1" v-if="myProp.prescription_of">
                  <v-flex xs12>
                    <span class="primary--text">Medicamentos Oftalmologia</span>
                  </v-flex>
                  <v-flex xs12>
                    <ul>
                      <li
                        v-for="(item, index) in myProp.prescription_oft_data
                          .prescription"
                        :key="index"
                      >
                        {{ item.medicine }} ({{ item.active_ingredient }})
                        {{ item.doses }}. 
                        <span v-if="item.recomendation !== null && item.recomendation !== ''"style="font-weight: 500;">  Recomendaciones:{{ item.recomendation || "" }}</span>
                      </li>
                    </ul>
                    <!-- <span class="">{{ myProp.prescription_oft_data.prescription }}</span> -->
                  </v-flex>
                </v-layout>
                <!-- <v-layout row wrap v-if="myProp.objOphthalmology.data">
                                    <v-flex xs12
                                            v-if="myProp.objOphthalmology.data.treatmentplan && myProp.objOphthalmology.data.treatmentplan.tratamiento.length > 0">
                                        <span class="primary--text">Plan De Tratamiento</span>
                                    </v-flex>
                                    <v-flex xs12
                                            v-for="(tratamientos, x) in myProp.objOphthalmology.data.treatmentplan.tratamiento"
                                            :key="x" v-if="x >= 7">

                            <span class="body-1 font-weight-light font-italic">
                                                        {{langTreatament(myProp.objOphthalmology.data.treatmentplan.tratamiento[x].name)}}:&nbsp;
                                                    </span>
                                        <span class="body-1">{{boolean(myProp.objOphthalmology.data.treatmentplan.tratamiento[x].value)}}</span>

                                    </v-flex>
                                    <v-flex xs12 v-if="myProp.objOphthalmology.data.treatmentplan.laser">
                            <span class="body-1 font-weight-medium">
                                                        Láser:&nbsp;
                                                    </span>
                                        <span class="body-1">{{myProp.objOphthalmology.data.treatmentplan.laser || ' - '}}</span>
                                    </v-flex>
                                    <v-flex xs12 v-if="myProp.objOphthalmology.data.treatmentplan.lentes">
                            <span class="body-1 font-weight-medium">
                                                        Lentes:&nbsp;
                                                    </span>
                                        <span class="body-1">{{myProp.objOphthalmology.data.treatmentplan.lentes || ' - '}}</span>
                                    </v-flex>
                                    <v-flex xs12 v-if="myProp.objOphthalmology.data.treatmentplan.otros">
                            <span class="body-1 font-weight-medium">
                                                        Otros:&nbsp;
                                                    </span>
                                        <span class="body-1">{{myProp.objOphthalmology.data.treatmentplan.otros || ' - '}}</span>
                                    </v-flex>
                                </v-layout> -->
                <!-- <v-divider light></v-divider>
                <v-layout
                  row
                  wrap
                  v-if="
                    myProp.objOphthalmology.data.observaciones &&
                    myProp.objOphthalmology.data.observaciones.medicamentos
                  "
                >
                  <v-flex
                    xs12
                    v-if="
                      myProp.objOphthalmology.data.observaciones.observacion
                    "
                  >
                    <span class="primary--text"
                      >{{ $t("title.observations") }} y
                      {{ $t("title.medications") }}</span
                    >
                  </v-flex>
                  <v-flex
                    xs12
                    v-if="
                      myProp.objOphthalmology.data.observaciones.observacion
                    "
                  >
                    <span class="body-1 font-weight-medium">
                      {{ $t("title.observations") }}:&nbsp;
                    </span>
                    <span class="body-1">
                      {{
                        myProp.objOphthalmology.data.observaciones
                          .observacion || " - "
                      }}
                    </span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">{{
                      $t("title.medications")
                    }}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-1 font-weight-medium">Dosis</span>
                  </v-flex>
                  <v-flex
                    x12
                    v-for="(medicamentos, x) in myProp.objOphthalmology.data
                      .observaciones.medicamentos"
                    class="border-bottom-inf"
                  >
                    <v-layout>
                      <v-flex xs6 class="border-right-inf">
                        <span class="body-1 font-weight-light"
                          >* {{ medicamentos }}</span
                        >
                      </v-flex>
                      <v-flex xs6>
                        <span class="body-1 font-weight-light"
                          >*
                          {{
                            myProp.objOphthalmology.data.observaciones.recetas
                              ? myProp.objOphthalmology.data.observaciones
                                  .recetas[x]
                              : " - "
                          }}
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout> -->
                <v-divider light></v-divider>
              </div>
              <v-layout row wrap v-if="myProp.responsableConsultation">
                <v-flex xs12>
                  <span class="primary--text">Responsable de la Consulta</span>
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
                v-if="
                  myProp.objOphthalmology.data && myProp.objOptometrist.data
                "
              >
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <span
                        class="body-1 font-weight-light font-italic digital-signature-content-specialty"
                      >
                        <v-img
                          :src="digitalSignatureObjOphthalmology"
                          width="200px"
                          height="200px"
                        >
                        </v-img>
                      </span>
                    </v-flex>
                    <v-flex offset-xs3 xs6 class="text-xs-center">
                      <v-divider light></v-divider>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center">
                      <span class="primary--text">{{
                        physicianOphthalmology
                      }}</span>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center">
                      <span class="primary--text">{{
                        physicianOphthalmologySpecialty
                      }}</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <span
                        class="body-1 font-weight-light font-italic digital-signature-content-specialty"
                      >
                        <v-img
                          :src="digitalSignatureObjOptometrist"
                          width="200px"
                          height="200px"
                        >
                        </v-img>
                      </span>
                    </v-flex>
                    <v-flex offset-xs3 xs6 class="text-xs-center">
                      <v-divider light></v-divider>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center">
                      <span class="primary--text">{{
                        physicianOptometrist
                      }}</span>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center">
                      <span class="primary--text">{{
                        physicianOptometristSpecialty
                      }}</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-else>
                <v-flex xs12 v-if="myProp.objOphthalmology.data">
                  <span
                    class="body-1 font-weight-light font-italic digital-signature-content"
                  >
                    <v-img
                      :src="digitalSignatureObjOphthalmology"
                      width="200px"
                      height="200px"
                    >
                    </v-img>
                  </span>
                </v-flex>
                <v-flex
                  offset-xs3
                  xs6
                  class="text-xs-center"
                  v-if="myProp.objOphthalmology.data"
                >
                  <v-divider light></v-divider>
                </v-flex>
                <v-flex
                  xs12
                  class="text-xs-center"
                  v-if="myProp.objOphthalmology.data"
                >
                  <span class="primary--text">{{
                    physicianOphthalmology
                  }}</span>
                </v-flex>
                <v-flex
                  xs12
                  class="text-xs-center"
                  v-if="myProp.objOphthalmology.data"
                >
                  <span class="primary--text">{{
                    physicianOphthalmologySpecialty
                  }}</span>
                </v-flex>

                <v-flex xs12 v-if="myProp.objOptometrist.data">
                  <span
                    class="body-1 font-weight-light font-italic digital-signature-content"
                  >
                    <v-img
                      :src="digitalSignatureObjOptometrist"
                      width="200px"
                      height="200px"
                    >
                    </v-img>
                  </span>
                </v-flex>
                <v-flex
                  offset-xs3
                  xs6
                  class="text-xs-center"
                  v-if="myProp.objOptometrist.data"
                >
                  <v-divider light></v-divider>
                </v-flex>
                <v-flex
                  xs12
                  class="text-xs-center"
                  v-if="myProp.objOptometrist.data"
                >
                  <span class="primary--text">{{ physicianOptometrist }}</span>
                </v-flex>
                <v-flex
                  xs12
                  class="text-xs-center"
                  v-if="myProp.objOptometrist.data"
                >
                  <span class="primary--text">{{
                    physicianOptometristSpecialty
                  }}</span>
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
import * as fileServ from "@/componentServs/file";
import * as personServ from "@/componentServs/person";
import { filterDuplicate } from "@/utils/utils";

export default {
  name: "history_consultation_inf",
  data: () => ({
    digitalSignature: undefined,
    digitalSignatureObjOptometrist: undefined,
    digitalSignatureObjOphthalmology: undefined,
    physicianOptometrist: null,
    physicianOphthalmology: null,
    physicianOphthalmologySpecialty: null,
    physicianOptometristSpecialty: null,
    physician: null,
    Consultations: [],
    lenses: [],
    dialog: true,
  }),
  props: ["myProp"],
  computed: {
    storePatient() {
      return this.$store.getters.getPatient;
    },
  },
  created() {
    this.Consultations = [
      {
        value: "Post Operative Patient",
        text: this.$t("title.post_operative_patient"),
      },
      {
        value: "For the first time",
        text: this.$t("title.for_the_first_time"),
      },
      {
        value: "Control",
        text: this.$t("title.control"),
      },
      {
        value: "E",
        text: this.$t("title.type_consulting.E"),
      },
      {
        value: "one day post surgery",
        text: "1er Dia Post-Quirúrgico",
      },
      {
        value: "one week post surgery",
        text: "1ra Semana Post-Quirurgico",
      },
      {
        value: "three week post surgery",
        text: "3ra Semana Post-Quirurgico",
      },
      {
        value: "four week post surgery",
        text: "4ta Semana Post-Quirurgico",
      },
    ];
    this.lenses = [
      {
        value: "Simple Vision",
        text: this.$t("opt.simple_vision"),
      },
      {
        value: "Multifocal",
        text: this.$t("opt.multifocal"),
      },
      {
        value: "Bifocal",
        text: this.$t("opt.bifocal"),
      },
      {
        value: "Contact Lens",
        text: this.$t("opt.contact_lens"),
      },
      {
        value: "Special Lenses",
        text: this.$t("opt.special_lenses"),
      },
    ];
  },
  mounted() {
    if (
      this.myProp.objOptometrist.data &&
      this.myProp.objOptometrist.data.responsableConsultation
    ) {
      this.getDigital(
        "Optometrist",
        this.myProp.objOptometrist.data.responsableConsultation
      );
    }

    if (
      this.myProp.objOphthalmology.data &&
      this.myProp.objOphthalmology.data.responsableConsultation
    ) {
      this.getDigital(
        "Ophtalmology",
        this.myProp.objOphthalmology.data.responsableConsultation
      );
    }
  },
  methods: {
    filterDuplicate,
    showSurgeries() {
      if (this.myProp.objPreliminary.data) {
        if (this.myProp.record.cirugias) {
          return true;
        }
      }

      return false;
    },
    showAntecedent() {
      if (this.myProp.record) {
        if (
          this.myProp.record.antecedent.antecedentes &&
          this.myProp.record.antecedent.antecedentes.length > 0
        ) {
          return this.myProp.record.antecedent;
        }
      }

      if (
        this.myProp.objOphthalmology.data &&
        this.myProp.objOptometrist.data
      ) {
        if (
          this.myProp.objOphthalmology.data.record.antecedent.antecedentes
            .length > 0 &&
          this.myProp.objOptometrist.data.record.antecedent.antecedentes
            .length > 0
        ) {
          let dateOft = moment(
            this.myProp.objOphthalmology.data.control.created_at
          );
          let dateOpt = moment(
            this.myProp.objOptometrist.data.control.created_at
          );
          if (dateOft > dateOpt) {
            return this.myProp.objOphthalmology.data.record.antecedent;
          } else {
            return this.myProp.objOptometrist.data.record.antecedent;
          }
        }
      }

      if (this.myProp.objOphthalmology.data) {
        if (
          this.myProp.objOphthalmology.data.record.antecedent.antecedentes
            .length > 0
        ) {
          return this.myProp.objOphthalmology.data.record.antecedent;
        }
      }

      if (this.myProp.objOptometrist.data) {
        if (
          this.myProp.objOptometrist.data.record.antecedent.antecedentes
            .length > 0
        ) {
          return this.myProp.objOptometrist.data.record.antecedent;
        }
      }

      if (this.myProp.objPreliminary.data) {
        if (this.myProp.record.antecedent.antecedentes.length > 0) {
          return this.myProp.record.antecedent;
        }
      }

      return false;
    },
    dateConsultig(dateConsult) {
      if (this.myProp.objPreliminary.data)
        return this.myProp.objPreliminary.control.created_at;
      else if (this.myProp.objOphthalmology.data)
        return this.myProp.objOphthalmology.control.created_at;
      else return this.myProp.objOptometrist.control.created_at;
    },
    langTreatament(treatament) {
      return this.$t("content." + treatament);
    },
    langDiagnostic(diagnogtic) {
      return diagnogtic[this.$i18n.locale];
    },
    langTypeConsulting(typeConsulting) {
      let response = this.Consultations.filter((item) => {
        return item.value == typeConsulting;
      });
      return response[0] ? response[0].text : typeConsulting;
    },
    langTypeLenses(typelenses) {
      if (typelenses) {
        let response = this.lenses.filter((item) => {
          return item.value == typelenses;
        });
        return response[0].text;
      } else {
        return typelenses;
      }
    },
    boolean(value) {
      if (value) {
        return this.$t("title.yes");
      } else {
        return this.$t("title.not");
      }
    },
    capilatize: (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(),
    renderImage(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          resolve(reader.result);
        };
      });
    },
    getDigital(typeSignature = null, digital) {
      let objAux = new Object();
      objAux = {
        body: {
          _id: digital,
        },
      };

      personServ
        .getPerson(objAux)
        .then((result) => {
          if (typeSignature == "Optometrist") {
            this.physicianOptometrist = result.forename + " " + result.surname;
            this.physicianOptometristSpecialty = this.$t("title.optometrist");
          }

          if (typeSignature == "Ophtalmology") {
            this.physicianOphthalmology =
              result.forename + " " + result.surname;
            this.physicianOphthalmologySpecialty = this.$t(
              "title.ophthalmologist"
            );
          }

          if (result.digital_signature) {
            fileServ
              .getImage(
                result.digital_signature,
                sessionStorage.getItem("pussy")
              )
              .then((result) => {
                let file = new File([result.data], "Imagen", {
                  type: "image/png;base64",
                });
                // let filedrop = { size: result.data.size, name: this.$t('title.digital_signature'), type: "image/png" };
                this.renderImage(file).then((result) => {
                  if (result) {
                    if (typeSignature == "Optometrist")
                      this.digitalSignatureObjOptometrist = result;
                    if (typeSignature == "Ophtalmology")
                      this.digitalSignatureObjOphthalmology = result;
                  }
                });
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    date(value) {
      //let date = value.slice(0,10)
      return moment(value, "YYYY-MM-DD").locale(this.$i18n.locale).format("L");
    },
  },
  watch: {
    myProp: function (val) {},
  },
  filters: {
    hour(value) {
      return moment(value).format("LT");
    },
    age(value) {
      return moment().diff(value, "years", false);
    },
  },
};
</script>

<style>
.digital-signature-content-specialty .v-responsive.v-image {
  margin-left: auto;
  margin-right: auto;
  width: auto !important;
  height: 150px !important;
}

.digital-signature-content .v-responsive.v-image {
  margin-left: auto;
  margin-right: auto;
  width: auto !important;
  height: 150px !important;
}

.v-image__image--cover {
  background-size: contain !important;
}
</style>
