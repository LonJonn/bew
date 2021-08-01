<script lang="ts">
  import Player from "./components/Player.svelte";

  let interacted = false;
</script>

<main>
  {#if interacted}
    <Player />
  {:else}
    <button class="join-btn" on:click={() => (interacted = true)}>Join</button>
  {/if}
</main>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  .join-btn {
    border: none;
    border-radius: 10px;
    padding: 1rem 3rem;
    font-size: large;
    background-color: #fefefe;
    cursor: pointer;
  }

  .join-btn:hover {
    background-color: #f0f0f0;
  }
</style>
