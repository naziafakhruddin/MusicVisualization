/*
1. Create Pendulum object.
  a. Set default values for all the properties of Pendulum object.
  b. Assign values to each property of Pendulum object.   
2. Add multiple Pendulum objects in array of objects.
  a. Create a loop which iterates 80 times.
  b. Push each Pendulum object to array of objects. 
3. Based on Amplitude of volume change x and y of each Pendulum object in the array of objects.
  a. To create movement based on the amplitude of the sound iterate through array containing Pendulum objects.
  b. For each object assign x and y property of each Pendulum object based on the Amplitude of sound.
4. For each Pendulum object in the array of Pendulum objects change velocity, acceleration and damping to control the velocity.  
  a. To restrict movement iterate through array containing Pendulum objects. 
  b. For each object assign velocity and damping based on gravity and lenght of the Pendulum.
  c. For each object assign acceleration of each object based on gravity/length*sin(angle)
*/


class Pendulum {
    constructor() {
      this.name = "Pendulum";
      this.onResize();
      this.arrayOfPendulums = [];
      this.addPendulum();
      this.numberOfPendulums = 150;         
    }

    addPendulum()
    {
      for(let i=0;i<180;i++)
      { 
        //object of singlePendulum with it properties
        let singlePendulum = {
          x:width * 0.15 + 8 * i,
          y:0,
          d:20,
          len:i * 25 ,
          bob: createVector(0, 0),
          angle: PI / 8,
          gravity: 0.8,
          damping: 1,
          aVel: 0,
          aAcc: 0
        }
        //Push the object into the arrayOfPendulums
        this.arrayOfPendulums.push(singlePendulum);
      }  
    }
    
    update() 
    {	
      let vol = amp.getLevel()
      for(let i = 0;i < this.numberOfPendulums;i++)
      {
        //Add vol variable to the x and y-axis of the bob to react to sound
        this.arrayOfPendulums[i].bob.x = this.arrayOfPendulums[i].x + 
                                         this.arrayOfPendulums[i].len * 
                                         sin(this.arrayOfPendulums[i].angle * vol);

        this.arrayOfPendulums[i].bob.y = this.arrayOfPendulums[i].y + 
                                        this.arrayOfPendulums[i].len * 
                                        cos(this.arrayOfPendulums[i].angle * vol);

        this.arrayOfPendulums[i].aAcc =(-this.arrayOfPendulums[i].gravity/this.arrayOfPendulums[i].len) 
                                        * sin(this.arrayOfPendulums[i].angle);
        
        this.arrayOfPendulums[i].aVel += this.arrayOfPendulums[i].aAcc;
        this.arrayOfPendulums[i].angle += this.arrayOfPendulums[i].aVel;
        this.arrayOfPendulums[i].aVel *= this.arrayOfPendulums[i].damping;
        
        //drawing the pendulum with bob
        strokeWeight(3);
        stroke(255,i * 6,i * 3);
        line(this.arrayOfPendulums[i].x , this.arrayOfPendulums[i].y,
             this.arrayOfPendulums[i].bob.x, this.arrayOfPendulums[i].bob.y);    
        noStroke();
        fill(255, 255, 255);
        ellipse(this.arrayOfPendulums[i].bob.x, this.arrayOfPendulums[i].bob.y,
                this.arrayOfPendulums[i].d, this.arrayOfPendulums[i].d);
      }		
    }
    draw() 
    {
      this.update()   
    } 

    onResize()
    {  
      if(width< 550){
        this.numberOfPendulums = 50;
      }else {
        this.numberOfPendulums = 180;
      }
        
    }
  }