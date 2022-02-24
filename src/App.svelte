<script>
import { onMount } from "svelte";
import parseStations  from "./parseStations.js";
import fetchReadings from "./fetchReadings.js";

let stations

// Pull 20 Stations with a waterFlow measurement
onMount(
	async () => {
		fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=20&observedProperty=waterFlow")
		.then(response => response.json())
		.then(async (data) => {
			console.log("raw", data);
			stations = parseStations(data)

			// pull readings from each station from 4 days ago to today
      for (const station of stations) {
				station.readings = await fetchReadings(station.notation, 4);				
      }
			console.log("stations with readings", "\n", stations);

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