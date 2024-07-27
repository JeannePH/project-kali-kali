import {createApp} from 'vue'
import './style.css'
import '../public/main.css'
import App from './App.vue'
import router from './router/index.js'
import store from "./store.js";

//store.loadSelectedColumns();

createApp(App).use(router).mount('#app');