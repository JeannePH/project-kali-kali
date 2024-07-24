import {reactive} from "vue";
import {supabase} from "./supabase.js";

const store = reactive({
    applications: [],

    async fetchApplications(){
        let {data: application, error} = await supabase
            .from('application')
            .select()
        store.applications = application;
    }
});

export default store;