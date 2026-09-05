# Campus Quiz Battle — System Overview

## Complete User Flow
                CAMPUS QUIZ BATTLE
                        │
             ┌──────────┼──────────┐
             │          │          │
          Student    Lorde      Admin
             │          │          │
          Login      Login      Login
             │          │          │
     Dashboard    Lorde      Admin
       (2 tabs)   Dashboard  Dashboard
         │          │          │
┌────────┴────┐     │          │
│             │     │          │Education Community │ │
Quizzes Games │ │
│ │ │ │
Quiz Game Create Manage
Taking Sign-up Games All
│ │ │ │
Results Role Record View
Leaderboard Assignment Results Stats

---

## SECTION 1: EDUCATION SYSTEM

### Detailed Student Education Flow

1. **Login**
   - Students log in with email and password
   - Redirected to dashboard

2. **Dashboard (Education Tab)**
   - View available courses
   - See personal quiz statistics (total attempted, average score)
   - Quick access to education leaderboard
   - See average score across all quizzes
   - Navigation to Community Games section

3. **Course Selection**
   - Browse courses by name
   - See number of quizzes per course
   - Click on a course to view its quizzes

4. **Quiz Selection**
   - View all quizzes in selected course
   - Organized by category
   - See quiz details:
     - Number of questions
     - Time limit
     - Your best score (if already taken)
   - Click "Start Quiz"

5. **Quiz Taking**
   - Timer starts immediately (countdown from time limit)
   - Questions displayed (can show all at once or one per page - design decision)
   - Student selects answer for each question (A, B, C, or D)
   - Can review and change answers before submitting
   - Timer continues counting down
   - Warning when time is running low

6. **Submission**
   - Student clicks "Submit Quiz"
   - Confirmation dialog appears: "Are you sure?"
   - Cannot change answers after confirmation
   - Submit button becomes disabled

7. **Results**
   - Automatic score calculation happens
   - Results page displays immediately:
     - Score: "8/10"
     - Percentage: "80%"
     - Answer review (which were correct/incorrect)
   - Save attempt to database
   - Update education leaderboard ranking
   - Option to retake quiz

8. **Leaderboard (Education)**
   - View global rankings sorted by total quiz points
   - See category-specific rankings
   - See course-specific rankings
   - Check personal ranking and position
   - See top 50 students with their scores

---

## SECTION 2: COMMUNITY GAMES SYSTEM

### Detailed Student Community Games Flow

1. **Dashboard (Community Games Tab)**
   - See personal community game statistics:
     - Total games played
     - Win/loss record
     - Total points earned
     - Favorite game type
   - View upcoming games
   - See current game sign-ups
   - Quick access to community games leaderboard

2. **Browse Games**
   - View list of upcoming community games
   - Filters/sorts by:
     - Date (nearest first)
     - Game type
   - For each game see:
     - Game type (Mafia, Werewolf, etc.)
     - Date and time
     - Location (physical location)
     - Available slots
     - If you're already signed up

3. **View Game Details**
   - Click on a game to see full information:
     - Game type description
     - Date and time
     - Physical location/address
     - Current participants count
     - Maximum participants
     - Roles in the game (with explanations)
     - Lorde (game creator) name
     - Game description (if provided)

4. **Sign Up for Game**
   - Click "Sign Up" button
   - Confirmation: "You're signed up for [Game Name]"
   - Added to participant list
   - Receive notification when game starts
   - Can see yourself in participant list
   - Slot count decreases

5. **Game Session Starts**
   - Lorde starts the game (physically at the location)
   - System sends notification: "Game has started! Your role is: [ROLE]"
   - Role is randomly assigned from available roles
   - All participants receive their role simultaneously
   - Cannot change role after assignment

6. **During Game**
   - Student participates in physical game
   - Game is managed by lorde in real world (not on system)
   - System tracks elapsed time
   - No student action needed on platform during game

7. **Game Ends**
   - Lorde ends the game session on the platform
   - Game status changes to "Completed"
   - System waits for lorde to record results

8. **Lorde Records Results**
   - Lorde inputs final results
   - For each participant, records: Won/Lost
   - System automatically calculates points based on:
     - Role assigned (different roles = different point values)
     - Win/Loss status
     - Example: Mafia winner = 150 points, Villager winner = 100 points

