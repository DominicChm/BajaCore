import {IModuleVariableDefinition} from "./IModuleVariableDefinition";

export interface IModuleDefinition {
    name: string;

    readable_name: string;
    description: string;

    client_vars: IModuleVariableDefinition[];
    server_vars: IModuleVariableDefinition[];
}
