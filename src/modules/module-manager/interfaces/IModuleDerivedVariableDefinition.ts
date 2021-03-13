import {IModuleVariableDefinition} from "./IModuleVariableDefinition";

export interface IModuleDerivedVariableDefinition {
    sub_symbol: string;
    readable_name: string;
    description: string;
    convert: (raw_value: any, variable_definition: IModuleVariableDefinition) => any;
}