9. **View Results**
   - Results displayed immediately on platform
   - Shows:
     - My role
     - If I won or lost
     - Points earned (calculated by system)
     - All other participants with their roles and results
     - Final leaderboard positions after this game

10. **Community Games Leaderboard**
    - View rankings by community game points (separate from education)
    - See stats:
        - Games played
        - Wins/losses
        - Win rate percentage
        - Favorite game type
        - Total points
    - View leaderboard by game type:
        - Mafia wins
        - Werewolf wins
        - Among Us wins
        - Etc.

---

### Detailed Lorde Flow

1. **Lorde Login**
   - Secure authentication with email and password
   - Lorde role verified
   - Redirected to lorde dashboard

2. **Lorde Dashboard**
   - View all games created by this lorde
   - See status of each game:
     - Upcoming (scheduled but not started)
     - In Progress (currently happening)
     - Completed (finished, results recorded)
   - See participant counts for each game
   - Quick links:
     - "Create New Game"
     - Edit game
     - View game details
     - Record results (if game completed)

3. **Create Game Session**
   - Click "Create New Game"
   - Fill form:
     - **Game Type**: Select from dropdown (Mafia, Werewolf, Among Us, etc.)
     - **Game Name**: Enter name
     - **Date**: Pick date
     - **Time**: Pick time
     - **Location**: Enter physical location/address/camp name
     - **Max Participants**: Enter maximum number
     - **Description** (optional): Describe the game
   - Click "Create"
   - Game created with status: "Waiting" or "Scheduled"
   - Game published and visible to students

4. **Manage Participants**
   - View signed-up students before game starts
   - See participant list with names
   - Can optionally remove participants if needed
   - Monitor sign-ups in real-time

5. **Start Game**
   - When ready to start (at scheduled time/location)
   - Click "Start Game"
   - Confirmation: "Start game for [Game Name]?"
   - Cannot start if no participants signed up
   - System randomly assigns roles:
     - Get roles for this game type
     - Shuffle roles randomly
     - Assign one role to each participant
     - Update GAME_PARTICIPANTS with assigned roles
   - Game status changes: "In Progress"
   - All participants notified with their role assignments

6. **During Game**
   - Lorde manages the physical game
   - Students play with their assigned roles (off-system)
   - Lorde monitors game progress
   - Game happens in real location

7. **End Game**
   - When game concludes
   - Click "End Game" on platform
   - Confirmation: "End game for [Game Name]?"
   - Game status: "Completed"
   - Ready for lorde to record results

8. **Record Results**
   - Lorde clicks "Record Results"
   - Form appears showing all participants with their assigned roles
   - For each participant, select: Won/Lost
   - System calculates points automatically:
     - Look up winner_points or loser_points based on role
     - Calculate total points for each participant
     - Example:
       - Player A (Mafia, Won): 150 points
       - Player B (Villager, Lost): 10 points
       - Player C (Doctor, Won): 100 points
   - Confirmation: "Finalize results?"
   - Click "Save"
   - Results saved permanently (cannot be changed)

9. **View Statistics**
   - Click "My Statistics"
   - See metrics:
     - Total games organized
     - Total participants across all games
     - Average participants per game
     - Most popular game type organized
     - Games by status (upcoming, completed, cancelled)
   - Can view detailed stats for each game
     - Participation count
     - Roles distribution
     - Winners distribution

---

### Detailed Admin Flow

1. **Admin Login**
   - Secure authentication
   - Redirected to admin dashboard

2. **Admin Dashboard (Two Tabs)**
   - **Tab 1: Education**
     - Manage courses, categories, quizzes, questions
     - View education statistics
   - **Tab 2: Community Games**
     - Manage games and lordes
     - View game statistics

3. **Education Tab - Course Management**
   - View all courses
   - "Create Course" button:
     - Enter course name (must be unique)
     - Enter description
     - Save
   - Edit course:
     - Change name
     - Change description
   - Delete course:
     - Confirmation required

4. **Education Tab - Category Management**
   - Similar to course management
   - Create, edit, delete categories

