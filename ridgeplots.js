/*
1. Draw the multiple bezier curves rows without any output in the shape of 
musical note.
    a.Position the plot on the screen and workout the how wide the plot will be.
    b.Draw the rows of bezier curves using for loop,that move up on the screen 
    at regular intervals.
        i.Create a 2D array of rows of bezier curves add one to the array 
        every x frames.
        ii.Add wavy movement to the rows while moving upwards using the sin * 0.5 /4 
        to give the 3D effect in the x-axis.
        iii.each frame clear screen and decrease the y coordinates of each line.
        iv. if rows y is smaller and reaches almost to the top of the plot's y
         then remove from array by splicing it.
2.Add the music output using FFT.waveform.
    a. add the FFT.waveform to the y-axis ,so the changes in the y-axis.
3.On resize the bezier curves rows should adjust to the width and height of the 
screen.
*/
class Ridgeplots{
    constructor(){
        this.name = 'Ridgeplots';
        this.speed = 0.8;
        this.output = [];
        this.onResize() 
        /* Starting position of the plot startX and endY is where the plot finishes and
        startY make the plot appear in the center of the screen */
        this.startX = width/5;
        this.endY = height/5;
        this.startY = height - this.endY;
    }
    onResize()
    {    
        //width of the plot
        this.spectrumWidth = (width/5) * 3;
    }
    
    addWave()
    {   
        let w = fourier.waveform(); //FFT waveform
        let outputWave = [];  //inner empty array
        let smallScale = 5;
        let bigScale = 80;
        for (let i = 0; i < w.length; i++) 
        {   
            // Only 20th of 1024 waveform points are used as the element of the array.
            if (i % 20 == 0) 
            {   
                let x = map(i, 0, 1024,
                            this.startX, this.startX + this.spectrumWidth);
                if (i < 1024 * 0.25 || i > 1024 * 0.75) 
                {
                    let y = map(w[i], -1, 1, -smallScale, smallScale);
        
                    outputWave.push({
                        x: x,
                        y: this.startY + y,
                        
                    });
                } else {
                    var y = map(w[i], -1, 1, -bigScale, bigScale);
        
                    outputWave.push({
                        x: x,
                        y: this.startY + y,
                        
                    });
                }
            }
        }
        //output of the inner wave is pushed into the array of the outer wave.
        this.output.push(outputWave);
    }
    draw(){
        push()
        background(0);
        noFill();
        strokeWeight(3);
        //add a row of bezier curves after every 50th frameCount is equal to 1 
        if (frameCount % 50 == 1) 
        {
            this.addWave();
        }
        //iterating over outer and then inner array
        for (let i = 0; i < this.output.length; i++) 
        {
            let o = this.output[i];

            for (let j = 0; j < o.length; j++) 
            {   
                /* y-coordinate calculated by decrementing the speed 
                to make the rows move upwards */
                o[j].y -= this.speed; 
                /* x-coordinate calculated by incrementing sin(i * 0.5)/4 
                for creating a wavy movement */
                o[j].x += sin(i * 0.5)/4;
                stroke(j * i, 255, 0);
                /* Bezier curves making the musical note rows */
                bezier(o[j].x, o[j].y,
                    o[j].x - 15, o[j].y + 15 ,
                    o[j].x + 15,o[j].y + 15 ,
                    o[j].x, o[j].y - 20)
            }
           //splice one row every time it reaches the close to top of the plot
            if (o[0].y < this.endY) 
            {
                this.output.splice(i, 2);
            }
        }
        pop()
    }
}