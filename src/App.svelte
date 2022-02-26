<script>
import parseStations  from "./data-functions/parseStations.js";
import fetchReadings from "./data-functions/fetchReadings.js";

import InfoBar from "./components/InfoBar.svelte"

let stations


// Pull 20 Stations with a waterFlow measurement
async function allData()  {
		await fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=20&observedProperty=waterFlow")
		.then(response => response.json())
		.then(async (data) => {
			console.log("raw", data);
      // filter unwanted data from station pull and build stations object
			stations = parseStations(data)
			// pull readings from each station from 4 days ago to today and add parsed readings to them
			for (const station of stations) {station.readings = await fetchReadings(station.notation, 7);}
			// console.log("onMount", stations)
	
		}).catch(error => {
			console.log(error);
			return [];
		});

  return stations
}

let promise = allData();

</script>

		{#await promise}
			<div>loading...</div>
			{:then stations}
			<div class="app">
				<InfoBar data={stations}/>
			</div>
		{/await}




<style>
	.app {
		display: grid;
		grid-template-columns: auto 1fr;
		height: 100%;
	}
</style>