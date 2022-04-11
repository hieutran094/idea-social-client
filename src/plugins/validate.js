import { defineRule, Form } from 'vee-validate'
import AllRules, { email } from '@vee-validate/rules'

export default {
  install(app) {
    Object.keys(AllRules).forEach((rule) => {
      defineRule(rule, AllRules[rule])
    })
    defineRule('isEmailOrAdmin', (value) => {
      if (!email(value) && value !== 'admin') {
        return 'email is not valid.'
      }
      return true
    })
    app.component('validate-form', Form)
  },
}
