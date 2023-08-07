
const splash = document.getElementById(".splash");
document.addEventListener('click',()=>{
    setTimeout(()=>{
        document.getElementById("splash").style.display = "none";
    },4000)
})


function playSound(){
    document.getElementById("player").play();
}



function hide(){
    document.getElementById("startButton").style.display = "none";
    document.getElementById('ball').style.animationPlayState = "running","running";
    var audio = new Audio('FinalIntro.mp3');
    audio.play();
}


