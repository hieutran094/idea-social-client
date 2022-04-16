<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="mb-4 card">
          <div class="p-3 card-body">
            <div class="row">
              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0 pb-5" v-for="item in topics" :key="item.id">
                <projects-card :item="item" v-bind:number="2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sophie from '@/assets/img/kal-visuals-square.jpg'
import marie from '@/assets/img/marie.jpg'
import ivana from '@/assets/img/ivana-square.jpg'
import peterson from '@/assets/img/team-4.jpg'
import nick from '@/assets/img/team-3.jpg'
import img1 from '@/assets/img/home-decor-1.jpg'
import img2 from '@/assets/img/home-decor-2.jpg'
import img3 from '@/assets/img/home-decor-3.jpg'
import team1 from '@/assets/img/team-1.jpg'
import team2 from '@/assets/img/team-2.jpg'
import team3 from '@/assets/img/team-3.jpg'
import team4 from '@/assets/img/team-4.jpg'

import ProjectsCard from './components/ProjectOverviewCard.vue'
import setTooltip from '@/assets/js/tooltip.js'
import moment from 'moment-timezone'
import TopicService from '@/services/TopicService.js'
moment().tz('Asia/Ho_Chi_Minh').format()
export default {
  name: 'topics',
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      topics: [],
      lastPage: 1,
      isOpenModal: false,
      currentData: { id: '', name: '' },
      keyword: null,
      nextPage: null,
    }
  },
  components: {
    ProjectsCard,
  },

  async mounted() {
    setTooltip()
    this.$store.dispatch('setPage', 1)
    this.$store.dispatch('setLimit', 9999)
    await this.search()
  },
  methods: {
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm:ss')
    },
    async changePage(number) {
      if (number <= 0 || number > this.lastPage) return
      this.$store.dispatch('setPage', number)
      await this.search()
    },
    async search(keyword = null) {
      this.$store.dispatch('startLoading')
      try {
        const res = await TopicService.search(this.$axios, this.$store, keyword)
        if (res.success) {
          const { data, lastPage, nextPage } = res.data
          this.topics = data.map((item) => {
            item.lock = moment() > moment(item.lock_date)
            return item
          })
          this.lastPage = lastPage
          this.nextPage = nextPage
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
  beforeUnmount() {
    this.$store.dispatch('setLimit', 5)
  },
}
</script>
