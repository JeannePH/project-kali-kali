import { supabase } from "../supabase.js";

async function processFiles(files, appName, wewebId) {
    try {
        // 1. Créer l'application et récupérer l'ID généré automatiquement
        const { data: newApp, error: insertAppError } = await supabase
            .from('application')
            .insert({
                name: appName,
                weweb_id: wewebId
            })
            .select('id')
            .single();

        if (insertAppError) {
            throw new Error('Erreur lors de l\'insertion de l\'application : ' + insertAppError.message);
        }

        const appId = newApp.id;

        // 2. Extraire les données des fichiers JSON
        const filesData = await getFiles(files);
        const version = await getVersion(filesData);
        const pageData = await getPageData(filesData, appId);
        const { extractedVariableData, dataPageVariable } = await getVariableData(filesData, appId);
        const { extractedWorkflowData, dataPageWorkflow } = await getWorkflowData(filesData, appId);
        const { extractedWwObjectData, dataPageWwObject } = await getWwObjectData(filesData, appId);
        const extractedActionData = await getActionData(filesData, appId);

        // 3. Insérer les données extraites dans les tables respectives
        await upsertData('application_version', [{ application_id: appId, cache_version: version }]);
        await upsertData('page', pageData);
        await upsertData('variable', extractedVariableData);
        await upsertData('workflow', extractedWorkflowData);
        await upsertData('ww_object', extractedWwObjectData);
        await upsertData('action', extractedActionData);
        await upsertData('page_variable', dataPageVariable, { onConflict: ['page_id', 'variable_id', 'cache_version'] });
        await upsertData('page_workflow', dataPageWorkflow);
        await upsertData('page_ww_object', dataPageWwObject);

        console.log('Application et données associées insérées avec succès.');
    } catch (error) {
        logError(error.message);
    }
}

function logError(message) {
    console.log('❌ Erreur :', message);
}

async function getFiles(files) {
    try {
        const filesData = files.map(file => ({
            name: file.name,
            content: file.content
        }));
        return filesData;
    } catch (error) {
        logError(error);
    }
}

async function upsertData(table, data, onConflict) {
    if (data && data.length > 0) {
        const { error } = await supabase
            .from(table)
            .upsert(data, onConflict)
            .select();
        if (error) {
            logError(error.message);
        } else {
            console.log('✅ Données insérées ou mises à jour avec succès dans la table : ', table);
        }
    } else {
        logError('Aucune donnée à insérer pour la table : ' + table);
    }
}

// EXTRAIRE PAGES
async function getPageData(files, appId) {
    let extractedData = [];
    try {
        for (let file of files) {
            let jsonData = file.content;
            let pageData = jsonData.page;
            if (pageData) {
                extractedData.push({
                    weweb_id: pageData.id,
                    cache_version: jsonData.cacheVersion,
                    link_id: pageData.linkId,
                    paths: pageData.paths,
                    name: pageData.name,
                    category: pageData.category,
                    meta: pageData.meta,
                    title: pageData.title,
                    favicon: pageData.favicon,
                    meta_image: pageData.metaImage,
                    langs: pageData.langs,
                    hide_from_sitemap: pageData.hideFromSitemap,
                    head_scripts: pageData.headScripts,
                    body_scripts: pageData.bodyScripts,
                    cms_data_set_path: pageData.cmsDataSetPath,
                    workflows: pageData.workflows,
                    folder: pageData.folder,
                    ww_updated_at: pageData.updatedAt,
                    page_user_groups: pageData.pageUserGroups,
                    sections: pageData.sections,
                    scripts: pageData.scripts,
                    application_id: appId // Application ID
                });
            }
        }
        console.log('✅ Données des pages extraites');
    } catch (error) {
        logError(error);
    }
    return extractedData;
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
            logError("Problème lors de la récupération de la version car le fichier utilisé n'est pas un json");
        }
    } catch (error) {
        logError(error);
    }
}

