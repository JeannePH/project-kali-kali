import {defineStore} from 'pinia';
import {
    getApplicationVersions,
    getPages,
    getVariables,
    getWorkflows,
    getWwObjects,
    getApplicationAudits
} from '../api/supabaseApi';
import {useMessageStore} from './messages';
import {useAdministrationStore} from "./administration.js";

export const useApplicationStore = defineStore('applicationStore', {
    state: () => ({
        // Données spécifiques à l'application
        pages: [],
        workflows: [],
        wwobjects: [],
        variables: [],
        // Versions et audits
        applicationVersions: [],
        selectedCacheVersion: null,
        applicationAudits: [],
        loading: false,
    }),

    getters: {
        isLoading(state) {
            return state.loading;
        }
    },

    actions: {
        setSelectedApplicationId(id) {
            this.selectedApplicationId = id;
        },

        // Charger toutes les données pour une application sélectionnée
        async fetchAllSelectedApplicationData() {
            const messageStore = useMessageStore();
            try {
                await Promise.all([
                    this.fetchPages(),
                    this.fetchWorkflows(),
                    this.fetchWwObjects(),
                    this.fetchVariables(),
                    this.fetchApplicationVersions(),
                    this.getApplicationAudits()
                ]);
                messageStore.setSuccessMessage('Toutes les données ont été récupérées avec succès.');
            } catch (error) {
                messageStore.setErrorMessage('Erreur lors de la récupération des données');
                console.error(error);
            }
        },

        // Charger les pages
        async fetchPages() {
            const messageStore = useMessageStore();
            const administrationStore = useAdministrationStore();  // Accéder au store d'administration
            messageStore.clearMessages();
            try {
                const pages = await getPages(this.selectedApplicationId);
                if (pages) {
                    this.pages = pages;
                    if (pages.length > 0) {
                        administrationStore.pageKeys = Object.keys(pages[0]);
                        if (administrationStore.selectedPageKeys.length === 0) {
                            administrationStore.selectedPageKeys = [...administrationStore.pageKeys];
                        }
                    }
                    messageStore.setSuccessMessage('Pages récupérées avec succès');
                }
            } catch (error) {
                messageStore.setErrorMessage('Erreur lors de la récupération des pages');
            }
        },

        // Charger les workflows
        async fetchWorkflows() {
            const messageStore = useMessageStore();
            const administrationStore = useAdministrationStore();  // Accéder au store d'administration
            messageStore.clearMessages();
            try {
                const workflows = await getWorkflows(this.selectedApplicationId);
                if (workflows) {
                    this.workflows = workflows;
                    if (workflows.length > 0) {
                        administrationStore.workflowKeys = Object.keys(workflows[0]);
                        if (administrationStore.selectedWorkflowKeys.length === 0) {
                            administrationStore.selectedWorkflowKeys = [...administrationStore.workflowKeys];
                        }
                    }
                    messageStore.setSuccessMessage('Workflows récupérés avec succès');
                }
            } catch (error) {
                messageStore.setErrorMessage('Erreur lors de la récupération des workflows');
            }
        },

        // Charger les objets
        async fetchWwObjects() {
            const messageStore = useMessageStore();
            const administrationStore = useAdministrationStore();  // Accéder au store d'administration
            messageStore.clearMessages();
            try {
                const wwobjects = await getWwObjects(this.selectedApplicationId);
                if (wwobjects) {
                    this.wwobjects = wwobjects;
                    if (wwobjects.length > 0) {
                        administrationStore.wwObjectKeys = Object.keys(wwobjects[0]);
                        if (administrationStore.selectedWwObjectKeys.length === 0) {
                            administrationStore.selectedWwObjectKeys = [...administrationStore.wwObjectKeys];
                        }
                    }
                    messageStore.setSuccessMessage('Objets récupérés avec succès');
                }
            } catch (error) {
                messageStore.setErrorMessage('Erreur lors de la récupération des objets');
            }
        },

        async fetchVariables() {
            const messageStore = useMessageStore();
            const administrationStore = useAdministrationStore();  // Accéder au store d'administration
            messageStore.clearMessages();
            try {
                const variables = await getVariables(this.selectedApplicationId);
                if (variables) {
                    this.variables = variables;
                    if (variables.length > 0) {
                        administrationStore.variableKeys = Object.keys(variables[0]);
                        if (administrationStore.selectedVariableKeys.length === 0) {
                            administrationStore.selectedVariableKeys = [...administrationStore.variableKeys];
                        }
                    }
                    messageStore.setSuccessMessage('Variables récupérées avec succès');
                }
            } catch (error) {
                messageStore.setErrorMessage('Erreur lors de la récupération des variables');
            }
        },

        // Action pour récupérer les versions de l'application sélectionnée
        async fetchApplicationVersions() {
            if (!this.selectedApplicationId) {
                messageStore.setErrorMessage('Aucune application sélectionnée');
                return;
            }
            try {
                const versions = await getApplicationVersions(this.selectedApplicationId);
                this.applicationVersions = versions || [];
                if (versions.length > 0) {
                    this.selectedCacheVersion = versions[0].cache_version;
                }
            } catch (error) {
                messageStore.setErrorMessage('Erreur lors de la récupération des versions');
            }
        },

        // Action pour récupérer les audits de l'application sélectionnée
        async getApplicationAudits() {
            if (!this.selectedApplicationId) {
                messageStore.setErrorMessage('Aucune application sélectionnée');
                return;
            }
            try {
                const audits = await getApplicationAudits(this.selectedApplicationId);
                this.applicationAudits = audits || [];
            } catch (error) {
                messageStore.setErrorMessage('Erreur lors de la récupération des audits');
            }
        },

    }
});


