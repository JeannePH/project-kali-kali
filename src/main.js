import {createApp} from 'vue'

import './styles/main.scss'
import App from './App.vue'
import router from './router/index.js'

createApp(App).use(router).mount('#app');