# Campus Quiz Battle — Project Structure & Coding Standards

## Root Repository Structure

campus-quiz-battle/
├── backend/ # Spring Boot backend
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/com/campusquizbattle/
│ │ │ │ ├── CampusQuizBattleApplication.java
│ │ │ │ ├── config/ # Configuration classes
│ │ │ │ ├── controller/ # REST endpoints
│ │ │ │ ├── service/ # Business logic
│ │ │ │ ├── model/ # JPA entities
│ │ │ │ ├── repository/ # Data access
│ │ │ │ ├── security/ # JWT, authentication
│ │ │ │ ├── dto/ # Data transfer objects
│ │ │ │ ├── exception/ # Custom exceptions
│ │ │ │ └── util/ # Utility classes
│ │ │ └── resources/
│ │ │ ├── application.properties
│ │ │ ├── application-dev.properties
│ │ │ ├── application-prod.properties
│ │ │ └── db/migration/ # SQL migration scripts
│ │ └── test/
│ │ ├── java/com/campusquizbattle/
│ │ │ ├── controller/
│ │ │ ├── service/
│ │ │ └── repository/
│ │ └── resources/
│ ├── pom.xml
│ ├── .gitignore
│ └── README.md
│
├── frontend/ # React frontend
│ ├── public/
│ │ ├── index.html
│ │ └── favicon.ico
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ │ ├── Auth/
│ │ │ │ ├── LoginForm.js
│ │ │ │ ├── RegisterForm.js
│ │ │ │ └── ProtectedRoute.js
│ │ │ ├── Quiz/
│ │ │ │ ├── QuizList.js
│ │ │ │ ├── QuizTaker.js
│ │ │ │ └── QuizResults.js
│ │ │ ├── Games/
│ │ │ │ ├── GameList.js
│ │ │ │ ├── GameDetails.js
│ │ │ │ ├── GameSignUp.js
│ │ │ │ ├── GameResults.js
│ │ │ │ └── CreateGame.js
│ │ │ ├── Leaderboard/
│ │ │ │ ├── EducationLeaderboard.js
│ │ │ │ └── CommunityLeaderboard.js
│ │ │ ├── Admin/
│ │ │ │ ├── QuizManagement.js
│ │ │ │ ├── GameManagement.js
│ │ │ │ ├── UserManagement.js
│ │ │ │ └── AdminStats.js
│ │ │ └── Common/
│ │ │ ├── Header.js
│ │ │ ├── Navigation.js
│ │ │ ├── Sidebar.js
│ │ │ └── Footer.js
│ │ ├── pages/ # Full page components
│ │ │ ├── LoginPage.js
│ │ │ ├── RegisterPage.js
│ │ │ ├── StudentDashboard.js
│ │ │ ├── LordeDashboard.js
│ │ │ └── AdminDashboard.js
│ │ ├── services/ # API services
│ │ │ ├── authService.js
│ │ │ ├── quizService.js
│ │ │ ├── gameService.js
│ │ │ ├── leaderboardService.js
│ │ │ ├── userService.js
│ │ │ └── adminService.js
│ │ ├── store/ # Redux store
│ │ │ ├── authSlice.js
│ │ │ ├── quizSlice.js
│ │ │ ├── gameSlice.js
│ │ │ ├── leaderboardSlice.js
│ │ │ └── store.js
│ │ ├── hooks/ # Custom hooks
│ │ │ ├── useAuth.js
│ │ │ ├── useFetch.js
│ │ │ └── useLocalStorage.js
│ │ ├── utils/ # Utility functions
│ │ │ ├── constants.js
│ │ │ ├── validators.js
│ │ │ ├── formatters.js
│ │ │ └── axios-config.js
│ │ ├── styles/ # Global styles
│ │ │ ├── App.css
│ │ │ ├── index.css
│ │ │ └── variables.css
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ ├── .env
│ ├── .gitignore
│ └── README.md
│
├── docs/ # Phase 1 documentation
│ ├── project-vision.md
│ ├── requirements.md
│ ├── user-stories.md
│ └── system-overview.md
│
├── phase-2/ # Phase 2 documentation
│ ├── tech-stack.md
│ ├── architecture.md
│ ├── database-schema.md
│ ├── api-endpoints.md
│ ├── development-setup.md
│ └── project-structure.md
│
├── README.md # Root README
├── LICENSE # MIT License
└── .gitignore


