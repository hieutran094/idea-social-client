<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1">
          <div class="card-header pb-0">
            <div class="btn-toolbar d-flex align-items-start justify-content-between" role="toolbar">
              <div class="input-group">
                <vsud-input
                  type="text"
                  v-model:value="keyword"
                  name="search"
                  iconDir="left"
                  icon="fas fa-search"
                  :placeholder="'Enter to search...'"
                  @keyup.enter="search(keyword)"
                />
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2 border-top">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Like</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Unlike</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Comment</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in topics" :key="item.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mx-2 mb-0 text-sm">{{ item.title }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mx-2 mb-0 text-sm text-truncate" style="max-width: 150px">{{ removeTags(item.description) }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mx-2 mb-0 text-sm">
                            <span class="badge bg-success">{{ item.upVoteCount }}</span>
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mx-2 mb-0 text-sm">
                            <span class="badge bg-primary">{{ item.downVoteCount }}</span>
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mx-2 mb-0 text-sm">
                            <span class="badge bg-info text-dark">{{ item.commentCount }}</span>
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <vsud-button color="secondary" variant="outline" class="mb-auto py-2 mx-2" @click="onDelete(item)"
                        ><i class="fa fa-trash"></i> Delete</vsud-button
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <vsud-pagination>
                <vsud-pagination-item prev :disabled="currentPage === 1" @click="changePage(currentPage - 1)"></vsud-pagination-item>
                <vsud-pagination-item
                  v-for="(n, index) in paginationItems"
                  :key="index"
                  :label="n"
                  :active="currentPage === n"
                  @click="changePage(n)"
                ></vsud-pagination-item>
                <vsud-pagination-item next :disabled="currentPage === lastPage" @click="changePage(currentPage + 1)"></vsud-pagination-item>
              </vsud-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vsud-modal :isOpen="isOpenModal" @close="isOpenModal = false">
      <template v-slot:header><h6 class="modal-title font-weight-bolder">Confirm delete</h6></template>
      <p class="font-weight-bolder">Are you sure to delete {{ currentData.name }}?</p>
      <template v-slot:footer>
        <vsud-button color="light" data-bs-dismiss="modal">Close</vsud-button>
        <vsud-button color="dark" @click="submitDelete()">Confirm</vsud-button></template
      >
    </vsud-modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import moment from 'moment-timezone'
import IdeaService from '@/services/IdeaService.js'
moment().tz('Asia/Ho_Chi_Minh').format()
export default defineComponent({
  name: 'ListTopic',
  components: {},
  data() {
    return { topics: [], lastPage: 1, isOpenModal: false, currentData: { id: '', name: '' }, keyword: null }
  },
  async mounted() {
    await this.search({ topicId: this.topicId })
  },
  computed: {
    currentPage() {
      return this.$store.state.page
    },
    paginationItems() {
      return this.paginate(this.currentPage, this.lastPage, 1)
    },
    topicId() {
      return this.$route.params.id
    },
  },
  methods: {
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm:ss')
    },
    paginate(currentPage, lastPage, onSides = 3) {
      let pages = []
      for (let i = 1; i <= lastPage; i++) {
        let offset = i === 1 || lastPage ? onSides + 1 : onSides
        if (i === 1 || (currentPage - offset <= i && currentPage + offset >= i) || i == currentPage || i == lastPage) {
          pages.push(i)
        } else if (i == currentPage - (offset + 1) || i == currentPage + (offset + 1)) {
          pages.push('...')
        }
      }
      return pages
    },
    async changePage(number) {
      if (number <= 0 || number > this.lastPage) return
      this.$store.dispatch('setPage', number)
      await this.search({ topicId: this.topicId })
    },
    async search(param) {
      this.$store.dispatch('startLoading')
      try {
        const res = await IdeaService.search(this.$axios, this.$store, param)
        if (res.success) {
          const { data, lastPage } = res.data
          this.topics = data
          this.lastPage = lastPage
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    onDelete(data) {
      this.currentData = data
      this.isOpenModal = true
    },
    async submitDelete() {
      this.$store.dispatch('startLoading')
      try {
        const res = await IdeaService.deleteOne(this.$axios, this.currentData.id)
        if (res.success) {
          await this.search()
        }
        this.isOpenModal = false
        this.$store.dispatch('handleNotifications', res)
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.data })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    removeTags(string) {
      return !string
        ? ''
        : string
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .trim()
    },
  },
})
</script>
