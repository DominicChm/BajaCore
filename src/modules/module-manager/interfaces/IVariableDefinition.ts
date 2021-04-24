import {ICType} from "c-type-util";

export interface IClientVariableDefinition {
    symbol: string;
    readable_name: string;
    description: string;
    c_type: ICType;
    derived?: IDerivedClientValue[];
    abs_min?: number;
    abs_max?: number;
    limit?: (raw_val: any, variable_definition: IClientVariableDefinition) => any;
    typical_max?: number;
    typical_min?: number;
    outside_typical?: (raw_val: any, variable_definition: IClientVariableDefinition) => boolean;

}

export interface IDerivedClientValue {
    symbol: string;
    readable_name: string;
    description: string;
    convert: (raw_val: any, variable_definition: IClientVariableDefinition) => any;
}
