-- =============================================================================
-- V2__seed_initial_data.sql
-- Campus Quiz Battle - Default Seed Data for Game Types, Roles, and Badges
-- PostgreSQL 12+ / Managed by Flyway
-- =============================================================================

-- ============================================
-- 1. SEED GAME TYPES
-- ============================================
INSERT INTO game_types (name, description, default_roles) VALUES
('Mafia', 'Village vs Mafia social deduction game', ARRAY['Mafia', 'Villager', 'Doctor', 'Sheriff']),
('Werewolf', 'Humans vs Werewolves nocturnal deduction game', ARRAY['Werewolf', 'Human', 'Seer']),
('Among Us', 'Crew vs Impostor space survival deduction', ARRAY['Impostor', 'Crewmate'])
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 2. SEED GAME ROLES (Mafia)
-- ============================================
INSERT INTO game_roles (game_type_id, role_name, role_description, winner_points, loser_points, role_order) VALUES
(1, 'Mafia', 'Eliminate villagers without getting discovered', 150, 20, 1),
(1, 'Villager', 'Vote out Mafia members and protect the campus village', 100, 10, 2),
(1, 'Doctor', 'Select one player each night round to save from elimination', 120, 25, 3),
(1, 'Sheriff', 'Investigate one suspect each round to learn alignment', 120, 25, 4)
ON CONFLICT (game_type_id, role_name) DO NOTHING;

-- ============================================
-- 3. SEED BADGES (ACADEMIC / STUDIES TRACK)
-- ============================================
INSERT INTO badges (code, name, description, category, tier, badge_points, criteria_type, criteria_threshold) VALUES
('QUIZ_ROOKIE', 'Quiz Rookie', 'Completed your first quiz attempt', 'ACADEMIC', 'BRONZE', 10, 'ATTEMPTS_COUNT', 1),
('QUIZ_PRO', 'Quiz Pro', 'Completed 10 quiz attempts', 'ACADEMIC', 'SILVER', 25, 'ATTEMPTS_COUNT', 10),
('PERFECT_SCORE', 'Bullseye Genius', 'Scored a perfect 100% on any quiz', 'ACADEMIC', 'SILVER', 25, 'PERFECT_SCORE_COUNT', 1),
('SCHOLAR_ELITE', 'Scholar Elite', 'Completed 25 quiz attempts', 'ACADEMIC', 'GOLD', 50, 'ATTEMPTS_COUNT', 25),
('FLAWLESS_MASTER', 'Flawless Master', 'Scored 100% on 5 different quizzes', 'ACADEMIC', 'PLATINUM', 100, 'PERFECT_SCORE_COUNT', 5),
('DAILY_STUDY_STREAK', 'Consistent Scholar', 'Completed quizzes 3 days in a row', 'ACADEMIC', 'BRONZE', 10, 'STREAK_DAYS', 3),
('IRON_STUDY_STREAK', 'Iron Academician', 'Completed quizzes 7 days in a row', 'ACADEMIC', 'GOLD', 50, 'STREAK_DAYS', 7)
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- 4. SEED BADGES (COMMUNITY GAMES TRACK)
-- ============================================
INSERT INTO badges (code, name, description, category, tier, badge_points, criteria_type, criteria_threshold) VALUES
('FIRST_GAME', 'Game Recruit', 'Participated in your first community game', 'COMMUNITY', 'BRONZE', 10, 'GAMES_PLAYED_COUNT', 1),
('MAFIA_SURVIVOR', 'Mafia Survivor', 'Won 3 matches playing as Mafia or Villager', 'COMMUNITY', 'SILVER', 25, 'GAMES_WON_COUNT', 3),
('WEREWOLF_HUNTER', 'Moonlight Hunter', 'Won 3 matches playing Werewolf', 'COMMUNITY', 'SILVER', 25, 'GAMES_WON_COUNT', 3),
('GAME_CHAMPION', 'Game Champion', 'Won 10 community game sessions', 'COMMUNITY', 'GOLD', 50, 'GAMES_WON_COUNT', 10),
('COMMUNITY_LEGEND', 'Community Legend', 'Won 25 community game sessions', 'COMMUNITY', 'DIAMOND', 200, 'GAMES_WON_COUNT', 25),
('GAME_STREAK_WARRIOR', 'Social Strategist', 'Participated in community games 3 weekends in a row', 'COMMUNITY', 'BRONZE', 15, 'WEEKEND_GAMES_COUNT', 3)
ON CONFLICT (code) DO NOTHING;
