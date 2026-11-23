/**
 * Campus Quiz Battle — External Application Logic
 * Prototype client-side interactions, quiz engine & role switching
 */

// Global Role State
let currentRole = 'STUDENT';

// Quiz Engine State & Sample Questions
const sampleQuestions = [
  {
    q: "What is the average-case time complexity of accessing an element in an array by index?",
    a: "O(1)",
    b: "O(n)",
    c: "O(log n)",
    d: "O(n²)",
    correct: "a"
  },
  {
    q: "Which data structure follows the Last-In First-Out (LIFO) principle?",
    a: "Queue",
    b: "Stack",
    c: "Binary Tree",
    d: "Hash Table",
    correct: "b"
  },
  {
    q: "In a singly linked list, what does the tail node's next pointer refer to?",
    a: "Head Node",
    b: "Previous Node",
    c: "null / None",
    d: "Itself",
    correct: "c"
  },
  {
    q: "What is the worst-case time complexity of QuickSort?",
    a: "O(n log n)",
    b: "O(n)",
    c: "O(n²)",
    d: "O(1)",
    correct: "c"
  },
  {
    q: "Which traversal of a Binary Search Tree produces values in sorted ascending order?",
    a: "Pre-order",
    b: "Post-order",
    c: "Level-order",
    d: "In-order",
    correct: "d"
  }
];

let currentQIdx = 0;
let selectedAnswers = {};
let timerSeconds = 600;
let timerInterval = null;

/**
 * Switch top-level interface role between STUDENT, LORDE, and ADMIN
 */
function switchRole(role, evt) {
  currentRole = role;
  document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
  if (evt && evt.target) {
    evt.target.classList.add('active');
  }

  const badge = document.getElementById('roleBadge');
  const studentView = document.getElementById('studentView');
  const lordeView = document.getElementById('lordeView');
  const adminView = document.getElementById('adminView');

  studentView.style.display = 'none';
  lordeView.style.display = 'none';
  adminView.style.display = 'none';

  if (role === 'STUDENT') {
    badge.className = 'badge badge-student';
    badge.textContent = 'STUDENT';
    document.getElementById('userName').textContent = 'Alex Johnson';
    studentView.style.display = 'block';
  } else if (role === 'LORDE') {
    badge.className = 'badge badge-lorde';
    badge.textContent = 'LORDE';
    document.getElementById('userName').textContent = 'Lorde Marcus';
    lordeView.style.display = 'block';
  } else if (role === 'ADMIN') {
    badge.className = 'badge badge-admin';
    badge.textContent = 'ADMIN';
    document.getElementById('userName').textContent = 'Admin Victoria';
    adminView.style.display = 'block';
  }
  showNotification(`Switched interface view to ${role} role`);
}

/**
 * Switch sub-tabs within Student Dashboard
 */
function switchStudentTab(tab) {
  const tabs = ['quizzes', 'games', 'leaderboard', 'history', 'badges'];
  tabs.forEach(t => {
    const el = document.getElementById('studentTab' + t.charAt(0).toUpperCase() + t.slice(1));
    if (el) el.style.display = (t === tab) ? 'block' : 'none';
  });

  document.querySelectorAll('#studentMainTabs .tab-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', tabs[idx] === tab);
  });
}

/**
 * Switch sub-tabs within Admin Control Hub
 */
function switchAdminTab(tab) {
  const tabs = ['quizzes', 'courses', 'users'];
  tabs.forEach(t => {
    const el = document.getElementById('adminTab' + t.charAt(0).toUpperCase() + t.slice(1));
    if (el) el.style.display = (t === tab) ? (t === 'courses' ? 'grid' : 'block') : 'none';
  });

  document.querySelectorAll('#adminView .tab-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', tabs[idx] === tab);
  });
}

/**
 * Toggle between Academic and Community Games Leaderboards
 */
