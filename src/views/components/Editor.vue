<template>
  <div ref="editor" class=""></div>
</template>

<script>
import Quill from 'quill'

export default {
  name: 'editor',
  mounted() {
    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
    ]

    new Quill(this.$refs.editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: 'Words can be like x-rays if you use them properly...',
      theme: 'snow',
    })
  },
}
</script>
