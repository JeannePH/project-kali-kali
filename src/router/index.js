import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/Home.vue";
import Application from "../views/Applications.vue";
import Login from "../views/Login.vue";
import Audit from "../views/Audit.vue";
import Administration from "../views/Administration.vue";
import Search from "../views/Search.vue";
import Pages from "../views/Pages.vue";
import Workflows from "../views/Workflows.vue";
import Variables from "../views/Variables.vue";
import WwObjects from "../views/WwObjects.vue";
import Actions from "../views/Actions.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/home', name: 'Home', component: Home},
    {path: '/application', name: 'Application', component: Application},
    {path: '/login', name: 'Login', component: Login},
    {path: '/audit', name: 'Audit', component: Audit},
    {path: '/administration', name: 'Administration', component: Administration},
    {path: '/search', name: 'Recherche', component: Search},
    {path: '/pages', name: 'Pages', component: Pages},
    {path: '/workflows', name: 'Workflows', component: Workflows},
    {path: '/variables', name: 'Variables', component: Variables},
    {path: '/wwobjects', name: 'Composants', component: WwObjects},
    {path: '/actions', name: 'Actions', component: Actions},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'kali-active-link'
})

export default router