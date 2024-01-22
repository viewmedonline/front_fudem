<template>
  <v-container>
    <v-form autocomplete="off" ref="formObservationsRef" v-model="formObservations" lazy-validation>
      <v-card class="elevation-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span
            class="subheading white--text text-capitalize"
          >{{$t('title.observations')}} {{$t('title.and').toLowerCase()}} {{$t('title.medications')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-textarea
                            name="input-7-1"
                            :label="$t('title.observations')"
                            v-model="observations"
                            outline
                            :counter="maxHeigthText"
                            :rules="[rules.length(maxHeigthText)]"
                            :readonly="validateRead()"
                        ></v-textarea>
                    </v-flex>
                    <v-flex xs8 v-if="useListMedicines">
                        <v-autocomplete
                            v-model="medications"
                            :items="items"
                            :readonly="validateRead()"
                            :label="$t('title.medications')"
                            persistent-hint
                            prepend-icon=""
                            return-object
                            item-text="medications"
                          >
                            <v-slide-x-reverse-transition
                              slot="append-outer"
                              mode="out-in"
                            >
                                <v-btn 
                                    dark 
                                    small 
                                    icon 
                                    color="grey white--text"
                                    @click="appendListMedicines">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-slide-x-reverse-transition>
                        </v-autocomplete>
                    </v-flex>
                    <v-flex xs8 v-else>
                        <v-text-field
                          :readonly="validateRead()"
                          v-model="medications"
                          :label="$t('title.medications')">
                          <v-slide-x-reverse-transition
                              slot="append-outer"
                              mode="out-in"
                            >
                                <v-btn 
                                    dark 
                                    small 
                                    icon 
                                    color="grey white--text"
                                    
                                    @click="appendListMedicines"
                                >
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-slide-x-reverse-transition>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-checkbox
                            :readonly="validateRead()"
                            label="Lista Precargada"
                            v-model="useListMedicines"
                        ></v-checkbox>
                    </v-flex> 
                    <v-flex xs12>
                      
                        <v-textarea
                          outline
                          v-model="dosis" 
                          name="input-7-4"
                          label="Dosis"
                          :readonly="validateRead()"
                          
                        ></v-textarea>
                    
                    </v-flex>
                    
                    <v-flex xs12 class="text-sm-left">
                        <v-data-table
                          :headers="headers"
                          :items="assignedMedicines"
                          class="elevation-1"
                          rows-per-page-text="Filas por pagina"
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item}}</td>
                                <td>{{ assignedRecetas[assignedMedicines.indexOf(props.item)]}}</td>
                                <td class="justify-center layout px-0">
                                  <v-icon
                                    :disabled="validateRead()"
                                    class="mt-3"
                                    @click="deleteItem(props.item)"
                                  >
                                    delete
                                  </v-icon>
                                </td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
      </v-card>
      <v-card class="elevation-3 mt-3">
        <v-card-title primary-title class="blue-grey darken-1">
          <span
            class="subheading white--text text-capitalize"
          >{{$t('title.next_appointment')}}</span>
        </v-card-title>
        <v-divider light class="vm-border-color-2"></v-divider>
        <v-card-text>
            <!-- <v-container fluid grid-list-md px-0 py-0>
                <v-layout row wrap>
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
                        <v-date-picker locale="es-es" 
                            ref="date" 
                            v-model="date" 
                            no-title scrollable
                            :min="date"
                        >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">{{$t("title.cancel")}}</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(dateFormatted)">OK</v-btn>
                        </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
            </v-container> -->
            <v-container
              id="input-usage"
              grid-list-xl
              fluid
            >
              <v-layout wrap>
                <v-flex xs4>
                  <v-text-field
                    v-model="dateFormatted"
                    prepend-icon="event"
                    :label="$t('title.next_appointment')"
                  ></v-text-field>
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
    name: 'observations',
    data: vm => ({
        date: new Date().toISOString().substr(0, 10),
        // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)), --> Para utilizar en caso de que se necesite el datepicker
        dateFormatted: null,
        menu: false,
        dosis:null,
        formObservations: false,
        observations: null,
        medications: null,
        maxHeigthText: 500,
        isEditing: true,
        useListMedicines: false,
        assignedMedicines: [],
        assignedRecetas: [],
        items: ['Sophixin Ofteno 5 ml - Clorhidrato de ciprofloxacino al 0.3%',
                '3A Ofteno - Diclofenac Sodico 1%',
                'Acular - Ketorolaco trometamina 0.4%',
                'Aflarex - Acetato de fluorometolona 0.1%',
                'Atropina - Atropina al 0.1%',
                'Azopt colirio - Brinzolamida  1% ',
                'Clodex Colirio - Cloranfenicol 1% dexametasona 0.1%',
                'Clodex Ungüento - Cloranfenicol 1% dexametasona 0.1%',
                'Clodexfina colirio - Cloranfenicol 0.5% dexametasona 0.1% Nafazolina 0.025%',
                'Coxilán Ofteno  - Meloxican al 0.03%',
                'Flunax K colirio - Ketotifeno0.25 mg/ml',
                'Gaap Ofteno 3 ml - Latanoprost 0.005%',
                'Genteal colirio - Hidroxipropilmetilcelulosa 0.3%',
                'Imot Ofteno 0.50 %, 15 ml - Timolol 0.5%',
                'Meticel Ofteno - Hipromelosa 0.5%',
                'Nafazinc Solucion Oft.  - Sulfato de Zinc 0.02% , Nafazolina 0.005%',
                'Nafina Plus colirio -  Nafazolina 0.1% , Hidroxipropilmetilcelulosa 0.5%',
                'Naphacel Ofteno - Clorhidrato de nafazolina 0.1%  Hipromelosa 0.5%',
                'Naphcon A - Diclofenaco sodico 0.1%',
                'Oflox colirio - Colirio en solución 3 mg/ml   ',
                'Prednefrin Forte - Acetato de pednisolona 1% ',
                'Refresh Tears - Carboximetilcelulosa sodica 0.5% ',
                'Solex D colirio - Dextran , metilcelulosa',
                'Solex lágrimas colirio - Hidroxipropilmetilcelulosa 0.5%',
                'Sophipren  - Acetato de prednisolona 1% ',
                'Tobradex colirio - Tobramicina 0.3% dexametasona 0.1%',
                'Tobradex ung. - Tobramicina 0.3% dexametasona 0.1%',
                'Todex susp. - Tobramicina al 0.3%  Dexametasona 0.1% ',
                'Travatan - Travapost 0.04 %                                      ',
                'Trazidex Ofteno - Tobramicina al 0.3% Dexametasona 0.1% ',
                'Trazidex Ungüento - Tobramicina al 0.3% Dexametasona 0.1% ',
                'Trazinac   - tobramicina 0.3%   Diclofenac sodico  0.1%',
                'Vigamox - Clorhidrato de Moxifloxacina 0.5%',
                'Viscotears gel - Acido Poliacrilico ',
                'Vitalux Plus fco. Tab. - Multivitaminas / Minerales',
                'Vitreofar  Solucion Oft - Ioduro de sodio 0.3% ;  Ioduro de potasio 0.3%',
                'Oprex solución 0.5% - Timolol 0.5%',
                'Nevanac susp. - Nepafenaco 0.1%',
                'Krytantec Ofteno - Dorzolamida 2%  Timolol 0.5%   Brimonidina 0.2%',
                'Flumetol  -  Acetato de Flurometolona 0.1%',
                'OFTAFILM COLIRIO 10 ML - Hialuronato de sodio 0.4%',
                'Solex Plus colirio 0.3% - Hidroxipropilmetilcelulosa 0.3% ',
                'Todex Ungüento - Tobramicina 0.3%  Dexametazona 0.1%                                ',
                'Todexfina - Tobramicina 0.3%  Dexametazona 0.1%  Nafazolina 0.025%',
                'Humylub Ofteno - Sulfato de condroitina 0.18%  Hialuronato  de sodio 0.1% ',
                'Splash Tears - Sulfato de sodio 0.1% ,  Hipromelosa 0.2%',
                'Sophixin DX Ofteno 5 ml - Ciprofloxacino 0.3% ,   Dexametasona 0.1%',
                'Patanol S 2% - Olopatadina ',
                'Refresh Liquigel colirio - Carboximeltilcelulosa sodica 1%',
                'Oftizolamida tab. - Oftizolamida  250 mg ',
                'Oftigel - Acido Poliacrilico  (10 gr)',
                'Vigadexa - Moxifloxacino 0.5%/ Dexametasona 0.5%',
                'Duotrav - Travapost 0.04 %  , Timolol 5mg/1 ml ',
                'Glaucotensil T - Dorzolamida 2%    , Timolol 0.5%                  ',
                'Fenila - Fluorometalona 0.1% . Tetrizolina 0.025% ',
                'Azarga - Brinzolamida 10mg/5ml  ,  timolol 5 mg ',
                'Oftipred - Acetato de prednisolona 1% ',
                'Talof 5ml - Lopteprednol ,   Etabonato 0.2% ',
                'Systane Ultra - Polietilenglicol 0.4%  , Propilenglicol 0.3%                   ',
                'Ocunut A - Solucion esteril . Extracto de arbol de te , acido borico, propilenglicol, borato de sodio , agua purificada ',
                'Systane Balance - Propilenglicol al 0.6% ',
                'Visionase cap. caja por 30 - complejo vitaminico',
                'Diabetone caja por 30 unidades - Vitaminas esenciales ',
                'Cardioace caja por 30 unidades - Vitaminas esenciales ',
                'Alap 0.2% - Olopatadina',
                'Optive 15ml - Carboximetilcelulosa sodica 0.5% glicerina 0.9%',
                'Novotears Colirio fco. 10ml -  Nafazolina -Hipromelosa- Dextran ',
                'Glaucopress fco.  - Maleato de timolol al 0.5% ',
                'Ofticel Colirio - Carboximeltilcelulosa  al 0.5% ',
                'Ocufresh Fco.  - Hidroxipropilmetilcelulosa',
                'Osmosept Fco. - Cloruro de sodio al 0.5% ',
                'Humylub PF  - Sulfato de condroitina 0.18%, Hialuronato  de sodio 0.1% ',
                'Eliptic Ofteno - Dorzolamida 2%,   Timolol 0.5%',
                'Nepadol frasco  - Nepafenaco 0.1%',
                'Patadine Colirio - olopatadina ',
                'Pretifen Gotas - Ketotifeno0.25 mg/ml',
                'Manzanilla Sophia - Extracto seco de matricaria , manzanilla',
                'Murocel Sol.Oft. - Metilcelulosa  0.5%',
                'Zebesten - Bromfenaco 0.09% solucion esteril',
                'Lacritir 10 gr - Acido Poliacrilico ',
                'CYFLON - Clorhidrato de ciprofloxacino al 0.3%',
                'CYFLON DX - Ciprofloxacino 0.3% ,   Dexametasona 0.1%',
                'OFTIMOL - Timolol 0.5%',
                'PRESUS - Latanoprost 0.005%',
                'zimbrinza  5 ml  - Brinzolamida/Brimonidina ',
                'Hiperton al 5%  - Cloruro de sodio al 5% ',
                'Metilcelulosa Vijosa  - Metilcelulosa 0.5% '
                ],
        headers: [
            {
              text: 'Medicinas',
              align: 'left',
              sortable: false,
              value: 'name'
            },
            {
              text: 'Dosis',
              align: 'left',
              sortable: false,
              value: 'receta'
            },
            {
              text: 'Acciones',
              align: 'center',
              sortable: false,
              value: 'name'
            }
        ],
        rules: {
            required: v => !!v || this.$t('title.field_required'),
            length: len => v => (v || '').length <= len || `Invalid character length, required ${len}`
        }
    }),
    methods: {
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
      deleteItem(item) {
          const index = this.assignedMedicines.indexOf(item)
          
          confirm('¿Esta seguro que desea eliminar este medicamento?') && this.assignedMedicines.splice(index, 1) && this.assignedRecetas.splice(index, 1) 
      },
      appendListMedicines () {
          if (this.medications && this.dosis) {
              this.assignedMedicines.unshift(this.medications)
              this.assignedRecetas.unshift(this.dosis)
              this.medications = null
              this.dosis = null
          }else if(!this.dosis){
            alert("Debe especificar la dosis")
          }else if(!this.medications){
            alert("Debe especificar el medicamento")
          }else{
            alert("Debe especificar el medicamento y la dosis")
          }
      },
      saveObservations () {
          return new Promise ((resolve, reject) => {
              if (this.$refs.formObservationsRef.validate()) {
                  let valor = {
                      observacion: this.observations,
                      medicamentos: this.assignedMedicines,
                      recetas: this.assignedRecetas,
                      next_appointment: this.dateFormatted
                  }
                  resolve(valor)
              }else{
                  reject(false)
              }
          })
      },
      setDataConsultation () {
          if (this.storeConsultation.observaciones) {
              this.observations = this.storeConsultation.observaciones.observacion
              this.assignedMedicines = this.storeConsultation.observaciones.medicamentos
              this.assignedRecetas = this.storeConsultation.observaciones.recetas
              if(this.storeConsultation.next_appointment)
                this.dateFormatted = this.storeConsultation.next_appointment
          }
      }
    },
    mounted () {
        EventBus.$on('changeTabReload', value => {
            this.$forceUpdate()
            this.setDataConsultation()
        });
    },
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.date)
        },
        storeConsultation () {
          return this.$store.getters.getConsultation  
        }
    },
    watch: {
        date (val) {
        this.dateFormatted = this.formatDate(this.date)
        }
    },
  }
</script>