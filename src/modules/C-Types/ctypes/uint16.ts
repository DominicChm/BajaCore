import {ICType} from "../interfaces/ICType";

export let uint8: ICType = {
    readBE(buf: Buffer, offset: number): number {
        return buf.readUInt16BE(offset);
    },
    readLE(buf: Buffer, offset: number): number {
        return buf.readUInt16LE(offset);
    },
    writeBE(data: number, buf: Buffer, offset: number): void {
        buf.writeUInt16BE(data, offset);
    },
    writeLE(data: any, buf: Buffer, offset: number): void {
        buf.writeUInt16LE(data, offset);
    },
    size: 2
}
