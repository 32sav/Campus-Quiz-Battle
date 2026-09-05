# Campus Quiz Battle — User Stories

---

## SECTION 1: STUDENT EDUCATION USER STORIES

### Authentication

**US-001: Student Registration**
- As a new student, I want to create an account with my name, email, and password
- So that I can access the quiz platform
- Acceptance Criteria:
  - Form requires valid email
  - Password must be at least 8 characters
  - Email must be unique
  - Confirmation message shown after registration

**US-002: Student Login**
- As a student, I want to log in with my email and password
- So that I can access my quizzes and profile
- Acceptance Criteria:
  - Login form accepts email and password
  - Error message on invalid credentials
  - Redirect to dashboard on successful login

**US-003: Student Logout**
- As a student, I want to log out of my account
- So that others cannot access my data
- Acceptance Criteria:
  - Logout button visible on dashboard
  - Session destroyed after logout
  - Redirect to login page

### Quiz Taking (Education)

**US-004: View Available Courses**
- As a student, I want to see a list of available courses
- So that I can choose which course's quizzes to take
- Acceptance Criteria:
  - Courses displayed with name and description
  - Number of quizzes per course shown
  - Courses organized alphabetically or by popularity
  - Click to view course details

**US-005: View Quizzes by Course**
- As a student, I want to see all quizzes available in a specific course
- So that I can choose which quiz to take
- Acceptance Criteria:
  - Quizzes displayed with title and category
  - Shows number of questions
  - Shows estimated time to complete
  - Best score shown (if already taken)
  - Quizzes organized by category

**US-006: Start Quiz**
- As a student, I want to start a quiz with one click
- So that I can begin answering questions immediately
- Acceptance Criteria:
  - Clear "Start Quiz" button
  - Quiz loads in under 3 seconds
  - Timer starts immediately
  - Quiz details shown (time limit, number of questions)

**US-007: Answer Questions**
- As a student, I want to answer multiple-choice questions (A, B, C, D)
- So that I can take the quiz
- Acceptance Criteria:
  - Question text is clear
  - All four options are visible
  - Only one answer can be selected per question
  - Can change answer before submitting
  - Can navigate between questions

**US-008: View Timer**
- As a student, I want to see a countdown timer during the quiz
- So that I know how much time I have left
- Acceptance Criteria:
  - Timer is clearly visible
  - Timer counts down in seconds
  - Warning when time is running low (e.g., under 1 minute)
  - Quiz auto-submits if time expires

**US-009: Submit Quiz**
- As a student, I want to submit my quiz when finished
- So that my answers can be graded
- Acceptance Criteria:
  - Clear "Submit Quiz" button
  - Confirmation before final submission
  - Cannot edit answers after submission

**US-010: View Quiz Results**
- As a student, I want to see my score and results immediately after submission
- So that I know how I performed
- Acceptance Criteria:
  - Score displayed prominently (e.g., "8/10")
  - Percentage score shown
  - Option to see which answers were correct/incorrect
  - Option to review questions

**US-011: View Quiz History**
- As a student, I want to see my previous quiz attempts
- So that I can track my progress
- Acceptance Criteria:
  - List of all previous attempts with dates
  - Best score for each quiz highlighted
  - Option to retake any quiz
  - Sorted by most recent

**US-012: View Personal Dashboard (Education)**
- As a student, I want to see my dashboard with key information
- So that I can quickly access my data
- Acceptance Criteria:
  - Total quizzes attempted
  - Average score
  - Current leaderboard rank (education)
  - List of available courses
  - Quick access to education leaderboard

**US-013: View Education Leaderboard**
- As a student, I want to see the education leaderboard
- So that I can see how I rank against other students in quizzes
- Acceptance Criteria:
  - Leaderboard shows top 50 students
  - Displays student name, total quiz score, and rank
  - My position highlighted in the list
  - Can view leaderboard by course
  - Can view leaderboard by category

---

## SECTION 2: STUDENT COMMUNITY GAMES USER STORIES

### Community Games Discovery

