import {ICType} from "./interfaces/ICType";


export function c_array(type: ICType, length: number): ICType {
    const size = type.size * length;

    return {
        readBE(buf: Buffer, offset: number): any[] {
            const result = [];
            for(let i = 0; i < length; i++) {
                const iOffset = offset + i * type.size;
                result.push(type.readBE(buf, iOffset));
            }
            return result;
        },
        readLE(buf: Buffer, offset: number): any[] {
            const result = [];
            for(let i = 0; i < length; i++) {
                const iOffset = offset + i * type.size;
                result.push(type.readLE(buf, iOffset));
            }
            return result;
        },
        writeBE(data: any[], buf: Buffer, offset: number): void {
            for(let i = 0; i < length; i++) {
                const iOffset = offset + i * type.size;
                type.writeBE(data[i], buf, iOffset);
            }
        },
        writeLE(data: any[], buf: Buffer, offset: number): void {
            for(let i = 0; i < length; i++) {
                const iOffset = offset + i * type.size;
                type.writeLE(data[i], buf, iOffset);
            }
        },
        size
    }
}
