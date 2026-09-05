# Campus Quiz Battle — Technology Stack

## Final Technology Stack Decisions

### Frontend
- **Framework:** React 18+
- **Language:** JavaScript (or TypeScript for type safety)
- **State Management:** Redux or Context API
- **UI Library:** Material-UI or Bootstrap
- **HTTP Client:** Axios
- **Build Tool:** Create React App or Vite

### Backend
- **Runtime:** Java 11+
- **Framework:** Spring Boot 2.7+
- **Build Tool:** Maven or Gradle
- **Web Server:** Embedded Tomcat (in Spring Boot)

### Database
- **System:** PostgreSQL 12+
- **Connection Pool:** HikariCP (built into Spring Boot)
- **Migration Tool:** Liquibase or Flyway

### Authentication & Security
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **CORS:** Spring Security CORS configuration
- **HTTPS:** SSL/TLS certificates (production)

### Additional Tools
- **API Documentation:** Swagger/OpenAPI
- **Testing:** JUnit 5, Mockito (Backend), Jest (Frontend)
- **Logging:** SLF4J with Logback
- **Monitoring:** Spring Boot Actuator
- **Version Control:** Git + GitHub

---

## Why These Choices?

### Frontend: React
**Advantages:**
- ✅ Most popular React framework (large community)
- ✅ Great for interactive UIs (quizzes, leaderboards)
- ✅ Component-based architecture
- ✅ Large ecosystem of libraries
- ✅ Easy to learn and maintain
- ✅ Strong job market demand

**Disadvantages:**
- Only handles UI (need other libraries for state management)
- Slightly larger bundle size compared to Vue

**Perfect for:** Quick MVP with good developer experience

---

### Backend: Java + Spring Boot
**Advantages:**
- ✅ Enterprise-grade framework
- ✅ Highly scalable and performant
- ✅ Great ecosystem (Spring Data JPA for database)
- ✅ Excellent for REST APIs
- ✅ Built-in security features
- ✅ Mature and stable
- ✅ Good for team collaboration

**Disadvantages:**
- Steeper learning curve than Python
- More boilerplate code than Node.js
- Slower startup time (but not critical for web apps)

**Perfect for:** Scalable, maintainable backend with strong typing

---

### Database: PostgreSQL
**Advantages:**
- ✅ Powerful and feature-rich
- ✅ Excellent for complex queries (leaderboards)
- ✅ JSONB support for flexible data
- ✅ Strong transaction support
- ✅ Great performance for our use case
- ✅ Open-source and free
- ✅ Excellent for relational data (courses, quizzes, games)

**Disadvantages:**
- Slightly heavier than MySQL
- Requires more configuration
- More complex query language

**Perfect for:** Complex relational data with strong consistency requirements

---

## Development Environment Requirements

### What You Need to Install

#### 1. Java Development Kit (JDK)
- Download: https://www.oracle.com/java/technologies/downloads/
- Version: Java 11 or later
- Verify: `java -version`

#### 2. Maven (Build Tool)
- Download: https://maven.apache.org/download.cgi
- Version: 3.6.0 or later
- Verify: `mvn -version`

#### 3. PostgreSQL Database
- Download: https://www.postgresql.org/download/
- Version: 12 or later
- Create a new database for development

#### 4. Node.js & npm (for Frontend)
- Download: https://nodejs.org/
- Version: 14+ or 16+
- Verify: `node -v` and `npm -v`

#### 5. IDE/Editor
- **Option A:** IntelliJ IDEA (excellent for Java, free Community Edition)
- **Option B:** VS Code (lightweight, works for both)
- **Option C:** Eclipse (free, Java-focused)

#### 6. Git
- Download: https://git-scm.com/
- Version control for code

---

## Project Structure Overview

### Backend (Java + Spring Boot)