**US-014: View Upcoming Community Games**
- As a student, I want to see a list of upcoming community games
- So that I can find games to participate in
- Acceptance Criteria:
  - Games displayed with game type (Mafia, Werewolf, etc.)
  - Shows date, time, and location
  - Shows number of slots available
  - Shows if I'm already signed up
  - Organized by date (nearest first)

**US-015: View Game Details**
- As a student, I want to see detailed information about a game
- So that I know what to expect
- Acceptance Criteria:
  - Game type and description shown
  - Date, time, and location clearly displayed
  - Maximum number of participants shown
  - Current number of sign-ups shown
  - Roles in the game explained
  - Lorde (game creator) name shown

### Game Participation

**US-016: Sign Up for a Community Game**
- As a student, I want to sign up for an upcoming game
- So that I can participate in community games
- Acceptance Criteria:
  - Clear "Sign Up" button
  - Confirmation message after signing up
  - Cannot sign up after game starts
  - Cannot sign up if slots are full
  - Added to participant list

**US-017: Cancel Game Sign-Up**
- As a student, I want to cancel my sign-up before the game starts
- So that my slot can be given to another student
- Acceptance Criteria:
  - Clear "Cancel Sign-Up" button (if not started)
  - Confirmation before canceling
  - Slot becomes available for others
  - Notification sent to lorde

**US-018: Receive Role Assignment**
- As a student, I want to be randomly assigned a role when the game starts
- So that the game is fair and unpredictable
- Acceptance Criteria:
  - Role assigned automatically when game starts
  - I'm notified of my role
  - Role shown on screen with description
  - Cannot choose my role
  - All participants receive roles simultaneously

### Game Results

**US-019: View Game Results**
- As a student, I want to see the results after a game completes
- So that I know if I won and how many points I earned
- Acceptance Criteria:
  - Results displayed immediately after game ends
  - Shows my role
  - Shows if I won or lost
  - Shows points earned (role-based)
  - Shows all participant results and their roles
  - Results saved to my history

**US-020: View Community Games History**
- As a student, I want to see my community game history
- So that I can track my gaming activities
- Acceptance Criteria:
  - List of all games I've participated in
  - Shows game type, date, role played, and points earned
  - Shows win/loss status
  - Sorted by most recent
  - Can see detailed results for any past game

**US-021: View Personal Community Games Stats**
- As a student, I want to see my community games statistics
- So that I can track my performance
- Acceptance Criteria:
  - Total games played
  - Total wins and losses
  - Favorite game type
  - Favorite role (most played)
  - Total points earned from games
  - Win rate percentage

### Community Games Leaderboard

**US-022: View Community Games Leaderboard**
- As a student, I want to see the community games leaderboard
- So that I can see how I rank in games against other students
- Acceptance Criteria:
  - Leaderboard shows top 50 students by game points
  - Displays student name, total game points, and rank
  - My position highlighted in the list
  - Can view leaderboard by game type (Mafia wins, Werewolf wins, etc.)
  - Shows total games played per student
  - Separate from education leaderboard

---

## SECTION 3: LORDE (GAME CREATOR) USER STORIES

### Lorde Authentication

**US-101: Lorde Login**
- As a lorde, I want to log in with my credentials
- So that I can create and manage community games
- Acceptance Criteria:
  - Separate login for lorde role
  - Secure password authentication
  - Redirect to lorde dashboard on success

**US-102: Lorde Logout**
- As a lorde, I want to log out
- So that I can end my lorde session securely
- Acceptance Criteria:
  - Logout button on lorde dashboard
  - Session is destroyed

### Game Creation

**US-103: Create Community Game Session**
- As a lorde, I want to create a new community game session
- So that students can sign up to play
- Acceptance Criteria:
  - Form to create new game
  - Select game type (Mafia, Werewolf, Among Us, etc.)
  - Set game title/name
  - Set date and time
  - Set location (physical location or camp name)
  - Set maximum number of participants
  - Set game description (optional)
  - Confirmation message after creation

