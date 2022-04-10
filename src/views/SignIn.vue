<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">Welcome back</h3>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <validate-form class="text-start" @submit="onSubmit" v-slot="{ meta }">
                    <label>Email</label>
                    <vsud-input type="email" placeholder="Email" name="email" rules="required|email" />
                    <label>Password</label>
                    <vsud-input type="password" placeholder="Password" name="password" rules="required|min:6" />
                    <vsud-switch id="rememberMe" checked> Remember me </vsud-switch>
                    <div class="text-center">
                      <vsud-button class="my-4 mb-2" variant="gradient" color="info" fullWidth :disabled="!meta.valid">Sign in </vsud-button>
                    </div>
                  </validate-form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link to="/sign-up" class="text-info text-gradient font-weight-bold">Sign up</router-link>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8">
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage: 'url(' + require('@/assets/img/login_logo.svg') + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>
import AppFooter from '@/examples/PageLayout/Footer.vue'
import AuthService from '../services/AuthService'
const body = document.getElementsByTagName('body')[0]

export default {
  name: 'signin',
  components: {
    AppFooter,
  },
  methods: {
    async onSubmit(formData) {
      try {
        const { success, data } = await AuthService.login(this.$axios, formData)
        if (success) {
          this.$store.dispatch('login', data)
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true
    this.$store.state.showNavbar = false
    this.$store.state.showSidenav = false
    this.$store.state.showFooter = false
    body.classList.remove('bg-gray-100')
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false
    this.$store.state.showNavbar = true
    this.$store.state.showSidenav = true
    this.$store.state.showFooter = true
    body.classList.add('bg-gray-100')
  },
}
</script>
