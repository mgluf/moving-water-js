<script>
import { onMount } from "svelte";
import parse  from "./parse.js";
import fetchReadings from "./fetch.js";

let rivers

// Pull 20 Stations with a waterFlow measurement
onMount(
	async () => {
		fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=20&observedProperty=waterFlow")
		.then(response => response.json())
		.then(data => {
			console.log("raw", data);
			rivers = parse(data)
			console.log("stations", rivers);

			//fetch latest readings from 5 days ago up to now.
			fetchReadings(rivers[0].notation, 5)


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