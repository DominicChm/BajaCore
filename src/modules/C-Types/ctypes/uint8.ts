import {ICType} from "../interfaces/ICType";

export let uint8: ICType = {
    readBE(buf: Buffer, offset: number): number {
        return buf.readUInt8(offset);
    },
    readLE(buf: Buffer, offset: number): number {
        return buf.readUInt8(offset);
    },
    writeBE(data: number, buf: Buffer, offset: number): void {
        buf.writeUInt8(data, offset);
    },
    writeLE(data: any, buf: Buffer, offset: number): void {
        buf.writeUInt8(data, offset);
    },
    size: 1
}
