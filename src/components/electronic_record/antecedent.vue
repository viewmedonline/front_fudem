<template>
  <v-container>
    <v-form autocomplete="off" ref="formAntecedentRef" v-model="formAntecedent" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.antecedents')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout align-center justify-center row fill-height>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.hta')}`"
                        v-model="antecedents[0].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.chagas')}`"
                        v-model="antecedents[1].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.cancer')}`"
                        v-model="antecedents[2].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row fill-height>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.diabetes')}`"
                        v-model="antecedents[3].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.hepatitis')}`"
                        v-model="antecedents[4].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.heart_disease')}`"
                        v-model="antecedents[5].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row fill-height>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.nephropathy')}`"
                        v-model="antecedents[6].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.pneumopathy')}`"
                        v-model="antecedents[7].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.hematopathy')}`"
                        v-model="antecedents[8].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row fill-height>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.fracture_injury')}`"
                        v-model="antecedents[9].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.smoking_habit')}`"
                        v-model="antecedents[10].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                        :label="`${$t('antecedent.alcoholism')}`"
                        v-model="antecedents[11].value"
                        :readonly="validateRead()"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row fill-height>
                    <v-flex xs12 sm4>
                        <v-text-field v-model="otros" :label="$t('title.others')" required :readonly="validateRead()"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row fill-height>
                    <v-flex xs12 sm7>
                        <v-textarea
                        name="input-7-1"
                        :label="$t('antecedent.use_of_medications')"
                        outline
                        v-model="medicamentosAntecedent"
                        :readonly="validateRead()"
                        ></v-textarea>
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
    name: 'antecedent',
    data () {
      return {
        formAntecedent: false,
        antecedents: [
            {
                name: 'hta',
                value: false,
            },
            {
                name: 'chagas',
                value: false,
            },
            {
                name: 'cancer',
                value: false,
            },
            {
                name: 'diabetes',
                value: false,
            },
            {
                name: 'hepatitis',
                value: false,
            },
            {
                name: 'cardiopatia',
                value: false,
            },
            {
                name: 'nefropatia',
                value: false,
            },
            {
                name: 'neumopatia',
                value: false,
            },
            {
                name: 'hematopatia',
                value: false,
            },
            {
                name: 'lesionFractura',
                value: false,
            },
            {
                name: 'tabaquismo',
                value: false,
            },
            {
                name: 'alcoholismo',
                value: false,
            }
        ],
        otros: null,
        medicamentosAntecedent: null,
        rules: {
            required: v => !!v || this.$t('title.field_required')
        }
      }
    },
    methods: {
        validateRead(){
            switch(this.tabsActive) {
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
                    if (this.getPhisician.role !== 'Admision') {
                        if (this.$store.getters.getTypeConsulting != 'E') {
                            return true
                        } else if (
                            this.$store.getters.getTypeConsulting == 'E'
                        ) {
                            if ( this.storeConsultation.objPreliminary ) {
                                if (this.storeConsultation.objPreliminary.data) return true
                                else return false
                            }
                        }
                    } else if (this.storeConsultation.objPreliminary) {
                        if (this.storeConsultation.objPreliminary.data) return true
                        else return false
                    }
                break
            }
        },
        saveAntecedent () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formAntecedentRef.validate()) {
                    let valor = {
                        antecedentes: this.antecedents,
                        otros: this.otros,
                        medicamentosAntecedent: this.medicamentosAntecedent
                    }
                    resolve(valor)
                }else{
                    reject(false)
                }
            })
        },
        setDataAntecedent () {
            let antecedentaAux = []
            let _this = this
            let objs = [
                { key: 'objPreliminary', tab: 'preliminary' },
                { key: 'objOptometrist', tab: 'optometrist' },
                { key: 'objOphthalmology', tab: 'ophthalmology' }
            ]
            let existsAny = false

            function antecedentDefault () {
                antecedentaAux = _this.storeConsultation.record.antecedent.antecedentes
                if(antecedentaAux.length > 0) _this.antecedents = antecedentaAux
                
                _this.otros = _this.storeConsultation.record.antecedent.otros
                _this.medicamentosAntecedent = _this.storeConsultation.record.antecedent.medicamentosAntecedent 
            }

            function antecedentSpecialty (objName) {
                antecedentaAux = _this.storeConsultation[objName].data.record.antecedent.antecedentes
                if(antecedentaAux.length > 0) _this.antecedents =  antecedentaAux
                
                _this.otros = _this.storeConsultation[objName].data.record.antecedent.otros
                _this.medicamentosAntecedent = _this.storeConsultation[objName].data.record.antecedent.medicamentosAntecedent
            }


            for( let i in objs) {
                if (
                    this.storeConsultation[objs[i].key] && 
                    this.tabsActive == objs[i].tab
                ) {
                    // console.log(objs[i].tab)
                    if (this.storeConsultation[objs[i].key].data) {
                        // console.log(objs[i].key)
                        existsAny = true
                        antecedentSpecialty(objs[i].key);
                        break
                    }
                }
            }

            if(!existsAny && this.storeConsultation.record) {
                // console.log('Entre por aqui');
                antecedentDefault()
            }

        }
    },
    create(){
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setDataAntecedent()
        });
    },
    computed: {
        storeConsultation () {
          return this.$store.getters.getConsultation  
        },
        tabsActive () {
          return this.$store.getters.getTabsValidate  
        },
        getPhisician () {
          return this.$store.getters.getPhysician  
        }
    }
  }
</script>