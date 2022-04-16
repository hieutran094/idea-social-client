<template>
  <div class="card card-blog card-plain">
    <div class="position-relative">
      <a class="shadow-xl d-block border-radius-xl">
        <img v-if="item.image" :src="item?.image?.source_url" class="shadow img-fluid border-radius-xl" alt="Responsive image" />
        <img v-else src="../../assets/images/page-img/empty.png" class="shadow img-fluid border-radius-xl" alt="Responsive image" />
      </a>
    </div>
    <div class="px-1 pb-0 card-body">
      <span v-if="!item.lock" class="badge bg-success">Open</span>
      <span v-else class="badge bg-danger"><i class="fa fa-lock" aria-hidden="true"></i> Lock</span>
      <a href="javascript:;">
        <h5>{{ item.name }}</h5>
      </a>
      <span class="mb-4 d-block" style="max-height: 150px; overflow: hidden">{{ removeTags(item.description) }} </span>
      <div class="d-flex align-items-center justify-content-between">
        <button type="button" class="mb-0 btn btn-outline-success btn-sm" @click="submit(item.id)">View More</button>
        <!-- <div class="mt-2 avatar-group">
          <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" :title="titleTeam1">
            <img alt="Image placeholder" :src="imgTeam1" />
          </a>
          <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" :title="titleTeam2">
            <img alt="Image placeholder" :src="imgTeam2" />
          </a>
          <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" :title="titleTeam3">
            <img alt="Image placeholder" :src="imgTeam3" />
          </a>
          <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" :title="titleTeam4">
            <img alt="Image placeholder" :src="imgTeam4" />
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projects-card',
  props: {
    item: Object,
    img: String,
    number: Number,
    title: String,
    description: String,
    imgTeam1: String,
    imgTeam2: String,
    imgTeam3: String,
    imgTeam4: String,
    titleTeam1: String,
    titleTeam2: String,
    titleTeam3: String,
    titleTeam4: String,
  },
  methods: {
    removeTags(string) {
      return !string
        ? ''
        : string
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .trim()
    },
    submit(id) {
      this.$router.push({ path: `/topics/detail/${id}` })
    },
  },
}
</script>
