class Entity extends Phaser.GameObjects.Sprite {     //Inherit Entity class to Phaser.GameObjects.Sprite
	constructor(scene, x, y, key) {					// constructor function to instantiate an sprite object
		super(scene, x, y, key);					 // call super class constructor
		this.scene.add.existing(this);				 //add Entity to this scene
		this.scene.physics.world.enableBody(this, 0);//enableBody on this scene in physics world
	}
}

class Background extends Entity {                    //Inherit Background class to Entity
	constructor(scene, x, y) {					     // constructor function to instantiate a background object
		super(scene, x, y, "backgroundstars");	     // call super class constructor
		this.setOrigin(0.5);					     //set origin of image to center of itself
		this.setScale(2);					        //set image scale
		this.setDepth(-5);					        //set image depth so underneath all other images
	}
}