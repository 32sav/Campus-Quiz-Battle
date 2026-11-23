// quiz.js - Interactive Quiz Room Controller & Timer

const QuizEngine = {
  currentQuestionIndex: 0,
  timeRemainingSeconds: 600, // 10 minutes
  timerInterval: null,
  userAnswers: {},
  questions: [
    {
      id: 1,
      text: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 1
    },
    {
      id: 2,
      text: "Which protocol is responsible for reliable, ordered byte-stream delivery over IP?",
      options: ["UDP", "ICMP", "TCP", "ARP"],
      correct: 2
    },
    {
      id: 3,
      text: "In relational database design, which Normal Form deals with removing transitive dependencies?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 2
    },
    {
      id: 4,
      text: "Which data structure uses LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Priority Queue", "Deque"],
      correct: 1
    },
    {
      id: 5,
      text: "What does the ACID acronym stand for in database transactions?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Accuracy, Control, Integrity, Data",
        "Availability, Concurrency, Indexing, Delivery",
        "Authentication, Cipher, Integrity, Decryption"
      ],
      correct: 0
    }
  ],

  init() {
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.timeRemainingSeconds = 600;
    this.renderQuestion();
    this.startTimer();
  },

  startTimer() {
    const timerDisplay = document.getElementById("quizTimer");
    if (!timerDisplay) return;

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeRemainingSeconds--;
      const mins = Math.floor(this.timeRemainingSeconds / 60);
      const secs = this.timeRemainingSeconds % 60;
      timerDisplay.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

      if (this.timeRemainingSeconds <= 60) {
        timerDisplay.style.color = "#ef4444";
      }

      if (this.timeRemainingSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.submitQuiz(true);
      }
    }, 1000);
  },

  renderQuestion() {
    const container = document.getElementById("questionContainer");
    const progressText = document.getElementById("questionProgress");
    if (!container) return;

    const q = this.questions[this.currentQuestionIndex];
    if (progressText) {
      progressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
    }

    const savedAnswer = this.userAnswers[this.currentQuestionIndex];

    let optionsHtml = q.options.map((opt, idx) => {
      const isChecked = savedAnswer === idx ? "checked" : "";
      return `
        <label class="option-card ${savedAnswer === idx ? 'selected' : ''}" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; margin-bottom: 0.75rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; cursor: pointer;">
          <input type="radio" name="quizOption" value="${idx}" ${isChecked} onchange="QuizEngine.selectOption(${idx})" style="accent-color: #38bdf8;">
          <span style="color: #f8fafc; font-size: 1rem;">${opt}</span>
        </label>
      `;
    }).join("");

    container.innerHTML = `
      <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; color: #f8fafc;">${q.text}</h3>
      <div class="options-group">${optionsHtml}</div>
    `;

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    if (prevBtn) prevBtn.disabled = this.currentQuestionIndex === 0;
    if (nextBtn) {
      nextBtn.style.display = this.currentQuestionIndex === this.questions.length - 1 ? "none" : "inline-block";
    }
    if (submitBtn) {
      submitBtn.style.display = this.currentQuestionIndex === this.questions.length - 1 ? "inline-block" : "none";
    }
  },

  selectOption(optionIndex) {
    this.userAnswers[this.currentQuestionIndex] = optionIndex;
    this.renderQuestion();
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuestion();
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderQuestion();
    }
  },

  submitQuiz(autoSubmitted = false) {
    clearInterval(this.timerInterval);
    let correctCount = 0;
    this.questions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / this.questions.length) * 100);
    const modal = document.getElementById("resultsModal");
    const scoreVal = document.getElementById("scoreValue");
    const details = document.getElementById("scoreDetails");

    if (scoreVal) scoreVal.textContent = `${scorePct}%`;
    if (details) {
      details.textContent = `You answered ${correctCount} out of ${this.questions.length} questions correctly.` + 
        (autoSubmitted ? " (Time expired)" : "");
    }

    if (modal) {
      modal.classList.add("active");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("questionContainer")) {
    QuizEngine.init();
  }
});
