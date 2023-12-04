// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

runOnStartup(async (runtime: IRuntime) => {
  globalThis.g_runtime = runtime;
});
