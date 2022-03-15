<script>
  import Content from './Content.svelte';
  import Modal from 'svelte-simple-modal';

  export let data;
  export let selected = 0;

  let date = new Date(data[selected].readings.date).toUTCString();
  let dateFinal = date.replace('00:00:00 GMT', '')

  let mapURLPrefix = "https://maps.google.com/maps/place?&amp&t=t&z=17&ll="
  let mapURLSuffix = "&output=embed"

  // console.log("infoBar", data)
  
</script>

<nav class="info-bar">
  <div class="value-measure">
    <h2>{data[selected].readings.value}</h2>
    <p>{data[selected].unit}</p>
  </div>
  <div class="measure-data">
    {#if data[selected].readings.value === 0}
      <p style="color: red;">No valid readings in the past 7 days.</p>
      {:else}
      <p>{data[selected].measure}</p>
      <p>Recorded on {dateFinal}</p>
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
    <Modal><Content /></Modal>
    <br/>
    <p>Created by <a href="https://www.mgluf.com/">Matt Gluf</a></p>
  </div>
</nav>

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
    font-size: 14px;
    color: #575656;
    /* max-width: 70%; */
  }

  .footer{
    position: fixed;
    bottom: 1rem;
    padding-left: 1px;
  }

  .footer p {
    margin: 0;
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

  @media only screen and (max-width: 768px) {
    .map.show {
      padding-bottom: 40%;
    }
    .info-bar {
      grid-row: 2;
      padding: .5rem;
    }

    .footer {
      display: block;
      font-size: 12px;
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