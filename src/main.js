import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import validate from './plugins/validate'
import global from './plugins/global'
import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import Dashboard from './dashboard'

const appInstance = createApp(App)
appInstance.use(store)
appInstance.use(router)
appInstance.use(validate)
appInstance.use(global)
appInstance.use(Dashboard)
appInstance.mount('#app')
