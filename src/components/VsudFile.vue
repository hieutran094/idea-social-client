<template>
  <div class="form-group">
    <validate-field v-slot="{ handleChange, handleBlur }" :validateOnInput="true" :name="name" :id="id" :modelValue="value" :rules="rules">
      <input
        class="form-control"
        :class="getClasses(size)"
        type="file"
        @change="
          (e) => {
            handleInputChange(e)
            handleChange(e.target.files[0])
          }
        "
        @input="handleBlur"
        :accept="accept"
      />
    </validate-field>
    <error-message class="text-danger text-sm" :name="name" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate'
export default {
  name: 'vsud-file',
  components: {
    'validate-field': Field,
    'error-message': ErrorMessage,
  },
  props: {
    size: {
      type: String,
      default: 'default',
    },
    name: String,
    id: String,
    value: Object,
    rules: String,
    accept: String,
  },
  methods: {
    handleInputChange(e) {
      this.$emit('update:value', e.target.files[0])
    },
    getClasses: (size) => {
      let sizeValue, isValidValue

      sizeValue = size ? `form-control-${size}` : null

      return `${sizeValue} ${isValidValue}`
    },
  },
}
</script>
