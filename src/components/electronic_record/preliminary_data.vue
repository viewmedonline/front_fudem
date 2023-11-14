<template>
    <v-container>
        <v-form autocomplete="off" ref="formPreliminaryDataOftRef" v-model="formPreliminaryDataOft" lazy-validation>
            <v-card class="elevation-3">
                <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize">{{ $t('title.preliminary_data') }}</span>
                </v-card-title>
                <v-divider light class="vm-border-color-2"></v-divider>
                <v-card-text>
                    <v-container fluid grid-list-md px-0 py-0>
                        <v-layout row wrap>
                            <v-flex xs12 text-sm-left>
                                <span class="body-2">{{ $t('title.ppm') }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                                {{ $t('title.re') }}:
                            </v-flex>
                            <v-flex xs4>
                                <v-select @change="validateOtherOd" v-model="datosPreliminares.ppm.ojoDer.dato"
                                    :items="items" :readonly="validateRead()">
                                </v-select>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field v-if="otherOdValidate" v-model="datosPreliminares.ppm.ojoDer.otro"
                                    :label="$t('title.other')" :readonly="validateRead()">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                                {{ $t('title.le') }}:
                            </v-flex>
                            <v-flex xs4>
                                <v-select @change="validateOtherOi" v-model="datosPreliminares.ppm.ojoIzq.dato"
                                    :items="items" :readonly="validateRead()">
                                </v-select>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field v-if="otherOiValidate" v-model="datosPreliminares.ppm.ojoIzq.otro"
                                    :label="$t('title.other')" :readonly="validateRead()">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 text-sm-left>
                                <span class="body-2">{{ $t('title.visual_acuity') }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs3 offset-xs2>
                                <span class="body-2">{{ $t('title.sc') }}:</span>
                            </v-flex>
                            <v-flex xs3>
                                <span class="body-2">{{ $t('title.cc') }}:</span>
                            </v-flex>
                            <v-flex xs3>
                                <span class="body-2">{{ $t('title.autorefraction').toUpperCase() }}:</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                                {{ $t('title.re') }}:
                            </v-flex>
                            <v-flex xs3>
                                <v-select v-model="datosPreliminares.agudezavisual.ojoDer.sc" :items="listAv"
                                    :rules="[v => !!v || $t('title.field_required')]" :readonly="validateRead()"></v-select>
                            </v-flex>
                            <v-flex xs3>
                                <v-select v-model="datosPreliminares.agudezavisual.ojoDer.cc" :items="listAv"
                                    :readonly="validateRead()"></v-select>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field readonly v-model="datosPreliminares.agudezavisual.ojoDer.autocorreccion">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                                {{ $t('title.le') }}:
                            </v-flex>
                            <v-flex xs3>

                                <v-select v-model="datosPreliminares.agudezavisual.ojoIzq.sc" :items="listAv"
                                    :rules="[v => !!v || $t('title.field_required')]" :readonly="validateRead()">
                                </v-select>
                            </v-flex>
                            <v-flex xs3>
                                <v-select v-model="datosPreliminares.agudezavisual.ojoIzq.cc" :items="listAv"
                                    :readonly="validateRead()">
                                </v-select>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field readonly v-model="datosPreliminares.agudezavisual.ojoIzq.autocorreccion">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 text-sm-left>
                                <span class="body-2">{{ $t('title.external_exam') }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-textarea name="input-7-1" :label="$t('title.re')"
                                    v-model="datosPreliminares.examenexterno.ojoder" outline
                                    :hint="$t('title.external_exam_right_eye')" :counter="maxHeigthText"
                                    :rules="[rules.length(maxHeigthText)]" :readonly="validateRead()"></v-textarea>
                            </v-flex>
                            <v-flex xs6>
                                <v-textarea name="input-7-2" :label="$t('title.le')"
                                    v-model="datosPreliminares.examenexterno.ojoizq" outline
                                    :hint="$t('title.external_exam_left_eye')" :counter="maxHeigthText"
                                    :rules="[rules.length(maxHeigthText)]" :readonly="validateRead()"></v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 text-sm-left>
                                <span class="body-2">{{ $t('title.biomicroscope') }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-textarea name="input-7-3" :label="$t('title.re')"
                                    v-model="datosPreliminares.biomicroscopio.ojoder" outline
                                    :hint="$t('title.biomicroscope_right_eye')" :counter="maxHeigthText"
                                    :rules="[rules.length(maxHeigthText)]" :readonly="validateRead()"></v-textarea>
                            </v-flex>
                            <v-flex xs6>
                                <v-textarea name="input-7-4" :label="$t('title.le')"
                                    v-model="datosPreliminares.biomicroscopio.ojoizq" outline
                                    :hint="$t('title.biomicroscope_left_eye')" :counter="maxHeigthText"
                                    :rules="[rules.length(maxHeigthText)]" :readonly="validateRead()"></v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 text-sm-left>
                                <span class="body-2">{{ $t('title.gonioscopy') }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-textarea name="input-7-1" :label="$t('title.re')"
                                    v-model="datosPreliminares.gonioscopia.ojoder" outline
                                    :hint="$t('title.gonioscopy_rigth_eye')" :counter="maxHeigthText"
                                    :rules="[rules.length(maxHeigthText)]" :readonly="validateRead()"></v-textarea>
                            </v-flex>
                            <v-flex xs6>
                                <v-textarea name="input-7-2" :label="$t('title.le')"
                                    v-model="datosPreliminares.gonioscopia.ojoizq" outline
                                    :hint="$t('title.gonioscopy_left_eye')" :counter="maxHeigthText"
                                    :rules="[rules.length(maxHeigthText)]" :readonly="validateRead()"></v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 text-sm-left>
                                <span class="body-2">{{ $t('title.fundoscopy') }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-textarea name="input-7-1" :label="$t('title.re')"
                                    v-model="datosPreliminares.fundoscopia.ojoder" outline
                                    :hint="$t('title.fundoscopy_rigth_eye')" :counter="maxHeigthText"
                                    :rules="[rules.length(maxHeigthText)]" :readonly="validateRead()"></v-textarea>
                            </v-flex>
                            <v-flex xs6>
                                <v-textarea name="input-7-2" :label="$t('title.le')"
                                    v-model="datosPreliminares.fundoscopia.ojoizq" outline
                                    :hint="$t('title.fundoscopy_left_eye')" :counter="maxHeigthText"
                                    :rules="[rules.length(maxHeigthText)]" :readonly="validateRead()"></v-textarea>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 text-sm-left>
                                <span class="body-2">{{ $t('title.tonometry') }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs1 text-sm-left class="vm-p-esp">
                                {{ $t('title.re') }}:
                            </v-flex>
                            <v-flex xs5>
                                <v-text-field v-model="datosPreliminares.tonometria.ojoder" :readonly="validateRead()">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs1 text-sm-left class="vm-p-esp">
                                {{ $t('title.le') }}:
                            </v-flex>
                            <v-flex xs5>
                                <v-text-field v-model="datosPreliminares.tonometria.ojoizq" :readonly="validateRead()">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap v-if="retinal_photo">
                            <v-flex xs12 text-sm-left>
                                <span class="body-2">Cámara de retina</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap v-if="retinal_photo">
                            <v-flex xs2 text-sm-left class="vm-p-esp">
                                <span>Hallazgo en fotografía</span>
                            </v-flex>
                            <v-flex xs2>
                                <v-select :items="['Positivo', 'Negativo']" label="Seleccione" :rules="[rules.required]"
                                    v-model="datosPreliminares.photo_retinal"></v-select>
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
export default {
    name: 'preliminary_data',
    data: (vm) => ({
        items: ['Orto', 'ET', 'XT', 'OTRO'],
        formPreliminaryDataOft: false,
        maxHeigthText: 500,
        otherOdValidate: false,
        otherOiValidate: false,
        datosPreliminares: {
            ppm: {
                ojoDer: {
                    dato: null,
                    otro: null
                },
                ojoIzq: {
                    dato: null,
                    otro: null
                }
            },
            agudezavisual: {
                ojoDer: {
                    sc: null,
                    cc: null,
                    autocorreccion: null
                },
                ojoIzq: {
                    sc: null,
                    cc: null,
                    autocorreccion: null
                }
            },
            examenexterno: {
                ojoder: null,
                ojoizq: null
            },
            biomicroscopio: {
                ojoder: null,
                ojoizq: null
            },
            fundoscopia: {
                ojoder: null,
                ojoizq: null
            },
            gonioscopia: {
                ojoder: null,
                ojoizq: null
            },
            tonometria: {
                ojoder: null,
                ojoizq: null
            },
            // photo_retinal: null,
        },
        retinal_photo: false,
        listAv: ['20/15', '20/20', '20/25', '20/30', '20/40', '20/50', '20/60', '20/70', '20/80', '20/90', '20/100', '20/150', '20/200', '20/400', '20/800', '20/1600', '20/3200', 'Cuenta dedos', 'Mov. Manos', 'Percepcion a Luz', 'No Percepcion a Luz', 'No Colabora', 'No Aplica'],
        rules: {
            required: v => !!v || vm.$t('title.field_required'),
            length: len => v => (v || '').length <= len || `Invalid character length, required ${len}`
        }
    }),
    methods: {
        validateRead() {
            switch (this.tabsActive) {
                case 'optometrist':
                    if (this.getPhisician.role == this.tabsActive) {
                        return false
                    } else return true
                    break
                case 'ophthalmology':
                    if (this.getPhisician.role == 'ophthalmologist') {
                        return false
                    } else return true
                    break
                case 'preliminary':
                    if (
                        this.storeConsultation.objPreliminary ||
                        (this.getPhisician.role !== 'Admision' &&
                            this.$store.getters.getTypeConsulting != 'E')
                    ) return true
                    else return false
                    break
            }
        },
        validateOtherOd(val) {
            if (val.toLowerCase() == 'otro') {
                this.otherOdValidate = true
            } else this.otherOdValidate = false
        },
        validateOtherOi(val) {
            if (val.toLowerCase() == 'otro') {
                this.otherOiValidate = true
            } else this.otherOiValidate = false
        },
        savePreliminaryData() {
            return new Promise((resolve, reject) => {
                if (this.$refs.formPreliminaryDataOftRef.validate()) {
                    resolve(this.datosPreliminares)
                } else {
                    reject(false)
                }
            })
        },
        setDataConsultation() {
            if (this.storeConsultation.datapreliminar) {
                this.datosPreliminares = this.storeConsultation.datapreliminar
            } else if (this.storeConsultation.agudezaVisual) {
                // Ojo Derecho
                this.datosPreliminares.agudezavisual.ojoDer.sc = this.storeConsultation.agudezaVisual.ojoDer.sinCorreccion
                this.datosPreliminares.agudezavisual.ojoDer.cc = this.storeConsultation.agudezaVisual.ojoDer.correccion
                if (
                    this.storeConsultation.autorefraccionA.ojoDer.esfera &&
                    this.storeConsultation.autorefraccionA.ojoDer.cilindro &&
                    this.storeConsultation.autorefraccionA.ojoDer.eje
                ) {
                    this.datosPreliminares.agudezavisual.ojoDer.autocorreccion =
                        this.storeConsultation.autorefraccionA.ojoDer.esfera + " / " +
                        this.storeConsultation.autorefraccionA.ojoDer.cilindro + " / " +
                        this.storeConsultation.autorefraccionA.ojoDer.eje
                }

                // Ojo Izquierdo
                this.datosPreliminares.agudezavisual.ojoIzq.sc = this.storeConsultation.agudezaVisual.ojoIzq.sinCorreccion
                this.datosPreliminares.agudezavisual.ojoIzq.cc = this.storeConsultation.agudezaVisual.ojoIzq.correccion
                if (
                    this.storeConsultation.autorefraccionA.ojoIzq.esfera &&
                    this.storeConsultation.autorefraccionA.ojoIzq.cilindro &&
                    this.storeConsultation.autorefraccionA.ojoIzq.eje
                ) {
                    this.datosPreliminares.agudezavisual.ojoIzq.autocorreccion =
                        this.storeConsultation.autorefraccionA.ojoIzq.esfera + " / " +
                        this.storeConsultation.autorefraccionA.ojoIzq.cilindro + " / " +
                        this.storeConsultation.autorefraccionA.ojoIzq.eje
                }
                if (this.storeConsultation.tonometria) {
                    this.datosPreliminares.tonometria.ojoder = this.storeConsultation.tonometria.ojoDer
                    this.datosPreliminares.tonometria.ojoizq = this.storeConsultation.tonometria.ojoIzq
                }
                // this.photo_retinal = this.storeConsultation.objPreliminary.data.retinal_photo

            }
        }
    },
    mounted() {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setDataConsultation()
        });
        if (this.storeConsultation.objPreliminary) {
            this.retinal_photo =
                this.storeConsultation.objPreliminary.data.retinal_photo == "Si"
                    ? true
                    : false; ///se obtiene el valor de la foto de retina para mostrar en siguiente paso
        }
    },
    computed: {
        storeConsultation() {
            return this.$store.getters.getConsultation
        },
        tabsActive() {
            return this.$store.getters.getTabsValidate
        },
        getPhisician() {
            return this.$store.getters.getPhysician
        }
    }
};
</script>