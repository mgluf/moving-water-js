<script>
  export let data;
  export let selected;

  let valid = true;

  let date = new Date(data[selected].readings.date).toUTCString();
  let dateFinal = date.replace('00:00:00 GMT', '')

  let mapURLPrefix = "https://maps.google.com/maps/place?&amp&t=t&z=17&ll="
  let mapURLSuffix = "&output=embed"
  let mapURL = mapURLPrefix + data[selected].lat + "," + data[selected].long + mapURLSuffix;

  console.log("infoBar", data)
  
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
      <p>Recorded on {dateFinal}</p>
    {/if}
  </div>
  <div>
    <slot/>
  </div>
  <div class="maps">
    {#each data as station, i}
      <div class="map-{i}" class:selected="{selected != i}">
        <iframe title="map" width='425' height='350' frameborder='0' 
            scrolling='no' marginheight='0' marginwidth='0'    
            src='{mapURLPrefix}{station.lat},{station.long}{mapURLSuffix}'>
        </iframe>
    </div>
    {/each}
  </div>
  <div class="footer">
    <p>Moving Water v1.0</p>
    <br/>
    <p>Created by <a href="https://www.mgluf.com/">Matt Gluf</a></p>
  </div>
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

  .footer p:first-of-type {
    color: black;
    font-weight: bold;
  }

  .footer p {
    margin: 0;
  }

</style>