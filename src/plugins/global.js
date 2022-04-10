import VsudInput from '@/components/VsudInput.vue'
import VsudSwitch from '@/components/VsudSwitch.vue'
import VsudButton from '@/components/VsudButton.vue'
import VsudAvatar from '@/components/VsudAvatar.vue'
import VsudBadge from '@/components/VsudBadge.vue'
import VsudCheckbox from '@/components/VsudCheckbox.vue'
export default {
  install(app) {
    app.component(VsudInput.name, VsudInput)
    app.component(VsudCheckbox.name, VsudCheckbox)
    app.component(VsudSwitch.name, VsudSwitch)
    app.component(VsudButton.name, VsudButton)
    app.component(VsudAvatar.name, VsudAvatar)
    app.component(VsudBadge.name, VsudBadge)
  },
}
