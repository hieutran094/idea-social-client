/* eslint-disable prettier/prettier */
<template>
  <button class="btn mb-0" :class="getClasses(variant, color, size, fullWidth, active)" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'vsud-button',
  props: {
    color: {
      type: String,
      default: 'info',
    },
    size: {
      type: String,
      default: 'md',
    },
    variant: {
      type: String,
      default: 'fill',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getClasses: (variant, color, size, fullWidth, active) => {
      let colorValue, sizeValue, fullWidthValue, activeValue

      // Setting the button variant and color
      if (variant === 'gradient') {
        colorValue = `bg-gradient-${color}`
      } else if (variant === 'outline') {
        colorValue = `btn-outline-${color}`
      } else {
        colorValue = `btn-${color}`
      }

      sizeValue = size ? `btn-${size}` : ''

      fullWidthValue = fullWidth ? `w-100` : ''

      activeValue = active ? `active` : ''

      return `${colorValue} ${sizeValue} ${fullWidthValue} ${activeValue}`
    },
  },
}
</script>
