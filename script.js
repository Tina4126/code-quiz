const startBtn = document.getElementById("start");
const questionTitle = document.getElementById("question-title");
const choices = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const timeEl = document.getElementById("time");
const initialsEl = document.getElementById("initials");
const finalScoreEl = document.getElementById("final-score");
const submitBtn = document.getElementById("submit");
const endScreen = document.getElementById("end-screen");
const highscoresList = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");

// set global variables
let currentQuestionIndex = 0;
let time = 60;
let timerId;

// add event listener to the start button
startBtn.addEventListener("click", startQuiz);

// add event listener to the submit button
submitBtn.addEventListener("click", saveScore);

// add event listener to the clear button
clearBtn.addEventListener("click", clearHighscores);

// start the quiz
function startQuiz() {
  // hide the start screen and show the questions
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");

  // set the timer
  timeEl.textContent = time;
  timerId = setInterval(updateTimer, 1000);

  // show the first question
  showQuestion();
}

// show the current question
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // update the question title
  questionTitle.textContent = currentQuestion.question;

  // clear the choices
  choices.innerHTML = "";

  // add a button for each choice
  currentQuestion.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("choice");
    button.addEventListener("click", checkAnswer);
    choices.appendChild(button);
  });
}

// check the answer
function checkAnswer(event) {
  // get the selected answer
  const selectedAnswer = event.target.textContent;

  // get the current question
  const question = questions[currentQuestionIndex];

  // check if the answer is correct
  if (selectedAnswer === question.answer) {
    // show feedback and move to the next question
    feedback.textContent = "Correct!";
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  } else {
    // show feedback and subtract time
    feedback.textContent = "Wrong!";
    time -= 10;
    if (time < 0) {
      time = 0;
      endQuiz();
    }
    updateTimer();
  }
}

// update the timer
function updateTimer() {
  time--;
  timeEl.textContent = time;
  if (time === 0) {
    endQuiz();
  }
}

// end the quiz
function endQuiz() {
  // stop the timer
  clearInterval(timerId);

  // hide the questions and show the end screen
  document.getElementById("questions").classList.add("hide");
  endScreen.classList.remove("hide");

  // set the final score
  finalScoreEl.textContent = time;

  // clear the feedback
  feedback.textContent = "";

 // get the highscores from local storage
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// sort the highscores by score
highscores.sort(function(a, b) {
  return b.score - a.score;
});

// remove any scores beyond the top 5
highscores.splice(5);

// save updated highscores to local storage
localStorage.setItem("highscores", JSON.stringify(highscores));

// display the highscores
highscoresList.innerHTML = "";
highscores.forEach(function(score) {
  const li = document.createElement("li");
  li.textContent = score.initials + " - " + score.score;
  highscoresList.appendChild(li);
});}
