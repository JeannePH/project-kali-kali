import { reactive } from "vue";
import { supabase } from "../../supabase.js";

const state = reactive({
    applications: [],
    selectedApplicationId: null,
    applicationVersions: [],
    selectedCacheVersion: null,
    applicationAudits: [],
});

const mutations = {
    setApplications(applications) {
        state.applications = applications;
    },
    setSelectedApplicationId(id) {
        state.selectedApplicationId = id;
    },
    setApplicationVersions(versions) {
        state.applicationVersions = versions;
    },
    setSelectedCacheVersion(version) {
        state.selectedCacheVersion = version;
    },
    setApplicationAudits(audits) {
        state.applicationAudits = audits;
    },
};

const actions = {
    async fetchApplications() {
        const { data: applications, error } = await supabase.from('application').select();
        if (error) {
            console.error('Error fetching applications:', error);
        } else {
            mutations.setApplications(applications);
        }
    },
    async fetchApplicationVersions(selectedApplicationId) {
        const { data: versions, error } = await supabase.from('application_version').select().eq('application_id', selectedApplicationId);
        if (error) {
            console.error('Error fetching application versions:', error);
        } else {
            mutations.setApplicationVersions(versions);
            if (versions.length > 0) {
                mutations.setSelectedCacheVersion(versions[0].cache_version);
            }
        }
    },
    async getApplicationAudits() {
        const { data: audits, error } = await supabase.from('audit').select("*").eq('application_id', state.selectedApplicationId);
        if (error) {
            console.error('Error fetching audits:', error);
        } else {
            mutations.setApplicationAudits(audits);
        }
    },
};

export default {
    state,
    mutations,
    actions,
};
