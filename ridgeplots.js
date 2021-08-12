class Ridgeplots{
    constructor(){
        this.name = 'Ridgeplots';
        this.speed = 0.8;
        this.output = [];
        this.onResize()
    }
    onResize()
    {
        this.startX = width/5;
        this.endY = height/5;
        this.startY = height - this.endY;
        this.spectrumWidth = (width/5) * 3;
    }
    
    addWave()
    {
        let w = fourier.waveform();
        let outputWave = [];
        let smallScale = 5;
        let bigScale = 80;
        for (let i = 0; i < w.length; i++) 
        {   
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
        this.output.push(outputWave);
    }
    draw(){
        background(0);
        noFill();

        strokeWeight(3);
        if (frameCount % 50 == 1) 
        {
            this.addWave();
        }
        for (let i = 0; i < this.output.length; i++) 
        {
            let o = this.output[i];

            for (let j = 0; j < o.length; j++) 
            {
                o[j].y -= this.speed;
                o[j].x += sin(i);
                stroke(j * i, 255, 0);
                bezier(o[j].x, o[j].y,
                    o[j].x - 15, o[j].y + 15 ,
                    o[j].x + 15,o[j].y + 15 ,
                    o[j].x, o[j].y - 20)
            }
           
            if (o[0].y < this.endY) 
            {
                this.output.splice(i, 1);
            }
        }
    }
}