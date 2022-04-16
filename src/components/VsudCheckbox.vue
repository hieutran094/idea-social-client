<template>
  <div class="form-check">
    <validate-field v-slot="{ handleChange, handleBlur }" :name="name" :rules="rules">
      <input
        class="form-check-input"
        type="checkbox"
        :name="name"
        :id="id"
        :checked="checked"
        @change="
          (e) => {
            handleChangeCheck(e)
            handleChange(e.target.checked)
          }
        "
        @blur="handleBlur"
      />
      <label :for="id" class="custom-control-label">
        <slot />
      </label>
    </validate-field>
    <error-message class="text-danger text-sm" :name="name" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
export default defineComponent({
  name: 'vsud-checkbox',
  components: {
    'validate-field': Field,
    'error-message': ErrorMessage,
  },
  props: {
    name: String,
    rules: String,
    id: String,
    checked: {
      type: [Boolean],
      default: false,
    },
  },
  methods: {
    handleChangeCheck(e) {
      this.$emit('update:checked', e.target.checked)
    },
  },
})
</script>
