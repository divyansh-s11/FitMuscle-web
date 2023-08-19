const quizData = [
  {
    question: "What is your gender?",
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
    a: "I’m ready, let’s do this",
    b: "Hopeful, but could use some guidance",
    c: "I’m struggling with some motivation",
    d: "I’m not always motivated, but I know I need to be",
    correct: "b",
  },
];

const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerElements = document.querySelectorAll(".answer");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];

  questionElement.innerText = currentQuizData.question;
  answerElements[0].nextElementSibling.innerText = currentQuizData.a;
  answerElements[1].nextElementSibling.innerText = currentQuizData.b;
  answerElements[2].nextElementSibling.innerText = currentQuizData.c || "";
  answerElements[3].nextElementSibling.innerText = currentQuizData.d || "";

  // Clear any previous selections
  answerElements.forEach((answerElement) => {
    answerElement.checked = false;
  });
}

function selectAnswer() {
  answerElements.forEach((answerElement) => {
    answerElement.addEventListener("change", (e) => {
      userAnswers[currentQuestion] = e.target.id;
    });
  });
}

function showResult() {
  const userGender = userAnswers[0] === "b" ? "female" : "male";
  let quote = "";

  if (userGender === "female") {
    const userBodyType = userAnswers[1];
    
    if (userBodyType === "a") {
      quote = "Lose fat and achieve a lean physique";
    } else if (userBodyType === "b" || userBodyType === "d") {
      quote = "Build Muscles";
    } else if (userBodyType === "c") {
      quote = "Build Muscles or Lose fat and achieve a lean physique";
    }
  } else if (userGender === "male") {
    const userBodyType = userAnswers[1];
    const userFitnessStruggle = userAnswers[3];

    if (userBodyType === "a" && userFitnessStruggle === "a") {
      quote = "Build Muscles";
    } else if (userBodyType === "a" && userFitnessStruggle === "b") {
      quote = "Lose fat and achieve lean Physique";
    } else if (userBodyType === "b" && userFitnessStruggle === "a") {
      quote = "Lose fat and achieve lean Physique";
    } else if (userBodyType === "b" && userFitnessStruggle === "b") {
      quote = "Build Muscles";
    } else if (userBodyType === "b" && userFitnessStruggle === "c") {
      quote = "Lose fat and achieve lean Physique";
    } else if (userBodyType === "b" && userFitnessStruggle === "d") {
      quote = "Build Muscles";
    } else if (userBodyType === "c" && userFitnessStruggle === "a") {
      quote = "Build Muscles";
    } else if (userBodyType === "c" && userFitnessStruggle === "b") {
      quote = "Lose fat and achieve lean Physique";
    } else if (userBodyType === "c" && userFitnessStruggle === "c") {
      quote = "Build Muscles";
    } else if (userBodyType === "c" && userFitnessStruggle === "d") {
      quote = "Lose fat and achieve lean Physique";
    } else if (userBodyType === "d" && userFitnessStruggle === "a") {
      quote = "Build Muscles";
    } else if (userBodyType === "d" && userFitnessStruggle === "b") {
      quote = "Lose fat and achieve lean Physique";
    } else if (userBodyType === "d" && userFitnessStruggle === "c") {
      quote = "Lose fat and achieve lean Physique";
    } else if (userBodyType === "d" && userFitnessStruggle === "d") {
      quote = "Build Muscles";
    }
  }

  const resultElement = document.createElement("p");
  resultElement.innerText = `You are ${userGender}. Your fitness goal is: ${quote}`;
  quizContainer.innerHTML = "";
  quizContainer.appendChild(resultElement);
}

loadQuestion();
selectAnswer();

submitButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});
