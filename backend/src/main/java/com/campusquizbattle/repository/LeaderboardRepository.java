package com.campusquizbattle.repository;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Map;

@Repository
public class LeaderboardRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public List<Object[]> getEducationLeaderboard(int limit) {
        String sql = "SELECT rank, user_id, name, email, total_points, total_attempts, avg_percentage, last_attempt_date " +
                     "FROM education_leaderboard LIMIT :limit";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("limit", limit);
        return query.getResultList();
    }

    @SuppressWarnings("unchecked")
    public List<Object[]> getCommunityGamesLeaderboard(int limit) {
        String sql = "SELECT rank, user_id, name, email, total_points, total_games, total_wins, win_rate_percentage, last_game_date " +
                     "FROM community_games_leaderboard LIMIT :limit";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("limit", limit);
        return query.getResultList();
    }

    @SuppressWarnings("unchecked")
    public List<Object[]> getAcademicBadgeLeaderboard(int limit) {
        String sql = "SELECT rank, user_id, name, email, total_academic_points, total_academic_badges, " +
                     "bronze_badges, silver_badges, gold_badges, platinum_badges, diamond_badges, " +
                     "academic_tier_title, last_study_badge_earned_at " +
                     "FROM academic_badge_leaderboard LIMIT :limit";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("limit", limit);
        return query.getResultList();
    }

    @SuppressWarnings("unchecked")
    public List<Object[]> getCommunityBadgeLeaderboard(int limit) {
        String sql = "SELECT rank, user_id, name, email, total_game_points, total_game_badges, " +
                     "bronze_badges, silver_badges, gold_badges, platinum_badges, diamond_badges, " +
                     "game_tier_title, last_game_badge_earned_at " +
                     "FROM community_badge_leaderboard LIMIT :limit";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("limit", limit);
        return query.getResultList();
    }

    @SuppressWarnings("unchecked")
    public Object[] getStudentBadgeSummary(Long userId) {
        String sql = "SELECT user_id, name, email, academic_rank, total_academic_points, total_academic_badges, academic_tier_title, " +
                     "community_game_rank, total_game_points, total_game_badges, game_tier_title " +
                     "FROM student_badge_summary WHERE user_id = :userId";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("userId", userId);
        List<Object[]> results = query.getResultList();
        return results.isEmpty() ? null : results.get(0);
    }
}
