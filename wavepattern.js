//draw the waveform to the screen
function WavePattern(){
	//vis name
	this.name = "Wavepattern";

	this.onResize = function(){
		console.log('resized')
	}
	
	//draw the wave form to the screen
	this.draw = function(){
		push();
		noFill();
		stroke(255, 0, 0);
		strokeWeight(3);

		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++){
			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, 0, width);
			var y = map(wave[i], -1, 1, 0, height);

			vertex(x, y);

		}
		endShape();
		
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++){
			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, 0, width);
			var y = map(wave[i], -1, 1, 0, height);
		
			stroke(x+i,i/2+y,0)
			//making a new bezier line using the mapped x and y coordinates
			bezier(x,y+150,x+20,y+150,x-20,y+150,x,y+150)
		
		}
		
		pop();
	};
}
