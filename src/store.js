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
        }
    },

    async fetchWorkflows() {
        let {data: workflow, error} = await supabase
            .from('workflow')
            .select()
            .eq('application_id', store.selectedApplicationId);
        store.workflows = workflow;
        if (error) {
            console.error('❌ Erreur lors de la récupération des workflows:', error);
        } else {
            console.log('✅ Tout les workflows de cette application :', workflow);
        }
    },

    async fetchObjects() {
        let {data: object, error} = await supabase
            .from('ww_object')
            .select()
            .eq('application_id', store.selectedApplicationId);
        store.objects = object;
        if (error) {
            console.error('❌ Erreur lors de la récupération des ww_object:', error);
        } else {
            console.log('✅ Tout les ww_object de cette application :', object);
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
        store.variables = variable;
        if (error) {
            console.error('❌ Erreur lors de la récupération des variables:', error);
        } else {
            console.log('✅ Toutes les variables de cette application :', variable);
        }
    },

    // Méthode pour mettre à jour l'ID de l'application sélectionnée
    setSelectedApplicationId(id) {
        store.selectedApplicationId = id;
    },

    // Méthode pour récupérer l'ID de l'application sélectionnée
    getSelectedApplicationId() {
        return store.selectedApplicationId;
    }

});

export default store;