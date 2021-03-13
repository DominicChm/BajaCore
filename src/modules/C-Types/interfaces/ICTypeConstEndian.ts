export interface ICTypeConstEndian {
    size: number;
    read: (buf: Buffer, offset: number) => any;
    write: (data: any, buf: Buffer, offset: number) => void;
}
