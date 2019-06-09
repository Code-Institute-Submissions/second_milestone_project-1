# TESTING #

## Scope ##

Testing was performed using Manual Testing of all functionality and some basic Jasmine Tests were performed on some non-Phaser API reliant Functions which were
adapted to remove setText functions inorder to prove they worked.
Tests were performedboth using the keyboard whilst touch not selected and with the mouse/touchscreen while touch was enabled.

## Jasmine Testing ##

Jasmine Tests were performed in order to ascertain that the config was working correctly and that global variables and some basic functions were operating, in order to carry this out, due tot he API that I used, some functions had to have function within them commented out and a return statement included.
These were then put back to original state in order to deploy the game in a fully operational state.
Example of function alteration:  
  
  From:  
```
      //create addScore function
  addScore(amount) { //addScore method passed with parameter amount
     score += amount; //raise score by amount                     
     textScore.setText('Score: ' + score); //sets score 
  }
  //END addScore function

  //create loseLives function
  loseLives(amount) { //loseLives method passed with parameter amount
     currentLives -= amount; // currentLives drop by amount
     textLives.setText('Lives: ' + currentLives); //sets lives remaining
  }
  //END loseLives function
``` 
  To:  
```   
      //create addScore function
  addScore(amount) { //addScore method passed with parameter amount
   return score += amount; //raise score by amount                     
    // textScore.setText('Score: ' + score); //sets score 
  }
  //END addScore function

  //create loseLives function
  loseLives(amount) { //loseLives method passed with parameter amount
    return currentLives -= amount; // currentLives drop by amount
    // textLives.setText('Lives: ' + currentLives); //sets lives remaining
  }
  //END loseLives function
```
This enabled the testing to be performed without errors due to the nature of Phaser and the internal functions within the API.
Below is a screenshot of the Jasmine Testing screen that passes all the variables and functions I included in the test.

### Jasmine Test ScreenShot ###

![Jasmines Screen Shot](../assets/images/screenShots/JasmineTestImage.png)


### User Tests ###

Users were invited to play the game and give feedback on the game and carry out some testing so that game functionality and user experience was thought about.
The feedback given can be seen [here](testingfeedback/usertestfeedback.md).  

### Manual Testing ###


