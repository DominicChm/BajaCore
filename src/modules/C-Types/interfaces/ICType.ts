export interface ICType {
    size: number;
    readLE: (buf: Buffer, offset: number) => any;
    readBE: (buf: Buffer, offset: number) => any;
    writeLE: (data: any, buf: Buffer, offset: number) => void;
    writeBE: (data: any, buf: Buffer, offset: number) => void;
}
