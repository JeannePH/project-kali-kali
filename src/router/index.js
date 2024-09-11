import { createRouter, createWebHistory } from 'vue-router';

import Applications from "../components/applications/Applications.vue";
import Login from "../components/Login.vue";
import Audit from "../components/application/management/ApplicationAudit.vue";
import Administration from "../components/application/management/ApplicationAdministration.vue";
import AddApplication from "../components/forms/AddNewApplication.vue";
import Application from "../components/application/Application.vue";
import ApplicationData from "../components/application/data/ApplicationData.vue";
import NotFound from "../components/NotFound.vue";
import UnauthenticatedLayout from "../components/layouts/UnauthenticatedLayout.vue";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout.vue";
import {useAuth} from "../stores/auth.js";  // Importez votre store ou méthode d'authentification

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'Not Found',
        component: NotFound
    },
    {
        path: '/login',
        component: UnauthenticatedLayout,
        children: [
            { path: '/login', name: 'Login', component: Login }
        ]
    },
    {
        path: '/',
        name: 'Authenticated Layout',
        component: AuthenticatedLayout,
        meta: { requiresAuth: true },
        children: [
            { path: 'applications', name: 'Applications', component: Applications },
            { path: 'add-application', name: 'Add Application', component: AddApplication },
            {
                path: 'application',
                name: 'Application',
                component: Application,
                children: [
                    { path: 'administration', name: 'Administration', component: Administration },
                    { path: 'audit', name: 'Audit', component: Audit },
                    { path: 'pages', name: 'Pages', component: ApplicationData },
                    { path: 'workflows', name: 'Workflows', component: ApplicationData },
                    { path: 'variables', name: 'Variables', component: ApplicationData },
                    { path: 'wwobjects', name: 'Composants', component: ApplicationData },
                ]
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'kali-active-link'
});

// Garde de navigation global
router.beforeEach((to, from, next) => {
    const authStore = useAuth();
    const isAuthenticated = authStore.user !== null;

    if (!isAuthenticated && to.name !== 'Login') {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
