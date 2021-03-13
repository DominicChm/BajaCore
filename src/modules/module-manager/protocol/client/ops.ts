import {parse_HANDSHAKE} from "./parse_HANDSHAKE";
import {parse_ERROR} from "./parse_ERROR";
import {parse_STATE_UPDATE} from "./parse_STATE_UPDATE";

enum eCLIENT_OP {
    HANDSHAKE = 0x00,
    STATE_UPDATE = 0x10,
    ERROR = 0xFF
}

export let client_op_parsers = [];

client_op_parsers[eCLIENT_OP.HANDSHAKE] = parse_HANDSHAKE;
client_op_parsers[eCLIENT_OP.STATE_UPDATE] = parse_STATE_UPDATE;
client_op_parsers[eCLIENT_OP.ERROR] = parse_ERROR;