5. **Education Tab - Quiz Management**
   - View all quizzes
   - "Create Quiz" button:
     - Enter quiz title
     - Select course (dropdown)
     - Select category (dropdown)
     - Set time limit (in minutes)
     - Save
   - Edit quiz:
     - Change title, course, category, time limit
     - Cannot edit if students have attempted it
   - Delete quiz:
     - Confirmation required
     - Option to delete with/without keeping results

6. **Education Tab - Question Management**
   - Select a quiz
   - "Add Question" button:
     - Enter question text
     - Enter option A
     - Enter option B
     - Enter option C
     - Enter option D
     - Select correct answer (A, B, C, or D)
     - Save
   - Edit question:
     - Change question text
     - Change any option
     - Change correct answer
   - Delete question:
     - Confirmation required

7. **Education Tab - View Results**
   - View quiz statistics:
     - How many students took it
     - Average score
     - Most wrong answer
     - Difficulty rating
   - Search student by name/email:
     - See all quizzes they took
     - See their scores and dates
     - View detailed answers for a specific attempt

8. **Community Games Tab - Game Management**
   - View all games (past, upcoming, completed)
   - Filter by:
     - Game type
     - Lorde
     - Status
   - For each game see:
     - Lorde who created it
     - Date and location
     - Participants
     - Status
   - Edit game (if not started):
     - Change date, time, location, max participants
   - Delete game:
     - Confirmation required
     - Can delete with/without results

9. **Community Games Tab - Lorde Management**
   - View all lordes
   - View games each lorde created
   - Promote student to lorde:
     - Search for student
     - Click "Make Lorde"
   - Demote lorde to student:
     - Click "Remove Lorde Role"

10. **Community Games Tab - View Statistics**
    - Total games created and played
    - Total participants
    - Most popular game type
    - Average participants per game
    - Games by lorde (if requested)

---

## DATABASE CONCEPT

### USERS Table
user_id (primary key)
name (string)
email (string, unique)
password_hash (string)
role (enum: 'student', 'admin', 'lorde')
created_at (timestamp)
updated_at (timestamp)


### COURSES Table (NEW - for organizing quizzes)

course_id (primary key)
name (string, unique)
description (string, optional)
created_by (foreign key to users)
created_at (timestamp)
updated_at (timestamp)


### CATEGORIES Table

category_id (primary key)
name (string, unique)
description (string, optional)
created_at (timestamp)


### QUIZZES Table

quiz_id (primary key)
title (string)
description (string, optional)
course_id (foreign key)
category_id (foreign key)
time_limit (integer, in minutes)
created_by (foreign key to users - admin)
created_at (timestamp)
updated_at (timestamp)


### QUESTIONS Table

question_id (primary key)
quiz_id (foreign key)
question_text (string)
option_a (string)
option_b (string)
option_c (string)
option_d (string)
correct_answer (enum: 'a', 'b', 'c', 'd')
order (integer, for question sequence)
created_at (timestamp)


### ATTEMPTS Table (Quiz Results)

attempt_id (primary key)
user_id (foreign key)
quiz_id (foreign key)
score (integer)
total_questions (integer)
percentage (decimal)
started_at (timestamp)
completed_at (timestamp)
submitted_at (timestamp)


### ATTEMPT_ANSWERS Table (Detailed Quiz Answers)

answer_id (primary key)
attempt_id (foreign key)
question_id (foreign key)
user_answer (enum: 'a', 'b', 'c', 'd')
is_correct (boolean)
time_taken (integer, in seconds, optional)


---

## COMMUNITY GAMES DATABASE

### GAME_TYPES Table (NEW - Defines available game types)

game_type_id (primary key)
name (string, unique) - e.g., "Mafia", "Werewolf", "Among Us"
description (string)
default_roles (json array) - e.g., ["Mafia", "Villager", "Doctor", "Sheriff"]
created_at (timestamp)


### GAME_ROLES Table (NEW - Defines point values per role per game type)

game_role_id (primary key)
game_type_id (foreign key)
role_name (string) - e.g., "Mafia", "Villager", "Doctor"
role_description (string, optional)
winner_points (integer) - points if winning this role
loser_points (integer) - points if losing with this role
order (integer, for display order)
created_at (timestamp)


### GAME_SESSIONS Table (NEW - Individual game instances)

