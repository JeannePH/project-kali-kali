import {defineStore} from 'pinia';
import {getAllApplications} from '../api/supabaseApi';
import {useMessageStore} from './messages';

export const useAllApplicationsStore = defineStore('allApplicationsStore', {
    state: () => ({
        applications: [],
        selectedApplicationId: null,
        loading: false,
    }),

    getters: {
        selectedApplication(state) {
            return state.applications.find(app => app.id === state.selectedApplicationId);
        },
        isLoading(state) {
            return state.loading;
        }
    },

    actions: {
        // Action pour récupérer toutes les applications
        async fetchApplications() {
            const messageStore = useMessageStore();  // Déclarez le messageStore ici
            messageStore.clearMessages();  // Maintenant, messageStore sera défini
            this.loading = true;
            try {
                const applications = await getAllApplications();
                this.applications = applications || [];
            } catch (error) {
                messageStore.setErrorMessage('Erreur lors de la récupération des applications');
                console.log(error);
            } finally {
                this.loading = false;
            }
        },

        // Action pour définir l'application sélectionnée
        setSelectedApplicationId(id) {
            this.selectedApplicationId = id;
        },

    }
});