**US-104: View Lorde Dashboard**
- As a lorde, I want to see my lorde dashboard
- So that I can manage all my games
- Acceptance Criteria:
  - List of all games I've created
  - Shows upcoming games and past games
  - Shows number of sign-ups for each game
  - Quick links to create new game
  - Quick links to manage existing games

### Game Management

**US-105: Start a Game Session**
- As a lorde, I want to start a game session when all participants are ready
- So that the game can begin
- Acceptance Criteria:
  - Clear "Start Game" button
  - Confirmation before starting
  - Cannot start if no participants signed up
  - Cannot start before scheduled time (or can override)
  - Roles automatically assigned to all participants
  - Game status changes to "In Progress"

**US-106: Assign Roles to Participants**
- As a lorde, I want the system to randomly assign roles to all participants
- So that the game is fair
- Acceptance Criteria:
  - Roles assigned automatically when game starts
  - All participants receive different roles (where applicable)
  - Role assignment is random
  - Roles cannot be changed after assignment
  - Lorde can see role assignments

**US-107: End a Game Session**
- As a lorde, I want to end a game session when it's complete
- So that I can start recording results
- Acceptance Criteria:
  - Clear "End Game" button
  - Confirmation before ending
  - Cannot end before minimum time elapsed
  - Game status changes to "Completed"
  - Ready to enter results

### Results Recording

**US-108: Record Game Results**
- As a lorde, I want to input the final results of a game
- So that students' points can be calculated and awarded
- Acceptance Criteria:
  - Form to input winners/results
  - Select winner(s) or winning team
  - System automatically calculates role-based points
  - Can view all participants and their roles
  - Confirmation before finalizing results
  - Results saved and cannot be changed after confirmation

**US-109: View Game Statistics**
- As a lorde, I want to see statistics about my games
- So that I can improve future games
- Acceptance Criteria:
  - Total games organized
  - Total participants across all games
  - Average participants per game
  - Most popular game type organized
  - View detailed stats for each game

---

## SECTION 4: ADMIN USER STORIES

### Admin Authentication

**US-201: Admin Login**
- As an administrator, I want to log in with my credentials
- So that I can manage the platform
- Acceptance Criteria:
  - Separate login for admin role
  - Secure password authentication
  - Redirect to admin dashboard on success

**US-202: Admin Logout**
- As an administrator, I want to log out
- So that I can end my admin session securely
- Acceptance Criteria:
  - Logout button on admin dashboard
  - Session is destroyed

### Quiz & Course Management (Education)

**US-203: Create Course**
- As an admin, I want to create courses
- So that quizzes can be organized by course
- Acceptance Criteria:
  - Form to enter course name
  - Course name must be unique
  - Add course description (optional)
  - Course saved to database
  - Confirmation message shown

**US-204: Create Quiz Category**
- As an admin, I want to create quiz categories
- So that quizzes can be organized by topic
- Acceptance Criteria:
  - Form to enter category name
  - Category name must be unique
  - Category saved to database
  - Confirmation message shown

**US-205: Create Quiz**
- As an admin, I want to create a new quiz
- So that students can take it
- Acceptance Criteria:
  - Form requires quiz title
  - Select course from dropdown
  - Select category from dropdown
  - Set time limit (in minutes)
  - Quiz created and ready for questions

**US-206: Edit Quiz**
- As an admin, I want to edit quiz details
- So that I can update or fix information
- Acceptance Criteria:
  - Edit title, course, category, and time limit
  - Cannot edit after students have attempted it
  - Changes saved successfully

**US-207: Delete Quiz**
- As an admin, I want to delete a quiz
- So that I can remove outdated or incorrect quizzes
- Acceptance Criteria:
  - Confirmation dialog before deletion
  - Option to delete with or without results

### Question Management

**US-208: Add Question to Quiz**
- As an admin, I want to add questions to a quiz
- So that the quiz has content
- Acceptance Criteria:
  - Form requires question text
  - Must enter all 4 options (A, B, C, D)
  - Must select correct answer
  - Can add multiple questions
  - Questions appear in order added

