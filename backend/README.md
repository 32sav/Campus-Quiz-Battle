# Campus Quiz Battle — Backend Service

Spring Boot REST API backend service for the **Campus Quiz Battle** application.

## Tech Stack
- **Language & Framework:** Java 11+, Spring Boot 2.7.8
- **Data Access:** Spring Data JPA / Hibernate
- **Database:** PostgreSQL 12+
- **Migrations:** Flyway (`src/main/resources/db/migration/`)
- **Security:** Spring Security + JWT (Stateless Bearer Tokens)
- **Build Tool:** Apache Maven

---

## Directory Structure

```
backend/
├── pom.xml
├── README.md
├── database/
│   └── schema.sql                               # Master blueprint PostgreSQL schema
└── src/
    └── main/
        ├── java/com/campusquizbattle/
        │   ├── CampusQuizBattleApplication.java # Spring Boot entry point & CORS
        │   ├── config/                          # Security & Web configurations
        │   ├── controller/                      # REST API controllers
        │   ├── dto/                             # Data Transfer Objects
        │   ├── exception/                       # Custom exceptions & global handler
        │   ├── model/                           # JPA entity classes
        │   ├── repository/                      # Spring Data JPA repositories
        │   ├── security/                        # JWT provider, filter & UserDetailsService
        │   └── service/                         # Business logic & badge evaluation
        └── resources/
            ├── application.properties           # Database, JPA, JWT, Flyway config
            └── db/migration/
                ├── V1__initial_schema.sql       # Baseline tables, views, and indexes
                └── V2__seed_initial_data.sql    # Seed data for game types, roles & badges
```

---

## Database Migrations (Flyway)
The backend manages schema evolution with Flyway.
- **`V1__initial_schema.sql`**: Creates all 14 core tables, constraints, foreign keys, indexes, and views.
- **`V2__seed_initial_data.sql`**: Seeds game types, roles, and initial badges (separated into **Academic** and **Community** tracks).

When running the application, Flyway checks the database and automatically applies pending migrations before Hibernate validates the entity mappings.

---

## Running Locally

### 1. Ensure PostgreSQL is Running
Create the database:
```sql
CREATE DATABASE campus_quiz_battle;
```

### 2. Configure Environment (Optional)
Defaults in `application.properties`:
- URL: `jdbc:postgresql://localhost:5432/campus_quiz_battle`
- User: `postgres`
- Password: `postgres`

### 3. Build & Run
```bash
mvn clean install
mvn spring-boot:run
```

---

## Key Endpoints

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
- **Quizzes**: `GET /api/quizzes`, `GET /api/quizzes/{id}`, `POST /api/quizzes/{id}/submit`
- **Games**: `GET /api/games/sessions`, `POST /api/games/sessions`, `POST /api/games/sessions/{id}/signup`, `POST /api/games/sessions/{id}/results`
- **Leaderboards & Badges**:
  - `GET /api/leaderboards/education`
  - `GET /api/leaderboards/community-games`
  - `GET /api/leaderboards/badges/academic` (Studies badge rank)
  - `GET /api/leaderboards/badges/community` (Gaming badge rank)
  - `GET /api/leaderboards/badges/me` (Student dual-rank summary)
