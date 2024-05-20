<template>
    <v-container>
        <v-form autocomplete="off" ref="retinalCameraRef" v-model="formRetinalCamera" lazy-validation>
            <v-card class="elevation-3">
                <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize">Cámara de Retina</span>
                </v-card-title>
                <v-divider light class="vm-border-color-2"></v-divider>
                <v-card-text>
                    <v-container fluid grid-list-md px-0 py-0>

                        <v-layout row wrap>
                            <v-flex xs2>
                                <!-- <v-select :items="items" label="Seleccione" :rules="[rules.required]"
                                    v-model="photo_retinal"></v-select> -->
                                <v-radio-group v-model="photo_retinal" row
                                    :rules="!disabled_options ? [rules.required] : []" :disabled="disabled_options">
                                    <v-radio label="Si" value="Si"></v-radio>
                                    <v-radio label="No" value="No"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex xs8>
                                <v-textarea outline label="Notas" v-model="retinal_notes" 
                                    ></v-textarea>
                            </v-flex>                            
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
            <v-card class="elevation-3" style="margin-top: 15px" v-if="photo_retinal == 'Si'">
                <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize">Hallazgo en fotografía</span>
                </v-card-title>
                <v-divider light class="vm-border-color-2"></v-divider>
                <v-card-text>
                    <v-container fluid grid-list-md px-0 py-0>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <!-- <v-select :items="items" label="Seleccione" :rules="[rules.required]"
                                    v-model="photo_retinal"></v-select> -->
                                <v-radio-group v-model="findings_photo" row
                                    :rules="!disabled_options ? [rules.required] : []" :disabled="disabled_options">
                                    <v-radio label="Positivo" value="Positivo"></v-radio>
                                    <v-radio label="Negativo" value="Negativo"></v-radio>
                                    <v-radio label="No evaluable" value="No evaluable"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea label="Observaciones en fotografía" v-model="observations_photo"
                                    :disabled="!findings_photo || disabled_options"></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-form>
    </v-container>
</template>
<script>
export default {
    name: 'retinalCamera',
    data() {
        return {
            formRetinalCamera: false,
            photo_retinal: null,
            findings_photo: null,
            retinal_notes:null,
            observations_photo: null,
            rules: {
                required: v => !!v || this.$t('title.field_required')
            }
        }
    },
    methods: {
        saveRetinalCamera() {
            return new Promise((resolve, reject) => {
                if (this.$refs.retinalCameraRef.validate()) {
                    resolve({
                        photo_retinal: this.photo_retinal,
                        findings_photo: this.findings_photo,
                        observations_photo: this.observations_photo,
                        retinal_notes: this.retinal_notes
                    })
                } else {
                    reject(false)
                }
            })
        },
        setDataRetinalCamera() {
            if (this.storeConsultation.objPreliminary) {
                this.photo_retinal = this.storeConsultation.objPreliminary.data.retinal_photo
                this.findings_photo = this.storeConsultation.objPreliminary.data.retinal_findings
                this.observations_photo = this.storeConsultation.objPreliminary.data.retinal_observations
                this.retinal_notes = this.storeConsultation.objPreliminary.data.retinal_notes
            }

        },
    },
    computed: {
        storeConsultation() {
            return this.$store.getters.getConsultation
        },
    },
    watch: {
        findings_photo(val) {
            if (!this.disabled_options) {
                this.observations_photo = `Hallazgo ${val}`
            }
        }
    },
    props: {
        title: String,
        disabled_options: Boolean,
    }
}
</script>