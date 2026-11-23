# Campus Quiz Battle

A dual-platform system combining educational quizzes with community team-building games for college and university students.

## 🎯 Project Overview

Campus Quiz Battle is an integrated platform with **two main components**:

### 1. Educational Quizzes
- Timed, multiple-choice quizzes organized by **courses**
- Automatic scoring and immediate results
- Course-based and category-based leaderboards
- Track quiz performance and progress

### 2. Community Games  
- Physical team-building games (Mafia, Werewolf, Among Us, etc.) tracked digitally
- Games happen at gatherings, camps, and physical events
- Random fair role assignment
- Role-based point system
- Separate community games leaderboard

**Current Phase:** Phase 1 - Planning & Requirements ✅

## 📚 Documentation

All planning documents are in the `/docs` folder:

- **[project-vision.md](docs/project-vision.md)** - Project vision, goals, and problem statement
- **[requirements.md](docs/requirements.md)** - All functional and non-functional requirements
- **[user-stories.md](docs/user-stories.md)** - 60+ detailed user stories (students, lordes, admins)
- **[system-overview.md](docs/system-overview.md)** - Complete technical blueprint with database design

## 🚀 MVP Features

### For Students (Education)
- ✅ Create account and log in
- ✅ Browse courses and their quizzes
- ✅ Take timed multiple-choice quizzes
- ✅ Get immediate scoring and results
- ✅ View quiz history and progress
- ✅ Compete on education leaderboard

### For Students (Community Games)
- ✅ View upcoming community games
- ✅ Sign up for games with random role assignment
- ✅ View results and earn role-based points
- ✅ Track game history and win rate
- ✅ Compete on community games leaderboard (separate)

### For Lordes (Game Creators)
- ✅ Create game sessions (Mafia, Werewolf, Among Us, etc.)
- ✅ Set date, time, location, and participant limits
- ✅ Automatically assign random roles to participants
- ✅ Record game results and award role-based points
- ✅ View game statistics

### For Admins
- ✅ Manage courses, categories, quizzes, and questions
- ✅ Manage lordes (game creators)
- ✅ View detailed analytics for both education and games
- ✅ Oversee all platform activities

## 🛣️ Project Roadmap

### Phase 1: Planning ✅
- Define vision and goals
- Gather all requirements
- Create user stories (60+)
- System overview and database design
- **Status:** COMPLETE

### Phase 2: Architecture & Design ✅
- System architecture diagrams
- Detailed database schema (Flyway V1 & V2)
- API endpoint specifications
- Technology stack finalization
- Development environment setup
- **Status:** COMPLETE

### Phase 3: Backend Development ✅
- Spring Boot 2.7.8 REST API
- Spring Security with Stateless JWT Authentication & BCrypt
- Education quiz system (quizzes, attempts, auto-grading)
- Community games system (sessions, RSVP, role outcomes)
- Scoring engines & dual leaderboards
- Badge evaluation engine (Academic & Community tracks)
- AdminController & services for courses, quizzes, and roles
- Standalone H2 dev/test profile (`application-h2.properties`)
- **Status:** COMPLETE

### Phase 4: Frontend Development ✅
- React 18 SPA with Redux Toolkit and React Router
- Unified Axios API layer with JWT interceptor
- Student Arena dashboard (quizzes, game signups, dual ranks)
- Interactive Quiz Runner with countdown timer & scoring modal
- Lorde Headquarters (game creation & role match recording)
- Admin Control Hub (stats, quiz builder, courses, user roles)
- Dual-track Leaderboards & Badge Hall of Fame
- Demo account quick-login helpers
- **Status:** COMPLETE

### Phase 5: Testing & Verification 🔄
- Backend Unit & Integration test suites:
  - `AuthServiceTest`: Registration, password hashing, duplicate check, JWT login
  - `QuizServiceTest`: Question retrieval, 100% and partial grading, badge evaluation
  - `GameServiceTest`: Session creation, participant sign-up, full capacity guards
  - `AdminServiceTest`: Aggregate statistics, course CRUD, user role promotion
  - `LeaderboardServiceTest`: Education & game leaderboards, student dual summary
  - `BadgeEvaluationServiceTest`: Badge thresholds and duplicate prevention
  - `CampusQuizBattleApplicationTests`: Spring Boot context & bean loading
