<template>
  <v-container>
    <v-form autocomplete="off" ref="formAutorefractionARef" v-model="formAutorefractionA" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.autorefraction')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    <v-flex xs3 offset-xs2>
                        <span class="body-2">{{$t('title.sphere')}}</span>
                    </v-flex>
                    <v-flex xs3>
                        <span class="body-2">{{$t('title.cylinder')}}</span>
                    </v-flex>
                    <v-flex xs3>
                        <span class="body-2">{{$t('title.axis')}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                        {{$t('title.re')}}:
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field 
                            v-model="autorefraccionA.ojoDer.esfera"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field 
                            v-model="autorefraccionA.ojoDer.cilindro"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field 
                            v-model="autorefraccionA.ojoDer.eje"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                        {{$t('title.le')}}:
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field 
                            v-model="autorefraccionA.ojoIzq.esfera"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field 
                            v-model="autorefraccionA.ojoIzq.cilindro"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field 
                            v-model="autorefraccionA.ojoIzq.eje"
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
    name: 'autorefraction_a',
    data () {
      return {
        formAutorefractionA: false,
        autorefraccionA: {
            ojoDer: {
                esfera: null,
                cilindro: null,
                eje: null
            },
            ojoIzq: {
                esfera: null,
                cilindro: null,
                eje: null
            }
        },
        rules: {
           // required: v => false // !!v || this.$t('title.field_required')
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
        saveAutoRefractionA () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formAutorefractionARef.validate()) {
                    resolve(this.autorefraccionA)
                }else{
                    reject(false)
                }
            })
        },
        setAutoRefractionA () {
            if (
                this.storeConsultation.objPreliminary && 
                this.tabsActive == 'preliminary'
            ) {
                if (this.storeConsultation.objPreliminary.data) this.autorefraccionA = this.storeConsultation.objPreliminary.data.autorefraccionA
                else if (this.storeConsultation.autorefraccionA) this.autorefraccionA = this.storeConsultation.autorefraccionA
            } else if (this.storeConsultation.autorefraccionA)
                this.autorefraccionA = this.storeConsultation.autorefraccionA
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setAutoRefractionA()
        });
    },
    computed: {
        tabsActive () {
          return this.$store.getters.getTabsValidate  
        },
        storeConsultation () {
          return this.$store.getters.getConsultation  
        },
        getPhisician () {
	      return this.$store.getters.getPhysician  
		},
    }
  }
</script>