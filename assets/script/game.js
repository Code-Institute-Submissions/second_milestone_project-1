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
	    Info
	],
};

const StoryContent = [      //set story text variable
	"The Year 3001 AD...",
	"The Alien Hoards are battling through the Galaxy, on a quest to destroy ALL mankind!", 
	"The Human Fleet, on intel gathered from an Alien Satellite, has gone out to get the", 
	"Mothership and put an end to this reign of terror!",
	"Not knowing this is a devious Alien trick, YOU are the only ship left behind to",
	"protect our Outpost on Gamma10 and uphold peace in the sector...",
	"",
	"On the scanner, in the distance, what seems to be an asteroid field is heading straight",
	"towards Gamma 10. But wait, whats that moving inside it?????",
	"",
	"BATTLE STATIONS!! We have been dooped, the Alien Hoard is in this sector! CONTACT the Fleet!",
	"You must ATTACK and slow them down until the Fleet arrives! Your our only HOPE!",
	"WATCH OUT FOR THE ASTEROIDS!"
];

const Controls = [      //set controls text variable
	"GAME CONTROLS",
	"Use Cursors to FLY      Press Space for LASERS      Press N for NUKES"      
];

var game = new Phaser.Game(config);  	//sets game variable to new Phaser Game with parameters of config