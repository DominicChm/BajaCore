import {ICType} from "../../C-Types/interfaces/ICType";
import {IModuleDerivedVariableDefinition} from "./IModuleDerivedVariableDefinition";

export interface IModuleVariableDefinition {
    symbol: string;
    readable_name: string;
    description: string;
    abs_min?: number;
    abs_max?: number;
    typical_min?: number;
    typical_max?: number;
    c_type: ICType;
    derived: IModuleDerivedVariableDefinition[];
}
