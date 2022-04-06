<script>
	import { fly } from 'svelte/transition'
  import { closeModal } from 'svelte-modals'

  export let isOpen

</script>

{#if isOpen}
	<!-- on:introstart and on:outroend are required to transition 1 at a time between modals -->
  <div role="dialog" class="modal" transition:fly={{ y: 50 }} on:introstart on:outroend>
    <div class="contents">
      <h2>About</h2>
      <p>Moving Water is an interactive data visualization illustrating how fast water is flowing in Rivers across the United Kingdom. It is rendered by <a href="https://p5js.org/">p5.js</a> and fueled by data from real rivers via <a href="https://environment.data.gov.uk/hydrology/doc/reference">Hydrology API</a></p>
      <p>Created by <a href="https://www.mgluf.com/">Matt Gluf</a></p>
      <h2>Credits</h2>
      <p><a href="https://matthewia.com/">Matthew Alicea</a> - Code Consultant</p>
      <p><a href="https://www.adajcc.com/">Ada Jiang</a> - Author of the <a href="https://editor.p5js.org/ada10086/sketches/r1gmVaE07">flow field p5 sketch</a> which is derived in this project.</p>
    </div>
    <div class="actions">				
      <button on:click={closeModal}>Close</button>			
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    row-gap: 50px;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    color: white;
    max-width: 500px;
    border-radius: 6px;
    padding: 16px;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    z-index: 1002;
  }

  .contents a {
    color: #20b2aa;
  }

</style>