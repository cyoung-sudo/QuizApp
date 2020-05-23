const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  // hide start btn & show questions
  startButton.classList.add('hide')
  questionContainer.classList.remove('hide')
  // shuffles questions array
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0;
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function resetState() {
  // reset background color
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  // remove all previous answer buttons
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question
  // create button for each answer
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      // add data attribute to button
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtons.appendChild(button)
  })
}

function selectAnswer(e) {
  // select clicked button
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  // for each button, add css class depending if correct
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  // show "next" button if there are more questions
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

// set css classes for buttons
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// remove previous css classes
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// array of question objects
const questions = [
  {
    question: "Which isn't a JavaScript type?",
    answers: [
      { text: "Number", correct: false },
      { text: "Fraction", correct: true },
      { text: "String", correct: false },
      { text: "Boolean", correct: false }
    ]
  },
  {
    question: "3 / 2 = ?",
    answers: [
      { text: "1.5", correct: true },
      { text: "1", correct: false },
      { text: "NaN", correct: false }
    ]
  },
  {
    question: "What does the function parseInt() do?",
    answers: [
      { text: "Checks if the argument is an integer", correct: false },
      { text: "Converts a string into an integer", correct: true }
    ]
  },
  {
    question: "When is 'NaN' returned?",
    answers: [
      { text: "If a string is non-numeric", correct: true },
      { text: "If the answer is invalid", correct: false },
      { text: "If a variable is undefined", correct: false }
    ]
  },
  {
    question: "What does 'hello'.chartAt(0) return?",
    answers: [
      { text: "NaN", correct: false },
      { text: "'h'", correct: true },
      { text: "'o'", correct: false },
      { text: "''", correct: false }
    ]
  },
  {
    question: "Boolean('') = ?",
    answers: [
      { text: "false", correct: true },
      { text: "true", correct: false }
    ]
  },
  {
    question: "Which keyword is best used for block-level variables?",
    answers: [
      { text: "const", correct: false },
      { text: "let", correct: true },
      { text: "var", correct: false }
    ]
  },
  {
    question: "Which statement is false?",
    answers: [
      { text: "123 === '123'", correct: true },
      { text: "1 == true", correct: false },
      { text: "123 == '123'", correct: false }
    ]
  },
  {
    question: "A 'for...in' for loop is used for?",
    answers: [
      { text: "Arrays", correct: false },
      { text: "Objects", correct: true },
      { text: "Strings", correct: false }
    ]
  },
  {
    question: "Which is the right way of creating an object?",
    answers: [
      { text: "var obj = Object.new();", correct: false },
      { text: "var obj = new {}", correct: false },
      { text: "var obj = new Object();", correct: true }
    ]
  }
]