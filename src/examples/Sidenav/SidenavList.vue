<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="Newsfeed" :to="{ name: 'Newsfeed' }">
          <template v-slot:icon>
            <icon name="foundation" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Topics" :to="{ name: 'Topics' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Tables" :to="{ name: 'Tables' }">
          <template v-slot:icon>
            <icon name="tables" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Billing" :to="{ name: 'Billing' }">
          <template v-slot:icon>
            <icon name="billing" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse navText="Virtual Reality" :to="{ name: 'Virtual Reality' }">
          <template v-slot:icon>
            <icon name="virtual-reality" />
          </template>
        </sidenav-collapse>
      </li> -->
      <template v-if="user?.role !== 3">
        <li class="mt-3 nav-item">
          <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2">Manage</h6>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="Topic" :to="{ name: 'List Topic' }">
            <template v-slot:icon>
              <icon name="office" />
            </template>
          </sidenav-collapse>
        </li>
        <template v-if="user?.role === 1 || user?.role === 9">
          <li class="nav-item">
            <sidenav-collapse navText="Department" :to="{ name: 'List Department' }">
              <template v-slot:icon>
                <icon name="virtual-reality" />
              </template>
            </sidenav-collapse>
          </li>
          <li class="nav-item">
            <sidenav-collapse navText="User" :to="{ name: 'List User' }">
              <template v-slot:icon>
                <icon name="customer-support" />
              </template>
            </sidenav-collapse>
          </li>
          <li class="nav-item">
            <sidenav-collapse navText="Report" :to="{ name: 'Report' }">
              <template v-slot:icon>
                <icon name="spaceship" />
              </template>
            </sidenav-collapse>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import SidenavCollapse from './SidenavCollapse.vue'

export default {
  name: 'SidenavList',
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: 'Idea Social',
      controls: 'dashboardsExamples',
      isActive: 'active',
    }
  },
  components: {
    Icon,
    SidenavCollapse,
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split('/')
      return routeArr[1]
    },
  },
}
</script>
