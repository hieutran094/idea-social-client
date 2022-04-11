<template>
  <div class="card mb-4 border border-3 border-secondary border-bottom-0 border-start-0 border-end-0 rounded-1">
    <div class="card-header pb-0">
      <h6>Authors table</h6>
      <div class="btn-toolbar d-flex align-items-start justify-content-between" role="toolbar">
        <div class="btn-group mb-3" role="group">
          <vsud-button color="secondary" variant="outline" class="mb-auto"><i class="fa fa-plus"></i> Add</vsud-button>
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
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar :img="img1" size="sm" border-radius="lg" class="me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">John Michael</h6>
                    <p class="text-xs text-secondary mb-0">john@example.com</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Manager</p>
                <p class="text-xs text-secondary mb-0">Organization</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge color="success" variant="gradient" size="sm">Online</vsud-badge>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
              </td>
              <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from '../../assets/img/team-2.jpg'
import img2 from '../../assets/img/team-3.jpg'
import img3 from '../../assets/img/team-4.jpg'
import img4 from '../../assets/img/team-3.jpg'
import img5 from '../../assets/img/team-2.jpg'
import img6 from '../../assets/img/team-4.jpg'

export default {
  name: 'authors-table',
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
    }
  },
  components: {},
}
</script>
