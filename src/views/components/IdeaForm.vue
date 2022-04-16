<template>
  <validate-form @submit="submit" v-slot="{ meta }">
    <div class="align-items-center">
      <div class="gx-0 align-items-center justify-content-between">
        <vsud-input class="col-sm-12" type="text" name="title" placeholder="Title" aria-label="title" rules="required" />
      </div>
      <button type="submit" class="d-none"></button>
      <text-editor :placeholder="'Write something here...'" name="description" rules="required" />
    </div>
    <hr />
    <ul class="d-flex flex-wrap align-items-center list-inline m-0 p-0">
      <li class="col-md-6 mb-3">
        <div class="bg-soft-primary rounded p-2 pointer me-3 row">
          <vsud-file class="col-8 mb-0" name="image_id" aria-label="Image" rules="required|image" />
          <span class="col-4 d-block d-flex align-items-center"
            ><img src="../../assets/images/small/07.png" alt="icon" class="img-fluid" /> Photo</span
          >
        </div>
      </li>
      <li class="col-md-6 mb-3">
        <div class="bg-soft-primary rounded p-2 pointer me-3 d-flex align-items-center">
          <vsud-checkbox name="is_incognito"
            ><img src="../../assets/images/small/08.png" alt="icon" class="img-fluid" /> Anonymous post
          </vsud-checkbox>
        </div>
      </li>
      <li class="col-md-6 mb-3">
        <div class="bg-soft-primary rounded p-2 pointer me-3 row">
          <vsud-file
            class="col-8 mb-0"
            name="document_id"
            aria-label="Image"
            rules="required|document"
            :accept="'.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf'"
          />
          <span class="col-4 d-block d-flex align-items-center"
            ><img src="../../assets/images/small/12.png" alt="icon" class="img-fluid" /> Document</span
          >
        </div>
      </li>
      <li class="col-md-6 mb-3">
        <div class="bg-soft-primary rounded p-2 pointer me-3 row">
          <vsud-select :values="topics" name="topic_id" :classes="'form-select'" rules="required" class="col-8 mb-0"></vsud-select>
          <span class="col-4 d-block d-flex align-items-center"
            ><img src="../../assets/images/small/13.png" alt="icon" class="img-fluid" /> Topic</span
          >
        </div>
      </li>
    </ul>
    <vsud-checkbox v-model:checked="isAgree" name="agree">
      I agree the
      <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
    </vsud-checkbox>
    <hr />
    <button type="submit" class="btn btn-primary d-block w-100 mt-3" :disabled="isDisableSubmit(meta.valid)">Post</button>
  </validate-form>
</template>

<script>
import TopicService from '@/services/TopicService.js'
import IdeaService from '@/services/IdeaService.js'
import { serialize } from 'object-to-formdata'
import moment from 'moment-timezone'
moment().tz('Asia/Ho_Chi_Minh').format()
export default {
  name: 'idea-form',
  data() {
    return { topics: [], isAgree: false }
  },
  async mounted() {
    this.$store.dispatch('startLoading')
    try {
      const res = await TopicService.getAll(this.$axios)
      if (res.success)
        this.topics = res.data.map((item) => {
          item.disabled = moment() > moment(item.lock_date)
          return item
        })
      else throw res
    } catch (err) {
      this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
    } finally {
      this.$store.dispatch('stopLoading')
    }
  },
  methods: {
    async submit(data) {
      this.$store.dispatch('startLoading')
      try {
        delete data.agree
        data.is_incognito = data.is_incognito ? 1 : 0
        const formData = serialize(data)
        const res = await IdeaService.createOne(this.$axios, formData)
        if (res.success) {
          this.$emit('close', true)
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    isDisableSubmit(validForm) {
      if (validForm && this.isAgree) return false
      return true
    },
    getFormData(object) {
      const formData = new FormData()
      Object.keys(object).forEach((key) => {
        if (typeof object[key] !== 'object') formData.append(key, object[key])
        else formData.append(key, JSON.stringify(object[key]))
      })
      return formData
    },
  },
}
</script>
