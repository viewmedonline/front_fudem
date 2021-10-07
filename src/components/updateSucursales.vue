<template>
  <v-container>
      <v-btn @click="getSucursal">Ejecutar</v-btn>
  </v-container>
</template>
<script>
import axios from 'axios';
import * as allServ from "@/componentServs/updateConsultation";
import * as sucursales from "@/componentServs/sucursal";
const https = require('http');
export default {
  name: "updateSucursales",
  data: vm => ({
    listSucursal : null
  }),
  methods:{
    async getSucursal(){
        sucursales.listSucursalFudem().then(async response =>{
            this.listSucursal = response
            for (let i in this.listSucursal) {
                let objAux = {
                    body: {
                      UnitId: this.listSucursal[i].UnitId
                    },
                    token: sessionStorage.getItem("pussy")
                }
                
                await sucursales.getSucursal(objAux).then(async result=>{
                    
                    if(result.length > 0){
                        console.log("Actualizar Sucursal: ",result[0]._id)
                        return await this.updateSucursal(this.listSucursal[i],result[0]._id)  
                    }else{
                        console.log("Crear Sucursal: ",this.listSucursal[i])
                        return await this.CreateSucursal(this.listSucursal[i]) 
                        
                    }
                })
                .then(async sucursal => {
                    console.log(sucursal)
                })
                .catch(err => {
                    console.log(err)
                })
            }
            window.close() 
        })
        
    },
    updateSucursal(sucursalData,sucursalId){
        return new Promise((resolve, reject) => {
            let objAux = {
                body: {
                  id: sucursalId,
                  Name: sucursalData.Name,
                  Description: sucursalData.Description,
                  ParentUnitId: sucursalData.ParentUnitId,
                  UnitType: sucursalData.UnitType
                },
                token: sessionStorage.getItem("pussy")
            }
            sucursales.updateSucursal(objAux).then(result=>{
                resolve(result) 
            })
        })
    },
    CreateSucursal(sucursalData){
        return new Promise((resolve, reject) => {
            let objAux = {
                body: {
                  UnitId: sucursalData.UnitId,
                  ParentUnitId: sucursalData.ParentUnitId,
                  Name: sucursalData.Name,
                  Description: sucursalData.Description,
                  UnitType: sucursalData.UnitType
                },
                token: sessionStorage.getItem("pussy")
            }
            sucursales.createSucursal(objAux).then(result=>{
                resolve(result) 
            })
        })
    }
    
  },
  created(){
    this.getSucursal()
  },
  
};
</script>

   
    

    