<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" :name="name" :id="id" :checked="checked" @change="handleChange" />
    <label :for="id" class="custom-control-label">
      <slot />
    </label>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'vsud-checkbox',
  props: {
    name: String,
    id: String,
    checked: {
      type: [Boolean],
      default: false,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('update:checked', e.target.checked)
    },
  },
})
</script>
