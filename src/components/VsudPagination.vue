<template>
  <ul class="pagination d-flex justify-content-end px-4 mt-1" :class="getClasses(color, size)">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'vsud-pagination',
  props: {
    color: String,
    size: String,
  },
  methods: {
    getClasses: (color, size) => {
      let colorValue, sizeValue

      colorValue = color ? `pagination-${color}` : null
      sizeValue = size ? `pagination-${size}` : null

      return `${colorValue} ${sizeValue}`
    },
  },
}
</script>
