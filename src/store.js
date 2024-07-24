import {reactive} from "vue";
import {supabase} from "./supabase.js";

const store = reactive({
    applications: [],
    pages: [],
    workflows: [],
    actions: [],
    variables: [],
    objects: [],


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
        store.pages = page;
    },
    async fetchWorkflows() {
        let {data: workflow, error} = await supabase
            .from('workflow')
            .select()
        store.workflows = workflow;
    },

    async fetchObjects() {
        let {data: object, error} = await supabase
            .from('ww_object')
            .select()
        store.objects = object;
    },

    async fetchActions() {
        let {data: action, error} = await supabase
            .from('action')
            .select()
        store.actions = action;
    },

    async fetchVariables() {
        let {data: variable, error} = await supabase
            .from('variable')
            .select()
        store.variables = variable;
    },


});

export default store;