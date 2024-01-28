<template>
  <v-content>
    <v-tabs v-model="tab" color="#004969" grow>
      <v-tabs-slider color="red"></v-tabs-slider>

      <v-tab style="color: aliceblue" v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4 offset-xs4>
                <v-avatar :tile="false" class="vm-border-color" size="90px" color="white">
                  <v-icon>gesture</v-icon>
                </v-avatar>
              </v-flex>
              <v-flex class="py-2" xs4 offset-xs4>
                <span class="headline primary--text">{{
                  $t("title.digital_signature")
                }}</span>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title>
                    {{ $t("title.doctors") }}
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" :label="$t('title.search')" single-line
                      hide-details :maxlength="30"></v-text-field>
                  </v-card-title>
                  <v-data-table style="width: 100%" :headers="headers" :items="users" :search="search">
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-center">{{ props.item.name }}</td>
                      <td class="text-xs-center">{{ props.item.specialty }}</td>
                      <td class="justify-center text-xs-center">
                        <v-icon small class="mr-2" @click="editItem(props.item.id)">edit</v-icon>
                      </td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">{{ $t("title.your_search") }}
                      "{{ search }}"
                      {{ $t("title.no_results") }}.</v-alert>
                  </v-data-table>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4>
                <!-- <v-select
                  :disabled="add_diagnosis"
                  :items="diagnosis"
                  label="Diagnosticos Existentes"
                  item-text="diagnostic.es"
                  item-value="_id"
                  return-object
                  v-model="diagnosisSelected"
                  @change="changeDiagnosis()"
                ></v-select> -->
                <v-autocomplete :disabled="add_diagnosis" v-model="diagnosisSelected" :items="diagnosis" label="Diagnosticos Existentes"
                  persistent-hint prepend-icon="" return-object @change="changeDiagnosis()" item-text="diagnostic.es">
                  <template v-slot:selection="data">
                    <span>{{ data.item.diagnostic.es }}</span>
                  </template>
                  <template v-slot:item="data">
                    <v-list-tile-content :style="data.item.disable ? 'color: red; font-weight:bold' : null" v-text="data.item.diagnostic.es"></v-list-tile-content>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs4 v-if="diagnosisSelected || add_diagnosis">
                <v-text-field style="margin-left: 5px" label="Diagnostico" v-model="diagnosis_txt"
                  :disabled="!diagnosisSelected && !add_diagnosis"></v-text-field>
              </v-flex>
              <v-flex xs4 v-if="!add_diagnosis">
                <v-btn style="margin-left: 5px" color="primary" @click="new_diagnosis" large>
                  Añadir Diagnóstico
                </v-btn>
              </v-flex>
              <v-flex xs4 v-else>
                <v-btn style="margin-left: 5px" color="primary" @click="saveDiagnosis" large>
                  Guardar Diagnóstico
                </v-btn>
                <v-btn v-if="diagnosisSelected" :color="diagnosisSelected.disable ? 'green' : 'red'" @click="disabledDiagnoses" large>{{diagnosisSelected.disable ? "Habilitar" : "Deshabilitar"}}</v-btn>

                <v-btn @click="clearDiagnoses" large>Cancelar</v-btn>
              </v-flex>

            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            $t("title.upload_digital_signature")
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                  @vdropzone-removed-file="removeFile"></vue-dropzone>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">{{
            $t("title.close")
          }}</v-btn>
          <v-btn color="blue darken-1" flat @click="saveDigital">{{
            $t("title.save")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="alert" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $t("title.saving") }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
const vue2Dropzone = () => import("vue2-dropzone");
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import * as personServ from "@/componentServs/person";
import { getDiagnoses, insertDiagnoses } from "@/componentServs/diagnoses";
import * as fileServ from "@/componentServs/file";
export default {
  name: "account",
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailHeight: 100,
        addRemoveLinks: true,
        dictDefaultMessage: this.$t("title.digital_signature"),
        dictRemoveFile: this.$t("title.delete_file"),
        dictUploadCanceled: this.$t("title.cancel_load"),
        acceptedFiles: "image/png",
        parallelUploads: 1,
        maxFiles: 1,
        acceptedFileTypes: ".png",
        init: function () {
          this.on("maxfilesexceeded", function (file) {
            alert(this.$t("content.only_one_file"));
            this.removeFile(file);
          });
        },
      },
      alert: false,
      dialog: false,
      search: "",
      spinerSignature: false,
      headers: [
        {
          text: this.$t("title.fullname"),
          align: "center",
          value: "name",
        },
        {
          text: this.$t("title.specialty"),
          align: "center",
          value: "specialty",
        },
        { text: this.$t("title.action"), align: "center", value: "accion" },
      ],
      users: [],
      userId: null,
      tab: 0,
      items: ["Firma Digital"],
      diagnosis: [],
      diagnosisSelected: null,
      diagnosis_txt: "",
      add_diagnosis: false,
      user_admin: false
    };
  },
  methods: {
    async disabledDiagnoses() {
      let objAux = this.diagnosisSelected
      objAux.disable = this.diagnosisSelected.disable ? !this.diagnosisSelected.disable : true
      await insertDiagnoses(objAux)
      this.clearDiagnoses()
      this.getListDiagnoses();
    },
    async saveDiagnosis() {
      let objAux = {};

      if (this.diagnosisSelected) {
        this.diagnosisSelected.diagnostic.es = this.diagnosis_txt;
        this.diagnosisSelected.diagnostic.en = this.diagnosis_txt;
        objAux = this.diagnosisSelected
      } else {
        objAux = {
          diagnostic: {
            es: this.diagnosis_txt,
            en: this.diagnosis_txt,
          },
        };
      }
      await insertDiagnoses(objAux)

      this.clearDiagnoses()
      this.getListDiagnoses();
    },
    clearDiagnoses() {
      this.add_diagnosis = false;
      this.diagnosis_txt = "";
      this.diagnosisSelected = null;
    },
    new_diagnosis() {
      this.add_diagnosis = true;
      this.diagnosis_txt = "";
    },
    changeDiagnosis() {
      this.add_diagnosis = true;
      if (this.diagnosisSelected) {
        this.diagnosis_txt = this.diagnosisSelected.diagnostic.es;
      } else {
        this.diagnosis_txt = "";
      }
    },
    editItem(id) {
      this.$refs.myVueDropzone.removeAllFiles();
      this.userId = id;
      this.dialog = true;
      let userAux = {
        body: {
          _id: id,
        },
        token: sessionStorage.getItem("pussy"),
      };
      personServ
        .getPerson(userAux)
        .then((result) => {
          if (result.digital_signature) {
            fileServ
              .getImage(
                result.digital_signature,
                sessionStorage.getItem("pussy")
              )
              .then((result) => {
                let vm = this;
                let file = new File([result.data], "Imagen", {
                  type: "image/png",
                });
                let filedrop = {
                  size: result.data.size,
                  name: this.$t("title.digital_signature"),
                  type: "image/png",
                };
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                  vm.$refs.myVueDropzone.manuallyAddFile(file, reader.result);
                };
              });
          }
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
    saveDigital() {
      if (this.$refs.myVueDropzone.getAcceptedFiles()[0]) {
        let fd = new FormData();
        let blob = new Blob([this.$refs.myVueDropzone.getAcceptedFiles()[0]], {
          type: this.$refs.myVueDropzone.getAcceptedFiles()[0].type,
        });
        fd.append("file", blob);
        fileServ
          .sendFile(
            fd,
            this.$refs.myVueDropzone.getAcceptedFiles()[0].name,
            sessionStorage.getItem("pussy")
          )
          .then((result2) => {
            this.alert = true;
            let objAux = {
              token: sessionStorage.getItem("pussy"),
              idPerson: this.userId,
              body: {
                digital_signature: result2.id,
              },
            };

            personServ
              .updatePerson(objAux)
              .then((result) => {
                setTimeout(() => (this.alert = false), 2000);
                setTimeout(() => (this.dialog = false), 2099);
              })
              .catch((error) => {
                this.closeSession(error);
                console.log(error);
              });
          });
      }
    },
    removeFile(file) {
      let auxPhotos = [];
      for (let i in this.photos) {
        if (this.photos[i] != this.photos[file.name.split(" ")[1]]) {
          auxPhotos.push(this.photos[i]);
        }
      }
      this.photos = auxPhotos;
    },
    getUserList() {
      let userAux = {
        body: {
          role: [
            "Physician",
            "optometrist",
            "ophthalmologist",
            "nurse",
            "pediatrist",
            "nutritionist",
            "internist",
          ],
        },
        token: sessionStorage.getItem("pussy"),
      };
      personServ
        .getPersonList(userAux)
        .then((result) => {
          result.forEach((elem) => {
            this.users.push({
              id: elem._id,
              name: elem.forename + " " + elem.surname,
              specialty: elem.role.charAt(0).toUpperCase() + elem.role.slice(1),
              accion: null,
            });
          });
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
    display(val) {
      this.$router.push({
        name: val,
      });
    },
    getListDiagnoses() {
      getDiagnoses({}).then((result) => {
        this.diagnosis = result;
      });
    }
  },
  created() {
    this.user_admin = this.$store.getters.getPhysician.user.idUserFudem == 'PRUEBAOFTA' ? true : false;
    if (this.user_admin) {
      this.items.push("ICD-10")
    }

    this.getUserList();
  },
  mounted() {
    this.getListDiagnoses();
  },
  computed: {
    contDrop: function () {
      this.$refs.myVueDropzone.getAcceptedFiles();
    },
  },
  props: {
    source: String,
  },
};
</script>
