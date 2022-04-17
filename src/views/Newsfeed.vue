<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="card card-block card-stretch card-height mb-3">
          <div class="card-header d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">Post your idea</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="user-img">
                <img
                  :src="
                    avatarUrl ? avatarUrl : 'https://ideas-manager.s3.ap-southeast-1.amazonaws.com/files/b4e5f150-3863-49b1-a299-05a900066470.png'
                  "
                  alt="userimg"
                  class="avatar-60 rounded-circle  avatar avatar-xxl"
                />
              </div>
              <form class="post-text ms-3 w-100" action="javascript:void();">
                <input type="text" class="form-control rounded" placeholder="Write something here..." style="border: none" @focus="openModal" />
              </form>
            </div>
            <hr />
            <ul class="post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
              <li class="me-3 mb-md-0 mb-2">
                <a href="#" class="btn btn-soft-primary">
                  <img src="../assets/images/small/07.png" alt="icon" class="img-fluid me-2" /> Photo/Video
                </a>
              </li>
              <li class="me-3 mb-md-0 mb-2">
                <a href="#" class="btn btn-soft-primary">
                  <img src="../assets/images/small/08.png" alt="icon" class="img-fluid me-2" /> Tag Friend
                </a>
              </li>
              <li class="me-3">
                <a href="#" class="btn btn-soft-primary">
                  <img src="../assets/images/small/09.png" alt="icon" class="img-fluid me-2" /> Feeling/Activity
                </a>
              </li>
              <li>
                <button class="btn btn-soft-primary">
                  <div class="card-header-toolbar d-flex align-items-center">
                    <div class="dropdown">
                      <div class="dropdown-toggle" id="post-option" data-bs-toggle="dropdown">
                        <i class="ri-more-fill"></i>
                      </div>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="post-option" style="">
                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Check in</a>
                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Live Video</a>
                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Gif</a>
                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Watch Party</a>
                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Play with Friend</a>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="card card-block card-stretch card-height mb-3" v-for="idea in ideas" :key="idea.id">
          <div class="card-body">
            <div class="user-post-data">
              <div class="d-flex justify-content-between">
                <div class="me-3">
                  <img
                    :src="
                      idea.author?.image?.source_url && !idea.is_incognito
                        ? idea.author?.image?.source_url
                        : 'https://ideas-manager.s3.ap-southeast-1.amazonaws.com/files/b4e5f150-3863-49b1-a299-05a900066470.png'
                    "
                    alt="userimg"
                    class="avatar-25 rounded-circle avatar avatar-md"
                  />
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="">
                      <h5 class="mb-0 d-inline-block">{{ idea.is_incognito ? 'Anonymous' : idea.author?.user_name }}</h5>
                      <i class="ms-3 fa fa-chevron-right" aria-hidden="true"></i>
                      <span class="mb-0 ms-3 d-inline-block">{{ idea.topic?.name }}</span>
                      <p class="mb-0 text-primary">{{ convertTime(idea.created_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <h5 class="mb-0 d-inline-block">{{ idea.title }}</h5>
              <span class="mt-2 d-block" v-html="idea.description"></span>
            </div>
            <div class="user-post" v-if="idea.image">
              <div class="d-grid grid-rows-2 grid-flow-col gap-3">
                <div class="row-span-2 row-span-md-1">
                  <img :src="idea.image?.source_url" alt="post-image" class="img-fluid rounded w-100" />
                </div>
                <span class="text-start d-block" v-if="idea.document"
                  ><a :href="idea.document?.source_url" role="button"
                    ><i class="fa fa-paperclip" aria-hidden="true"></i> {{ idea.document?.name }}</a
                  ></span
                >
              </div>
            </div>
            <div class="comment-area mt-3">
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <div class="like-block position-relative d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="total-like-block ms-2 me-3">
                      <span role="button"> {{ idea.upVoteCount }} <i class="fa fa-thumbs-up" aria-hidden="true" @click="upVote(idea.id)"></i> </span>
                    </div>
                  </div>
                  <div class="ms-3 total-comment-block">
                    <span role="button">
                      {{ idea.downVoteCount }} <i class="fa fa-thumbs-down" aria-hidden="true" @click="downVote(idea.id)"></i>
                    </span>
                  </div>
                </div>
                <div class="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
                  <a href="javascript:void();" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn"
                    ><i class="ri-share-line"></i> <span class="ms-1"> {{ idea.commentCount }} Comment</span></a
                  >
                </div>
              </div>
              <hr />
              <ul class="post-comments list-inline p-0 m-0" v-if="idea.commentCount > 0">
                <li class="mb-2" v-for="comment in idea.comments" :key="comment.id">
                  <div class="d-flex">
                    <div class="user-img">
                      <img
                        :src="
                          comment.creator?.image?.source_url
                            ? comment.creator?.image?.source_url
                            : 'https://ideas-manager.s3.ap-southeast-1.amazonaws.com/files/b4e5f150-3863-49b1-a299-05a900066470.png'
                        "
                        alt="userimg"
                        class="avatar-25 rounded-circle avatar avatar-sm"
                      />
                    </div>
                    <div class="comment-data-block ms-3">
                      <h6>{{ comment.creator.user_name }}</h6>
                      <p class="mb-0">{{ comment.comment }}</p>
                      <div class="d-flex flex-wrap align-items-center comment-activity">
                        <span> {{ convertTime(comment.created_at) }} </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <span class="text-center d-block" v-else
                ><p><i class="fa fa-comments-o" aria-hidden="true"></i> Be the fisrt comment</p></span
              >
              <validate-form class="comment-text d-flex align-items-center mt-3" @submit="(data) => postComment(data, idea.id)">
                <vsud-input class="w-100 rounded-5 mb-0" type="text" name="comment" placeholder="Enter Your Comment" aria-label="Name" />
                <div class="comment-attagement d-flex d-block mx-4">
                  <button type="submit" class="border-0 bg-transparent text-black-50"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                </div>
              </validate-form>
            </div>
          </div>
        </div>
        <span class="text-center d-block" v-if="nextPage"
          ><p role="button" @click="loadMore(nextPage)"><i class="fa fa-spinner" aria-hidden="true"></i> Loadmore</p></span
        >
      </div>
      <div class="col-md-4">
        <div class="card card-block card-stretch mb-3">
          <div class="card-header d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">Topics</h4>
            </div>
          </div>
          <div class="card-body">
            <ul class="media-story list-inline m-0 p-0">
              <li
                class="d-flex mb-3 align-items-center active cursor-pointer"
                v-for="topic in topics"
                :key="topic.id"
                @click="searchByTopic(topic.id)"
              >
                <img src="../assets/images/page-img/s2.jpg" alt="story-img" class="rounded img-fluid" />
                <div class="stories-data ms-3">
                  <h5>{{ topic.name }}</h5>
                  <p class="mb-0">{{ convertTime(topic.created_at) }}</p>
                </div>
              </li>
            </ul>
            <a href="#" class="btn btn-primary d-block mt-3">See All</a>
          </div>
        </div>
        <div class="card card-block card-stretch mb-3">
          <div class="card-header d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">Suggested Ideas</h4>
            </div>
          </div>
          <div class="card-body">
            <ul class="suggested-page-story m-0 p-0 list-inline" v-for="idea in suggests" :key="idea.id">
              <li class="mb-3">
                <div class="d-flex align-items-center mb-3">
                  <img src="../assets/images/page-img/42.png" alt="story-img" class="rounded-circle img-fluid w-10" />
                  <div class="stories-data ms-3">
                    <h5>{{ idea.is_incognito ? 'Anonymous' : idea.author?.user_name }}</h5>
                    <p class="mb-0">{{ idea.title }}</p>
                  </div>
                </div>
                <img
                  v-if="idea.image"
                  :src="idea?.image ? idea?.image?.source_url : '../assets/images/small/img-2.jpg'"
                  class="img-fluid rounded"
                  alt="Responsive image"
                />
                <img v-else src="../assets/images/page-img/empty.png" class="img-fluid rounded" alt="Responsive image" />

                <div class="mt-3">
                  <a href="#" class="btn d-block"><i class="ri-thumb-up-line me-2"></i> Read More</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <vsud-modal :isOpen="isOpenModal" @close="isOpenModal = false" classes="modal-dialog modal-lg">
      <template v-slot:header><h5 class="modal-title" id="post-modalLabel">Post new idea</h5></template>
      <idea-form @close="onCloseIdeaForm"></idea-form>
    </vsud-modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import moment from 'moment-timezone'
import IdeaService from '@/services/IdeaService.js'
import TopicService from '@/services/TopicService.js'
import CommentService from '@/services/CommentService.js'
import IdeaForm from './components/IdeaForm.vue'
moment().tz('Asia/Ho_Chi_Minh').format()
export default defineComponent({
  name: 'edit',
  components: { IdeaForm },
  data() {
    return { isValid: true, isOpenModal: false, page: 1, nextPage: null, lastPage: 0, ideas: [], topics: [], suggests: [], test: '' }
  },
  computed: {
    avatarUrl() {
      return this.$store.state.user?.image?.source_url
    },
  },
  async mounted() {
    this.$store.dispatch('setPage', this.page)
    await this.search()
    await this.searchRandom()
    const { success, data } = await TopicService.search(this.$axios, this.$store, null)
    if (success) this.topics = data.data
  },
  methods: {
    async loadMore(number) {
      if (!number || number <= 0 || number > this.lastPage) return
      this.$store.dispatch('setPage', number)
      await this.search()
    },
    async searchByTopic(topicId) {
      this.$store.dispatch('setPage', 1)
      await this.search({ topicId }, true)
    },
    async searchRandom() {
      this.$store.dispatch('startLoading')
      try {
        const res = await IdeaService.search(this.$axios, this.$store, { rand: true })
        if (res.success) {
          const { data } = res.data
          this.suggests = data
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    async search(param = {}, forceUpdate = false) {
      this.$store.dispatch('startLoading')
      try {
        const res = await IdeaService.search(this.$axios, this.$store, param)
        if (res.success) {
          const { data, page, nextPage, lastPage } = res.data
          this.ideas = forceUpdate ? data : this.ideas.concat(data)
          this.page = page
          this.nextPage = nextPage
          this.lastPage = lastPage
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    async postComment(formData, id) {
      this.$store.dispatch('startLoading')
      try {
        const res = await CommentService.createOne(this.$axios, { ...formData, idea_id: id })
        if (res.success) {
          const index = this.ideas.findIndex((idea) => idea.id === res.data.idea.id)
          this.ideas[index].comments.unshift(res.data)
          this.ideas[index].commentCount++
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    async upVote(id) {
      try {
        const res = await IdeaService.upVote(this.$axios, id)
        if (res.success) {
          const index = this.ideas.findIndex((idea) => idea.id === res.data.id)
          const { upVoteCount, downVoteCount } = res.data
          this.ideas[index] = { ...this.ideas[index], ...{ upVoteCount, downVoteCount } }
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      }
    },
    async downVote(id) {
      try {
        const res = await IdeaService.downVote(this.$axios, id)
        if (res.success) {
          const index = this.ideas.findIndex((idea) => idea.id === res.data.id)
          const { upVoteCount, downVoteCount } = res.data
          this.ideas[index] = { ...this.ideas[index], ...{ upVoteCount, downVoteCount } }
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      }
    },
    openModal() {
      this.isOpenModal = true
    },
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm')
    },
    async onCloseIdeaForm(isReload = false) {
      if (isReload) {
        this.$store.dispatch('setPage', 1)
        await this.search({}, true)
      }
      this.isOpenModal = false
    },
  },
})
</script>
