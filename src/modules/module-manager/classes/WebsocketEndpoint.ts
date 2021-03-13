import {Server as WebSocketServer} from "ws";
import {EventEmitter} from "events";
import {ISource, sourceFromWsReq, ipFromHTTPReq} from "../util/source_utilities";
import {ws_codes} from "../util/ws_codes";
import {logger} from "bc/logging";
const log = logger("ws_endpoint")

export interface IWebsocketEndpointOptions {
    port: number;
    path?: string;
    validateConnection?: (source: ISource, request) => void;
}

class WebsocketEndpoint extends EventEmitter {
    options: IWebsocketEndpointOptions;
    wss: WebSocketServer;

    constructor(options: IWebsocketEndpointOptions) {
        super();
        this.options = {
            port: 81,
            path: "/",

            // A function to validate connections.
            // Throwing will reject the connection. Return val. is ignored.
            validateConnection: (source, request) => {},
            ...options
        }

        this.wss = new WebSocketServer({
            port: this.options.port,
        });

        this.wss.on("connection", this.onConnection.bind(this));
    }

    onConnection(ws, req) {
        try {
            const source: ISource = sourceFromWsReq(req);

            // Should interrupt execution + close WS through a throw, if connection invalid.
            this.options.validateConnection(source, req);

            //Bind events
            ws.on("message", (msg) => this.onMessage(msg, source, ws))
              .on("error", (error) => this.onError(error, source, ws))
              .on("close", () => this.onClose(source, ws));

            log(`Connection from ${source.ip}. (TYPE=${source.type}, UID=${source.uid})`);

            this.emit("connection", source, ws);

        } catch (e) {
            //Reject the socket connection
            ws.close(ws_codes.INVALID_QUERY_PARAMS, e.message);

            log(`Connection from ${ipFromHTTPReq(req)} rejected because: ${e.message}`, "warn");

        }
    }

    onMessage(msg, source, ws) {
        this.emit("message", msg, source, ws);
    }

    onClose(source, ws) {
        log(`Connection to ${source.ip} closed.`);
        this.emit("close", source, ws);
    }

    onError(error, source, ws) {
        this.emit("error", error, source, ws);
    }

}

export {WebsocketEndpoint};
