import {reactive} from "vue";
import {
    login
} from "./api/supabaseApi.js";

const store = reactive({
    user: null,
    errorMessage: null,

    async login(email, password) {
        try {
            const data = await login(email, password);
            if (data && data.user) {
                this.user = data.user;
                this.errorMessage = null;
            } else {
            }
        } catch (error) {
            this.errorMessage = error.message;
        }
    }
});

export default store;
