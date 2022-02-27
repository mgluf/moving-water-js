<script>
  export let data;
  console.log("infoBar", data)

  export let selected = 0;
  let valid = true;

  
</script>

<nav class="info-bar">
  <div class="value-measure">
    <h2>{data[selected].readings.value}</h2>
    <p>{data[selected].unit}</p>
  </div>
  <div class="measure-data">
    <h3>{data[selected].river}</h3>
    {#if data[selected].readings.value === 0}
      <p style="color: red;">No valid readings in the past 7 days.</p>
      {:else}
      <p>{data[selected].measure}</p>
      <p>Recored on {data[selected].readings.date}</p>
    {/if}
  </div>
  <div class="river-select-container">
    <!-- moved selected to app.svelte so p5 sketch can access it -->
    <slot/>
  </div>
  <div class="map"></div>
  <div class="footer">Created by Matt Gluf</div>
</nav>

<style>

  .info-bar{
    background-color: lightgrey;
    margin: 0;
    padding: 0;
    height: 100%;
    padding:1rem;
  }

  .value-measure {
    display: flex;
    align-items: baseline;
  }

  .value-measure h2 {
    margin: 0;
    font-size: 36px;
  }

  .value-measure p {
    margin-left: .5rem;
    font-family: monospace;
  }

  .measure-data {
    font-size: 14px;
    font-family: monospace;
    color: #575656;
  }

  .measure-data h3{
    color: black;
  }

  .footer{
    position: fixed;
    bottom: 1rem;
    padding-left: 1px;
    font-family: monospace;
  }

</style>