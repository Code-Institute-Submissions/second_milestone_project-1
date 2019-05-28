var config = { //game configuration parameters
    type: Phaser.AUTO, //set Phaser to Auto, rather than webGL or Canvas
    width: this.window.innerWidth * this.window.devicePixelRatio, //sets the game viewport width
    height: this.window.innerHeight * this.window.devicePixelRatio, //sets the game viewport height
    scale: { //set scale property game
        mode: Phaser.Scale.SHOW_ALL, //mode is SHOW_ALL
        autoCenter: Phaser.Scale.CENTER_BOTH //center both axis
    },
    backgroundColor: "black", //sets the game viewport background
    physics: { //load the physics property to game
        default: "arcade", //set default property key to arcade
        arcade: { //arcade properties set
            gravity: { //gravity
                x: 0, // set to 0
                y: 0 // set to 0
            },
            debug: false, //used to debug, if true
        }
    },
    scene: [ //load scene properties and their keys
        MainMenu,
        Info,
        Level1,
        Level2,
        BossLevel,
        Victory,
        Paused
    ],
};

var maxLives = 3; //declares maxLives Global Variable
var currentLives = maxLives; //declares current lives Global Variable
var RIP = false; //declares RIP switch Global Variable
var LevelRestartLives = 1; //set restart lives to 1
var LevelRestart = 0; //declare level restart available as 0
var playerHitstrength = 1; //declares playerHitStrength
var maxNukes = 2; //declares maxNukes Global Variable
var currentNukes = maxNukes; //set currentNukes = maxNukes Global Variable
var nukeHitStrength = 5; //declares nukeHitStrength
var nukeScore = 100; //set nukeScore Global Variable
var particles; //declares particles Global Variable			
var emitter; //declares emitter Global Variable

var enemyShips = 0; //declares number of enemyShips Global Variable
var totalEnemyShips; //declares totalEnemyShips Global Variable
var enemyDeaths = 0; //declares enemyDeaths Global Variable
var enemyHitStrength = 1; //declares enemyHitStrength Global Variable
var enemyValue = 10; //declares enemyValue as 10 Global Variable
var maxMotherShipLives = 15; //add lives to mothership
var motherShipLives; //declares mothership lives
var mothershipHitValue = 20; //declares mothershipHitValue
var motherShipAlive = true; //add mothership alive variable

var level1Shields = 8; //declares the number of sheilds in Level 1
var level2Shields = 6; //declares the number of sheilds in Level 2
var levelBShields = 4; //declares the number of sheilds in Boss Level

var score = 0; //declares score Global Variable
var textScore; //declares score text Global Variable
var textLives; //declares lives left text Global Variable
var textNukes; //declares Nuke text Global Variable
var restartlevel; //declares level restart text Global Variable

var leftAsteroid = true; //set leftAsteroid variable so as to switch sides asteroids fly from


var cursors; //declares cursors Global Variable
var isPaused; //set scene paused name
var levelWon = false; //set level won variable


const StoryContent = [ //set story text variable
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

const Controls = [ //set controls text variable
    "GAME CONTROLS",
    "Use Cursors to FLY      Press Space for LASERS      Press N for NUKES"
];

const GameOver = ["GAME OVER"]; //set Gameover text variable

const Restart = ["Press R to Restart"]; //set Restart text variable

var game = new Phaser.Game(config); //sets game variable to new Phaser Game with parameters of config
