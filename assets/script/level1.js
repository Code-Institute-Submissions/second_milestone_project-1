class Level1 extends Phaser.Scene { //creates a scene in the Phaser Object called Level1, to be referenced in game.js
    constructor() { //call constructor method on the game object to create an instance of scene 
        super({ key: "Level1" }); //on the game object create a property of scene and set key to Level1, used in config parameters for game
    }

    //preload function to load all assets
    preload() {
        this.load.image("backgroundstars", "assets/images/darkstars.jpg") //preload background stars image
        this.load.image("playerShip", "assets/images/starship.png"); //preload player image to the game, assign key name and src
        this.load.spritesheet("enemyShip", "assets/images/Alien-Destroyer-withexhaust-3frame.png", { //preload enemyShip spritesheet to the game, assign key name and src, object frameWidth and frameheight
            frameWidth: 121, //set the full width of each frame (image width / frameWidth as we have multiple on x axis) to be used
            frameHeight: 318 //set the full height of each frame to be used
        });
        this.load.image("sprShieldTile", "assets/images/sprShieldTile.png"); //preload sheild image to the game, assign key name and src
        this.load.image("sprLaserEnemy", "assets/images/sprLaserEnemy.png"); //preload enemyLaser image to the game, assign key name and src
        this.load.image("sprLaserPlayer", "assets/images/sprLaserPlayer.png"); //preload playerLaser image to the game, assign key name and src
        this.load.image('star', 'assets/images/star.png'); //preload playerNuke image to the game, assign key name and src
        this.load.image('yellow', 'assets/images/yellow.png'); //preload particles image to the game, assign key name and src
        this.load.spritesheet("sprExplosion", "assets/images/sprExplosion.png", { //preload explosion spritesheet to the game, assign key name and src, object frameWidth and frameheight
            frameWidth: 512, //set full width of explosion sprite frame to be used
            frameHeight: 512 //set full height of explosion sprite frame to be used
        });
        this.load.image('alien', "assets/images/alien.png"); //preload alien image
        this.load.image('gameOver', "assets/images/explosion.png"); //preload gameover explosion image
        this.load.image('hero', "assets/images/spacesuit.png"); //preload heroin image
        this.load.image('fireworks', "assets/images/fireworks.png"); //preload fireworks image
        this.load.image("asteroid", "assets/images/asteroid.png"); //perload the asteroid image
        this.load.audio("sndExplode", "assets/audio/sndExplode.wav"); //preload audio files, assign key name and src
        this.load.audio("sndLaserPlayer", "assets/audio/sndLaserPlayer.wav"); //preload audio files, assign key name and src
        this.load.audio("sndLaserEnemy", "assets/audio/sndLaserEnemy.wav"); //preload audio files, assign key name and src
    }
    //end preload function

    //create function 
    create() {

        //add background
        this.background = new Background(this, this.game.config.width * 0.5, this.game.config.height * 0.5, "backgroundstars"); // add background image first
        //END background image

        //SCORED POINTS  AND LIVES REMAINING METHODS 
        textScore = this.add.text(10, 10, 'Score: ' + score, { font: '42px Arcade', fill: '#ffffff' }); //create score text, position x and y, set text with score variable and add font styling
        textLives = this.add.text(10, this.game.config.height - 40, 'Lives: ' + currentLives, { font: '42px Arcade', fill: '#ffffff' }); //create lives text, position x and y, set text with currentLives variable and add font styling
        textNukes = this.add.text(this.game.config.width - 180, this.game.config.height - 40, 'Nukes: ' + currentNukes, { font: '42px Arcade', fill: '#ffffff' }); //create Nukes Left text, position x and y, set text with currentNukes variable and add font styling
        //END score and lives

        //create classes on the this.Object to assign the grouping method to  
        this.shieldTiles = this.add.group(); //create sheildTiles group
        //END classes grouping

        // Create callback methods
        this.createPlayer(); //create callback method for creating player
        //END callback methods

        //create sheilds
        this.shieldPattern = [ //property of sheildPattern a nested array, 
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], //gives structure to sheild, 1 = image 0 = blank
            [1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0], //This gives sheild shape of ML
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
        ];

        var sheildWidth = 120;
        for (var i = 0; i < level1Shields; i++) { //for loop to create an inset row of sheilds based on this levels sheild count 
            this.addShield( //add shield on each iteration
                (Math.round((this.game.config.width / 2) - ((level1Shields / 2) * sheildWidth))) + (i * sheildWidth), //set the x coordinates by dividing game width by 2 minus level sheilds divided by 2 and multiplying i by sheildWidth, we can center the sheilds by offsetting from the edge then add offset to each sheild
                this.game.config.height - 150 //set the y position of the sheilds
            );
        }
        //END create sheilds
    }
    //end create function 

    //create createPlayer function
    createPlayer() {
        if (this.player) this.player.destroy();
        this.player = new Player( //create new player instance
            this, //in this scene
            this.game.config.width * 0.5, //set playerShip to center of screen on x axis
            this.game.config.height - 50, //set playerShip to position 50 pixels up from bottom on y axis
            "playerShip"
        );
    }
    //END createPlayer function

    //create addSheild function
    addShield(posX, posY) { //create an addSheild function with posX, posY as paramaters
        for (var y = 0; y < this.shieldPattern.length; y++) { //iterate through sheildPattern nested array to obtain the number of rows to create on y axis
            for (var x = 0; x < this.shieldPattern[y].length; x++) { //for each row iterate through the array and add a sheildTile to the position on x axis
                if (this.shieldPattern[y][x] == 1) { //if the array.value is == 1
                    var tile = new ShieldTile( //then add a new tile object
                        this, //this game object
                        posX + (x * 8), //set new position of tile object on x axis with padding
                        posY + (y * 8) //set new position of tile object on y axis with padding
                    );
                    this.shieldTiles.add(tile); //draw tile image in location 
                }
            }
        }
    }
    //END addSheild function
}
// END scene