function switchLB(type) {
  document.getElementById('lbAcademicTable').style.display = (type === 'academic') ? 'block' : 'none';
  document.getElementById('lbGamingTable').style.display = (type === 'gaming') ? 'block' : 'none';
  document.getElementById('lbBtnEdu').classList.toggle('active', type === 'academic');
  document.getElementById('lbBtnGame').classList.toggle('active', type === 'gaming');
}

/**
 * Filter course quiz cards by course name pill
 */
function filterQuizzes(course) {
  document.querySelectorAll('.filter-pills .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === course);
  });

  document.querySelectorAll('#quizCardsGrid .quiz-card').forEach(card => {
    if (course === 'ALL' || card.getAttribute('data-course') === course) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/**
 * Start Live Timed Quiz Execution
 */
function startQuiz(title, course) {
  document.getElementById('studentMainTabs').style.display = 'none';
  document.getElementById('quizTakerSection').style.display = 'block';
  document.getElementById('takerQuizTitle').textContent = title;
  document.getElementById('takerCourseTag').textContent = course;

  currentQIdx = 0;
  selectedAnswers = {};
  timerSeconds = 600;
  renderCurrentQuestion();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds--;
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    document.getElementById('quizTimerDisplay').textContent =
      `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function renderCurrentQuestion() {
  const q = sampleQuestions[currentQIdx];
  document.getElementById('questionStepLabel').textContent = `Question ${currentQIdx + 1} of ${sampleQuestions.length}`;
  document.getElementById('currentQuestionText').textContent = `${currentQIdx + 1}. ${q.q}`;

  const progress = ((currentQIdx + 1) / sampleQuestions.length) * 100;
  document.getElementById('quizProgressBar').style.width = progress + '%';

  const answeredCount = Object.keys(selectedAnswers).length;
  document.getElementById('answeredCountLabel').textContent = `${answeredCount} Answered (${Math.round((answeredCount / sampleQuestions.length) * 100)}%)`;

  const options = [
    { k: 'a', text: q.a },
    { k: 'b', text: q.b },
    { k: 'c', text: q.c },
    { k: 'd', text: q.d }
  ];

  const container = document.getElementById('optionsContainer');
  container.innerHTML = options.map(opt => `
    <button class="option-btn ${selectedAnswers[currentQIdx] === opt.k ? 'selected' : ''}" onclick="selectOption('${opt.k}')">
      <span class="option-key">${opt.k.toUpperCase()}</span>
      <span class="option-label-text">${opt.text}</span>
    </button>
  `).join('');

  document.getElementById('btnPrevQuestion').disabled = (currentQIdx === 0);
  const isLast = currentQIdx === sampleQuestions.length - 1;
  document.getElementById('btnNextQuestion').style.display = isLast ? 'none' : 'inline-block';
  document.getElementById('btnSubmitQuiz').style.display = isLast ? 'inline-block' : 'none';
}

function selectOption(key) {
  selectedAnswers[currentQIdx] = key;
  renderCurrentQuestion();
}

function nextQuestion() {
  if (currentQIdx < sampleQuestions.length - 1) {
    currentQIdx++;
    renderCurrentQuestion();
  }
}

function prevQuestion() {
  if (currentQIdx > 0) {
    currentQIdx--;
    renderCurrentQuestion();
  }
}

function abandonQuiz() {
  if (confirm('Are you sure you want to abandon this quiz attempt?')) {
    clearInterval(timerInterval);
    document.getElementById('quizTakerSection').style.display = 'none';
    document.getElementById('studentMainTabs').style.display = 'block';
  }
}

function submitQuiz() {
  clearInterval(timerInterval);
  let score = 0;
  sampleQuestions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correct) score++;
  });
  const pct = Math.round((score / sampleQuestions.length) * 100);

  document.getElementById('quizTakerSection').style.display = 'none';
  document.getElementById('studentMainTabs').style.display = 'block';

  document.getElementById('modalScoreDisplay').textContent = `${score} / ${sampleQuestions.length}`;
  document.getElementById('modalAccuracyDisplay').textContent = `${pct}% Accuracy`;
  openModal('quizResultModal');
}

/**
 * Community Games Sign Up & Cancellation
 */
function signUpGame(gameId) {
  const actionDiv = document.getElementById(gameId + 'Action');
  actionDiv.innerHTML = `
    <div class="flex-col gap-1">
      <button class="btn-outline btn-block" disabled style="background:#dcfce7; color:#15803d; border-color:#86efac; font-weight:700;">
        ✓ Signed Up & Ready
      </button>
      <button class="btn-outline btn-block btn-sm" onclick="cancelSignUp('${gameId}')" style="color:#b91c1c; border-color:#fca5a5;">
        Cancel Sign-Up
      </button>
    </div>
  `;
  showNotification('🎉 Successfully signed up for the match session!');
}

function cancelSignUp(gameId) {
  const actionDiv = document.getElementById(gameId + 'Action');
  actionDiv.innerHTML = `
    <button class="btn-primary btn-block" onclick="signUpGame('${gameId}')">Join Game Session 🎟️</button>
  `;
  showNotification('↩️ Sign-up cancelled.');
}

/**
 * Lorde Game Management Actions
 */
function startLordeGame(title) {
  if (confirm(`Start game session "${title}"? Roles will be randomly assigned to all participants.`)) {
    showNotification(`▶ Session started! All participants received their assigned roles.`);
  }
}

function endLordeGame(title) {
  if (confirm(`End session "${title}"? You can now enter the winner/loser results.`)) {
    showNotification(`⏹ Session completed. Open "Record Match Results" to distribute points.`);
  }
}

function commitResults() {
  closeModal('recordResultsModal');
  showNotification(`🏆 Match results committed! Role points and badges awarded.`);
}

function handleCreateGame(e) {
  e.preventDefault();
  const title = document.getElementById('newGameTitle').value;
  closeModal('createGameModal');
  showNotification(`🎲 Game session "${title}" successfully published!`);
}

/**
 * Admin Management Actions
 */
function handleAdminCreateQuiz(e) {
  e.preventDefault();
  const title = document.getElementById('builderQuizTitle').value;
  closeModal('quizBuilderModal');
  showNotification(`🎯 Quiz "${title}" created and published!`);
}

function addCourse(e) {
  e.preventDefault();
  const name = document.getElementById('newCourseName').value;
  const list = document.getElementById('courseList');
  const row = document.createElement('div');
  row.className = 'flex-between p-2 mb-1';
  row.style.borderBottom = '1px solid var(--border)';
  row.style.padding = '0.5rem 0';
  row.innerHTML = `<span><strong>${name}</strong></span><button class="btn-danger btn-sm" onclick="this.parentElement.remove()">Delete</button>`;
  list.appendChild(row);
  document.getElementById('newCourseName').value = '';
  showNotification(`Course "${name}" added!`);
}

function addCategory(e) {
  e.preventDefault();
  const name = document.getElementById('newCatName').value;
  const list = document.getElementById('catList');
  const row = document.createElement('div');
  row.className = 'flex-between p-2 mb-1';
  row.style.borderBottom = '1px solid var(--border)';
  row.style.padding = '0.5rem 0';
  row.innerHTML = `<span><strong>${name}</strong></span><button class="btn-danger btn-sm" onclick="this.parentElement.remove()">Delete</button>`;
  list.appendChild(row);
  document.getElementById('newCatName').value = '';
  showNotification(`Category "${name}" added!`);
}

/**
 * Modals & Live Notification Banners
 */
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function showNotification(msg) {
  const banner = document.getElementById('alertBanner');
  document.getElementById('alertMessage').textContent = msg;
  banner.classList.add('show');
  setTimeout(() => banner.classList.remove('show'), 4000);
}

function hideAlert() {
  document.getElementById('alertBanner').classList.remove('show');
}