---

## Backend Folder Structure Details

### `/backend/src/main/java/com/campusquizbattle/`

#### `config/` - Configuration Classes
````java
SecurityConfig.java          // Spring Security configuration
JwtConfig.java              // JWT token configuration
CorsConfig.java             // CORS configuration
SwaggerConfig.java          // Swagger/OpenAPI configuration
DatabaseConfig.java         // Database connection pool config
````

#### `controller/` - REST API Endpoints
````java
AuthController.java         // /api/auth/* endpoints
QuizController.java         // /api/quizzes/* endpoints
GameController.java         // /api/games/* endpoints
LeaderboardController.java   // /api/leaderboard/* endpoints
LordeController.java        // /api/lorde/* endpoints
AdminController.java        // /api/admin/* endpoints
UserController.java         // /api/users/* endpoints
````

#### `service/` - Business Logic Layer
````java
AuthService.java            // Authentication & registration logic
QuizService.java            // Quiz management logic
QuestionService.java        // Question management logic
AttemptService.java         // Quiz attempt handling
GameService.java            // Game management logic
LeaderboardService.java     // Leaderboard calculations
ScoringService.java         // Scoring calculations
UserService.java            // User management
LordeService.java           // Lorde-specific logic
````

#### `model/` - JPA Entity Classes
````java
User.java                   // User entity
Course.java                 // Course entity
Category.java               // Category entity
Quiz.java                   // Quiz entity
Question.java               // Question entity
Attempt.java                // Quiz attempt entity
AttemptAnswer.java          // Individual answer entity
GameType.java               // Game type entity
GameRole.java               // Game role entity
GameSession.java            // Game session entity
GameParticipant.java        // Game participant entity
GameResult.java             // Game result entity
````

#### `repository/` - Data Access Layer
````java
UserRepository.java         // extends JpaRepository<User, Long>
CourseRepository.java
CategoryRepository.java
QuizRepository.java
QuestionRepository.java
AttemptRepository.java
AttemptAnswerRepository.java
GameSessionRepository.java
GameParticipantRepository.java
GameResultRepository.java
LeaderboardRepository.java  // Custom queries for leaderboards
````

#### `security/` - Authentication & JWT
````java
JwtTokenProvider.java       // JWT token generation/validation
JwtAuthenticationFilter.java // JWT filter for requests
SecurityUserDetails.java    // UserDetails implementation
SecurityExceptionHandler.java// Handle auth exceptions
````

#### `dto/` - Data Transfer Objects
````java
// Request DTOs
LoginRequest.java
RegisterRequest.java
QuizStartRequest.java
QuizSubmitRequest.java
GameCreateRequest.java
GameResultsRequest.java

// Response DTOs
LoginResponse.java
UserResponse.java
QuizResponse.java
AttemptResponse.java
GameResponse.java
LeaderboardResponse.java
````

#### `exception/` - Custom Exceptions
````java
ResourceNotFoundException.java
UnauthorizedException.java
ForbiddenException.java
ValidationException.java
QuizException.java
GameException.java
DuplicateEmailException.java
InsufficientPermissionException.java
````

#### `util/` - Utility Classes
````java
JwtUtil.java                // JWT helper methods
DateUtil.java               // Date/time utilities
ValidationUtil.java         // Validation helpers
PointsCalculator.java       // Points calculation logic
RandomRoleAssigner.java      // Random role assignment
````

---

