<template>
  <v-container>
    <v-form autocomplete="off" ref="formVisualAcuityOptRef" v-model="formVisualAcuityOpt" lazy-validation>
    <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
            <span class="subheading white--text text-capitalize">{{$t('title.visual_acuity')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-btn
                    class="button-view-acuity"
                    fab
                    small
                    color="primary"
                    top
                    right
                    absolute
                    :disabled="visualDisabledButton"
                    @click="historyVisual=true"
                >
                    <v-icon>assignment</v-icon>
                </v-btn>
                <v-layout row wrap>
                    <v-flex xs2 offset-xs2>
                        <span class="body-2">{{$t('title.sc')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.cc')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.ph')}}</span>
                    </v-flex>
                    <v-flex xs2>
                        <span class="body-2">{{$t('title.auto_tonometry')}}</span>
                    </v-flex>
                </v-layout>
                
                <v-layout row wrap>
                    <v-flex xs1 offset-xs1 text-sm-left class="vm-p-esp">
                        {{$t('title.re')}}:
                    </v-flex>
                    <v-flex xs2>
                        <v-select
                            v-model="agudezaVisualOPT.ojoDer.sinCorreccion"
                            :items="listAv"
                            :rules="[rules.required]"
                            :readonly="validateRead()"
                            ></v-select>
                    </v-flex>
                    <v-flex xs2>
                        <v-select
                            v-model="agudezaVisualOPT.ojoDer.correccion"
                            :items="listAv"
                            :readonly="validateRead()"
                            ></v-select>
                        
                    </v-flex>
                    <v-flex xs2>
                        <v-select
                            v-model="agudezaVisualOPT.ojoDer.ph"
                            :items="listAv"
                            :readonly="validateRead()"
                            ></v-select>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                            v-model="agudezaVisualOPT.ojoDer.autoTonometria"
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
                        <v-select
                            v-model="agudezaVisualOPT.ojoIzq.sinCorreccion"
                            :items="listAv"
                            :rules="[rules.required]"
                            :readonly="validateRead()"
                            ></v-select>
                    </v-flex>
                    <v-flex xs2>
                        <v-select
                             v-model="agudezaVisualOPT.ojoIzq.correccion"
                            :items="listAv"
                            :readonly="validateRead()"
                            ></v-select>
                    </v-flex>
                    <v-flex xs2>
                        <v-select
                            v-model="agudezaVisualOPT.ojoIzq.ph"
                            :items="listAv"
                            :readonly="validateRead()"
                            ></v-select> 
                    
                    </v-flex>
                    <v-flex xs2>
                        
                        <v-text-field
                            v-model="agudezaVisualOPT.ojoIzq.autoTonometria"
                            :rules="[]"
                            :readonly="validateRead()">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
    </v-form>
    <v-dialog v-model="historyVisual" scrollable max-width="40%">
      <v-card>
        <v-card-title>{{$t('title.history_visual_acuity')}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
            <v-layout row wrap align-center>
                <v-flex xs4>   
                </v-flex>
                <v-flex xs4>
                    <span class="body-1 font-weight-medium">{{$t('title.sc')}}</span>
                </v-flex>
                <v-flex xs4>
                    <span class="body-1 font-weight-medium">{{$t('title.cc')}}</span>
                </v-flex>
                <v-flex xs12>
                    <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 v-for="(visual, z) in visualAcuity" :key="z">
                    <v-layout row wrap align-center>
                        <v-flex xs4>
                            <span class="font-weight-medium">{{$t('title.right_eye')}}</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="body-1">{{visual.ojoDer.sinCorreccion}}</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="body-1">{{visual.ojoDer.correccion}}</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="font-weight-medium">{{$t('title.left_eye')}}</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="body-1">{{visual.ojoIzq.sinCorreccion}}</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="body-1">{{visual.ojoIzq.correccion}}</span>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center> 
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="historyVisual = false">{{$t('title.close')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  
</template>

<script>
import { EventBus } from "@/store/eventBus";
import * as consultationServ from '@/componentServs/consultation'
  export default {
    name: 'visual_acuity',
    data () { 
      return {
        formVisualAcuityOpt: false,
        dialogm1: '',
        visualDisabledButton:false,
        historyVisual: false,
        show: false,
        visualAcuity:[],
        agudezaVisualOPT: {
            ojoDer: {
                sinCorreccion: null,
                correccion: null,
                ph:null,
                autoTonometria:null,
            },
            ojoIzq: {
                sinCorreccion: null,
                correccion: null,
                ph:null,
                autoTonometria:null,
            },
            observation: null
        },
        listAv:['20/15', '20/20', '20/25', '20/30', '20/40', '20/50', '20/60', '20/70', '20/80', '20/90', '20/100', '20/150', '20/200', '20/400', '20/800', '20/1600', '20/3200', 'Cuenta dedos','Mov. Manos', 'Percepcion a Luz','No Percepcion a Luz','No Colabora','No Aplica'],
        rules: {
            required: v => !!v || this.$t('title.field_required')
        }
      }
    },
    created(){
        let objAux = {
            body: {
            person:this.$store.getters.getPatient._id
            },
            active: false,
            token: sessionStorage.getItem("pussy")
        } 

        consultationServ
        .getListConsultation(objAux)
        .then ( result => {
            
            if(result.length > 0){
                this.visualDisabledButton = false
                result.forEach(element => {
                    if(element.objOptometrist && element.objOptometrist.data)
                        this.visualAcuity.push(element.objOptometrist.data.agudezaVisualOPT) 
                    else
                        this.visualDisabledButton = true
                });
            }else{
                this.visualDisabledButton = true
            }
            
                   
        })
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
        saveVisualAcuity () {
            return new Promise ((resolve, reject) => {
                if (this.$refs.formVisualAcuityOptRef.validate()) {
                    resolve(this.agudezaVisualOPT)
                }else{
                    reject(false)
                }
            })
        },
        setVisualAcuity () {
            if (
                this.storeConsultation.agudezaVisualOPT ||
                this.storeConsultation.agudezaVisual
            ) {
                this.agudezaVisualOPT =this.storeConsultation.agudezaVisualOPT || this.storeConsultation.agudezaVisual
            }

            if (this.storeConsultation.tonometria) {
                this.agudezaVisualOPT.ojoDer.autoTonometria = this.storeConsultation.tonometria.ojoDer || null
                this.agudezaVisualOPT.ojoIzq.autoTonometria = this.storeConsultation.tonometria.ojoIzq || null
            }
    
        }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setVisualAcuity()
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
    }
  }
</script>
