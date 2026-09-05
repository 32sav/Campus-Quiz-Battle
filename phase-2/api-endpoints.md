# Campus Quiz Battle — API Endpoints Specification

## API Overview

**Base URL:** `http://localhost:8080/api` (Development)
**Protocol:** HTTP/HTTPS (HTTPS in production)
**Format:** JSON
**Authentication:** JWT Bearer Token
**CORS:** Enabled for localhost:3000 (development)

---

## Authentication

### 1. Register Student

**Endpoint:** `POST /auth/register`

**Description:** Create a new student account

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "userId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Email already exists",
  "errorCode": "EMAIL_EXISTS"
}
```

**Validation:**
- Email must be valid format
- Password must be at least 8 characters
- Name must be non-empty
- Email must be unique

---

### 2. Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "user": {
      "userId": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "STUDENT"
    }
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Invalid email or password",
  "errorCode": "INVALID_CREDENTIALS"
}
```

**Header Setup (for subsequent requests):**

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


---

### 3. Refresh Token

**Endpoint:** `POST /auth/refresh-token`

**Description:** Get a new JWT token before expiration

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Invalid refresh token",
  "errorCode": "INVALID_TOKEN"
}
```

---

### 4. Logout

**Endpoint:** `POST /auth/logout`

**Description:** Invalidate current session

**Headers Required:**

Authorization: Bearer {token}


**Request:**
```json
{}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## EDUCATION - Quiz System

### 5. Get All Courses

**Endpoint:** `GET /courses`

**Description:** Get list of all available courses

**Headers Required:**

Authorization: Bearer {token}


**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Results per page (default: 20)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "courseId": 1,
      "name": "Biology 101",
      "description": "Introduction to Biology",
      "quizCount": 5,
      "createdAt": "2024-01-10T10:00:00Z"
    },
    {
      "courseId": 2,
      "name": "Chemistry 101",
      "description": "Introduction to Chemistry",
      "quizCount": 3,
      "createdAt": "2024-01-11T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 20,
    "totalElements": 2,
    "totalPages": 1
  }
}
```

---

### 6. Get Quizzes by Course

**Endpoint:** `GET /courses/{courseId}/quizzes`

**Description:** Get all quizzes for a specific course

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `courseId`: ID of the course

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "quizId": 10,
      "title": "Biology Basics",
      "description": "Test your knowledge of basic biology",
      "timeLimit": 30,
      "questionCount": 10,
      "category": "Biology",
      "bestScore": 95,
      "bestAttemptDate": "2024-01-15T14:30:00Z",
      "attemptCount": 3
    }
  ]
}
```

---

### 7. Get Quiz Details

**Endpoint:** `GET /quizzes/{quizId}`

**Description:** Get quiz details (but NOT questions - those come when starting)

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `quizId`: ID of the quiz

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "quizId": 10,
    "title": "Biology Basics",
    "description": "Test your knowledge",
    "courseId": 1,
    "category": "Biology",
    "timeLimit": 30,
    "questionCount": 10,
    "createdAt": "2024-01-10T10:00:00Z"
  }
}
```

---

### 8. Start Quiz (Create Attempt)

**Endpoint:** `POST /attempts`

**Description:** Start a quiz and receive questions

**Headers Required:**

Authorization: Bearer {token}


**Request:**
```json
{
  "quizId": 10
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "attemptId": 100,
    "quizId": 10,
    "timeLimit": 30,
    "startedAt": "2024-01-20T10:00:00Z",
    "questions": [
      {
        "questionId": 1,
        "questionText": "What is the basic unit of life?",
        "options": {
          "a": "Atom",
          "b": "Cell",
          "c": "Molecule",
          "d": "Organism"
        }
      },
      {
        "questionId": 2,
        "questionText": "What is photosynthesis?",
        "options": {
          "a": "Process of making food",
          "b": "Process of breathing",
          "c": "Process of digestion",
          "d": "Process of reproduction"
        }
      }
    ]
  }
}
```

**Note:** Correct answers are NOT returned to frontend

---

### 9. Submit Quiz

**Endpoint:** `PUT /attempts/{attemptId}`

**Description:** Submit quiz answers and get results

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `attemptId`: ID of the attempt

**Request:**
```json
{
  "answers": {
    "1": "b",
    "2": "a"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "attemptId": 100,
    "quizId": 10,
    "score": 2,
    "totalQuestions": 10,
    "percentage": 20.0,
    "submittedAt": "2024-01-20T10:30:00Z",
    "results": [
      {
        "questionId": 1,
        "questionText": "What is the basic unit of life?",
        "userAnswer": "b",
        "correctAnswer": "b",
        "isCorrect": true
      },
      {
        "questionId": 2,
        "questionText": "What is photosynthesis?",
        "userAnswer": "a",
        "correctAnswer": "a",
        "isCorrect": true
      }
    ],
    "newLeaderboardRank": 5
  }
}
```

---

### 10. Get Quiz Results

**Endpoint:** `GET /attempts/{attemptId}/results`

**Description:** Get details of a previous quiz attempt

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `attemptId`: ID of the attempt

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "attemptId": 100,
    "quizId": 10,
    "quizTitle": "Biology Basics",
    "score": 2,
    "totalQuestions": 10,
    "percentage": 20.0,
    "submittedAt": "2024-01-20T10:30:00Z",
    "results": [
      {
        "questionId": 1,
        "questionText": "What is the basic unit of life?",
        "userAnswer": "b",
        "correctAnswer": "b",
        "isCorrect": true
      }
    ]
  }
}
```

