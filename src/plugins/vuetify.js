// plugins/vuetify.js
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
    icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
})