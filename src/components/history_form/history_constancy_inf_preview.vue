<template>
  <v-container >
    <v-layout row>
      <v-flex xs12 class="pb-2 text-history-wrap" >
        <v-card class="" >
          <v-card-text pb-0 mb-0>
            <p class="text-xs-right pt-3 pr-3 pb-0 mb-0">
                <img src="../../assets/img/logoFudem.jpg" aspect-ratio="1" width="230">  
            </p>  
          </v-card-text>
          <v-card-text>
            <v-container grid-list-md text-xs-left pt-0 mt-0 pb-0 mb-0>
              <v-layout row wrap>
                <v-flex xs12 pb-0 mb-0 pt-0 mt-0>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.date') }}:&nbsp;</span>
                  <span class="body-1">{{date(propdataPreview.date)}}</span>
                </v-flex>
                <v-flex xs12 pb-0 mb-0 pt-0 mt-0>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >Nombre del Paciente:&nbsp;</span>
                  <span class="body-1">{{propdataPreview.person.forename}} {{propdataPreview.person.surname}}</span>
                </v-flex>
                
                <v-flex xs12 pb-0 mb-0 pt-0 mt-0>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.number_of_expedient') }}:&nbsp;</span>
                  <span class="body-1">{{propdataPreview.person.idQflow}}</span>
                </v-flex>
                <v-flex xs12 pb-0 mb-0 pt-0 mt-0>
                  <span
                    class="body-1 font-weight-light font-italic"
                  >{{ $t('title.age') }}:&nbsp;</span>
                  <span class="body-1">{{propdataPreview.person.birthdate | age}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-text class="text-left pt-0 mt-0">
            <v-container class="text-left pt-0 mt-0"> 
                <v-layout row wrap class="text-left">
                    <v-flex xs12 class="text-left" >
                        <p class="text-lg-left" v-html="textConstancy">

                        </p>
                    </v-flex>
                </v-layout>
            </v-container> 
          </v-card-text>
          <v-card-text>
            <v-container> 
                <v-layout row wrap >

                    <v-flex xs12 v-if="propdataPreview.responsableconstancy">
                        <span class="body-1 font-weight-light font-italic digital-signature-content">
                            <v-img 
                                :src="digitalSignatureObjOphthalmology" width="200px" height="200px">
                            </v-img>
                        </span>
                    </v-flex>
                    <v-flex offset-xs3 xs6 class="text-xs-center" v-if="propdataPreview.responsableconstancy">
                        <v-divider light></v-divider>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center" v-if="propdataPreview.responsableconstancy">
                        <span class="primary--text">{{physicianOptometrist}}</span>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center" v-if="propdataPreview.responsableconstancy">
                        <span class="primary--text">{{physicianOptometristSpecialty}}</span>
                    </v-flex>
                </v-layout>
            </v-container> 
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import * as fileServ from '@/componentServs/file';
import * as personServ from "@/componentServs/person";
export default {
  name: "history_consultation_inf_preview",
  data: () => ({
    digitalSignature: undefined,
    digitalSignatureObjOptometrist: undefined,
    digitalSignatureObjOphthalmology: undefined,
    physicianOptometrist: null,
    physicianOphthalmology: null,
    physicianOphthalmologySpecialty:null,
    physicianOptometristSpecialty:null,
    physician: null,
    Consultations : [],
    lenses: [],
    textConstancy:null
  }),
  props: [
    'propdataPreview'
  ],
  computed: {
    storePatient() {
      return this.$store.getters.getPatient;
    }
  },
  created(){
    
    this.textConstancy = this.propdataPreview.description
  },
  mounted () {
    if(this.propdataPreview && this.propdataPreview.responsableconstancy.digital_signature){
        this.getDigital('Optometrist', this.propdataPreview.responsableconstancy._id)
    }
       
  },
  methods: {
    dateConsultig(dateConsult){
        if(this.propdataPreview.objPreliminary)
            return this.propdataPreview.objPreliminary.control.created_at
        else if(this.propdataPreview.objOphthalmology)
            return this.propdataPreview.objOphthalmology.control.created_at
        else
            return this.propdataPreview.objOptometrist.control.created_at

    },
    langTreatament(treatament){
        return this.$t('content.'+treatament)
    },
    langDiagnostic(diagnogtic){
        return diagnogtic[this.$i18n.locale]
    },
    langTypeConsulting(typeConsulting){
        let response = this.Consultations.filter(item => {
            return item.value == typeConsulting
        })
        return response[0] ? response[0].text : typeConsulting;
    },
    langTypeLenses(typelenses){
        if(typelenses){
            let response = this.lenses.filter(item => {
                return item.value == typelenses
            })
            return response[0].text
        }else{
            return typelenses
        }
            
    },
    boolean(value) {
      if(value) {
        return this.$t('title.yes');
      } else {
        return this.$t('title.not');
      }
    },
    capilatize: str => str[0].toUpperCase() + str.slice(1).toLowerCase(),
    renderImage (file) {
        return new Promise ((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                resolve(reader.result)
            };
        })
    },
    getDigital(typeSignature = null,digital){
            
        let objAux = new Object();
        objAux = {
            body:{
                _id: digital
            }
            
        };
        
        personServ
        .getPerson(objAux)
        .then(result => {
            
            this.physicianOptometrist = result.forename+' '+result.surname
            this.physicianOptometristSpecialty = this.$t('title.'+result.role)
            if (result.digital_signature) {
                fileServ
                .getImage(result.digital_signature ,sessionStorage.getItem("pussy"))
                .then( result => {

                    let file = new File([result.data], "Imagen", { type: "image/png;base64" });
                    // let filedrop = { size: result.data.size, name: this.$t('title.digital_signature'), type: "image/png" };
                    this.renderImage(file)
                    .then(result => {
                        if (result) {
                            this.digitalSignatureObjOphthalmology = result
                        }
                    })
                })
            }
        })
        .catch(error => {
            this.closeSession(error);
        });
        
            
    },
    date(value) {
        let date = value.slice(0,10)
        return moment(date, 'YYYY-MM-DD').locale(this.$i18n.locale).format("L");
    },
  },
  watch: {
    propdataPreview: function (val) {

    }
  },
  filters: {
    hour(value) {
        return moment(value).format('LT')
    },
    age(value) {
      return moment().diff(value, "years", false);
    }
  }
};
</script>

<style>
.digital-signature-content-specialty .v-responsive.v-image{
    margin-left: auto;
    margin-right: auto;
    width: auto !important;
    height: 150px !important; 
}
.digital-signature-content .v-responsive.v-image{
    margin-left: auto;
    margin-right: auto;
    width: auto !important;
    height: 150px !important;
}
.v-image__image--cover {
    background-size: contain !important;
}
    
</style>
              