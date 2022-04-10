<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <validate-field
        :type="type"
        class="form-control"
        :class="getClasses(size, valid)"
        :name="name"
        :id="id"
        :value="value"
        :placeholder="placeholder"
        :isRequired="isRequired"
        :rules="rules"
      />
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
  name: 'vsud-input',
  components: {
    'validate-field': Field,
    'error-message': ErrorMessage,
  },
  props: {
    size: {
      type: String,
      default: 'default',
    },
    valid: {
      type: Boolean,
      default: false,
    },
    icon: String,
    iconDir: String,
    name: String,
    id: String,
    value: String,
    placeholder: String,
    type: String,
    isRequired: Boolean,
    rules: String,
  },
  methods: {
    getClasses: (size, valid) => {
      let sizeValue, isValidValue

      sizeValue = size ? `form-control-${size}` : null

      isValidValue = valid ? `${valid}` : 'invalid'

      return `${sizeValue} ${isValidValue}`
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? 'input-group' : null),
  },
}
</script>
