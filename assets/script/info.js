class Info extends Phaser.Scene {            //creates a scene in the Phaser Object called Info, to be referenced in game.js
  constructor() {                                     //call constructor method on the game object to create an instance of scene 
    super({ key: "Info" });                  //on the game object create a property of scene and set key to Info, used in config parameters for game
  }

  //preload function
  preload() {
    this.load.image("backgroundstars", "content/darkstars.jpg")     //preload background stars image
    this.load.image("hero", "content/spacesuit.png");                   //preload the hero image
    this.load.image("BtnBack", "content/AlienSkullCrossBonesWhite.png");//preload the Info Button image
    this.load.audio("sndBtn", "content/sndBtn.wav");                    //preload the Button Sound
  }
  //END preload function
}
//END Scene