---

### 11. Get Student Quiz History

**Endpoint:** `GET /my-quiz-attempts`

**Description:** Get all quiz attempts by current student

**Headers Required:**

Authorization: Bearer {token}


**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Results per page (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "attemptId": 100,
      "quizId": 10,
      "quizTitle": "Biology Basics",
      "score": 8,
      "totalQuestions": 10,
      "percentage": 80.0,
      "submittedAt": "2024-01-20T10:30:00Z"
    },
    {
      "attemptId": 101,
      "quizId": 10,
      "quizTitle": "Biology Basics",
      "score": 9,
      "totalQuestions": 10,
      "percentage": 90.0,
      "submittedAt": "2024-01-21T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 10,
    "totalElements": 2,
    "totalPages": 1
  }
}
```

---

## EDUCATION - Leaderboard

### 12. Get Education Leaderboard

**Endpoint:** `GET /leaderboard/education`

**Description:** Get global education leaderboard (quiz points)

**Headers Required:**

Authorization: Bearer {token}


**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Results per page (default: 50)
- `courseId` (optional): Filter by course

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "userId": 5,
      "name": "Alice Smith",
      "totalPoints": 450,
      "totalAttempts": 10,
      "avgPercentage": 90.0,
      "lastAttemptDate": "2024-01-20T14:30:00Z",
      "isCurrentUser": false
    },
    {
      "rank": 2,
      "userId": 1,
      "name": "John Doe",
      "totalPoints": 420,
      "totalAttempts": 9,
      "avgPercentage": 85.0,
      "lastAttemptDate": "2024-01-20T10:30:00Z",
      "isCurrentUser": true
    }
  ],
  "currentUserRank": 2,
  "pagination": {
    "page": 0,
    "size": 50,
    "totalElements": 100,
    "totalPages": 2
  }
}
```

---

## COMMUNITY GAMES

### 13. Get Upcoming Games

**Endpoint:** `GET /games/upcoming`

**Description:** Get list of upcoming community games

**Headers Required:**

Authorization: Bearer {token}