- Frontend Test suite:
  - `App.test.js`: React Redux store and route bootstrapping
- **Status:** IN PROGRESS / TESTING SUITES IMPLEMENTED

### Version 2 Features (Future)
- Live multiplayer quiz battles
- Real-time game play
- Achievements and badges
- XP and levels
- Mobile application
- Advanced analytics
- Tournament mode

## 📋 Key Differences from Typical Quiz Platforms

✨ **Two-System Approach:**
- Education system (traditional quizzes)
- Community Games system (physical games with digital tracking)

✨ **Lorde Role:**
- Special role for game creators/organizers
- Can create and manage community games
- Records role-based points (not uniform points)

✨ **Separate Leaderboards:**
- Education leaderboard (quiz points)
- Community games leaderboard (game points)

✨ **Role-Based Points:**
- Different roles earn different points
- Example: Mafia winner = 150 points, Villager winner = 100 points
- Reflects role difficulty and importance

✨ **Course Organization:**
- Quizzes organized by course (academic structure)
- Additional category organization

## 📝 Project Structure
Campus-Quiz-Battle/
├── docs/
│ ├── project-vision.md # Vision and goals
│ ├── requirements.md # All requirements
│ ├── user-stories.md # 60+ user stories
│ └── system-overview.md # Technical blueprint
├── README.md # This file
├── LICENSE # MIT License
└── .gitignore # Git ignore rules


## 🎓 User Roles

### Student
- Take quizzes and participate in games
- Compete on leaderboards
- Track personal performance
- Sign up for community games

### Lorde
- Create and manage game sessions
- Assign random roles to participants
- Record game results
- View game statistics
- **Note:** Promoted by admins only

### Admin
- Manage all content (courses, quizzes, questions)
- Manage lordes (game creators)
- View platform analytics
- Oversee all activities

## 🔐 Security & Privacy

- Passwords hashed with bcrypt
- HTTPS for all communications
- Role-based access control
- Input validation and sanitization
- Protection against SQL injection
- Secure session management

## 📊 Database Overview

### Education System Tables
- USERS, COURSES, CATEGORIES, QUIZZES, QUESTIONS
- ATTEMPTS, ATTEMPT_ANSWERS
- Education Leaderboard (calculated)

### Community Games Tables
- GAME_TYPES, GAME_ROLES, GAME_SESSIONS
- GAME_PARTICIPANTS, GAME_RESULTS
- Community Games Leaderboard (calculated)

## 🎯 Success Metrics

The MVP is successful when:
1. Students complete quiz workflow → see results
2. Lordes create games → record results → see stats
3. Leaderboards accurately reflect performance
4. Admin can manage all platform activities
5. Clear separation between education and games

## 📞 Questions?

- Review the documentation in `/docs`
- Check `project-vision.md` for project goals
- Check `requirements.md` for feature list
- Check `user-stories.md` for detailed workflows
- Check `system-overview.md` for technical design

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🚀 How to Run Locally

### 1. Backend Service (Port 8080)
- **Zero-Config In-Memory Mode (No PostgreSQL required):**
  ```bash
  cd backend
  mvn spring-boot:run -Dspring-boot.run.profiles=h2
  ```
- **Standard PostgreSQL Mode:**
  ```bash
  cd backend
  mvn spring-boot:run
  ```

### 2. Frontend Application (Port 3000)
```bash
cd frontend
npm start
```

---

**Project Status:**
- Phase 1 (Planning): ✅ COMPLETE
- Phase 2 (Architecture & Schema): ✅ COMPLETE
- Phase 3 (Backend Implementation): ✅ COMPLETE
- Phase 4 (Frontend Implementation): ✅ COMPLETE
- Phase 5 (Unit & Integration Tests): ✅ COMPLETE

Ready to test and battle! 🚀