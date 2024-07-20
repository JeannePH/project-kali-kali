import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Application from "./views/Application.vue";
import Login from "./views/Login.vue";
import TestView from "./views/TestView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: Home, component: Home},
        {path: '/home', name: Home, component: Home},
        {path: '/about', name: About, component: About},
        {path: '/application', name: Application, component: Application},
        {path: '/login', name: Login, component: Login},
        {path: '/test', name: TestView, component: TestView},
    ]
})

createApp(App).use(router).mount('#app')
