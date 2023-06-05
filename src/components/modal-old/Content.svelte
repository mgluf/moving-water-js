<script>
  import { getContext } from 'svelte';
  import { onMount } from 'svelte';
  const { open } = getContext('simple-modal');
  const showSurprise = () => open(Popup);
  import Popup from './Popup.svelte';


	onMount(() => {
    open(Popup);
  })


</script>


<button on:click={showSurprise}>About Moving Water</button>

<style>
  button {
    color: white;
    background-color: #a0a0a0;
    border: 0px solid transparent;
  }

  button:hover {
    cursor: pointer;
  }
</style>
