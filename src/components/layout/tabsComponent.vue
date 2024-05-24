<template>
  <v-container>
    <v-tabs
      v-if="storePhysician.role"
      v-model="active"
      color="primary"
      dark
      slider-color="#E37827"
    >
      <!-- Preliminares -->
      <v-tab
        ripple
        @click="changeTabs('preliminary')"
        v-if="validateTabs('preliminary')"
      >
        {{ $t("title.preliminary") }}
      </v-tab>

      <v-tab-item v-if="validateTabs('preliminary')">
        <v-card class="blue-grey lighten-5">
          <v-card-text>
            <vmPreliminar class="px-0 py-0"></vmPreliminar>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- Optometria -->
      <v-tab
        ripple
        @click="changeTabs('optometrist')"
        v-if="validateTabs('optometrist')"
      >
        Optometria
      </v-tab>
      <v-tab-item v-if="validateTabs('optometrist')">
        <v-card class="blue-grey lighten-5">
          <v-card-text>
            <vmOptometrist class="px-0 py-0"></vmOptometrist>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- Oftalmologia -->
      <v-tab
        ripple
        @click="changeTabs('ophthalmology')"
        v-if="validateTabs('ophthalmology')"
      >
        Oftalmologia
      </v-tab>
      <v-tab-item v-if="validateTabs('ophthalmology')">
        <v-card class="blue-grey lighten-5">
          <v-card-text>
            <vmOphthalmology class="px-0 py-0"></vmOphthalmology>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab
        ripple
        @click="changeTabs('internist')"
        v-if="validateTabs('internist')"
      >
        Hoja de Evaluación MI
      </v-tab>
      <v-tab-item v-if="validateTabs('internist')">
        <v-card class="blue-grey lighten-5">
          <v-card-text>
            <vmInternist class="px-0 py-0"></vmInternist>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- Historia -->
      <v-tab
        ripple
        @click="changeTabs('history')"
        v-if="validateTabs('history')"
      >
        Historial
      </v-tab>
      <v-tab-item v-if="validateTabs('history')">
        <v-card class="blue-grey lighten-5">
          <v-card-text>
            <vmHistory ref="history" class="px-0 py-0"></vmHistory>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab
        ripple
        @click="changeTabs('imaging')"
        v-if="validateTabs('imaging')"
      >
        Imagenología
      </v-tab>
      <v-tab-item v-if="validateTabs('imaging')">
        <v-card class="blue-grey lighten-5">
          <v-card-text>
            <vmImaging class="px-0 py-0"></vmImaging>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
const vmPreliminar = () =>
  import("@/components/preliminary_form/preliminary_form");
const vmOptometrist = () =>
  import("@/components/optometrist_form/optometrist_form");
const vmOphthalmology = () =>
  import("@/components/ophthalmology_form/ophthalmology_form");
const vmHistory = () => import("@/components/history_form/history_form");
const vmConstans = () => import("@/components/history_form/history_cons");
const vmImaging = () => import("@/components/imaging_form/imaging_form");
const vmInternist = () =>
  import("@/components/internist_evaluation_sheet/internist_evaluation_sheet");
export default {
  name: "tabsComponent",
  data: () => ({
    active: null,
  }),
  methods: {
    changeTabs(tabs) {
      if (tabs == "history") {
        this.$refs.history.listConsulting();
      }
      this.$store.commit({
        type: "tabsActive",
        state: tabs,
      });
    },
    validateTabs(tab) {
      if (this.storePhysician.role) {
        switch (this.storePhysician.role.toLowerCase()) {
          case "admision":
            switch (tab) {
              case "preliminary":
                if (this.getRoute.c == "H") {
                  return false;
                } else {
                  if (this.active == null) this.changeTabs(tab);
                  return true;
                }
                break;
              case "history":
                return true;
                break;
              case "constans":
                return true;
                break;
              case "imaging":
                return true;
                break;
              default:
                return false;
                break;
            }
            break;
          case "internist":
            switch (tab) {
              case "history":
                return true;
                break;
              case "imaging":
                return true;
                break;
              case "internist":
                return true;
                break;
            }
            this.$store.commit({
              type: "setShowImaging",
              state: false,
            });
            break;
          case "intern":
            switch (tab) {
              case "history":
                return true;
                break;
              case "constans":
                return true;
                break;
              case "imaging":
                return true;
                break;
              default:
                return false;
                break;
            }
            break;
          case "optometrist":
          this.$store.commit({
              type: "setShowImaging",
              state: false,
            });
            switch (tab) {
              case "preliminary":
                if (this.getRoute.c == "E") {
                  if (this.active == null) this.changeTabs(tab);
                  // Colocar de primero Preliminar
                  this.active = 0;
                  return true;
                } else if (this.getRoute.c == "H") {
                  return false;
                } else return true;
                break;
              case "optometrist":
                if (this.getRoute.c == "H") {
                  return false;
                } else if (this.getRoute.c == "N") {
                  if (this.active == null) this.changeTabs(tab);
                  this.active = 1;
                  return true;
                } else return true;
                break;
              case "ophthalmology":
                if (this.getRoute.c == "N") {
                  return true;
                } else if (this.getRoute.c == "H") {
                  return false;
                } else return true;
                break;
              case "history":
                return true;
                break;
              case "constans":
                return true;
                break;
              case "imaging":
                return true;
                break;
            }
            break;
          case "ophthalmologist":
          this.$store.commit({
              type: "setShowImaging",
              state: false,
            });
            switch (tab) {
              case "preliminary":
                if (this.getRoute.c == "E") {
                  if (this.active == null) this.changeTabs(tab);
                  // Colocar de primero Preliminar
                  this.active = 0;
                  return true;
                } else if (this.getRoute.c == "H") {
                  return false;
                } else return true;
                break;
              case "optometrist":
                if (this.getRoute.c == "N") {
                  return true;
                } else if (this.getRoute.c == "H") {
                  return false;
                } else {
                  return true;
                }
                break;
              case "ophthalmology":
                if (this.getRoute.c == "H") {
                  return false;
                } else if (this.getRoute.c == "N") {
                  if (this.active == null) this.changeTabs(tab);
                  this.active = 2;
                  return true;
                } else return true;
                break;
              case "history":
                return true;
                break;
              case "constans":
                return true;
                break;
              case "imaging":
                return true;
                break;
            }
            break;
          case "institution":
            if (
              this.getRoute.c == "H" &&
              tab != "history" &&
              tab != "constans"
            ) {
              return false;
            } else {
              if (this.active == null) this.changeTabs("preliminary");
              return true;
            }
            break;
          default:
            switch (tab) {
              case "history":
                return true;
                break;
            }
            this.$store.commit({
              type: "setShowImaging",
              state: true,
            });
        }
      }
    },
  },
  created() {
    // if (this.getRoute.c.toUpperCase() == 'H') this.changeTabs('history')
  },
  mounted() {
    this.validateTabs("imaging");
  },
  components: {
    vmPreliminar,
    vmOptometrist,
    vmOphthalmology,
    vmHistory,
    vmImaging,
    vmConstans,
    vmInternist,
  },
  computed: {
    storePhysician() {
      return this.$store.getters.getPhysician;
    },
    getRoute() {
      return this.$route.query;
    },
  },
};
</script>
<style></style>