game_session_id (primary key)
game_type_id (foreign key)
lorde_id (foreign key to users)
title (string)
description (string, optional)
scheduled_date (date)
scheduled_time (time)
location (string) - physical location/camp name
max_participants (integer)
status (enum: 'Waiting', 'In Progress', 'Completed', 'Cancelled')
started_at (timestamp, nullable)
ended_at (timestamp, nullable)
created_at (timestamp)
updated_at (timestamp)


### GAME_PARTICIPANTS Table (NEW - Students participating in games)

game_participant_id (primary key)
game_session_id (foreign key)
user_id (foreign key)
assigned_role (string) - the role assigned to this student
signed_up_at (timestamp)
role_assigned_at (timestamp, nullable)
cancelled_at (timestamp, nullable)


### GAME_RESULTS Table (NEW - Final results and points)

game_result_id (primary key)
game_session_id (foreign key)
user_id (foreign key)
assigned_role (string)
is_winner (boolean)
points_earned (integer) - based on role_based points
recorded_at (timestamp)


### LEADERBOARDS (Calculated Views - Not stored tables)

**Education Leaderboard (calculated from ATTEMPTS)**

rank (calculated)
user_id
name
total_quiz_points (sum of all quiz scores)
total_quizzes_attempted
average_quiz_score
last_quiz_date


**Community Games Leaderboard (calculated from GAME_RESULTS)**

rank (calculated)
user_id
name
total_game_points (sum of all game points)
total_games_played
total_game_wins
win_rate_percentage
favorite_game_type (most played)
favorite_role (most played)
last_game_date


---

## How Data Flows

### Education System Flow

1. **Student takes quiz:**
   - Entry created in ATTEMPTS table
   - Each answer stored in ATTEMPT_ANSWERS table
   - Timer recorded in ATTEMPT_ANSWERS

2. **Score is calculated:**
   - Compare user_answer with correct_answer in QUESTIONS table
   - Count correct answers
   - Calculate percentage: (correct / total_questions) * 100
   - Store score in ATTEMPTS table

3. **Education Leaderboard is updated:**
   - Query ATTEMPTS table for all users
   - For each user, calculate:
     - total_quiz_points = SUM(score) from all ATTEMPTS
     - total_quizzes_attempted = COUNT(attempt_id)
     - average_quiz_score = total_quiz_points / total_quizzes_attempted
   - Sort by total_quiz_points (highest first)
   - Assign ranks (1st, 2nd, 3rd, etc.)

---

### Community Games System Flow

1. **Lorde creates game session:**
   - Entry created in GAME_SESSIONS table
   - status = "Waiting" or "Scheduled"
   - Game is published and visible to students

2. **Students sign up:**
   - Entry created in GAME_PARTICIPANTS table for each student
   - signed_up_at = current timestamp
   - assigned_role = NULL (not assigned yet)

3. **Lorde starts game:**
   - GAME_SESSIONS status changed to "In Progress"
   - started_at = current timestamp
   - System performs role assignment:
     - Get all roles from GAME_ROLES for this game type
     - Shuffle roles randomly
     - Get all participants from GAME_PARTICIPANTS for this session
     - Assign one role to each participant
     - Update GAME_PARTICIPANTS.assigned_role
     - Update GAME_PARTICIPANTS.role_assigned_at
   - Send notifications to all students with their role

4. **Physical game happens:**
   - Lorde manages the game (off-system)
   - Students play with assigned roles
   - System does not track individual actions

5. **Lorde ends game:**
   - GAME_SESSIONS status changed to "Completed"
   - ended_at = current timestamp

6. **Lorde records results:**
   - For each participant, lorde inputs: Won/Lost
   - System creates entries in GAME_RESULTS table:
     - Get participant's assigned_role from GAME_PARTICIPANTS
     - Get winner_points or loser_points from GAME_ROLES
     - Calculate points_earned
     - Create GAME_RESULTS entry with points_earned
     - is_winner = true or false based on input

7. **Community Games Leaderboard is updated:**
   - Query GAME_RESULTS for all users
   - For each user, calculate:
     - total_game_points = SUM(points_earned) from all GAME_RESULTS
     - total_games_played = COUNT(game_result_id)
     - total_game_wins = COUNT(is_winner = true)
     - win_rate_percentage = (total_game_wins / total_games_played) * 100
     - favorite_game_type = game type played most
     - favorite_role = role played most
   - Sort by total_game_points (highest first)
   - Assign ranks (1st, 2nd, 3rd, etc.)

