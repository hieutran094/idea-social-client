<template>
  <QuillEditor theme="snow" :toolbar="toolbarOptions" class="rounded-bottom" />
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
export default {
  name: 'text-editor',
  components: {
    QuillEditor,
  },
  props: {
    color: {
      type: String,
      default: 'success',
    },
  },
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
  methods: {},
}
</script>
