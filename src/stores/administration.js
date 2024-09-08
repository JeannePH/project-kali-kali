import {defineStore} from 'pinia';

export const useAdministrationStore = defineStore('administrationStore', {
    state: () => ({
        pageKeys: [],
        workflowKeys: [],
        wwObjectKeys: [],
        variableKeys: [],
        selectedPageKeys: [],
        selectedWorkflowKeys: [],
        selectedWwObjectKeys: [],
        selectedVariableKeys: [],

        // Mapping types to properties
        typeToProperty: {
            pages: 'selectedPageKeys',
            workflows: 'selectedWorkflowKeys',
            objects: 'selectedWwObjectKeys',
            variables: 'selectedVariableKeys'
        },
    }),

    actions: {
        // Setter for selected columns
        setSelectedColumns(type, columns) {
            const propertyName = this.typeToProperty[type];
            if (propertyName) {
                this[propertyName] = columns;
                localStorage.setItem(propertyName, JSON.stringify(columns));
                console.log(`✅ Saved columns for ${type}:`, columns);
            } else {
                console.error(`❌ Unknown data type: ${type}`);
            }
        },

        // Load columns from localStorage
        loadSelectedColumns() {
            Object.keys(this.typeToProperty).forEach(type => {
                const propertyName = this.typeToProperty[type];
                const storedColumns = localStorage.getItem(propertyName);
                if (storedColumns) {
                    this[propertyName] = JSON.parse(storedColumns);
                    console.log(`✅ Loaded stored columns for ${type}:`, this[propertyName]);
                } else {
                    this[propertyName] = [];
                }
            });
        }
    }
});