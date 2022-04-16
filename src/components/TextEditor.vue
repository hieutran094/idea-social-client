<template>
  <validate-field v-slot="{ handleChange, handleBlur }" :name="name" :rules="rules">
    <QuillEditor
      ref="editor"
      theme="snow"
      :toolbar="toolbarOptions"
      :placeholder="placeholder"
      v-model:content="value"
      contentType="html"
      class="rounded-bottom"
      @update:content="handleChange"
      @blur="handleBlur"
    ></QuillEditor>
  </validate-field>
  <error-message class="text-danger text-sm" :name="name" />
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Field, ErrorMessage } from 'vee-validate'
export default {
  name: 'text-editor',
  components: {
    QuillEditor,
    'validate-field': Field,
    'error-message': ErrorMessage,
  },
  props: {
    content: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Type here...',
    },
    name: String,
    rules: String,
  },
  emits: ['update:content'],
  data() {
    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
    ]
    return { toolbarOptions }
  },
  computed: {
    value: {
      get() {
        if (this.$refs.editor) {
          this.$refs.editor.setHTML(this.content)
        }
        return this.content
      },
      set(newValue) {
        this.copy = newValue
        this.$emit('update:content', newValue)
      },
    },
  },
}
</script>
