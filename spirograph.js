/*
  1- Draw multiple ellipse arranged in a circular fashion.
      a- use the trigonometric formula for sine and cosine to arrange the ellipses 
      according to their polar coordinates.
      b-Use nested loop to make multiple circular rings 
  2- Make a Nested loop with slider as the outer loop and radius as the inner loop.
      a- Slider function is added in the outer loop to  increasing and decreasing the
       number of ellipses to add to the Spirograph like appearance.
  3- Inner nested loop is for radius of the ellipses ,arranged in a circular pattern 
     with spacing.
  4- Make the ellipses rotate.
      a- Rotation is achieved by incrementing the angle and the radius.
  5- Add the Amplitude levels to the width and height of the ellipses to react to the sound.
      a- Amplitude levels changes the shape of the ellipses .
      b- Multiple rings when it react to sound will make Spirograph pattern.

*/ 

//Constructor function for the Spirograph extension using FFT .
class Spirograph {
  constructor() {
    //vis name
    this.name = "Spirograph";
    //polar coordinate r is for
    this.r = 2;
    //angle
    this.a = 0;
    //spacing
    this.gap = 8;
  }
  onResize(){
    //x and y axis
    this.x;
    this.y;
  }
  /*
   draw() which is the method of spirograph 
  containing the shapes which are arranged using their 
  polar coordinates and reacting to music .The amplitude levels are stored in 
  the variable vol and used to change the size of the ellipse's according to
  different levels.
  */
  draw() {
    background(0);
    push();
    //amplitude levels are recorded in the vol variable
    var vol = amp.getLevel();

    //All the shapes are translated to the center of the canvas.
    translate(width / 2, height / 2);

    /*
      In the Nested loop the outer loop have the slider function to control
      the number of ellipses 
     */
    var slider = sliderSpiro.value();

    for (let i = 0; i < slider; i += this.gap) {
      /* 
        Nested Loop to arrange the shape in the circular fashion ,seperated 
        by a spacing of 8 between them and . 
      */
      for (let j = 0; j < this.r; j += this.gap) {
        //trigonometry is used to calculate the x and y axis values.
        this.x = this.r * cos(this.a);
        this.y = this.r * sin(this.a);
        //rotating the shapes using the angle parameter
        rotate(this.a);
        noFill();
        strokeWeight(2);
        /*
        All the shapes have their own push and pop to consolidate 
        their codes from interacting with the others
        */
        push();
        stroke(100 + i, i + j, 100);
        ellipse(30, 0, this.y + vol * 600, this.x + vol * 600);
        pop();
        push();
        stroke(155 + j, 255, i);
        ellipse(100, 0, this.y + vol * 800, this.x + vol * 800);
        pop();
      
        push();
        stroke(i, 163 + j, 163 + i);
        ellipse(170, 0, this.y + vol * 1200, this.x + vol * 1200);
        pop();
      }
    }
    //polar coordinate r and the angle variables are incremented
    this.r += 0.003;
    this.a += 0.0005;

    pop();
  }
}
