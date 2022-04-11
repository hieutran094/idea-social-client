<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1">
          <div class="card-header pb-0">
            <div class="btn-toolbar d-flex align-items-start justify-content-between" role="toolbar">
              <div class="btn-group mb-3" role="group">
                <router-link to="/department/create">
                  <vsud-button color="secondary" class="mb-auto"><i class="fa fa-plus"></i> Add</vsud-button></router-link
                >
              </div>
              <div class="input-group">
                <vsud-input type="text" name="search" iconDir="left" icon="fas fa-search" :placeholder="'Type here...'" />
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2 border-top">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in departments" :key="item.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mx-2 mb-0 text-sm">{{ item.name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle">
                      <router-link :to="`/department/edit/${item.id}`"
                        ><vsud-button color="secondary" variant="outline" class="mb-auto py-2"
                          ><i class="fa fa-pencil"></i> Edit</vsud-button
                        ></router-link
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
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DepartmentService from '@/services/DepartmentService.js'
// const paginate = (currentPage, lastPage, onSides) => {
//   let pages = []
//   for (let i = 1; i <= lastPage; i++) {
//     let offset = i == 1 || lastPage ? onSides + 1 : onSides
//     if (i == 1 || (currentPage - offset <= i && currentPage + offset >= i) || i == currentPage || i == lastPage) {
//       pages.push(i)
//     } else if (i == currentPage - (offset + 1) || i == currentPage + (offset + 1)) {
//       pages.push('...')
//     }
//   }
//   return pages
// }
export default defineComponent({
  name: 'ListDepartment',
  components: {},
  data() {
    return { departments: [], lastPage: 1 }
  },
  async mounted() {
    await this.search()
  },
  computed: {
    currentPage() {
      return this.$store.state.page
    },
    paginationItems() {
      //   const arr = []
      //   //   if (this.lastPage <= 4) arr = [1, 2, 3, 4]
      //   //   else {
      //   arr = paginate(6, this.lastPage, 4)
      //   }
      return this.paginate(this.currentPage, this.lastPage, 1)
    },
  },
  methods: {
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
      //   if (pages.find((item) => item === '...')) pages.shift()
      return pages
    },
    async changePage(number) {
      if (number <= 0 || number > this.lastPage) return
      this.$store.dispatch('setPage', number)
      await this.search()
    },
    async search() {
      this.$store.dispatch('startLoading')
      try {
        const res = await DepartmentService.search(this.$axios, this.$store)
        if (res.success) {
          const { data, lastPage } = res.data
          this.departments = data
          this.lastPage = lastPage
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
})
</script>
