const ipAddr = require("ipaddr.js");
const Url = require('url');

export interface ISource {
    ip: string,
    uid: string,
    type: string
}

export function source(ip: string, uid: string, type: string): ISource {
    return {
        ip,
        uid,
        type
    };
}

export function sourceFromWsReq(req): ISource {
    const ip = ipFromHTTPReq(req);
    const url = new Url.URL(req.url, "http://xxx");

    //Check request has basic needed types.
    if (!url.searchParams.has("uid")) throw new Error(">uid< not included.");
    if (!url.searchParams.has("type")) throw new Error(">type< not included.");

    return source(
        ip,
        url.searchParams.get("uid"),
        url.searchParams.get("type"),
    );
}

export function ipFromHTTPReq(req): string {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    return ipAddr.parse(ip).toNormalizedString();
}