## Frontend Folder Structure Details

### `/frontend/src/components/`

#### `Auth/`
````javascript
LoginForm.js               // Login form component
RegisterForm.js            // Registration form component
ProtectedRoute.js          // Protected route wrapper
PrivateRoute.js            // Private route wrapper
LogoutButton.js            // Logout button
````

#### `Quiz/`
````javascript
QuizList.js               // List of available quizzes
QuizCard.js               // Individual quiz card
QuizTaker.js              // Quiz taking interface
QuizQuestion.js           // Single question display
QuizTimer.js              // Countdown timer
QuizResults.js            // Results display page
QuizHistory.js            // Previous attempts list
````

#### `Games/`
````javascript
GameList.js               // List upcoming games
GameCard.js               // Individual game card
GameDetails.js            // Game details modal
GameSignUp.js             // Game sign-up dialog
GameResults.js            // Game results display
CreateGame.js             // Create game form (Lorde)
RecordResults.js          // Record results form (Lorde)
````

#### `Leaderboard/`
````javascript
EducationLeaderboard.js   // Quiz leaderboard
CommunityLeaderboard.js   // Games leaderboard
LeaderboardTable.js       // Reusable table component
````

#### `Admin/`
````javascript
QuizManagement.js         // Quiz CRUD
QuestionManagement.js     // Question CRUD
CourseManagement.js       // Course management
GameManagement.js         // Game management
UserManagement.js         // User management
AdminStats.js             // Statistics dashboard
LordeManagement.js        // Manage lordes
````

#### `Common/`
````javascript
Header.js                 // Header/navbar
Navigation.js             // Main navigation
Sidebar.js                // Sidebar menu
Footer.js                 // Footer
Modal.js                  // Reusable modal
Loading.js                // Loading spinner
ErrorAlert.js             // Error message
SuccessAlert.js           // Success message
````

### `/frontend/src/services/`

````javascript
authService.js            // Auth API calls
quizService.js            // Quiz API calls
gameService.js            // Game API calls
leaderboardService.js     // Leaderboard API calls
userService.js            // User API calls
adminService.js           // Admin API calls
````

### `/frontend/src/store/`

````javascript
store.js                  // Redux store configuration
authSlice.js              // Auth state & reducers
quizSlice.js              // Quiz state & reducers
gameSlice.js              // Game state & reducers
leaderboardSlice.js       // Leaderboard state & reducers
loadingSlice.js           // Loading state & reducers
````

---

## Naming Conventions

### Backend (Java)

**Classes:**
````java
// Controllers
UserController.java         // Noun + "Controller"
QuizController.java

// Services
UserService.java           // Noun + "Service"
QuizService.java

// Repositories
UserRepository.java        // Noun + "Repository"
QuizRepository.java

// DTOs
UserRequest.java          // Noun + "Request"
UserResponse.java         // Noun + "Response"

// Entities
User.java                 // Singular noun
Quiz.java
Question.java

// Exceptions
UserNotFoundException.java  // Noun + "Exception" or specific type
InvalidQuizException.java
````

**Methods:**
````java
// Getters/Setters
getUser()                 // get + Property
setEmail()                // set + Property

// Finders
findById()                // find + Criterion
findByEmail()
findAll()

// Actions
createUser()              // Action + Noun
updateQuiz()
deleteAttempt()
submitQuiz()

// Queries
countByStatus()           // count + Criterion
existsById()
````

**Variables:**
````java
String userName;          // camelCase
int attemptCount;
boolean isValid;
List<User> users;         // plural for collections
````

### Frontend (JavaScript/React)

**Components:**
````javascript
LoginForm.js              // PascalCase, descriptive names
QuizTaker.js
EducationLeaderboard.js
GameSignUp.js
````

**Files:**
````javascript
authService.js            // camelCase for services/utils
quizService.js
useAuth.js                // "use" prefix for custom hooks
useFetch.js
constants.js              // lowercase for utility files
validators.js
````

