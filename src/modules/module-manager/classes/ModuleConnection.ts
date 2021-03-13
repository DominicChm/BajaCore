import {EventEmitter} from "events";
import {IModuleDefinition} from "../interfaces";

export class ModuleConnection extends EventEmitter{
    /**
     * See description in `ModuleManager`
     */
    private readonly module_def_registry: { [key: string]: IModuleDefinition } = {}

    private id: number;

    private ws: WebSocket;

    constructor(ws, id, definition_registry) {
        super();
        this.module_def_registry = definition_registry;
        this.ws = ws;
        this.id = id;
    }
}
