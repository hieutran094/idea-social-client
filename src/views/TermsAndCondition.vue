<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-6 col-lg-6 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">Terms and Conditions for Idea Social</h3>
                  <p class="mb-0">
                    Coursework is submitted on the understanding that it is your own work and that it has not, in whole or in part, been presented
                    elsewhere for assessment. Where material has been used from other sources it must be properly acknowledged in accordance with the
                    University's Regulations regarding cheating and plagiarism. By checking this box, I confirm that this submission is my own work
                    and I accept all responsibility for any copyright infringement that may occur as a result of this submission.
                  </p>
                </div>
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
const body = document.getElementsByTagName('body')[0]

export default {
  name: 'TermsAndCondition',
  components: {
    AppFooter,
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

