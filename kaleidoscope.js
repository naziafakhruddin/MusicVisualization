/* Extension of blocks mid, high and low . Constructor function by the name of  
Kaleidoscope visualization using noise and FFT.getEnergy()*/
class Kaleidoscope{
	constructor(){
		//vis.name 
		this.name = "Kaleidoscope";
		//noiseStep for scaling the noise value
		this.noiseStep = 0.001;
		//offset noise value is zero at first
		this.prog = 0;
		//angle variable
		this.angle = 20;
		//rotation variable
		this.rot = 0;
		this.onResize();
	}
	onResize(){
		this.size = width/20;
	}
	draw(){
		background(0);
		
		push();
		let spectrum = fourier.analyze();
		let energy = fourier.getEnergy('highMid');
		let energy1 = fourier.getEnergy('bass');
		let energy2 = fourier.getEnergy('treble');
		/*
		kleido and noiseLine which are the methods of Kaleidoscope class
		is called in the draw() and giving the values of the getEnergy()in both .
		*/
		this.kaleido(energy1,energy2)
		
		this.noiseLine(energy)
		pop();
	}
	noiseLine(b){
		push()
		
		//translate the vertex shape to the center of the canvas.
			translate(width/2,height/2)
			beginShape()
			for(let i = 0; i < sliderNoise.value(); i++){
				fill(i * b ,163,163,150);
				stroke(i + b, 163, 163)
				strokeWeight(2)
			//mapping the x and y axis of the vertex using noise()
				let x = map(noise(i + this.noiseStep + this.prog ),
							 0, 1, -80, 80)
				let y = map(noise(i + this.noiseStep + this.prog + 100 ),
							 0, 1, -80, 80)
				vertex(x, y)
				
			}
			
			endShape(CLOSE)
			
		//the noise will start interacting with the vertex shape at bass frequency is greater than 150.
			if(b > 50){
				//offset noise value is incremented
				this.prog += 0.008;
			}
		pop()
	
	}
	kaleido(h,t){
		push()

		//translating the shapes to the center of the canvas
			translate(width / 2, height / 2);
			//loop through the angle which is 20
			for (let i = 0; i < this.angle; i++){  
				push()  
				//rotate to position the shapes using 'i' variable
				rotate(i)
				//when i is odd number
				if(i % 2 == 1){
				// scaling and inverting vertically the shapes
					scale(1, -1);	
				}
			
				strokeWeight(15);
				//rotating with the rotattion variable is divided by 50 ,to give movement.
				rotate(this.rot/50)
				//drawing the shapes.
				stroke(this.angle * i, 100, 100,150);
				noFill()
				rect(this.size + 100, this.size + 100, h+20, h+20,20);

				stroke(this.angle * i, 200, 100, 200);
				rect(this.size + 50, this.size + 50, t/10, t/10,20);

				stroke(this.angle * i, 100, 100, 170);
				rect(t + this.size, t + this.size + 50, 50, 50,10);

				stroke(this.angle * i, 100, 100, 160);
				rect(h + this.size + 50, h + this.size + 50, 50, 50, 10);
				//the getEnergy()of fourier will start rotating when the highMid frequency is greater than 50.
				if(h > 50){
					//the rotation value is incremented
					this.rot += 0.01
				}
				
				pop();
				
				
			}
		pop()
	}

}
