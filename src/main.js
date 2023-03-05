import { createApp } from 'vue'
import App from './App.vue'

// Подключаем наши стили
import '@/assets/styles/main.scss'

// Импортируем наши роутеры
import routers from '@/routes'

// Импортируем наш store
import store from '@/store/index'

import VueLazyload from 'vue-lazyload'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas,far,fab)


const app = createApp(App)

const errorImage = require('@/assets/images/error.png')

app.use(VueLazyload, {
  error: errorImage
})


app.component('fa', FontAwesomeIcon)

// UI
import BtnMore from '@/components/UI/BtnMore.vue'
import Actors from '@/components/UI/Actors.vue'
import Trailer from '@/components/UI/Trailer.vue'

app.component('BtnMore', BtnMore)
app.component('Actors', Actors)
app.component('Trailer', Trailer)

app.use(routers).use(store).mount('#app')
