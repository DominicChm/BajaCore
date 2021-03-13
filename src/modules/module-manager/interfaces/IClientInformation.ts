import {IModuleDefinition} from "./IModuleDefinition";

export interface IClientInformation {
    id: number;
    type: string;
    uid: string;
    definition: IModuleDefinition;
}
