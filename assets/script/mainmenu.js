class MainMenu extends Phaser.Scene {            //creates a scene in the Phaser Object called SceneMainMenu, to be referenced in game.js
  constructor() {                                     //call constructor method on the game object to create an instance of scene 
    super({ key: "MainMenu" });                  //on the game object create a property of scene and set key to SceneMainMenu, used in config parameters for game
  }

  //preload function
  preload() {
    this.load.image("backgroundstars", "content/darkstars.jpg")     //preload background stars image
    this.load.image("BtnPlay", "content/sprBtnPlay.png");            //preload the Play Button image
    this.load.image("BtnPlayHover", "content/sprBtnPlayHover.png");  //preload the Play Button Hover image
    this.load.image("hero", "content/spacesuit.png");                   //preload the hero image
    this.load.image("BtnInfo", "content/InfoWhite.png");            //preload the Info Button image
    this.load.audio("sndBtn", "content/sndBtn.wav");                    //preload the Button Sound
  }
  //END preload function
}
//END Scene