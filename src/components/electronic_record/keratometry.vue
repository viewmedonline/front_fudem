<template>
  <v-container>
    <v-form autocomplete="off" ref="formKeratometryRef" v-model="formKeratometry" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.keratometry')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    <v-flex xs2 offset-xs3>
                        <span class="body-2">{{$t('title.sphere_keratonom')}}</span> 
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.axis')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.cylinder_keratonom')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.axis')}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs2 offset-xs1 text-sm-left class="vm-p-esp">
                        {{$t('title.re')}}:
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="queratometria.ojoDer.esfera"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="queratometria.ojoDer.ejeEs"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="queratometria.ojoDer.cilindro"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="queratometria.ojoDer.ejeCil"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs2 offset-xs1 text-sm-left class="vm-p-esp">
                        {{$t('title.le')}}:
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="queratometria.ojoIzq.esfera"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="queratometria.ojoIzq.ejeEs"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="queratometria.ojoIzq.cilindro"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="queratometria.ojoIzq.ejeCil"
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
    name: 'keratometry',
    data () {
      return {
        formKeratometry: false,
        queratometria: {
            ojoDer: {
                esfera: null,
                cilindro: null,
                ejeEs: null,
                ejeCil: null
            },
            ojoIzq: {
                esfera: null,
                cilindro: null,
                ejeEs: null,
                ejeCil: null
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
        saveKeratometry () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formKeratometryRef.validate()) {
                    resolve(this.queratometria)
                }else{
                    reject(false)
                }
            })
        },
        setKeratometry () {

            if (
                this.storeConsultation.objPreliminary && 
                this.tabsActive == 'preliminary'
            ) {
                if (this.storeConsultation.objPreliminary.data) this.queratometria = this.storeConsultation.objPreliminary.data.queratometria
                else if (this.storeConsultation.queratometria) this.queratometria = this.storeConsultation.queratometria
            } else if (this.storeConsultation.queratometria)
                this.queratometria = this.storeConsultation.queratometria
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setKeratometry()
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