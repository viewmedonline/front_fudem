<template lang="">
  <v-container>
    <v-card>
      <v-card-title primary-title class="blue-grey darken-1">
        <!-- <v-btn flat icon @click="show_notes = false"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        > -->
        <span class="subheading white--text text-capitalize"
          >Hoja de Permanencia</span
        >
      </v-card-title>
      <v-card-text>
        <v-form
          style="margin-top: 25px"
          ref="form"
          autocomplete="off"
          v-model="form_permanence"
          lazy-validation
        >
          <v-container fluid grid-list-md px-0 py-0>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field v-model="companion" label="Acompañante" :rules="[rules.required]"/>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="surgery" label="Cirugía" :rules="[rules.required]"/>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="text-field-width"
                      v-model="date"
                      :rules="[rules.required]"
                      label="Fecha de Cirugía"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="es-es"
                    v-model="date_picker"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  ref="menu_time"
                  v-model="menu_time"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Desde"
                      prepend-icon="access_time"
                      :rules="[rules.required]"
                      value="12hr"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu_time"
                    v-model="time"
                    full-width
                    value="12hr"
                    @click:minute="$refs.menu_time.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex>
                <v-btn
                  :loading="loading"
                  large
                  color="primary"
                  @click="savePermanenceSheet()"
                >
                  Guardar
                </v-btn></v-flex
              >
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import moment from "moment";

export default {
  name: "permanence_sheet",
  data: () => ({
    companion: "",
    surgery: "",
    menu: false,
    date: "",
    date_picker: null,
    menu_time: false,
    time: "",
    form_permanence: false,
    rules: {
      required: (value) => !!value || "Este campo es requerido",
    },
  }),
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    savePermanenceSheet() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.clear();
      }
      this.loading = false;
    },
  },
  watch: {
    menu_time(val) {
      if (!val) {
        this.time = moment(this.time, "HH:mm").format("hh:mm A");
      } else {
        if (this.time) this.time = moment(this.time, "hh:mm A").format("HH:mm");
      }
    },
    date_picker(val) {
      this.date = moment(val).format("DD/MM/YYYY");
    },
  },
};
</script>
