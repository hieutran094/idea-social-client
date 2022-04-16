import VsudInput from '@/components/VsudInput.vue'
import VsudSwitch from '@/components/VsudSwitch.vue'
import VsudButton from '@/components/VsudButton.vue'
import VsudAvatar from '@/components/VsudAvatar.vue'
import VsudBadge from '@/components/VsudBadge.vue'
import VsudCheckbox from '@/components/VsudCheckbox.vue'
import VsudModal from '@/components/VsudModal.vue'
import VsudPagination from '@/components/VsudPagination.vue'
import VsudPaginationItem from '@/components/VsudPaginationItem.vue'
import VsudDatePicker from '@/components/VsudDatePicker.vue'
import TextEditor from '@/components/TextEditor.vue'
import VsudFile from '@/components/VsudFile.vue'
import VsudSelect from '@/components/VsudSelect.vue'
export default {
  install(app) {
    app.component(VsudInput.name, VsudInput)
    app.component(VsudCheckbox.name, VsudCheckbox)
    app.component(VsudSwitch.name, VsudSwitch)
    app.component(VsudButton.name, VsudButton)
    app.component(VsudAvatar.name, VsudAvatar)
    app.component(VsudBadge.name, VsudBadge)
    app.component(VsudModal.name, VsudModal)
    app.component(VsudPagination.name, VsudPagination)
    app.component(VsudPaginationItem.name, VsudPaginationItem)
    app.component(TextEditor.name, TextEditor)
    app.component(VsudDatePicker.name, VsudDatePicker)
    app.component(VsudFile.name, VsudFile)
    app.component(VsudSelect.name, VsudSelect)
  },
}
