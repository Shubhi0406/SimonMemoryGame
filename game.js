var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameInMotion = false;
var index = 0;
var wrong = new Audio("sounds/wrong.mp3");
var buttonPressed = "";
var level = 0;
var highest = 0;
var pattern = "";

$("#help").click(function(){
    $('.help-popup').show();
});
$('.popupCloseButton').click(function(){
    $('.help-popup').hide();
});

$("#start").on("click", function() {
  $("#start").addClass("pressed");
  setTimeout(function() {
    $("#start").removeClass("pressed");
    if (gameInMotion === true) {
      if (confirm("Do you want to restart the game?") === true) {
        gameInMotion = false;
        start();
      }
    }
    else {
      start();
    }
  }, 100);
});

$(".color").on("click", function() {
  buttonPressed = this.id;
  colourSound(buttonPressed);
  animatePress(buttonPressed);
  userClickedPattern.push(buttonPressed);
  checkAnswer();
})

function start() {
  if (gameInMotion === false) {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    gameInMotion = true;
    $("#game-pattern").text("");
    $("#user-pattern").text("");
    nextSequence();
  }
}

function nextSequence() {
  $("#level-title").text("Level " + level);
  $("#high-score").text("High Score: "+highest);
  var randomColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColour);
  colourSound(randomColour);
  $("#" + randomColour).fadeOut(400).fadeIn(400);
}

function colourSound(colour) {
  var audio = new Audio("sounds\\" + colour + ".mp3");
  audio.play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed")
  }, 100);
}

function checkAnswer() {
  if (gameInMotion === true) {
    index = userClickedPattern.length - 1;
    if (userClickedPattern[index] === gamePattern[index]) {
      if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        level++;
        if (level > highest) {
          highest++;
        }
        setTimeout(nextSequence, 500);
      }
    } else {
      wrong.play();
      pattern = "";
      for (let i = 0; i < gamePattern.length; i++)
      {
        if (pattern !== "")
        {
          pattern += ", "
        }
        pattern += gamePattern[i];
      }
      $("#game-pattern").text("Game pattern: " + pattern);
      pattern = "";
      for (let i = 0; i < userClickedPattern.length; i++)
      {
        if (pattern !== "")
        {
          pattern += ", "
        }
        pattern += userClickedPattern[i];
      }
      $("#user-pattern").text("You clicked: " + pattern);
      $("#level-title").text("GAME OVER!");
      gameInMotion = false;
    }
  }
}
