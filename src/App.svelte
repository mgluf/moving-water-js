<script>
import { onMount } from "svelte";
import parseStations  from "./parseStations.js";
import fetchReadings from "./fetchReadings.js";

let stations
let readings

// Pull 20 Stations with a waterFlow measurement
onMount(
	async () => {
		fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=20&observedProperty=waterFlow")
		.then(response => response.json())
		.then(data => {
			console.log("raw", data);
			stations = parseStations(data)
			console.log("stations", stations);

			// pull readings from each station from 4 days ago to today
			stations.map(station => {
				fetchReadings(station.notation, 4)
			})


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
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>