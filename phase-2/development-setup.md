# Campus Quiz Battle — Development Setup Guide

## Prerequisites

Before starting development, ensure you have the following installed:

### Required Software

1. **Java Development Kit (JDK) 11+**
   - Download: https://www.oracle.com/java/technologies/downloads/
   - Verify: `java -version`
   - Expected output: `java version "11.0.x" or higher`

2. **Maven 3.6+**
   - Download: https://maven.apache.org/download.cgi
   - Verify: `mvn -version`
   - Expected output: `Apache Maven 3.6.x or higher`

3. **Node.js 14+ and npm**
   - Download: https://nodejs.org/
   - Verify: `node -v` and `npm -v`
   - Expected output: `v14.x.x or higher`

4. **PostgreSQL 12+**
   - Download: https://www.postgresql.org/download/
   - Verify: `psql --version`
   - Expected output: `psql (PostgreSQL) 12.x or higher`

5. **Git**
   - Download: https://git-scm.com/
   - Verify: `git --version`

### Optional But Recommended

- **IDE for Java:** IntelliJ IDEA (free Community Edition) or Eclipse
- **IDE for Frontend:** VS Code with React extensions
- **API Testing:** Postman or Insomnia (for testing REST endpoints)
- **Database GUI:** pgAdmin or DBeaver (for database management)

---

## Project Repository Setup

### Clone the Repository

```bash
git clone https://github.com/yourusername/campus-quiz-battle.git
cd campus-quiz-battle
```

### Project Structure

campus-quiz-battle/
├── backend/ # Spring Boot backend
│ ├── src/
│ ├── pom.xml
│ └── README.md
├── frontend/ # React frontend
│ ├── src/
│ ├── package.json
│ └── README.md
├── docs/ # Documentation (Phase 1)
├── phase-2/ # Architecture docs (Phase 2)
├── README.md
└── LICENSE


---

## Backend Setup (Spring Boot + Maven)

### Step 1: Create Spring Boot Project

Option A: Using Spring Boot CLI
```bash
spring boot new --from-starter spring-boot-web campus-quiz-battle-backend
cd campus-quiz-battle-backend
```

Option B: Using Maven
```bash
mvn archetype:generate \
  -DgroupId=com.campusquizbattle \
  -DartifactId=campus-quiz-battle-backend \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false

cd campus-quiz-battle-backend
```

### Step 2: Configure pom.xml

Update `pom.xml` with these dependencies:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.campusquizbattle</groupId>
    <artifactId>campus-quiz-battle-backend</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>Campus Quiz Battle Backend</name>
    <description>Backend API for Campus Quiz Battle</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.8</version>
        <relativePath/>
    </parent>

    <properties>
        <java.version>11</java.version>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- PostgreSQL Driver -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <version>42.5.1</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.11.5</version>
        </dependency>

        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Lombok (reduces boilerplate) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Swagger/OpenAPI -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-boot-starter</artifactId>
            <version>3.0.0</version>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### Step 3: Configure Application Properties

Create/update `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api
spring.application.name=campus-quiz-battle

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/campus_quiz_battle
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.jdbc.batch_size=10

# Connection Pool (HikariCP)
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000

# JWT Configuration
app.jwt.secret=your_secret_key_here_must_be_at_least_256_bits_long_for_security
app.jwt.expiration=86400000
app.jwt.refresh-token-expiration=604800000

# CORS Configuration
app.cors.allowed-origins=http://localhost:3000
app.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
app.cors.allow-credentials=true

# Logging
logging.level.root=INFO
logging.level.com.campusquizbattle=DEBUG
logging.file.name=logs/application.log
```

### Step 4: Create Main Application Class

Create `src/main/java/com/campusquizbattle/CampusQuizBattleApplication.java`:

```java
package com.campusquizbattle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CampusQuizBattleApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusQuizBattleApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

### Step 5: Build and Run Backend

```bash
# Install dependencies
mvn clean install

# Run development server
mvn spring-boot:run

