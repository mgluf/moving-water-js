<script>
  import { getContext } from 'svelte';
  import { onMount } from 'svelte';
  const { open } = getContext('simple-modal');
  const showSurprise = () => open(Popup);
  import Popup from './Popup.svelte';


	onMount(() => {
    open(Popup);
    console.log('modal')
  })


</script>


<button on:click={showSurprise}>About Moving Water</button>

<style>
  button {
    color: white;
    background-color: #a0a0a0;
  }

  button:hover {
    cursor: pointer;
  }
</style>
