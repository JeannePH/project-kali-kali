import {reactive} from "vue";

const store = reactive({
    applications: [{
        id: 1,
        name: "OCT",
        created_at: 2,
        weweb_id: '',
    }, {
        id: 2,
        name: "DPO",
        created_at: 2,
        weweb_id: '',
    }]
});

export default store;