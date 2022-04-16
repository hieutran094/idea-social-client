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
        <profile-card />
      </div>
      <div class="mt-4 col-md-4 mt-xl-0">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0">Conversations</h6>
          </div>
          <div class="p-3 card-body">
            <ul class="list-group">
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                <vsud-avatar class="me-3" :img="sophie" alt="kal" borderRadius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Sophie B.</h6>
                  <p class="mb-0 text-xs">Hi! I need more information..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                <vsud-avatar class="me-3" :img="marie" alt="kal" borderRadius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Anne Marie</h6>
                  <p class="mb-0 text-xs">Awesome work, can you..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                <vsud-avatar class="me-3" :img="ivana" alt="kal" borderRadius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Ivanna</h6>
                  <p class="mb-0 text-xs">About files I can..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                <vsud-avatar class="me-3" :img="peterson" alt="kal" borderRadius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Peterson</h6>
                  <p class="mb-0 text-xs">Have a great afternoon..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
              <li class="px-0 border-0 list-group-item d-flex align-items-center">
                <vsud-avatar class="me-3" :img="nick" alt="kal" borderRadius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Nick Daniel</h6>
                  <p class="mb-0 text-xs">Hi! I need more information..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mt-4 row">
      <div class="col-12">
        <div class="mb-4 card">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-1">Projects</h6>
            <p class="text-sm">Architects design houses</p>
          </div>
          <div class="p-3 card-body">
            <div class="row">
              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                <projects-card
                  :img="img1"
                  v-bind:number="2"
                  title="Modern"
                  description="As Uber works through a huge amount of internal
                management turmoil."
                  :imgTeam1="team1"
                  titleTeam1="Elena Morison"
                  :imgTeam2="team2"
                  titleTeam2="Ryan Milly"
                  :imgTeam3="team3"
                  titleTeam3="Nick Daniel"
                  :imgTeam4="team4"
                  titleTeam4="Peterson"
                />
              </div>
              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                <projects-card
                  :img="img2"
                  v-bind:number="1"
                  title="Scandinavian"
                  description="Music is something that every person has his or her own
                      specific opinion about."
                  :imgTeam1="team3"
                  titleTeam1="Nick Daniel"
                  :imgTeam2="team4"
                  titleTeam2="Peterson"
                  :imgTeam3="team1"
                  titleTeam3="Elena Morison"
                  :imgTeam4="team2"
                  titleTeam4="Ryan Milly"
                />
              </div>
              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                <projects-card
                  :img="img3"
                  v-bind:number="3"
                  title="Minimalist"
                  description="Different people have different taste, and various types
                      of music."
                  :imgTeam1="team4"
                  titleTeam1="Peterson"
                  :imgTeam2="team3"
                  titleTeam2="Nick Daniel"
                  :imgTeam3="team2"
                  titleTeam3="Ryan Milly"
                  :imgTeam4="team1"
                  titleTeam4="Elena Morison"
                />
              </div>
              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                <div class="border card h-100 card-plain">
                  <div class="text-center card-body d-flex flex-column justify-content-center">
                    <a href="javascript:;">
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
    </div> -->
  </div>
</template>

<script>
import ProfileCard from './components/ProfileCard.vue'
import VsudAvatar from '../components/VsudAvatar.vue'
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

// import ProjectsCard from './components/ProjectOverviewCard.vue'
import setTooltip from '@/assets/js/tooltip.js'
import TopicService from '@/services/TopicService.js'
export default {
  name: 'profile-overview',
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
      data: null,
    }
  },
  components: {
    ProfileCard,
    VsudAvatar,
    // ProjectsCard,
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
        this.data = res.data
      }
    } catch (err) {
      this.$store.dispatch('handleNotifications', { message: err.response.message })
    } finally {
      this.$store.dispatch('stopLoading')
    }
    this.$store.state.isAbsolute = true
    this.$store.state.isNavFixed = false
    setTooltip()
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false
  },
}
</script>