**Functions/Variables:**
````javascript
const handleSubmit = () => {}      // camelCase
const isLoading = false;           // is/has prefix for booleans
const fetchQuizzes = async () =>   // verb + noun
const userId = 123;
const quizzes = [];                // plural for arrays
````

**Constants:**
````javascript
const QUIZ_TIME_LIMIT = 30;        // UPPER_SNAKE_CASE
const API_BASE_URL = '...';
const MAX_QUESTIONS = 100;
````

---

## Coding Standards

### Backend (Java)

**Code Style:**
````java
// Use 4-space indentation
public class UserService {
    public User createUser(CreateUserRequest request) {
        // Method implementation
        return user;
    }
}

// Method length: max 50 lines
// Class length: max 300 lines
// Use @Slf4j for logging
@Slf4j
@Service
public class UserService {
    public void doSomething() {
        log.info("Doing something");
    }
}
````

**Comments:**
````java
// Brief comment on what, not how
private boolean validateEmail(String email) {
    // Check if email format is valid
    return email.matches(REGEX_EMAIL);
}

// Javadoc for public methods
/**
 * Create a new user account
 * 
 * @param request User registration data
 * @return Created user object
 * @throws DuplicateEmailException if email exists
 */
public User createUser(CreateUserRequest request) {
    // ...
}
````

**Error Handling:**
````java
// Use custom exceptions
public User getUserById(Long userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException("User not found"));
}

// Proper exception handling
@ExceptionHandler(UserNotFoundException.class)
public ResponseEntity<?> handleUserNotFound(UserNotFoundException e) {
    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse(e.getMessage(), 404));
}
````

### Frontend (JavaScript/React)

**Code Style:**
````javascript
// Use 2-space indentation
function LoginForm() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
}

// Max lines per file: 300
// Max function length: 50 lines
````

**Components:**
````javascript
// Functional components with hooks
function QuizList({ quizzes, onSelectQuiz }) {
  const [filtered, setFiltered] = useState([]);
  
  return (
    <div className="quiz-list">
      {/* Component JSX */}
    </div>
  );
}

// Props destructuring
function QuizCard({ quizId, title, timeLimit, onStart }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Time: {timeLimit} min</p>
      <button onClick={onStart}>Start</button>
    </div>
  );
}
````

**Comments:**
````javascript
// Explain why, not what
// Use ternary for simple conditions
const status = isComplete ? 'Done' : 'In Progress';

// Comment complex logic
// Shuffle array using Fisher-Yates algorithm
const shuffledRoles = roles
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);
````

**Error Handling:**
````javascript
// Use try-catch for async
async function fetchQuizzes() {
  try {
    const response = await quizService.getQuizzes();
    setQuizzes(response.data);
  } catch (error) {
    setError(error.message);
    showErrorAlert('Failed to load quizzes');
  }
}

