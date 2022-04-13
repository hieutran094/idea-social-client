<template>
  <div class="form-group">
    <validate-field :name="name" v-slot="{ handleChange, handleBlur }" :rules="rules" validateOnChange>
      <date-picker
        :class="getClasses(size)"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :utc="utc"
        :modelValue="value"
        :autoApply="autoApply"
        :minDate="minDate"
        :maxDate="maxDate"
        @update:modelValue="
          (val) => {
            handleChange(val)
            handleUpdate(val)
          }
        "
        @blur="handleBlur"
        @internalModelChange="
          (val) => {
            if (val) handleChange(val)
          }
        "
      />
    </validate-field>
    <error-message class="text-danger text-sm" :name="name" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  name: 'vsud-date-picker',
  components: {
    'validate-field': Field,
    'error-message': ErrorMessage,
    'date-picker': Datepicker,
  },
  props: {
    size: {
      type: String,
      default: 'default',
    },
    utc: Boolean,
    autoApply: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: [String, Date],
      default: null,
    },
    maxDate: {
      type: [String, Date],
      default: null,
    },
    value: {
      type: [String, Date],
      default: null,
    },
    name: String,
    id: String,
    placeholder: String,
    rules: String,
  },
  computed: {
    isNew() {
      return this.value
    },
  },
  methods: {
    handleUpdate(val) {
      this.$emit('update:value', val)
    },
    getClasses: (size) => {
      let sizeValue
      sizeValue = size ? `form-control-${size}` : null
      return `${sizeValue} `
    },
  },
}
</script>
