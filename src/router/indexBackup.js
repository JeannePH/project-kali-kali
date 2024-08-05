import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/Home.vue";
import Application from "../components/applications/Applications.vue";
import Login from "../views/Login.vue";
import Audit from "../components/application/management/ApplicationManagementAudit.vue";
import Administration from "../components/application/management/ApplicationManagementAdministration.vue";
import Search from "../components/application/management/Search.vue";
import Pages from "../components/application/data/ApplicationDataPages.vue";
import Workflows from "../components/application/data/ApplicationDataWorkflows.vue";
import Variables from "../components/application/data/ApplicationDataVariables.vue";
import WwObjects from "../components/application/data/ApplicationDataWwObjects.vue";
import Actions from "../components/application/data/ApplicationDataActions.vue";
import AddApplication from "../components/forms/AddNewApplication.vue";
import AddApplicationData from "../components/forms/AddApplicationData.vue";

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
    {path: '/add-application', name: 'Add Application', component: AddApplication},
    {path: '/add-application-data', name: 'Add Application Data', component: AddApplicationData},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'kali-active-link'
})

export default router