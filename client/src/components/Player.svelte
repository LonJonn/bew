<script lang="ts">
  import { io } from "socket.io-client";
  import Hls from "hls.js";

  import * as Bew from "../../../types";

  let video: HTMLVideoElement;
  let form: HTMLFormElement;

  let src: string;
  let active: boolean = true;

  const socket = io("http://localhost:3000");
  const hls = new Hls();

  socket.onAny(() => {
    active = false;
  });
  const old = socket.on;
  socket.on = function (event, cb, ...rest) {
    function wrappedCb(...args) {
      cb(...args);
      setTimeout(() => (active = true), 0);
    }

    return old.apply(socket, [event, wrappedCb, ...rest]);
  };

  // Log any message
  socket.onAny((...msg) => console.log("Received:", msg));

  // On Load Video
  socket.on(
    Bew.EAction.LOAD_VIDEO,
    function loadVideoSrc(data: Bew.IVideoMeta) {
      if (data.src.includes(".mp4")) {
        video.src = data.src;
      } else {
        hls.loadSource(data.src);
        hls.attachMedia(video);
      }
    }
  );

  // On state update
  socket.on(
    Bew.EAction.UPDATE_STATE,
    function updateVideoState(payload: Bew.IUpdateStateAction) {
      if (payload.state === "PLAYING") {
        video.play();
      } else {
        video.pause();
      }
    }
  );

  // On Seek
  socket.on(
    Bew.EAction.SEEK,
    function updateVideoTime(payload: Bew.ISeekAction) {
      video.currentTime = payload.timeStamp;

      active = true;
    }
  );

  // Functions

  function changeVideo(event: Event) {
    event.preventDefault();

    if (!active) return;
    socket.emit(Bew.EAction.SET_VIDEO, { src } as Bew.ISetVideoAction);

    src = "";
  }

  function updateState(state: Bew.IUpdateStateAction["state"]) {
    if (!active) return;
    socket.emit(Bew.EAction.UPDATE_STATE, { state } as Bew.IUpdateStateAction);
  }

  function handleSeek() {
    if (!active) return;
    socket.emit(Bew.EAction.SEEK, {
      timeStamp: video.currentTime,
    } as Bew.ISeekAction);
  }
</script>

<div class="player">
  <video
    height="400"
    controls
    bind:this={video}
    on:play={() => updateState("PLAYING")}
    on:pause={() => updateState("PAUSED")}
    on:seeking={() => handleSeek()}
  >
    <track kind="captions" />
  </video>

  <form bind:this={form} on:submit={changeVideo}>
    <input name="src" bind:value={src} />
    <button type="submit">Change Video</button>
  </form>
</div>

<style scoped>
  .player {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    padding: 2rem;
  }
</style>
