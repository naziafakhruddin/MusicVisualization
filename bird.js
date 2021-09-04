/*
  1- Draw the bird with the bezier curve sitting on a perch.
    a- Position of the bird and the perch should change when the canvas is resized.
    b- Draw method should have the bird and the perch methods in  it.
  2- Add flowers to the surrounding by calling method inside the method.
    a- Make a method of flower with parameters(x,w,h,r,g,b,) need to be assigned .
    i- Call the method flower inside the method perch and assign the values to 
    flowers at differnt x-axis.
    ii- Using for loop make multiple rows of these flowers with stem and stars in the sky.
  3- Add amplitude to the beak and wings of the bird which make it look like singing.
    a- The upper beak should move up as the amplitude levels are minus from the y-axis.
    b- The lower beak should move down as the amplitude levels are added to the y-axis
  4- Add FFT - getEnergy() to the flowers and the stars  .
    a- Flowers colours will vary according to treble,bass and mid frequencies
     using FFT.get energy(). 
    b- Stars sizes change as the frequency levels of treble and mid changes.
  5- Amplitude values added to the stem of the flower.
    a- Stem of the flower have amplitude level add to the y-axis.
  6- OnResize the position of the bird will change.

 */


class Bird {
    constructor() {
      this.name = "Bird";
      this.onResize()

    }
    onResize(){
      this.x = width/2;
      this.y = height/2;
    }
    draw() {
      push()
      background(220);  
      this.perch()
      this.birdBody();
      pop()
    }
    perch(){
      let spectrum = fourier.analyze();
      let energy = fourier.getEnergy('treble');
      let energy1 = fourier.getEnergy('bass');
      let energy2 = fourier.getEnergy('mid');
      //perch
      noFill()
      stroke(184, 134, 11);
      strokeWeight(28);
      line(this.x , this.y + 312,this.x - 97,this.y + 321)
      line(this.x - 87,this.y + 318,this.x - 87,this.y + height )
      line(this.x - 8 ,this.y + 315,this.x - 8 ,this.y + height )
     
      //method flower is called inside method perch and values to arguments are given.
      for(let i = 0; i < width - 50; i += 80){
          this.flower(24 + i, 25, 60, 255, 240+energy2, 0.5 * energy1)
          this.flower(54 + i, 25, 60, 80 + energy1, 10 + energy, 255) 
          this.flower(74 + i, 25, 60, 180 + energy, 20 - energy1, 155)
          //stars
          let m =map(sin(i),1,-1,0,400)
          fill(255,255,0) 
          ellipse(i + 20, m, 3 + energy2/20, 3 + energy2/20)
          ellipse(i + 5, m + 120, 3 + energy/20, 3 + energy/20)              
      }
    }

    //Method flower with the arguments of x, w,h,r,g,b 
    flower(x,w,h,r,g,b){
      stroke(0,168,0)
      strokeWeight(3)
      //stem
      let vol = amp.getLevel()
     
      line(x, height, x, 1090 - vol * g)
      //leaves
      fill(0, 168, 0)
      stroke(100, 168, 0)
      ellipse(x - 8, height, 10, 120 - vol * 200)
      ellipse(x + 8, height, 8, 100)
      //flower bulb
      noStroke()
      strokeWeight(1)
      fill(r, g, b)
      arc(x, 1090 - vol * g, w, h,-QUARTER_PI,HALF_PI * 2)
      ellipse(x, 1090 - vol * g, w-15, h-30)
    }

    birdBody() {
      let vol = amp.getLevel();
      //body
      noFill()
      strokeWeight(4);
      stroke(0, 168, 168);
      bezier(
        this.x,
        this.y,
        this.x - 5,
        this.y - 70,
        this.x - 150,
        this.y - 80,
        this.x - 150,
        this.y + 120
      );
      //neckline
      strokeWeight(8);
      stroke(168,0,0)
      arc(this.x-77,this.y + 80, 138, 20, 0, PI)
      
      //wing
      strokeWeight(4);
      stroke(0, 168, 168);
      fill(168, 10 , 0);
      bezier(
        this.x - 150,
        this.y + 120,
        this.x - 230,
        this.y + 280,
        this.x - 230 - vol * 100,
        this.y + 350 - vol * 100,
        this.x - 180 - vol * 100,
        this.y + 300 - vol * 100
      );
      bezier(
        this.x - 180,
        this.y + 300,
        this.x - 20,
        this.y + 200 - vol * 100,
        this.x - 5,
        this.y + 100 - vol * 100,
        this.x - 150,
        this.y + 120
      );
      bezier(
        this.x - 150,
        this.y + 150 - vol * 100,
        this.x - 230,
        this.y + 280 - vol * 100,
        this.x - 250,
        this.y + 350 - vol * 100,
        this.x - 180,
        this.y + 300 - vol * 100
      )
      bezier(
        this.x - 150,
        this.y + 200 - vol * 100,
        this.x - 230,
        this.y + 280 - vol * 100,
        this.x - 230,
        this.y + 350 - vol * 100,
        this.x - 180,
        this.y + 300
      )
      
      //beak
      noFill();
      stroke(168, 0, 0);
      bezier(
        this.x,
        this.y,
        this.x + 20,
        this.y + 5 - vol * 100,
        this.x + 25,
        this.y + 20 - vol * 100,
        this.x + 30,
        this.y + 40 - vol * 100
      );
      bezier(
        this.x + 30,
        this.y + 40 - vol * 100,
        this.x + 20,
        this.y + 30 - vol * 100,
        this.x + 15,
        this.y + 30,
        this.x - 5,
        this.y + 28
      );
      bezier(
        this.x - 5,
        this.y + 28,
        this.x + 15,
        this.y + 30 + vol * 100,
        this.x + 40,
        this.y + 32 + vol * 100,
        this.x - 6,
        this.y + 48
      );
      //eye
      noFill();
      strokeWeight(2);
      stroke(0, 168, 168);
      circle(this.x - 50, this.y + 10, 20);
      fill(0, 0, 168);
      circle(this.x - 50, this.y + 10, 15);
      //neck
      noFill();
      strokeWeight(4);
      stroke(0, 168, 168);
      bezier(
        this.x,
        this.y,
        this.x - 5,
        this.y + 28,
        this.x - 12,
        this.y + 48,
        this.x,
        this.y + 118
      );
      bezier(
        this.x,
        this.y + 118,
        this.x + 2,
        this.y + 128,
        this.x + 40,
        this.y + 168,
        this.x - 90,
        this.y + 288
      );
      fill(168, 0, 0)
      bezier(
        this.x,
        this.y + 118,
        this.x - 20,
        this.y + 128,
        this.x - 40,
        this.y + 168,
        this.x - 60,
        this.y + 255
      );

      //tail
      bezier(
        this.x - 90,
        this.y + 288,
        this.x - 90,
        this.y + 288,
        this.x - 160,
        this.y + 388,
        this.x - 240,
        this.y + 398
      );
      bezier(
        this.x - 240,
        this.y + 398,
        this.x - 238,
        this.y + 388,
        this.x - 238,
        this.y + 368,
        this.x - 215,
        this.y + 295
      );
      
      //legs
      noFill()
      bezier(
        this.x - 90,
        this.y + 288,
        this.x - 90,
        this.y + 308,
        this.x - 65,
        this.y + 308,
        this.x - 65,
        this.y + 265
      );
      stroke(128,128,0)
      arc(this.x - 82, this.y + 308, 35, 10, PI, 0);
      arc(this.x - 85, this.y + 310, 30, 8, PI, 0);
    } 
}
  