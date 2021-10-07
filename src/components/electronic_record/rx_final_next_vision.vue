<template>
  <v-container>
    <v-form autocomplete="off" ref="formRxFinalNearVisionRef" v-model="formRxFinalNearVision" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.rx')}} {{$t('title.final')}} {{$t('title.near_vision')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    <v-flex xs2 offset-xs2>
                        <span class="body-2">{{$t('title.sphere')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.cylinder')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.axis')}} ({{$t('title.degrees')}})</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.prism')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.av')}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                        {{$t('title.re')}}:
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoDer.esfera"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoDer.cilindro"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoDer.eje"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoDer.prisma"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoDer.av"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                        {{$t('title.le')}}:
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoIzq.esfera"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoIzq.cilindro"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoIzq.eje"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoIzq.prisma"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="rxFinalVisionProxima.ojoIzq.av"
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
    name: 'rx_final_next_vision',
    data () {
      return {
        formRxFinalNearVision: false,
        rxFinalVisionProxima: {
            ojoDer:{
                esfera:null,
                cilindro:null,
                eje:null,
                prisma:null,
                av:null
            },
            ojoIzq:{
                esfera:null,
                cilindro:null,
                eje:null,
                prisma:null,
                av:null
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
                    if (
                        this.storeConsultation.objPreliminary ||
                        (this.getPhisician.role !== 'Admision' && 
                        this.$store.getters.getTypeConsulting != 'E')
                    ) return true
                    else return false
                break
            }
        },
        saveRxFinalNearVision () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formRxFinalNearVisionRef.validate()) {
                    resolve(this.rxFinalVisionProxima)
                }else{
                    reject(false)
                }
            })
        },
        setrxFinalVisionProxima () {
            if(this.storeConsultation.rxFinalVisionProxima)
                this.rxFinalVisionProxima = this.storeConsultation.rxFinalVisionProxima
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setrxFinalVisionProxima()
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