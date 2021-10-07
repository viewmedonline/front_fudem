<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
             <v-btn @click="servicePerson">Ejecutar</v-btn>

                <v-data-table
                    :headers="headersRecords"
                    :items="listPersonsReport"
                    class="elevation-1"
                    multi-sort
                >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-center">
                          {{props.index+1}} 
                      </td>
                      <td class="text-xs-center">
                          {{props.item.person.forename}} {{props.item.person.surname}}
                      </td>
                      <td class="text-xs-center">
                          {{props.item.record}}  
                      </td>
                      <td class="text-xs-center">
                          {{props.item.consultas.total}}  
                      </td>
                      <td class="text-xs-center">
                          {{props.item.consultas.buenas}}  
                      </td>
                      <td class="text-xs-center">
                          {{props.item.consultas.malas}}  
                      </td>
                    </template>
                </v-data-table>
            </v-flex>
            <v-flex xs12 pt-5 class="text-xs-left">
                Consultas Para Descartar: {{ countConsultasMalasDescartar}}
            </v-flex> 
            <v-flex xs12 pt-2 class="text-xs-left">
                Consultas Buenas: {{ countConsultasBuenas}}
            </v-flex> 
            <v-flex xs12 pt-2 class="text-xs-left">
                Consultas Malas: {{ countConsultasMalas}}
            </v-flex> 
        </v-layout>
    </v-container>
</template>
<script>
import * as allServ from "@/componentServs/updateConsultation";
export default {
  name: "updateRecords",
  data: vm => ({
    listPersons : [],
    listPersonsReport: [],
    pagination:{},
    headersRecords: [
      {
        text: 'N°',
        align: 'center',
        sortable: false
      },
      {
        text: 'NOMBRE DEL PACIENTE',
        align: 'center',
        sortable: false
      },
      {
        text: 'RECORDS',
        align: 'center',
        sortable: false
      },
      {
        text: 'Consultas',
        align: 'center',
        sortable: false
      }
      ,
      {
        text: 'Buenas',
        align: 'center',
        sortable: false
      }
      ,
      {
        text: 'Malas',
        align: 'center',
        sortable: false
      }
    ],
    countConsultasMalasDescartar:0,
    countConsultasMalas:0,
    countConsultasBuenas:0
  }),
  methods:{
    servicePerson(){
        let objAux = {
            body: {
              role: ['Patient'],
              record : { '$exists' : true }
            },
            token: sessionStorage.getItem("pussy")
        }
        
        allServ.getPersonUpdate(objAux).then(result=>{
            this.listPersonsresult = result
            this.listPersonsRecords()
        })
    },
    async listPersonsRecords(){
        for (let i in this.listPersonsresult) {
            let objAux = {
                body: {
                  id: this.listPersonsresult[i].record
                },
                token: sessionStorage.getItem("pussy")
            }
            await allServ.getRecordsPatient(objAux).then(async result=>{
                return await this.serviceRecord(result[0],this.listPersonsresult[i])
            })
            .then(async records => {
                console.log(records)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    serviceRecord(record,person){
        return new Promise((resolve, reject) => {

            let objAux = {
                body: {
                  person: person._id,
                  file : { '$exists' : false }
                },
                token: sessionStorage.getItem("pussy")
            }
            allServ.getConsulting(objAux).then(async result=>{
                if(result && result.length > 0){
                    await this.serviceValidateConsulting(result)
                        .then(listValidate => {
                            this.countConsultasMalas+=listValidate.malas
                            this.countConsultasBuenas+=listValidate.buenas
                            if(
                                record.antecedent.antecedentes.length > 0 && 
                                record.cirugias.cirugias.length > 0
                            ){
                                if(result.length != listValidate.buenas) {
                                    this.listPersonsReport.push({
                                        person: person,
                                        record: 'Buenos',
                                        consultas:{
                                            total: result.length,
                                            malas:listValidate.malas,
                                            buenas:listValidate.buenas
                                        }
                                    })
                                }
                            }else{
                                if(result.length == listValidate.malas){
                                    this.countConsultasMalasDescartar++
                                    this.countConsultasMalas--
                                }

                                this.listPersonsReport.push({
                                    person: person,
                                    record: 'Malos',
                                    consultas:{
                                        total:result.length,
                                        malas:listValidate.malas,
                                        buenas:listValidate.buenas
                                    }
                                })
                            }
                            
                        })
                }
            })
            resolve(this.listPersonsReport)
        })
    },
    serviceValidateConsulting(consultations){
        return new Promise((resolve, reject) => {
            async function validate () {
                let list = {
                    buenas: 0,
                    malas: 0
                }

                for (let i in consultations) {
                    if(consultations[i].record && consultations[i].record.antecedent.antecedentes.length > 0 && consultations[i].record.cirugias.cirugias.length > 0 )
                        list.buenas++
                    else
                        list.malas++
                }

                return list
            }

            validate()
            .then(list => {
                resolve(list)
            })
        })
    },
  },
  created(){
  
  },
  computed: {
    pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  props: {
        source: String
    }
  
};
</script>
 