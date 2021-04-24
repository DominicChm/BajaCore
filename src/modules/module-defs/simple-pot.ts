import {Module} from "../module-manager/classes/Module";
import {uint8} from "c-type-util";
import {IClientVariableDefinition} from "../module-manager/interfaces/IVariableDefinition";

const pot_var: IClientVariableDefinition =
    {
        symbol: "pot_val",
        readable_name: "Potentiometer Value",
        description: "The value of the potentiometer",
        abs_min: 0,
        abs_max: 0,
        typical_min: 0,
        typical_max: 0,
        c_type: uint8,
        derived: [
            {
                symbol: "normalized",
                readable_name: "Normalized Value",
                description: "The value of the potentiometer, normalized 0 - 1",
                convert: (raw_val: number, variable_definition) => {
                    return (raw_val - variable_definition.abs_min) / (variable_definition.abs_max - variable_definition.abs_min);
                }
            },
            {
                symbol: "resistance",
                readable_name: "Resistance",
                description: "The current resistance of the potentiometer in ohms",
                convert: (raw_val, variable_definition) => {
                    return 12;
                }
            },
            {
                symbol: "position",
                readable_name: "Position",
                description: "The current position of the potentiometer in degrees",
                convert: (raw_val, variable_definition) => {
                    return 13;
                }
            },
        ]
    }
