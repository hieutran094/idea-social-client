<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-300 border-radius-xl"
      :style="{
        backgroundImage: 'url(' + data?.image?.source_url + ')',
        backgroundPositionY: '50%',
      }"
    >
      <span class="mask bg-dark bg-gradient opacity-6"></span>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-3 row">
      <div class="col-md-8 mt-md-0">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <div class="row">
              <div class="col-md-8 d-flex align-items-center">
                <h5 class="mb-0">{{ data?.name }}</h5>
              </div>
            </div>
          </div>
          <div class="p-3 card-body">
            <span class="mt-2 d-block" v-html="data?.description"></span>
            <hr />
            <ul class="list-group">
              <li class="pt-0 text-sm border-0 list-group-item ps-0">
                <strong class="text-dark">Lock date:</strong> &nbsp; {{ convertTime(data?.lock_date) }}
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <strong class="text-dark">Close date:</strong> &nbsp; {{ convertTime(data?.close_date) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="mt-4 col-md-4 mt-xl-0">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0">L</h6>
          </div>
          <div class="p-3 card-body">
            <ul class="list-group">
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center" v-for="comment in topComments" :key="comment.id">
                <vsud-avatar class="me-3" :img="sophie" alt="kal" borderRadius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ comment.creator.user_name }}</h6>
                  <p class="mb-0 text-xs">{{ comment.comment }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>
    <div class="mt-4 row">
      <div class="col-12">
        <div class="mb-4 card">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-1">Ideas</h6>
          </div>
          <div class="p-3 card-body">
            <div class="row">
              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0" v-for="item in data?.ideas" :key="item.id">
                <idea-card :item="item" />
              </div>
              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                <div class="border card h-100 card-plain">
                  <div class="text-center card-body d-flex flex-column justify-content-center">
                    <a href="javascript:;" @click="isOpenModal = true">
                      <i class="mb-3 fa fa-plus text-secondary"></i>
                      <h5 class="text-secondary">New project</h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <vsud-modal :isOpen="isOpenModal" @close="isOpenModal = false" classes="modal-dialog modal-lg">
    <template v-slot:header><h5 class="modal-title" id="post-modalLabel">Post new idea</h5></template>
    <idea-form @close="onCloseIdeaForm"></idea-form>
  </vsud-modal>
</template>

<script>
import IdeaCard from './components/IdeaCard.vue'
import IdeaForm from './components/IdeaForm.vue'
import setTooltip from '@/assets/js/tooltip.js'
import TopicService from '@/services/TopicService.js'
import moment from 'moment-timezone'
moment().tz('Asia/Ho_Chi_Minh').format()
// import { orderBy, flatten } from 'lodash'
export default {
  name: 'profile-overview',
  data() {
    return {
      showMenu: false,
      data: null,
      isOpenModal: false,
      topComments: [],
    }
  },
  components: {
    IdeaCard,
    IdeaForm,
  },
  computed: {
    dataId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    await this.search()
    this.$store.state.isAbsolute = true
    this.$store.state.isNavFixed = false
    setTooltip()
  },
  methods: {
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm:ss')
    },
    async search() {
      this.$store.dispatch('startLoading')
      try {
        const res = await TopicService.getOne(this.$axios, this.dataId)
        if (res.success) {
          if (res.data.ideas.length > 3) {
            res.data.ideas.slice(0, 3)
          }
          this.data = res.data
          //   const comments = this.data.ideas.map((e) => {
          //     return e.comments
          //   })
          //   this.topComments = orderBy(flatten(comments), ['created_at'], ['desc']).slice(0, 4)
        }
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    async onCloseIdeaForm() {
      await this.search()
      this.isOpenModal = false
    },
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false
  },
}
</script>
