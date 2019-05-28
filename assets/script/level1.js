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
        //set world boundaries
        var body = this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height); //set world boundaries up with originX, originY, Game Width, Game Height
        //END world bounds

        //add background
        this.background = new Background(this, this.game.config.width * 0.5, this.game.config.height * 0.5, "backgroundstars"); // add background image first
        //END background image

        //create sfx
        this.sfx = { //add properties to call back sfx
            laserPlayer: this.sound.add("sndLaserPlayer") //create the soudn fx properties
        };
        //END sfx

        //create animations
        this.anims.create({ //animation object create
            key: "enemyShip", //set the image key name to be used
            frames: this.anims.generateFrameNumbers("enemyShip"), //set image to be used to generate frames
            frameRate: 5, //set frame rate speed
            repeat: -1 //set to -1, continuous
        });
        //END animations

        //SCORED POINTS  AND LIVES REMAINING METHODS 
        textScore = this.add.text(10, 10, 'Score: ' + score, { font: '42px Arcade', fill: '#ffffff' }); //create score text, position x and y, set text with score variable and add font styling
        textLives = this.add.text(10, this.game.config.height - 40, 'Lives: ' + currentLives, { font: '42px Arcade', fill: '#ffffff' }); //create lives text, position x and y, set text with currentLives variable and add font styling
        textNukes = this.add.text(this.game.config.width - 180, this.game.config.height - 40, 'Nukes: ' + currentNukes, { font: '42px Arcade', fill: '#ffffff' }); //create Nukes Left text, position x and y, set text with currentNukes variable and add font styling
        //END score and lives

        //Keyboard methods created for use in update function
        cursors = this.input.keyboard.createCursorKeys(); //sets cursor keys up for operation
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //sets SPACE as FIRE key

        //END Keyboard methods created for use in update function

        //set scene variables for shooting delays
        this.playerShootDelay = 25; //sets the Delay value for the player laser, lower the value the faster it shoots
        this.playerShootTick = 0; //sets the playerShootTick to 0, for using in the updatePlayerShooting function
        //END set scene variables for shooting delays

        //create classes on the this.Object to assign the grouping method to 
        this.playerLasers = this.add.group(); //create playerLaser group
        this.enemies = this.add.group(); //create enemies group
        this.shieldTiles = this.add.group(); //create sheildTiles group
        //END classes grouping

        // Create callback methods
        this.createPlayer(); //create callback method for creating player
        this.updatePlayerMovement(); //create callback method for updating player movementadd cursors 
        this.updateEnemiesMovement(); //create callback method for updating enemy moves 
        this.updatePlayerShooting(); //create callback method for updating player shots
        //END callback methods

        //Create enemies and set positions movement directions
        this.lastEnemyMoveDir = "RIGHT"; //create a variable to hold last enemy movement
        this.enemyMoveDir = "LEFT"; //create a variable to hold this enemy movement
        this.enemyRect = new Phaser.Geom.Rectangle( //for moving the enemy rectangle around
            Math.round((this.game.config.width / 24) * 0.5) * 6, //set the x position of rectangle
            Math.round((this.game.config.height / 40) * 0.25), //set the y position of rectangle
            Math.round(this.game.config.width / 24) * 19, //sets the width of rectangle
            Math.round((this.game.config.height / 40) * 0.25) * 20 //sets the height of rectangle
        );

        for (var x = 6; x < Math.round((this.game.config.width / 24) * 0.5); x++) { //create an inset row of enemy ships by setting to 0.95, skipping the first 14 iterations of the loop by setting x to 2, we can center the enemyShips by offsetting from the edge
            for (var y = 0; y < Math.round((this.game.config.height / 40) * 0.1); y++) { //create 3 additional rows by iterating through x
                var enemy = new Enemy(this, x * 44, (this.game.config.height * 0.15) + (y * 88), "enemyShip"); //set coordinates for image with spacing on x and y and assign a key from preloaded images to add the enemyship image sprite
                enemy.play("enemyShip"); //start animation of the enemyShip
                enemy.setScale(0.25); //set the scale of the enemy sprite
                enemyShips++; //add a ship to total enemy ships created
                this.enemies.add(enemy); //draw an enemy ship on the screen at x and y

            }
            totalEnemyShips = enemyShips; //set totalEnemy ships to equal enemyShips created for use in Victory function
        }
        //END Create enemies

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

    //create updatePlayerMovement function
    updatePlayerMovement() { //update player movement
        this.time.addEvent({ //add time event
            delay: 60, //set delay to 60
            callback: function() { //create call back function for time event

                if (cursors.left.isDown) { //if key A pressed down
                    this.player.x -= 8; //Move left
                }
                if (cursors.right.isDown) { //if key D pressed down
                    this.player.x += 8; //Move right
                }
                if (cursors.up.isDown) { //if key W pressed down
                    this.player.y -= 8; //Move up   
                }
                if (cursors.down.isDown) { //if key S pressed down
                    this.player.y += 8; //Move down
                }
            },
            callbackScope: this, //set call back scope to this function
            loop: true //set loop to true
        });
    }
    //END updatePlayerMovement function

    //create updatePlayerShooting function
    updatePlayerShooting() {
        this.time.addEvent({ //add a time event on player shooting
            delay: 15, //set delay to 15
            callback: function() { //create a callback function 
                if (this.keySpace.isDown && this.player.active) { //if SPACE is down && player is active still
                    if (this.playerShootTick < this.playerShootDelay) { //if playerShootTick is less than the playerShootDelay
                        this.playerShootTick++; //add 1 to Tick count, which will repeat until it hits 30
                    }
                    else {
                        var laser = new PlayerLaser(this, this.player.x, this.player.y); //create new laser object and start this object at player.x and player.y
                        this.playerLasers.add(laser); //add this laser to playerLaser group
                        this.sfx.laserPlayer.play(); //add laserPlayer sound
                        this.playerShootTick = 0; //set shootTick back to 0
                    }
                }
            },
            callbackScope: this, //set call back scope to this function
            loop: true //set loop to true
        });
    }

    //create setEnemyDirection function
    setEnemyDirection(direction) { //set enemy movement direction with direction parameter
        this.lastEnemyMoveDir = this.enemyMoveDir; //sets enemyMoveDir as lastEnemyMoveDir
        this.enemyMoveDir = direction; //enemyMoveDir is equal to direction parameter
    }
    //END setEnemyDirection function

    //create setEnemyDirection function
    setEnemyDirection(direction) { //set enemy movement direction with direction parameter
        this.lastEnemyMoveDir = this.enemyMoveDir; //sets enemyMoveDir as lastEnemyMoveDir
        this.enemyMoveDir = direction; //enemyMoveDir is equal to direction parameter
    }
    //END setEnemyDirection function

    //create updateEnemiesMovement function
    updateEnemiesMovement() { //update Enemy Movement
        this.enemyMoveTimer = this.time.addEvent({ //adds time event to enemy movement
            delay: 1500, //set the delay to enemy movement
            callback: function() { //delay callback function

                if (this.enemyMoveDir == "RIGHT") { //if enemyMoveDir is RIGHT
                    this.enemyRect.x += 25; //Move enemy right by 16

                    if (this.enemyRect.x + this.enemyRect.width > this.game.config.width - 10) { //if enemy is past this point on x axis 
                        this.setEnemyDirection("DOWN"); //setEnemyDirection to DOWN
                    }
                }
                else if (this.enemyMoveDir == "LEFT") { //enemyMoveDir is LEFT
                    this.enemyRect.x -= 25; //Move enemy left by 16

                    if (this.enemyRect.x < (this.game.config.width - this.game.config.width) + 10) { //if enemy is past this point on x axis 
                        this.setEnemyDirection("DOWN"); //setEnemyDirection to DOWN
                    }
                }
                else if (this.enemyMoveDir == "DOWN") { //enemyMoveDir is DOWN
                    this.enemyMoveTimer.delay -= 100; //reduce enemy timer delay by 100 (speeding up the loop)
                    this.moveEnemiesDown(); //call function moveEnemiesDown
                }

                for (var i = this.enemies.getChildren().length - 1; i >= 0; i--) { //for each enemy in the enemies array
                    var enemy = this.enemies.getChildren()[i]; //select this enemy with index[i]

                    if (this.enemyMoveDir == "RIGHT") { //if enemyMoveDir is RIGHT
                        enemy.x += 25; //Move enemy RIGHT 16
                    }
                    else if (this.enemyMoveDir == "LEFT") { //if enemyMoveDir is LEFT
                        enemy.x -= 25; //Move enemy LEFT 16
                    }
                }
            },
            callbackScope: this, //set call back scope to this function
            loop: true //set loop to true
        });
    }
    //END updateEnemiesMovement function

    //create moveEnemiesDown function
    moveEnemiesDown() {
        for (var i = this.enemies.getChildren().length - 1; i >= 0; i--) { //for each enemy in the enemies array
            var enemy = this.enemies.getChildren()[i]; //select this enemy with this index

            enemy.y += 10; //Move enemy DOWN by 10

            if (this.lastEnemyMoveDir == "LEFT") { //if lastEnemyMoveDir is LEFT
                this.setEnemyDirection("RIGHT"); //setEnemyDirection to RIGHT
            }
            else if (this.lastEnemyMoveDir == "RIGHT") { //if lastEnemyMoveDir is RIGHT
                this.setEnemyDirection("LEFT"); //setEnemyDirection to LEFT
            }
        }
    }
    //END moveEnemiesDown function

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
