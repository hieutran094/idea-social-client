<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <validate-field
        v-slot="{ value }"
        class="form-control"
        as="select"
        :name="name"
        :validateOnInput="true"
        :class="getClasses(size, classes)"
        :id="id"
        :modelValue="value"
        :rules="rules"
        @change="handleChange"
      >
        <option value="" disabled>Select a one</option>
        <option v-for="item in values" :key="item.id" :value="item.id" :selected="item.id === value">
          {{ item.name }}
        </option></validate-field
      >
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <error-message class="text-danger text-sm" :name="name" />
    </div>
  </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate'
export default {
  name: 'vsud-select',
  components: {
    'validate-field': Field,
    'error-message': ErrorMessage,
  },
  props: {
    size: {
      type: String,
      default: 'default',
    },
    icon: String,
    iconDir: String,
    name: String,
    id: String,
    value: String,
    values: {
      type: Array,
    },
    rules: String,
    classes: String,
  },
  methods: {
    handleChange(e) {
      this.$emit('update:value', e.target.value)
    },
    getClasses: (size, classes) => {
      let sizeValue

      sizeValue = size ? `form-control-${size}` : null

      return `${sizeValue} ${classes}`
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? 'input-group' : null),
  },
}
</script>
