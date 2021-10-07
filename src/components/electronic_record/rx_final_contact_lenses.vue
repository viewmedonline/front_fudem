<template>
  <v-container>
    <v-form autocomplete="off" ref="formRxFinalContactLensesRef" v-model="formRxFinalContactLenses" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.rx')}} {{$t('title.final')}} {{$t('title.contact_lenses')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.sphere')}}</span>
                    </v-flex>
                    <v-flex xs1>
                        <span class="body-2">{{$t('title.cylinder')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.axis')}} ({{$t('title.degrees')}})</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.cb')}}</span>
                    </v-flex>
                    <v-flex xs1>
                        <span class="body-2">{{$t('title.rx_contact_lenses_dia')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.av')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.brand')}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs2>
                        <v-text-field 
                            :rules="[]"
                            v-model="rxFinalLentesContacto.ojoDer.esfera"
                            :label="$t('title.re')"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoDer.cilindro"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoDer.eje"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoDer.cb"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoDer.dia"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoDer.av"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoDer.brand"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs2>
                        <v-text-field 
                            :rules="[]"
                            v-model="rxFinalLentesContacto.ojoIzq.esfera"
                            :label="$t('title.le')"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoIzq.cilindro"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoIzq.eje"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoIzq.cb"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoIzq.dia"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoIzq.av"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalLentesContacto.ojoIzq.brand"
                            :rules="[]"
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
import { EventBus } from "@/store/eventBus";
  export default {
    name: 'rx_final_contact_lenses',
    data () {
      return {
        formRxFinalContactLenses: false,
        rxFinalLentesContacto: {
            ojoDer:{
                esfera:null,
                cilindro:null,
                eje:null,
                cb:null,
                dia:null,
                av:null,
                brand:null
            },
            ojoIzq:{
                esfera:null,
                cilindro:null,
                eje:null,
                cb:null,
                dia:null,
                av:null,
                brand:null
            }
        },
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
        saveRxFinalContactLenses () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formRxFinalContactLensesRef.validate()) {
                    resolve(this.rxFinalLentesContacto)
                }else{
                    reject(false)
                }
            })
        },
        setRxFinalLentesContacto(){
            if(this.storeConsultation.rxFinalLentesContacto)
              this.rxFinalLentesContacto = this.storeConsultation.rxFinalLentesContacto

            if(this.storePatient.brandLenses){
                if(this.storePatient.brandLenses.ojoDer)
                    this.rxFinalLentesContacto.ojoDer.brand = this.storePatient.brandLenses.ojoDer
                if(this.storePatient.brandLenses.ojoIzq)
                    this.rxFinalLentesContacto.ojoIzq.brand = this.storePatient.brandLenses.ojoIzq
            }
            
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setRxFinalLentesContacto()
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
        },
        storePatient() {
            return this.$store.getters.getPatient;
        }
    }
  }
</script>