**Query Parameters:**
- `gameType` (optional): Filter by game type (Mafia, Werewolf, etc.)
- `page` (optional): Page number (default: 0)
- `size` (optional): Results per page (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "gameSessionId": 1,
      "gameType": "Mafia",
      "title": "Campus Mafia Night",
      "description": "Join us for an exciting Mafia game!",
      "scheduledDate": "2024-02-15",
      "scheduledTime": "19:00",
      "location": "Student Center",
      "maxParticipants": 20,
      "currentParticipants": 12,
      "availableSlots": 8,
      "lordeName": "Game Master",
      "isUserSignedUp": false,
      "rolesAvailable": ["Mafia", "Villager", "Doctor", "Sheriff"]
    },
    {
      "gameSessionId": 2,
      "gameType": "Werewolf",
      "title": "Werewolf Tournament",
      "description": "Competitive werewolf game",
      "scheduledDate": "2024-02-16",
      "scheduledTime": "18:00",
      "location": "Camp A",
      "maxParticipants": 15,
      "currentParticipants": 15,
      "availableSlots": 0,
      "lordeName": "Tournament Organizer",
      "isUserSignedUp": false,
      "rolesAvailable": ["Werewolf", "Human", "Seer"]
    }
  ],
  "pagination": {
    "page": 0,
    "size": 10,
    "totalElements": 2,
    "totalPages": 1
  }
}
```

---

### 14. Get Game Details

**Endpoint:** `GET /games/{gameSessionId}`

**Description:** Get detailed information about a game

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `gameSessionId`: ID of the game session

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "gameSessionId": 1,
    "gameType": "Mafia",
    "title": "Campus Mafia Night",
    "description": "Join us for an exciting Mafia game!",
    "scheduledDate": "2024-02-15",
    "scheduledTime": "19:00",
    "location": "Student Center",
    "maxParticipants": 20,
    "currentParticipants": 12,
    "lordeName": "Game Master",
    "lordeEmail": "gamemaster@campus.edu",
    "status": "WAITING",
    "roles": [
      {
        "roleName": "Mafia",
        "description": "Kill villagers at night",
        "winnerPoints": 150,
        "loserPoints": 20
      },
      {
        "roleName": "Villager",
        "description": "Protect village from mafia",
        "winnerPoints": 100,
        "loserPoints": 10
      },
      {
        "roleName": "Doctor",
        "description": "Save villagers each night",
        "winnerPoints": 120,
        "loserPoints": 25
      },
      {
        "roleName": "Sheriff",
        "description": "Investigate players",
        "winnerPoints": 120,
        "loserPoints": 25
      }
    ],
    "participants": [
      {
        "participantId": 1,
        "userName": "Alice Smith",
        "signedUpAt": "2024-01-20T10:00:00Z"
      }
    ],
    "isUserSignedUp": false,
    "canSignUp": true
  }
}
```

---

### 15. Sign Up for Game

**Endpoint:** `POST /games/{gameSessionId}/signup`

**Description:** Student signs up for a community game

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `gameSessionId`: ID of the game session

**Request:**
```json
{}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully signed up for the game",
  "data": {
    "gameSessionId": 1,
    "participantId": 100,
    "status": "SIGNED_UP",
    "currentParticipants": 13,
    "availableSlots": 7
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "No available slots for this game",
  "errorCode": "NO_SLOTS_AVAILABLE"
}
```

---

### 16. Cancel Game Sign-Up

**Endpoint:** `DELETE /games/{gameSessionId}/signup`

**Description:** Cancel sign-up for a game (before game starts)

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `gameSessionId`: ID of the game session

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully cancelled sign-up",
  "data": {
    "gameSessionId": 1,
    "currentParticipants": 12,
    "availableSlots": 8
  }
}
```

---

### 17. Get Game Results

**Endpoint:** `GET /games/{gameSessionId}/results`

**Description:** Get results of a completed game

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `gameSessionId`: ID of the game session

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "gameSessionId": 1,
    "gameType": "Mafia",
    "title": "Campus Mafia Night",
    "scheduledDate": "2024-02-15",
    "scheduledTime": "19:00",
    "location": "Student Center",
    "status": "COMPLETED",
    "completedAt": "2024-02-15T20:30:00Z",
    "results": [
      {
        "userId": 1,
        "userName": "John Doe",
        "assignedRole": "Mafia",
        "isWinner": true,
        "pointsEarned": 150,
        "isCurrentUser": true
      },
      {
        "userId": 2,
        "userName": "Jane Smith",
        "assignedRole": "Villager",
        "isWinner": false,
        "pointsEarned": 10,
        "isCurrentUser": false
      }
    ],
    "newLeaderboardRank": 5
  }
}
```

---

### 18. Get My Game History

**Endpoint:** `GET /my-games`

**Description:** Get all games student has participated in

**Headers Required:**

Authorization: Bearer {token}


