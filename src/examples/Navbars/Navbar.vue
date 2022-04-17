<template>
  <nav class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl" v-bind="$attrs" id="navbarBlur" data-scroll="true">
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :textWhite="textWhite" />
      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4 me-sm-4" id="navbar">
        <div class="pe-md-3 d-flex align-items-center ms-md-auto">
          <div class="input-group mb-0">
            <vsud-input class="mb-0" type="text" name="search" iconDir="left" icon="fas fa-search" :placeholder="'Type here...'" />
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <a class="px-0 nav-link font-weight-bold cursor-pointer" :class="textWhite ? textWhite : 'text-body'" @click="logout">
              <i class="fa fa-sign-out me-sm-1"></i>
              <span class="d-sm-inline d-none"> Logout </span>
            </a>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a href="#" @click="toggleSidebar" class="p-0 nav-link text-body" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          <li class="nav-item dropdown d-flex align-items-center ms-4 cursor-pointer">
            <vsud-avatar
              class="p-0 nav-link"
              size="sm"
              :img="avatarUrl ? avatarUrl : 'https://ideas-manager.s3.ap-southeast-1.amazonaws.com/files/b4e5f150-3863-49b1-a299-05a900066470.png'"
              alt="kal"
              borderRadius="lg"
              shadow="regular"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :class="[textWhite ? textWhite : 'text-body', showMenu ? 'show' : '']"
              @click="showMenu = !showMenu"
            />
            <ul
              class="px-2 py-0 dropdown-menu dropdown-menu-end me-sm-n4 me-md-n3"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <img
                        :src="
                          avatarUrl
                            ? avatarUrl
                            : 'https://ideas-manager.s3.ap-southeast-1.amazonaws.com/files/b4e5f150-3863-49b1-a299-05a900066470.png'
                        "
                        class="avatar avatar-sm me-3"
                        alt="user image"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal"><span class="font-weight-bold">Hi </span> {{ user?.user_name }}</h6>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from '../Breadcrumbs.vue'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'navbar',
  data() {
    return {
      showMenu: false,
    }
  },
  props: ['minNav', 'textWhite'],
  created() {
    this.minNav
  },
  methods: {
    ...mapMutations(['navbarMinimize', 'toggleConfigurator']),
    ...mapActions(['toggleSidebarColor', 'logout']),

    toggleSidebar() {
      this.toggleSidebarColor('bg-white')
      this.navbarMinimize()
    },
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    },
    user() {
      return this.$store.state.user
    },
    avatarUrl() {
      return this.$store.state.user?.image?.source_url
    },
  },
  updated() {
    const navbar = document.getElementById('navbarBlur')
    window.addEventListener('scroll', () => {
      if (!navbar) return
      if (window.scrollY > 10 && this.$store.state.isNavFixed) {
        navbar.classList.add('blur')
        navbar.classList.add('position-sticky')
        navbar.classList.add('shadow-blur')
      } else {
        navbar.classList.remove('blur')
        navbar.classList.remove('position-sticky')
        navbar.classList.remove('shadow-blur')
      }
    })
  },
  watch: {
    user() {
      if (!this.user) {
        this.$router.push('/sign-in')
      }
    },
  },
}
</script>
