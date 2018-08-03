/*
    Trivia Game
   - Mike Soto -
*/


$(document).ready(function() {
    var score = 0;
    var intervalId;
    var showTimer = $("#timer");
    var showQuestion = $("#question");
    var showScore = $("#score");
    var showA1 = $("#a1");
    var showA2 = $("#a2");
    var showA3 = $("#a3");
    var showA4 = $("#a4");
    var startBtn = $("#start");
    var thirty = 30;
    var showRightWrong = $("#rightWrong");
    var showGIF = $("#gif");
    var numQuestions = 0;

    var triviaQuestions = [
        {
            q: "What are \"Durin's Folk\" more commonly known as?", 
            a1: "Hobbits from outside the shire",
            a2: "Dwarves", //correct answer
            a3: "Forest Elves",
            a4: "Great Eagles",
        },
        {
            q: "What was the bridge of Khazad-D&ucirc;m?", 
            a1: "The bridge over the Brandywine River, marking the end of The Shire.",
            a2: "The mythical gateway between Middle-Earth and Valinor, the land of the gods.", 
            a3: "The name of the broken sword before it was reforged as teh legendary And&uacute;ril.",
            a4: "The bridge inside the Great Gates of Moria where Gandalf faced the Balrog.", //corect answer
        },
        {
            q: "What kind of creatures are the spawn of Ungoliant?", 
            a1: "Hill Giants",
            a2: "Uruk-hai", 
            a3: "Giant Spiders", //correct answer
            a4: "Flying Fell Beasts", 
        },
        {
            q: "Which of these is not a public inn in Middle-Earth?",
            a1: "The Old Guesthouse" ,
            a2: "The Green Dragon" ,
            a3: "The Prancing Pony" ,
            a4: "The Southern Star" , //correct answer
        },
        {
            q: "Who participated in The Battle of Isengard?" ,
            a1: "Saurumon's forces versus King Th&eacute;odin's Rohirrim." ,
            a2: "Saurumon's forces versus the Ents" , //correct answer
            a3: "Orcs of Dol Guldur versus the Galadhrim of Lothl&oacute;rien." ,
            a4: "The forces of the Dark Lord Suron versus the forces of Gondor." ,
        },
        {
            q: "Which of these weapons was not found in the troll's cave?" ,
            a1: "Orcrist the Goblin-Cleaver." ,
            a2: "Glamdring the Foe-Hammer." ,
            a3: "Sting" ,
            a4: "Angrist" , //correct answer
        },
        {
            q: "Who ws Elanor Gaardner (also known as Elanor the Fair?" ,
            a1: "Daughter of Samwise Gamgee and Rosie Cotton." , //correct answer
            a2: "The Queen of Mirkwood and mother of Legolas." ,
            a3: "One of the nine humans who was given a Ring of Power." ,
            a4: "Wife of Bard the Bowman of Lake-Town." ,
        },
        {
            q: "What did Aragorn, Imrahil, Gandalf, &Eacuteomer, Elladan, and Elrohir decide during The Last Debate?" ,
            a1: "Who to send to destroy the Ring of Power" , 
            a2: "Who would lead the White Council. Gandalf was elected but declined, so Saruman took over." ,
            a3: "The number of soldiers to send to figh Sauron in the Battle of the Morannon." , //correct answer
            a4: "How to punish the newly risen Uruk-hai" ,
        },
        {
            q: "What Sindarin word was Aragorn known by when he was a child?" ,
            a1: "Estel - meaning \"hope\" or \"trust\"." , //correct answer
            a2: "Amdir - meaning \"looking up\"." ,
            a3: "Aeluin - meaning \"blue lake\"." ,
            a4: "M&iacute;riel - meaning \"sparkling like jewels." ,
        },
        {
            q: "What are Morgul-Wounds?" ,
            a1: "The corrupt mounds of earth from which Uruk-hai are born." ,
            a2: "Wounds inflicted by the Nazg&ucirc;l." , //correct answer
            a3: "Siege towers used by Orcs during the attack on Minas Tirith." ,
            a4: "The name given to an Elf who has given up its immortality." ,
        },

    ]

    var winQuotes = ["The dark fire will not avail you, Flame of Udûn!", "Hobbits really are amazing creatures.", "I have nothing greater to give than the gift you already bear.", "There is only one Lord of the Ring.", "His strength returns.", "Take some rest. These borders are well protected."];
    var loseQuotes = ["Fool of a Took! Throw yourself in next time, and rid us of your stupidity!", "Go back to the shadow. You shall not pass!", "Victory was near, but the power of the Ring could not be undone.", "The hearts of Men are easily corrupted.", "Concealed within his fortress, the Lord of Mordor sees all.", "Against the power of Mordor, there can be no victory. ", "You have a stout heart, little Hobbit, but that will not save you."];

    var winSounds = ["arwen_defeatevil.wav", "clever.wav", "galariel_small.wav", "gandalf_runshadowfax.wav", "gollum_musthaveprecious.wav", "saruman_rulemiddleearth.wav"];
    var loseSounds = ["galadriel_task.wav", "gandalf_allends.wav", "gandalf_shallnotpass.wav", "gollum_nobodylikesyou.wav", "saruman_lesserson.wav", "saruman_removethose.wav", "treebeard_nocurse.wav"];

    var winGIFs = ["win0.gif", "win1.gif", "win2.gif", "win3.gif", "win4.gif", "win5.gif", "win6.gif", "win7.gif", "win8.gif", "win9.gif"];
    var loseGIFs = ["lose0.gif", "lose1.gif", "lose2.gif", "lose3.gif", "lose4.gif", "lose5.gif", "lose6.gif", "lose7.gif", "lose8.gif", "lose9.gif", "lose.gif"];

    var correctAnswers = ["a2", "a4", "a3", "a4", "a2", "a4", "a1", "a3", "a1", "a2"];
    var idClicked = "";
    var i = 0;
    var continueGame = true;
    var correct = false;

startBtn.on("click", function(){
    i = 0;

    startGame(i);

})



function startGame(){
    if(i < correctAnswers.length){
        resetGame();
        showScore.text(score);
        showQuestion.html(triviaQuestions[i].q);
        showA1.html(triviaQuestions[i].a1);
        showA2.html(triviaQuestions[i].a2);
        showA3.html(triviaQuestions[i].a3);
        showA4.html(triviaQuestions[i].a4);
    }else{
        gameOver();
        setTimeout(function(){
            startGame();
        }, 9000);
        
    }   
    
}

function resetGame(){
    showScore.attr("style", "display: none;");
    startBtn.attr("style", "display: none;");
    showQuestion.attr("style", "display: block;");
    showA1.attr("style", "display: block;");
    showA2.attr("style", "display: block;");
    showA3.attr("style", "display: block;");
    showA4.attr("style", "display: block;");
    showTimer.attr("style", "display: inline-block;");
    showGIF.attr("style", "display: none;");
    showRightWrong.attr("style", "display: none;");
    
    console.log("reset");
    stop();
    idClicked = "";
    thirty = 30;
    showTimer.text(thirty);
    setTimeout(questionTimer,1000);
}


showA1.on("click", function(){
    idClicked = showA1.attr("id");
    checkWin();   
})
showA2.on("click", function(){
    idClicked = showA2.attr("id");
    checkWin();   
})
showA3.on("click", function(){
    idClicked = showA3.attr("id");
    checkWin(); 
})
showA4.on("click", function(){
    idClicked = showA4.attr("id");
    checkWin();
})
    


function checkWin(){
    // if(numQuestions <= answers.length){
        // if(i >= answers.length){
        //     gameOver();
        // }
        if(idClicked === correctAnswers[i]){
            i++;
            numQuestions++;
            correct = true;
            winner();
                    
        }
        else {
            i++;
            numQuestions++;
            correct = false;
            loser();

        }

    // }else {
    //     gameOver();
    // }
}

function winner(){
    score++;
    alert("you win");
    awardScreen();
    
    
}

function loser(){
    alert("you lose");
    awardScreen();
    
}

function outtaTime(){
    alert("you are out of time");
    timeUp();
}

function timeUp(){
    stop();
    
    showGIF.attr("style", "display: inline-block;");
    //setTimeout(scoreScreenTimer,1000);
    //clear question and answers
    showQuestion.attr("style", "display: none;");
    showA1.attr("style", "display: none;");
    showA2.attr("style", "display: none;");
    showA3.attr("style", "display: none;");
    showA4.attr("style", "display: none;");
    showTimer.attr("style", "display: none;");

    showRightWrong.attr("style", "display: inline-block;");  
    showRightWrong.text("We've run out of time...");
    var randGIF = Math.floor(Math.random()*loseGIFs.length); 
    showGIF.html("<img src=" + "\"assets/images/" + loseGIFs[randGIF] + "\">");
    var randSound = Math.floor(Math.random()*loseSounds.length);
    var sound = new Audio();
    sound.src = "assets/sounds/lose/" + loseSounds[randSound];
    sound.play();
    setTimeout(function(){
        startGame();
    }, 8000);
    stop();
}

function gameOver(){
    //Display Game Over Screen
    showScore.attr("style", "display: inline-block;");
    showScore.text(score);
    continueGame = false;
    numQuestions = 0;
    i = 0;
    stop();
    clearInterval(intervalId);
    showGIF.attr("style", "display: inline-block;");
    //setTimeout(scoreScreenTimer,1000);
    //clear question and answers
    showQuestion.attr("style", "display: none;");
    showA1.attr("style", "display: none;");
    showA2.attr("style", "display: none;");
    showA3.attr("style", "display: none;");
    showA4.attr("style", "display: none;");
    showTimer.attr("style", "display: none;");
    showRightWrong.text("It's finished...."); 
    if(score >= 7){
        showGIF.html("<img src='assets/images/finishwin.gif'> ");
    }else{
        showGIF.html("<img src='assets/images/finishlose.gif'> ");
    }
    setTimeout(function(){
        startGame();
    }, 8000);
    stop();
}

function awardScreen(){
    stop();
    showScore.attr("style", "display: inline-block;");
    showScore.text(score);
    showGIF.attr("style", "display: inline-block;");
    //setTimeout(scoreScreenTimer,1000);
    //clear question and answers
    showQuestion.attr("style", "display: none;");
    showA1.attr("style", "display: none;");
    showA2.attr("style", "display: none;");
    showA3.attr("style", "display: none;");
    showA4.attr("style", "display: none;");
    showTimer.attr("style", "display: none;");

    //show award elements
    showScore.text(score);
    

    if(!correct){
        showRightWrong.attr("style", "display: inline-block;");
        var randQuote = (Math.floor(Math.random()*loseQuotes.length));  
        showRightWrong.text(loseQuotes[randQuote]);
        var randGIF = Math.floor(Math.random()*loseGIFs.length); 
        showGIF.html("<img src=" + "\"assets/images/" + loseGIFs[randGIF] + "\">");
        var randSound = Math.floor(Math.random()*loseSounds.length);
        var sound = new Audio();
        sound.src = "assets/sounds/lose/" + loseSounds[randSound];
        sound.play();
        
    }
    else {
        showRightWrong.attr("style", "display: inline-block;");
        var randQuote = (Math.floor(Math.random()*winQuotes.length));
        showRightWrong.text(winQuotes[randQuote]);
        var randGIF = Math.floor(Math.random()*winGIFs.length);
        showGIF.html("<img src=\"" + "assets/images/" + winGIFs[randGIF] + "\">");
        var randSound = Math.floor(Math.random()*winSounds.length);
        var sound = new Audio();
        sound.src = "assets/sounds/win/" + winSounds[randSound];
        sound.play();
        score++;
    }
    setTimeout(function(){
        startGame();
    }, 8000);
    stop();
    

}


function questionTimer() {
  if(thirty <= 0){
    
    clearInterval(intervalId);
    thirty = 30;
    
    return;

  }
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
} // End of questionTimer

// function scoreScreenTimer() {
//     //gameover
//     if(continueGame === true){
//         thirty = 15
//         if(thirty <= 0){
//         clearInterval(intervalId);
//         thirty = 30;
//         return;
//         }
    
//         clearInterval(intervalId);
//         intervalId = setInterval(decrement, 1000);
        
//     }
//     //award screen
//     else {
//         thirty = 15
//         if(thirty <= 0){
//         clearInterval(intervalId);
//         thirty = 30;
//         return;
//         }
    
//         clearInterval(intervalId);
//         intervalId = setInterval(decrement, 1000);
        
//     }
//   } // End of scoreScreenTimer

function decrement() {

  thirty--;

  showTimer.text(thirty);

  if (thirty === 0) {
    i++;
    outtaTime();
    stop();

  }
} //End of decrement

function stop() {
    
  clearInterval(intervalId);
} // end of stop




}) //end of document ready