class Victory extends Phaser.Scene {
  constructor() {
    super({ key: "Victory" });
  }

  //preload function to load all assets
  preload() {
    this.load.image("backgroundstars", "assets/images/darkstars.jpg")     //preload background stars image
    this.load.image('hero', "assets/images/spacesuit.png");      //preload heroin image
    this.load.image('fireworks', "assets/images/fireworks.png");      //preload fireworks image
  }
  //end preload function

  //create function
  create() {
    //add background
    this.background = new Background(this, this.game.config.width * 0.5, this.game.config.height * 0.5, "backgroundstars"); // add background image first
    //END background image

    this.victoryFunction();             //create victory method
  }
  //END create function

//create victory method
  victoryFunction() {
    this.fireworksVictory = this.add.image(this.game.config.width * 0.33, this.game.config.height * 0.6, 'fireworks'); //insert firweorks image setting x and y position and initiate first so image behind the hero
    this.fireworksVictory.setScale(1.1);   //set scale 
    this.fireworksVictory = this.add.image(this.game.config.width * 0.66, this.game.config.height * 0.6, 'fireworks'); //insert firweorks image setting x and y position and initiate first so image behind the hero
    this.fireworksVictory.setScale(1.1);   //set scale 
    this.congratsText = this.add.text(     //create Victory text
      this.game.config.width * 0.5,       //set x axis position
      this.game.config.height * 0.1,                                //set y axis position
      "CONGRATULATIONS!",                        //set text
      {
        fontFamily: "Arcadepix",          //set font type
        fontSize: 100,                     //set font size
        align: "center"                   //set text alignment
      }
    );
    this.congratsText.setOrigin(0.5);     //set origin of text center of itself
    this.congratsText.setTint(0x00ff00);  //set text colour
    this.textVictory = this.add.text(     //create Victory text
      this.game.config.width * 0.5,       //set x axis position
      this.game.config.height * 0.2,                                //set y axis position
      "YOU HAVE SAVED THE GALAXY FROM THE EVIL ALIENS!",                        //set text
      {
        fontFamily: "Arcadepix",          //set font type
        fontSize: 80,                     //set font size
        align: "center"                   //set text alignment
      }
    );
    this.textVictory.setOrigin(0.5);     //set origin of text center of itself
    this.textVictory.setTint(0x00ff00);  //set text colour
    this.heroWin = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.6, 'hero');  //insert hero image setting x and y position
    this.heroWin.setScale(1);           //set scale of hero image to original size
    enemyShips = 0;                       //set enemyShips to 0
    enemyDeaths = 0;                      //set enemyDeaths to 0

    this.time.addEvent({                  //add timed event
      delay: 5000,                        //set delay to 5000
      callback: function () {             //create callback function
        this.scene.start("Titles");       //set scene start for main game if lives is greater than 0
      },
      callbackScope: this,                //set call back scope to this
      loop: false                         //set loop to false only play once
    });
  }
//END victory function
}
//END scene