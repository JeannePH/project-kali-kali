import { reactive } from "vue";
import { supabase } from "../../supabase.js";

const state = reactive({
    workflows: [],
    workflowKeys: [],
    selectedWorkflowKeys: [],
});

const mutations = {
    setWorkflows(workflows) {
        state.workflows = workflows;
        if (workflows.length > 0) {
            state.workflowKeys = Object.keys(workflows[0]);
            if (state.selectedWorkflowKeys.length === 0) {
                state.selectedWorkflowKeys = [...state.workflowKeys];
            }
        }
    },
};

const actions = {
    async fetchWorkflows(selectedApplicationId) {
        const { data: workflows, error } = await supabase.from('workflow').select().eq('application_id', selectedApplicationId);
        if (error) {
            console.error('Error fetching workflows:', error);
        } else {
            mutations.setWorkflows(workflows);
        }
    },
};

export default {
    state,
    mutations,
    actions,
};
