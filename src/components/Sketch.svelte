<script>
  import P5 from 'p5-svelte';

  export let station;

  const sketch = (p5) => {
    // console.log('initSketch: sketch: station: ', station);
    //https://www.openprocessing.org/sketch/157576
    p5.disableFriendlyErrors = true;
    var num = 500;
    var noiseScale=200;
    var particles = [num];
    let widthVariable = 0.7;
    let heightVariable = 1;
    
    p5.setup = () => {
      if(p5.windowWidth < 768){
        widthVariable = 1;
        heightVariable = .6;
      }
      p5.createCanvas((p5.windowWidth * widthVariable), p5.windowHeight * heightVariable);
      p5.noStroke();
      for (let i=0; i<num; i++) {
        //x value start slightly outside the right of canvas, z value how close to viewer
        var loc = p5.createVector(p5.random(p5.width*-1.2), p5.random(p5.height), 2);
        var angle = 0; //any value to initialize
        var dir = p5.createVector(p5.cos(angle), p5.sin(angle));
        var speed = p5.random(0.5,2);
        particles[i]= new Particle(loc, dir, speed);
      }
    }
    
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }
    p5.draw = () => {

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

        if(station.readings.value > 5 ){
          d = (station.readings.value) / 5;
        } else{
          d = (station.readings.value) * 2;
        }
        //direction change 
        vel.mult(this.speed*d); //vel = vel * (speed*d)
        this.loc.add(vel); //loc = loc + vel
      }
      checkEdges(){
        if (this.loc.x<0 || this.loc.x>p5.width || this.loc.y<0 || this.loc.y>p5.height) {    
          this.loc.x = p5.random(p5.width * 1.2);
          this.loc.y = p5.random(p5.height);
        }
      }
      update(){
        p5.fill(255);
        p5.ellipse(this.loc.x, this.loc.y, this.loc.z);
      }
    }
  }
</script>

<P5 {sketch} />