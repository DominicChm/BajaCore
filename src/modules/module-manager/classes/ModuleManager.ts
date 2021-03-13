import {WebsocketEndpoint} from "./WebsocketEndpoint";
import {IModuleDefinition} from "../interfaces";
import {Module} from "./Module";
import {ISource} from "../util/source_utilities";
import {logger} from "../../logging";
import {type} from "os";
import {ISystemSchema} from "../interfaces/ISystemSchema";

const log = logger("Module Manager");

export interface IModuleManagerOptions {
    ws_port: number
}

class ModuleManager {
    opts: IModuleManagerOptions;
    ws_endpoint: WebsocketEndpoint;
    module_definitions: { [key: string]: IModuleDefinition } = {}
    connections: [];

    uid_map: { [key: string]: Module } = {};
    ip_map: { [key: string]: Module } = {};

    constructor(opts?: IModuleManagerOptions) {
        this.opts = {
            ws_port: 81
        }

        this.ws_endpoint = new WebsocketEndpoint({
            port: this.opts.ws_port,
            validateConnection: this.validateConnection.bind(this),
        });

        this.ws_endpoint.on("message", this.onMessage.bind(this))
            .on("connection", this.onConnection.bind(this))

        this.uid_map = {};
        this.ip_map = {};

    }

    validateConnection(source: ISource, request) {
        if (!this.module_definitions[source.type]) throw new Error(`no module type >${source.type}< exists.`);
    }

    onConnection(source: ISource, ws: WebSocket) {
        log("Setting up Connection...");
        const def = this.module_definitions[source.type]

        //Setup the connection
        const instance: Module = new Module(def);

        this.ip_map[source.ip] = this.uid_map[source.uid] = instance;

    }

    onMessage(msg: Buffer | string, source: ISource) {
        const moduleInstance: Module = this.ip_map[source.ip]

        //Just check if module instance exists for development. TODO: Remove checks - shouldn't be needed.
        if (!moduleInstance) {
            log("NO MODULE INSTANCE FOUND??????", "error");
        }

        if (typeof msg === "string" && moduleInstance) {
            log(`MESSAGE FROM ${source.ip}: ${msg}`)

        } else if (msg instanceof Buffer  && moduleInstance) {
            moduleInstance.feed(msg);
        }
    }

    onClose() {

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

    getByIp(ip) {
        return this.ip_map[ip];
    }

    getByUid(uid) {
        return this.uid_map[uid];
    }

    getBySource(source) {
        return this.uid_map[source.uid];
    }

    registerDefinition(def: IModuleDefinition) {
        this.module_definitions[def.name] = def;
    }



}

export {ModuleManager};
