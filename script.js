const quizData = [
    {
    question: "what is your gender?",
    a: "Male",
    b: "Female",
    correct: "b",
  },
  {
    question: "What is your current body type?",
    a: "Rectangle",
    b: "Hourglass",
    c: "Pear",
    d: "Round",
    correct: "d",
  },
  {
    question: "What is your primary fitness goal?",
    a: "Gain muscles and get stronger",
    b: "To look like a movie actor",
    c: "Boost self-confidence",
    d: "Maintain optimal health",
    correct: "b",
  },
  {
    question: "Your thoughts on aesthetics?",
    a: "That’s what I want. Other people have them. How do I get them?",
    b: "They are OK, but not the only goal",
    c: "I don't really care about aesthetics. I'm more interested in the health benefits of fitness",
    d: "I don’t know anything about them",
    correct: "a",
  },
  {
    question: "Your biggest fitness struggle right now is:",
    a: "I’m too busy",
    b: "I have no idea what exercise to do, what to eat",
    c: "Staying motivated and consistent",
    d: "I need support and accountability",
    correct: "b",
  },
  {
    question: "How motivated are you to reach your fitness goals?",
    a: "I’m ready let’s do this",
    b: "Hopeful, but could use some guidance",
    c: "I’m struggling with some motivation",
    d: "I’m not always motivated, but I know I need to be",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) answer = answerElement.id;
  });
  return answer;
};

const loadQuiz = () => {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
};

loadQuiz();

submitButton.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) score++;
    currentQuiz++;
    if (currentQuiz < quizData.length) loadQuiz();
    else {
      quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="history.go(0)">Play Again</button>
        `;
    }
  }
});