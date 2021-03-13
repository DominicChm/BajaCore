var log = require("bc/logging")("root");
log("Starting networking...");
new (require("bc/modules").ModuleManager)();