---

## Example: Role-Based Points System

### Game Type: Mafia

**GAME_ROLES table entries:**
game_role_id	game_type_id	role_name	role_description	winner_points	loser_points
1	1	Mafia	Kill villagers	150	20
2	1	Villager	Protect village from mafia	100	10
3	1	Doctor	Save villagers each night	120	25
4	1	Sheriff	Investigate players	120	25

**Example game result:**
- 10 students participate
- Roles assigned: 2 Mafia, 6 Villagers, 1 Doctor, 1 Sheriff
- **Mafia team wins**
- Points awarded:
  - Player A (Mafia, Won): 150 points
  - Player B (Mafia, Won): 150 points
  - Player C (Villager, Lost): 10 points
  - Player D (Villager, Lost): 10 points
  - Player E (Villager, Lost): 10 points
  - Player F (Villager, Lost): 10 points
  - Player G (Villager, Lost): 10 points
  - Player H (Villager, Lost): 10 points
  - Player I (Doctor, Lost): 25 points
  - Player J (Sheriff, Lost): 25 points

Total points distributed: 150+150+10+10+10+10+10+10+25+25 = 410 points

---

## Key Design Decisions

### 1. Leaderboard Calculation
- **Decision:** Recalculate on every submission (real-time)
- **Why:** Students see immediate updates, motivates participation
- **How:** Query relevant table, sort by points, assign ranks

### 2. Role Assignment
- **Decision:** Random, automatic when game starts
- **Why:** Fair, unpredictable, prevents collusion
- **How:** Shuffle all available roles, assign one to each participant

### 3. Separate Leaderboards
- **Decision:** Education and Community Games leaderboards are separate
- **Why:** Different skills, different activities, clear separation
- **How:** Two different calculation queries, two different pages

### 4. Role-Based Points
- **Decision:** Different roles give different point values
- **Why:** Reflects role difficulty and importance
- **How:** Defined in GAME_ROLES table, used in calculation

### 5. Quiz Organization
- **Decision:** Quizzes organized by Course first, then Category
- **Why:** Better for academic/college organization
- **How:** Course_id and category_id in QUIZZES table

### 6. Lorde Management
- **Decision:** Only admin can create/demote lordes
- **Why:** Prevents spam, maintains quality
- **How:** Admin-only endpoints

---

## Technology Stack (To Be Finalized in Phase 2)

### Frontend Options
- **React** - Most popular, large community, good for real-time updates
- **Vue** - Easier to learn, lighter weight, rapid development
- **Angular** - Full-featured, enterprise-grade, TypeScript native

**Recommendation:** React

### Backend Options
- **Node.js + Express** - JavaScript throughout, fast development
- **Python + Django** - Excellent ORM, rapid development
- **Java + Spring Boot** - Enterprise-grade, highly scalable

**Recommendation:** Node.js + Express

### Database
- **PostgreSQL** - Powerful, complex queries, JSONB support
- **MySQL** - Simpler, widely supported

**Recommendation:** PostgreSQL

### Authentication & Security
- **JWT** - For stateless authentication
- **Bcrypt** - For password hashing
- **HTTPS** - For secure communication

### Additional
- **WebSockets** - For real-time notifications (future)
- **Redis** - For caching leaderboards (optional, for performance)
- **Docker** - For containerization and deployment

---

## Security Considerations

✅ Passwords hashed with bcrypt (never plain text)
✅ SQL injection prevention (parameterized queries)
✅ CSRF token protection
✅ Input validation and sanitization
✅ Rate limiting on API endpoints
✅ HTTPS for all communications
✅ JWT token expiration
✅ Role-based access control:
   - Students cannot access admin endpoints
   - Students cannot access lorde endpoints
   - Lordes can only manage their own games
✅ Game results permanent (cannot be modified)
✅ Password reset via secure email link
✅ Session timeout on inactivity

---

## Performance Targets

