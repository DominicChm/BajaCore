import {ICType} from "./interfaces/ICType";
import {ICTypeConstEndian} from "./interfaces/ICTypeConstEndian";

/** Helper function that isolates either the big-endian or little-endian r/w functions of a type. Useful as a pre-step
 * for generalized fns that handle both big and little-endian inputs.
 * */
export function end(c_type: ICType, endian: "little" | "big" = "little"): ICTypeConstEndian {
    switch (endian) {
        case "little":
            return {
                read: c_type.readLE,
                write: c_type.writeLE,
                size: 0,
            };
        case "big":
            return {
                read: c_type.readBE,
                write: c_type.writeBE,
                size: 0,
            };
    }
}
