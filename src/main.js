import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import i18n from './lang/i18n'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'

import ViewmedStyle from '../src/assets/sass/viewmed.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import Vuex from 'vuex'
import Vueditor from 'vueditor'
import 'vueditor/dist/style/vueditor.min.css'
import JsonExcel from 'vue-json-excel'



let config = {
    toolbar: [
        'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
        'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
        'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
        'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
    ],
    fontName: [
        { val: 'arial' },
        { val: 'arial black' },
        { val: 'times new roman' },
        { val: 'Courier New' }
    ],
    fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
    classList: ['wizConstancia']
};

Vue.use(Vuex);
Vue.use(Vueditor, config);

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuetify, {
    iconfont: 'mdi', // 'md' || 'mdi' || 'fa' || 'fa4'
    theme: {
        primary: '#004969',
        institution: '#8e24aa',
        physician: '#0277bd',
        patient: '#00a887'
    }
})
Vue.use(VueTheMask)
Vue.use(Vuelidate)
Vue.component('downloadExcel', JsonExcel)
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')