campus-quiz-battle-backend/
├── src/
│ ├── main/
│ │ ├── java/com/campusquizbattle/
│ │ │ ├── controller/ # REST API endpoints
│ │ │ ├── service/ # Business logic
│ │ │ ├── model/ # Database entities
│ │ │ ├── repository/ # Database access
│ │ │ ├── security/ # Authentication & JWT
│ │ │ └── CampusQuizBattleApplication.java # Main class
│ │ └── resources/
│ │ ├── application.properties # Configuration
│ │ └── db/migration/ # Database migrations
│ └── test/
│ └── java/ # Unit tests
├── pom.xml # Maven dependencies
└── README.md


### Frontend (React)

campus-quiz-battle-frontend/
├── public/
│ └── index.html
├── src/
│ ├── components/ # Reusable components
│ │ ├── Quiz/
│ │ ├── Leaderboard/
│ │ ├── Dashboard/
│ │ └── ...
│ ├── pages/ # Full pages
│ ├── services/ # API calls
│ ├── store/ # State management
│ ├── App.js
│ └── index.js
├── package.json
└── README.md


---

## Key Dependencies

### Backend (Spring Boot) - pom.xml

```xml
<!-- Core Spring Boot -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Security & JWT -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.11.5</version>
</dependency>

<!-- Password Encryption -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-crypto</artifactId>
</dependency>

<!-- Validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- Logging -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<!-- API Documentation -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

### Frontend (React) - package.json

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.3.0",
    "react-router-dom": "^6.8.0",
    "redux": "^4.2.0",
    "react-redux": "^8.0.0",
    "@mui/material": "^5.11.0",
    "@mui/icons-material": "^5.11.0"
  },
  "devDependencies": {
    "jest": "^27.5.1",
    "@testing-library/react": "^13.3.0"
  }
}
```

---

## Environment Configuration

### Backend (application.properties)

```properties
# Server
server.port=8080
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/campus_quiz_battle
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# JWT
app.jwt.secret=your_secret_key_here_min_256_bits
app.jwt.expiration=86400000

# CORS
app.cors.allowed-origins=http://localhost:3000
```

### Frontend (.env)

REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development


---

## Development vs Production

### Development Setup
- Frontend runs on `http://localhost:3000` (React dev server)
- Backend runs on `http://localhost:8080` (Spring Boot)
- Database: Local PostgreSQL
- CORS enabled for localhost

### Production Setup
- Frontend: Built static files, served by CDN or web server
- Backend: Deployed to cloud (AWS, Heroku, Digital Ocean, etc.)
- Database: Cloud PostgreSQL (AWS RDS, Azure Database, etc.)
- HTTPS enforced
- CORS restricted to production domain

---

## Build & Run Commands

### Backend (Spring Boot)

```bash
# Build
mvn clean package

# Run during development
mvn spring-boot:run

# Run built JAR
java -jar target/campus-quiz-battle-0.0.1-SNAPSHOT.jar
```

### Frontend (React)

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## Next Steps

1. **Install all required tools** (JDK, Maven, PostgreSQL, Node.js)
2. **Set up local development environment**
3. **Create GitHub repositories** (backend and frontend)
4. **Initialize project folders** (Spring Boot and React)
5. **Configure database** (create PostgreSQL database)
6. **Start development** (Phase 3)

---

## Quick Reference

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | React | 18+ |
| Backend | Spring Boot | 2.7+ |
| Database | PostgreSQL | 12+ |
| Language (Backend) | Java | 11+ |
| Build Tool (Backend) | Maven | 3.6+ |
| Node.js | Node | 14+ |
| Authentication | JWT | - |
| Password Hashing | bcrypt | - |

---

## Stack Rationale for Quick MVP

✅ **React:** Fastest to build interactive UIs
✅ **Spring Boot:** Robust, scalable backend with minimal setup
✅ **PostgreSQL:** Powerful database for complex queries (leaderboards)
✅ **Maven:** Easy dependency management
✅ **JWT:** Stateless authentication (scales well)

This stack allows you to build a **production-ready MVP in 1-2 months** with minimal overhead.