**US-209: Edit Question**
- As an admin, I want to edit a question
- So that I can fix errors or update content
- Acceptance Criteria:
  - Edit question text
  - Edit options
  - Change correct answer
  - Changes reflected in all future attempts

**US-210: Delete Question**
- As an admin, I want to delete a question
- So that I can remove it from the quiz
- Acceptance Criteria:
  - Confirmation before deletion
  - Question removed from quiz immediately

### Game Management (Community Games)

**US-211: View All Community Games**
- As an admin, I want to view all community games created
- So that I can oversee game activities
- Acceptance Criteria:
  - List of all games (past and upcoming)
  - Shows lorde who created it
  - Shows date, time, and participants
  - Can search and filter games
  - Can view detailed information for any game

**US-212: Edit Community Game**
- As an admin, I want to edit game details
- So that I can correct errors or update information
- Acceptance Criteria:
  - Edit game date, time, location
  - Edit game details
  - Cannot edit after game has started
  - Changes saved successfully

**US-213: Delete Community Game**
- As an admin, I want to delete a community game
- So that I can remove incorrect or inappropriate games
- Acceptance Criteria:
  - Confirmation dialog before deletion
  - Option to delete with or without results
  - Participants notified of cancellation

**US-214: Manage Lordes**
- As an admin, I want to manage lordes (game creators)
- So that I can control who can create games
- Acceptance Criteria:
  - View list of all lordes
  - Can promote students to lorde role
  - Can demote lordes to student role
  - Can view games created by each lorde

### Analytics & Results

**US-215: View Quiz Statistics**
- As an admin, I want to view statistics for each quiz
- So that I can see how students are performing
- Acceptance Criteria:
  - Number of students who took the quiz
  - Average score
  - Most common wrong answer
  - Difficulty rating

**US-216: View Student Results (Education)**
- As an admin, I want to view individual student results
- So that I can analyze performance
- Acceptance Criteria:
  - Search for student by name or email
  - View all quizzes they've taken
  - See their scores and date/time of attempt
  - Option to view detailed answers for a specific attempt

**US-217: View Community Games Statistics**
- As an admin, I want to view statistics for community games
- So that I can see game engagement and performance
- Acceptance Criteria:
  - Total games created and played
  - Total participants
  - Most popular game type
  - Average participants per game
  - View statistics by lorde

**US-218: View Student Community Games Results**
- As an admin, I want to view individual student game results
- So that I can analyze gaming activity
- Acceptance Criteria:
  - Search for student by name or email
  - View all games they've participated in
  - See their roles, results, and points earned
  - View detailed game history

### Admin Dashboard

**US-219: View Admin Dashboard (Education)**
- As an admin, I want to see an admin dashboard for education
- So that I can manage the quiz platform
- Acceptance Criteria:
  - Total number of students
  - Total number of quizzes
  - Total quiz attempts
  - Recent activity feed
  - Quick links to manage quizzes and questions

**US-220: View Admin Dashboard (Community Games)**
- As an admin, I want to see an admin dashboard for community games
- So that I can oversee game activities
- Acceptance Criteria:
  - Total games created
  - Total participants in games
  - Number of active lordes
  - Most popular game type
  - Recent game activity feed

---

## SECTION 5: FUTURE USER STORIES (Version 2+)

**US-301: Live Multiplayer Quiz Battles**
- As a student, I want to compete in real-time multiplayer quiz battles
- So that I can challenge friends and students directly

**US-302: Custom Roles in Community Games**
- As a lorde, I want to customize roles for each game type
- So that I can create unique game variations

**US-303: Achievements & Badges**
- As a student, I want to earn badges and achievements
- So that I can see my accomplishments

**US-304: Tournament Mode**
- As a lorde, I want to create multi-round tournaments
- So that students can compete in organized brackets

**US-305: Mobile Application**
- As a student, I want to access Campus Quiz Battle on mobile
- So that I can play anytime, anywhere

**US-306: Difficulty Levels**
- As a student, I want quizzes with different difficulty levels
- So that I can challenge myself progressively

**US-307: XP and Levels**
- As a student, I want to earn XP and level up
- So that I can track my progression