# Or build JAR and run
mvn package
java -jar target/campus-quiz-battle-backend-1.0.0.jar
```

**Expected output:**

Started CampusQuizBattleApplication in X seconds
Server running on http://localhost:8080/api


---

## Database Setup (PostgreSQL)

### Step 1: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE campus_quiz_battle;

# Create user (optional, for security)
CREATE USER cqb_user WITH PASSWORD 'secure_password_123';
ALTER ROLE cqb_user SET client_encoding TO 'utf8';
ALTER ROLE cqb_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE cqb_user SET default_transaction_deferrable TO on;
ALTER ROLE cqb_user SET timezone TO 'UTC';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE campus_quiz_battle TO cqb_user;

# Exit
\q
```

### Step 2: Verify Database Connection

```bash
psql -U postgres -d campus_quiz_battle
```

**Expected output:** You should see the postgres prompt `postgres=#`

### Step 3: Run Database Migrations

(This will be done by Hibernate with `spring.jpa.hibernate.ddl-auto=update` or manually with SQL scripts)

---

## Frontend Setup (React)

### Step 1: Create React App

```bash
# Using Create React App
npx create-react-app campus-quiz-battle-frontend
cd campus-quiz-battle-frontend

# Or using Vite (faster)
npm create vite@latest campus-quiz-battle-frontend -- --template react
cd campus-quiz-battle-frontend
npm install
```

### Step 2: Install Dependencies

```bash
npm install
npm install axios react-router-dom redux react-redux @reduxjs/toolkit
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install --save-dev tailwindcss postcss autoprefixer
```

### Step 3: Create .env File

Create `.env` in frontend root:

REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development


### Step 4: Configure React Router

