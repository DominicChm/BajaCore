import {IClientInformation} from "./interfaces/IClientInformation";
import {c_string} from "../../../C-Types/c_string";

/** Parses buffers in the format of <OP:uint8><TYPE:cString><UID:cString>
 */
export function parse_HANDSHAKE(buf: Buffer): IClientInformation {
    const type = c_string(64).readLE(buf, 1);
    const uid = c_string(32).readLE(buf, 65);
    return {type, uid};
}
