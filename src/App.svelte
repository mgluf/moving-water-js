<script>
import parseStations  from "./data-functions/parseStations.js";
import fetchReadings from "./data-functions/fetchReadings.js";
import InfoBar from "./components/InfoBar.svelte"
import Sketch from "./components/Sketch.svelte"

// The index of the current station
let selected = 0;

// Load data from API
// Pull 20 Stations with a waterFlow measurement
async function load()  {
	return await fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=25&observedProperty=waterFlow")
		.then(response => response.json())
		.then(async (data) => {
			console.log("raw", data);
      // filter unwanted data from station pull and build stations object
			let stations = parseStations(data)
			// pull readings from each station from 7 days ago to today and add parsed readings to them
			for (const station of stations) {station.readings = await fetchReadings(station.notation, 7);}

      // console.log(stations);
			return stations;
	
		}).catch(error => {
			console.log(error);
		})
}

</script>

<svelte:head>
	<title>Moving Water</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
</svelte:head>

{#await load()}
	<div class="lds-ripple"><div></div><div></div></div>
	{:then stations}
	<div class="app">
		<InfoBar data={stations} bind:selected={selected}>
			<p id="locale">Select River</p>
			<select class='river-select' bind:value={selected}>
				{#each stations as station, i}
					<option value={i}>{station.river}</option>
				{/each}
			</select>
		</InfoBar>
		<div class="river">
			<Sketch station={stations[selected]} />
		</div>
	</div>
{/await}

<style>
	.app {
		display: grid;
		grid-template-columns: 30% 1fr;
		height: 100%;
    overflow: hidden;
    font-family: IBM Plex Mono;
	}

	.river {
		background-color: black;
	}

	select {
    font-size: 1.2rem;
    margin: 0 0 0.5em -1px;
    background-color: white;
		max-width: 100%;
  }

	#locale {
		margin-top: 2rem;
		margin-bottom: 5px;
		font-size: .9rem;
		color: #292929;
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

  @media only screen and (max-width: 768px) {
    .app {
      grid-template-columns: auto;
      grid-template-rows: 1fr 1fr;
    }

    #locale {
      margin-top: 1rem;
    }
  }
</style>