import {ICType} from "./interfaces/ICType";
import {strlen} from "./util/strlen";

export function c_string(length: number): ICType {
    const size = length;

    return {
        readBE(buf: Buffer, offset: number): string {
            const s_len = strlen(buf, offset, length);
            return buf.toString("ascii", offset, offset + s_len);
        },
        readLE(buf: Buffer, offset: number): string {
            const s_len = strlen(buf, offset, length);
            return buf.toString("ascii", offset, offset + s_len);
        },
        writeBE(data: string, buf: Buffer, offset: number): void {
            buf.write(data, offset, size, "ascii");

            // Ensure that the last string value is a null terminator.
            buf.writeUInt8(0x00, offset + size);

        },
        writeLE(data: string, buf: Buffer, offset: number): void {
            buf.write(data, offset, size, "ascii");

            // Ensure that the last string value is a null terminator.
            buf.writeUInt8(0x00, offset + size);
        },
        size
    }
}
