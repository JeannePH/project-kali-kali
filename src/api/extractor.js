import {supabase} from "../supabase.js";
import store from "../store.js";

async function processFiles(files, appName) {
    try {
        // 1. Vérifier ou créer l'application
        const appId = await checkOrCreateApplication(appName);
        if (!appId) {
            console.error('❌ Impossible de récupérer ou créer l\'application.');
            store.setErrorMessage('Impossible de récupérer ou créer l\'application.');
            return;
        }

        // 2. Extraire les données des fichiers JSON
        const filesData = await getFiles(files);
        const version = await getVersion(filesData);

        // 3. Vérifier ou créer la version de l'application
        const versionExists = await checkOrCreateVersion(appId, version);
        if (!versionExists) {
            console.error('❌ Impossible de vérifier ou créer la version.');
            store.setErrorMessage('Impossible de vérifier ou créer la version.');
            return;
        }

        // 4. Insérer ou mettre à jour les autres données extraites
        const pageData = await extractAndProcessPages(filesData, appId);
        const {extractedVariables, pageToVariableRelations} = await extractAndProcessVariables(filesData, appId);
        const {extractedWorkflows, pageToWorkflowRelations} = await extractAndStoreProcessedWorkflows(filesData, appId);
        const {extractedWwObjects, pageToWwObjectRelations} = await extractAndProcessWwObjects(filesData, appId);

        // 5. Insérer les données extraites dans les tables respectives
        await upsertData('page', pageData);
        await upsertData('variable', extractedVariables);
        await upsertData('workflow', extractedWorkflows);
        await upsertData('ww_object', extractedWwObjects);
        await upsertData('page_variable', pageToVariableRelations, {onConflict: ['page_id', 'variable_id', 'cache_version']});
        await upsertData('page_workflow', pageToWorkflowRelations);
        await upsertData('page_ww_object', pageToWwObjectRelations);

        console.log('✅ Application et données associées insérées avec succès.');
        store.setSuccessMessage('L\'application et les données associées ont été insérées avec succès.');

    } catch (error) {
        console.log('❌ Erreur : ', error.message);
        store.setErrorMessage(`Erreur lors du traitement des fichiers : ${error.message}`);
    }
}

// Lecture et validation des fichiers JSON
async function getFiles(files) {
    try {
        const filesData = files.map(file => ({
            name: file.name,
            content: file.content
        }));
        return filesData;
    } catch (error) {
        console.log('❌ Erreur : ', error.message);
    }
}

// Insertion ou mise à jour des données dans Supabase
async function upsertData(tableName, data, onConflict) {
    if (data && data.length > 0) {
        const {error} = await supabase
            .from(tableName)
            .upsert(data, onConflict)
            .select();
        if (error) {
            console.log(error.message);
        } else {
            console.log('✅ Données insérées ou mises à jour avec succès dans la table nommée ', tableName);
        }
    } else {
        console.log('❌ Erreur : Aucune donnée à insérer pour la table nommée ' + tableName);
    }
}

// EXTRAIRE VERSION
async function getVersion(files) {
    try {
        let file = files[0];
        if (file.name.endsWith('.json')) {
            let jsonData = file.content;
            console.log('✅ Version extraite');
            return jsonData.cacheVersion;
        } else {
            console.log('❌ Erreur lors de la récupération de la version car le fichier utilisé n\'est pas un json');
        }
    } catch (error) {
        console.log('❌ Erreur : ', error.message);
    }
}

// Fonction pour vérifier ou créer une application
async function checkOrCreateApplication(appName) {
    try {
        // Vérification de l'existence de l'application
        const {data: existingApp, error: errorAppCheck} = await supabase
            .from('application')
            .select('id')
            .eq('name', appName);

        if (errorAppCheck) {
            console.log('❌ Erreur lors de la vérification de l\'application : ', errorAppCheck.message);
            return null;
        }

        if (existingApp && existingApp.length > 0) {
            console.log(`✅ Application existante trouvée avec l'ID : ${existingApp.id}`);
            return existingApp[0].id;
        } else {
            // Création d'une nouvelle application si elle n'existe pas
            const {data: newApp, error: errorAppCreation} = await supabase
                .from('application')
                .insert({
                    name: appName
                })
                .select('id');

            if (errorAppCreation) {
                console.log('❌ Erreur lors de l\'insertion de l\'application : ', errorAppCreation.message);
                return null;
            }
            console.log(`✅ Nouvelle application créée avec l'ID : ${newApp.id}`);
            return newApp[0].id;
        }
    } catch (error) {
        console.log('❌ Erreur dans checkOrCreateApplication : ', error.message);
        return null;
    }
}

