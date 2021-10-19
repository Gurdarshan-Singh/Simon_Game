//colors
var buttonColours =["red", "blue", "green", "yellow"];

//game pattern
var gamePattern=[];

//user clicked gamePattern
var userClickedPattern=[];

//to check if firstly any key is pressed
var started=false;

//this states the level
var level=0;

//respond to clicks
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//keyboard key pressed
$(document).keydown(function(){
  if(!started){
  $("#level-title").text("Level"+level);  //this is optional
  nextSequence();
  started=true;
  }
});

//next nextSequence
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

//play sound
function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

//animate
function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

//check answer
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("sucess");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
          nextSequence();
      },1000);

    }
  }
  else{
    console.log("fail");
    var audioFail=new Audio("sounds/wrong.mp3");
    audioFail.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started =false;
}
