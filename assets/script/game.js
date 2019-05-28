var config = {							//game configuration parameters
	type: Phaser.AUTO,					//set Phaser to Auto, rather than webGL or Canvas
	width: this.window.innerWidth * this.window.devicePixelRatio,				//sets the game viewport width
	height: this.window.innerHeight * this.window.devicePixelRatio,				//sets the game viewport height
	backgroundColor: "black",			//sets the game viewport background
	physics: {							//load the physics property to game
		default: "arcade",				//set default property key to arcade
		arcade: {						//arcade properties set
			gravity: {					//gravity
				x: 0,					// set to 0
				y: 0 					// set to 0
			},
			debug: false,				//used to debug, if true
		}
	},
	scene: [							//load scene properties and their keys
	    MainMenu,
	],
};


var game = new Phaser.Game(config);  	//sets game variable to new Phaser Game with parameters of config