// Fonction pour vérifier ou créer une version dans application_version
async function checkOrCreateVersion(appId, version) {
    try {
        const {data: existingVersion, error: errorVersionCheck} = await supabase
            .from('application_version')
            .select('*')
            .eq('application_id', appId)
            .eq('cache_version', version);

        if (errorVersionCheck) {
            console.log('❌ Erreur lors de la vérification de la version : ', errorVersionCheck.message);
            return false;
        }

        if (existingVersion) {
            console.log(`✅ Version trouvée pour l'application ID : ${appId}, version : ${version}`);
            return true;
        } else {
            const {error: errorVersionInsert} = await supabase
                .from('application_version')
                .insert({
                    application_id: appId,
                    cache_version: version
                });

            if (errorVersionInsert) {
                console.log('❌ Erreur lors de l\'insertion de la nouvelle version : ', errorVersionInsert.message);
                return false;
            }
            console.log(`✅ Nouvelle version insérée pour l'application ID : ${appId}, version : ${version}`);
            return true;
        }
    } catch (error) {
        console.log('❌ Erreur dans checkOrCreateVersion : ', error.message);
        return false;
    }
}

// EXTRAIRE PAGES
async function extractAndProcessPages(files, appId) {
    let extractedPage = [];
    try {
        for (let file of files) {
            let jsonData = file.content;
            let page = jsonData.page;
            if (page) {
                extractedPage.push({
                    weweb_id: page.id,
                    cache_version: jsonData.cacheVersion,
                    link_id: page.linkId,
                    paths: page.paths,
                    name: page.name,
                    category: page.category,
                    meta: page.meta,
                    title: page.title,
                    favicon: page.favicon,
                    meta_image: page.metaImage,
                    langs: page.langs,
                    hide_from_sitemap: page.hideFromSitemap,
                    head_scripts: page.headScripts,
                    body_scripts: page.bodyScripts,
                    cms_data_set_path: page.cmsDataSetPath,
                    workflows: page.workflows,
                    folder: page.folder,
                    ww_updated_at: page.updatedAt,
                    page_user_groups: page.pageUserGroups,
                    sections: page.sections,
                    scripts: page.scripts,
                    application_id: appId
                });
            }
        }
        console.log('✅ Données des pages extraites');
    } catch (error) {
        console.log('❌ Erreur : ', error.message);
    }
    return extractedPage;
}

// EXTRAIRE VARIABLES
async function extractAndProcessVariables(files, appId) {
    let extractedVariables = [];
    let pageToVariableRelations = [];
    try {
        for (let file of files) {
            let jsonData = file.content;
            if (jsonData.variables && Array.isArray(jsonData.variables)) {
                jsonData.variables.forEach(variable => {
                    if (!extractedVariables.some(v => v.weweb_id == variable.id)) {
                        extractedVariables.push({
                            weweb_id: variable.id,
                            cache_version: jsonData.cacheVersion,
                            design_id: variable.designId,
                            name: variable.name,
                            type: variable.type,
                            value: variable.value,
                            is_local_storage: Boolean(variable.isLocalStorage),
                            is_persistent_on_nav: Boolean(variable.isPersistentOnNav),
                            folder: variable.folder,
                            ww_created_at: variable.createdAt,
                            ww_updated_at: variable.updatedAt,
                            application_id: appId
                        });
                    }
                });
                pageToVariableRelations = await removeDuplicateFromPageToItemRelations(
                    pageToVariableRelations.concat(await createPageToItemRelation(
                        jsonData.page.id, jsonData.variables, 'page_id', 'variable_id', jsonData.cacheVersion, appId)), 'page_id', "variable_id");
            } else {
                console.log('Aucun identifiant de page trouvé dans le fichier : ', file.name);
            }
        }
        console.log('✅ Données des variables extraites');
    } catch (error) {
        console.log('❌ Erreur : ', error.message);
    }
    return {extractedVariables, pageToVariableRelations};
}

// EXTRAIRE OBJECTS
async function extractAndProcessWwObjects(files, appId) {
    let extractedWwObjects = [];
    let pageToWwObjectRelations = [];
    try {
        for (let file of files) {
            let jsonData = file.content;
            if (jsonData.wwObjects && typeof jsonData.wwObjects === 'object' && !Array.isArray(jsonData.wwObjects)) {
                for (const key in jsonData.wwObjects) {
                    const wwObject = jsonData.wwObjects[key];
                    if (!extractedWwObjects.some(wf => wf.weweb_id == wwObject.uid)) {
                        extractedWwObjects.push({
                            weweb_id: wwObject.uid,
                            cache_version: jsonData.cacheVersion,
                            name: wwObject.name,
                            ww_object_base_id: wwObject.wwObjectBaseId,
                            library_component_base_id: wwObject.libraryComponentBaseId,
                            parent_section_id: wwObject.parentSectionId,
                            parent_library_component_id: wwObject.parentLibraryComponentId,
                            application_id: appId
                        });
                    }
                }
                let wwObjectArray = Object.values(jsonData.wwObjects);
                pageToWwObjectRelations = await removeDuplicateFromPageToItemRelations(pageToWwObjectRelations.concat(await createPageToItemRelation(jsonData.page.id, wwObjectArray, 'page_id', 'ww_object_id', jsonData.cacheVersion, appId)), 'page_id', "ww_object_id");
            } else {
                console.log('❌ Erreur : aucun wwObject trouvé dans le fichier ' + file.name);
            }
        }
        console.log('✅ Données des ww_objects extraites');
    } catch (error) {
        console.log('❌ Erreur : ', error.message);
    }
    return {extractedWwObjects, pageToWwObjectRelations};
}

