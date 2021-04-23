import {IModuleDefinition} from "../interfaces";
import {Module} from "./Module";
import {logger} from "../../logging";
import {ISystemSchema} from "../interfaces/ISystemSchema";
import {ModuleConnection} from "./ModuleConnection";
import {doHandshake} from "../../protocol/functions/doHandshake";
import WebSocket  from "ws";

const log = logger("Module Manager");

class ModuleManager {
    private readonly WS_PORT: number;

    /**
     * Contains objects that define modules, keyed by that module's name. Used to lookup and construct module
     * instances on connection from a module
     */
    private readonly module_def_registry: { [key: string]: IModuleDefinition } = {}

    /**
     * Contains ModuleConnection or null. Used as a master list to allocate unique, runtime IDs.
     */
    private readonly connections: Array<ModuleConnection | null | string>;

    uid_map: { [key: string]: Module } = {};

    private readonly wss: WebSocket.Server;

    constructor() {
        this.WS_PORT = 81;

        this.connections = new Array(65535).fill(null); //Connections tracks all possible
        this.uid_map = {};

        this.wss = new WebSocket.Server({port: this.WS_PORT});
        this.wss.on("connection", this.onConnection.bind(this));
    }


    async onConnection(ws: WebSocket) {
        log("Setting up Connection...");
        const id = this.connections.indexOf(null); //Allocate a connection

        //Put something there so the ID isn't allocated twice during handshake.
        this.connections[id] = "PENDING";

        try {
            const clientInfo = await doHandshake(ws, id, this.module_def_registry);

            this.connections[id] = new ModuleConnection(ws, id, clientInfo);

        } catch (e) {
            log("Handshake failed!", "warn");
            this.connections[id] = null;
            ws.close();
        }


        //Setup the connection

    }

    loadSystemSchema(schema: ISystemSchema) {

        //Clear both maps.
        this.uid_map = {};
        this.ip_map = {};

        schema.modules.forEach(def => {
            log("Setting up Connection...");
            const mod_def = this.module_definitions[def.type]

            //Setup the connection
            const instance: Module = new Module(def);

            this.uid_map[source.uid] = instance;

        })
    }

    getByUid(uid) {
        return this.uid_map[uid];
    }

    registerDefinition(def: IModuleDefinition) {
        this.module_def_registry[def.name] = def;
    }
}

export {ModuleManager};