**Query Parameters:**
- `status` (optional): Filter by status (COMPLETED, UPCOMING)
- `page` (optional): Page number (default: 0)
- `size` (optional): Results per page (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "gameSessionId": 1,
      "gameType": "Mafia",
      "title": "Campus Mafia Night",
      "scheduledDate": "2024-02-15",
      "location": "Student Center",
      "status": "COMPLETED",
      "assignedRole": "Mafia",
      "isWinner": true,
      "pointsEarned": 150,
      "completedAt": "2024-02-15T20:30:00Z"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1
  }
}
```

---

### 19. Get My Game Stats

**Endpoint:** `GET /my-game-stats`

**Description:** Get personal community games statistics

**Headers Required:**

Authorization: Bearer {token}


**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "totalGamesPlayed": 5,
    "totalWins": 3,
    "totalLosses": 2,
    "winRate": 60.0,
    "totalPoints": 520,
    "favoriteGameType": "Mafia",
    "favoriteRole": "Mafia",
    "lastGameDate": "2024-02-15T20:30:00Z",
    "roleStats": {
      "Mafia": {
        "played": 2,
        "wins": 2,
        "winRate": 100.0,
        "totalPoints": 300
      },
      "Villager": {
        "played": 2,
        "wins": 1,
        "winRate": 50.0,
        "totalPoints": 110
      },
      "Doctor": {
        "played": 1,
        "wins": 0,
        "winRate": 0.0,
        "totalPoints": 25
      }
    }
  }
}
```

---

## COMMUNITY GAMES - Leaderboard

### 20. Get Community Games Leaderboard

**Endpoint:** `GET /leaderboard/community`

**Description:** Get community games leaderboard (game points)

**Headers Required:**

Authorization: Bearer {token}


**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Results per page (default: 50)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "userId": 5,
      "name": "Alice Smith",
      "totalPoints": 520,
      "totalGames": 5,
      "totalWins": 3,
      "winRate": 60.0,
      "lastGameDate": "2024-02-15T20:30:00Z",
      "isCurrentUser": false
    },
    {
      "rank": 2,
      "userId": 1,
      "name": "John Doe",
      "totalPoints": 480,
      "totalGames": 4,
      "totalWins": 2,
      "winRate": 50.0,
      "lastGameDate": "2024-02-14T19:00:00Z",
      "isCurrentUser": true
    }
  ],
  "currentUserRank": 2,
  "pagination": {
    "page": 0,
    "size": 50,
    "totalElements": 50,
    "totalPages": 1
  }
}
```

---

### 21. Get Community Leaderboard by Game Type

**Endpoint:** `GET /leaderboard/community/by-game-type/{gameType}`

**Description:** Get leaderboard for specific game type

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `gameType`: Game type (Mafia, Werewolf, etc.)

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Results per page (default: 50)

**Response (200 OK):**
```json
{
  "success": true,
  "gameType": "Mafia",
  "data": [
    {
      "rank": 1,
      "userId": 5,
      "name": "Alice Smith",
      "totalPoints": 350,
      "gamesPlayed": 3,
      "wins": 3,
      "winRate": 100.0
    },
    {
      "rank": 2,
      "userId": 1,
      "name": "John Doe",
      "totalPoints": 320,
      "gamesPlayed": 2,
      "wins": 2,
      "winRate": 100.0
    }
  ],
  "currentUserRank": 2,
  "pagination": {
    "page": 0,
    "size": 50,
    "totalElements": 10,
    "totalPages": 1
  }
}
```

---

## LORDE - Game Management

### 22. Get Lorde Dashboard

**Endpoint:** `GET /lorde/dashboard`

**Description:** Get all games created by current lorde

**Headers Required:**

Authorization: Bearer {token}
Content-Type: application/json


**Query Parameters:**
- `status` (optional): Filter by status (WAITING, IN_PROGRESS, COMPLETED)
- `page` (optional): Page number (default: 0)
- `size` (optional): Results per page (default: 20)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "gameSessionId": 1,
      "gameType": "Mafia",
      "title": "Campus Mafia Night",
      "scheduledDate": "2024-02-15",
      "scheduledTime": "19:00",
      "location": "Student Center",
      "status": "COMPLETED",
      "maxParticipants": 20,
      "currentParticipants": 15,
      "completedAt": "2024-02-15T20:30:00Z"
    }
  ],
  "stats": {
    "totalGamesCreated": 10,
    "totalParticipants": 80,
    "avgParticipants": 8.0
  },
  "pagination": {
    "page": 0,
    "size": 20,
    "totalElements": 10,
    "totalPages": 1
  }
}
```

---

### 23. Create Game Session

**Endpoint:** `POST /lorde/games`

