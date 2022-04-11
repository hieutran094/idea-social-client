import { createStore } from 'vuex'
import { axios } from '../plugins/axios'

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: '',
    mcolor: '',
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    token: null,
    authenticated: false,
    user: null,
    isLoading: false,
    notification: null,
    limit: 5,
    page: 1,
  },
  mutations: {
    setLimit: (state, limit) => (state.limit = limit),
    setPage: (state, page) => (state.page = page),
    setLoading: (state, isLoading) => (state.isLoading = isLoading),
    setNotification: (state, notification) => (state.notification = notification),
    setUser: (state, user) => (state.user = user),
    setAuth: (state, status) => (state.authenticated = status),
    setToken: (state, accessToken) => (state.token = accessToken),
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector('.g-sidenav-show')
      const sidenav = document.getElementById('sidenav-main')

      if (sidenav_show.classList.contains('g-sidenav-pinned')) {
        sidenav_show.classList.remove('g-sidenav-pinned')
        setTimeout(function () {
          sidenav.classList.remove('bg-white')
        }, 100)
        sidenav.classList.remove('bg-transparent')
        state.isPinned = true
      } else {
        sidenav_show.classList.add('g-sidenav-pinned')
        sidenav.classList.add('bg-white')
        sidenav.classList.remove('bg-transparent')
        state.isPinned = false
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true
      } else {
        state.isNavFixed = false
      }
    },
  },
  actions: {
    startLoading({ commit }) {
      commit('setLoading', true)
    },
    stopLoading({ commit }) {
      commit('setLoading', false)
    },
    login({ commit }, data) {
      axios.defaults.headers['Authorization'] = `Bearer ${data.token}`
      commit('setToken', data.token)
      localStorage.setItem('accessToken', data.token)
      delete data.token
      commit('setUser', data)
      commit('setAuth', true)
    },
    logout({ commit }) {
      commit('setAuth', false)
      commit('setUser', null)
      commit('setToken', null)
      localStorage.setItem('accessToken', '')
    },
    fetchAccessToken({ commit }) {
      commit('setToken', localStorage.getItem('accessToken'))
    },
    toggleSidebarColor({ commit }, payload) {
      commit('sidebarType', payload)
    },
    handleNotifications({ commit }, data) {
      let notification = ''
      if (typeof data.message === 'string') {
        notification = data.message
      } else if (typeof data.message === 'object') {
        notification = data.message.message
      }
      commit('setNotification', { text: notification, type: data.success ? 'success' : 'error' })
    },
    setLimit({ commit }, data) {
      commit('setLimit', data)
    },
    setPage({ commit }, data) {
      commit('setPage', data)
    },
  },
  getters: {},
})
