class MainMenu extends Phaser.Scene { //creates a scene in the Phaser Object called SceneMainMenu, to be referenced in game.js
  constructor() { //call constructor method on the game object to create an instance of scene 
    super({ key: "MainMenu" }); //on the game object create a property of scene and set key to SceneMainMenu, used in config parameters for game
  }

  //preload function
  preload() {
    this.load.image("backgroundstars", "assets/images/darkstars.jpg") //preload background stars image
    this.load.image("BtnPlay", "assets/images/sprBtnPlay.png"); //preload the Play Button image
    this.load.image("BtnPlayHover", "assets/images/sprBtnPlayHover.png"); //preload the Play Button Hover image
    this.load.image("hero", "assets/images/spacesuit.png"); //preload the hero image
    this.load.image("BtnInfo", "assets/images/InfoWhite.png"); //preload the Info Button image
    this.load.audio("sndBtn", "assets/audio/sndBtn.wav"); //preload the Button Sound
  }
  //END preload function

  //create function
  create() {
    //add background
    this.background = new Background(this, this.game.config.width * 0.5, this.game.config.height * 0.5, "backgroundstars"); // add background image first
    //END background image

    //Create Grid
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 }); //create grid for positioning
    //END GRID

    //create sounds    
    this.sfx = { //for sfx object create btn property 
      btn: this.sound.add("sndBtn") //and add sound Button Sound
    };
    //END create sounds

    //ADD MAIN MENU TEXT
    //Game Title Text
    this.textTitle = this.add.text( //Add Game Title Text
      0, //set x axis position
      0, //set y axis position
      "GALACTIC GUNNERS", //set text
      {
        fontFamily: "Arcade", //set font style
        fontSize: 120, //set font size
        align: "center" //set alignment
      }
    );
    this.textTitle.setTint(0x00ff00); //set game title text to green
    this.textTitle.setOrigin(0.5, 0.3);  //set position on grid
    this.aGrid.placeAtIndex(5, this.textTitle); //set position on grid
    Align.scaleToGameW(this.textTitle, 0.6); //set scale
    //END Game Title Text

    //Subheading text
    this.textTitle2 = this.add.text( //Add Question text
      0, //set x axis position
      0, //set y axis position
      "CAN YOU SAVE THE DAY?", //set text
      {
        fontFamily: "Arcadepix", //set font style
        fontSize: 80, //set font size
        align: "center" //set alignment
      }
    );
    this.textTitle2.setTint(0x009500); //set sub heading text to green
    this.textTitle2.setOrigin(0.5);  //set position on grid
    this.aGrid.placeAtIndex(16, this.textTitle2); //set position on grid
    Align.scaleToGameW(this.textTitle2, 0.4); //set scale
    //END Subheading text
    //Hero Image
    this.heroImage = this.add.image(0, 0, 'hero'); //add hero image to bottom of screen
    this.heroImage.setOrigin(0.5, 0.45); //set origin point of image
    this.aGrid.placeAtIndex(71, this.heroImage); //set position on grid
    Align.scaleToGameW(this.heroImage, 0.25); //set scale
    //END Hero Image

    //ADD PLAY BUTTON AND INTERACTIVITY
    //play button
    this.btnPlay = this.add.image( //create btnPlay and add it as image
      0, //set position on the x axis
      0, //set position on the y axis
      "BtnPlay" //add image key
    );
    this.btnPlay.setTint(0x00ff00); // set the play button to green
    this.btnPlay.setInteractive(); //set button to be interactive
    this.aGrid.placeAtIndex(100, this.btnPlay); //set position on the grid
    Align.scaleToGameW(this.btnPlay, 0.1); //set scale

    this.btnPlay.on("pointerover", function() { //this Play Button when on method, in hover
      this.btnPlay.setTexture("BtnPlayHover"); //change the image to Play Button without box
      this.btnPlay.setTint(0xff0000); // set the play button to red on hover
    }, this); //this state only

    this.btnPlay.on("pointerout", function() { //this Play Button when on method, in hover
      this.setTexture("BtnPlay"); //change the image to Play Button with box
      this.setTint(0x00ff00); // set the play button back to green when not hovering
    });

    this.btnPlay.on("pointerdown", function() { //this Play Button when on method, when mouse clicks
      this.sfx.btn.play(); // set the sound to play             
      this.scene.start("Level1"); // start level 1
    }, this); //this state only
    //END play button

    //info button
    this.btnInfo = this.add.image( //create btnInfo and add it as image
      0, //set position on the x axis
      0, //set position on the y axis
      "BtnInfo" //add image key
    );
    this.btnInfo.setTint(0x00ff00); // set the info button back to green when not hovering
    this.btnInfo.setInteractive(); //set button to be interactive
    this.aGrid.placeAtIndex(108, this.btnInfo); //set position on the grid
    Align.scaleToGameW(this.btnInfo, 0.08); //set scale


    this.btnInfo.on("pointerover", function() { //this Play Button when on method, in hover
      this.btnInfo.setTint(0xff0000); // set the play button to red on hover
    }, this); //this state only

    this.btnInfo.on("pointerout", function() { //this Play Button when on method, in hover
      this.btnInfo.setTint(0x00ff00); // set the play button back to white when not hovering
    }, this); //this state only

    this.btnInfo.on("pointerdown", function() { //this Play Button when on method, when mouse clicks
      this.sfx.btn.play(); // set the sound to play             
      this.scene.start("Info"); // open Info screen
    }, this); //this state only
    //end info button     

    //pointer button
    this.textPoint = this.add.text( //create point select text
      0, //set position on the x axis
      0, //set position on the y axis
      touchSelector, //set text to variable
      {
        fontFamily: "Arcadepix", //set font style
        fontSize: 80, //set font size
        align: "center" //set alignment
      }
    );
    this.textPoint.setTint(0x00ff00); // set the point text to green
    this.textPoint.setOrigin(0.5, 0.2); //set the origin point of text
    this.aGrid.placeAtIndex(56, this.textPoint); //set grid position of text
    Align.scaleToGameW(this.textPoint, 0.15); //scale the text

    this.btnPoint = this.add.image( //create btnInfo and add it as image
      0, //set position on the x axis
      0, //set position on the y axis
      "BtnPoint" //add image key
    );
    this.btnPoint.setTint(0x00ff00); // set the point button to green
    this.btnPoint.setInteractive(); //set button to be interactive
    this.aGrid.placeAtIndex(78, this.btnPoint); //set grid position of button
    Align.scaleToGameW(this.btnPoint, 0.06); //scale the button

    this.btnPoint.on("pointerdown", function() { //this point Button when on selected
      if (!touch) {
        this.btnPoint.setTint(0xff0000); // set the point button to red on select
        touch = true; //set touch variable
      }
      else {
        this.btnPoint.setTint(0x00ff00); // set the point button back to green when deselected
        touch = false; //set touch variable
      }
    }, this);
    //end point button  

  }
  //END Create Function
}
//END Scene
