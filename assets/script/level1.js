class Level1 extends Phaser.Scene {          //creates a scene in the Phaser Object called Level1, to be referenced in game.js
  constructor() {                               //call constructor method on the game object to create an instance of scene 
    super({ key: "Level1" });                //on the game object create a property of scene and set key to Level1, used in config parameters for game
  }

  //preload function to load all assets
  preload() {
    this.load.image("backgroundstars", "assets/images/darkstars.jpg")     //preload background stars image
    this.load.image("playerShip", "assets/images/starship.png");          //preload player image to the game, assign key name and src
    this.load.spritesheet("enemyShip", "assets/images/Alien-Destroyer-withexhaust-3frame.png", {   //preload enemyShip spritesheet to the game, assign key name and src, object frameWidth and frameheight
      frameWidth: 121,     //set the full width of each frame (image width / frameWidth as we have multiple on x axis) to be used
      frameHeight: 318    //set the full height of each frame to be used
    });
    this.load.image("sprShieldTile", "assets/images/sprShieldTile.png");  //preload sheild image to the game, assign key name and src
    this.load.image("sprLaserEnemy", "assets/images/sprLaserEnemy.png");  //preload enemyLaser image to the game, assign key name and src
    this.load.image("sprLaserPlayer", "assets/images/sprLaserPlayer.png");//preload playerLaser image to the game, assign key name and src
    this.load.image('star', 'assets/images/star.png');                    //preload playerNuke image to the game, assign key name and src
    this.load.image('yellow', 'assets/images/yellow.png');                //preload particles image to the game, assign key name and src
    this.load.spritesheet("sprExplosion", "assets/images/sprExplosion.png", { //preload explosion spritesheet to the game, assign key name and src, object frameWidth and frameheight
      frameWidth: 512,         //set full width of explosion sprite frame to be used
      frameHeight: 512        //set full height of explosion sprite frame to be used
    });
    this.load.image('alien', "assets/images/alien.png");      //preload alien image
    this.load.image('gameOver', "assets/images/explosion.png");      //preload gameover explosion image
    this.load.image('hero', "assets/images/spacesuit.png");      //preload heroin image
    this.load.image('fireworks', "assets/images/fireworks.png");      //preload fireworks image
    this.load.image("asteroid", "assets/images/asteroid.png");            //perload the asteroid image
    this.load.audio("sndExplode", "assets/audio/sndExplode.wav");          //preload audio files, assign key name and src
    this.load.audio("sndLaserPlayer", "assets/audio/sndLaserPlayer.wav");  //preload audio files, assign key name and src
    this.load.audio("sndLaserEnemy", "assets/audio/sndLaserEnemy.wav");    //preload audio files, assign key name and src
  }
  //end preload function
}
// END scene