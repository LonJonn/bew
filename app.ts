import express from "express";
import http from "http";
import { Server } from "socket.io";

import * as Bew from "./types";

const meta: Bew.IVideoMeta = {
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  timeStamp: 60,
  state: "PLAYING",
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

io.on("connection", function (socket) {
  // Logging
  console.log(`New connection: ${socket.id}`);
  socket.onAny(function (...args) {
    console.log(`Message from ${socket.id}`, args);
  });

  /* ##### New Connection ##### */

  socket.emit(Bew.EAction.LOAD_VIDEO, meta as Bew.ILoadVideoAction);

  /* ##### On Set Video ##### */

  socket.on(
    Bew.EAction.SET_VIDEO,
    function updateMetaSrc(payload: Bew.ISetVideoAction) {
      // Set new meta from update event
      meta.src = payload.src;
      meta.timeStamp = 0;
      meta.state = "PAUSED";

      // Reload video for all users
      io.emit(Bew.EAction.LOAD_VIDEO, meta);
    }
  );

  /* ##### On Update Video State ##### */

  socket.on(
    Bew.EAction.UPDATE_STATE,
    function broadcastUpdate(payload: Bew.IUpdateStateAction) {
      meta.state = payload.state;

      socket.broadcast.emit(Bew.EAction.UPDATE_STATE, {
        state: meta.state,
      } as Bew.IUpdateStateAction);
    }
  );

  /* ##### On Seek ##### */

  socket.on(
    Bew.EAction.SEEK,
    function broadcastTimeStamp(payload: Bew.ISeekAction) {
      meta.timeStamp = payload.timeStamp;

      socket.broadcast.emit(Bew.EAction.SEEK, {
        timeStamp: meta.timeStamp,
      } as Bew.ISeekAction);
    }
  );
});

app.use(express.static("public"));

server.listen(process.env.PORT || 3000, () =>
  console.log("listening on port 3000")
);
