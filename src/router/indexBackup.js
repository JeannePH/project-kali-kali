

import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/Home.vue";
import Applications from "../components/applications/Applications.vue";
import Login from "../views/Login.vue";
import Audit from "../components/application/management/ApplicationManagementAudit.vue";
import Administration from "../components/application/management/ApplicationManagementAdministration.vue";
import Search from "../components/application/management/Search.vue";
import AddApplication from "../components/forms/AddNewApplication.vue";
import AddApplicationData from "../components/forms/AddApplicationData.vue";
import Application from "../components/application/Application.vue";
import ApplicationData from "../components/application/data/ApplicationData.vue";
import store from "../store.js";
import UnauthenticatedLayout from "../components/layouts/UnauthenticatedLayout.vue";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/login',
        component: UnauthenticatedLayout,
        children: [
            { path: '', name: 'Login', component: Login }
        ]
    },
    {
        path: '/',
        component: AuthenticatedLayout,
        meta: { requiresAuth: true },
        children: [
            { path: 'applications', name: 'Applications', component: Applications },
            { path: 'add-application', name: 'Add Application', component: AddApplication },
            { path: 'add-application-data', name: 'Add Application Data', component: AddApplicationData },
            {
                path: 'application',
                name: 'Application',
                component: Application,
                children: [
                    { path: 'administration', name: 'Administration', component: Administration },
                    { path: 'audit', name: 'Audit', component: Audit },
                    { path: 'search', name: 'Recherche', component: Search },
                    { path: 'pages', name: 'Pages', component: ApplicationData },
                    { path: 'workflows', name: 'Workflows', component: ApplicationData },
                    { path: 'variables', name: 'Variables', component: ApplicationData },
                    { path: 'wwobjects', name: 'Composants', component: ApplicationData },
                    { path: 'actions', name: 'Actions', component: ApplicationData },
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'kali-active-link'
})


// Ajouter un garde de navigation global
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.user !== null; // Ou une autre logique pour vérifier l'authentification

    // Si la route n'est pas 'login' et que l'utilisateur n'est pas authentifié, redirigez vers 'login'
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next(); // Sinon, continuez vers la route demandée
    }
});




export default router
