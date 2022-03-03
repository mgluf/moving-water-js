<script>
import P5 from 'p5-svelte';
import initSketch from './sketch.js';

import parseStations  from "./data-functions/parseStations.js";
import fetchReadings from "./data-functions/fetchReadings.js";
import InfoBar from "./components/InfoBar.svelte"

// let stations

// Pull 20 Stations with a waterFlow measurement
async function allData()  {
		return await fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=20&observedProperty=waterFlow")
		.then(response => response.json())
		.then(async (data) => {
			console.log("raw", data);
      // filter unwanted data from station pull and build stations object
			let stations = parseStations(data)
			// pull readings from each station from 4 days ago to today and add parsed readings to them
			for (const station of stations) {station.readings = await fetchReadings(station.notation, 7);}
			// console.log("onMount", stations)

      console.log(stations);
			return stations;
	
		}).catch(error => {
			console.log(error);
			return [];
		});

  // return stations
}


let selected = 0; // current station (equivilant to index of station in array)
let stations;
// Await allData();
const load = async () => {
	stations = await allData();
	// const sketch = initSketch(stations, selected);

	return stations
}

const sketch = initSketch(stations, selected);

// $: {
	
// 	console.log(selected);
// }

// let promise = allData();
// console.log(promise);

</script>

	{#await load()}
		<div class="lds-ripple"><div></div><div></div></div>
		{:then stations}
		<div class="app">
			<InfoBar data={stations} bind:selected={selected}>
				<p id="locale">Select Locale</p>
				<select class='river-select' bind:value={selected}>
					{#each stations as station, i}
						<option value={i}>{station.label}</option>
					{/each}
				</select>
			</InfoBar>
			<div class="river">
				<P5 sketch={sketch} />
			</div>
		</div>
	{/await}

<style>
	.app {
		display: grid;
		grid-template-columns: 30% 1fr;
		height: 100%;
    overflow: hidden;
	}

	.river {
		background-color: black;
	}

	select {
    font-size: 18px;
  }

	#locale {
		margin-top: 2rem;
		font-family: monospace;
		margin-bottom: 5px;
		font-size: 14px;
		color: #575656;
	}

	.lds-ripple {
		display: inline-block;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -40px;
		margin-left: -40px;
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid black;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>