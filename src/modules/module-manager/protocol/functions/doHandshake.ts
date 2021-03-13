import {IModuleDefinition} from "../../interfaces";
import {IClientInformation} from "../../interfaces/IClientInformation";



export async function doHandshake(ws: WebSocket, allocatedID: number, module_def_registry: { [key: string]: IModuleDefinition }): Promise<IClientInformation> {
    function onMessage(msg) {

    }
    ws.on("message", )
}
