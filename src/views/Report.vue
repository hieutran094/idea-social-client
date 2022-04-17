<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          title="Total Topic"
          :value="overView?.totalTopic"
          :iconClass="stats.money.iconClass"
          :iconBackground="stats.iconBackground"
          directionReverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          title="Total Idea"
          :value="overView?.totalIdea"
          :iconClass="stats.users.iconClass"
          :iconBackground="stats.iconBackground"
          directionReverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          title="Total Comment"
          :value="overView?.totalComment"
          :iconClass="stats.clients.iconClass"
          :iconBackground="stats.iconBackground"
          :percentageColor="stats.clients.percentageColor"
          directionReverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0">
        <card
          title="Total User"
          :value="overView?.totalUser"
          :iconClass="stats.sales.iconClass"
          :iconBackground="stats.iconBackground"
          directionReverse
        ></card>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <!-- chart -->
            <department-idea-chart :data="{ labels: chartDepLabels, data: chartDepData }" />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <!-- line chart -->
        <div class="card z-index-2">
          <idea-by-day-chart :data="chartLinedata" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReportService from '@/services/ReportService.js'
import Card from '@/examples/Cards/Card.vue'
import DepartmentIdeaChart from './components/DepartmentIdeaChart.vue'
import IdeaByDayChart from './components/IdeaByDayChart.vue'
import US from '../assets/img/icons/flags/US.png'
import DE from '../assets/img/icons/flags/DE.png'
import GB from '../assets/img/icons/flags/GB.png'
import BR from '../assets/img/icons/flags/BR.png'

export default {
  name: 'report',
  data() {
    return {
      overView: {},
      chartDepLabels: [],
      chartDepData: [],
      chartLinedata: {},
      stats: {
        iconBackground: 'bg-gradient-success',
        money: {
          title: "Today's Money",
          value: '$53,000',
          percentage: '+55%',
          iconClass: 'ni ni-money-coins',
        },
        users: {
          title: "Today's Users",
          value: '2,300',
          percentage: '+3%',
          iconClass: 'ni ni-world',
        },
        clients: {
          title: 'New Clients',
          value: '+3,462',
          percentage: '-2%',
          iconClass: 'ni ni-paper-diploma',
          percentageColor: 'text-danger',
        },
        sales: {
          title: 'Sales',
          value: '$103,430',
          percentage: '+5%',
          iconClass: 'ni ni-cart',
        },
      },
      sales: {
        us: {
          country: 'United States',
          sales: 2500,
          value: '$230,900',
          bounce: '29.9%',
          flag: US,
        },
        germany: {
          country: 'Germany',
          sales: '3.900',
          value: '$440,000',
          bounce: '40.22%',
          flag: DE,
        },
        britain: {
          country: 'Great Britain',
          sales: '1.400',
          value: '$190,700',
          bounce: '23.44%',
          flag: GB,
        },
        brasil: {
          country: 'Brasil',
          sales: '562',
          value: '$143,960',
          bounce: '32.14%',
          flag: BR,
        },
      },
    }
  },
  components: {
    Card,
    DepartmentIdeaChart,
    IdeaByDayChart,
  },
  async mounted() {
    await this.getOverView()
  },
  methods: {
    async getOverView() {
      this.$store.dispatch('startLoading')
      try {
        const res = await ReportService.getOverView(this.$axios)
        if (res.success) {
          this.overView = res.data
          this.chartLinedata = res.data.chartIdeaByDate
          this.chartDepLabels = res.data.chartDepartmentIdea.map((item) => {
            return item.name
          })
          this.chartDepData = res.data.chartDepartmentIdea.map((item) => {
            return item.count
          })
        }
        if (res.message) this.$store.dispatch('handleNotifications', res)
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.data })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
}
</script>
