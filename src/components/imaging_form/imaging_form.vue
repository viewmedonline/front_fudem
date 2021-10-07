<template>
  <v-container>
      <v-layout justify-center>
        <v-flex xs12>
          <v-card class="elevation-3 blue-grey lighten-5">
            <v-flex xs2 offset-xs9>
              <v-btn
                color="blue-grey"
                class="white--text"
                @click="dialog = true"
              >
                {{$t('title.new_image')}}
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
            </v-flex>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex v-for="card in cards" xs6 :key="card.title">
                  <v-card class="elevation-3">
                    <v-btn class="right" icon @click="confirmImage(card.id)" v-if="getPhisician.role && getPhisician.role == 'Institution'">
                      <v-icon>delete</v-icon>
                    </v-btn>
                    <v-img :src="card.src" height="200px" @click="imageModal(card.src)">
                      
                      <v-container fill-height fluid pa-2>
                        
                        <v-layout fill-height>
                          
                        </v-layout>
                      </v-container>
                    </v-img>
                    <v-card-actions>
                      <span class="caption black--text" v-text="card.dateImagin"></span>
                      <span class="caption black--text black--text--title" v-text="card.title"></span>
                      <v-spacer></v-spacer>
                      
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    
    <v-dialog
        v-model="dialog" 
        persistent 
        max-width="600px"
      >
      
        <v-card tile>
          <v-form autocomplete="off" ref="formImagingRef" v-model="formImaging" lazy-validation>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{$t("title.new_image")}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat :disabled="savedisabled" @click="saveImaging">{{$t("title.save")}}</v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
              <v-btn dark flat @click="dischargeImaging">{{$t("title.cancel")}}</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-layout justify-center row>
              <v-flex xs12 class="pb-2">
                <v-card>
                  <v-card-text>
                    <v-container fluid grid-list-md px-0 py-0>
                      <v-layout row wrap>
                        <v-flex xs4 offset-xs2>
                          <v-text-field :label="$t('title.description')" :rules=[rules.required] v-model="nameconsult"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            :return-value.sync="dateFormatted"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                          >
                            <v-text-field
                              slot="activator"
                              v-model="dateFormatted"
                              label="Fecha"
                              prepend-icon="event"
                              @blur="date = parseDate(dateFormatted)"
                              readonly
                            ></v-text-field>
                            <v-date-picker ref="date" v-model="date" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="menu = false">{{$t("title.cancel")}}</v-btn>
                              <v-btn flat color="primary" @click="$refs.menu.save(dateFormatted)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-flex xs8 offset-xs2>
                          <vue-dropzone id="dropzone" ref="myVueDropzone" :options="dropzoneOptions"></vue-dropzone>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <!-- <v-card-actions>
                    <v-layout row wrap justify-end>
                      <v-flex xs8 offset-xs2>
                        <v-btn color="primary" @click="saveImaging" :disabled="alert" :loading="alert">Guardar</v-btn>
                        <v-btn flat @click="dischargeImaging">Cancel</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-actions> -->
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
          </v-form>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
     
    </v-dialog>
      
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
          {{this.message}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="imageSize"
      max-width="800"
      v-if="srcImageModal"
    >
      <v-card>
        <v-card-text>
          <v-img :src="srcImageModal">
            <v-container>
              
            </v-container>
          </v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Dialogo antes de guardar preliminares -->
    <v-dialog
      v-model="deleteImagin"
      max-width="500"
    >
      <v-card>
        <v-card-text class="headline"> ¡Atencion! </v-card-text>
        <v-card-text class="headline">
          {{ $t('content.confirmDeleteImage')}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteImagin = false"
          >
            {{$t('title.cancel')}}
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="removeImage(imageIdRemove)"
          >
            {{$t('title.delete')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
const vue2Dropzone = () => import ("vue2-dropzone");
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import * as fileServ from '@/componentServs/file';
import * as imagingServ from '@/componentServs/imaging';

import moment from "moment"
export default {
  name: "imaging",
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false,
    nameconsult:null,
    cards: [ ],
    dropzoneOptions: {
      url: "https://httpbin.org/post",
      thumbnailWidth: 150,
      addRemoveLinks: true,
      acceptedFiles: ".png,.jpg,.jpeg",
      dictDefaultMessage: '<i class="material-icons">cloud_upload</i> '+vm.$t('title.upload_file')
    },
    deleteImagin:false,
    alert:false,
    message:"Guardando",
    dialog: false,
    imageSize:false,
    srcImageModal:null,
    rules: {
        required: v => !!v || vm.$t('title.field_required')
    },
    formImaging:false,
    savedisabled:null,
    imageIdRemove:null
  }),
  components: {
    vueDropzone: vue2Dropzone
  },
  methods:{
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    imageModal(img){
      this.imageSize = true
      this.srcImageModal = img
    },
    confirmImage(imagenDelete){
      this.imageIdRemove = imagenDelete
      this.deleteImagin = true
      return
    },
    saveImaging(){
      let objAux = []
      if (this.$refs.formImagingRef.validate()) {
        if (this.$refs.myVueDropzone.getAcceptedFiles()[0]) {
            this.savedisabled = 'disabled'
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
                    file: result.id,
                    dateImagin:this.dateFormatted,
                    responsableConsultation: this.$store.getters.getPhysician._id,
                    control:{
                      created_by: this.$store.getters.getPhysician._id
                    }
                  },
                  token: sessionStorage.getItem("pussy")
                }
                
                imagingServ
                .saveImaging(objAux)
                .then ( result => { 
                    setTimeout(() => (this.savedisabled = null,this.alert = false,this.nameconsult = null,
                      this.$refs.myVueDropzone.removeAllFiles(),this.imagingList(),this.dialog = false), 2000)
                    
                })

            })
            .catch(err => {
              console.log("error: ", err)
            })
        }else{
          alert("Debe Subir por lo menos una Imagen")
        }
      }
    },
    removeImage(image){
     
      let objAux = {
        body: {
          imageId:image,
          control: {
            active:false,
            updated_by: this.$store.getters.getPhysician._id,
            updated_at: new Date().toISOString().substr(0, 10)
          }
        },
        token: sessionStorage.getItem("pussy")
      }
       
      imagingServ
      .removeImaging(objAux)
      .then ( result => { 
        this.deleteImagin = false
        this.imagingList();
      })
    },
    dischargeImaging(){
      this.nameconsult = null
      this.$refs.myVueDropzone.removeAllFiles()
      this.dialog = false
      this.imagingList()
    },
    imagingList(){
      this.cards = []
      let objAux = {
        personId:this.$store.getters.getPatient._id,
        token: sessionStorage.getItem("pussy")
      }
      imagingServ
      .getListImaging(objAux)
        .then ( result => { 
            result.forEach(elem => { 
                if(elem.file && elem.file != ""){
                  fileServ
                  .getImage(elem.file._id ,sessionStorage.getItem("pussy"))
                  .then( result => {
                    let blob = new Blob([result.data], {type: elem.file.contentType+";base64"});
                    let link = window.URL.createObjectURL(blob);
                    this.cards.push({
                        title: elem.name,
                        src:  link,
                        dateImagin: elem.dateImagin,
                        id: elem._id
                    })
                      
                  })
                }
                                
            });
        })
      
    }
  },
  created(){
    this.imagingList() 
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    getPhisician () {
	      return this.$store.getters.getPhysician  
    },
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
};
</script>