Create `src/App.js`:

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LordeDashboard from './pages/LordeDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/lorde" 
          element={
            <ProtectedRoute requiredRole="LORDE">
              <LordeDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
```

### Step 5: Create API Service

Create `src/services/authService.js`:

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const authService = {
  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => localStorage.getItem('token'),
  getUser: () => JSON.parse(localStorage.getItem('user'))
};

export default authService;
```

### Step 6: Run Frontend

```bash
npm start

# Frontend will run on http://localhost:3000
```

---

## Development Workflow

### Running Both Backend and Frontend

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Expected URLs:**
- Backend API: http://localhost:8080/api
- Frontend: http://localhost:3000
- Swagger API Docs: http://localhost:8080/api/swagger-ui.html

---

## Database Initialization

### Option 1: Using Hibernate (Automatic)

Set in `application.properties`:
```properties
spring.jpa.hibernate.ddl-auto=create
```

**Note:** This is dangerous in production. Use `update` or `validate` instead.

### Option 2: Using SQL Scripts (Recommended)

Create `src/main/resources/db/migration/V1__initial_schema.sql`:

```sql
-- Create all tables as defined in database-schema.md
-- This file will be versioned and version-controlled

CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('STUDENT', 'ADMIN', 'LORDE')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add more tables...
```

Then run migrations before starting the app.

---

## IDE Setup

### IntelliJ IDEA (Recommended for Java)

1. **Open Project**
   - File → Open → Select `backend` folder

2. **Configure JDK**
   - File → Project Structure → Project
   - Set JDK 11+

3. **Configure Maven**
   - File → Settings → Build, Execution, Deployment → Build Tools → Maven
   - Verify Maven home path

4. **Run Application**
   - Right-click on `CampusQuizBattleApplication.java`
   - Select Run

### VS Code (For Frontend)

1. **Install Extensions**
   - ES7+ React/Redux/React-Native snippets
   - Thunder Client (API testing)
   - Prettier (code formatter)

2. **Open Frontend Folder**
   - File → Open Folder → Select `frontend`

3. **Run Application**
   - Terminal → New Terminal
   - `npm start`

---

## Testing

### Backend Unit Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserControllerTest

# Run with coverage
mvn test jacoco:report
```

### Frontend Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test UserService.test.js

# Coverage report
npm test -- --coverage
```

---

## Debugging

### Backend Debugging

```bash
# Run with debug mode
mvn spring-boot:run -Dspring-boot.run.arguments="--debug"

# Or in IDE:
# - Set breakpoints
# - Right-click → Debug 'CampusQuizBattleApplication'
```

### Frontend Debugging

```bash
# Chrome DevTools (automatic with npm start)
# - Press F12 in browser
# - Sources tab to see code
# - Console tab for logs

# Or use debugger statement in code:
debugger; // Execution pauses here in DevTools
```

### Database Debugging

```bash
# Connect with psql
psql -U postgres -d campus_quiz_battle

# Common queries
SELECT * FROM users;
SELECT * FROM quizzes;
SELECT * FROM attempts;

# View schema
\dt  # Show tables
\d users  # Describe table
```

---

## Common Issues & Solutions

### Issue 1: Cannot connect to PostgreSQL

**Error:** `PSQLException: Connection refused`

**Solution:**
```bash
# Check if PostgreSQL is running
# Windows: Check Services
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Start PostgreSQL if not running
# Mac: brew services start postgresql
# Windows: Start PostgreSQL service
# Linux: sudo systemctl start postgresql
```

### Issue 2: Port 8080 already in use

**Error:** `Port 8080 already in use`

**Solution:**
```bash
# Find process using port
lsof -i :8080  # Mac/Linux
netstat -ano | findstr :8080  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port in application.properties
server.port=8081
```

### Issue 3: npm dependencies conflict

**Error:** `ERR! peer dep missing`

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Maven build fails

**Error:** `BUILD FAILURE`

**Solution:**
```bash
# Clean cache
mvn clean
mvn install

# Check Java version
java -version  # Should be 11+

# Update Maven
mvn -v
```

---

## Production Deployment Checklist

- [ ] Set `spring.jpa.hibernate.ddl-auto=validate` (don't auto-create)
- [ ] Use environment variables for secrets (JWT, database password)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS for production domain only
- [ ] Set up database backups
- [ ] Enable logging to file
- [ ] Run load tests
- [ ] Performance optimization
- [ ] Security audit
- [ ] Monitoring setup (metrics, alerts)

---

## Development Best Practices

### Backend
- Follow MVC pattern strictly
- Use DTOs for request/response
- Write unit tests for services
- Use @Transactional wisely
- Implement proper exception handling
- Log important events
- Use git branching strategy

### Frontend
- Use functional components with hooks
- Implement Redux for state management
- Use proper folder structure
- Write tests for components
- Optimize performance (lazy loading)
- Use environment variables for config
- Implement proper error handling

### Database
- Use migrations for schema changes
- Index frequently queried columns
- Monitor query performance
- Regular backups
- Test disaster recovery

---

## Continuous Integration (Optional)

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 11
        uses: actions/setup-java@v2
        with:
          java-version: '11'
      - name: Build with Maven
        run: cd backend && mvn clean package

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: cd frontend && npm install
      - name: Build
        run: cd frontend && npm run build
      - name: Run tests
        run: cd frontend && npm test
```

---

## Quick Reference Commands

### Backend
```bash
mvn clean install           # Build
mvn spring-boot:run        # Run dev server
mvn test                   # Run tests
mvn package                # Build JAR
```

### Frontend
```bash
npm install               # Install deps
npm start                 # Run dev server
npm test                  # Run tests
npm run build            # Build for production
npm run build && serve   # Preview production build
```

### Database
```bash
psql -U postgres -d campus_quiz_battle    # Connect
\dt                                        # List tables
\d users                                   # Describe table
SELECT * FROM users;                       # Query
```

---

## Next Steps

1. **Complete all setup steps above**
2. **Verify both backend and frontend run locally**
3. **Test API endpoints with Postman/Insomnia**
4. **Create first GitHub repositories**
5. **Begin Phase 3: Development**

---

## Getting Help

- Check error messages carefully
- Search GitHub Issues
- Consult official documentation:
  - Spring Boot: https://spring.io/projects/spring-boot
  - React: https://react.dev
  - PostgreSQL: https://www.postgresql.org/docs/
- Ask in project team channel

---

## Development Complete When:

✅ Backend runs on port 8080
✅ Frontend runs on port 3000
✅ React can call backend API
✅ Database connection working
✅ Can login and create account
✅ Can run tests successfully