// Proper error handling
const handleApiCall = async () => {
  try {
    const response = await API.post('/endpoint', data);
    if (response.success) {
      // Handle success
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    console.error('API Error:', error);
    // Show user-friendly error
  }
};
````

---

## Git Workflow

### Branch Naming

main # Production branch
├── develop # Development branch
│ ├── feature/quiz-timer
│ ├── feature/game-signup
│ ├── bugfix/leaderboard-calculation
│ ├── hotfix/login-error
│ └── docs/api-documentation


### Commit Messages

feat: Add quiz timer functionality
fix: Correct leaderboard ranking calculation
docs: Update API documentation
style: Format code with Prettier
refactor: Extract quiz logic to service
test: Add tests for scoring service
chore: Update dependencies


**Format:** `<type>: <description>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic change)
- `refactor`: Refactor code
- `test`: Add/update tests
- `chore`: Maintenance

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes with atomic commits
3. Push to GitHub
4. Create Pull Request with:
   - Description of changes
   - Related issue number
   - Screenshots (for UI changes)
5. Code review (at least 1 approval)
6. Merge to develop
7. Delete feature branch

### Merging to Production

````bash
# When ready for release
git checkout main
git pull origin main
git merge develop
git tag v1.0.0
git push origin main --tags
````

---

## Testing Structure

### Backend Tests

src/test/java/com/campusquizbattle/
├── controller/
│ ├── AuthControllerTest.java
│ ├── QuizControllerTest.java
│ └── GameControllerTest.java
├── service/
│ ├── QuizServiceTest.java
│ ├── ScoringServiceTest.java
│ └── LeaderboardServiceTest.java
└── repository/
├── UserRepositoryTest.java
└── QuizRepositoryTest.java


**Test Example:**
````java
@SpringBootTest
class QuizServiceTest {
    
    @MockBean
    private QuizRepository quizRepository;
    
    @InjectMocks
    private QuizService quizService;
    
    @Test
    void testGetQuizById() {
        // Given
        Long quizId = 1L;
        Quiz expectedQuiz = new Quiz();
        when(quizRepository.findById(quizId))
            .thenReturn(Optional.of(expectedQuiz));
        
        // When
        Quiz result = quizService.getQuizById(quizId);
        
        // Then
        assertEquals(expectedQuiz, result);
        verify(quizRepository).findById(quizId);
    }
}
````

### Frontend Tests

src/
├── components/
│ ├── Quiz/
│ │ └── QuizTaker.test.js
│ └── Games/
│ └── GameSignUp.test.js
├── services/
│ └── quizService.test.js
└── hooks/
└── useAuth.test.js


**Test Example:**
````javascript
import { render, screen } from '@testing-library/react';
import QuizList from '../QuizList';

describe('QuizList', () => {
  it('displays quiz list correctly', () => {
    const mockQuizzes = [
      { quizId: 1, title: 'Quiz 1' },
      { quizId: 2, title: 'Quiz 2' }
    ];
    
    render(<QuizList quizzes={mockQuizzes} />);
    
    expect(screen.getByText('Quiz 1')).toBeInTheDocument();
    expect(screen.getByText('Quiz 2')).toBeInTheDocument();
  });
});
````

---

## Documentation Standards

### Code Documentation

**Javadoc (Backend):**
````java
/**
 * Calculate student's final score for a quiz
 * 
 * Compares each answer against correct answers and returns
 * the total score and percentage.
 * 
 * @param attemptId ID of the quiz attempt
 * @param answers Map of question ID to user answer
 * @return ScoreResult containing score, total, and percentage
 * @throws QuizNotFoundException if quiz not found
 * @throws IllegalArgumentException if answer format is invalid
 * 
 * @see ScoreResult
 * @see QuizService#submitQuiz
 */
public ScoreResult calculateScore(Long attemptId, Map<Long, String> answers) {
    // Implementation
}
````

**JSDoc (Frontend):**
````javascript
/**
 * Fetch quiz questions from API
 * 
 * @async
 * @param {number} quizId - ID of the quiz
 * @returns {Promise<Question[]>} Array of quiz questions
 * @throws {Error} If API call fails
 * 
 * @example
 * const questions = await getQuizQuestions(123);
 */
async function getQuizQuestions(quizId) {
    // Implementation
}
````

### README Files

Each module should have a README:

**Backend README:**
````markdown
# Campus Quiz Battle Backend

## Overview
Spring Boot REST API for Campus Quiz Battle platform

## Quick Start
```bash
mvn spring-boot:run
```

## API Documentation
See `phase-2/api-endpoints.md`

## Testing
```bash
mvn test
```

## Architecture
See `phase-2/architecture.md`
````

**Frontend README:**
````markdown
# Campus Quiz Battle Frontend

## Overview
React web application for Campus Quiz Battle platform

## Quick Start
```bash
npm install
npm start
```

## Project Structure
See `phase-2/project-structure.md`

## Testing
```bash
npm test
```

## Deployment
```bash
npm run build
```
````

---

## Configuration Management

### Environment Variables

**Backend (application-dev.properties):**
````properties
# Development environment
spring.datasource.url=jdbc:postgresql://localhost:5432/campus_quiz_battle_dev
spring.jpa.hibernate.ddl-auto=create-drop
logging.level.com.campusquizbattle=DEBUG
app.jwt.secret=dev-secret-key-not-for-production
````

**Frontend (.env.development):**

REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development
REACT_APP_DEBUG=true


### Production Secrets

**DO NOT commit secrets to git!**

````bash
# Use environment variables
export DATABASE_URL="postgres://user:pass@host/db"
export JWT_SECRET="your-secret-key"
export API_KEY="your-api-key"

# Or use .env files (ignored by git)
# .env (in .gitignore)
DATABASE_URL=...
JWT_SECRET=...
````

---

## IDE Configurations

### IntelliJ Code Style

Create `.idea/codeStyles/Project.xml`:
````xml
<code_scheme name="Project" version="173">
  <JavaCodeStyleSettings>
    <option name="USE_SINGLE_CLASS_IMPORTS" value="true"/>
    <option name="SPACE_BEFORE_ARRAY_INITIALIZER_LBRACE" value="true"/>
  </JavaCodeStyleSettings>
  <codeStyleSettings language="java">
    <option name="INDENT_SIZE" value="4"/>
    <option name="TAB_SIZE" value="4"/>
  </codeStyleSettings>
</code_scheme>
````

### VS Code Settings

Create `.vscode/settings.json`:
````json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
````

---

## CI/CD Configuration

### GitHub Actions

`.github/workflows/backend-build.yml`:
````yaml
name: Backend Build
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v2
        with:
          java-version: '11'
      - run: cd backend && mvn clean package
````

`.github/workflows/frontend-build.yml`:
````yaml
name: Frontend Build
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: cd frontend && npm ci && npm run build
````

---

## Checklist for New Developer

- [ ] Clone repository
- [ ] Follow `development-setup.md` to set up environment
- [ ] Verify backend runs: `http://localhost:8080/api/swagger-ui.html`
- [ ] Verify frontend runs: `http://localhost:3000`
- [ ] Read `phase-2/architecture.md` to understand structure
- [ ] Review this document for coding standards
- [ ] Read relevant API documentation
- [ ] Create feature branch for first task
- [ ] Follow commit message conventions
- [ ] Write tests for your changes
- [ ] Submit Pull Request with description

---

## Performance Checklist

### Backend
- [ ] Database queries optimized with indexes
- [ ] No N+1 query problems
- [ ] Proper pagination implemented
- [ ] Caching used where appropriate
- [ ] Response times under 1 second
- [ ] Connection pool properly configured
- [ ] Load tests run successfully

### Frontend
- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Unused dependencies removed
- [ ] Build size < 500KB gzipped
- [ ] Page load time < 3 seconds
- [ ] Bundle analyzed with `npm run analyze`

---

## Security Checklist

- [ ] No secrets in code
- [ ] Environment variables used for config
- [ ] HTTPS enabled in production
- [ ] SQL injection prevention (parameterized queries)
- [ ] CORS properly configured
- [ ] JWT token expiration set
- [ ] Password hashing with bcrypt
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info
- [ ] Rate limiting enabled
- [ ] CSRF protection implemented

---

## Summary

**This project structure:**
✅ Follows industry best practices
✅ Supports team collaboration
✅ Enables easy navigation
✅ Facilitates testing and maintenance
✅ Scales as project grows

**Key principles:**
✅ Separation of concerns
✅ Single Responsibility Principle
✅ DRY (Don't Repeat Yourself)
✅ Clear naming conventions
✅ Comprehensive documentation
✅ Automated testing
✅ Continuous Integration
