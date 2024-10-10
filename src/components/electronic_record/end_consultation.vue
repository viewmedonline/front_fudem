<template>
  <v-layout row justify-center>
    <v-dialog v-model="showDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{ $t('title.attention') }}</v-card-title>
        <v-card-text>{{ $t('content.end_consultation_message') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="closeWindow()">{{ $t('title.continue') }}</v-btn>
          <v-btn color="green darken-1" :loading="loading" flat @click="endConsultation">{{ $t('title.finish')
            }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import moment from "moment";
import { EventBus } from "@/store/eventBus";
import * as consultationServ from "@/componentServs/consultation";
export default {
  name: "endConsultation",
  data: () => ({
    showDialog: false,
    loading: false
  }),
  methods: {
    closeWindow() {
      window.close()
    },
    changeDialog() {
      this.showDialog = !this.showDialog;
    },
    endConsultation() {
      this.loading = true;

      let objAux = {
        body: { _id: this.storeConsultation._id, control: this.storeConsultation.control },
        token: null
      };

      objAux.idConsultation = this.storeConsultation._id;
      objAux.body.control.active = false;
      objAux.body.control.updated_at = moment().toISOString();
      objAux.body.control.updated_by = this.$store.getters.getPhysician._id;

      consultationServ
        .updatedConsultation(objAux)
        .then(result => {
          this.$store.commit({
            type: "consultation",
            state: {}
          });
          EventBus.$emit('listHistory', true);
          setTimeout(() => {
            this.loading = false;
            this.changeDialog();
            window.close()
          }, 500);
        })
        .catch(err => {
          alert(this.$t("content.could_not_be_completed"));
        });
    }
  },
  created() { },
  components: {},
  computed: {
    storeConsultation() {
      return this.$store.getters.getConsultation;
    }
  }
};
</script>
<style></style>