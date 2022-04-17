<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1">
          <div class="card-header pb-0">
            <h6>Create new user</h6>
          </div>
          <div class="card-body border-top">
            <validate-form class="text-start" @submit="onSubmit" v-slot="{ meta }">
              <div class="d-none">{{ (isValid = meta.valid) }}</div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">User Name <span class="text-danger">*</span></label>
                </div>
                <vsud-input class="col-sm-9" type="text" name="user_name" placeholder="User name" aria-label="User name" rules="required" />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Email <span class="text-danger">*</span></label>
                </div>
                <vsud-input class="col-sm-9" type="text" name="email" placeholder="Email" aria-label="Email" rules="required|email" />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Password <span class="text-danger">*</span></label>
                </div>
                <vsud-input class="col-sm-9" type="password" name="password" placeholder="password" aria-label="Password" rules="required|min:6" />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Confirm Password <span class="text-danger">*</span></label>
                </div>
                <vsud-input
                  class="col-sm-9"
                  type="password"
                  name="password_confirm"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  rules="confirmed:@password"
                />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Department <span class="text-danger">*</span></label>
                </div>
                <vsud-select :values="departments" name="department_id" classes="form-select" rules="required" class="col-sm-9"></vsud-select>
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Role <span class="text-danger">*</span></label>
                </div>
                <vsud-select :values="roles" name="role" classes="form-select" rules="required" class="col-sm-9"></vsud-select>
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-start">Avatar</label>
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
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import UserService from '@/services/UserService.js'
import DepartmentService from '@/services/DepartmentService.js'
import { serialize } from 'object-to-formdata'
export default defineComponent({
  name: 'CreateTopic',
  components: {},
  data() {
    const roles = [
      { id: 3, name: 'Normal' },
      { id: 2, name: 'QA' },
      { id: 1, name: 'Admin' },
    ]
    return { isValid: true, roles, departments: [] }
  },
  async mounted() {
    const resDep = await DepartmentService.getAll(this.$axios)
    if (resDep.success) {
      this.departments = resDep.data
    }
  },
  methods: {
    onClick() {
      document.querySelectorAll('button[type=submit]')[0].click()
    },
    async onSubmit(data) {
      this.$store.dispatch('startLoading')
      try {
        const formData = serialize(data)
        const res = await UserService.createOne(this.$axios, formData)
        if (res.success) {
          this.$router.push('/user')
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
