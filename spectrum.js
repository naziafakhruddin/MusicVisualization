function Spectrum(){
	this.name = "Spectrum";

	this.onResize = function(){
		console.log('resized')
	}
	this.draw = function(){
		push();
		success = true
		var spectrum = fourier.analyze();
		noStroke();
		//fill(0,255,0)
		// for (var i = 0; i< spectrum.length; i++){
		// 	var x = map(i, 0, spectrum.length, 0, width);
		//     var h = -height + map(spectrum[i], 0, 255, height, 0);
		//     rect(x, height, width / spectrum.length, h );
  // 		}


		for(var i = 0; i<spectrum.length; i++){

			//fade the colour of the bin from green to red
			var g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			//draw each bin as a rectangle from the left of the screen
			//across
			var y = map(i, 0, spectrum.length, 0, height);
			var w = map(spectrum[i], 0, 255, 0, width);
			rect(0, y, w, height/spectrum.length);
		}
		pop();
	};
}

/*
function Spectrum(){
	this.name = "Spectrum";

	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
		var amplitude = new p5.Amplitude()
        var level = amplitude.getLevel()
		noStroke();
		for (var i = 0; i< spectrum.length; i++){
            // spectrum showing horizontally
            var h = map(spectrum[i], 0, 255, 0, height);
            var y = map(i, 0, spectrum.length, 0, height);
            var w = map(spectrum[i] * 3, 0, 255, 0, width);
            //colour change
            var colourGreen = map(level,0,1,((i*0.38)-(h*0.5)),height);
            fill(255,colourGreen,0)    
            rect(0, y, w, (h/spectrum.length) * 2)
  		}
	
		pop();
	};
}
*/