<script>
import { onMount } from "svelte";
import parseStations  from "./parseStations.js";
import fetchReadings from "./fetchReadings.js";

let stations
let readings = [];

// Pull 20 Stations with a waterFlow measurement
onMount(
	async () => {
		fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=20&observedProperty=waterFlow")
		.then(response => response.json())
		.then(async (data) => {
			console.log("raw", data);
			stations = parseStations(data)
			console.log("stations", stations);

			// pull readings from each station from 4 days ago to today
      for (const station of stations) {
        readings.push(await fetchReadings(station.notation, 4))				
      }

      console.log("readings", readings)

		}).catch(error => {
			console.log(error);
			return [];
		});
});

</script>

<main>
	<h1>River Water</h1>
  <div>
  </div>
</main>

<style>

</style>