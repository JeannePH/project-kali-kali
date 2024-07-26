import {reactive} from "vue";
import {supabase} from "./supabase.js";

const store = reactive({
    applications: [],
    pages: [],
    workflows: [],
    objects: [],
    actions: [],
    variables: [],
    selectedApplicationId: null, // Propriété pour l'ID sélectionné
    pageKeys: [],
    workflowKeys: [],
    actionKeys: [],
    wwObjectKeys: [],
    variableKeys: [],

    async fetchApplications() {
        let {data: application, error} = await supabase
            .from('application')
            .select()
        if (error) {
            console.error('❌ Erreur lors de la récupération des applications:', error);
        } else {
            console.log('✅ Toutes les applications :', application);
            store.applications = application;
        }
    },

    async fetchPages() {
        let {data: page, error} = await supabase
            .from('page')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des pages:', error);
        } else {
            console.log('✅ Toutes les pages de cette application :', page);
            store.pages = page;
            if (page.length > 0) {
                store.pageKeys = Object.keys(page[0]);
            }
        }
    },

    async fetchWorkflows() {
        let {data: workflow, error} = await supabase
            .from('workflow')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des workflows:', error);
        } else {
            console.log('✅ Tout les workflows de cette application :', workflow);
            store.workflows = workflow;
            if (workflow.length > 0) {
                store.workflowKeys = Object.keys(workflow[0]);
            }
        }
    },

    async fetchObjects() {
        let {data: object, error} = await supabase
            .from('ww_object')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des ww_object:', error);
        } else {
            console.log('✅ Tout les ww_object de cette application :', object);
            store.objects = object;
            if (object.length > 0) {
                store.wwObjectKeys = Object.keys(object[0]);
            }
        }
    },

    async fetchActions() {
        let {data: action, error} = await supabase
            .from('action')
            .select()
            .eq('application_id', store.selectedApplicationId);
        store.actions = action;
        if (error) {
            console.error('❌ Erreur lors de la récupération des actions:', error);
        } else {
            console.log('✅ Toutes les actions de cette application :', action);
        }
    },

    async fetchVariables() {
        let {data: variable, error} = await supabase
            .from('variable')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des variables:', error);
        } else {
            console.log('✅ Toutes les variables de cette application :', variable);
            store.variables = variable;
            if (variable.length > 0) {
                store.variableKeys = Object.keys(variable[0]);
            }
        }
    },

    // Méthode pour mettre à jour l'ID de l'application sélectionnée
    setSelectedApplicationId(id) {
        store.selectedApplicationId = id;
    },

    // Méthode pour récupérer l'ID de l'application sélectionnée
    getSelectedApplicationId() {
        return store.selectedApplicationId;
    },

    // Nouvelle méthode pour récupérer toutes les données en parallèle
    async fetchAllSelectedApplicationData() {
        try {
            await Promise.all([
                this.fetchPages(),
                this.fetchWorkflows(),
                this.fetchObjects(),
                this.fetchActions(),
                this.fetchVariables()
            ]);
            console.log('✅ Toutes les données ont été récupérées avec succès.');
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des données:', error);
        }
    }
});

export default store;