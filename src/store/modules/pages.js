import { reactive } from "vue";
import { supabase } from "../../supabase.js";

const state = reactive({
    pages: [],
    pageKeys: [],
    selectedPageKeys: [],
});

const mutations = {
    setPages(pages) {
        state.pages = pages;
        if (pages.length > 0) {
            state.pageKeys = Object.keys(pages[0]);
            if (state.selectedPageKeys.length === 0) {
                state.selectedPageKeys = [...state.pageKeys];
            }
        }
    },
};

const actions = {
    async fetchPages(selectedApplicationId) {
        const { data: pages, error } = await supabase.from('page').select().eq('application_id', selectedApplicationId);
        if (error) {
            console.error('Error fetching pages:', error);
        } else {
            mutations.setPages(pages);
        }
    },
};

export default {
    state,
    mutations,
    actions,
};
