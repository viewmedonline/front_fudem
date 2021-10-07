<template>
  <v-container>
      <v-btn @click="getUser">Ejecutar</v-btn>
  </v-container>
</template>
<script>
import * as allServ from "@/componentServs/updateConsultation";
export default {
  name: "updateConsultation",
  data: vm => ({
    list : [
        {user:'KROJAS',sucursal:2},
        {user:'HGARCIA',sucursal:55},
        {user:'IBURGOS',sucursal:55},
        {user:'JCORELLANA',sucursal:51},
        {user:'LVILLAFRANCO',sucursal:51},
        {user:'AMIXCO',sucursal:8},
        {user:'CALVARADO',sucursal:9},
        {user:'CCUCHILLAS',sucursal:9},
        {user:'CMARIO',sucursal:9},
        {user:'CMORALES',sucursal:9},
        {user:'CVELASQUEZ',sucursal:9},
        {user:'DSARAVIA',sucursal:8},
        {user:'GBENDIX',sucursal:9},
        {user:'GMORALES',sucursal:9},
        {user:'HANDRES',sucursal:9},
        {user:'HCUCHILLAS',sucursal:9},
        {user:'JARAUJO',sucursal:8},
        {user:'JBRITO',sucursal:9},
        {user:'JELIAS',sucursal:8},
        {user:'JJOVEL',sucursal:9},
        {user:'KCISNEROS',sucursal:9},
        {user:'LAREVALO',sucursal:9},
        {user:'LGUERRERO',sucursal:9},
        {user:'MBETANCOURTH',sucursal:8},
        {user:'MPADILLA',sucursal:9},
        {user:'NRAMOS',sucursal:8},
        {user:'PGUZMAN',sucursal:9},
        {user:'PruebaOfta',sucursal:9},
        {user:'PruebaOpta',sucursal:8},
        {user:'RCARTAGENA',sucursal:9},
        {user:'RCHAVEZ',sucursal:9},
        {user:'RGUERRA',sucursal:8},
        {user:'RRAMIREZ',sucursal:9},
        {user:'RSAPRISSA',sucursal:9},
        {user:'SCASTRO',sucursal:9},
        {user:'SPINEDA',sucursal:9},
        {user:'SRIVERA',sucursal:9},
        {user:'SSORTO',sucursal:8},
        {user:'XCARCAMO',sucursal:9},
        {user:'KSALAZAR',sucursal:32},
        {user:'RVILLAFRANCO',sucursal:30},
        {user:'NMENJIVAR',sucursal:45},
        {user:'DURBINA',sucursal:39},
        {user:'RPEREZ',sucursal:39},
        {user:'WLEMUS',sucursal:40},
        {user:'CAVILA',sucursal:71},
        {user:'CLOPEZ',sucursal:72},
        {user:'KBONILLA',sucursal:71},
        {user:'RGAITAN',sucursal:72},
        {user:'BVELASQUEZ',sucursal:63},
        {user:'CSILVA',sucursal:63},
        {user:'MMOLINA',sucursal:63},
        {user:'MRUIZ',sucursal:62},
        {user:'TLOPEZ',sucursal:63},
        {user:'WGUEVARA',sucursal:62},
        {user:'EBARILLAS',sucursal:84},
        {user:'GMENDEZ',sucursal:83},
        {user:'IDUENAS',sucursal:83},
        {user:'JAYALA',sucursal:83},
        {user:'LLOPEZ',sucursal:84},
        {user:'MMEJIA',sucursal:84},
        {user:'RACEVEDO',sucursal:84},
        {user:'RARBIZU',sucursal:84},
        {user:'RMONCADA',sucursal:84},
        {user:'SAYALA',sucursal:83},
        {user:'VCRUZ',sucursal:83}

    ]
  }),
  methods:{
    async getUser(){
        for (let i in this.list) {
            let objAux = {
                body: {
                  idUserFudem: this.list[i].user
                },
                token: sessionStorage.getItem("pussy")
            }
            await allServ.getUser(objAux).then(async result=>{

                if(result){
                    console.log("User: ",result._id)
                    return await this.servicePerson(result._id)  
                }
            })
            .then(async person => {
                console.log("Person: ",person._id)
                let objAuxConsulting = {
                    body:{},
                    control:{
                        active: false,
                    },
                    token: {},
                    
                }
                
                if(person.role == 'optometrist')
                    objAuxConsulting.body['objOptometrist.data.responsableConsultation'] = person._id
                else
                    objAuxConsulting.body['objOphthalmology.data.responsableConsultation'] = person._id

                return await this.serviceConsulting(objAuxConsulting) 
            })
            .then(async consulting => {
                console.log("Para actualizar: ",consulting)
                return await this.serviceUpdateConsulting(consulting,this.list[i].sucursal)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    servicePerson(x){
        return new Promise((resolve, reject) => {
            let objAux = {
                body: {
                  user: x
                },
                token: sessionStorage.getItem("pussy")
            }
            allServ.getPerson(objAux).then(result=>{
                resolve(result) 
            })
        })
    },
    serviceConsulting(x){
        console.log("Objeto para buscar Consulta: ",x)
        return new Promise((resolve, reject) => {
            allServ.getConsulting(x).then(result=>{
                resolve(result) 
            }).catch(error =>{
                console.log("Error GetConsulting: ", error)
                reject()
            })
        })
    },
    serviceUpdateConsulting(consulting,sucursalId){
        console.log(consulting)
        async function updateConsulting(){
            let objAux = {
                body: {
                  UnitId: sucursalId
                },
                token: sessionStorage.getItem("pussy")
            }
            console.log("Body Consulting: ",objAux)
            await allServ.getListSucursal(objAux).then(async result=>{
                console.log("Sucursal: ",result._id)     
                for (let i in consulting) {
                    let objAux = {
                        body: {
                          sucursalId: result._id
                        },
                        id: consulting[i]._id,
                        token: sessionStorage.getItem("pussy")
                    }
                    
                    await allServ.getUpdateConsulting(objAux)
                    
                    
                }
            })
            .catch(error =>{
                console.log("Error getListSucursal: ", error)
                reject()
            })
            
        }
        updateConsulting()
    }
  },
  created(){
  
  },
  
};
</script>

   
    

    