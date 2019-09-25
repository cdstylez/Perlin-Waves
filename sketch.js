/*

Perlin Mountain Waves - Cedric Dwamena

 
With this Perlin Noise animation I’m portraying a sea, with rain pouring down into it, creating large waves through the water. These waves are then in turn creating snowy mountains as you quickly move through the sea.



I wanted it to come across as if one is looking through the window of a boat, or laying on the seabed hence why I decided to flip the Y axis on its side. I also feel it better showed the rain like aspect. 
I tinkered with the noiseDetail to give the mountains that sharper, snowier look. I was debating between setting the falloff to 0.8 or even 0.7 which gave it a more full ice mountain look but I felt it took away from the wave like aspect so I settled on 0.6, with this falloff you can see the mountain like shapes but also they’re a bit more transparent which helps the wave/rain affect.


I’m pleased with the overall look of the animation. The colors are appealing and the ability to alter the speed of it and things of that nature make it a quite flexible animation that can be built upon and more complex(particle systems, timed structural/color changes etc).
I think If I had a little bit more time, I would look into adding more elements to amplify what I was trying to do. Maybe an actual boat flowing around in the water and make the mountains a bit more detailed(snow/ice/craters), possibly also make the sky black and sprinkle stars across it. there’s is certainly a lot of possibilities, I do have a tendency to overdue when I get into it so I decided to keep it a bit more simple so overall I am happy with how it came out.

*/

var cols, rows;
var scl = 10; //Mountain/Wave height
var w = 1400; //width of sky
var h = 1000; //height of sky
var waves= []; 
var floating = 0;

function setup() {
  createCanvas(512, 512, WEBGL);
  cols = w / scl;
  rows = h/ scl;
}

function draw() {
floatWave(); //call animation function
}

function floatWave(){
    for (var x = 0; x < cols; x++) {
    waves[x] = [];
    for (var y = 0; y < rows; y++) {
      waves[x][y] = map(noise(x, y), 0, 1,-50, 50); 
    }
  } //the noise

floating -=0.1;//animation looping in a backwards motion
yoff = floating;

for (var y = 0; y < rows; y++) {
var xoff = 0;
    for (var x = 0; x < cols; x++) {
        waves[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.05;
        }
yoff += 0.07
}//the offset noise
    
background(0, 6, 230);//sea color
translate(0, 50);
rotateX(PI/3);//x in 60 degree angle
rotateY(PI/5);//y in 36 degree angle
translate(-w/2, -h/2);
for (var y = 0; y < rows-1; y++) {
fill(255, 50, 0, 50); //rain/wave/mountain/sky color
    
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
    noiseDetail(8, 0.6);
      vertex(x*scl, y*scl, waves[x][y]);
      vertex(x*scl, (y+1)*scl, waves[x][y+1]);
    }
    endShape();//the shapes
  }

}