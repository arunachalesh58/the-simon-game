
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
//this detect when any key is pressed on the keyboard.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level)+"👍";
    nextSequence();
    started = true;
  }
});
//this keeps the track of users choice.
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});
//this checks wether the choice is correct or not.
function checkAnswer(currentLevel) {
    //comparing the last element in both the lists (if true then success)
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      //this will help to go to next level
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
//this is when the player guesses the wrong button
      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over 😒👎, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}
//this generates random buttons and keeps track of the random generated buttons
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level+"👍");

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//this is a audio player function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//this is a animation function
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
