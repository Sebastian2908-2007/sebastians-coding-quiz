var minutes = 3;
var time = 60;
var countdownEL = document.getElementById("countdown");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
let shuffledQuestions, curentQuestionsIndex;
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var score = 0;
var keepScore = document.querySelector(".append-score");
var playerScore = localStorage.getItem("score","value");
 function updateCountdown () {
    
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    countdownEL.innerHtml = `${minutes}:${seconds}`;

    time--;
    
   
};
setInterval(updateCountdown, 1000);



 function startGame  () {
    
startButton.classList.add("hide");
questionContainerElement.classList.remove("hide");
shuffledQuestions = questions.sort(()=> Math.random()- .5);
currentQuestionsIndex = 0;

setNextQuestion();
};

startButton.addEventListener("click", startGame);

  function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex]);

};

 function showQuestion  (question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
           
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })
    

};



 function resetState () {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
};

 function selectAnswer (e) {
var selectedButton = e.target 
var correct = selectedButton.dataset.correct
setStatusClass(document.body, correct);
Array.from(answerButtonsElement.children).forEach(button =>{
    setStatusClass(button, button.dataset.correct)
})
if (shuffledQuestions.length > currentQuestionsIndex + 1) {
nextButton.classList.remove("hide")
}

 else {
    startButton.innerText = "restart";
    startButton.classList.remove("hide");

}
 
   //  my score keeping function sb need to put local storage function
 function scoreCurrent () {
  
   
        if (selectedButton.dataset.correct) {
           score ++; console.log(score);
           localStore();
       }else {
           alert("incorrect ha ha ha ha ha");
       }
    
         };
         scoreCurrent();
      


};

    

function setStatusClass (element, correct) {
    clearStatusClass(element);

    if (correct) {
        element.classList.add("correct")
    }
    else {
        element.classList.add("wrong")
    }


}

function clearStatusClass (element) {
    element.classList.remove("correct");
    element.classList.remove("wrong")

}


var questions = [
    {
        question:"what is correct syntax to initiate a variable",
        answers: [
            {text: "const myvar", correct: false},
            {text: "let myvar", correct:false},
            {text:"var myvar = ",correct:false},
            {text:"all of the above",correct:true}
        ]
    },
    {
        question: "with javascript it's essential to use semi-colons?",
        answers:[
            {text:"yes js is very strict", correct:false},
            {text:"yes with the absence of one colon everything breaks", correct:false},
            {text:"both a and b", correct:false},
            {text:"nope colons are optional things run just fine without them",correct:true}
        ]
    },
    {
        question:"where does js run?",
        answers:[
            {text:"Js must be ran using a compiler", correct:false},
            {text:"in the browser",correct:true},
            {text:"outside on a rainy day",correct:false},
            {text:"javaScript always runs in the encoder on your laptop",correct:false},
        ]
    },
    {
        question:"what is correct syntax for a function?",
        answers:[
            {text:"var myfun=function()",correct:false},
            {text:"myfun()",correct:false},
            {text:"for (var = i=0,10+2",correct:false},
            {text:"both a and b work fine",correct:true}
        ]
    }

];

nextButton.addEventListener("click", () => {
    currentQuestionsIndex++
    setNextQuestion()
console.log(score);
})

 
function localStore () {
    localStorage.setItem("score", score);
    keepScore.innerHTML = playerScore;
}