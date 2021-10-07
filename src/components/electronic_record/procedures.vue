<template>
  <v-container>
    <v-form autocomplete="off" ref="formProceduresRef" v-model="formProcedures" lazy-validation>
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span class="subheading white--text text-capitalize">Procedimiento de Diagnóstico</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
          <v-container fluid grid-list-xl>
            <v-layout wrap align-center>
              <v-flex xs12 sm4 d-flex>
                <v-select 
                  v-model="valProcess"
                  @change="validateOtherInput" 
                  :items="items" 
                  label="Procedimientos"
                  :readonly="validateRead()">
                </v-select>
              </v-flex>

              <v-flex xs12 sm4 d-flex v-if="validateOther">
                <v-text-field
                  v-model="valOther"
                  label="Otro" 
                  required
                  :readonly="validateRead()">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm4 d-flex>
                <v-select 
                  v-model="valEyes"
                  :items="items2" 
                  label="Ojo"
                  :readonly="validateRead()">
                  <v-slide-x-reverse-transition
                    slot="append-outer"
                    mode="out-in"
                  >
                      <v-btn 
                          dark 
                          small 
                          icon 
                          color="grey white--text"
                          @click="appendListProcess">
                          <v-icon>add</v-icon>
                      </v-btn>
                  </v-slide-x-reverse-transition>
                </v-select>
              </v-flex>
              <v-flex xs12 class="text-sm-left">
                <v-data-table
                  :headers="headers"
                  :items="listProcess"
                  class="elevation-1"
                  rows-per-page-text="Filas por pagina"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.process}}</td>
                        <td>{{ props.item.other}}</td>
                        <td>{{ props.item.eye}}</td>
                        <td class="justify-center layout px-0">
                          <v-icon
                            :disabled="validateRead()"
                            class="mt-3"
                            @click="deleteItem(props.item,'listProcess')"
                          >
                            delete
                          </v-icon>
                        </td>
                    </template>
                    <!-- <template slot="no-data">
                      <v-alert :value="true" color="error" icon="warning">
                        Debe Asignar al menos un procedimiento
                      </v-alert>
                    </template> -->
                </v-data-table>
              </v-flex>
            </v-layout>
             <v-divider></v-divider>
            <v-layout wrap>
              <v-flex xs12 sm8 d-flex>
                <v-select 
                  v-model="valProcessterapeuticos"
                  :items="items3" 
                  label="PROCEDIMIENTOS TERAPEUTICOS"
                  :readonly="validateRead()">
                  <v-slide-x-reverse-transition
                    slot="append-outer"
                    mode="out-in"
                  >
                  </v-slide-x-reverse-transition>
                </v-select>
              </v-flex>
              <v-flex xs12 sm4 d-flex>
                <v-select 
                  v-model="valEyes2"
                  :items="items2" 
                  label="Ojo"
                  :readonly="validateRead()">
                  <v-slide-x-reverse-transition
                    slot="append-outer"
                    mode="out-in"
                  >
                      <v-btn 
                          dark 
                          small 
                          icon 
                          color="grey white--text"
                          @click="appendListProcessTer">
                          <v-icon>add</v-icon>
                      </v-btn>
                  </v-slide-x-reverse-transition>
                </v-select>
              </v-flex>
              <v-flex xs12 class="text-sm-left">
                <v-data-table
                  :headers="headers2"
                  :items="listProcessterapeuticos"
                  class="elevation-1"
                  rows-per-page-text="Filas por pagina"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.process}}</td>
                        <td>{{ props.item.eye}}</td>
                        <td class="justify-center layout px-0">
                          <v-icon
                            :disabled="validateRead()"
                            class="mt-3"
                            @click="deleteItem(props.item,'listProcessterapeuticos')"
                          >
                            delete
                          </v-icon>
                        </td>
                    </template>
                    <!-- <template slot="no-data">
                      <v-alert :value="true" color="error" icon="warning">
                        Debe Asignar al menos un procedimiento
                      </v-alert>
                    </template> -->
                </v-data-table>
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
  name: "procedures",
  data: () => ({
    formProcedures: false,
    valProcess: null,
    valProcessterapeuticos:null,
    valOther: null,
    valEyes: null,
    valEyes2: null,
    validateOther: false,
    listProcess: [],
    listProcessterapeuticos:[],
    items: [
      "FOTOGRAFIA DE FONDO DE OJO",
      "FOTOGRAFIA DE NERVIO OPTICO",
      "FOTOGRAFIA SEGMENTO ANTERIOR",
      "ANGIOGRAFIA CON FLUORESCEÍNA",
      "OCT MACULAR",
      "OCT NERVIO OPTICO",
      "OCT DE ANGULO",
      "ULTRASONOGRAFÍA",
      "CAMPIMETRÍA",
      "PAQUIMETRÍA",
      "BIOMETRÍA",
      "MICROSCOPÍA ESPECULAR",
      "OTROS"
    ],
    items2: [
      "Derecho",
      "Izquierdo",
      "Ambos"
    ],
    items3: [
      "PANFOTOCOAGULACION LÁSER",
      "LASER FOCAL",
      "INYECCION INTRAVITREA",
      "TRABECULOPLASTIA LASER SELECTIVA (SLT)",
      "IRIDOTOMÍA PERIFÉRICA",
      "CAPSULOTOMÍA"
    ],
    headers: [
        {
          text: 'Procedimiento',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Otros',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Ojo',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Acciones',
          align: 'center',
          sortable: false,
          value: 'name'
        }
    ],
    headers2: [
        {
          text: 'Procedimiento',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Ojo',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Acciones',
          align: 'center',
          sortable: false,
          value: 'name'
        }
    ]
  }),
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
    deleteItem(item,list = 'listProcess') {
      const index = this[list].indexOf(item)
      confirm('¿Esta seguro que desea eliminar este procedimiento?') && this[list].splice(index, 1)
    },
    appendListProcessTer(){
      let item = {
        process: this.valProcessterapeuticos,
        eye: this.valEyes2
      }

      function pushProcesster(vm, item) {
        vm.listProcessterapeuticos.push(item)
        vm.valProcessterapeuticos = null
        vm.valEyes2 = null

      }

      if (item.process && item.eye) {
        pushProcesster(this, item)
      }
    },
    appendListProcess () {
      let item = {
        process: this.valProcess,
        other: this.valOther,
        eye: this.valEyes
      }

      function pushProcess(vm, item) {
        vm.listProcess.push(item)
        vm.validateOther = false
        vm.valProcess = null
        vm.valOther = null
        vm.valEyes = null
      }

      if (
        item.process &&
        item.eye &&
        !this.validateOther
      ) {
        pushProcess(this, item)
      } else if (
        item.process &&
        item.eye &&
        item.other && 
        this.validateOther
      ) {
        pushProcess(this, item)
      }
    },
    validateOtherInput (val) {
      if (val) {
        if (val.toLowerCase() == 'otros') this.validateOther = true
        else this.validateOther = false
      }
    },
    saveProcedures () {
      return new Promise ((resolve, reject) => {
        if (this.$refs.formProceduresRef.validate()) {
          let obj = {
            proccess:this.listProcess,
            processTherapeutic:this.listProcessterapeuticos
          }
          resolve(obj)
        } else {
          reject()
        }
      })
    },
    setConsultationData () {
      if (this.storeConsultation.process) {
        this.listProcess = this.storeConsultation.process
      }
      if(this.storeConsultation.processTherapeutic){
        this.listProcessterapeuticos = this.storeConsultation.processTherapeutic
      }
    }
  },
  mounted () {
    EventBus.$on('changeTabReload', value => {
        this.$forceUpdate()
        this.setConsultationData()
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
};
</script>
        