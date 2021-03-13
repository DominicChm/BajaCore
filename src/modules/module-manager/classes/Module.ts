import {EventEmitter} from "events";
import {log_fn_t, logger} from "../../logging";
import {IModuleDefinition, IModuleVariableDefinition} from "../interfaces";
import {ISource} from "../util/source_utilities";
import {toHex} from "bc/Util";
import {toSpacedHex} from "../../Util";
import {IClientState} from "../interfaces/IClientState";
import {ICType} from "../../C-Types/interfaces/ICType";


export abstract class Module extends EventEmitter {
    private log: log_fn_t;

    constructor() {
        super();
    }

    static verifyImplementation() {
        const staticProps =
    }
}
