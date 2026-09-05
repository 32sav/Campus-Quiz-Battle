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

### Phase 1: Planning ✅ (CURRENT)
- Define vision and goals
- Gather all requirements
- Create user stories (60+)
- System overview and database design
- **Status:** COMPLETE

### Phase 2: Architecture & Design (NEXT)
- System architecture diagrams
- Detailed database schema
- API endpoint specifications
- Technology stack finalization
- Development environment setup

### Phase 3: Backend Development
- User authentication system
- Education quiz system
- Community games system
- Scoring and leaderboard engines
- API development

### Phase 4: Frontend Development
- Student dashboard (education & games)
- Lorde dashboard
- Admin dashboard
- Quiz interface
- Leaderboard views

### Phase 5: Testing & Deployment
- Unit and integration testing
- User acceptance testing
- Deployment and launch
- Monitoring and optimization

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

**Phase 1 Status:** ✅ COMPLETE

**Next:** Phase 2 - System Architecture & Database Design

Ready to build! 🚀