<template>
  <v-container>
    <v-form autocomplete="off" ref="formClinicHistoryRef" v-model="formClinicHistory" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.history_clinic')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout align-center justify-center row fill-height>
                    <v-flex xs12 sm8>
                        <v-textarea
                        name="input-7-1"
                        :label="$t('title.history_clinic')"
                        v-model="clinicHistory"
                        :rules="[]"
                        :readonly="validateRead()"
                        outline
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
    name: 'clinic_history',
    data () {
      return {
        formClinicHistory: false,
        clinicHistory: null,
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
                    if (
                        this.storeConsultation.objPreliminary ||
                        (this.getPhisician.role !== 'Admision' && 
                        this.$store.getters.getTypeConsulting != 'E')
                    ) return true
                    else return false
                break
            }
        },
        saveClinicHistory () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formClinicHistoryRef.validate()) {
                    resolve(this.clinicHistory)
                }else{
                    reject(false)
                }
            })
        },
        setDataConsultation () {
            if (this.storeConsultation.historyClinic)
                this.clinicHistory = this.storeConsultation.historyClinic
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setDataConsultation()
        });
    },
    computed: {
        validateRequired () {
            if (this.$store.getters.getTypeConsulting == 'E') return []
            else return [this.rules.required]
        },
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