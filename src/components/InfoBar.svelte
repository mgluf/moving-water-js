<script>

  export let stations;
  console.log("infoBar", stations)
  // console.log(stations[0].readings.value)


</script>

<nav class="info-bar">
  {#each stations as station}
  <ul>
    <li>{station.river}</li>
    <li>{station.label}</li>
    <li>
      <!-- {station.readings.value} -->
      {station.unit}
    </li>
    <li>{station.measure}</li>
    <!-- <li>Data recored on {station.readings.date}</li> -->
  </ul>
  {/each}
</nav>






<style>

</style>