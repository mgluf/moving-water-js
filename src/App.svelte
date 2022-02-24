<script>
import { onMount } from "svelte";
import parseStations  from "./data-functions/parseStations.js";
import fetchReadings from "./data-functions/fetchReadings.js";

import InfoBar from "./components/InfoBar.svelte"

let stations

// Pull 20 Stations with a waterFlow measurement
onMount(
	async () =>  {
		fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=20&observedProperty=waterFlow")
		.then(response => response.json())
		.then(async (data) => {
			console.log("raw", data);
			stations = parseStations(data)
			// pull readings from each station from 4 days ago to today and add readings to them
			for (const station of stations) {station.readings = await fetchReadings(station.notation, 4);}
			console.log("onMount", stations)
	
		}).catch(error => {
			console.log(error);
			return [];
		});
});

</script>

{#if stations}
		<InfoBar stations={stations}/>
{/if}

<style>

</style>