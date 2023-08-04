var buttonColor=["green","red","yellow","blue"];
var gamePattern = [];
var userChosenPattern=[];
var level=0;
var started=false;
    
    
    $("body").keypress(function()
    {
        if(!started)
        {
            $("h1").text("level "+level);
            nextSequence();
            started=true;
        }
    });
    
function colorSound(color)
{
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}
function nextSequence()
{
    userChosenPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomColorChosen=buttonColor[randomNumber];
    gamePattern.push(randomColorChosen);
    $("h1").text("level "+level);
    colorSound(randomColorChosen);
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);    
}



$(".btn").click(function()
{
    var userChosenColor=$(this).attr("id");
    userChosenPattern.push(userChosenColor);
    colorSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer((userChosenPattern.length)-1)

});
function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        document.querySelector("#"+currentColor).classList.remove("pressed");
    },100);


}
function checkAnswer(currentLevel)
{
    var value=1;
    if(gamePattern[currentLevel]===userChosenPattern[currentLevel])
    {
        if(gamePattern.length===userChosenPattern.length)
        {
            setTimeout(nextSequence,1000);
        }
    }
    else
    {
        var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        document.querySelector("body").classList.remove("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    }
       
        
}
function startOver()
{
    gamePattern=[];
    started=false;
    level=0;
}