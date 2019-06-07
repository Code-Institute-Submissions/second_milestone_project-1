class Preloader extends Phaser.Scene {

    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.image("backgroundstars", "assets/images/darkstars.jpg") //preload background stars image
        this.load.image("BtnPlay", "assets/images/sprBtnPlay.png"); //preload the Play Button image
        this.load.image("BtnPlayHover", "assets/images/sprBtnPlayHover.png"); //preload the Play Button Hover image
        this.load.image("hero", "assets/images/spacesuit.png"); //preload the hero image
        this.load.image("BtnInfo", "assets/images/InfoWhite.png"); //preload the Info Button image
        this.load.image("BtnPoint", "assets/images/pointericon.png"); //preload the Pointer Button image
        this.load.audio("sndBtn", "assets/audio/sndBtn.wav"); //preload the Button Sound
        this.load.image("playerShip", "assets/images/starship.png"); //preload player image to the game, assign key name and src
        this.load.spritesheet("motherShip", "assets/images/MotherShip-Flash.png", { //preload Alien Mothership spritesheet to the game, assign key name and src, object frameWidth and frameheight
            frameWidth: 355, //set the full width of each frame (image width / frameWidth as we have multiple on x axis) to be used
            frameHeight: 645 //set the full height of each frame to be used
        });
        this.load.spritesheet("alienscout", "assets/images/scoutship.png", { //preload alienscout spritesheet to the game, assign key name and src, object frameWidth and frameheight
            frameWidth: 103, //set the full width of each frame (image width / frameWidth as we have multiple on x axis) to be used
            frameHeight: 140 //set the full height of each frame to be used
        });
        this.load.spritesheet("enemyCruiser", "assets/images/alienCruiser.png", { //preload enemyCruiser spritesheet to the game, assign key name and src, object frameWidth and frameheight
            frameWidth: 250, //set the full width of each frame (image width / frameWidth as we have multiple on x axis) to be used
            frameHeight: 318 //set the full height of each frame to be used
        });
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
        this.load.image('mute', "assets/images/mute.png"); //preload mute image
        this.load.image('sound', "assets/images/sound.png"); //preload sound image
        this.load.image('gameOver', "assets/images/explosion.png"); //preload gameover explosion image
        this.load.image('hero', "assets/images/spacesuit.png"); //preload heroin image
        this.load.image('fireworks', "assets/images/fireworks.png"); //preload fireworks image
        this.load.image("asteroid", "assets/images/asteroid.png"); //perload the asteroid image
        this.load.audio("sndExplode", "assets/audio/sndExplode.wav"); //preload audio files, assign key name and src
        this.load.audio("sndLaserPlayer", "assets/audio/sndLaserPlayer.wav"); //preload audio files, assign key name and src
        this.load.audio("sndLaserEnemy", "assets/audio/sndLaserEnemy.wav"); //preload audio files, assign key name and src
        this.load.audio("nukefiring", "assets/audio/nukefiring.wav"); //preload audio files, assign key name and src

    }
    create() {
        //create animations
        this.anims.create({ //animation object create
            key: "enemyShip", //set the image key name to be used
            frames: this.anims.generateFrameNumbers("enemyShip"), //set image to be used to generate frames
            frameRate: 5, //set frame rate speed
            repeat: -1 //set to -1, continuous
        });
        this.anims.create({ //animation object create
            key: "enemyCruiser", //set the image key name to be used
            frames: this.anims.generateFrameNumbers("enemyCruiser"), //set image to be used to generate frames
            frameRate: 5, //set frame rate speed
            repeat: -1 //set to -1, continuous
        });
        this.anims.create({ //animation object create
            key: "motherShip", //set the image key name to be used
            frames: this.anims.generateFrameNumbers("motherShip"), //set image to be used to generate frames
            frameRate: 5, //set frame rate speed
            repeat: -1 //set to -1, continuous
        });
        this.anims.create({ //animation object create
            key: "alienscout", //set the image key name to be used
            frames: this.anims.generateFrameNumbers("alienscout"), //set image to be used to generate frames
            frameRate: 5, //set frame rate speed
            repeat: -1 //set to -1, continuous
        });
        this.anims.create({ //animation object create
            key: "sprExplosion", //set the image key name to be used
            frames: this.anims.generateFrameNumbers("sprExplosion"), //set image to be used to generate frames
            frameRate: 15, //set frame rate speed
            repeat: 5 //turns on then off higher equals longer on
        });
        //END animations

        this.startGame(); //create function to startGame
    }

    startGame() {
        this.scene.start('MainMenu'); //start this scene on completion of loading assets.
    }

}
