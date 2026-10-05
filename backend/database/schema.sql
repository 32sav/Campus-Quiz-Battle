-- ============================================
-- CAMPUS QUIZ BATTLE DATABASE SCHEMA
-- PostgreSQL 12+
-- ============================================

-- ============================================
-- 1. USERS
-- ============================================

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role VARCHAR(50) NOT NULL
        CHECK (role IN ('STUDENT', 'ADMIN', 'LORDE')),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- 2. COURSES
-- ============================================

CREATE TABLE courses (
    course_id BIGSERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,

    created_by BIGINT NOT NULL
        REFERENCES users(user_id),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_name ON courses(name);
CREATE INDEX idx_courses_created_by ON courses(created_by);

-- ============================================
-- 3. CATEGORIES
-- ============================================

CREATE TABLE categories (
    category_id BIGSERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_name ON categories(name);

-- ============================================
-- 4. QUIZZES
-- ============================================

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

CREATE INDEX idx_quizzes_course_id ON quizzes(course_id);
CREATE INDEX idx_quizzes_category_id ON quizzes(category_id);
CREATE INDEX idx_quizzes_created_by ON quizzes(created_by);

-- ============================================
-- 5. QUESTIONS
-- ============================================

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

CREATE INDEX idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX idx_questions_order ON questions(quiz_id, question_order);

-- ============================================
-- 6. ATTEMPTS
-- ============================================

CREATE TABLE attempts (
    attempt_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    quiz_id BIGINT NOT NULL REFERENCES quizzes(quiz_id),
    score INTEGER NOT NULL, -- Number of correct answers
    total_questions INTEGER NOT NULL, -- Total questions in quiz
    percentage DECIMAL(5, 2) NOT NULL, -- Percentage score (0-100)
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attempts_user_id ON attempts(user_id);
CREATE INDEX idx_attempts_quiz_id ON attempts(quiz_id);
CREATE INDEX idx_attempts_submitted_at ON attempts(submitted_at);
CREATE INDEX idx_attempts_user_quiz ON attempts(user_id, quiz_id);

-- ============================================
-- 7. ATTEMPT_ANSWERS
-- ============================================

CREATE TABLE attempt_answers (
    answer_id BIGSERIAL PRIMARY KEY,
    attempt_id BIGINT NOT NULL REFERENCES attempts(attempt_id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(question_id),
    user_answer VARCHAR(1) NOT NULL CHECK (user_answer IN ('a', 'b', 'c', 'd')),
    is_correct BOOLEAN NOT NULL,
    time_taken INTEGER, -- in seconds
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attempt_answers_attempt_id ON attempt_answers(attempt_id);
CREATE INDEX idx_attempt_answers_question_id ON attempt_answers(question_id);

-- ============================================
-- 8. GAME_TYPES
-- ============================================

CREATE TABLE game_types (
    game_type_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    default_roles VARCHAR[],
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_game_types_name ON game_types(name);

-- ============================================
-- 9. GAME_ROLES
-- ============================================

CREATE TABLE game_roles (
    game_role_id BIGSERIAL PRIMARY KEY,
    game_type_id BIGINT NOT NULL REFERENCES game_types(game_type_id),
    role_name VARCHAR(100) NOT NULL,
    role_description TEXT,
    winner_points INTEGER NOT NULL,
    loser_points INTEGER NOT NULL,
    role_order INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(game_type_id, role_name)
);

CREATE INDEX idx_game_roles_game_type_id ON game_roles(game_type_id);
CREATE INDEX idx_game_roles_role_name ON game_roles(game_type_id, role_name);

-- ============================================
-- 10. GAME_SESSIONS
-- ============================================

CREATE TABLE game_sessions (
    game_session_id BIGSERIAL PRIMARY KEY,
    game_type_id BIGINT NOT NULL REFERENCES game_types(game_type_id),
    lorde_id BIGINT NOT NULL REFERENCES users(user_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    max_participants INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('WAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_game_sessions_game_type_id ON game_sessions(game_type_id);
CREATE INDEX idx_game_sessions_lorde_id ON game_sessions(lorde_id);
CREATE INDEX idx_game_sessions_status ON game_sessions(status);
CREATE INDEX idx_game_sessions_scheduled_date ON game_sessions(scheduled_date);

-- ============================================
-- 11. GAME_PARTICIPANTS
-- ============================================

CREATE TABLE game_participants (
    game_participant_id BIGSERIAL PRIMARY KEY,
    game_session_id BIGINT NOT NULL REFERENCES game_sessions(game_session_id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    assigned_role VARCHAR(100),
    signed_up_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role_assigned_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(game_session_id, user_id)
);

CREATE INDEX idx_game_participants_game_session_id ON game_participants(game_session_id);
CREATE INDEX idx_game_participants_user_id ON game_participants(user_id);
CREATE INDEX idx_game_participants_assigned_role ON game_participants(assigned_role);

-- ============================================
-- 12. GAME_RESULTS
-- ============================================

CREATE TABLE game_results (
    game_result_id BIGSERIAL PRIMARY KEY,
    game_session_id BIGINT NOT NULL REFERENCES game_sessions(game_session_id),
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    assigned_role VARCHAR(100) NOT NULL,
    is_winner BOOLEAN NOT NULL,
    points_earned INTEGER NOT NULL,
    recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(game_session_id, user_id)
);

CREATE INDEX idx_game_results_game_session_id ON game_results(game_session_id);
CREATE INDEX idx_game_results_user_id ON game_results(user_id);
CREATE INDEX idx_game_results_is_winner ON game_results(is_winner);
CREATE INDEX idx_game_results_points_earned ON game_results(points_earned);

-- ============================================
-- 13. BADGES
-- ============================================

CREATE TABLE badges (
    badge_id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('ACADEMIC', 'COMMUNITY')),
    tier VARCHAR(20) NOT NULL DEFAULT 'BRONZE' CHECK (tier IN ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND')),
    badge_points INTEGER NOT NULL DEFAULT 10,
    icon_url VARCHAR(255),
    criteria_type VARCHAR(50) NOT NULL,
    criteria_threshold INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_badges_code ON badges(code);
CREATE INDEX idx_badges_category ON badges(category);
CREATE INDEX idx_badges_tier ON badges(tier);

-- ============================================
-- 14. USER_BADGES
-- ============================================

CREATE TABLE user_badges (
    user_badge_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    badge_id BIGINT NOT NULL REFERENCES badges(badge_id) ON DELETE CASCADE,
    earned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);
CREATE INDEX idx_user_badges_earned_at ON user_badges(earned_at);

-- ============================================
-- LEADERBOARD VIEWS
-- ============================================

-- Education Leaderboard View
CREATE OR REPLACE VIEW education_leaderboard AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(a.score), 0) DESC) AS rank,
    u.user_id,
    u.name,
    u.email,
    COALESCE(SUM(a.score), 0) AS total_points,
    COALESCE(COUNT(a.attempt_id), 0) AS total_attempts,
    COALESCE(AVG(a.percentage), 0) AS avg_percentage,
    MAX(a.submitted_at) AS last_attempt_date
FROM users u
LEFT JOIN attempts a ON u.user_id = a.user_id
WHERE u.role = 'STUDENT'
GROUP BY u.user_id, u.name, u.email
ORDER BY total_points DESC;

-- Community Games Leaderboard View
CREATE OR REPLACE VIEW community_games_leaderboard AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(gr.points_earned), 0) DESC) AS rank,
    u.user_id,
    u.name,
    u.email,
    COALESCE(SUM(gr.points_earned), 0) AS total_points,
    COALESCE(COUNT(gr.game_result_id), 0) AS total_games,
    COALESCE(SUM(CASE WHEN gr.is_winner THEN 1 ELSE 0 END), 0) AS total_wins,
    COALESCE(
        ROUND(
            100.0 * SUM(CASE WHEN gr.is_winner THEN 1 ELSE 0 END) / 
            NULLIF(COUNT(gr.game_result_id), 0),
            2
        ),
        0
    ) AS win_rate_percentage,
    MAX(gr.recorded_at) AS last_game_date
FROM users u
LEFT JOIN game_results gr ON u.user_id = gr.user_id
WHERE u.role = 'STUDENT'
GROUP BY u.user_id, u.name, u.email
ORDER BY total_points DESC;

-- Community Games Leaderboard by Game Type View
CREATE OR REPLACE VIEW community_leaderboard_by_game_type AS
SELECT 
    ROW_NUMBER() OVER (PARTITION BY gt.name ORDER BY COALESCE(SUM(gr.points_earned), 0) DESC) AS rank,
    gt.name AS game_type,
    u.user_id,
    u.name,
    COALESCE(SUM(gr.points_earned), 0) AS total_points,
    COALESCE(COUNT(gr.game_result_id), 0) AS games_played,
    COALESCE(SUM(CASE WHEN gr.is_winner THEN 1 ELSE 0 END), 0) AS wins
FROM users u
LEFT JOIN game_results gr ON u.user_id = gr.user_id
LEFT JOIN game_sessions gs ON gr.game_session_id = gs.game_session_id
LEFT JOIN game_types gt ON gs.game_type_id = gt.game_type_id
WHERE u.role = 'STUDENT'
GROUP BY gt.name, u.user_id, u.name
ORDER BY gt.name, total_points DESC;

-- ============================================
-- BADGE LEADERBOARDS (SEPARATED STUDIES & GAMES)
-- ============================================

-- 1. Academic / Studies Badge Leaderboard View
CREATE OR REPLACE VIEW academic_badge_leaderboard AS
SELECT 
    ROW_NUMBER() OVER (
        ORDER BY 
            COALESCE(SUM(b.badge_points), 0) DESC, 
            COUNT(ub.badge_id) DESC
    ) AS rank,
    u.user_id,
    u.name,
    u.email,
    COALESCE(SUM(b.badge_points), 0) AS total_academic_points,
    COUNT(ub.badge_id) AS total_academic_badges,
    COUNT(CASE WHEN b.tier = 'BRONZE' THEN 1 END) AS bronze_badges,
    COUNT(CASE WHEN b.tier = 'SILVER' THEN 1 END) AS silver_badges,
    COUNT(CASE WHEN b.tier = 'GOLD' THEN 1 END) AS gold_badges,
    COUNT(CASE WHEN b.tier = 'PLATINUM' THEN 1 END) AS platinum_badges,
    COUNT(CASE WHEN b.tier = 'DIAMOND' THEN 1 END) AS diamond_badges,
    CASE 
        WHEN COALESCE(SUM(b.badge_points), 0) >= 500 THEN 'Grand Scholar'
        WHEN COALESCE(SUM(b.badge_points), 0) >= 300 THEN 'Master Academician'
        WHEN COALESCE(SUM(b.badge_points), 0) >= 150 THEN 'Honor Student'
        WHEN COALESCE(SUM(b.badge_points), 0) >= 75  THEN 'Quiz Scholar'
        WHEN COALESCE(SUM(b.badge_points), 0) >= 25  THEN 'Study Apprentice'
        ELSE 'Novice Learner'
    END AS academic_tier_title,
    MAX(ub.earned_at) AS last_study_badge_earned_at
FROM users u
LEFT JOIN user_badges ub ON u.user_id = ub.user_id
LEFT JOIN badges b ON ub.badge_id = b.badge_id AND b.category = 'ACADEMIC'
WHERE u.role = 'STUDENT'
GROUP BY u.user_id, u.name, u.email
ORDER BY total_academic_points DESC, total_academic_badges DESC;

-- 2. Community Games Badge Leaderboard View
CREATE OR REPLACE VIEW community_badge_leaderboard AS
SELECT 
    ROW_NUMBER() OVER (
        ORDER BY 
            COALESCE(SUM(b.badge_points), 0) DESC, 
            COUNT(ub.badge_id) DESC
    ) AS rank,
    u.user_id,
    u.name,
    u.email,
    COALESCE(SUM(b.badge_points), 0) AS total_game_points,
    COUNT(ub.badge_id) AS total_game_badges,
    COUNT(CASE WHEN b.tier = 'BRONZE' THEN 1 END) AS bronze_badges,
    COUNT(CASE WHEN b.tier = 'SILVER' THEN 1 END) AS silver_badges,
    COUNT(CASE WHEN b.tier = 'GOLD' THEN 1 END) AS gold_badges,
    COUNT(CASE WHEN b.tier = 'PLATINUM' THEN 1 END) AS platinum_badges,
    COUNT(CASE WHEN b.tier = 'DIAMOND' THEN 1 END) AS diamond_badges,
    CASE 
        WHEN COALESCE(SUM(b.badge_points), 0) >= 500 THEN 'Grandmaster of Games'
        WHEN COALESCE(SUM(b.badge_points), 0) >= 300 THEN 'Community Champion'
        WHEN COALESCE(SUM(b.badge_points), 0) >= 150 THEN 'Master Tactician'
        WHEN COALESCE(SUM(b.badge_points), 0) >= 75  THEN 'Veteran Duelist'
        WHEN COALESCE(SUM(b.badge_points), 0) >= 25  THEN 'Game Challenger'
        ELSE 'Recruit Player'
    END AS game_tier_title,
    MAX(ub.earned_at) AS last_game_badge_earned_at
FROM users u
LEFT JOIN user_badges ub ON u.user_id = ub.user_id
LEFT JOIN badges b ON ub.badge_id = b.badge_id AND b.category = 'COMMUNITY'
WHERE u.role = 'STUDENT'
GROUP BY u.user_id, u.name, u.email
ORDER BY total_game_points DESC, total_game_badges DESC;

-- 3. Student Dual Badge Summary View (Shows user their exact rank in both Studies and Games)
CREATE OR REPLACE VIEW student_badge_summary AS
SELECT 
    u.user_id,
    u.name,
    u.email,
    -- Studies Track
    abl.rank AS academic_rank,
    abl.total_academic_points,
    abl.total_academic_badges,
    abl.academic_tier_title,
    -- Games Track
    cbl.rank AS community_game_rank,
    cbl.total_game_points,
    cbl.total_game_badges,
    cbl.game_tier_title
FROM users u
LEFT JOIN academic_badge_leaderboard abl ON u.user_id = abl.user_id
LEFT JOIN community_badge_leaderboard cbl ON u.user_id = cbl.user_id
WHERE u.role = 'STUDENT';

-- ============================================
-- INITIAL SEED DATA
-- ============================================

INSERT INTO game_types (name, description, default_roles) VALUES
('Mafia', 'Village vs Mafia game', ARRAY['Mafia', 'Villager', 'Doctor', 'Sheriff']),
('Werewolf', 'Humans vs Werewolves game', ARRAY['Werewolf', 'Human', 'Seer']),
('Among Us', 'Crew vs Impostor game', ARRAY['Impostor', 'Crewmate'])
ON CONFLICT (name) DO NOTHING;

INSERT INTO game_roles (game_type_id, role_name, role_description, winner_points, loser_points, role_order) VALUES
(1, 'Mafia', 'Kill villagers', 150, 20, 1),
(1, 'Villager', 'Protect village', 100, 10, 2),
(1, 'Doctor', 'Save villagers', 120, 25, 3),
(1, 'Sheriff', 'Investigate players', 120, 25, 4)
ON CONFLICT (game_type_id, role_name) DO NOTHING;

-- Initial Seed Badges (Separated Tracks)
INSERT INTO badges (code, name, description, category, tier, badge_points, criteria_type, criteria_threshold) VALUES
-- Academic / Studies Track
('QUIZ_ROOKIE', 'Quiz Rookie', 'Completed your first quiz attempt', 'ACADEMIC', 'BRONZE', 10, 'ATTEMPTS_COUNT', 1),
('QUIZ_PRO', 'Quiz Pro', 'Completed 10 quiz attempts', 'ACADEMIC', 'SILVER', 25, 'ATTEMPTS_COUNT', 10),
('PERFECT_SCORE', 'Bullseye Genius', 'Scored a perfect 100% on any quiz', 'ACADEMIC', 'SILVER', 25, 'PERFECT_SCORE_COUNT', 1),
('SCHOLAR_ELITE', 'Scholar Elite', 'Completed 25 quiz attempts', 'ACADEMIC', 'GOLD', 50, 'ATTEMPTS_COUNT', 25),
('FLAWLESS_MASTER', 'Flawless Master', 'Scored 100% on 5 different quizzes', 'ACADEMIC', 'PLATINUM', 100, 'PERFECT_SCORE_COUNT', 5),
('DAILY_STUDY_STREAK', 'Consistent Scholar', 'Completed quizzes 3 days in a row', 'ACADEMIC', 'BRONZE', 10, 'STREAK_DAYS', 3),
('IRON_STUDY_STREAK', 'Iron Academician', 'Completed quizzes 7 days in a row', 'ACADEMIC', 'GOLD', 50, 'STREAK_DAYS', 7),

-- Community Games Track
('FIRST_GAME', 'Game Recruit', 'Participated in your first community game', 'COMMUNITY', 'BRONZE', 10, 'GAMES_PLAYED_COUNT', 1),
('MAFIA_SURVIVOR', 'Mafia Survivor', 'Won 3 matches playing as Mafia or Villager', 'COMMUNITY', 'SILVER', 25, 'GAMES_WON_COUNT', 3),
('WEREWOLF_HUNTER', 'Moonlight Hunter', 'Won 3 matches playing Werewolf', 'COMMUNITY', 'SILVER', 25, 'GAMES_WON_COUNT', 3),
('GAME_CHAMPION', 'Game Champion', 'Won 10 community game sessions', 'COMMUNITY', 'GOLD', 50, 'GAMES_WON_COUNT', 10),
('COMMUNITY_LEGEND', 'Community Legend', 'Won 25 community game sessions', 'COMMUNITY', 'DIAMOND', 200, 'GAMES_WON_COUNT', 25),
('GAME_STREAK_WARRIOR', 'Social Strategist', 'Participated in community games 3 weekends in a row', 'COMMUNITY', 'BRONZE', 15, 'WEEKEND_GAMES_COUNT', 3)
ON CONFLICT (code) DO NOTHING;

