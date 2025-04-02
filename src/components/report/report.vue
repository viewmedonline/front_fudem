<template>
  <v-container>
    <v-tabs color="primary" dark slider-color="#E37827">
      <v-tab ripple @click="tabsActive('ophthalmologist')">
        Oftalmología
      </v-tab>

      <v-tab-item>
        <v-form
          autocomplete="off"
          ref="ophthalmology"
          v-model="formReportOf"
          lazy-validation
        >
          <v-card class="blue-grey lighten-5">
            <v-card-text>
              <v-layout row wrap align-end>
                <v-flex xs4>
                  <v-text-field
                    v-model="dateFrom"
                    label="Desde"
                    prepend-icon="event"
                    readonly
                    @click="modalFrom = true"
                  ></v-text-field>
                  <v-dialog
                    ref="dialogFrom"
                    v-model="modalFrom"
                    :return-value.sync="dateFrom"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-date-picker locale="es-es" v-model="dateFrom" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modalFrom = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.dialogFrom.save(dateFrom)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="dateTo"
                    label="Hasta"
                    prepend-icon="event"
                    readonly
                    @click="modalTo = true"
                  ></v-text-field>
                  <v-dialog
                    ref="dialogTo"
                    v-model="modalTo"
                    :return-value.sync="dateTo"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-date-picker locale="es-es" v-model="dateTo" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modalTo = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.dialogTo.save(dateTo)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    :items="sucursalList"
                    label="Sucursal"
                    v-model="sucursal"
                    prepend-icon="mdi-hospital-building"
                    item-text="Name"
                    item-value="_id"
                    :rules="validateRequired"
                  ></v-select>
                </v-flex>
                <v-flex xs5>
                  <v-autocomplete
                    v-model="model"
                    :items="items"
                    :loading="isLoading"
                    :search-input.sync="search"
                    :item-text="getDoc"
                    item-value="_id"
                    label="Doctor"
                    prepend-icon="mdi-account-circle"
                    return-object
                    :rules="validateRequired"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4 pl-2>
                  <v-autocomplete
                    v-model="diagnosticoOft"
                    :items="listDiagnoses"
                    :label="$t('title.diagnostic')"
                    persistent-hint
                    prepend-icon=""
                    return-object
                    :item-text="descriptionDx"
                    :disabled="diagnosesManuelly"
                    :rules="diagnosesManuelly ? [] : validateRequired"
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex xs3 pl-2>
                  <v-checkbox
                    v-model="diagnosesManuelly"
                    label="Diagnosticos Manuales"
                  ></v-checkbox>
                </v-flex>
                <v-flex xs12 class="text-lg-right">
                  <v-btn
                    :loading="loader"
                    :disabled="loader"
                    color="success"
                    @click="generarReport('ophthalmology')"
                  >
                    Generar
                  </v-btn>
                </v-flex>

                <v-flex
                  xs12
                  class="text-lg-right pt-4"
                  v-if="reportOphthalmology && !reportOphthalmologyDisplay"
                >
                  <v-data-table
                    :headers="headersOphthalmology"
                    :items="resultOphthalmology"
                    class="elevation-1"
                    :pagination.sync="paginationOft"
                    multi-sort
                  >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-center">
                        {{ (paginationOft.page - 1) * 10 + props.index + 1 }}
                      </td>
                      <td class="text-xs-center">
                        {{ dateFormat(props.item.control.created_at) }}
                      </td>
                      <td class="text-xs-center">
                        {{ hour(props.item.control.created_at) }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.person.idQflow }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.person.forename }}
                        {{ props.item.person.surname }}
                      </td>
                      <td class="text-xs-center">
                        {{ age(props.item.person.birthdate) }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.person.gender }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.person.housinglocation }}
                      </td>
                      <td class="text-xs-center">
                        {{
                          diagnosesConsulting(
                            props.item.objOphthalmology.data.diagnostic
                          )
                        }}
                      </td>
                      <td class="text-xs-center">
                        {{
                          langTypeConsulting(
                            props.item.objPreliminary.data.typeConsultation,
                            props.item
                          )
                        }}
                      </td>
                      <td class="text-xs-center">
                        {{
                          props.item.objPreliminary
                            ? props.item.objPreliminary.data.retinal_photo ||
                              "-"
                            : "-"
                        }}
                      </td>
                      <td class="text-xs-center">
                        {{
                          props.item.objPreliminary
                            ? props.item.objPreliminary.data.retinal_findings ||
                              "-"
                            : "-"
                        }}
                      </td>
                      <td class="text-xs-center"></td>
                    </template>
                  </v-data-table>

                  <div class="text-xs-center pt-2">
                    <v-btn
                      @click="reportOphthalmologyDisplay = true"
                      v-if="resultOphthalmology.length > 0"
                    >
                      Vista Previa para Exportar
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-form>
      </v-tab-item>
      <v-tab ripple @click="tabsActive('optometrist')"> Optometría </v-tab>

      <v-tab-item>
        <v-form
          autocomplete="off"
          ref="optometry"
          v-model="formReportOp"
          lazy-validation
        >
          <v-card class="blue-grey lighten-5">
            <v-card-text>
              <v-layout row wrap align-end>
                <v-flex xs4>
                  <v-text-field
                    v-model="dateFrom2"
                    label="Desde"
                    prepend-icon="event"
                    readonly
                    @click="modalFrom2 = true"
                  ></v-text-field>
                  <v-dialog
                    ref="dialogFrom2"
                    v-model="modalFrom2"
                    :return-value.sync="dateFrom2"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-date-picker
                      locale="es-es"
                      v-model="dateFrom2"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modalFrom2 = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.dialogFrom2.save(dateFrom2)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="dateTo2"
                    label="Hasta"
                    prepend-icon="event"
                    readonly
                    @click="modalTo2 = true"
                  ></v-text-field>
                  <v-dialog
                    ref="dialogTo2"
                    v-model="modalTo2"
                    :return-value.sync="dateTo2"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-date-picker locale="es-es" v-model="dateTo2" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modalTo2 = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.dialogTo2.save(dateTo2)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    :items="sucursalList"
                    label="Sucursal"
                    v-model="sucursal"
                    prepend-icon="mdi-hospital-building"
                    item-text="Name"
                    item-value="_id"
                    :rules="validateRequired"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    v-model="model"
                    :items="items"
                    :loading="isLoading"
                    :search-input.sync="search"
                    :item-text="getDoc"
                    item-value="_id"
                    label="Doctor"
                    prepend-icon="mdi-account-circle"
                    return-object
                    :rules="validateRequired"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6 pl-2>
                  <v-select
                    v-model="diagnosis"
                    :items="diagnostico"
                    item-text="text"
                    item-value="value"
                    label="Diagnosticos"
                    multiple
                    chips
                    persistent-hint
                    class="diagnosisOpt"
                    :rules="validateRequired"
                  ></v-select>
                </v-flex>
                <v-flex xs12 class="text-lg-right">
                  <v-btn
                    :loading="loader"
                    :disabled="loader"
                    color="success"
                    @click="generarReport('optometry')"
                  >
                    Generar
                  </v-btn>
                </v-flex>
                <v-flex
                  xs12
                  class="text-lg-right pt-4"
                  v-if="reportOptometrist && !reportOptometristDisplay"
                >
                  <v-data-table
                    :headers="headersOptometrist"
                    :items="resultOptometrist"
                    class="elevation-1"
                    :pagination.sync="paginationOpt"
                    multi-sort
                  >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-center">
                        {{ (paginationOpt.page - 1) * 10 + props.index + 1 }}
                      </td>
                      <td class="text-xs-center">
                        {{ dateFormat(props.item.control.created_at) }}
                      </td>
                      <td class="text-xs-center">
                        {{ hour(props.item.control.created_at) }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.person.idQflow }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.person.forename }}
                        {{ props.item.person.surname }}
                      </td>
                      <td class="text-xs-center">
                        {{ age(props.item.person.birthdate) }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.person.gender }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.person.housinglocation }}
                      </td>
                      <td class="text-xs-center">
                        {{
                          setDiagnosis(
                            props.item.objOptometrist.data
                              .diagnosticoObservaciones.diagnostico
                          )
                        }}
                      </td>
                      <td class="text-xs-center">
                        {{
                          langTypeConsulting(
                            props.item.typeConsultation,
                            props.item
                          )
                        }}
                      </td>
                      <td class="text-xs-center">
                        {{
                          props.item.objPreliminary
                            ? props.item.objPreliminary.data.retinal_photo ||
                              "-"
                            : "-"
                        }}
                      </td>
                      <td class="text-xs-center">
                        {{
                          props.item.objPreliminary
                            ? props.item.objPreliminary.data.retinal_findings ||
                              "-"
                            : "-"
                        }}
                      </td>
                    </template>
                  </v-data-table>
                  <div class="text-xs-center pt-2">
                    <v-btn
                      @click="reportOptometristDisplay = true"
                      v-if="resultOptometrist.length > 0"
                    >
                      Vista Previa para Exportar
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-form>
      </v-tab-item>
    </v-tabs>
    <div
      id="Divtableophthalmologist"
      v-if="
        reportOphthalmology &&
        reportOphthalmologyDisplay &&
        rolePhi == 'ophthalmologist'
      "
    >
      <table
        id="tableophthalmologist"
        border="1"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        charset="UTF-8"
      >
        <tr>
          <td colspan="15">
            <table border="0" width="50%" cellspacing="0" cellpadding="0">
              <tr>
                <td colspan="15" align="left">
                  <strong
                    >FUDEM - CENSO DE PACIENTES EN CLINICA DE
                    OFTALMOLOGÍA</strong
                  >
                </td>
              </tr>
              <tr>
                <td align="left" colspan="2"><strong>OFTALMÓLOGO:</strong></td>
                <td align="left" colspan="13">
                  {{ model.forename }} {{ model.surname }}
                </td>
              </tr>
              <tr>
                <td align="left" colspan="2"><strong>FECHA:</strong></td>
                <td align="left" colspan="13">
                  {{ dateFrom }} AL {{ dateTo }}
                </td>
              </tr>
              <tr>
                <td align="left" colspan="2"><strong>SUCURSAL:</strong></td>
                <td align="left" colspan="13">
                  {{ sucursalName(sucursal).Name }}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr style="background: #ccc">
          <td class="text-xs-center" align="center" width="5%">
            <strong>N°</strong>
          </td>
          <td class="text-xs-center" align="center" width="10%">
            <strong>Fecha</strong>
          </td>
          <td class="text-xs-center" align="center" width="10%">
            <strong>Hora</strong>
          </td>
          <td class="text-xs-center" align="center" width="10%">
            <strong>Expediente</strong>
          </td>
          <td class="text-xs-center" align="center" width="25%">
            <strong>Nombre</strong>
          </td>
          <td class="text-xs-center" align="center" width="5">
            <strong>Edad</strong>
          </td>
          <td class="text-xs-center" align="center" width="5%">
            <strong>Sexo</strong>
          </td>
          <td class="text-xs-center" align="center" width="10%">
            <strong>Area</strong>
          </td>
          <td class="text-xs-center" align="center" width="25%">
            <strong>Diagnóstico</strong>
          </td>
          <td class="text-xs-center" align="center" width="25%">
            <strong>TIPO DE CONSULTA</strong>
          </td>
          <td class="text-xs-center" align="center" width="25%">
            <strong>FOTOGRAFÍA DE RETINA</strong>
          </td>
          <td class="text-xs-center" align="center" width="25%">
            <strong>HALLAZGO FOTOGRAFÍA</strong>
          </td>
          <!-- <td class="text-xs-center" align="center" width="25%">
            <strong>REFERIR A</strong>
          </td> -->
          <td class="text-xs-center" align="center" width="10%">
            <strong>NO. RECETAS</strong>
          </td>
        </tr>
        <tr v-for="(consultas, j) in resultOphthalmology" :key="j">
          <td class="text-xs-center" align="center">
            {{ j + 1 }}
          </td>
          <td class="text-xs-center" align="center">
            {{ dateFormat(consultas.control.created_at) }}
          </td>
          <td class="text-xs-center" align="center">
            {{ hour(consultas.control.created_at) }}
          </td>
          <td class="text-xs-center" align="center">
            {{ consultas.person.idQflow }}
          </td>
          <td class="text-xs-center" align="center">
            {{ consultas.person.forename }} {{ consultas.person.surname }}
          </td>
          <td class="text-xs-center" align="center">
            {{ age(consultas.person.birthdate) }}
          </td>
          <td class="text-xs-center" align="center">
            {{ consultas.person.gender == "Masculino" ? "M" : "F" }}
          </td>
          <td class="text-xs-center" align="center">
            {{ consultas.person.housinglocation }}
          </td>
          <td class="text-xs-center" align="center">
            {{
              diagnosesConsulting(consultas.objOphthalmology.data.diagnostic)
            }}
          </td>
          <td class="text-xs-center" align="center">
            {{
              langTypeConsulting(
                consultas.objPreliminary.data.typeConsultation,
                consultas
              )
            }}
          </td>
          <td class="text-xs-center" align="center">
            {{
              consultas.objPreliminary
                ? consultas.objPreliminary.data.retinal_photo || "-"
                : "-"
            }}
          </td>
          <td class="text-xs-center" align="center">
            {{
              consultas.objPreliminary
                ? consultas.objPreliminary.data.retinal_findings || "-"
                : "-"
            }}
          </td>
          <!-- <td class="text-xs-center" align="center"></td> -->
          <td class="text-xs-center" align="center">
            {{
              consultas.prescription_of
                ? consultas.prescription_of.prescription.length
                : consultas.objOphthalmology.data.observaciones.medicamentos
                    .length
            }}
          </td>
        </tr>
      </table>
      <div
        class="text-xs-center pt-2"
        v-if="resultOphthalmology.length > 0 && rolePhi == 'ophthalmologist'"
      >
        <v-btn @click="csvExport('tableophthalmologist')">
          Exportar a Excel
        </v-btn>
        <v-btn @click="printOft('tableophthalmologist')">
          Exportar a Pdf
        </v-btn>
        <v-btn @click="reportOphthalmologyDisplay = false"> Volver </v-btn>
      </div>
    </div>
    <div
      id="Divtableoptometrist"
      v-if="
        reportOptometrist &&
        reportOptometristDisplay &&
        rolePhi == 'optometrist'
      "
    >
      <table
        id="tableoptometrist"
        border="1"
        width="100%"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td colspan="23">
            <table border="0" width="50%" cellspacing="0" cellpadding="0">
              <tr>
                <td colspan="23" align="left">
                  <strong
                    >FUDEM - CENSO DE PACIENTES EN CLINICA DE
                    OFTALMOLOGÍA</strong
                  >
                </td>
              </tr>
              <tr>
                <td align="left" colspan="2"><strong>OPTÓMETRA:</strong></td>
                <td align="left" colspan="23">
                  {{ model.forename }} {{ model.surname }}
                </td>
              </tr>
              <tr>
                <td align="left" colspan="2"><strong>FECHA:</strong></td>
                <td align="left" colspan="23">
                  {{ dateFrom2 }} AL {{ dateTo2 }}
                </td>
              </tr>
              <tr>
                <td align="left" colspan="2"><strong>SUCURSAL:</strong></td>
                <td align="left" colspan="23">
                  {{ sucursalName(sucursal).Name }}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr border="0">
          <td colspan="8"></td>
          <td colspan="10" align="center" style="background: #ccc">
            <strong>Diagnósticos</strong>
          </td>
          <td colspan="5"></td>
        </tr>
        <tr style="background: #ccc">
          <td class="text-xs-center" align="center" width="2%">
            <strong>N°</strong>
          </td>
          <td class="text-xs-center" align="center" width="8%">
            <strong>Fecha</strong>
          </td>
          <td class="text-xs-center" align="center" width="8%">
            <strong>Hora</strong>
          </td>
          <td class="text-xs-center" align="center" width="10%">
            <strong>Expediente</strong>
          </td>
          <td class="text-xs-center" align="center" width="25%">
            <strong>Nombre</strong>
          </td>
          <td class="text-xs-center" align="center" width="5">
            <strong>Edad</strong>
          </td>
          <td class="text-xs-center" align="center" width="5%">
            <strong>Sexo</strong>
          </td>
          <td class="text-xs-center" align="center" width="5%">
            <strong>Area</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OD-H</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OI-H</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OD-M</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OI-M</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OD-A</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OI-A</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OD-P</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OI-P</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OD-E</strong>
          </td>
          <td class="text-xs-center" align="center" width="3%">
            <strong>OI-E</strong>
          </td>
          <td class="text-xs-center" align="center" width="30%">
            <strong>TIPO CONSULTA</strong>
          </td>
          <td class="text-xs-center" align="center" width="30%">
            <strong>FOTOGRAFÍA DE RETINA</strong>
          </td>
          <td class="text-xs-center" align="center" width="30%">
            <strong>HALLAZGO FOTOGRAFÍA</strong>
          </td>
          <!-- <td class="text-xs-center" align="center" width="10%">
            <strong>REFERIR A</strong>
          </td> -->
          <td class="text-xs-center" align="center" width="10%">
            <strong>DIO RECETA</strong>
          </td>
        </tr>
        <tr
          v-for="(consultas, j) in resultOptometrist"
          v-if="resultOptometrist.length > 0 && rolePhi == 'optometrist'"
        >
          <td class="text-xs-center" align="center">
            {{ j + 1 }}
          </td>
          <td class="text-xs-center" align="center">
            {{ dateFormat(consultas.control.created_at) }}
          </td>
          <td class="text-xs-center" align="center">
            {{ hour(consultas.control.created_at) }}
          </td>
          <td class="text-xs-center" align="center">
            {{ consultas.person.idQflow }}
          </td>
          <td class="text-xs-center" align="center">
            {{ consultas.person.forename }} {{ consultas.person.surname }}
          </td>
          <td class="text-xs-center" align="center">
            {{ age(consultas.person.birthdate) }}
          </td>
          <td class="text-xs-center" align="center">
            {{ consultas.person.gender == "Masculino" ? "M" : "F" }}
          </td>
          <td class="text-xs-center" align="center">
            {{ consultas.person.housinglocation }}
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[0].eyeRight,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[0].eyeLeft,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[1].eyeRight,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[1].eyeLeft,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[2].eyeRight,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[2].eyeLeft,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[3].eyeRight,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[3].eyeLeft,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[4].eyeRight,
                  1
                )
              }}
            </strong>
          </td>
          <td class="text-xs-center" align="center" width="2%">
            <strong>
              {{
                setDiagnosis(
                  consultas.objOptometrist.data.diagnosticoObservaciones
                    .diagnostico[4].eyeLeft,
                  1
                )
              }}
            </strong>
          </td>

          <!-- <div
            v-for="(diagnos, j) in consultas.objOptometrist.data
              .diagnosticoObservaciones.diagnostico"
            v-if="j < 5"
            style="display: contents"
          >
            <td class="text-xs-center" align="center" width="2%">
              <strong>
                {{ setDiagnosis(diagnos.eyeRight, 1) }}
              </strong>
            </td>
            <td class="text-xs-center" align="center" width="2%">
              <strong>
                {{ setDiagnosis(diagnos.eyeLeft, 1) }}
              </strong>
            </td>
          </div> -->

          <td class="text-xs-center">
            {{ langTypeConsulting(consultas.typeConsultation) }}
          </td>
          <td class="text-xs-center">
            {{
              consultas.objPreliminary
                ? consultas.objPreliminary.data.retinal_photo || "-"
                : "-"
            }}
          </td>
          <td class="text-xs-center">
            {{
              consultas.objPreliminary
                ? consultas.objPreliminary.data.retinal_findings || "-"
                : "-"
            }}
          </td>
          <!-- <td class="text-xs-center"></td> -->
          <td class="text-xs-center">
            {{
              consultas.objOptometrist.data.receta
                ? consultas.objOptometrist.data.receta
                : "NO"
            }}
          </td>
        </tr>
      </table>
      <div
        class="text-xs-center pt-2"
        v-if="resultOptometrist.length > 0 && rolePhi == 'optometrist'"
      >
        <v-btn @click="csvExport('tableoptometrist')"> Exportar a Excel </v-btn>
        <v-btn @click="printOpt('tableoptometrist')"> Exportar a Pdf </v-btn>
        <v-btn @click="reportOptometristDisplay = false"> Volver </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import * as personServ from "@/componentServs/person";
