class Titles extends Phaser.Scene {            //creates a scene in the Phaser Object called Title, to be referenced in game.js
  constructor() {                                     //call constructor method on the game object to create an instance of scene 
    super({ key: "Titles" });                  //on the game object create a property of scene and set key to Title, used in config parameters for game
  }

  //preload function to load all assets
  preload() {
    this.load.image("backgroundstars", "content/darkstars.jpg")     //preload background stars image
    this.load.image('hero', "content/spacesuit.png");      //preload heroin image
    this.load.image('fireworks', "content/fireworks.png");      //preload fireworks image
  }
  //end preload function

  //Create function
  create() {
    //add background
    this.background = new Background(this, this.game.config.width * 0.5, this.game.config.height * 0.5, "backgroundstars"); // add background image first
    //END background image

    this.victoryFunction();     //create victory function
  }
  //END Create function

  //victory function
  victoryFunction() {
    this.fireworksVictory = this.add.image(this.game.config.width * 0.15, this.game.config.height * 0.3, 'fireworks');  //add fireworks image
    this.fireworksVictory.setScale(0.8);     //set scale                                                                              //scale image
    this.fireworksVictory = this.add.image(this.game.config.width * 0.85, this.game.config.height * 0.3, 'fireworks');  //add fireworks image
    this.fireworksVictory.setScale(0.8);     //set scale                                                                                //scale image
    this.textTitleHead = this.add.text(     //create Titles Header text
      this.game.config.width * 0.5,         //set x axis position
      this.game.config.height * 0.1,        //set y axis position
      "TITLES",                        //set text
      {
        fontFamily: "Arcade",          //set font type
        fontSize: 120,                     //set font size
        align: "center"                   //set text alignment
      }
    );
    this.textTitleHead.setOrigin(0.5);    //set origin of text to center of itself
    this.textTitleHead.setTint(0x00ff00); //set colour of text to green
    this.textTitles = this.add.text(      //create Titles text
      this.game.config.width * 0.5,       //set x axis position
      this.game.config.height * 0.6,      //set y axis position
      TitlesText,                         //set text
      {
        fontFamily: "Arcadepix",          //set font type
        fontSize: 55,                     //set font size
        align: "center"                   //set text alignment
      }
    );
    this.textTitles.setOrigin(0.5);       //set origin of text to center of itself
    this.textTitles.setTint(0x00ff00);    //set colour of text to green

    this.time.addEvent({                  //add timed event
      delay: 15000,                        //set delay to 15000
      callback: function () {             //create callback function
        this.scene.start("MainMenu");       //set scene start for main game if lives is greater than 0
      },
      callbackScope: this,                //set call back scope to this
      loop: false                         //set loop to false only play once
    });
  }
  //END victory function
}
//END scene