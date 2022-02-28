<script>
import P5 from 'p5-svelte';

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
let selected = 0; // current station (equivilant to index of station in array)

// VISUALIZATION
const sketch = (p5) => {
		//https://www.openprocessing.org/sketch/157576
		p5.disableFriendlyErrors = true;
		var num = 70;
		var noiseScale=200;
		var particles = [num];
		
		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			p5.noStroke();
			for (let i=0; i<num; i++) {
				//x value start slightly outside the right of canvas, z value how close to viewer
				var loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), 2);
				var angle = 0; //any value to initialize
				var dir = p5.createVector(p5.cos(angle), p5.sin(angle));
				var speed = p5.random(0.5,2);
				// var speed = random(5,map(mouseX,0,width,5,20));   // faster
				particles[i]= new Particle(loc, dir, speed);
			}
		}
		
		p5.windowResized = () => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
		}
		p5.draw = () => {
			let start = p5.millis();

			// optimization bottleneck. Link below outlines storing generated particles in an array 
			// and passing them between a stored and stream array in order to prevent new particles 
			// from being created constantly
			// https://forum.processing.org/two/discussion/25254/performance-optimization-for-p5-js-of-particles-system

			p5.fill(0, 20);
			p5.noStroke();
			p5.rect(0, 0, p5.width, p5.height);
			for (let i=0; i<particles.length; i++) {
				particles[i].run();
			}

			let end = p5.millis();
			let elapsed = end - start;
			console.log("Draw: " + elapsed + "ms.")
		}
		
		class Particle{
			constructor(_loc,_dir,_speed){
				this.loc = _loc;
				this.dir = _dir;
				this.speed = _speed;
				// var col;
			}
			run() {
				this.move();
				this.checkEdges();
				this.update();
			}
			move(){
				let angle = p5.noise(this.loc.x/noiseScale, this.loc.y/noiseScale)
				let d
				this.dir.x = p5.cos(angle);
				this.dir.y = p5.sin(angle);
				var vel = this.dir.copy();

				if(stations[selected].readings.value > 5 ){
					d = (stations[selected].readings.value) / 5;
				} else{
					d = (stations[selected].readings.value) * 2;
				}
				//direction change 
				vel.mult(this.speed*d); //vel = vel * (speed*d)
				this.loc.add(vel); //loc = loc + vel
			}
			checkEdges(){
				//float distance = dist(width/2, height/2, loc.x, loc.y);
				//if (distance>150) {
				if (this.loc.x<0 || this.loc.x>p5.width || this.loc.y<0 || this.loc.y>p5.height) {    
					this.loc.x = p5.random(p5.width*1.2);
					this.loc.y = p5.random(p5.height);
				}
			}
			update(){
				p5.fill(255);
				p5.ellipse(this.loc.x, this.loc.y, this.loc.z);
			}
		}
  };



</script>

	{#await promise}
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
				<P5 {sketch} />
			</div>
		</div>
	{/await}

<style>
	.app {
		display: grid;
		grid-template-columns: 30% 1fr;
		height: 100%;
	}

	.river {
		background-color: blue;
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