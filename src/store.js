import {reactive} from "vue";
import {supabase} from "./supabase.js";

const store = reactive({
    applications: [],
    pages: [],

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
    }
});

export default store;