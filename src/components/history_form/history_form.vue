<template>
  <v-container>
    <v-form autocomplete="off" ref="formHistoryRef" v-model="formHistory" lazy-validation>
      <v-stepper  v-model="e6" vertical non-linear>
        <v-stepper-step :step="9999" :edit-icon="'add'" complete :editable=true @click="validateStepper(9999)">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{$t("title.upload_file")}}</h3>
            </div>
          </v-card-title>
        </v-stepper-step>
        <v-stepper-content :step="9999" >
          <v-layout py-1>
            <v-flex xs12 class="px-2 py-2">
              <v-card class="elevation-3">
                <v-card-text>
                  <v-container fluid grid-list-md px-0 py-0>
                    <v-layout row wrap>
                      <v-flex xs4 offset-xs2>
                        <v-text-field :label="$t('title.description')" v-model="nameconsult" :rules=[rules.required]></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="dateFormatted"
                            label="Date"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date = parseDate(dateFormatted)"
                          ></v-text-field>
                          <v-date-picker locale="es-es" v-model="date" no-title @input="menu1 = false">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">{{$t("title.cancel")}}</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(dateFormatted)">Ok</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs8 offset-xs2>
                        <vue-dropzone id="dropzone" ref="myVueDropzone" :options="dropzoneOptions"></vue-dropzone>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-layout row wrap justify-end>
                      <v-flex xs8 offset-xs2>
                        <v-btn color="primary" @click="saveConsult" :disabled="alert" :loading="alert">{{$t("title.save")}}</v-btn>
                        <v-btn flat @click="dischargeImaging">{{$t("title.cancel")}}</v-btn>
                      </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <div v-for="(history, z) in historyConsulting" :key="history._id"> 
          <v-stepper-step :step="z" complete :edit-icon="'assignment'" :editable=true @click="show_report(history._id,z)" >
            {{history.name}}
            <small>{{history.date}}</small>
          </v-stepper-step>
          <v-stepper-content :step="z" complete :editable=true v-if="!history.file">
            <v-layout row wrap>
                <v-flex xs12 class="text-xs-right">
                    <v-btn @click="Print(z)" fab dark small color="primary">
                      <v-icon>print</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <history_consultation_inf class="px-2 py-2" :myProp="history.consultation" ref="history_consultation_inf_ref" :id="z"></history_consultation_inf>
          </v-stepper-content>
        </div>
        <div v-for="(file, z) in filesConsulting" :key="file._id">
          <v-stepper-step :step="z+999999" complete :edit-icon="'attachment'" :editable=true  @click="show_document(file.file,z+999999)" >
            {{file.name}}
            <small>{{file.date}}</small>
          </v-stepper-step>
          <v-stepper-content complete :step="z+999999" v-if="file.file">
            <v-layout row wrap v-if="storePhysician.role == 'Institution'">
                <v-flex xs12 class="text-xs-right">
                    <v-btn @click="deleteDialog(file.id)" fab dark small color="primary">
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <iframe color="grey lighten-1" class="mb-5"
            :src="pdf_document" 
            type="application/pdf" 
            width="90%" 
            height="100%" 
            frameborder="0" 
            style="height: 75vh"
            ></iframe>
          </v-stepper-content>
        </div>
      </v-stepper>
    </v-form>
    <v-dialog
      v-model="alert"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Guardando
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- DIALOGO DE CONFIRMACION DE ELIMINAR CONSULTA PDF -->
    <v-dialog
      v-model="removeDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{$t('content.deletePdf')}}</v-card-title>

        <v-card-text>
          {{$t('content.confirmDeletePdf')}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="removeDialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteFile(idRemoveConsulting)"
          >
            Acepto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  
  
</template>
<script>
const vue2Dropzone = () => import ("vue2-dropzone");
const history_consultation_inf = () => import ('@/components/history_form/history_consultation_inf');

import "vue2-dropzone/dist/vue2Dropzone.min.css";
import * as fileServ from '@/componentServs/file';
import * as consultationServ from '@/componentServs/consultation'
import moment from "moment"
import html2canvas from 'html2canvas';
import { EventBus } from "@/store/eventBus";
export default {
  name: "history_form",
  components: {
    vueDropzone: vue2Dropzone,
    history_consultation_inf
  },
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    menu: false,
    e6: 1,
    removeDialog:false,
    dropzoneOptions: {
      url: "https://httpbin.org/post",
      thumbnailWidth: 150,
      addRemoveLinks: true,
      acceptedFiles: '.pdf',
      uploadMultiple: false,
      maxFiles: 1,
      dictDefaultMessage: '<i class="material-icons">cloud_upload</i> '+vm.$t('title.upload_file')
    },
    idRemoveConsulting: null,
    fileConsulting : null,
    nameconsult:null,
    alert:false, 
    historyConsulting: [],
    filesConsulting: [],
    pdf_document: null, 
    showReport: false,
    showPdf: false,
    showNew: false,
    infPatient:[],
    position:null,
    Consultations : [
        {
            value: 'Post Operative Patient',
            text: vm.$t('title.post_operative_patient')
        },
        {
            value: 'For the first time',
            text: vm.$t('title.for_the_first_time') 
        },
        {
            value: 'Control',
            text: vm.$t('title.control') 
        },
        {
            value: 'E',
            text: vm.$t('title.type_consulting.E') 
        }
    ],
    rules: {
        required: v => !!v || vm.$t('title.field_required') 
    },
    formHistory: false,
    saving: vm.$t('title.saving')
  }),
  methods: {
    deleteDialog(idConsulting){
      this.removeDialog = true
      this.idRemoveConsulting = idConsulting
    },
    deleteFile(idConsulting){
      let objAux = {
        body: {
          consultationId:idConsulting
        },
        token: sessionStorage.getItem("pussy")
      }
     
      consultationServ
      .deleteConsultation(objAux)
      .then ( result => {
        this.removeDialog = false
        this.idRemoveConsulting = null
        this.listConsulting()
      })
    },
    dateConsultig(dateConsult){
      if(dateConsult.objPreliminary.data)
        return dateConsult.objPreliminary.control.created_at
      else if(dateConsult.objOphthalmology.data)
        return dateConsult.objOphthalmology.control.created_at
      else
        return dateConsult.objOptometrist.control.created_at

    },
    langTypeConsulting(typeConsulting){
      let response = this.Consultations.filter(item => {
          return item.value == typeConsulting
      })
      return response[0].text
    },
    validateStepper (val) {
      if (val == this.e6) {
        this.e6 = 99999999999999999
      }
    },
    listConsulting(){
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
            
            this.historyConsulting = []
            this.filesConsulting = []
            async function loadFiles(vm) {
              for (let i in result) {
                if(result[i].file && result[i].file != ""){
                  // let newDate = result[i].dateUpload.split("-")
                  await fileServ.getImage(result[i].file ,sessionStorage.getItem("pussy"))
                  .then( file => {
                    let blob = new Blob([file.data], {type: "application/pdf;base64"});
                    let link = window.URL.createObjectURL(blob);
                    vm.filesConsulting.push({
                        "name": result[i].name,
                        "date": moment(result[i].dateUpload, 'YYYY-MM-DD').locale(vm.$i18n.locale).format("L"),
                        "dateOrder":result[i].dateUpload,
                        "file": link,
                        "id": result[i]._id,
                        "consultation": null
                    })

                    vm.filesConsulting.sort(function(a, b){
                      let keyA = new Date(a.dateOrder),
                      keyB = new Date(b.dateOrder);
                      // Compare the 2 dates
                      if(keyA > keyB) return -1;
                      if(keyA < keyB) return 1;
                      return 0;
                    }); 
                  })
                } 
                if(!result[i].file) {
                  vm.historyConsulting.push({
                    "name": result[i].typeConsultation ? vm.langTypeConsulting(result[i].typeConsultation) : "",
                    "date": moment(vm.dateConsultig(result[i]), 'YYYY-MM-DD').locale(vm.$i18n.locale).format("L"),
                    "file": null,
                    "id": result[i]._id,
                    "consultation": result[i]
                  })
                } 
              }

              
              return
            }

            loadFiles(this)
        })
    },
    Print(e) {
      let ua = navigator.userAgent
        setTimeout(() => {
            html2canvas(document.getElementById(e),{ allowTaint: true}).then(canvas => {
                var windowContent = '<!DOCTYPE html>';
                windowContent += '<html>'
                windowContent += '<head></head>';
                windowContent += '<body>'
                windowContent += '<img src="' + canvas.toDataURL() + '" style="height: 100%; width: 100%">';
                windowContent += '</body>';
                windowContent += '</html>';
                var printWin = window.open('','','width=100%');
                printWin.document.open();
                printWin.document.write(windowContent);
                printWin.document.close();
                if(ua.match(/Trident.*rv\:11\./)) {
                  // console.log("IE nav")
                  printWin.focus();
                  printWin.print();
                  setTimeout(() => {
                    printWin.close();
                  }, 1000);
                } else {
                  // console.log("Otro nav")
                  printWin.document.addEventListener('load', function() {
                      printWin.focus();
                      printWin.print();
                      printWin.close();
                  }, true);       
                }
            },200);
          })
    },
    dischargeImaging(){
      this.nameconsult = null
      this.$refs.myVueDropzone.removeAllFiles()
    },
    saveConsult(){
      let objAux = []
      if (this.$refs.formHistoryRef.validate()) {
        if (this.$refs.myVueDropzone.getAcceptedFiles()[0]) {
            let fd = new FormData();
            let blob = new Blob ([this.$refs.myVueDropzone.getAcceptedFiles()[0]], {type:this.$refs.myVueDropzone.getAcceptedFiles()[0].type})
            fd.append("file", blob)
            
            fileServ
            .sendFile(fd, this.$refs.myVueDropzone.getAcceptedFiles()[0].name, null)
              .then(result => {
                
                this.alert = true
                this.single = null
                let objAux = {
                  body: {
                    person:this.$store.getters.getPatient._id,
                    name: this.nameconsult,
                    control : {
                        active: false
                    },
                    dateUpload: this.date,
                    file: result.id,
                    responsableConsultation: this.$store.getters.getPhysician._id
                  },
                  token: sessionStorage.getItem("pussy")
                }

                consultationServ
                .saveConsultation(objAux)
                .then ( result => { 
                    this.$refs.formHistoryRef.reset()
                    setTimeout(() => (this.alert = false,this.historyConsulting=[],this.listConsulting()), 2000)
                    this.date = new Date().toISOString().substr(0, 10),
                    this.nameconsult = null
                    this.$refs.myVueDropzone.removeAllFiles()
                    
                })
            })
            .catch(err => {
              console.log("error: ", err)
            })
        }
      }
    },
    show_document(document, pos)
    {
      this.pdf_document = document
      this.showPdf = true
      this.showReport = false
      this.showNew =  false
      this.validateStepper(pos)
    },
    show_report(document, pos)
    {
      this.position = pos
      this.showPdf = false
      this.showReport = true
      this.showNew =  false
      this.validateStepper(pos)
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')

      
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
	},
  created(){
    this.listConsulting()
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  mounted () {
    EventBus.$on('listHistory', value => {
      this.listConsulting();
    });
  },
  computed: {
    storePatient() {
      return this.$store.getters.getPatient;
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    storePhysician () {
	      return this.$store.getters.getPhysician  
		},
  }
};
</script>