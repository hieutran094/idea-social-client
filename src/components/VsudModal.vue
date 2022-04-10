<template>
  <div ref="modal" class="modal fade custom-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
          <button type="button" class="btn-close btn-modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"><slot></slot></div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
export default {
  name: 'vsud-modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { modal: null }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {})
    this.$refs.modal.addEventListener('hidden.bs.modal', () => {
      this.$emit('close')
    })
  },
  methods: {
    openModal() {
      this.modal.show()
    },
    closeModal() {
      this.modal.hide()
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal) this.openModal()
      else this.closeModal()
    },
  },
}
</script>
