import {createApp} from 'vue'
import './styles/main.scss'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from 'pinia';
import {supabase} from "./supabase.js";
import {useAuth} from "./stores/auth.js";

const pinia = createPinia();

supabase.auth.onAuthStateChange((event, session) => {
    const authStore = useAuth();
    if (session) {
        authStore.setUser(session.user);
    } else {
        authStore.clearUser();
        if (event === 'SIGNED_OUT') {
            router.push({ name: 'Login' });
        }
    }
});

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');