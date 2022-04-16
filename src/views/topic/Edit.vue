<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-5">
        <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1">
          <div class="card-header pb-0">
            <h6>{{ currentData.name }} topic</h6>
          </div>
          <div class="card-body border-top">
            <validate-form class="text-start" @submit="onSubmit" v-slot="{ meta }" validateOnMount>
              <div class="d-none">{{ (isValid = meta.valid) }}</div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Name <span class="text-danger">*</span></label>
                </div>
                <vsud-input
                  class="col-sm-9"
                  type="text"
                  name="name"
                  placeholder="Name"
                  aria-label="Name"
                  rules="required"
                  v-model:value="currentData.name"
                />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Lock Date <span class="text-danger">*</span></label>
                </div>
                <vsud-date-picker class="col-sm-9" name="lock_date" rules="required" utc v-model:value="currentData.lock_date" />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Close Date <span class="text-danger">*</span></label>
                </div>
                <vsud-date-picker class="col-sm-9" name="close_date" rules="required" utc v-model:value="currentData.close_date" />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Photo</label>
                </div>
                <vsud-file class="col-sm-9" name="image_id" aria-label="Image" rules="image" />
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
      <div class="col-md-7">
        <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1 card-editor">
          <div class="card-header pb-0">
            <h6>Description</h6>
          </div>
          <div class="card-body border-top">
            <text-editor v-model:content="currentData.description" />
          </div>
          <div class="card-footer border-top pt-2 pb-2 d-flex justify-content-end"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TopicService from '@/services/TopicService.js'
import { serialize } from 'object-to-formdata'
export default defineComponent({
  name: 'CreateTopic',
  components: {},
  data() {
    return { isValid: true, currentData: { name: '', lock_date: null, close_date: null, description: null, image_id: null } }
  },
  computed: {
    dataId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    this.$store.dispatch('startLoading')
    try {
      const res = await TopicService.getOne(this.$axios, this.dataId)
      if (res.success) {
        const { name, lock_date, close_date, description, image_id } = res.data
        this.currentData = { name, lock_date, close_date, description, image_id }
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
    async onSubmit(data) {
      this.$store.dispatch('startLoading')
      try {
        console.log(data)
        const { image_id } = data
        const formData = serialize({ ...this.currentData, image_id })
        const res = await TopicService.updateOne(this.$axios, this.dataId, formData)
        if (res.success) {
          this.$router.push('/topic')
        }
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
