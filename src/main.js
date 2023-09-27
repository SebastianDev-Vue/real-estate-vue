import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

// Vuetify
const vuetify = createVuetify({
  components,
  directives
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

app.mount('#app')
