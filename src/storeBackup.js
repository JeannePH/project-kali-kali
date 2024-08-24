import {reactive} from "vue";
import {
    fetchApplications,
    fetchApplicationVersions,
    getApplicationAudits,
    fetchPages,
    fetchWorkflows,
    fetchWwObjects,
    fetchActions,
    fetchVariables,
    login,
    logout,
    fetchUser
} from "./api/supabaseApi.js";

// Création de l'objet réactif qui contiendra l'état global de l'application.
const store = reactive({
    // State
    applications: [],
    pages: [],
    workflows: [],
    wwobjects: [],
    actions: [],
    variables: [],
    selectedApplicationId: null,
    applicationVersions: [],
    selectedCacheVersion: null,
    applicationAudits: [],
    pageKeys: [],
    workflowKeys: [],
    actionKeys: [],
    wwObjectKeys: [],
    variableKeys: [],
    selectedPageKeys: [],
    selectedWorkflowKeys: [],
    selectedActionKeys: [],
    selectedWwObjectKeys: [],
    selectedVariableKeys: [],
    user: null,
    errorMessage: null,

    // Mutations
    setSelectedCacheVersion(version) {
        this.selectedCacheVersion = version;
    },

    // Actions
    async fetchApplications() {
        const applications = await fetchApplications();
        if (applications) {
            this.applications = applications;
        }
    },

    async fetchAllSelectedApplicationData() {
        try {
            await Promise.all([
                this.fetchPages(),
                this.fetchWorkflows(),
                this.fetchWwObjects(),
                this.fetchActions(),
                this.fetchVariables(),
                this.fetchApplicationVersions(),
                this.getApplicationAudits()
            ]);
            console.log('✅ Toutes les données ont été récupérées avec succès.');
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des données :', error);
        }
    },

    async fetchPages() {
        const pages = await fetchPages(this.selectedApplicationId);
        if (pages) {
            this.pages = pages;
            if (pages.length > 0) {
                this.pageKeys = Object.keys(pages[0]);
                if (this.selectedPageKeys.length === 0) {
                    this.selectedPageKeys = [...this.pageKeys];
                }
            }
        }
    },

    async fetchWorkflows() {
        const workflows = await fetchWorkflows(this.selectedApplicationId);
        if (workflows) {
            this.workflows = workflows;
            if (workflows.length > 0) {
                this.workflowKeys = Object.keys(workflows[0]);
                if (this.selectedWorkflowKeys.length === 0) {
                    this.selectedWorkflowKeys = [...this.workflowKeys];
                }
            }
        }
    },

    async fetchWwObjects() {
        const wwobjects = await fetchWwObjects(this.selectedApplicationId);
        if (wwobjects) {
            this.wwobjects = wwobjects;
            if (wwobjects.length > 0) {
                this.wwObjectKeys = Object.keys(wwobjects[0]);
                if (this.selectedWwObjectKeys.length === 0) {
                    this.selectedWwObjectKeys = [...this.wwObjectKeys];
                }
            }
        }
    },

    async fetchActions() {
        const actions = await fetchActions(this.selectedApplicationId);
        if (actions) {
            this.actions = actions;
            if (actions.length > 0) {
                this.actionKeys = Object.keys(actions[0]);
                if (this.selectedActionKeys.length === 0) {
                    this.selectedActionKeys = [...this.actionKeys];
                }
            }
        }
    },

    async fetchVariables() {
        const variables = await fetchVariables(this.selectedApplicationId);
        if (variables) {
            this.variables = variables;
            if (variables.length > 0) {
                this.variableKeys = Object.keys(variables[0]);
                if (this.selectedVariableKeys.length === 0) {
                    this.selectedVariableKeys = [...this.variableKeys];
                }
            }
        }
    },

    async getApplicationAudits() {
        const audits = await getApplicationAudits(this.selectedApplicationId);
        if (audits) {
            this.applicationAudits = audits;
        }
    },

    async fetchApplicationVersions() {
        const versions = await fetchApplicationVersions(this.selectedApplicationId);
        if (versions) {
            this.applicationVersions = versions;
            if (versions.length > 0) {
                this.selectedCacheVersion = versions[0].cache_version;
            }
        }
    },

    setSelectedApplicationId(id) {
        this.selectedApplicationId = id;
    },

    getSelectedApplicationId() {
        return this.selectedApplicationId;
    },

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
    },

    // User Action pour se connecter
    async login(email, password) {
        console.log("store.login appelée avec:", {email, password});
        try {
            const data = await login(email, password);
            if (data && data.user) {
                this.user = data.user;
                this.errorMessage = null;
                console.log("✅ store.login - Connexion réussie:", this.user);
            } else {
                this.errorMessage = "Utilisateur non trouvé dans la réponse de l'API";
                console.log("❌ store.login - Réponse API inattendue:", data);
            }
        } catch (error) {
            this.errorMessage = error.message;
            console.error("❌ store.login - Erreur:", error.message);
        }
    },


    async logout() {
        try {
            await logout();
            this.user = null;
            window.location.href = '/login';
        } catch (error) {
            console.error('❌ store.logout - erreur:', error);
        }
    },

    async fetchUser() {
        this.user = await fetchUser();
        console.log("store.fetchUser - Utilisateur récupéré:", this.user);
    },

    // Mapping types to properties
    typeToProperty: {
        pages: 'selectedPageKeys',
        workflows: 'selectedWorkflowKeys',
        actions: 'selectedActionKeys',
        objects: 'selectedWwObjectKeys',
        variables: 'selectedVariableKeys'
    }
});

export default store;
