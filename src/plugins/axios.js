import _axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  _axios.defaults.baseURL = process.env.VUE_APP_API_URL
}
const axios = _axios.create()
export { axios }
export default {
  install(app) {
    app.config.globalProperties.$axios = axios
  },
}