// EXTRAIRE WORKFLOW
async function extractAndStoreProcessedWorkflows(files, appId) {
    let extractedWorkflows = [];
    let pageToWorkflowRelations = [];
    try {
        for (let file of files) {
            let jsonData = file.content;
            let allInteractionsFromComponents = Object.values(jsonData.wwObjects).reduce((interactionsArray, obj) => {
                if (obj._state && obj._state.interactions) {
                    return interactionsArray.concat(obj._state.interactions);
                }
                return interactionsArray;
            }, []);
            let allInteractionsFromSections = Object.values(jsonData.sections).reduce((interactionsArray, obj) => {
                if (obj._state && obj._state.interactions) {
                    return interactionsArray.concat(obj._state.interactions);
                }
                return interactionsArray;
            }, []);
            ({
                extractedWorkflows,
                pageToWorkflowRelations
            } = await processWorkflowsByType(jsonData.workflows, extractedWorkflows, pageToWorkflowRelations, jsonData, 'GLOBAL', appId));
            ({
                extractedWorkflows,
                pageToWorkflowRelations
            } = await processWorkflowsByType(jsonData.page.workflows, extractedWorkflows, pageToWorkflowRelations, jsonData, 'PAGE', appId));
            ({
                extractedWorkflows,
                pageToWorkflowRelations
            } = await processWorkflowsByType(allInteractionsFromSections, extractedWorkflows, pageToWorkflowRelations, jsonData, 'SECTION', appId));
            ({
                extractedWorkflows,
                pageToWorkflowRelations
            } = await processWorkflowsByType(allInteractionsFromComponents, extractedWorkflows, pageToWorkflowRelations, jsonData, 'COMPONENT', appId));
        }
        console.log('✅ Données des workflows extraites');
    } catch (error) {
        console.log('❌ Erreur :', error.message);
    }
    return {extractedWorkflows, pageToWorkflowRelations};
}

// EXTRAIRE WORKFLOW (suite)
async function processWorkflowsByType(data, extractedWorkflows, pageToWorkflowRelations, jsonData, workflowContextType, appId) {
    if (data && Array.isArray(data)) {
        data.forEach(workflow => {
            if (!extractedWorkflows.some(wf => wf.weweb_id == workflow.id)) {
                extractedWorkflows.push({
                    weweb_id: workflow.id,
                    cache_version: jsonData.cacheVersion,
                    design_id: workflow.designId,
                    name: workflow.name,
                    trigger: workflow.trigger,
                    parameters: workflow.parameters,
                    actions: workflow.actions,
                    folder: workflow.folder,
                    first_action: workflow.firstAction,
                    first_error_action: workflow.firstErrorAction,
                    ww_created_at: workflow.createdAt,
                    ww_updated_at: workflow.updatedAt,
                    _vts: workflow._vts,
                    is_trusted: workflow.isTrusted,
                    application_id: appId,
                    type: workflowContextType
                });
            }
        });
        pageToWorkflowRelations = await removeDuplicateFromPageToItemRelations(
            pageToWorkflowRelations.concat(await createPageToItemRelation(
                jsonData.page.id, data, 'page_id', 'workflow_id', jsonData.cacheVersion, appId)), 'page_id', 'workflow_id');
    }
    return {extractedWorkflows, pageToWorkflowRelations};
}

// UTILITAIRES : Création des relations avec la page du fichier json traité
async function createPageToItemRelation(pageId, items, pageKeyColumnName, itemKeyColumnName, cache_version, appId) {
    let pageToItemRelation = {};
    return items.map(item => {
        const idOrUid = item.id || item.uid;
        pageToItemRelation = {
            [pageKeyColumnName]: pageId,
            [itemKeyColumnName]: idOrUid,
            cache_version: cache_version,
            application_id: appId,
        };
        return pageToItemRelation;
    });
}

// UTILITAIRES : Suppression des doublons
async function removeDuplicateFromPageToItemRelations(data, pageId, itemId) {
    const uniqueEntriesPageToItemRelations = new Map();
    data.forEach(entry => {
        const key = `${entry[pageId]}-${entry[itemId]}-${entry.cache_version}`;
        if (!uniqueEntriesPageToItemRelations.has(key)) {
            uniqueEntriesPageToItemRelations.set(key, entry);
        }
    });
    return Array.from(uniqueEntriesPageToItemRelations.values());
}

export {processFiles};
