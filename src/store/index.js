import { reactive } from "vue";
import applications from "./modules/applications.js";
import pages from "./modules/pages.js";
import workflows from "./modules/workflows.js";
// import other modules here

const store = {
    modules: {
        applications,
        pages,
        workflows,
        // register other modules here
    },
};

export default reactive(store);
