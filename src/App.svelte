<script>
import { onMount } from "svelte";
// import { parse } from "parse.js";

let filter;

function parse(data) {
  
  let parsed = []
  let items = data.items

  parsed = items.map(obj => ({
    label: obj.label,
    notation: obj.notation,
    river: obj.riverName,
    // sometimes measures has more than one object, which will throw an undefined
    measure: obj.measures.label,
    unit: obj.measures.unitName,
  }))

  return parsed
}

onMount(async () => {
  fetch("https://environment.data.gov.uk/hydrology/id/stations?_limit=20&observedProperty=waterFlow")
  .then(response => response.json())
  .then(data => {
    console.log("raw", data);
    filter = parse(data);
    console.log("parsed", filter);
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