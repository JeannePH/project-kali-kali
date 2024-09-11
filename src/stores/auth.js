import { defineStore } from 'pinia';
import { login, logout, fetchUser } from '../api/supabaseApi';

export const useAuth = defineStore('auth', {
    state: () => ({
        user: null,
        errorMessage: null,
        successMessage: null,
        loading: false,
    }),

    actions: {
        setUser(user) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        },

        async processLogin(email, password) {
            this.loading = true;
            console.log("store.processLogin appelée avec:", {email, password});
            try {
                const data = await login(email, password);
                if (data && data.user) {
                    this.user = data.user;
                    this.errorMessage = null;
                    this.successMessage = "Connexion réussie";
                    console.log("✅ Login - Connexion réussie:", this.user);
                } else {
                    this.errorMessage = "Utilisateur non trouvé";
                    console.log("❌ Login - Réponse API inattendue:", data);
                }
            } catch (error) {
                this.errorMessage = error.message;
                console.error("❌ Login - Erreur:", error.message);
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            try {
                await logout();
                this.user = null;
            } catch (error) {
                console.log('❌ Logout - erreur:', error);
            }
        },

        async fetchUser() {
            try {
                this.user = await fetchUser();
                console.log("✅ Utilisateur récupéré:", this.user);
            } catch (error) {
                console.log('❌ Erreur lors de la récupération de l\'utilisateur :', error);
            }
        },

        clearMessages() {
            this.errorMessage = null;
            this.successMessage = null;
        },
    }
});
