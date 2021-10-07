<template>
  <v-container>
    <v-form autocomplete="off" ref="formOtherDataRef" v-model="formOtherData" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.other_data')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field 
                            v-model="otrosDatos.alergias" 
                            :label="$t('antecedent.allergic_to')"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field 
                            v-model="otrosDatos.medicamentos" 
                            :label="$t('antecedent.use_of_medications')"
                            :readonly="validateRead()">
                        </v-text-field>
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
    name: 'other',
    data () {
      return {
        formOtherData: false,
        otrosDatos: {
            alergias: null,
            medicamentos: null
        },
        rules: {
            required: v => !!v || this.$t('title.field_required')
        }
      }
    },
    methods: {
        validateRead(){
            if(this.storeConsultation.objPreliminary){
                if (this.storeConsultation.objPreliminary.data) return true
                return false
            }
        },
        saveOtherData () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formOtherDataRef.validate()) {
                    let otros = {
                        alergias: [this.otrosDatos.alergias],
                        medicamentos: [this.otrosDatos.medicamentos]
                    }
                    resolve(otros)
                }else{
                    reject(false)
                }
            })
        },
        setDataAntecedent () {

            if (this.storeConsultation.record) {
                this.otrosDatos.alergias = this.storeConsultation.record.otrosDatos.alergias[0]
                this.otrosDatos.medicamentos = this.storeConsultation.record.otrosDatos.medicamentos[0]
            }
        }
    },
    computed: {
        storeConsultation () {
          return this.$store.getters.getConsultation  
        }
    }
  }
</script>