// EXTRAIRE VARIABLES
async function getVariableData(files, appId) {
    let extractedVariableData = [];
    let dataPageVariable = [];
    try {
        for (let file of files) {
            let jsonData = file.content;
            if (jsonData.variables && Array.isArray(jsonData.variables)) {
                jsonData.variables.forEach(variableData => {
                    if (!extractedVariableData.some(v => v.weweb_id == variableData.id)) {
                        extractedVariableData.push({
                            weweb_id: variableData.id,
                            cache_version: jsonData.cacheVersion,
                            design_id: variableData.designId,
                            name: variableData.name,
                            type: variableData.type,
                            value: variableData.value,
                            is_local_storage: Boolean(variableData.isLocalStorage),
                            is_persistent_on_nav: Boolean(variableData.isPersistentOnNav),
                            folder: variableData.folder,
                            ww_created_at: variableData.createdAt,
                            ww_updated_at: variableData.updatedAt,
                            application_id: appId
                        });
                    }
                });
                let variableRelations = await createRelations(jsonData.page.id, jsonData.variables, 'page_id', 'variable_id', jsonData.cacheVersion, appId);
                dataPageVariable = dataPageVariable.concat(variableRelations);
            } else {
                console.log('Aucun identifiant de page trouvé dans le fichier : ', file.name);
            }
        }
        console.log('✅ Données des variables extraites');
    } catch (error) {
        logError(error);
    }
    dataPageVariable = await getUniqueData(dataPageVariable, 'page_id', "variable_id");
    return { extractedVariableData, dataPageVariable };
}

// EXTRAIRE WORKFLOW
async function getWorkflowData(files, appId) {
    let extractedWorkflowData = [];
    let dataPageWorkflow = [];
    try {
        for (let file of files) {
            let jsonData = file.content;

            let allInteractionsFromComponents = Object.values(jsonData.wwObjects).reduce((accumulator, obj) => {
                if (obj._state && obj._state.interactions) {
                    return accumulator.concat(obj._state.interactions);
                }
                return accumulator;
            }, []);

            let allInteractionsFromSections = Object.values(jsonData.sections).reduce((accumulator, obj) => {
                if (obj._state && obj._state.interactions) {
                    return accumulator.concat(obj._state.interactions);
                }
                return accumulator;
            }, []);

            ({
                extractedWorkflowData,
                dataPageWorkflow
            } = await getExtractedWorkflowData(jsonData.workflows, extractedWorkflowData, dataPageWorkflow, jsonData, 'GLOBAL', appId));
            ({
                extractedWorkflowData,
                dataPageWorkflow
            } = await getExtractedWorkflowData(jsonData.page.workflows, extractedWorkflowData, dataPageWorkflow, jsonData, 'PAGE', appId));
            ({
                extractedWorkflowData,
                dataPageWorkflow
            } = await getExtractedWorkflowData(allInteractionsFromSections, extractedWorkflowData, dataPageWorkflow, jsonData, 'SECTION', appId));
            ({
                extractedWorkflowData,
                dataPageWorkflow
            } = await getExtractedWorkflowData(allInteractionsFromComponents, extractedWorkflowData, dataPageWorkflow, jsonData, 'COMPONENT', appId));
        }
        console.log('✅ Données des workflows extraites');
    } catch (error) {
        logError(error);
    }
    dataPageWorkflow = await getUniqueData(dataPageWorkflow, 'page_id', "workflow_id");
    return { extractedWorkflowData, dataPageWorkflow };
}

// EXTRAIRE WORKFLOW (suite)
async function getExtractedWorkflowData(data, extractedWorkflowData, dataPageWorkflow, jsonData, type, appId) {
    if (data && Array.isArray(data)) {
        data.forEach(workflowData => {
            if (!extractedWorkflowData.some(wf => wf.weweb_id == workflowData.id)) {
                extractedWorkflowData.push({
                    weweb_id: workflowData.id,
                    cache_version: jsonData.cacheVersion,
                    design_id: workflowData.designId,
                    name: workflowData.name,
                    trigger: workflowData.trigger,
                    parameters: workflowData.parameters,
                    actions: workflowData.actions,
                    folder: workflowData.folder,
                    first_action: workflowData.firstAction,
                    first_error_action: workflowData.firstErrorAction,
                    ww_created_at: workflowData.createdAt,
                    ww_updated_at: workflowData.updatedAt,
                    _vts: workflowData._vts,
                    is_trusted: workflowData.isTrusted,
                    application_id: appId,
                    type: type
                });
            }
        });
        let workflowRelations = await createRelations(jsonData.page.id, data, 'page_id', 'workflow_id', jsonData.cacheVersion, appId);
        dataPageWorkflow = dataPageWorkflow.concat(workflowRelations);
    }
    return { extractedWorkflowData, dataPageWorkflow };
}

