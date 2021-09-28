<script>

  // 00055	Physical	Stream velocity, feet per second
  // 00056	Physical	Flow rate of well, gallons per day
  // 00058	Physical	Flow rate of well, gallons per minute
  // 00059	Physical	Flow rate, instantaneous, gallons per minute
  // 00060	Physical	Discharge, cubic feet per second
  // 00061	Physical	Discharge, instantaneous, cubic feet per second
  // 00081	Physical	Apparent color, water, unfiltered, platinum-cobalt units
  // 00164	Physical	Flow, gallons per batch



  let myBody
	const userAction = async () => {
  const response = await fetch('https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=nc&parameterCd=00060&siteType=ST&siteStatus=active', {
    method: 'POST',
    body: myBody, // string or object
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(myJson);
}

userAction()



</script>

<main>
	<h1>Hello</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
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