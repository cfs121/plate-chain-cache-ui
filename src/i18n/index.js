import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tableZhCN from 'vxe-table/lib/locale/lang/zh-CN'
import tableEnUS from 'vxe-table/lib/locale/lang/en-US'

import eleFormEnLocal from 'vue-ele-form/lib/locale/lang/en'
import eleFormZhLocal from 'vue-ele-form/lib/locale/lang/zh-CN'
import eleFormLocale from 'vue-ele-form/lib/locale'

import myZhCN from './lang/zh-CN'
import myEnUS from './lang/en-US'

Vue.use(VueI18n)

const languageList = ['zh_CN', 'en_US']
const customLanguage = localStorage.getItem('language')

const i18n = new VueI18n({
  /* eslint-disable @typescript-eslint/camelcase */
  locale: customLanguage && languageList.includes(customLanguage) ? customLanguage : ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'].includes(navigator.language) ? 'zh_CN' : 'en_US',
  messages: {
    en_US: {
      ...tableEnUS,
      ...myEnUS,
      ...eleFormEnLocal,
      ...eleFormLocale
    },
    zh_CN: {
      ...tableZhCN,
      ...myZhCN,
      ...eleFormZhLocal
    }
  }
})

eleFormLocale.i18n((key, value) => i18n.t(key, value))

export default i18n