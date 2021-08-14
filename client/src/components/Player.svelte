<script lang="ts">
  import { io } from "socket.io-client";
  import Hls from "hls.js";
  import Plyr from "plyr";

  import * as Bew from "../../../types";
  import { onMount } from "svelte";

  let CAN_CONTROL = window.location.search.includes("can_control");

  // Heartbeat
  if (CAN_CONTROL) {
    setInterval(() => fetch("/"), 15 * 60 * 1000);
  }

  let name = prompt("Who this? 🤨");

  let video: HTMLVideoElement;
  let form: HTMLFormElement;
  let chat: HTMLDivElement;

  let src: string;
  let captions: string;
  let active: boolean = true;

  const socket = io(import.meta.env.DEV ? "http://localhost:3000" : "");
  const hls = new Hls();

  socket.on("connect", () => {
    socket.emit(Bew.EAction.PERSON_JOINED, name);
  });

  let player: Plyr;
  onMount(() => {
    player = new Plyr(video, {
      captions: { active: true, update: true },
      clickToPlay: CAN_CONTROL,
      keyboard: {
        global: CAN_CONTROL,
        focused: CAN_CONTROL,
      },
      invertTime: false,
      controls: [
        ...(CAN_CONTROL ? ["play-large", "play", "progress"] : []),
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
    });
  });

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

  socket.on(Bew.EAction.PERSON_JOINED, function writeMessage(name) {
    const newMessage = document.createElement("p");
    newMessage.innerText = `${name} joined!`;

    chat.appendChild(newMessage);
  });

  // On Load Video
  socket.on(
    Bew.EAction.LOAD_VIDEO,
    function loadVideoSrc(payload: Bew.IVideoMeta) {
      if (payload.src.includes(".mp4")) {
        video.src = payload.src;
      } else {
        hls.loadSource(payload.src);
        hls.attachMedia(video);
      }

      video.currentTime = payload.timeStamp;

      if (payload.state === "PLAYING") {
        player.play();
      } else {
        player.pause();
      }

      video.querySelector("track").src = payload.captions;
    }
  );

  // On state update
  socket.on(
    Bew.EAction.UPDATE_STATE,
    function updateVideoState(payload: Bew.IUpdateStateAction) {
      if (payload.state === "PLAYING") {
        player.play();
      } else {
        player.pause();
      }
    }
  );

  // On Seek
  socket.on(
    Bew.EAction.SEEK,
    function updateVideoTime(payload: Bew.ISeekAction) {
      player.currentTime = payload.timeStamp;
    }
  );

  // Functions

  function changeVideo(event: Event) {
    event.preventDefault();

    if (!active || !CAN_CONTROL) return;
    socket.emit(Bew.EAction.SET_VIDEO, {
      src,
      captions,
    } as Bew.ISetVideoAction);

    src = "";
    captions = "";
  }

  function updateState(state: Bew.IUpdateStateAction["state"]) {
    if (!active || !CAN_CONTROL) return;
    socket.emit(Bew.EAction.UPDATE_STATE, { state } as Bew.IUpdateStateAction);
  }

  function handleSeek() {
    if (!active || !CAN_CONTROL) return;
    socket.emit(Bew.EAction.SEEK, {
      timeStamp: video.currentTime,
    } as Bew.ISeekAction);
  }
</script>

<div class="player">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    height="400"
    controls
    bind:this={video}
    on:play={() => updateState("PLAYING")}
    on:pause={() => updateState("PAUSED")}
    on:seeking={() => handleSeek()}
    playsinline
  >
    <track label="english" kind="captions" src="" srclang="en" default />
  </video>

  {#if CAN_CONTROL}
    <div class="below">
      <form bind:this={form} on:submit={changeVideo}>
        <input name="src" placeholder="Video" bind:value={src} />
        <input name="src" placeholder="Captions" bind:value={captions} />
        <button type="submit" class="btn">Change Video</button>
      </form>

      <button class="btn" on:click={handleSeek}>Sync</button>
    </div>
  {/if}

  <div bind:this={chat} class="chat" />
</div>

<style scoped>
  .player {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    padding: 2rem;
  }

  .below {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  form {
    display: flex;
    gap: 0.75rem;
  }

  input {
    outline: none;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 0 0.5rem 1rem;
    font-size: medium;
    background-color: #fafafa;
  }

  .chat {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  :global(.chat > p) {
    text-transform: capitalize;
    font-size: medium;
  }
</style>