- Page load time: < 3 seconds
- Quiz submission: < 2 seconds response time
- Game sign-up: < 1 second
- Leaderboard updates: < 1 second
- Support 1,000 concurrent users
- Leaderboard query time: < 500ms
- Database query optimization for large datasets

---

## Example: Student Takes a Quiz

**Step 1-2: Student arrives at quiz page**
- Frontend displays quiz info
- Student clicks "Start Quiz"

**Step 3: Quiz begins**
- Timer starts counting down from time_limit
- Questions loaded from QUESTIONS table

**Step 4: Student answers questions**
- For each question:
  - Student selects A, B, C, or D
  - Answer stored in browser state

**Step 5: Student submits**
- Clicks "Submit"
- Confirmation dialog: "Are you sure?"
- Clicks "Confirm"

**Step 6-10: Backend processes**
1. Create ATTEMPTS entry
2. For each question/answer:
   - Create ATTEMPT_ANSWERS entry
   - Store user_answer and time_taken
3. Calculate score:
   - Compare each user_answer with correct_answer
   - Count correct answers
   - Calculate percentage
4. Update ATTEMPTS with score
5. Query ATTEMPTS for all users, recalculate leaderboard

**Step 11-12: Frontend displays results**
- Results page shows:
  - Score: "8/10"
  - Percentage: "80%"
  - Answer review
- Updated leaderboard displays with new ranking

---

## Example: Lorde Records Game Results

**Step 1: Game has ended**
- Lorde clicks "End Game" on platform
- Status changed to "Completed"

**Step 2-3: Lorde records results**
- Clicks "Record Results"
- Form appears with all 10 participants and their assigned roles
- For each participant, selects: Won/Lost

**Step 4-6: Backend processes**
1. For each participant:
   - Get assigned_role from GAME_PARTICIPANTS
   - Get winner_points or loser_points from GAME_ROLES
   - Create GAME_RESULTS entry

Example:
- Player A (Mafia, Won): winner_points = 150
- Player B (Villager, Lost): loser_points = 10

2. Confirmation required
3. Results saved permanently

**Step 7-10: Leaderboard updates**
1. Query GAME_RESULTS for all users
2. Recalculate totals
3. Re-sort and re-rank
4. Students see updated leaderboard

---

## API Endpoints (Preview - Detailed in Phase 2)

### Student Endpoints (Education)

POST /auth/register
POST /auth/login
GET /courses
GET /courses/:id/quizzes
GET /quizzes/:id
POST /attempts (start quiz)
PUT /attempts/:id (submit quiz)
GET /attempts/:id/results
GET /education-leaderboard


### Student Endpoints (Community Games)

GET /games/upcoming
GET /games/:id
POST /games/:id/signup
DELETE /games/:id/signup
GET /games/:id/results
GET /my-games
GET /my-game-stats
GET /community-games-leaderboard


### Lorde Endpoints

POST /auth/login (lorde)
GET /lorde/dashboard
POST /lorde/games
PUT /lorde/games/:id
GET /lorde/games/:id/participants
POST /lorde/games/:id/start
POST /lorde/games/:id/end
POST /lorde/games/:id/results
GET /lorde/stats


### Admin Endpoints (Education)

POST /admin/courses
PUT /admin/courses/:id
DELETE /admin/courses/:id
POST /admin/categories
PUT /admin/categories/:id
DELETE /admin/categories/:id
POST /admin/quizzes
PUT /admin/quizzes/:id
DELETE /admin/quizzes/:id
POST /admin/questions
PUT /admin/questions/:id
DELETE /admin/questions/:id
GET /admin/education-stats


### Admin Endpoints (Community Games)

GET /admin/games
PUT /admin/games/:id
DELETE /admin/games/:id
POST /admin/lordes
DELETE /admin/lordes/:id
GET /admin/game-stats


---

## Next Steps (Phase 2)

Phase 2 will include:
1. Detailed system architecture diagrams
2. Database schema with all relationships
3. Full API endpoint specifications
4. Technology stack finalization
5. Development environment setup
6. Repository structure and coding standards
7. Testing strategy
8. Deployment plan

Action:

Open docs/system-overview.md
Delete ALL old content
Paste this ENTIRE content
Save (Ctrl+S)
FILE 5: README.md (Root)
markdown
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

