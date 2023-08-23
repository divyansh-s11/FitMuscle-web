const quizData = [
  {
    question: "What is your gender?",
    a: "Male",
    b: "Female",
  },
  {
    question: "What is your primary fitness goal?",
    a: "Gain muscles and get stronger",
    b: "To look like a movie actor",
    c: "Boost self-confidence",
    d: "Maintain optimal health",
  },
  {
    question: "Your biggest fitness struggle right now is:",
    a: "I’m too busy",
    b: "I have no idea what exercise to do, what to eat",
    c: "Staying motivated and consistent",
    d: "I need support and accountability",
  },
  {
    question: "Your thoughts on aesthetics?",
    a: "That’s what I want. Other people have them. How do I get them?",
    b: "They are OK, but not the only goal",
    c: "I don't really care about aesthetics. I'm more interested in the health benefits of fitness",
    d: "I don’t know anything about them",
  },
  {
    question: "How motivated are you to reach your fitness goals?",
    a: "I’m ready, let’s do this",
    b: "Hopeful, but could use some guidance",
    c: "I’m struggling with some motivation",
    d: "I’m not always motivated, but I know I need to be",
  },
];

const quizDataF = [
  {
    question: "What is your gender?",
    a: "Male",
    b: "Female",
  },
  {
    question: "What is your primary fitness goal?",
    a: "I want to lose fat and look attractive",
    b: "I’m too skinny, so I want to gain weight and look attractive",
    c: "I want to build strength",
    d: "I want body curves",
  },
  {
    question: "Your biggest fitness struggle right now is:",
    a: "I’m too busy",
    b: "I have no idea what exercise to do, what to eat",
    c: "Staying motivated and consistent",
    d: "I need support and accountability",
  },
  {
    question: "Do you want to build muscles on a specific body part?",
    a: "Yes, I mainly want to build my glutes",
    b: "I want to build proportional muscle on my upper and lower body",
    c: "I don’t know much about muscles, I just want a model like body",
    d: "I want to focus on my lower body",
  },
  {
    question: "How motivated are you to reach your fitness goals?",
    a: "I’m ready, let’s do this",
    b: "Hopeful, but could use some guidance",
    c: "I’m struggling with some motivation",
    d: "I’m not always motivated, but I know I need to be",
  },
];

const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerElements = document.querySelectorAll(".answer");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let userAnswers = [];
let currentUserData = quizData;

function loadQuestion() {
  const currentQuizData = currentUserData[currentQuestion];

  questionElement.innerText = currentQuizData.question;
  answerElements[0].nextElementSibling.innerText = currentQuizData.a;
  answerElements[1].nextElementSibling.innerText = currentQuizData.b;
  answerElements[2].nextElementSibling.innerText = currentQuizData.c || "";
  answerElements[3].nextElementSibling.innerText = currentQuizData.d || "";

  
  answerElements.forEach((answerElement) => {
    answerElement.checked = false;
  });
}

function selectAnswer() {
 answerElements.forEach((answerElement) => {
    answerElement.addEventListener("change", (e) => {
      userAnswers[currentQuestion] = e.target.id;

      
      if (currentQuestion === 0 && e.target.nextElementSibling.innerText === 'Female') {
        currentUserData = quizDataF;
      }

      
      currentQuestion++;
      if (currentQuestion < currentUserData.length) {
        loadQuestion();
      } else {
        showResult();
      }
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
      } else if (userBodyType === "b" || userBodyType === "c") {
          quote = "Build Muscles";
      } else if (userBodyType === "d") {
          quote = "Lose fat and achieve a lean physique";
      }
  } else if (userGender === "male") {
      const q1 = userAnswers[1];
      const q3 = userAnswers[3];

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
    
      else {
        quote = "Lose fat and achieve Lean Physique";
      }
  }

  
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");

  
  const resultHeading = document.createElement("h2");
  resultHeading.innerText = "Your Fitness Goal";

  
  const resultParagraph = document.createElement("p");
  resultParagraph.innerHTML = `You are <strong>${userGender}</strong>. Your fitness goal is: <strong>${quote}</strong>`;

  
  resultContainer.appendChild(resultHeading);
  resultContainer.appendChild(resultParagraph);

  
  quizContainer.innerHTML = "";
  quizContainer.appendChild(resultContainer);
}


loadQuestion();
selectAnswer();

submitButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < currentUserData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});
