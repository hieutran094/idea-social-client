<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1">
          <div class="card-header pb-0">
            <h6>Edit</h6>
          </div>
          <div class="card-body border-top">
            <validate-form class="text-start" @submit="() => {}" v-slot="{ meta }">
              <div class="d-none">{{ (isValid = meta.valid) }}</div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-end">Name <span class="text-danger">*</span></label>
                </div>
                <vsud-input class="col-sm-9" type="text" name="name" placeholder="Name" aria-label="Name" />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-end">Email <span class="text-danger">*</span></label>
                </div>
                <vsud-input class="col-sm-9" type="email" name="email" placeholder="Email" aria-label="Email" rules="required|email" />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-end">Password <span class="text-danger">*</span></label>
                </div>
                <vsud-input class="col-sm-9" type="password" name="password" placeholder="Password" aria-label="Password" rules="required|min:6" />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-2 mb-sm-3">
                  <label class="float-sm-end">Confirm Password <span class="text-danger">*</span></label>
                </div>
                <vsud-input
                  class="col-sm-9"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  rules="confirmed:@password"
                />
              </div>
              <div class="row gx-0 align-items-center justify-content-between">
                <div class="col-sm-9 offset-sm-3">
                  <vsud-checkbox id="flexCheckDefault" checked>
                    I agree the
                    <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
                  </vsud-checkbox>
                </div>
              </div>
            </validate-form>
          </div>
          <div class="card-footer border-top pt-2 pb-2 d-flex justify-content-end">
            <div class="text-center">
              <vsud-button color="dark" :disabled="!isValid">Save</vsud-button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <QuillEditor theme="snow" />
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
export default {
  name: 'edit',
  components: {
    QuillEditor,
  },
  data() {
    return { isValid: true }
  },
}
</script>
