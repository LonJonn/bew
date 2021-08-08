<script lang="ts">
  import Player from "./components/Player.svelte";

  let interacted = false;
</script>

<main>
  {#if interacted}
    <Player />
  {:else}
    <a class="secret" href="shh.html"
      >What're you doing sussy baka? Don't come in here!</a
    >

    <h1>
      Welcome to...
      <br />
      <span class="neon">
        Lonny's Cinema
        <span class="version">v2</span>
      </span><span class="pop">🍿</span>
    </h1>

    <img src="michael.gif" alt="michael eating corn that has been popped" />

    <button class="btn" on:click={() => (interacted = true)}>Join 🤩</button>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 3em;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  h1 {
    margin-top: 4rem;
    text-align: center;
    font-size: 3rem;
    font-weight: 500;
  }

  .neon {
    position: relative;
    font-family: "Courgette", cursive;
    font-weight: bold;
    font-size: 4rem;
    text-shadow: 0 0 15px #fff, 0 0 20px #e74242, 0 0 30px #e74242,
      0 0 40px #e74242, 0 0 55px #e74242, 0 0 75px #e74242;
  }

  .neon .version {
    position: absolute;
    text-shadow: 0 0 15px #fff, 0 0 20px gold, 0 0 30px gold, 0 0 40px gold,
      0 0 55px gold, 0 0 75px gold;
    top: 2rem;
    right: -0.5rem;
    font-size: 0.65em;
    transform: rotate(-15deg);
    z-index: 10;
  }

  .pop {
    margin-left: 1rem;
    font-size: 4.3rem;
  }

  img {
    width: 40%;
    border-radius: 3px;
  }

  .secret {
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    color: #474747;
  }
</style>
