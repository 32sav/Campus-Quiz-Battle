# Campus Quiz Battle — Requirements

## Functional Requirements

### Authentication
- [x] User registration (student, admin, and lorde)
- [x] User login
- [x] User logout
- [x] Password reset / credential validation
- [x] User role management (student, admin, lorde)

---

## SECTION 1: EDUCATIONAL QUIZZES

### Quiz System
- [x] Create quiz categories
- [x] Create quizzes (linked to courses)
- [x] Add questions to quizzes
- [x] Edit questions
- [x] Delete questions
- [x] Multiple-choice question format (A, B, C, D)
- [x] Define correct answers
- [x] Set quiz time limits
- [x] Display countdown timer during quiz

### Student Features (Education)
- [x] View available courses
- [x] View available quizzes by course
- [x] Select and start a quiz
- [x] Answer multiple-choice questions
- [x] See countdown timer
- [x] Submit quiz
- [x] Receive automatic score calculation
- [x] View quiz results
- [x] View previous quiz attempts
- [x] View personal best score per quiz
- [x] View current ranking on leaderboard
- [x] Access personal dashboard (education stats)

### Admin Features (Education)
- [x] Admin login
- [x] Create/edit courses
- [x] Create/edit quiz categories
- [x] Create/edit/delete quizzes
- [x] Create/edit/delete questions
- [x] View student results
- [x] View quiz statistics
- [x] Access admin dashboard

### Education Leaderboard
- [x] Calculate and display global leaderboard (quiz points)
- [x] Rank students by total quiz score
- [x] Display leaderboard by course
- [x] Display leaderboard by category
- [x] Show ranking position
- [x] Update leaderboard in real-time after quiz submission

---

## SECTION 2: COMMUNITY GAMES

### Game Types & Setup
- [x] Support multiple game types (Mafia, Werewolf, Among Us, etc.)
- [x] Define game templates (rules, roles, point values)
- [x] Set role-based point system
  - Example: Mafia winner gets 150 points, Villager winner gets 100 points
- [x] Customize points per game type

### Lorde Features (Game Creator)
- [x] Lorde login (new role)
- [x] Create new game sessions
- [x] Set game type (Mafia, Werewolf, etc.)
- [x] Set time and location for game
- [x] Set date and time
- [x] Set maximum number of participants
- [x] Start game session
- [x] Randomly assign roles to participants
- [x] End game session
- [x] Input final results (who won, role-based scores)
- [x] View lorde dashboard (games created and managed)
- [x] View game statistics

### Student Features (Community Games)
- [x] View upcoming community games
- [x] See game details (type, date, location, time, roles)
- [x] Sign up for a game
- [x] Cancel sign-up (before game starts)
- [x] Receive role assignment (automatically when game starts)
- [x] View game results after completion
- [x] View community game history
- [x] View earned points from games
- [x] Track wins by game type
- [x] Access personal community games stats

### Admin Features (Community Games)
- [x] Admin can view all game sessions
- [x] Admin can view game statistics
- [x] Admin can edit/delete game sessions
- [x] Admin can manage lordes
- [x] Admin can set default point values per role

### Community Games Leaderboard
- [x] Calculate and display separate community games leaderboard
- [x] Rank students by total community game points
- [x] Display leaderboard by game type (Mafia wins, Werewolf wins, etc.)
- [x] Show ranking position
- [x] Display player stats (games played, wins, favorite role)
- [x] Update leaderboard after each game completes

### Game Session Management
- [x] Create game session with participants
- [x] Random role assignment to participants
- [x] Track game start time
- [x] Track game end time
- [x] Record final results and winners
- [x] Store role-based points earned
- [x] Calculate participant scores based on role and outcome

---

## Non-Functional Requirements

### Performance
- [ ] Page load time under 3 seconds
- [ ] Quiz submission response within 2 seconds
- [ ] Game sign-up within 1 second
- [ ] Leaderboard updates within 1 second

### Scalability
- [ ] Support at least 1,000 concurrent users
- [ ] Database optimized for quick queries
- [ ] Efficient leaderboard calculation
- [ ] Handle multiple simultaneous game sessions

### Security
- [ ] Passwords must be hashed (never plain text)
- [ ] Authentication tokens/sessions secure
- [ ] HTTPS for all communications
- [ ] Input validation on all forms
- [ ] Protect against SQL injection
- [ ] Lordes can only manage their own game sessions

### Usability
- [ ] Clean, intuitive interface
- [ ] Mobile-responsive design
- [ ] Clear navigation between education and community games sections
- [ ] Accessible to users with different abilities
- [ ] Clear visual separation between quiz and game sections

### Reliability
- [ ] 99% uptime target
- [ ] Data backup strategy
- [ ] Error handling and logging
- [ ] Graceful error messages to users
- [ ] Game data integrity (results cannot be tampered with)

---

## MVP Definition

**The MVP should deliver:**

### Educational Platform
A web application where:
- Registered students can create accounts and log in
- Students can select and take timed, multiple-choice quizzes organized by courses
- Quizzes include a countdown timer (time limit per quiz)
- After submission, students receive automatically calculated scores
- Students can view their previous quiz attempts and best scores
- All students can view a separate leaderboard ranked by quiz score

### Community Games Platform
A separate section where:
- Registered students can view upcoming community games
- Students can sign up for games (Mafia, Werewolf, Among Us, etc.)
- Lordes (game creators) can create game sessions and assign roles randomly
- Lordes can record final results and assign role-based points
- Students can view their community game history and points
- Separate leaderboard for community games points
- Administrators can log in and manage quizzes, questions, and lordes

**MVP Scope:**
- ✅ User authentication (student, admin, lorde roles)
- ✅ Course-based quiz creation and management
- ✅ Quiz taking with timer
- ✅ Automatic scoring (education)
- ✅ Quiz results history
- ✅ Education leaderboard
- ✅ Community games section (separate)
- ✅ Multiple game types (Mafia, Werewolf, Among Us)
- ✅ Random role assignment
- ✅ Role-based point system
- ✅ Community games leaderboard (separate)
- ✅ Lorde role for game creation and management
- ❌ Live multiplayer battles (Version 2)
- ❌ Real-time game play (Version 2)
- ❌ Mobile app (Future)
- ❌ Achievements/badges (Future)
- ❌ Anti-cheating (Future enhancement)

## Success Criteria

The MVP is successful when:
1. Students can complete the full quiz-taking workflow (login → select course → select quiz → answer → submit → see results)
2. Education leaderboard accurately reflects student quiz performance
3. Students can sign up for community games and receive role assignments
4. Lordes can create game sessions and record results
5. Community games leaderboard accurately reflects game points
6. Admin can create and manage quizzes, questions, and lordes
7. Two separate leaderboards exist (education and community games)
8. All data persists correctly in the database
9. Application is responsive and user-friendly
10. Clear visual separation between education and community games sections