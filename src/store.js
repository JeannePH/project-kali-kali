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
        store.applications = application;
    },

    async fetchPages() {
        let {data: page, error} = await supabase
            .from('page')
            .select()
            .eq('application_id', store.selectedApplicationId);
        store.pages = page;
        if (error) {
            console.error(error);
            store.pages = page;
        } else {
            console.log(page);
        }
    },

    async fetchWorkflows() {
        let {data: workflow, error} = await supabase
            .from('workflow')
            .select()
            .eq('application_id', store.selectedApplicationId);
        store.workflows = workflow;
        if (error) {
            console.error(error);
            store.pages = workflow;
        } else {
            console.log(workflow);
        }
    },

    async fetchObjects() {
        let {data: object, error} = await supabase
            .from('ww_object')
            .select()
            .eq('application_id', store.selectedApplicationId);
        store.objects = object;
        if (error) {
            console.error(error);
            store.pages = object;
        } else {
            console.log(object);
        }
    },

    async fetchActions() {
        let {data: action, error} = await supabase
            .from('action')
            .select()
            .eq('application_id', store.selectedApplicationId);
        store.actions = action;
        if (error) {
            console.error(error);
            store.pages = action;
        } else {
            console.log(action);
        }
    },

    async fetchVariables() {
        let {data: variable, error} = await supabase
            .from('variable')
            .select()
            .eq('application_id', store.selectedApplicationId);
        store.variables = variable;
        if (error) {
            console.error(error);
            store.pages = variable;
        } else {
            console.log(variable);
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