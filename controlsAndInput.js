//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		this.playbackButton.hitCheck()
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		//console.log(keycode);
		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
			if(visNumber){
			   let fs = fullscreen()
			   fullscreen(!fs)
			 } 
		}
	};
                 
    this.mySelectEvent = function(item) {
		stroke(255);
		console.log("It is a " + item + "!");
		vis.selectVisual(item);
    }


	//draws the playback button and potentially the menu
	this.draw = function(){
		push()
		//playback button 
		this.playbackButton.draw();
		pop();

	};

}


