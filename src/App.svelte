<script>
  let myBody
	const userAction = async () => {
  const response = await fetch('https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=nc&parameterCd=00060,00065&siteType=ST&siteStatus=all', {
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