import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messageStore', {
    state: () => ({
        successMessage: null,
        errorMessage: null,
    }),

    actions: {
        setSuccessMessage(message) {
            this.successMessage = message;
        },

        setErrorMessage(message) {
            this.errorMessage = message;
        },

        clearMessages() {
            this.successMessage = null;
            this.errorMessage = null;
        }
    }
});
