# Campus Quiz Battle — System Architecture

## High-Level Architecture Overview

┌─────────────────────────────────────────────────────────────────┐
│ CLIENT TIER │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ React Web Application (http://localhost:3000) │ │
│ │ ├── Student Dashboard │ │
│ │ ├── Lorde Dashboard │ │
│ │ ├── Admin Dashboard │ │
│ │ └── Leaderboards │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ↓ (HTTPS/REST) │
│ │
├─────────────────────────────────────────────────────────────────┤
│ API/APPLICATION TIER │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Spring Boot REST API (http://localhost:8080/api) │ │
│ │ ├── Authentication Controller (Login/Register) │ │
│ │ ├── Quiz Controller (Education) │ │
│ │ ├── Game Controller (Community Games) │ │
│ │ ├── Leaderboard Controller │ │
│ │ ├── Admin Controller │ │
│ │ └── User Controller │ │
│ │ │ │
│ │ ├── Authentication Service (JWT) │ │
│ │ ├── Quiz Service (Education Logic) │ │
│ │ ├── Game Service (Game Logic) │ │
│ │ ├── Leaderboard Service (Rankings) │ │
│ │ ├── Scoring Service (Points Calculation) │ │
│ │ └── User Service │ │
│ │ │ │
│ │ Security: Spring Security + JWT + bcrypt │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ↓ (JDBC/SQL) │
│ │
├─────────────────────────────────────────────────────────────────┤
│ DATA TIER │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ PostgreSQL Database (localhost:5432) │ │
│ │ ├── Education Tables │ │
│ │ │ ├── users, courses, categories, quizzes │ │
│ │ │ ├── questions, attempts, attempt_answers │ │
│ │ │ └── education_leaderboard (view) │ │
│ │ │ │ │
│ │ ├── Community Games Tables │ │
│ │ │ ├── game_types, game_roles │ │
│ │ │ ├── game_sessions, game_participants │ │
│ │ │ ├── game_results │ │
│ │ │ └── community_leaderboard (view) │ │
│ │ │ │ │
│ │ └── Indexes for Performance │ │
│ │ ├── user_email (unique) │ │
│ │ ├── leaderboard queries │ │
│ │ └── quiz/game lookups │ │
│ └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘


---

## Component Architecture

### Frontend (React)

#### Pages

App.js
├── LoginPage
│ ├── StudentLogin
│ ├── LordeLogin
│ └── AdminLogin
├── RegisterPage
│ └── StudentRegister
├── StudentDashboard
│ ├── EducationTab
│ │ ├── CourseList
│ │ ├── QuizList
│ │ ├── QuizTaker
│ │ ├── Results
│ │ └── EducationLeaderboard
│ └── CommunityGamesTab
│ ├── GamesList
│ ├── GameDetails
│ ├── GameSignUp
│ ├── GameResults
│ └── CommunityLeaderboard
├── LordeDashboard
│ ├── GamesList
│ ├── CreateGame
│ ├── GameManagement
│ ├── RecordResults
│ └── Statistics
└── AdminDashboard
├── EducationTab
│ ├── CourseManagement
│ ├── QuizManagement
│ └── QuestionManagement
└── CommunityGamesTab
├── GameManagement
├── LordeManagement
└── Statistics


#### Component Structure

src/
├── components/
│ ├── Auth/
│ │ ├── LoginForm.js
│ │ ├── RegisterForm.js
│ │ └── ProtectedRoute.js
│ ├── Quiz/
│ │ ├── QuizList.js
│ │ ├── QuizTaker.js
│ │ └── QuizResults.js
│ ├── Games/
│ │ ├── GameList.js
│ │ ├── GameSignUp.js
│ │ ├── GameResults.js
│ │ └── CreateGame.js
│ ├── Leaderboard/
│ │ ├── EducationLeaderboard.js
│ │ └── CommunityLeaderboard.js
│ ├── Admin/
│ │ ├── QuizManagement.js
│ │ ├── GameManagement.js
│ │ └── UserManagement.js
│ └── Common/
│ ├── Header.js
│ ├── Navigation.js
│ └── Footer.js
├── pages/
│ ├── StudentDashboard.js
│ ├── LordeDashboard.js
│ └── AdminDashboard.js
├── services/
│ ├── authService.js # Login/Register API calls
│ ├── quizService.js # Quiz API calls
│ ├── gameService.js # Game API calls
│ ├── leaderboardService.js
│ └── adminService.js
├── store/
│ ├── authSlice.js # Redux slices
│ ├── quizSlice.js
│ ├── gameSlice.js
│ └── store.js
├── App.js
└── index.js


---

### Backend (Spring Boot)

#### Controller Layer

controller/
├── AuthController
│ ├── POST /auth/register
│ ├── POST /auth/login
│ ├── POST /auth/refresh-token
│ └── POST /auth/logout
├── QuizController
│ ├── GET /quizzes
│ ├── GET /quizzes/{id}
│ ├── POST /attempts (start quiz)
│ ├── PUT /attempts/{id} (submit quiz)
│ └── GET /attempts/{id}/results
├── GameController
│ ├── GET /games/upcoming
│ ├── GET /games/{id}
│ ├── POST /games/{id}/signup
│ ├── DELETE /games/{id}/signup
│ └── GET /games/{id}/results
├── LordeController
│ ├── POST /lorde/games (create)
│ ├── PUT /lorde/games/{id}
│ ├── POST /lorde/games/{id}/start
│ ├── POST /lorde/games/{id}/end
│ ├── POST /lorde/games/{id}/results
│ └── GET /lorde/stats
├── LeaderboardController
│ ├── GET /leaderboard/education
│ ├── GET /leaderboard/community
│ └── GET /leaderboard/community/by-game-type/{type}
└── AdminController
├── POST /admin/courses
├── POST /admin/quizzes
├── POST /admin/questions
├── POST /admin/lordes
└── GET /admin/stats


#### Service Layer

service/
├── AuthService
│ ├── register(user)
│ ├── login(email, password)
│ ├── validateToken(token)
│ └── refreshToken(token)
├── QuizService
│ ├── getQuizzes()
│ ├── getQuizById(id)
│ ├── startQuiz(quizId, userId)
│ ├── submitQuiz(attemptId, answers)
│ └── calculateScore(answers, correctAnswers)
├── GameService
│ ├── createGame(gameData)
│ ├── getUpcomingGames()
│ ├── signUpStudent(gameId, studentId)
│ ├── startGame(gameId)
│ ├── assignRoles(gameId)
│ ├── endGame(gameId)
│ ├── recordResults(gameId, results)
│ └── calculateGamePoints(role, isWinner)
├── LeaderboardService
│ ├── calculateEducationLeaderboard()
│ ├── calculateCommunityLeaderboard()
│ ├── getUserRank(userId, leaderboardType)
│ └── getTopPlayers(limit, leaderboardType)
├── ScoringService
│ ├── calculateQuizScore(answers)
│ └── calculateGamePoints(role, isWinner)
└── UserService
├── getUserById(id)
├── updateUser(user)
├── promoteToLorde(userId)
└── demoteFromLorde(userId)


#### Model/Entity Layer

model/
├── User
│ ├── userId
│ ├── name
│ ├── email
│ ├── passwordHash
│ ├── role (STUDENT, ADMIN, LORDE)
│ └── timestamps
├── Course
├── Category
├── Quiz
├── Question
├── Attempt
├── AttemptAnswer
├── GameType
├── GameRole
├── GameSession
├── GameParticipant
└── GameResult


#### Repository Layer

repository/
├── UserRepository (JpaRepository<User, Long>)
├── QuizRepository
├── QuestionRepository
├── AttemptRepository
├── GameSessionRepository
├── GameParticipantRepository
├── GameResultRepository
└── LeaderboardRepository (custom queries)


---

## Data Flow Diagrams

### Quiz Taking Flow
Student clicks "Start Quiz"
↓
Frontend calls: POST /api/attempts
(body: {quizId: 123, userId: 456})
↓
Backend (QuizController):
Calls QuizService.startQuiz(quizId, userId)
Creates ATTEMPTS record in database
Returns attemptId and questions
↓
Frontend displays quiz with questions
↓
Student answers questions
↓
Student clicks "Submit"
↓
Frontend calls: PUT /api/attempts/789
(body: {answers: {q1: 'a', q2: 'b', ...}})
↓
Backend (QuizController):
Calls QuizService.submitQuiz(attemptId, answers)
Calls ScoringService.calculateQuizScore(answers)
Creates ATTEMPT_ANSWERS records
Updates ATTEMPTS with score
↓
Backend calls: LeaderboardService.calculateEducationLeaderboard()
Queries all ATTEMPTS
Calculates ranks
Updates leaderboard
↓
Backend returns results (score, percentage, correct/incorrect)
↓
Frontend displays results page
↓
Student sees updated ranking on leaderboard

### Community Game Flow
Lorde clicks "Create Game"
↓
Frontend calls: POST /api/lorde/games
(body: {gameType: 'Mafia', date: '2024-01-15', location: 'Camp A', ...})
↓
Backend (LordeController):
Calls GameService.createGame(gameData)
Creates GAME_SESSIONS record
Returns gameId
↓
Frontend displays game creation confirmation
↓
Students view game and click "Sign Up"
↓
Frontend calls: POST /api/games/123/signup
(body: {userId: 456})
↓
Backend (GameController):
Calls GameService.signUpStudent(gameId, studentId)
Creates GAME_PARTICIPANTS record
↓
Lorde clicks "Start Game" at scheduled time
↓
Frontend calls: POST /api/lorde/games/123/start
↓
Backend (LordeController):
Calls GameService.startGame(gameId)
Calls GameService.assignRoles(gameId)
For each participant:
Randomly select role from GAME_ROLES
Update GAME_PARTICIPANTS.assigned_role
Send notification to student
Update GAME_SESSIONS.status = "IN_PROGRESS"
↓
All students notified with their role assignment
↓
Physical game happens (off-system)
↓
Lorde clicks "End Game"
↓
Frontend calls: POST /api/lorde/games/123/end
↓
Backend updates GAME_SESSIONS.status = "COMPLETED"
↓
Lorde clicks "Record Results"
↓
Frontend displays participants with assigned roles
↓
Lorde selects winner/loser for each participant
↓
Frontend calls: POST /api/lorde/games/123/results
(body: {results: [{userId: 1, isWinner: true}, ...]})
↓
Backend (LordeController):
For each result:
Get assigned_role from GAME_PARTICIPANTS
Get winner_points/loser_points from GAME_ROLES
Calculate points_earned
Create GAME_RESULTS record
↓
Backend calls: LeaderboardService.calculateCommunityLeaderboard()
Queries all GAME_RESULTS
Calculates ranks
Updates leaderboard
↓
Backend returns results page data
↓
All students see game results and updated ranking

---

## API Communication Flow

### Request/Response Pattern

Frontend (React)
↓
HTTPS Request (JSON)
↓
Spring Boot Controller
↓
Spring Security (JWT validation)
↓
Service Layer (business logic)
↓
Repository Layer (database queries)
↓
PostgreSQL Database
↓
(Response flows back through same layers)
↓
HTTPS Response (JSON)
↓
React (update UI)


### Example Request/Response

REQUEST:
POST /api/quizzes/123/submit
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
"answers": {
"question1": "a",
"question2": "c",
"question3": "b"
}
}

RESPONSE (200 OK):
{
"attemptId": 789,
"score": 2,
"totalQuestions": 3,
"percentage": 66.67,
"results": [
{
"questionId": 1,
"userAnswer": "a",
"correctAnswer": "a",
"isCorrect": true
},
...
],
"leaderboardRank": 5,
"leaderboardPosition": "Top 10"
}


---

## Authentication & Security Flow
Student enters email/password
↓
Frontend calls: POST /api/auth/login
(body: {email, password})
↓
Backend (AuthController):
AuthService.login(email, password)
Find user by email in database
Compare password hash using bcrypt
↓
If valid:
Generate JWT token (expires in 24 hours)
Return token to frontend
↓
Frontend stores token in localStorage/sessionStorage
↓
For all subsequent requests:
Add token to Authorization header
Authorization: Bearer {token}
↓
Backend (Spring Security Filter):
Extract token from header
Validate token signature
Check expiration
Extract user info from token
Allow/deny request based on role
↓
If token expired:
Frontend calls: POST /api/auth/refresh-token
Backend returns new token
↓
Role-Based Access Control:
STUDENT can only access student endpoints
LORDE can only access lorde endpoints
ADMIN can access all endpoints

---

## Database Connection Architecture

React (Frontend)
↓ (Axios HTTP calls)
Spring Boot (REST API)
↓ (JDBC)
HikariCP Connection Pool
↓ (PostgreSQL Driver)
PostgreSQL Database
↓
Database Tables & Indexes


### Connection Pool Configuration

```properties
# HikariCP Settings (in application.properties)
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=1200000
```

---

## Error Handling Architecture

### Frontend Error Handling

```javascript
try {
  const response = await axios.post('/api/quizzes/submit', data);
  // Success: process response
} catch (error) {
  if (error.response.status === 401) {
    // Unauthorized: redirect to login
  } else if (error.response.status === 403) {
    // Forbidden: show permission error
  } else if (error.response.status === 400) {
    // Bad request: show validation errors
  } else {
    // Server error: show generic error message
  }
}
```

### Backend Error Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  
  @ExceptionHandler(QuizNotFoundException.class)
  public ResponseEntity<?> handleQuizNotFound() {
    return ResponseEntity
      .status(HttpStatus.NOT_FOUND)
      .body(new ErrorResponse("Quiz not found", 404));
  }
  
  @ExceptionHandler(UnauthorizedException.class)
  public ResponseEntity<?> handleUnauthorized() {
    return ResponseEntity
      .status(HttpStatus.UNAUTHORIZED)
      .body(new ErrorResponse("Unauthorized", 401));
  }
}
```

---

## Deployment Architecture (Future)

Production Environment:

┌──────────────────┐
│ CDN / CloudFront│
│ (Static Assets) │
└────────┬─────────┘
│
┌────────▼─────────┐
│ AWS S3 / Nginx │
│ (React Build) │
└────────┬─────────┘
│
┌────────▼──────────────┐
│ API Load Balancer │
│ (AWS ELB / ALB) │
└────────┬──────────────┘
│
┌────────▼──────────────────────────┐
│ Auto-Scaling Group │
│ (Multiple Spring Boot instances) │
└────────┬──────────────────────────┘
│
┌────────▼─────────────┐
│ RDS PostgreSQL │
│ (Managed Database) │
└──────────────────────┘


---

## Performance Optimization Strategies

### Frontend Optimization
- Code splitting (lazy loading components)
- Image optimization and compression
- Caching API responses (Redux store)
- Pagination for leaderboards
- Virtual scrolling for long lists

### Backend Optimization
- Database query optimization with indexes
- Caching leaderboard calculations (Redis - optional)
- Connection pooling (HikariCP)
- Pagination for API responses
- Async processing for heavy operations

### Database Optimization
- Indexes on frequently queried columns
  - user_id
  - quiz_id
  - game_session_id
  - email (unique)
- Partitioning for very large tables (attempts, game_results)
- Proper foreign key relationships
- Query optimization and monitoring

---

## Monitoring & Logging

### Backend Logging
```java
@Slf4j
@RestController
public class QuizController {
  
  @PostMapping("/api/attempts")
  public ResponseEntity<?> startQuiz(@RequestBody QuizRequest req) {
    log.info("Quiz started - quizId: {}, userId: {}", 
             req.getQuizId(), req.getUserId());
    try {
      // ... logic
    } catch (Exception e) {
      log.error("Error starting quiz", e);
    }
  }
}
```

### Monitoring Metrics
- API response times
- Database query performance
- Error rates
- User concurrent sessions
- Leaderboard calculation time
- Game session statistics

---

## Summary

**Three-Tier Architecture:**
1. **Presentation Tier** (React) - User interfaces
2. **Application Tier** (Spring Boot) - Business logic & REST APIs
3. **Data Tier** (PostgreSQL) - Database

**Security:**
- JWT authentication
- Role-based access control
- bcrypt password hashing
- CORS configuration

**Performance:**
- Connection pooling
- Database indexing
- API caching strategies
- Pagination

**This architecture supports the quick MVP timeline** while remaining scalable for Version 2 enhancements.