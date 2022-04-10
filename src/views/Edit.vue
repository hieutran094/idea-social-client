<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-4">
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
                  <vsud-checkbox checked>
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
      <div class="col-md-8">
        <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1 card-editor">
          <div class="card-header pb-0">
            <h6>Edit</h6>
          </div>
          <div class="card-body border-top">
            <QuillEditor theme="snow" :toolbar="toolbarOptions" class="rounded-bottom" />
          </div>
          <div class="card-footer border-top pt-2 pb-2 d-flex justify-content-end"></div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click="openModal">Open</button>
    <vsud-modal :isOpen="isOpenModal" @close="isOpenModal = false">
      <template v-slot:header><h6 class="modal-title font-weight-bolder">New message</h6></template>
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
            <vsud-checkbox checked>
              I agree the
              <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
            </vsud-checkbox>
          </div>
        </div>
      </validate-form>
      <template v-slot:footer>
        <vsud-button color="light" data-bs-dismiss="modal">Close</vsud-button>
        <vsud-button color="dark">Save</vsud-button></template
      >
    </vsud-modal>
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
    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
    ]
    return { isValid: true, toolbarOptions, isOpenModal: false }
  },
  methods: {
    openModal() {
      this.isOpenModal = true
    },
  },
}
</script>
