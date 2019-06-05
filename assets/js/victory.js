class Victory extends Phaser.Scene {
  constructor() {
    super({ key: "Victory" });
  }

  //preload function to load all assets
  preload() {
    this.load.image("backgroundstars", "assets/images/darkstars.jpg") //preload background stars image
    this.load.image('hero', "assets/images/spacesuit.png"); //preload heroin image
    this.load.image('fireworks', "assets/images/fireworks.png"); //preload fireworks image
  }
  //end preload function

  //create function
  create() {
    //add background
    this.background = new Background(this, this.game.config.width * 0.5, this.game.config.height * 0.5, "backgroundstars"); // add background image first
    //END background image

    //Create Grid
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 }); //create grid for positioning
    this.aGrid.showNumbers(); //show grid
    //END GRID

    this.victoryFunction(); //create victory method
  }
  //END create function

  //create victory method
  victoryFunction() {
    this.fireworksVictory1 = this.add.image(0, 0, 'fireworks'); //add fireworks image
    this.aGrid.placeAtIndex(68, this.fireworksVictory1); //set position on grid
    Align.scaleToGameW(this.fireworksVictory1, 0.4); //scale image
    this.fireworksVictory2 = this.add.image(0, 0, 'fireworks'); //add fireworks image
    this.aGrid.placeAtIndex(74, this.fireworksVictory2); //set position on grid
    Align.scaleToGameW(this.fireworksVictory2, 0.4); //scale image
    this.congratsText = this.add.text( //create Victory text
      0, //set x axis position
      0, //set y axis position
      "CONGRATULATIONS!", //set text
      {
        fontFamily: "Arcadepix", //set font type
        fontSize: 100, //set font size
        align: "center" //set text alignment
      }
    );
    this.congratsText.setOrigin(0.5); //set origin of text center of itself
    this.congratsText.setTint(0x00ff00); //set text colour
    this.aGrid.placeAtIndex(5, this.congratsText); //set position on grid
    Align.scaleToGameW(this.congratsText, 0.6); //scale image

    this.textVictory = this.add.text( //create Victory text
      0, //set x axis position
      0, //set y axis position
      "YOU HAVE SAVED THE GALAXY FROM THE EVIL ALIENS!", //set text
      {
        fontFamily: "Arcadepix", //set font type
        fontSize: 80, //set font size
        align: "center" //set text alignment
      }
    );
    this.textVictory.setOrigin(0.5); //set origin of text center of itself
    this.textVictory.setTint(0x00ff00); //set text colour
    this.aGrid.placeAtIndex(16, this.textVictory); //set position on grid
    Align.scaleToGameW(this.textVictory, 0.55); //scale image
    this.heroWin = this.add.image(0, 0, 'hero'); //insert hero image setting x and y position
    this.aGrid.placeAtIndex(71, this.heroWin); //set position on grid
    Align.scaleToGameW(this.heroWin, 0.2); //set scale
    enemyShips = 0; //set enemyShips to 0
    enemyDeaths = 0; //set enemyDeaths to 0

    this.time.addEvent({ //add timed event
      delay: 5000, //set delay to 5000
      callback: function() { //create callback function
        this.scene.start("Titles"); //set scene start for main game if lives is greater than 0
      },
      callbackScope: this, //set call back scope to this
      loop: false //set loop to false only play once
    });
  }
  //END victory function
}
//END scene
