/**
 * Calculates the length of a string at an offset (inclusive) in a buffer.
 * @param buf
 * @param offset
 * @param max_len
 */
export function strlen(buf: Buffer, offset: number, max_len: number): number {
    const index = buf.slice(offset, offset + max_len).indexOf(0x00)
    return index > 0 ? index : max_len;
}