import * as consultationServ from "@/componentServs/consultation";
import * as fileServ from "@/componentServs/file";
import * as diagnosesServ from "@/componentServs/diagnoses";
import * as sucursalServ from "@/componentServs/sucursal";
import { filterDuplicate } from "@/utils/utils";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "report",
  data() {
    return {
      reportOptometristDisplay: false,
      reportOphthalmologyDisplay: false,
      users: [],
      loader: false,
      tab: null,
      items2: ["Oftalmología", "Optometría"],
      text: ["A", "B"],
      date: new Date().toISOString().substr(0, 10),
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
      dateFrom2: new Date().toISOString().substr(0, 10),
      dateTo2: new Date().toISOString().substr(0, 10),
      menu: false,
      modalTo: false,
      modalFrom: false,
      modalTo2: false,
      modalFrom2: false,
      menu2: false,
      descriptionLimit: 60,
      entries: [],
      entries2: [],
      isLoading: false,
      isLoadingPatient: false,
      model: null,
      modelPatient: null,
      search: null,
      searchPatient: null,
      rolePhi: "ophthalmologist",
      diagnostico: [
        {
          text: this.$t("antecedent.hyperopia"),
          value: "hyperopia",
        },
        {
          text: this.$t("antecedent.myopia"),
          value: "myopia",
        },
        {
          text: this.$t("antecedent.astigmatism"),
          value: "astigmatism",
        },
        {
          text: this.$t("antecedent.presbyopia"),
          value: "presbyopia",
        },
        {
          text: this.$t("antecedent.emmetropia"),
          value: "emmetropia",
        },
        //Ambliopia,Anisometropia,Estrabismo
        {
          text: this.$t("antecedent.amblyopia"),
          value: "amblyopia",
        },
        {
          text: this.$t("antecedent.anisometropia"),
          value: "anisometropia",
        },
        {
          text: "Estrabismo",
          value: "squint",
        },
        {
          text: this.$t("title.all"),
          value: "Todos",
        },
      ],
      diagnosis: null,
      diagnosticoOft: null,
      listDiagnoses: [],
      resultado: null,
      sucursal: null,
      sucursalList: [],
      headersOphthalmology: [
        {
          text: "N°",
          align: "left",
          sortable: false,
        },
        {
          text: "FECHA",
          align: "center",
          sortable: false,
        },
        {
          text: "HORA",
          align: "center",
          sortable: false,
        },
        {
          text: "EXPEDIENTE",
          align: "center",
          sortable: false,
        },
        {
          text: "NOMBRE DEL PACIENTE",
          align: "center",
          sortable: false,
        },
        {
          text: "EDAD",
          align: "center",
          sortable: false,
        },
        {
          text: "SEXO",
          align: "center",
          sortable: false,
        },
        {
          text: "AREA",
          align: "center",
          sortable: false,
        },
        {
          text: "DIAGNÓSTICO",
          align: "center",
          sortable: false,
        },
        {
          text: "TIPO CONSULTA",
          align: "center",
          sortable: false,
        },
        {
          text: "FOTOGRAFÍA RETINA",
          align: "center",
          sortable: false,
        },
        {
          text: "HALLAZGO FOTOGRAFÍA",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "REFERIR A",
        //   align: "center",
        //   sortable: false,
        // },
      ],
      headersOptometrist: [
        {
          text: "N°",
          align: "left",
          sortable: false,
        },
        {
          text: "FECHA",
          align: "center",
          sortable: false,
        },
        {
          text: "HORA",
          align: "center",
          sortable: false,
        },
        {
          text: "EXPEDIENTE",
          align: "center",
          sortable: false,
        },
        {
          text: "NOMBRE DEL PACIENTE",
          align: "center",
          sortable: false,
        },
        {
          text: "EDAD",
          align: "center",
          sortable: false,
        },
        {
          text: "SEXO",
          align: "center",
          sortable: false,
        },
        {
          text: "AREA",
          align: "center",
          sortable: false,
        },
        {
          text: "DIAGNÓSTICO",
          align: "center",
          sortable: false,
        },
        {
          text: "TIPO CONSULTA",
          align: "center",
          sortable: false,
        },
        {
          text: "FOTOGRAFÍA RETINA",
          align: "center",
          sortable: false,
        },
        {
          text: "HALLAZGO FOTOGRAFÍA",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "REFERIR A",
        //   align: "center",
        //   sortable: false,
        // },
      ],
      resultOphthalmology: [],
      reportOphthalmology: false,
      diagnosesManuelly: false,
      paginationOpt: {
        rowsPerPage: 10,
      },
      paginationOft: {
        rowsPerPage: 10,
      },
      rules: {
        required: (v) => !!v || this.$t("title.field_required"),
        validateRequiredDiag: (v) => !!v || this.$t("title.field_required"),
      },
      formReportOf: false,
      formReportOp: false,
      reportOptometrist: false,
      resultOptometrist: [],
      arraySucursal: [],
      Consultations: [
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
      ],
    };
  },

  methods: {
    sucursalName(sucursalId) {
      let sucursalFilter = this.sucursalList.filter(
        (sucursal) => sucursal._id == sucursalId
      );
      return sucursalFilter[0];
    },
    printOft(table) {
      var doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: "legal",
      });

      doc.setFontSize(12);
      doc.text("FUDEM - CENSO DE PACIENTES EN CLINICA DE OFTALMOLOGIA", 15, 10);
      doc.text("OFTALMÓLOGO:", 15, 15);
      doc.text(this.model.forename + " " + this.model.surname, 50, 15);
      doc.text("FECHA:", 15, 20);
      doc.text(this.dateFrom + " AL " + this.dateTo, 50, 20);
      doc.text("SUCURSAL:", 15, 25);
      doc.text(this.sucursalName(this.sucursal).Name, 50, 25);
      this.returnTable("OFT").then((report) => {
        doc.autoTable({
          margin: { top: 30 },

          head: [
            [
              {
                content: "N°",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 15,
                },
              },
              {
                content: "Fecha",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 25,
                },
              },
              {
                content: "Hora",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 25,
                },
              },
              {
                content: "Expediente",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 25,
                },
              },
              {
                content: "Nombre",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 40,
                },
              },
              {
                content: "Edad",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 15,
                },
              },
              {
                content: "Sexo",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 15,
                },
              },
              {
                content: "Area",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 20,
                },
              },
              {
                content: "Diagnóstico",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 40,
                },
              },
              {
                content: "Foto Retina",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 25,
                },
              },
              {
                content: "Hallazgo Foto",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 25,
                },
              },
              {
                content: "NO, Recetas",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 25,
                },
              },
            ],
          ],
          body: report,
        });
        var pageCount = doc.internal.getNumberOfPages();

        for (let i = 0; i < pageCount; i++) {
          doc.setPage(i);
          doc.text(
            225,
            10,
            "Fecha de Emisión: " + moment().locale("es").format("L")
          );
          doc.text(
            15,
            200,
            "Página " +
              doc.internal.getCurrentPageInfo().pageNumber +
              " de " +
              pageCount
          );
        }
        doc.save(
          "OFT-" +
            this.dateFormat(this.dateFrom) +
            "-" +
            this.dateFormat(this.dateTo) +
            ".pdf"
        );
      });
    },
    printOpt(table) {
      var doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: "legal",
      });

      doc.setFontSize(9);
      doc.text("FUDEM - CENSO DE PACIENTES EN CLINICA DE OFTALMOLOGÍA", 15, 10);
      doc.text("OPTÓMETRA:", 15, 15);
      doc.text(this.model.forename + " " + this.model.surname, 50, 15);
      doc.text("FECHA:", 15, 20);
      doc.text(this.dateFrom2 + " AL " + this.dateTo2, 50, 20);
      doc.text("SUCURSAL:", 15, 25);
      doc.text(this.sucursalName(this.sucursal).Name, 50, 25);

      this.returnTable("OPT").then((report) => {
        doc.autoTable({
          margin: { top: 30 },
          head: [
            [
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
              {
                content: "DIAGNÓSTICO",
                colSpan: 10,
                styles: {
                  halign: "center",
                  valign: "middle",
                  fillColor: [41, 128, 186],
                },
              },
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
              { styles: { fillColor: [255, 255, 255] } },
            ],
            [
              {
                content: "N°",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 10,
                },
              },
              {
                content: "Fecha",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 25,
                },
              },
              {
                content: "Hora",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 21,
                },
              },
              {
                content: "Expediente",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 22,
                },
              },
              {
                content: "Nombre",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 35,
                },
              },
              {
                content: "Edad",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 12,
                },
              },
              {
                content: "Sexo",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 12,
                },
              },
              {
                content: "OD-H",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OI-H",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OD-M",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OI-M",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OD-A",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OI-A",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OD-P",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OI-P",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OD-E",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "OI-E",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 7,
                },
              },
              {
                content: "FOTO RETINA",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 20,
                },
              },
              {
                content: "HALLAZGO FOTO",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 23,
                },
              },
              {
                content: "TIPO CONSULTA",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 22,
                },
              },
              {
                content: "DIO RECETA",
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 20,
                },
              },
            ],
          ],
          body: report,
        });
        var pageCount = doc.internal.getNumberOfPages();
        for (let i = 0; i < pageCount; i++) {
          doc.setPage(i);
          doc.text(
            225,
            10,
            "Fecha de Emisión: " + moment().locale("es").format("L")
          );
          doc.text(
            15,
            200,
            "Página " +
              doc.internal.getCurrentPageInfo().pageNumber +
              " de " +
              pageCount
          );
        }
        doc.save(
          "OPT-" +
            this.dateFormat(this.dateFrom2) +
            "-" +
            this.dateFormat(this.dateTo2) +
            ".pdf"
        );
      });
    },
    setDiagnosis(diagnosis, pos = null) {
      let diagnosisReport = [];
      if (pos) {
        if (diagnosis) return "SI";
        else return "";
      } else {
        for (var i = 0; i < diagnosis.length; i++) {
          if (diagnosis[i].eyeLeft || diagnosis[i].eyeRight)
            diagnosisReport.push(this.$t("antecedent." + diagnosis[i].name));
        }
        return diagnosisReport.join(",");
      }
    },
    async setDiagnosisPdf(diagnosis) {
      let diagnosisReportPdf = [];
      for (let i in diagnosis) {
        if (i < 5) {
          diagnosisReportPdf.push(
            diagnosis[i].eyeRight ? "S" : "N",
            diagnosis[i].eyeLeft ? "S" : "N"
          );
        }
      }
      return diagnosisReportPdf;
    },
    async returnTable(section) {
      let auxReport = [];
      let itemReport = [];
      if (section == "OFT") {
        for (let i in this.resultOphthalmology) {
          itemReport = [
            {
              content: parseInt(i) + parseInt(1),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 5,
              },
            },
            {
              content: this.dateFormat(
                this.resultOphthalmology[i].control.created_at
              ),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 12,
              },
            },
            {
              content: this.hour(
                this.resultOphthalmology[i].control.created_at
              ),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 8,
              },
            },
            {
              content: this.resultOphthalmology[i].person.idQflow,
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 10,
              },
            },
            {
              content:
                this.resultOphthalmology[i].person.forename +
                " " +
                this.resultOphthalmology[i].person.surname,
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 15,
              },
            },
            {
              content: this.age(this.resultOphthalmology[i].person.birthdate),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 6,
              },
            },
            {
              content:
                this.resultOphthalmology[i].person.gender == "Masculino"
                  ? "M"
                  : "F",
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 6,
              },
            },
            {
              content: this.resultOphthalmology[i].person.housinglocation,
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 10,
              },
            },
            {
              content: this.diagnosesConsulting(
                this.resultOphthalmology[i].objOphthalmology.data.diagnostic
              ),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 20,
              },
            },
            {
              content: this.resultOphthalmology[i].objPreliminary
                ? this.resultOphthalmology[i].objPreliminary.data
                    .retinal_photo || "-"
                : "-",
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 10,
              },
            },
            {
              content: this.resultOphthalmology[i].objPreliminary
                ? this.resultOphthalmology[i].objPreliminary.data
                    .retinal_findings || "-"
                : "-",
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 10,
              },
            },
            // {
            //   content: this.resultOphthalmology[i].objOphthalmology.data
            //     .referTo
            //     ? this.resultOphthalmology[i].objOphthalmology.data.referTo
            //     : "-",
            //   styles: {
            //     halign: "center",
            //     valign: "middle",
            //     cellWidth: 10,
            //   },
            // },
            {
              content:
                this.resultOphthalmology[i].objOphthalmology.data.observaciones
                  .medicamentos.length,
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 10,
              },
            },
            // {
            //   content:
            //     this.resultOphthalmology[i].objOphthalmology.data.process
            //       .length,
            //   styles: {
            //     halign: "center",
            //     valign: "middle",
            //     cellWidth: 12,
            //   },
            // },
          ];

          auxReport.push(itemReport);
          itemReport = [];
        }
      } else {
        for (let i in this.resultOptometrist) {
          itemReport = [
            {
              content: parseInt(i) + parseInt(1),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 3,
              },
            },
            {
              content: this.dateFormat(
                this.resultOptometrist[i].control.created_at
              ),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 12,
              },
            },
            {
              content: this.hour(this.resultOptometrist[i].control.created_at),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 8,
              },
            },
            {
              content: this.resultOptometrist[i].person.idQflow,
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 10,
              },
            },
            {
              content:
                this.resultOptometrist[i].person.forename +
                " " +
                this.resultOptometrist[i].person.surname,
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 15,
              },
            },
            {
              content: this.age(this.resultOptometrist[i].person.birthdate),
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 6,
              },
            },
            {
              content:
                this.resultOptometrist[i].person.gender == "Masculino"
                  ? "M"
                  : "F",
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 6,
              },
            },
          ];

          await this.setDiagnosisPdf(
            this.resultOptometrist[i].objOptometrist.data
              .diagnosticoObservaciones.diagnostico
          ).then((list) => {
            for (let j in list) {
              itemReport.push({
                content: list[j],
                styles: {
                  halign: "center",
                  valign: "middle",
                  cellWidth: 10,
                },
              });
            }
          });

          itemReport.push({
            content: this.resultOptometrist[i].objPreliminary
              ? this.resultOptometrist[i].objPreliminary.data.retinal_photo ||
                "-"
              : "-",
            styles: {
              halign: "center",
              valign: "middle",
              cellWidth: 10,
            },
          });

          itemReport.push({
            content: this.resultOptometrist[i].objPreliminary
              ? this.resultOptometrist[i].objPreliminary.data
                  .retinal_findings || "-"
              : "-",
            styles: {
              halign: "center",
              valign: "middle",
              cellWidth: 10,
            },
          });

          itemReport.push({
            content: this.langTypeConsulting(
              this.resultOptometrist[i].typeConsultation
            ),
            styles: {
              halign: "center",
              valign: "middle",
              cellWidth: 12,
            },
          });
          itemReport.push({
            content: this.resultOptometrist[i].objOptometrist.data.receta
              ? this.resultOptometrist[i].objOptometrist.data.receta
              : "NO",
            styles: {
              halign: "center",
              valign: "middle",
              cellWidth: 8,
            },
          });

          auxReport.push(itemReport);
          itemReport = [];
        }
      }

      return auxReport;
    },
    langTypeConsulting(typeConsulting, item) {
      let response = this.Consultations.filter((item) => {
        return item.value == typeConsulting;
      });
      return response[0] ? response[0].text : typeConsulting;
    },
    csvExport(reportSec) {
      var dt = new Date();
      var day = dt.getDate();
      var month = dt.getMonth() + 1;
      var year = dt.getFullYear();
      var hour = dt.getHours();
      var mins = dt.getMinutes();
      var postfix = day + "." + month + "." + year + "_" + hour + "." + mins;
      var a = document.createElement("a");
      var data_type = "data:application/vnd.ms-excel;charset=utf-8";
      var table_div = document.getElementById(reportSec);
      var table_html = table_div.outerHTML.replace(/ /g, "%20");
      a.charset = "UTF-8";
      a.href =
        data_type +
        ", " +
        '<html><head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"></head><body>' +
        table_html +
        "</body></html>";
      let auxName = "";
      if (reportSec == "tableophthalmologist") {
        auxName =
          "OFT-" +
          this.dateFormat(this.dateFrom) +
          "-" +
          this.dateFormat(this.dateTo);
      } else {
        auxName =
          "OPT-" +
          this.dateFormat(this.dateFrom2) +
          "-" +
          this.dateFormat(this.dateTo2);
      }
      a.download = auxName + ".xls";
      a.click();
    },
    generarReport(specialty) {
      if (this.$refs[specialty].validate()) {
        this.loader = true;
        let diagnostic = "";
        this.reportOphthalmology = false;
        this.resultOphthalmology = [];
        this.reportOptometrist = false;
        this.resultOptometrist = [];
        this.reportOphthalmologyDisplay = false;
        this.reportOptometristDisplay = false;
        if (specialty != "optometry") {
          if (this.diagnosesManuelly) {
            diagnostic = "A00.0";
          } else {
            diagnostic = this.diagnosticoOft.code;
          }
        } else {
          diagnostic = this.diagnosis;
        }
        let objAux = {
          body: {
            specialty: specialty,
            sucursalId: this.sucursal,
          },
          control: {
            active: false,
          },
          token: {},
        };

        if (specialty == "ophthalmology") {
          objAux.body["objOphthalmology.data.responsableConsultation"] =
            this.model._id;
          objAux.body["control.active"] = false;
          objAux.body["control.created_at"] = {
            $gte: moment(this.dateFrom)
              .utc(0)
              .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
              .format(),
            $lte: moment(this.dateTo)
              .utc(0)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
              .format(),
          };
          if (diagnostic)
            objAux.body["objOphthalmology.data.diagnostic.code"] = diagnostic;

          objAux.body.dataReturn = {
            "objOphthalmology.data": 1,
            control: 1,
            "objPreliminary.data.retinal_photo": 1,
            "objPreliminary.data.retinal_findings": 1,
            "objPreliminary.data.typeConsultation": 1,
          };
        } else {
          let diagnosticoOpt = [];
          if (this.diagnosis.includes("Todos")) {
            for (var i = 0; i < this.diagnostico.length; i++) {
              if (this.diagnostico[i].value != "Todos")
                diagnosticoOpt.push(this.diagnostico[i].value);
            }
          } else diagnosticoOpt = this.diagnosis;

          objAux.body["objOptometrist.data.responsableConsultation"] =
            this.model._id;
          objAux.body[
            "objOptometrist.data.diagnosticoObservaciones.diagnostico"
          ] = {
            $elemMatch: {
              name: { $in: diagnosticoOpt },
            },
          };
          // console.log(this.dateTo2)
          objAux.body["control.active"] = false;
          objAux.body["control.created_at"] = {
            $gte: moment(this.dateFrom2)
              .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
              .utc(0)
              .format(),
            $lt: moment(this.dateTo2)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
              .utc(0)
              .format(),
          };
          objAux.body.dataReturn = {
            "objOptometrist.data": 1,
            control: 1,
            typeConsultation: 1,
            "objPreliminary.data.retinal_photo": 1,
            "objPreliminary.data.retinal_findings": 1,
          };
        }
        let objAuxSucursaParent = {
          body: {
            ParentUnitId: this.sucursalName(this.sucursal).UnitId,
          },
          token: {},
        };
        sucursalServ
          .getSucursal(objAuxSucursaParent)
          .then(async (result) => {
            this.arraySucursal = [this.sucursal];

            /*async function searchChilds(vm, item) {
                        if(item.UnitType != 'Departamento') {
                            // Llamo servicio
                            // Lleno la lista con los ids for
                            vm.arraySucursal.push(result[i]._id)
                            // Pregunto de nuevo si tiene hijos
                            await searchChilds(vm, result[i])    
                            return
                        }

                        return
                    }*/

            for (let i = 0; i < result.length; i++) {
              this.arraySucursal.push(result[i]._id);
              //await searchChilds(this, result[i])
            }

            objAux.body["sucursalId"] = {
              $in: [this.sucursal],
            };

            consultationServ
              .getListConsultationReport(objAux)
              .then((result) => {
                // console.log("result: ", result);
                if (specialty == "ophthalmology") {
                  this.reportOphthalmology = true;
                  this.resultOphthalmology = result.map((item) => {
                    console.log(item);
                    return item;
                  });
                  this.paginationOft.totalItems = result.length;
                } else {
                  this.reportOptometrist = true;
                  this.resultOptometrist = result;
                  this.paginationOpt.totalItems = result.length;
                }
                this.loader = false;
              })
              .catch((error) => {
                console.log("error: ", error);
                this.loader = false;
              });
          })
          .catch((error) => {
            console.log("error: ", error);
            this.loader = false;
          });
      }
    },
    getPatient: (item) => `${item.forename} (${item.idQflow})`,
    getDoc: (item) => `${item.forename} ${item.surname}`,
    tabsActive(tabs) {
      //this.model = null
      this.entries = [];
      this.rolePhi = tabs;
      this.getDoctor();
    },
    getSucursal() {
      let objAux = {
        body: {
          UnitType: "Sucursal",
        },
        token: {},
      };
      sucursalServ
        .getSucursal(objAux)
        .then((result) => {
          this.sucursalList = result;
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
    getDoctor() {
      let objAux = {
        body: {
          role: this.rolePhi,
        },
        token: null,
      };
      personServ
        .getPersonList(objAux)
        .then((result) => {
          this.entries = result;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    getDiagnoses() {
      let objAux = {
        body: {
          level: 0,
        },
        token: {},
      };
      if (this.codeDx) objAux.body.code = this.codeDx;

      diagnosesServ
        .getDiagnoses(objAux)
        .then((result) => {
          this.listDiagnoses = result;
          let auxObj = {
            diagnostic: {
              en: "TODOS -",
              es: "TODOS -",
            },
            include: [],
            discard: [],
            level: 0,
            code: "",
          };
          this.listDiagnoses.unshift(auxObj);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
    descriptionDx(item) {
      if (item.diagnostic) {
        // console.log("mensaje: ", typeof item.diagnostic)
        return `${item.code} - ${item.diagnostic[this.localeLang]}`;
      }
    },
    selectDx(val) {
      this.diagnostico = val;
      this.chipsDiagnostic.push(val);
      this.levelDx = val.level;
      this.codeDx = val.code;
      this.includeDx = val.include;
      this.discardDx = val.discard;
      this.selectedDiagnoses = true;
      this.getDiagnoses();
    },
    dateFormat(value) {
      let date = value.slice(0, 10);

      return moment(date, "YYYY-MM-DD").locale(this.$i18n.locale).format("L");
    },
    hour(value) {
      return moment(value).format("LT");
    },
    age(value) {
      return moment().diff(value, "years", false);
    },
    counTratament(value) {
      return value.length;
    },
    diagnosesConsulting(list) {
      list = filterDuplicate(list);
      if (list.length > 0) {
        if (list.length > 1) {
          let arrayDiagnostic = [];
          for (var i = 0; i < list.length; i++) {
            arrayDiagnostic.push(list[i].diagnostic[this.$i18n.locale]);
          }
          return arrayDiagnostic.join();
        } else {
          return list[0].diagnostic[this.$i18n.locale];
        }
      }
    },
  },
  mounted() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((json) => (this.users = json));
  },
  created() {
    this.getDiagnoses();
    this.getSucursal();
    this.getDoctor();
  },
  computed: {
    pagesOpt() {
      if (
        this.paginationOpt.rowsPerPage == null ||
        this.paginationOpt.totalItems == null
      )
        return 0;
      return Math.ceil(
        this.paginationOpt.totalItems / this.paginationOpt.rowsPerPage
      );
    },
    pagesOft() {
      if (
        this.paginationOft.rowsPerPage == null ||
        this.paginationOft.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.paginationOft.totalItems / this.paginationOft.rowsPerPage
      );
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.forename.length > this.descriptionLimit
            ? entry.forename.slice(0, this.descriptionLimit) + "..."
            : entry.forename;

        return Object.assign({}, entry, { Description });
      });
    },
    items3() {
      return this.entries2.map((entry) => {
        const DescriptionPatien =
          entry.forename.length > this.descriptionLimit
            ? entry.forename.slice(0, this.descriptionLimit) + "..."
            : entry.forename;

        return Object.assign({}, entry, { DescriptionPatien });
      });
    },
    localeLang() {
      return this.$i18n.locale;
    },
    validateRequired() {
      return [this.rules.required];
    },
    validateRequiredDiag() {
      return [this.rules.validateRequiredDiag];
    },
    csvData() {
      return this.users.map((item) => ({
        ...item,
        address: "адрес", //item.address.city,
        company: "компания", //item.company.name
      }));
    },
  },
  watch: {
    search(val) {
      if (this.items.length > 0) return;

      if (this.isLoading) return;
      this.isLoading = true;

      let objAux = {
        body: {
          role: this.rolePhi,
        },
        token: null,
      };
      personServ
        .getPersonList(objAux)
        .then((result) => {
          this.entries = result;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    searchPatient(val) {
      if (this.items3.length > 0) return;

      if (this.isLoadingPatient) return;
      this.isLoadingPatient = true;

      let objAux = {
        body: {
          autoComplete: val,
        },
        token: null,
      };
      personServ
        .getPersonList(objAux)
        .then((result) => {
          this.entries2 = result;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoadingPatient = false));
    },
  },
  props: {
    source: String,
  },
};
</script>
<style scoped>
.v-select.v-select--chips .v-select__selections {
  min-height: 30px !important;
}
</style>
