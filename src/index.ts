import {logger} from "./modules/logging";
import {simple_pot} from "./modules/module-defs";

const log = logger("ROOT")

import {gen_module_h, ModuleManager} from "./modules/module-manager";

log("Starting networking...");
const moduleManager = new ModuleManager();

moduleManager.registerDefinition(simple_pot)


console.log(gen_module_h(simple_pot));
