<template>
  <v-container>
    <v-form autocomplete="off" ref="formTreatmentPlanRef" v-model="formTreatmentPlan" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.treatment_plan')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    
                    <v-flex xs12>
                        <v-switch
                        :label="`${$t('content.ophthalmological_profile_exam')}`"
                        v-model="treatmentplan.tratamiento[7].value"
                        :readonly="validateRead()"></v-switch>
                    </v-flex>
                    <v-flex xs12>
                        <v-switch
                        :label="`${$t('content.strategy_profile_exam')}`"
                        v-model="treatmentplan.tratamiento[8].value"
                        :readonly="validateRead()"></v-switch>
                    </v-flex>
                    <v-flex xs12>
                        <v-switch
                        :label="`${$t('content.pterigion_profile_exam')}`"
                        v-model="treatmentplan.tratamiento[9].value"
                        :readonly="validateRead()"></v-switch>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            v-model="treatmentplan.laser"
                            :label="$t('title.laser')"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            v-model="treatmentplan.lentes"
                            :label="$t('title.lenses')"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-textarea
                        :label="$t('title.others')"
                        v-model="treatmentplan.otros"
                        outline
                        :hint="$t('title.other') + ' ' + $tc('title.plan',1)"
                        :counter="maxHeigthText"
                        :rules="[rules.length(maxHeigthText)]"
                        :readonly="validateRead()"
                    ></v-textarea>
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
    name: 'treatment_plan',
    data () {
      return {
        formTreatmentPlan: false,
        maxHeigthText: 500,
        treatmentplan: {
            tratamiento: [
                {
                    name: 'oct',
                    value: false,
                },
                {
                    name: 'biometria',
                    value: false,
                },
                {
                    name: 'campimetria',
                    value: false,
                },
                {
                    name: 'angiografia',
                    value: false,
                },
                {
                    name: 'paquimetria',
                    value: false,
                },
                {
                    name: 'ultrasonografia',
                    value: false,
                },
                {
                    name: 'topografiaCorneal',
                    value: false,
                },
                {
                    name: 'ophthalmological_profile_exam',
                    value: false,
                },
                {
                    name: 'strategy_profile_exam',
                    value: false,
                },
                {
                    name: 'pterigion_profile_exam',
                    value: false,
                }
            ],
            laser: null,
            lentes: null,
            otros: null
        },
        rules: {
            required: v => !!v || this.$t('title.field_required'),
            length: len => v => (v || '').length <= len || `Invalid character length, required ${len}`
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
                    if (
                        this.storeConsultation.objPreliminary ||
                        (this.getPhisician.role !== 'Admision' && 
                        this.$store.getters.getTypeConsulting != 'E')
                    ) return true
                    else return false
                break
            }
        },
        saveTreatmentPlan () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formTreatmentPlanRef.validate()) {
                    resolve(this.treatmentplan)
                }else{
                    reject(false)
                }
            })
        },
        setDataConsultation () {
            if (this.storeConsultation.treatmentplan) {
                if (this.storeConsultation.treatmentplan.tratamiento.length > 0){
                    this.treatmentplan = this.storeConsultation.treatmentplan
                }
            }
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setDataConsultation()
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