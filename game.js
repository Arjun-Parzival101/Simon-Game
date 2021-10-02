var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

/*****Fucntion to Reset values for Wrong attempt *****/
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

/***** Starting game with keypress *****/
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

/***** User clicking color choice *****/
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

/* Function to Check if User's choice is matching with game choice */
function checkAnswer(currentLevel) {
    /* If attempt & Sequence was Correct, Game Pattern is resumed with next Sequence  */
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        /* If attempt was wrong, Game is resetted with Red bg & flash sound */
        var wrongAudio = new Audio("sounds/wrong.mp3")
        wrongAudio.play();
        $("body").addClass("game-over");
        console.log("Wrong");

        /* Resetting Game & Heading with press any key to start */
        setTimeout(function() {
            $("body").removeClass("game-over");

        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

/** Generating Random Game choice  **/
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    /* Making buttons to flash so that user gets HInt */
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

/* Setting different sounds for diff colours */
function playSound(colour) {
    var sound = new Audio("sounds/" + colour + ".mp3");
    sound.play();
}

/* Animation for user clicked choice */
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}