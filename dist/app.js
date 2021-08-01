"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var Bew = __importStar(require("./types"));
var meta = {
    src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    timeStamp: 60,
    state: "PLAYING",
};
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3001",
    },
});
io.on("connection", function (socket) {
    // Logging
    console.log("New connection: " + socket.id);
    socket.onAny(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Message from " + socket.id, args);
    });
    /* ##### New Connection ##### */
    socket.emit(Bew.EAction.LOAD_VIDEO, meta);
    /* ##### On Set Video ##### */
    socket.on(Bew.EAction.SET_VIDEO, function updateMetaSrc(payload) {
        // Set new meta from update event
        meta.src = payload.src;
        meta.timeStamp = 0;
        meta.state = "PAUSED";
        // Reload video for all users
        io.emit(Bew.EAction.LOAD_VIDEO, meta);
    });
    /* ##### On Update Video State ##### */
    socket.on(Bew.EAction.UPDATE_STATE, function broadcastUpdate(payload) {
        meta.state = payload.state;
        socket.broadcast.emit(Bew.EAction.UPDATE_STATE, {
            state: meta.state,
        });
    });
    /* ##### On Seek ##### */
    socket.on(Bew.EAction.SEEK, function broadcastTimeStamp(payload) {
        meta.timeStamp = payload.timeStamp;
        socket.broadcast.emit(Bew.EAction.SEEK, {
            timeStamp: meta.timeStamp,
        });
    });
});
app.use(express_1.default.static("public"));
server.listen(3000, function () { return console.log("listening on port 3000"); });