// EXTRAIRE ACTIONS
async function getActionData(files, appId) {
    let extractedActionData = [];
    try {
        for (let file of files) {
            if (file.name.endsWith('.json')) {
                let jsonData = file.content;

                let allInteractionsFromComponents = Object.values(jsonData.wwObjects).reduce((accumulator, obj) => {
                    if (obj._state && obj._state.interactions) {
                        return accumulator.concat(obj._state.interactions);
                    }
                    return accumulator;
                }, []);

                let allInteractionsFromSections = Object.values(jsonData.sections).reduce((accumulator, obj) => {
                    if (obj._state && obj._state.interactions) {
                        return accumulator.concat(obj._state.interactions);
                    }
                    return accumulator;
                }, []);

                extractedActionData = await getExtractedActionData(jsonData.workflows, extractedActionData, jsonData, appId);
                extractedActionData = await getExtractedActionData(jsonData.page.workflows, extractedActionData, jsonData, appId);
                extractedActionData = await getExtractedActionData(allInteractionsFromSections, extractedActionData, jsonData, appId);
                extractedActionData = await getExtractedActionData(allInteractionsFromComponents, extractedActionData, jsonData, appId);
            }
        }
        console.log('✅ Données des actions extraites');
    } catch (error) {
        logError(error);
    }
    return extractedActionData;
}

async function getExtractedActionData(data, extractedActionData, jsonData, appId) {
    if (!jsonData) {
        console.error('❌ Erreur : jsonData est indéfini');
        return extractedActionData;
    }

    if (data && Array.isArray(data)) {
        data.forEach(workflowData => {
            if (workflowData.actions && typeof workflowData.actions === 'object' && !Array.isArray(workflowData.actions)) {
                for (const key in workflowData.actions) {
                    const actionData = workflowData.actions[key];
                    if (!extractedActionData.some(action => action.weweb_id == actionData.id)) {
                        extractedActionData.push({
                            weweb_id: actionData.id,
                            cache_version: jsonData.cacheVersion,
                            type: actionData.type,
                            internal: actionData.internal,
                            parameters: actionData.parameters,
                            workflow_id: actionData.workflowId,
                            next: actionData.next,
                            value: actionData.value,
                            navigate_mode: actionData.navigateMode,
                            branches: actionData.branches,
                            use_path: actionData.usepath,
                            path: actionData.path,
                            var_id: actionData.varid,
                            var_value: actionData.varValue,
                            vars_id: actionData.varsId,
                            args: actionData.args,
                            disabled: actionData.disabled,
                            parent_workflow_id: workflowData.id,
                            application_id: appId
                        });
                    }
                }
            }
        });
    }
    return extractedActionData;
}

// EXTRAIRE OBJECTS WEWEB
async function getWwObjectData(files, appId) {
    let extractedWwObjectData = [];
    let dataPageWwObject = [];
    try {
        for (let file of files) {
            let jsonData = file.content;
            if (jsonData.wwObjects && typeof jsonData.wwObjects === 'object' && !Array.isArray(jsonData.wwObjects)) {
                for (const key in jsonData.wwObjects) {
                    const wwObjectData = jsonData.wwObjects[key];
                    if (!extractedWwObjectData.some(wf => wf.weweb_id == wwObjectData.uid)) {
                        extractedWwObjectData.push({
                            weweb_id: wwObjectData.uid,
                            cache_version: jsonData.cacheVersion,
                            name: wwObjectData.name,
                            ww_object_base_id: wwObjectData.wwObjectBaseId,
                            library_component_base_id: wwObjectData.libraryComponentBaseId,
                            parent_section_id: wwObjectData.parentSectionId,
                            parent_library_component_id: wwObjectData.parentLibraryComponentId,
                            application_id: appId
                        });
                    }
                }
                let wwObjectArray = Object.values(jsonData.wwObjects);
                let wwObjectRelations = await createRelations(jsonData.page.id, wwObjectArray, 'page_id', 'ww_object_id', jsonData.cacheVersion, appId);
                dataPageWwObject = dataPageWwObject.concat(wwObjectRelations);
            } else {
                logError('Aucun wwObject trouvé dans le fichier : ' + file.name);
            }
        }
        console.log('✅ Données des ww_objects extraites');
    } catch (error) {
        logError(error);
    }
    dataPageWwObject = await getUniqueData(dataPageWwObject, 'page_id', "ww_object_id");
    return { extractedWwObjectData, dataPageWwObject };
}

// UTILITAIRES : Création des relations et suppression des doublons
async function createRelations(firstId, objects, firstRelationKey, secondRelationKey, cache_version, appId) {
    let relation = {};
    return objects.map(obj => {
        const idOrUid = obj.id || obj.uid;
        relation = {
            [firstRelationKey]: firstId,
            [secondRelationKey]: idOrUid,
            application_id: appId,
            cache_version: cache_version
        };
        return relation;
    });
}

async function getUniqueData(data, firstColumn, secondColumn) {
    const uniqueEntries = new Map();
    data.forEach(entry => {
        const key = `${entry[firstColumn]}-${entry[secondColumn]}-${entry.cache_version}`;
        if (!uniqueEntries.has(key)) {
            uniqueEntries.set(key, entry);
        }
    });
    return Array.from(uniqueEntries.values());
}

export { processFiles };
