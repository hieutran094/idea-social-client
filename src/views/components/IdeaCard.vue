<template>
  <div class="card card-blog card-plain">
    <div class="position-relative">
      <a class="shadow-xl d-block border-radius-xl">
        <img v-if="item.image" :src="item?.image?.source_url" class="shadow img-fluid border-radius-xl" alt="Responsive image" />
        <img v-else src="../../assets/images/page-img/empty.png" class="shadow img-fluid border-radius-xl" alt="Responsive image" />
      </a>
    </div>
    <div class="px-1 pb-0 card-body">
      <a href="javascript:;">
        <h6>{{ item.title }}</h6>
      </a>
      <span class="mb-4 d-block" style="max-height: 80px; overflow: hidden">{{ removeTags(item.description) }} </span>
      <div class="d-flex align-items-center justify-content-between">
        <button type="button" class="mb-0 btn btn-outline-success btn-sm" @click="submit(item.id)">View More</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'idea-card',
  props: {
    item: Object,
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
  },
}
</script>
