<template>
  <v-container>
    <v-form autocomplete="off" ref="formGeneralDataOftRef" v-model="formGeneralDataOft" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.observationsOphthalmologyOpt')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout align-center justify-center row fill-height>
                    <v-layout align-center justify-center row fill-height>
                        <!-- <v-layout row fill-height>
                            <v-flex xs12 sm8>
                                <v-text-field
                                v-model="optometriaOft"
                                label="Optometría"
                                :readonly="validateRead()">
                                </v-text-field>
                            </v-flex>
                        </v-layout> -->
                        <v-flex xs12 sm8>
                            <v-textarea
                                name="input-7-1"
                                :label="$t('title.observationsOphthalmologyOpt')"
                                v-model="observationsOphthalmology"
                                outline
                                :rules="[]"
                                :hint="$t('title.observationsOphthalmologyOpt')"
                                :readonly="validateRead()"></v-textarea>
                            </v-flex> 
                    </v-layout> 
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
    name: 'general_data_oft',
    data () {
      return {
        formGeneralDataOft: false,
        optometriaOft: null,
        observationsOphthalmology:null,
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
        saveGeneralDataOft () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formGeneralDataOftRef.validate()) {
                    resolve(this.optometriaOft)
                }else{
                    reject()
                }
            })
        },
        setPersonData () {
            if (this.storeConsultation.observationsOphthalmology) {
                this.observationsOphthalmology = this.storeConsultation.observationsOphthalmology
            }
            if (this.storeConsultation.optometriaOft) {
                this.optometriaOft = this.storeConsultation.optometriaOft
            }
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setPersonData()
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