
export default function initSketch(stations, selected) {
  if (!stations) return () => { };
  const sketch = (p5) => {
    //https://www.openprocessing.org/sketch/157576
    p5.disableFriendlyErrors = true;
    var num = 1000;
    var noiseScale=200;
    var particles = [num];
    
    p5.setup = () => {
      p5.createCanvas((p5.windowWidth * .7), p5.windowHeight);
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
      // console.log("Draw: " + elapsed + "ms.")
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

        // const station = stations[selected];
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
  }

  return sketch;
}