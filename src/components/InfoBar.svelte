<script>
  export let data;
  console.log("infoBar", data)

  let selected;
  
  
</script>

<nav class="info-bar">
  <select bind:value={selected} class='form-control'>
    {#each data as station, i}
      <option value={i}>{station.label}</option>
    {/each}
  </select>

  {#if selected}
    <ul>
      <li>{data[selected].river}</li>
      <li>{data[selected].label}</li>
      <li>
        {data[selected].readings.value}
        {data[selected].unit}
      </li>
      <li>{data[selected].measure}</li>
      <li>Data recorded on {data[selected].readings.date}</li>
    </ul>
  {/if}



  <!-- {#each data as station}
  <ul>
    <li>{station.river}</li>
    <li>{station.label}</li>
    <li>
      {station.readings.value}
      {station.unit}
    </li>
    <li>{station.measure}</li>
    <li>Data recorded on {station.readings.date}</li>
  </ul>
  {/each} -->
</nav>






<style>

</style>