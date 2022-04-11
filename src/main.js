import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import validate from './plugins/validate'
import axios from './plugins/axios'
import global from './plugins/global'
import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import Dashboard from './dashboard'
import Notifications from '@kyvg/vue3-notification'

const appInstance = createApp(App)
appInstance.use(store)
appInstance.use(router)
appInstance.use(validate)
appInstance.use(global)
appInstance.use(axios)
appInstance.use(Notifications)
appInstance.use(Dashboard)
appInstance.mount('#app')
