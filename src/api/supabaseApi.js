import { supabase } from "../supabase.js";

// Applications API
export const fetchApplications = async () => {
    let { data: applications, error } = await supabase
        .from('application')
        .select();
    if (error) {
        console.error('Error fetching applications:', error);
    }
    return applications;
};

export const fetchApplicationVersions = async (selectedApplicationId) => {
    let { data: versions, error } = await supabase
        .from('application_version')
        .select('*')
        .eq('application_id', selectedApplicationId);
    if (error) {
        console.error('Error fetching application versions:', error);
    }
    return versions;
};

export const getApplicationAudits = async (selectedApplicationId) => {
    let { data: audits, error } = await supabase
        .from('audit')
        .select("*")
        .eq('application_id', selectedApplicationId);
    if (error) {
        console.error('Error fetching audits:', error);
    }
    return audits;
};

// Pages API
export const fetchPages = async (selectedApplicationId) => {
    let { data: pages, error } = await supabase
        .from('page')
        .select()
        .eq('application_id', selectedApplicationId);
    if (error) {
        console.error('Error fetching pages:', error);
    }
    return pages;
};

// Workflows API
export const fetchWorkflows = async (selectedApplicationId) => {
    let { data: workflows, error } = await supabase
        .from('workflow')
        .select()
        .eq('application_id', selectedApplicationId);
    if (error) {
        console.error('Error fetching workflows:', error);
    }
    return workflows;
};

// WWObjects API
export const fetchWwObjects = async (selectedApplicationId) => {
    let { data: objects, error } = await supabase
        .from('ww_object')
        .select()
        .eq('application_id', selectedApplicationId);
    if (error) {
        console.error('Error fetching wwobjects:', error);
    }
    return objects;
};

// Actions API
export const fetchActions = async (selectedApplicationId) => {
    let { data: actions, error } = await supabase
        .from('action')
        .select()
        .eq('application_id', selectedApplicationId);
    if (error) {
        console.error('Error fetching actions:', error);
    }
    return actions;
};

// Variables API
export const fetchVariables = async (selectedApplicationId) => {
    let { data: variables, error } = await supabase
        .from('variable')
        .select()
        .eq('application_id', selectedApplicationId);
    if (error) {
        console.error('Error fetching variables:', error);
    }
    return variables;
};

// Fonction de login
export const login = async (email, password) => {
    console.log("API login appelée avec:", { email, password });

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    console.log("Réponse brute de l'API login:", { data, error });

    if (error) {
        console.error('Erreur lors de la connexion via API:', error.message);
        throw error;
    }

    return data;
};

// Fonction de logout
export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Erreur lors de la déconnexion via API:', error.message);
        throw error;
    }
};

// Fonction pour récupérer l'utilisateur connecté
export const fetchUser = () => {
    console.log("Utilisateur récupéré:", user);
    return supabase.auth.getUser();
};



// Ajouter une application
