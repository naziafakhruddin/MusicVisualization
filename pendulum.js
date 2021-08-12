class Pendulum {
    constructor() {
      this.name = "Pendulum";
      this.onResize();
      this.arrayOfPendulums = [];
      this.addPendulum();
      this.numberOfPendulums = 40;  
         
    }
   onResize()
    {
      console.log('resized')
    } 
    addPendulum()
    {
      for(let i=0;i<80;i++)
      { 
        let singlePendulum = {
          x:width * 0.2 + 8 * i,
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
        this.arrayOfPendulums.push(singlePendulum);
      }  
    }
    
    update() 
    {	
      let vol = amp.getLevel()
      for(let i = 0;i < this.numberOfPendulums;i++)
      {
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
}