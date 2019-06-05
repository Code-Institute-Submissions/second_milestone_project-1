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

        //CREATE GRID
        this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 }); //add grid to screen for scaling and positioning
        this.aGrid.showNumbers(); //show grid
        //END GRID

        this.sfx = { //for sfx object create btn property 
            btn: this.sound.add("sndBtn") //and add sound Button Sound
        };

        //pause Image
        this.planetImage = this.add.image(0, 0, 'comet'); //add pause image to bottom of screen
        this.aGrid.placeAtIndex(71, this.planetImage); //set position on the grid
        Align.scaleToGameW(this.planetImage, 0.9); //set scale
        this.womanImage = this.add.image(0, 0, 'scifiwarriors'); //add pause image to bottom of screen
        this.womanImage.setOrigin(0.5, 0.55); //set origin
        this.aGrid.placeAtIndex(82, this.womanImage); //set position on the grid
        Align.scaleToGameW(this.womanImage, 0.5); //set scale
        //END pause Image

        //ADD MAIN MENU TEXT
        //Game Title Text
        this.textTitle = this.add.text( //Add Pause Text
            0, //set x axis position
            0, //set y axis position
            "PAUSED", //set text
            {
                fontFamily: "Arcade", //set font style
                fontSize: 120, //set font size
                align: "center" //set alignment
            }
        );
        this.textTitle.setTint(0x00ff00); //set game title text to green
        this.textTitle.setOrigin(0.5, 0.6); //set text origin
        this.aGrid.placeAtIndex(16, this.textTitle); //set position on the grid
        Align.scaleToGameW(this.textTitle, 0.4); //set scale
        //END Game Title Text

        //Subheading text
        this.textTitle2 = this.add.text( //Add statement text
            0, //set x axis position
            0, //set y axis position
            "Come Back We Need You!", //set text
            {
                fontFamily: "Arcadepix", //set font style
                fontSize: 80, //set font size
                align: "center" //set alignment
            }
        );
        this.textTitle2.setTint(0x009500); //set sub heading text to green
        this.textTitle2.setOrigin(0.5, 0.2); //set text box origin
        this.aGrid.placeAtIndex(16, this.textTitle2); //set position on the grid
        Align.scaleToGameW(this.textTitle2, 0.4); //set scale
        //END Subheading text

        //ADD Resume BUTTON AND INTERACTIVITY
        //Resume button
        this.btnResume = this.add.image( //create btnResume and add it as image
            0, //set position on the x axis
            0, //set position on the y axis
            "resume" //add image key
        );
        this.btnResume.setTint(0x00ff00); // set the Resume button to green
        this.btnResume.setOrigin(0.5, 0.2); // set origin
        this.aGrid.placeAtIndex(27, this.btnResume); // set position on the grid
        Align.scaleToGameW(this.btnResume, 0.2); //set scale
        this.btnResume.setInteractive(); //set button to be interactive

        this.btnResume.on("pointerover", function() { //this Resume Button when on method, in hover
            this.btnResume.setTexture("resumeHover"); //change the image to Resume Button without box
            this.btnResume.setTint(0xff0000); // set the Resume button to red on hover
        }, this); //this state only

        this.btnResume.on("pointerout", function() { //this Resume Button when on method, in hover
            this.setTexture("resume"); //change the image to Resume Button with box
            this.setTint(0x00ff00); // set the Resume button back to green when not hovering
        });

        this.btnResume.once("pointerdown", function() { //this Resume Button when on method, when mouse clicks
            this.sfx.btn.play(); // set the sound to play             
            this.scene.resume(isPaused.key); // resume scene
            this.scene.setVisible(false);
        }, this); //this state only
        //END play button

    }
    //END create function
}
//END scene
