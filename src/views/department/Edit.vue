<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1">
          <div class="card-header pb-0">
            <h6>{{ currentData.name }}</h6>
          </div>
          <div class="card-body border-top">
            <validate-form class="text-start" @submit="onSubmit" v-slot="{ meta }">
              <div class="d-none">{{ (isValid = meta.valid) }}</div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-end">Name <span class="text-danger">*</span></label>
                </div>
                <vsud-input
                  class="col-sm-9"
                  type="text"
                  name="name"
                  :value="currentData.name"
                  placeholder="Name"
                  aria-label="Name"
                  rules="required"
                />
              </div>
              <button type="submit" class="d-none"></button>
            </validate-form>
          </div>
          <div class="card-footer border-top pt-2 pb-2 d-flex justify-content-end">
            <div class="text-center">
              <vsud-button color="dark" :disabled="!isValid" @click="onClick">Save</vsud-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DepartmentService from '@/services/DepartmentService.js'
export default defineComponent({
  name: 'CreateDepartment',
  components: {},
  data() {
    return {
      isValid: true,
      currentData: {
        name: '',
      },
    }
  },
  computed: {
    departmentId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    this.$store.dispatch('startLoading')
    try {
      const res = await DepartmentService.getOne(this.$axios, this.departmentId)
      if (res.success) {
        this.currentData = res.data
      }
    } catch (err) {
      this.$store.dispatch('handleNotifications', { message: err.response.message })
    } finally {
      this.$store.dispatch('stopLoading')
    }
  },
  methods: {
    onClick() {
      document.querySelectorAll('button[type=submit]')[0].click()
    },
    async onSubmit(formData) {
      this.$store.dispatch('startLoading')
      try {
        const res = await DepartmentService.updateOne(this.$axios, this.departmentId, formData)
        if (res.success) this.$router.push('/department')
        this.$store.dispatch('handleNotifications', res)
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.data })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
})
</script>
