<template>
  <ul class="pagination d-flex px-4 mt-1" :class="getClasses(color, size, position)">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'vsud-pagination',
  props: {
    color: String,
    size: String,
    position: {
      type: String,
      default: 'end',
    },
  },
  methods: {
    getClasses: (color, size, position) => {
      let colorValue, sizeValue, ps

      colorValue = color ? `pagination-${color}` : null
      sizeValue = size ? `pagination-${size}` : null
      ps = position ? `justify-content-${position}` : 'justify-content-end'

      return `${colorValue} ${sizeValue} ${ps}`
    },
  },
}
</script>
