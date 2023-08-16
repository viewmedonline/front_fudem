import Vue from 'vue'
import Vuex from 'vuex'
import { EventBus } from "@/store/eventBus";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    consultation: {},
    physician: {},
    patient: {},
    comps: {
      patient: true,
      consultation: true,
      account: false,
      constancy: false,
      reports: false,
      nurse: false,
      references: false,
      constancy_disability: false,
      surgery_sheet: false,
    },
    typeConsulting: null,
    sucursal: null,
    tabsActive: null,
  },
  mutations: {
    consultation(state, payload) {
      state.consultation = payload.state;
    },
    patient(state, payload) {
      state.patient = payload.state;
    },
    physician(state, payload) {
      state.physician = payload.state;
    },
    showCompst(state, payload) {
      state.comps = payload.state;
    },
    showTypeConsulting(state, payload) {
      state.typeConsulting = payload.state;
    },
    showSucursal(state, payload) {
      state.sucursal = payload.state;
    },
    tabsActive(state, payload) {
      state.tabsActive = payload.state;
      EventBus.$emit("changeTabReload", true);
    },
  },
  actions: {},
  getters: {
    getConsultation: (state) => state.consultation,
    getPhysician: (state) => state.physician,
    getPatient: (state) => state.patient,
    getComps: (state) => state.comps,
    getTypeConsulting: (state) => state.typeConsulting,
    getTabsValidate: (state) => state.tabsActive,
    getSucursal: (state) => state.sucursal,
  },
});