**Description:** Create a new community game session

**Headers Required:**

Authorization: Bearer {token}
Content-Type: application/json


**Request:**
```json
{
  "gameTypeId": 1,
  "title": "Campus Mafia Night",
  "description": "Join us for an exciting Mafia game!",
  "scheduledDate": "2024-02-15",
  "scheduledTime": "19:00",
  "location": "Student Center",
  "maxParticipants": 20
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Game session created successfully",
  "data": {
    "gameSessionId": 1,
    "gameType": "Mafia",
    "title": "Campus Mafia Night",
    "status": "WAITING",
    "scheduledDate": "2024-02-15",
    "scheduledTime": "19:00",
    "location": "Student Center",
    "maxParticipants": 20,
    "currentParticipants": 0,
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### 24. Start Game Session

**Endpoint:** `POST /lorde/games/{gameSessionId}/start`

**Description:** Start a game and randomly assign roles

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `gameSessionId`: ID of the game session

**Request:**
```json
{}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Game started successfully",
  "data": {
    "gameSessionId": 1,
    "status": "IN_PROGRESS",
    "startedAt": "2024-02-15T19:00:00Z",
    "roleAssignments": [
      {
        "participantId": 1,
        "userId": 10,
        "userName": "Alice Smith",
        "assignedRole": "Mafia"
      },
      {
        "participantId": 2,
        "userId": 11,
        "userName": "Bob Johnson",
        "assignedRole": "Villager"
      },
      {
        "participantId": 3,
        "userId": 12,
        "userName": "Carol White",
        "assignedRole": "Doctor"
      }
    ],
    "notificationSent": true
  }
}
```

---

### 25. End Game Session

**Endpoint:** `POST /lorde/games/{gameSessionId}/end`

**Description:** End a game session (before recording results)

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `gameSessionId`: ID of the game session

**Request:**
```json
{}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Game ended successfully",
  "data": {
    "gameSessionId": 1,
    "status": "COMPLETED",
    "endedAt": "2024-02-15T20:30:00Z",
    "participantCount": 15,
    "ready": "Ready to record results"
  }
}
```

---

### 26. Record Game Results

**Endpoint:** `POST /lorde/games/{gameSessionId}/results`

**Description:** Record final results and award points

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `gameSessionId`: ID of the game session

**Request:**
```json
{
  "results": [
    {
      "participantId": 1,
      "userId": 10,
      "isWinner": true
    },
    {
      "participantId": 2,
      "userId": 11,
      "isWinner": false
    },
    {
      "participantId": 3,
      "userId": 12,
      "isWinner": true
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Results recorded successfully",
  "data": {
    "gameSessionId": 1,
    "status": "COMPLETED",
    "recordedAt": "2024-02-15T20:35:00Z",
    "resultsDetails": [
      {
        "userId": 10,
        "userName": "Alice Smith",
        "assignedRole": "Mafia",
        "isWinner": true,
        "pointsEarned": 150
      },
      {
        "userId": 11,
        "userName": "Bob Johnson",
        "assignedRole": "Villager",
        "isWinner": false,
        "pointsEarned": 10
      },
      {
        "userId": 12,
        "userName": "Carol White",
        "assignedRole": "Doctor",
        "isWinner": true,
        "pointsEarned": 100
      }
    ],
    "leaderboardUpdated": true
  }
}
```

---

### 27. Get Lorde Stats

**Endpoint:** `GET /lorde/stats`

**Description:** Get statistics about lorde's games

**Headers Required:**

Authorization: Bearer {token}


**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "name": "Game Master",
    "totalGamesCreated": 10,
    "totalParticipants": 80,
    "avgParticipants": 8.0,
    "mostPopularGameType": "Mafia",
    "gamesInProgress": 1,
    "gamesCompleted": 9,
    "gamesGroupByType": {
      "Mafia": 6,
      "Werewolf": 3,
      "Among Us": 1
    },
    "participantStats": {
      "totalUnique": 45,
      "avgPerGame": 8.0,
      "maxPerGame": 20,
      "minPerGame": 3
    }
  }
}
```

---

## ADMIN - Management

### 28. Create Course (Admin)

**Endpoint:** `POST /admin/courses`

**Description:** Create a new course

**Headers Required:**

Authorization: Bearer {token}


**Request:**
```json
{
  "name": "Physics 201",
  "description": "Advanced Physics Course"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "courseId": 3,
    "name": "Physics 201",
    "description": "Advanced Physics Course",
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### 29. Create Quiz (Admin)

**Endpoint:** `POST /admin/quizzes`

**Description:** Create a new quiz

**Headers Required:**

Authorization: Bearer {token}


**Request:**
```json
{
  "title": "Physics Fundamentals",
  "description": "Test your physics knowledge",
  "courseId": 1,
  "categoryId": 5,
  "timeLimit": 45
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "quizId": 15,
    "title": "Physics Fundamentals",
    "courseId": 1,
    "categoryId": 5,
    "timeLimit": 45,
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### 30. Add Question (Admin)

**Endpoint:** `POST /admin/quizzes/{quizId}/questions`

**Description:** Add a question to a quiz

**Headers Required:**

Authorization: Bearer {token}


**Path Parameters:**
- `quizId`: ID of the quiz

**Request:**
```json
{
  "questionText": "What is the SI unit of force?",
  "optionA": "Joule",
  "optionB": "Newton",
  "optionC": "Watt",
  "optionD": "Pascal",
  "correctAnswer": "b",
  "order": 1
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "questionId": 50,
    "quizId": 15,
    "questionText": "What is the SI unit of force?",
    "correctAnswer": "b",
    "order": 1,
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### 31. Promote Student to Lorde

**Endpoint:** `POST /admin/lordes`

**Description:** Promote a student to lorde role

**Headers Required:**

Authorization: Bearer {token}


**Request:**
```json
{
  "userId": 1
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User promoted to Lorde successfully",
  "data": {
    "userId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "LORDE",
    "promotedAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### 32. Get Admin Statistics

**Endpoint:** `GET /admin/stats`

**Description:** Get overall platform statistics

**Headers Required:**

Authorization: Bearer {token}


**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "education": {
      "totalStudents": 150,
      "totalCourses": 5,
      "totalQuizzes": 25,
      "totalAttempts": 500,
      "avgQuizScore": 75.5
    },
    "communityGames": {
      "totalLordes": 10,
      "totalGamesCreated": 50,
      "totalGameParticipations": 400,
      "avgParticipantsPerGame": 8.0,
      "mostPopularGameType": "Mafia"
    },
    "platform": {
      "totalUsers": 160,
      "totalAdmins": 2,
      "registeredThisMonth": 30
    }
  }
}
```

---

## Error Responses

### Standard Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "errorCode": "ERROR_CODE",
  "timestamp": "2024-01-20T10:00:00Z",
  "path": "/api/endpoint"
}
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry (email exists) |
| 500 | Server Error | Internal server error |

### Common Error Codes

INVALID_CREDENTIALS - Login failed
EMAIL_EXISTS - Email already registered
INVALID_TOKEN - Token expired or invalid
QUIZ_NOT_FOUND - Quiz doesn't exist
GAME_NOT_FOUND - Game doesn't exist
NO_SLOTS_AVAILABLE - Game is full
INSUFFICIENT_PERMISSIONS - User doesn't have access
VALIDATION_ERROR - Input validation failed
INTERNAL_ERROR - Server error occurred


---

## Rate Limiting

All endpoints are subject to rate limiting:
- **General limit:** 100 requests per minute
- **Login limit:** 10 requests per minute
- **Admin endpoints:** 50 requests per minute

Rate limit headers in response:

X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1234567890


---

## CORS Configuration

**Development (localhost:3000):**

Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true


**Production:**

Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 3600


---

## API Versioning

Current API version: **v1**

All endpoints follow pattern: `/api/v1/...`

For future compatibility:
- v2 endpoints: `/api/v2/...`
- Deprecation warnings in response headers
- 12-month support window for each version

---

## Summary

**Total Endpoints:** 32

**By Category:**
- Authentication: 4
- Education: 8
- Community Games: 8
- Leaderboards: 3
- Lorde: 6
- Admin: 5

**Security:**
- All endpoints require JWT token (except /auth/register, /auth/login)
- Role-based access control on sensitive endpoints
- Rate limiting enabled
- CORS configured

**This API enables the React frontend to:**
- Authenticate users
- Take quizzes and get results
- Participate in community games
- View leaderboards
- Manage games (Lorde)
- Manage platform (Admin)
