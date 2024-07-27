import {reactive} from "vue";
import {supabase} from "./supabase.js";

const store = reactive({
    // Données
    applications: [],
    pages: [],
    workflows: [],
    wwobjects: [],
    actions: [],
    variables: [],

    selectedApplicationId: null, // Propriété pour l'ID sélectionné

    // Clés des colonnes disponibles
    pageKeys: [],
    workflowKeys: [],
    actionKeys: [],
    wwObjectKeys: [],
    variableKeys: [],

    // Clés des colonnes sélectionnées (par défaut toutes les clés)
    selectedPageKeys: [],
    selectedWorkflowKeys: [],
    selectedActionKeys: [],
    selectedWwObjectKeys: [],
    selectedVariableKeys: [],

    // Mapping des types de données aux propriétés du store
    typeToProperty: {
        pages: 'selectedPageKeys',
        workflows: 'selectedWorkflowKeys',
        actions: 'selectedActionKeys',
        objects: 'selectedWwObjectKeys',
        variables: 'selectedVariableKeys'
    },

    async fetchApplications() {
        let {data: application, error} = await supabase
            .from('application')
            .select()
        if (error) {
            console.error('❌ Erreur lors de la récupération des applications:', error);
        } else {
            console.log('✅ Toutes les applications :', application);
            store.applications = application;
        }
    },

    async fetchPages() {
        let {data: page, error} = await supabase
            .from('page')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des pages:', error);
        } else {
            console.log('✅ Toutes les pages de cette application :', page);
            store.pages = page;
            if (page.length > 0) {
                store.pageKeys = Object.keys(page[0]);
            }
            // Charger les colonnes sélectionnées depuis localStorage si pas déjà définies
            if (store.selectedPageKeys.length === 0) {
                store.selectedPageKeys = [...store.pageKeys]; // Par défaut toutes les clés sont sélectionnées
            }
        }
    },

    async fetchWorkflows() {
        let {data: workflow, error} = await supabase
            .from('workflow')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des workflows:', error);
        } else {
            console.log('✅ Tout les workflows de cette application :', workflow);
            store.workflows = workflow;
            if (workflow.length > 0) {
                store.workflowKeys = Object.keys(workflow[0]);
            }
            // Charger les colonnes sélectionnées depuis localStorage si pas déjà définies
            if (store.selectedWorkflowKeys.length === 0) {
                store.selectedWorkflowKeys = [...store.workflowKeys]; // Par défaut toutes les clés sont sélectionnées
            }
        }
    },

    async fetchWwObjects() {
        let {data: object, error} = await supabase
            .from('ww_object')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des ww_object:', error);
        } else {
            console.log('✅ Tout les ww_object de cette application :', object);
            store.wwobjects = object;
            if (object.length > 0) {
                store.wwObjectKeys = Object.keys(object[0]);
            }
            // Charger les colonnes sélectionnées depuis localStorage si pas déjà définies
            if (store.selectedWwObjectKeys.length === 0) {
                store.selectedWwObjectKeys = [...store.wwObjectKeys]; // Par défaut toutes les clés sont sélectionnées
            }
        }
    },

    async fetchActions() {
        let {data: action, error} = await supabase
            .from('action')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des actions:', error);
        } else {
            console.log('✅ Toutes les actions de cette application :', action);
            store.actions = action;
            if (action.length > 0) {
                store.actionKeys = Object.keys(action[0]);
            }
            // Charger les colonnes sélectionnées depuis localStorage si pas déjà définies
            if (store.selectedActionKeys.length === 0) {
                store.selectedActionKeys = [...store.actionKeys]; // Par défaut toutes les clés sont sélectionnées
            }
        }
    },

    async fetchVariables() {
        let {data: variable, error} = await supabase
            .from('variable')
            .select()
            .eq('application_id', store.selectedApplicationId);
        if (error) {
            console.error('❌ Erreur lors de la récupération des variables:', error);
        } else {
            console.log('✅ Toutes les variables de cette application :', variable);
            store.variables = variable;
            if (variable.length > 0) {
                store.variableKeys = Object.keys(variable[0]);
            }
            // Charger les colonnes sélectionnées depuis localStorage si pas déjà définies
            if (store.selectedVariableKeys.length === 0) {
                store.selectedVariableKeys = [...store.variableKeys]; // Par défaut toutes les clés sont sélectionnées
            }
        }
    },

    // Méthode pour mettre à jour l'ID de l'application sélectionnée
    setSelectedApplicationId(id) {
        store.selectedApplicationId = id;
    },

    // Méthode pour récupérer l'ID de l'application sélectionnée
    getSelectedApplicationId() {
        return store.selectedApplicationId;
    },

    // Nouvelle méthode pour récupérer toutes les données en parallèle
    async fetchAllSelectedApplicationData() {
        try {
            await Promise.all([
                this.fetchPages(),
                this.fetchWorkflows(),
                this.fetchWwObjects(),
                this.fetchActions(),
                this.fetchVariables()
            ]);
            console.log('✅ Toutes les données ont été récupérées avec succès.');
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des données:', error);
        }
    },

    // Méthode pour mettre à jour les colonnes sélectionnées
    setSelectedColumns(type, columns) {
        const propertyName = this.typeToProperty[type];
        if (propertyName) {
            this[propertyName] = columns;
            // Sauvegarder dans localStorage (optionnel)
            localStorage.setItem(propertyName, JSON.stringify(columns));
            console.log(`Saved columns for ${type}:`, columns);
        } else {
            console.error(`Type de données inconnu : ${type}`);
        }
    },

    loadSelectedColumns() {
        Object.keys(this.typeToProperty).forEach(type => {
            const propertyName = this.typeToProperty[type];
            const storedColumns = localStorage.getItem(propertyName);
            if (storedColumns) {
                this[propertyName] = JSON.parse(storedColumns);
                console.log(`Loaded stored columns for ${type}:`, this[propertyName]);
            } else {
                this[propertyName] = []; // Initialiser à un tableau vide si aucune sélection n'est trouvée
            }
        });
    }
});


export default store;