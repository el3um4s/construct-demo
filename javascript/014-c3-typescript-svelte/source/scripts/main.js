"use strict";
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
runOnStartup(async (runtime) => {
    globalThis.g_runtime = runtime;
});
