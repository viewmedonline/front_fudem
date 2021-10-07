<template>
  <v-container>
    <v-form autocomplete="off" ref="formGeneralDataOptRef" v-model="formGeneralDataOpt" lazy-validation>
    <v-card class="elevation-3">
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <v-select 
                            v-model="typeLenses"
                            :items="lenses"
                            :label="$t('title.type_of_lenses')"
                            :readonly="validateRead()" 
                            >
                        </v-select>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-textarea
                        name="input-7-1"
                        v-model="reasonConsultation"
                        outline
                        :label="$t('title.reasonforconsultation')"
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
  import moment from "moment"
  export default {
    name: 'general_data_2',
    data () {
      return {
        formGeneralDataOpt: false,
        typeLenses: null,
        reasonConsultation: null,
        lenses: [
            {
                value: 'Simple Vision',
                text: this.$t('opt.simple_vision')
            },
            {
                value: 'Multifocal',
                text: this.$t('opt.multifocal')
            },
            {
                value: 'Bifocal',
                text: this.$t('opt.bifocal')
            },
            {
                value: 'Contact Lens',
                text: this.$t('opt.contact_lens')
            },
            {
                value: 'Special Lenses',
                text: this.$t('opt.special_lenses')
            }
        ],
        rules: {
            required: v => false // !!v || this.$t('title.field_required')
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
        saveGeneralDataOpt () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formGeneralDataOptRef.validate()) {
                    let generalDataOpt = {
                        reasonConsultation: this.reasonConsultation,
                        typeLense: this.typeLenses
                    }
                    resolve(generalDataOpt)
                }else{
                    reject(false)
                }
            })
        },
        setPersonData () {
            this.typeLenses = this.storeConsultation.generalData ? this.storeConsultation.generalData.typeLense : null
            this.reasonConsultation = this.storeConsultation.reasonConsultation ? this.storeConsultation.reasonConsultation : null
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setPersonData()
        });
    },
    computed: {
        storePatient () {
            return this.$store.getters.getPatient
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
    },
  }
</script>