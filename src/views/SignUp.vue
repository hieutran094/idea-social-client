<template>
  <div
    class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
    :style="{
      backgroundImage: 'url(' + require('@/assets/img/team.svg') + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
    }"
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">Welcome!</h1>
          <p class="text-white text-lead">Use these awesome forms to login or create new account in your project for free.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class="pt-4 text-center card-header">
            <h5>Register with</h5>
          </div>
          <div class="card-body">
            <validate-form class="text-start" @submit="() => {}" v-slot="{ meta }">
              <div class="mb-3">
                <vsud-input type="text" name="name" placeholder="Name" aria-label="Name" />
              </div>
              <div class="mb-3">
                <vsud-input type="email" name="email" placeholder="Email" aria-label="Email" rules="required|email" />
              </div>
              <div class="mb-3">
                <vsud-input type="password" name="password" placeholder="Password" aria-label="Password" rules="required|min:6" />
              </div>
              <div class="mb-3">
                <vsud-input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  rules="confirmed:@password"
                />
              </div>
              <vsud-checkbox id="flexCheckDefault" checked>
                I agree the
                <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
              </vsud-checkbox>

              <div class="text-center">
                <vsud-button color="dark" fullWidth variant="gradient" class="my-4 mb-2" :disabled="!meta.valid">Sign up</vsud-button>
              </div>
              <p class="text-sm mt-3 mb-0">
                Already have an account?
                <router-link to="/sign-in" class="text-dark font-weight-bolder">Sign in</router-link>
              </p>
            </validate-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script>
import AppFooter from '@/examples/PageLayout/Footer.vue'
import VsudInput from '@/components/VsudInput.vue'
import VsudCheckbox from '@/components/VsudCheckbox.vue'
import VsudButton from '@/components/VsudButton.vue'

export default {
  name: 'sign-up',
  components: {
    AppFooter,
    VsudInput,
    VsudCheckbox,
    VsudButton,
  },
  created() {
    this.$store.state.hideConfigButton = true
    this.$store.state.showNavbar = false
    this.$store.state.showSidenav = false
    this.$store.state.showFooter = false
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false
    this.$store.state.showNavbar = true
    this.$store.state.showSidenav = true
    this.$store.state.showFooter = true
  },
}
</script>
