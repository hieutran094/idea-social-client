<template>
  <sidenav :custom_class="this.$store.state.mcolor" :class="[this.$store.state.isTransparent, 'fixed-start']" v-if="this.$store.state.showSidenav" />
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar"
    />
    <router-view />
    <app-footer v-show="this.$store.state.showFooter" />
    <configurator
      :toggle="toggleConfigurator"
      :class="[this.$store.state.showConfig ? 'show' : '', this.$store.state.hideConfigButton ? 'd-none' : '']"
    />
  </main>
  <loading v-model:active="isLoading" :is-full-page="true" :opacity="0.9" color="#6366F1" loader="dots" :height="60">
    <img :src="loadingSvg" />
  </loading>
  <notifications group="admin" position="top right" closeOnClick="true" />
</template>
<script>
import Sidenav from './examples/Sidenav'
import Configurator from '@/examples/Configurator.vue'
import Navbar from '@/examples/Navbars/Navbar.vue'
import AppFooter from '@/examples/Footer.vue'
import { mapMutations } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import loadingSvg from './assets/img/loading.svg'
export default {
  name: 'App',
  components: {
    Sidenav,
    Configurator,
    Navbar,
    AppFooter,
    Loading,
  },
  data() {
    return { loadingSvg }
  },
  methods: {
    ...mapMutations(['toggleConfigurator', 'navbarMinimize']),
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    notification() {
      return this.$store.state.notification
    },
    navClasses() {
      return {
        'position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky': this.$store.state.isNavFixed,
        'position-absolute px-4 mx-0 w-100 z-index-2': this.$store.state.isAbsolute,
        'px-0 mx-4 mt-4': !this.$store.state.isAbsolute,
      }
    },
  },
  watch: {
    notification() {
      if (this.notification) {
        this.$notify({
          group: 'admin',
          type: this.notification.type || 'info',
          text: this.notification.text || '',
          duration: 5000,
        })
      }
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = 'bg-transparent'
  },
}
</script>
