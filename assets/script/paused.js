class Paused extends Phaser.Scene { //creates a scene in the Phaser Object called SceneMainMenu, to be referenced in game.js
    constructor() { //call constructor method on the game object to create an instance of scene 
        super({ key: "Paused" }); //on the game object create a property of scene and set key to SceneMainMenu, used in config parameters for game
    }

    //preload function
    preload() {
        this.load.image("backgroundstars", "assets/images/darkstars.jpg") //preload background stars image
        this.load.image("resume", "assets/images/resume.png"); //preload the Resume Button image
        this.load.image("resumeHover", "assets/images/resumeHover.png"); //preload the Resume Button Hover image
        this.load.image("comet", "assets/images/comet.png"); //preload the comet image
        this.load.image("scifiwarriors", "assets/images/scifiwarriors.png"); //preload the scifi woman image
        this.load.audio("sndBtn", "assets/audio/sndBtn.wav"); //preload the Button Sound
    }
    //END preload function

    //create function
    create() {
        //add background
        this.background = new Background(this, this.game.config.width * 0.5, this.game.config.height * 0.5, "backgroundstars"); // add background image first
        //END background image

        this.sfx = { //for sfx object create btn property 
            btn: this.sound.add("sndBtn") //and add sound Button Sound
        };

        //pause Image
        this.planetImage = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.7, 'comet'); //add pause image to bottom of screen
        this.planetImage.setScale(0.8); //set scale of image to 0.8
        this.womanImage = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.7, 'scifiwarriors'); //add pause image to bottom of screen
        this.womanImage.setScale(0.8); //set scale of image to 0.8
        //END pause Image

        //ADD MAIN MENU TEXT
        //Game Title Text
        this.textTitle = this.add.text( //Add Pause Text
            this.game.config.width * 0.5, //set x axis position
            this.game.config.height * 0.1, //set y axis position
            "PAUSED", //set text
            {
                fontFamily: "Arcade", //set font style
                fontSize: 120, //set font size
                align: "center" //set alignment
            }
        );
        this.textTitle.setTint(0x00ff00); //set game title text to green
        this.textTitle.setOrigin(0.5); //set text box origin to center of itself
        //END Game Title Text

        //Subheading text
        this.textTitle2 = this.add.text( //Add statement text
            this.game.config.width * 0.5, //set x axis position
            this.game.config.height * 0.2, //set y axis position
            "Come Back We Need You!", //set text
            {
                fontFamily: "Arcadepix", //set font style
                fontSize: 80, //set font size
                align: "center" //set alignment
            }
        );
        this.textTitle2.setTint(0x009500); //set sub heading text to green
        this.textTitle2.setOrigin(0.5); //set text box origin to center of itself
        //END Subheading text

    }
    //END create function
}
//END scene
