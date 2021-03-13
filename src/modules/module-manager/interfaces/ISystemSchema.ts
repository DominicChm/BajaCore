import {ISystemSchemaModuleDefinition} from "./ISystemSchemaModuleDefinition";


export interface ISystemSchema {
    name: string;
    description: string;

    modules: ISystemSchemaModuleDefinition[];
}


const test: ISystemSchema = {
    name: "test_system",
    description: "test_description",
    modules: [
        {
            type: "simple_pot",
            uid: "12:32:12:34:22"
        }
    ]
}
