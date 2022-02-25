<script>
  export let data;
  console.log("infoBar", data)

  let selected = 0;
  
</script>

<nav class="info-bar">
  <select bind:value={selected} class='river-select'>
    {#each data as station, i}
      <option value={i}>{station.label}</option>
    {/each}
  </select>

  <ul class="river-data">
    <li>{data[selected].river}</li>
    <li>{data[selected].label}</li>
    <li>
      {data[selected].readings.value}
      {data[selected].unit}
    </li>
    <li>{data[selected].measure}</li>
    <li>Data recorded on {data[selected].readings.date}</li>
  </ul>

</nav>






<style>

</style>