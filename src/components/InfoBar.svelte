<script>
  import { fade } from 'svelte/transition'
  import { Modals, closeModal, openModal } from 'svelte-modals'
  import Modal from './modal.svelte'

  export let data;
  export let selected = 0;

  // let date = new Date(data[selected].readings.date).toUTCString();
  // let dateFinal = date.replace('00:00:00 GMT', '')
  // console.log(dateFinal)

  let mapURLPrefix = "https://maps.google.com/maps/place?&amp&t=t&z=17&ll="
  let mapURLSuffix = "&output=embed"

  // console.log("infoBar", data)

  function open() {
		openModal(Modal, {
      //pass to modal
		})
	}
  
</script>

<nav class="info-bar">
  <div class="value-measure">
    <h2>{data[selected].readings.value}</h2>
    {#if !data[selected].unit}
       m3/s
      {:else}
      <p>{data[selected].unit}</p>
    {/if}
  </div>
  <div class="measure-data">
    {#if data[selected].readings.value === 0}
      <p style="color: red;">No valid readings in the past 7 days.</p>
      {:else}
      {#if !data[selected].measure}
          Daily min Volume Flow in meters cubed per second.
         {:else}
         <p>{data[selected].measure}</p>
      {/if}
      <p>Recorded on {data[selected].readings.date}</p>
    {/if}
  </div>
  <div>
    <slot/>
  </div>
  <div class="maps">
    {#each data as station, i}
      <div class='map map-{i}' class:show={selected === i}>
        <iframe title="map" width='300' height='200' frameborder='0' 
            scrolling='no' marginheight='0' marginwidth='0'    
            src='{mapURLPrefix}{station.lat},{station.long}{mapURLSuffix}'
        >
        </iframe>
    </div>
    {/each}
  </div>
  <div class="footer">
    <button on:click={()=> open()}>About Moving Water</button>
  </div>
</nav>
<Modals>
  <div
    slot="backdrop"
    class="backdrop"
    transition:fade
    on:click={closeModal}
  />
</Modals>

<style>

  .info-bar{
    background-color: lightgrey;
    margin: 0;
    padding: 0;
    padding: 1.25rem;
  }

  .value-measure {
    display: flex;
    align-items: baseline;
  }

  .value-measure h2 {
    margin: 0;
    font-size: 2rem;
  }

  .value-measure p {
    margin: 0 0 0 .5rem;
  }

  .measure-data {
    font-size: 1rem;
    color: #575656;
    /* max-width: 70%; */
  }

  .footer{
    position: fixed;
    bottom: 1rem;
    padding-left: 1px;
  }

  .map {
    display: none;
  }

  .map iframe{
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
  }

  .map.show {
    display: block;
    overflow:hidden;
    padding-bottom:80%;
    position:relative;
    height:0;
  }

  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.9);
    z-index: 900;
  }

  @media only screen and (max-width: 768px) {
    .map.show {
      padding-bottom: 40%;
    }
    .info-bar {
      grid-row: 2;
      padding: .5rem;
      touch-action: none;
    }

    .footer {
      position: fixed;
      bottom: 2px;
      display: inline-block;
      font-size: 11px;
    }

    .measure-data {
      font-size: .8rem;
    }

    .measure-data p {
      margin-top: .5rem;
      margin-bottom: .5rem;
    }

    .measure-data p:last-of-type {
      margin-bottom: 0;
    }

  }

  @media only screen and (max-width: 599px) {
    .maps {
      display: none;
    }
  }

  

</style>