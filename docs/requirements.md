# Campus Quiz Battle — Requirements

## Functional Requirements

### Authentication
- [ ] User registration (student, admin, and lorde)
- [ ] User login
- [ ] User logout
- [ ] Password reset
- [ ] User role management (student, admin, lorde)

---

## SECTION 1: EDUCATIONAL QUIZZES

### Quiz System
- [ ] Create quiz categories
- [ ] Create quizzes (linked to courses)
- [ ] Add questions to quizzes
- [ ] Edit questions
- [ ] Delete questions
- [ ] Multiple-choice question format (A, B, C, D)
- [ ] Define correct answers
- [ ] Set quiz time limits
- [ ] Display countdown timer during quiz

### Student Features (Education)
- [ ] View available courses
- [ ] View available quizzes by course
- [ ] Select and start a quiz
- [ ] Answer multiple-choice questions
- [ ] See countdown timer
- [ ] Submit quiz
- [ ] Receive automatic score calculation
- [ ] View quiz results
- [ ] View previous quiz attempts
- [ ] View personal best score per quiz
- [ ] View current ranking on leaderboard
- [ ] Access personal dashboard (education stats)

### Admin Features (Education)
- [ ] Admin login
- [ ] Create/edit courses
- [ ] Create/edit quiz categories
- [ ] Create/edit/delete quizzes
- [ ] Create/edit/delete questions
- [ ] View student results
- [ ] View quiz statistics
- [ ] Access admin dashboard

### Education Leaderboard
- [ ] Calculate and display global leaderboard (quiz points)
- [ ] Rank students by total quiz score
- [ ] Display leaderboard by course
- [ ] Display leaderboard by category
- [ ] Show ranking position
- [ ] Update leaderboard in real-time after quiz submission

---

## SECTION 2: COMMUNITY GAMES

### Game Types & Setup
- [ ] Support multiple game types (Mafia, Werewolf, Among Us, etc.)
- [ ] Define game templates (rules, roles, point values)
- [ ] Set role-based point system
  - Example: Mafia winner gets 150 points, Villager winner gets 100 points
- [ ] Customize points per game type

### Lorde Features (Game Creator)
- [ ] Lorde login (new role)
- [ ] Create new game sessions
- [ ] Set game type (Mafia, Werewolf, etc.)
- [ ] Set time and location for game
- [ ] Set date and time
- [ ] Set maximum number of participants
- [ ] Start game session
- [ ] Randomly assign roles to participants
- [ ] End game session
- [ ] Input final results (who won, role-based scores)
- [ ] View lorde dashboard (games created and managed)
- [ ] View game statistics

### Student Features (Community Games)
- [ ] View upcoming community games
- [ ] See game details (type, date, location, time, roles)
- [ ] Sign up for a game
- [ ] Cancel sign-up (before game starts)
- [ ] Receive role assignment (automatically when game starts)
- [ ] View game results after completion
- [ ] View community game history
- [ ] View earned points from games
- [ ] Track wins by game type
- [ ] Access personal community games stats

### Admin Features (Community Games)
- [ ] Admin can view all game sessions
- [ ] Admin can view game statistics
- [ ] Admin can edit/delete game sessions
- [ ] Admin can manage lordes
- [ ] Admin can set default point values per role

### Community Games Leaderboard
- [ ] Calculate and display separate community games leaderboard
- [ ] Rank students by total community game points
- [ ] Display leaderboard by game type (Mafia wins, Werewolf wins, etc.)
- [ ] Show ranking position
- [ ] Display player stats (games played, wins, favorite role)
- [ ] Update leaderboard after each game completes

### Game Session Management
- [ ] Create game session with participants
- [ ] Random role assignment to participants
- [ ] Track game start time
- [ ] Track game end time
- [ ] Record final results and winners
- [ ] Store role-based points earned
- [ ] Calculate participant scores based on role and outcome

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