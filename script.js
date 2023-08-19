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
    question: "Your biggest fitness struggle right now is:",
    a: "I’m too busy",
    b: "I have no idea what exercise to do, what to eat",
    c: "Staying motivated and consistent",
    d: "I need support and accountability",
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
      const userBodyType = userAnswers[2];

      if (userBodyType === "a") {
          quote = "Lose fat and achieve a lean physique";
      } else if (userBodyType === "b" || userBodyType === "d") {
          quote = "Build Muscles";
      } else if (userBodyType === "c") {
          quote = "Build Muscles or Lose fat and achieve a lean physique";
      }
  } else if (userGender === "male") {
      const q1 = userAnswers[2];
      const q3 = userAnswers[4];

      if (q1 === "a") {
          quote = "Build Muscles";
      }
      else if (q1 === "b" && q3 === "a" ) {
        quote = "Build Muscles";
      }
      else if (q1 === "b" && q3 === "c") {
        quote = "Build Muscles";
      }
      else if (q1 ==- "c" && q3 === "b") {
        quote = "Lose fat and achieve Lean Physique";
      }
      else if (q1 === "b" && q3 === "d") {
        quote = "Build Muscles";
      }
      else if (q1 === "d" && q3 === "b") {
        quote = "Lose fat and achieve Lean Physique";
      }
      else if (q1 === "c" && q3 === "a") {
        quote = "Build Muscles";
      }
      else if (q1 === "d" && q3 === "a") {
        quote = "Build Muscles";
      }
  }

  // Create a container for the result
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");

  // Create a heading for the result
  const resultHeading = document.createElement("h2");
  resultHeading.innerText = "Your Fitness Goal";

  // Create a paragraph for the user's gender and fitness goal
  const resultParagraph = document.createElement("p");
  resultParagraph.innerHTML = `You are <strong>${userGender}</strong>. Your fitness goal is: <strong>${quote}</strong>`;

  // Append elements to the result container
  resultContainer.appendChild(resultHeading);
  resultContainer.appendChild(resultParagraph);

  // Clear the quiz container and append the result container
  quizContainer.innerHTML = "";
  quizContainer.appendChild(resultContainer);
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
