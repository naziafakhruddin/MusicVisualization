
//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
//variable for p5 amplitude
var amp;
//variable for p5 dom createSelect()for selection dropdown
var chooseVis;
//variable for p5 dom createSelect()for selection dropdown
var musicSelect;
//variable for slider
var sliderNoise;
var sliderSpiro;
//var for paragraph tag
var p;
//object of music for selecting different sounds
var music = [];
var button;
var flag = false;

function preload(){
	soundFormats("mp3","wav");
	music[0] = loadSound('assets/dreams.mp3');
	music[1] = loadSound('assets/piano.mp3');
	music[2] = loadSound('assets/good.wav');
	music[3] = loadSound('assets/somethingwild.mp3');

	music[0].setVolume(0.5);
	music[1].setVolume(0.5);
	music[2].setVolume(0.5);
	music[3].setVolume(0.5);
}

function setup(){
	createCanvas(windowWidth, windowHeight); 
	background(0);
	//controls
	controls = new ControlsAndInput();
	/*
	Selectors functions for visuals and music.
	Sliders for noise and adding rings to the spirograph
	*/	
	visualSelector();
	musicSelector();
	slider();
	helpButton();
	//instantiate the fft object
	fourier = new p5.FFT();
	//instantiate the Amplitude object
	amp = new p5.Amplitude();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new Spirograph());
	 vis.add(new Kaleidoscope());
	 vis.add(new Bird()); 
	 vis.add(new Ridgeplots());  
	 vis.add(new Pendulum());
}  

//function for visualisation selector
function selectEvent(){
  let itemSelected = chooseVis.value();
  controls.mySelectEvent(itemSelected);
}
//function for music selection
function musicSelectEvent(){
	music[0].stop();
	music[1].stop();
	music[2].stop();
	music[3].stop();
	console.log("inside select music")

	if(musicSelect.value() == "Sound1"){
	    sound = music[0]
		console.log("sound1")
	}
	if(musicSelect.value() == "Sound2"){
		sound = music[1]
		console.log("sound2")
	}
	if(musicSelect.value() == "Sound3"){
		sound = music[2]
		console.log("sound3")
	}
	if(musicSelect.value() == "Sound4"){
		sound = music[3]
		console.log("sound4")
	}
	sound.play()
	
}
function draw(){
	background(0);
	if(flag)
	{
		stroke('#87CEEB')
		textSize(30)
		background(0)
		fill('#87CEEB')
		text("Instructions", width / 2 - 120, 280)
		textSize(16)
		strokeWeight(1)
		fill(255)
		text("1 - To start  Select Visual dropdown to select \n the visualisation.",
			  width / 2 - 220, 330)
		text("2 - Then Select Music dropdown to select the music of \n your choice.",
			  width / 2 - 220, 390)
		text("3 - Use Noise Slider to change the number of edges \n of the  vertex in Kleidoscope visualisation.",
			  width / 2 - 220, 450)
		text("4 - Use Spirograph Slider to change the number of \n circles to  make the patterns like spirograph in \n Spirograph visualisation.",
			  width / 2 - 220, 530)
		text("5 - Both visualisation and music can be paused \n and played again using the Play and Pause button.",
			  width / 2 - 220, 620)
		text("6 - Press the Hide Help button to look at the \n visualisations.",
			  width / 2 - 220, 670)	  
		
	}else{
		//draw the selected visualisation
		vis.selectedVisual.draw();
		
		//draw the controls on top.
		controls.draw();
	}
	
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	vis.selectedVisual.onResize();
}

function slider(){
/*Slider for increasing or decreasing the vertices in kaleidoscope.
	The functions of p5.dom createP()to give the heading of Noise Slider 
	and createSlider() to make the slider .*/
   
	p = createP('Noise Slider');
	p.position(20,100);
	p.style('color', '#87CEEB');
	p.style('background-color', 'transparent');
	p.style('padding', '9px 35px 9px 10px');
	p.style('border', '2px solid #777');
	p.style('border-radius', '5px');
	sliderNoise = createSlider(3,20,3)
	sliderNoise.position(20,138)
	sliderNoise.style('width', '120px');
	
	/*Slider for increasing or decreasing the number of circles forming.
	The functions of p5.dom createP()to give the heading of Spirograph Slider 
	and createSlider() to make the slider . */

	p = createP('Spirograph Slider');
	p.position(20,150);
	p.style('color', '#87CEEB');
	p.style('background-color', 'transparent');
	p.style('padding', '8px');
	p.style('border', '2px solid #777');
	p.style('border-radius', '5px');
	sliderSpiro = createSlider(180,360,120)
	sliderSpiro.position(20,187) 
	sliderSpiro.style('width', '120px');
}

function visualSelector(){
	//Visualization selector using p5.dom createSelect()
	chooseVis = createSelect();  
	chooseVis.position(20, 18);
	chooseVis.style('width', '130px');
	chooseVis.style('height', '35px');
	chooseVis.style('color', '#87CEEB');
	chooseVis.style('border', '2px solid #777');
	chooseVis.style('border-radius', '5px');
	chooseVis.style('background-color', 'transparent');
	chooseVis.option("Select Visuals");
	chooseVis.option("Spectrum");
	chooseVis.option("Wavepattern");  
	chooseVis.option("Needles");
	chooseVis.option("Spirograph");
	chooseVis.option("Kaleidoscope");
	chooseVis.option("Bird");
	chooseVis.option("Ridgeplots");
	chooseVis.option("Pendulum");
	chooseVis.selected("Select Visuals");
	chooseVis.changed(selectEvent);
}

function musicSelector(){
	//Music Selection using p5.dom createSelect()
	musicSelect = createSelect()
	musicSelect.position(20, 65);
	musicSelect.style('width', '130px');
	musicSelect.style('height', '38px');
	musicSelect.style('color', '#87CEEB');
	musicSelect.style('border', '2px solid #777');
	musicSelect.style('border-radius', '5px');
	musicSelect.style('background-color', 'transparent');
	musicSelect.option("Select Music")
	musicSelect.option("Sound1")
	musicSelect.option("Sound2")
	musicSelect.option("Sound3")
	musicSelect.option("Sound4")
	musicSelect.selected("Select Music");
	//Event handler which uses musicSelectEvent as callback function
	musicSelect.changed(musicSelectEvent) 
}
function helpButton(){
	button = createButton("Show Help");
	button.position(20,height-50);
	button.style('width', '130px');
	button.style('height', '38px');
	button.style('fontSize', '15px');
	button.style('color', '#87CEEB');
	button.style('border', '2px solid #777');
	button.style('border-radius', '5px');
	button.style('background-color', 'transparent');
	button.mousePressed(instructions)
}
function instructions(){
	if(flag == false){
		flag = true
		button.html('Hide Help')
	}else{
		flag = false
		button.html('Show Help')
	}
		
}
