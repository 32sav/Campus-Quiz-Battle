# Campus Quiz Battle — Database Schema

## Database Overview

**Database Name:** `campus_quiz_battle`
**DBMS:** PostgreSQL 12+
**Character Set:** UTF-8
**Timezone:** UTC

---

## Table Definitions

### 1. USERS Table

Stores all user accounts (students, admins, lordes)

```sql
CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('STUDENT', 'ADMIN', 'LORDE')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | BIGSERIAL | PRIMARY KEY | Unique user identifier |
| name | VARCHAR(255) | NOT NULL | User's full name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Email address (login) |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| role | VARCHAR(50) | NOT NULL, CHECK | User role: STUDENT, ADMIN, LORDE |
| created_at | TIMESTAMP | NOT NULL | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

---

### 2. COURSES Table

Organizes quizzes by academic courses

```sql
CREATE TABLE courses (
  course_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_by BIGINT NOT NULL REFERENCES users(user_id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_courses_name ON courses(name);
CREATE INDEX idx_courses_created_by ON courses(created_by);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| course_id | BIGSERIAL | PRIMARY KEY | Unique course identifier |
| name | VARCHAR(255) | NOT NULL, UNIQUE | Course name (e.g., "Biology 101") |
| description | TEXT | NULLABLE | Course description |
| created_by | BIGINT | NOT NULL, FK | Admin who created the course |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

---

### 3. CATEGORIES Table

Quiz categories (topics/subjects)

```sql
CREATE TABLE categories (
  category_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_categories_name ON categories(name);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| category_id | BIGSERIAL | PRIMARY KEY | Unique category identifier |
| name | VARCHAR(255) | NOT NULL, UNIQUE | Category name (e.g., "Biology") |
| description | TEXT | NULLABLE | Category description |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

---

### 4. QUIZZES Table

Individual quiz definitions

```sql
CREATE TABLE quizzes (
  quiz_id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  course_id BIGINT NOT NULL REFERENCES courses(course_id),
  category_id BIGINT NOT NULL REFERENCES categories(category_id),
  time_limit INTEGER NOT NULL, -- in minutes
  created_by BIGINT NOT NULL REFERENCES users(user_id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_quizzes_course_id ON quizzes(course_id);
CREATE INDEX idx_quizzes_category_id ON quizzes(category_id);
CREATE INDEX idx_quizzes_created_by ON quizzes(created_by);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| quiz_id | BIGSERIAL | PRIMARY KEY | Unique quiz identifier |
| title | VARCHAR(255) | NOT NULL | Quiz title |
| description | TEXT | NULLABLE | Quiz description |
| course_id | BIGINT | NOT NULL, FK | Associated course |
| category_id | BIGINT | NOT NULL, FK | Associated category |
| time_limit | INTEGER | NOT NULL | Time limit in minutes |
| created_by | BIGINT | NOT NULL, FK | Admin who created quiz |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

---

### 5. QUESTIONS Table

Multiple-choice questions for quizzes

```sql
CREATE TABLE questions (
  question_id BIGSERIAL PRIMARY KEY,
  quiz_id BIGINT NOT NULL REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer VARCHAR(1) NOT NULL CHECK (correct_answer IN ('a', 'b', 'c', 'd')),
  question_order INTEGER NOT NULL, -- Order in quiz
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX idx_questions_order ON questions(quiz_id, question_order);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| question_id | BIGSERIAL | PRIMARY KEY | Unique question identifier |
| quiz_id | BIGINT | NOT NULL, FK | Associated quiz |
| question_text | TEXT | NOT NULL | The question text |
| option_a | VARCHAR(255) | NOT NULL | Option A text |
| option_b | VARCHAR(255) | NOT NULL | Option B text |
| option_c | VARCHAR(255) | NOT NULL | Option C text |
| option_d | VARCHAR(255) | NOT NULL | Option D text |
| correct_answer | VARCHAR(1) | NOT NULL, CHECK | Correct answer: a, b, c, or d |
| question_order | INTEGER | NOT NULL | Question sequence in quiz |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

---

### 6. ATTEMPTS Table

Quiz attempt records (student quiz results)

```sql
CREATE TABLE attempts (
  attempt_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(user_id),
  quiz_id BIGINT NOT NULL REFERENCES quizzes(quiz_id),
  score INTEGER NOT NULL, -- Number of correct answers
  total_questions INTEGER NOT NULL, -- Total questions in quiz
  percentage DECIMAL(5, 2) NOT NULL, -- Percentage score (0-100)
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_attempt_user FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_attempt_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);

-- Indexes
CREATE INDEX idx_attempts_user_id ON attempts(user_id);
CREATE INDEX idx_attempts_quiz_id ON attempts(quiz_id);
CREATE INDEX idx_attempts_submitted_at ON attempts(submitted_at);
CREATE INDEX idx_attempts_user_quiz ON attempts(user_id, quiz_id);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| attempt_id | BIGSERIAL | PRIMARY KEY | Unique attempt identifier |
| user_id | BIGINT | NOT NULL, FK | Student who took quiz |
| quiz_id | BIGINT | NOT NULL, FK | Quiz that was taken |
| score | INTEGER | NOT NULL | Number of correct answers |
| total_questions | INTEGER | NOT NULL | Total questions in quiz |
| percentage | DECIMAL(5,2) | NOT NULL | Percentage: 0-100 |
| started_at | TIMESTAMP | NOT NULL | When student started |
| completed_at | TIMESTAMP | NULLABLE | When student completed |
| submitted_at | TIMESTAMP | NOT NULL | When student submitted |

---

### 7. ATTEMPT_ANSWERS Table

Detailed answers for each quiz attempt

```sql
CREATE TABLE attempt_answers (
  answer_id BIGSERIAL PRIMARY KEY,
  attempt_id BIGINT NOT NULL REFERENCES attempts(attempt_id) ON DELETE CASCADE,
  question_id BIGINT NOT NULL REFERENCES questions(question_id),
  user_answer VARCHAR(1) NOT NULL CHECK (user_answer IN ('a', 'b', 'c', 'd')),
  is_correct BOOLEAN NOT NULL,
  time_taken INTEGER, -- in seconds (optional)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_attempt_answers_attempt_id ON attempt_answers(attempt_id);
CREATE INDEX idx_attempt_answers_question_id ON attempt_answers(question_id);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| answer_id | BIGSERIAL | PRIMARY KEY | Unique answer identifier |
| attempt_id | BIGINT | NOT NULL, FK | Associated attempt |
| question_id | BIGINT | NOT NULL, FK | Associated question |
| user_answer | VARCHAR(1) | NOT NULL, CHECK | Student's answer: a, b, c, d |
| is_correct | BOOLEAN | NOT NULL | Whether answer was correct |
| time_taken | INTEGER | NULLABLE | Seconds spent on question |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

---

## COMMUNITY GAMES TABLES

### 8. GAME_TYPES Table

Defines available game types

```sql
CREATE TABLE game_types (
  game_type_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE, -- e.g., "Mafia", "Werewolf"
  description TEXT,
  default_roles VARCHAR[], -- JSON array of role names
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_game_types_name ON game_types(name);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_type_id | BIGSERIAL | PRIMARY KEY | Unique game type identifier |
| name | VARCHAR(100) | NOT NULL, UNIQUE | Game name (Mafia, Werewolf, etc.) |
| description | TEXT | NULLABLE | Game description |
| default_roles | VARCHAR[] | NULLABLE | Array of available roles |
| is_active | BOOLEAN | NOT NULL | Whether game type is available |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

---

### 9. GAME_ROLES Table

Defines roles and point values for each game type

```sql
CREATE TABLE game_roles (
  game_role_id BIGSERIAL PRIMARY KEY,
  game_type_id BIGINT NOT NULL REFERENCES game_types(game_type_id),
  role_name VARCHAR(100) NOT NULL, -- e.g., "Mafia", "Villager"
  role_description TEXT,
  winner_points INTEGER NOT NULL, -- Points if this role wins
  loser_points INTEGER NOT NULL, -- Points if this role loses
  role_order INTEGER NOT NULL, -- Display order
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(game_type_id, role_name)
);

-- Indexes
CREATE INDEX idx_game_roles_game_type_id ON game_roles(game_type_id);
CREATE INDEX idx_game_roles_role_name ON game_roles(game_type_id, role_name);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_role_id | BIGSERIAL | PRIMARY KEY | Unique role identifier |
| game_type_id | BIGINT | NOT NULL, FK | Associated game type |
| role_name | VARCHAR(100) | NOT NULL | Role name (Mafia, Villager, etc.) |
| role_description | TEXT | NULLABLE | Role description |
| winner_points | INTEGER | NOT NULL | Points if role wins |
| loser_points | INTEGER | NOT NULL | Points if role loses |
| role_order | INTEGER | NOT NULL | Order for display |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

---

### 10. GAME_SESSIONS Table

Individual game session instances

```sql
CREATE TABLE game_sessions (
  game_session_id BIGSERIAL PRIMARY KEY,
  game_type_id BIGINT NOT NULL REFERENCES game_types(game_type_id),
  lorde_id BIGINT NOT NULL REFERENCES users(user_id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  location VARCHAR(255) NOT NULL, -- Physical location
  max_participants INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('WAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_game_sessions_game_type_id ON game_sessions(game_type_id);
CREATE INDEX idx_game_sessions_lorde_id ON game_sessions(lorde_id);
CREATE INDEX idx_game_sessions_status ON game_sessions(status);
CREATE INDEX idx_game_sessions_scheduled_date ON game_sessions(scheduled_date);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_session_id | BIGSERIAL | PRIMARY KEY | Unique game session identifier |
| game_type_id | BIGINT | NOT NULL, FK | Type of game (Mafia, Werewolf, etc.) |
| lorde_id | BIGINT | NOT NULL, FK | Lorde who created the game |
| title | VARCHAR(255) | NOT NULL | Game session name |
| description | TEXT | NULLABLE | Game description |
| scheduled_date | DATE | NOT NULL | Date of game |
| scheduled_time | TIME | NOT NULL | Time of game |
| location | VARCHAR(255) | NOT NULL | Physical location/camp name |
| max_participants | INTEGER | NOT NULL | Maximum number of players |
| status | VARCHAR(50) | NOT NULL, CHECK | WAITING, IN_PROGRESS, COMPLETED, CANCELLED |
| started_at | TIMESTAMP | NULLABLE | When game actually started |
| ended_at | TIMESTAMP | NULLABLE | When game ended |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

---

### 11. GAME_PARTICIPANTS Table

Students signed up for a game

```sql
CREATE TABLE game_participants (
  game_participant_id BIGSERIAL PRIMARY KEY,
  game_session_id BIGINT NOT NULL REFERENCES game_sessions(game_session_id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(user_id),
  assigned_role VARCHAR(100), -- Role assigned when game starts
  signed_up_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  role_assigned_at TIMESTAMP, -- When role was assigned
  cancelled_at TIMESTAMP, -- If student cancelled sign-up
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(game_session_id, user_id)
);

-- Indexes
CREATE INDEX idx_game_participants_game_session_id ON game_participants(game_session_id);
CREATE INDEX idx_game_participants_user_id ON game_participants(user_id);
CREATE INDEX idx_game_participants_assigned_role ON game_participants(assigned_role);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_participant_id | BIGSERIAL | PRIMARY KEY | Unique participant record |
| game_session_id | BIGINT | NOT NULL, FK | Associated game session |
| user_id | BIGINT | NOT NULL, FK | Student participating |
| assigned_role | VARCHAR(100) | NULLABLE | Role assigned by system |
| signed_up_at | TIMESTAMP | NOT NULL | When student signed up |
| role_assigned_at | TIMESTAMP | NULLABLE | When role was assigned |
| cancelled_at | TIMESTAMP | NULLABLE | If student cancelled |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

---

### 12. GAME_RESULTS Table

Final results and points for each participant

```sql
CREATE TABLE game_results (
  game_result_id BIGSERIAL PRIMARY KEY,
  game_session_id BIGINT NOT NULL REFERENCES game_sessions(game_session_id),
  user_id BIGINT NOT NULL REFERENCES users(user_id),
  assigned_role VARCHAR(100) NOT NULL,
  is_winner BOOLEAN NOT NULL,
  points_earned INTEGER NOT NULL, -- Role-based points
  recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(game_session_id, user_id)
);

-- Indexes
CREATE INDEX idx_game_results_game_session_id ON game_results(game_session_id);
CREATE INDEX idx_game_results_user_id ON game_results(user_id);
CREATE INDEX idx_game_results_is_winner ON game_results(is_winner);
CREATE INDEX idx_game_results_points_earned ON game_results(points_earned);
```

**Columns:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_result_id | BIGSERIAL | PRIMARY KEY | Unique result record |
| game_session_id | BIGINT | NOT NULL, FK | Associated game session |
| user_id | BIGINT | NOT NULL, FK | Student result |
| assigned_role | VARCHAR(100) | NOT NULL | Role they played |
| is_winner | BOOLEAN | NOT NULL | True if they won |
| points_earned | INTEGER | NOT NULL | Points from role + result |
| recorded_at | TIMESTAMP | NOT NULL | When result was recorded |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

---

## LEADERBOARD VIEWS

### Education Leaderboard View

```sql
CREATE VIEW education_leaderboard AS
SELECT 
  ROW_NUMBER() OVER (ORDER BY total_points DESC) as rank,
  u.user_id,
  u.name,
  u.email,
  COALESCE(SUM(a.score), 0) as total_points,
  COALESCE(COUNT(a.attempt_id), 0) as total_attempts,
  COALESCE(AVG(a.percentage), 0) as avg_percentage,
  MAX(a.submitted_at) as last_attempt_date
FROM users u
LEFT JOIN attempts a ON u.user_id = a.user_id
WHERE u.role = 'STUDENT'
GROUP BY u.user_id, u.name, u.email
ORDER BY total_points DESC;
```

---

### Community Games Leaderboard View

```sql
CREATE VIEW community_games_leaderboard AS
SELECT 
  ROW_NUMBER() OVER (ORDER BY total_points DESC) as rank,
  u.user_id,
  u.name,
  u.email,
  COALESCE(SUM(gr.points_earned), 0) as total_points,
  COALESCE(COUNT(gr.game_result_id), 0) as total_games,
  COALESCE(SUM(CASE WHEN gr.is_winner THEN 1 ELSE 0 END), 0) as total_wins,
  COALESCE(
    ROUND(
      100.0 * SUM(CASE WHEN gr.is_winner THEN 1 ELSE 0 END) / 
      NULLIF(COUNT(gr.game_result_id), 0),
      2
    ),
    0
  ) as win_rate_percentage,
  MAX(gr.recorded_at) as last_game_date
FROM users u
LEFT JOIN game_results gr ON u.user_id = gr.user_id
WHERE u.role = 'STUDENT'
GROUP BY u.user_id, u.name, u.email
ORDER BY total_points DESC;
```

---

### Community Games Leaderboard by Game Type View

```sql
CREATE VIEW community_leaderboard_by_game_type AS
SELECT 
  ROW_NUMBER() OVER (PARTITION BY gt.name ORDER BY SUM(gr.points_earned) DESC) as rank,
  gt.name as game_type,
  u.user_id,
  u.name,
  COALESCE(SUM(gr.points_earned), 0) as total_points,
  COALESCE(COUNT(gr.game_result_id), 0) as games_played,
  COALESCE(SUM(CASE WHEN gr.is_winner THEN 1 ELSE 0 END), 0) as wins
FROM users u
LEFT JOIN game_results gr ON u.user_id = gr.user_id
LEFT JOIN game_sessions gs ON gr.game_session_id = gs.game_session_id
LEFT JOIN game_types gt ON gs.game_type_id = gt.game_type_id
WHERE u.role = 'STUDENT'
GROUP BY gt.name, u.user_id, u.name
ORDER BY gt.name, total_points DESC;
```

---

## Database Relationships Diagram

USERS (1)
├──> (1:N) COURSES (created_by)
├──> (1:N) QUIZZES (created_by)
├──> (1:N) ATTEMPTS (user_id)
├──> (1:N) GAME_SESSIONS (lorde_id)
└──> (1:N) GAME_PARTICIPANTS (user_id)

COURSES (1)
└──> (1:N) QUIZZES (course_id)

CATEGORIES (1)
└──> (1:N) QUIZZES (category_id)

QUIZZES (1)
└──> (1:N) QUESTIONS (quiz_id)
└──> (1:N) ATTEMPTS (quiz_id)

QUESTIONS (1)
└──> (1:N) ATTEMPT_ANSWERS (question_id)

ATTEMPTS (1)
└──> (1:N) ATTEMPT_ANSWERS (attempt_id)

GAME_TYPES (1)
├──> (1:N) GAME_ROLES (game_type_id)
└──> (1:N) GAME_SESSIONS (game_type_id)

GAME_SESSIONS (1)
├──> (1:N) GAME_PARTICIPANTS (game_session_id)
└──> (1:N) GAME_RESULTS (game_session_id)

GAME_PARTICIPANTS (1)
└──> (N:1) GAME_RESULTS (game_session_id + user_id)


---

## Initial Data Setup

### Sample Game Types

```sql
INSERT INTO game_types (name, description, default_roles) VALUES
('Mafia', 'Village vs Mafia game', ARRAY['Mafia', 'Villager', 'Doctor', 'Sheriff']),
('Werewolf', 'Humans vs Werewolves game', ARRAY['Werewolf', 'Human', 'Seer']),
('Among Us', 'Crew vs Impostor game', ARRAY['Impostor', 'Crewmate']);
```

### Sample Game Roles (Mafia)

```sql
INSERT INTO game_roles (game_type_id, role_name, role_description, winner_points, loser_points, role_order) VALUES
(1, 'Mafia', 'Kill villagers', 150, 20, 1),
(1, 'Villager', 'Protect village', 100, 10, 2),
(1, 'Doctor', 'Save villagers', 120, 25, 3),
(1, 'Sheriff', 'Investigate players', 120, 25, 4);
```

---

## Performance Considerations

### Indexes Strategy

**High-Priority Indexes:**
- `users.email` (UNIQUE) - For login queries
- `users.role` - For filtering by role
- `attempts.user_id` - For getting user attempts
- `attempts.quiz_id` - For quiz statistics
- `game_results.user_id` - For leaderboard calculations
- `game_sessions.status` - For upcoming games query
- `game_sessions.scheduled_date` - For game scheduling

**Query Optimization:**
- Composite indexes for common JOIN conditions
- Indexes on foreign keys for JOIN performance
- Covering indexes for read-heavy queries

### Data Growth Projection

| Table | Records/Month | Estimated Size (1 year) |
|-------|---------------|------------------------|
| attempts | 5,000 | 60,000 |
| attempt_answers | 600,000 | 7.2M |
| game_results | 2,000 | 24,000 |
| game_sessions | 200 | 2,400 |

**Note:** Partition large tables (attempts, attempt_answers) if they exceed 10GB

---

## Backup & Recovery Strategy

### Backup Schedule
- Daily full backups (automated)
- Hourly transaction logs (PITR - Point In Time Recovery)
- Weekly backup verification
- Off-site backup storage

### Recovery Time Objective (RTO)
- Critical data: < 1 hour
- Non-critical data: < 4 hours

### Recovery Point Objective (RPO)
- Data loss acceptable: < 15 minutes

---

## Migration Strategy (from other systems)

If migrating from existing system:

```sql
-- Step 1: Migrate users
INSERT INTO users (name, email, password_hash, role) 
SELECT username, email, password_hash, 'STUDENT' FROM old_users;

-- Step 2: Migrate quiz data
INSERT INTO courses (name, created_by) 
SELECT course_name, admin_id FROM old_courses;

-- Step 3: Migrate attempts
INSERT INTO attempts (user_id, quiz_id, score, total_questions, percentage, submitted_at)
SELECT user_id, quiz_id, score, total_q, percentage, submitted_at FROM old_attempts;

-- Validate data integrity
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM quizzes;
SELECT COUNT(*) FROM attempts;
```

---

## Connection Pooling Configuration

```properties
# HikariCP settings (Spring Boot)
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=1200000
spring.datasource.hikari.auto-commit=true
```

---

## Summary

**Database Statistics:**
- **Tables:** 12 core + 3 views
- **Total Columns:** 80+
- **Relationships:** 15+ foreign keys
- **Indexes:** 20+ for performance
- **Views:** 3 leaderboard views

**Design Principles:**
✅ ACID compliance
✅ Normalization (3NF)
✅ Referential integrity
✅ Performance optimization
✅ Scalability for future growth

**This schema supports:**
- Fast quiz-taking experience
- Real-time leaderboard calculations
- Flexible game management
- Audit trails (created_at, updated_at)
- Data consistency and integrity
