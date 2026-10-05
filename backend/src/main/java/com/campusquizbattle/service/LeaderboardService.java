package com.campusquizbattle.service;

import com.campusquizbattle.dto.BadgeDto;
import com.campusquizbattle.repository.LeaderboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;

    public List<Map<String, Object>> getEducationLeaderboard(int limit) {
        List<Object[]> rows = leaderboardRepository.getEducationLeaderboard(limit);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] r : rows) {
            Map<String, Object> map = new HashMap<>();
            map.put("rank", r[0]);
            map.put("userId", r[1]);
            map.put("name", r[2]);
            map.put("email", r[3]);
            map.put("totalPoints", r[4]);
            map.put("totalAttempts", r[5]);
            map.put("avgPercentage", r[6]);
            map.put("lastAttemptDate", r[7]);
            result.add(map);
        }
        return result;
    }

    public List<Map<String, Object>> getCommunityGamesLeaderboard(int limit) {
        List<Object[]> rows = leaderboardRepository.getCommunityGamesLeaderboard(limit);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] r : rows) {
            Map<String, Object> map = new HashMap<>();
            map.put("rank", r[0]);
            map.put("userId", r[1]);
            map.put("name", r[2]);
            map.put("email", r[3]);
            map.put("totalPoints", r[4]);
            map.put("totalGames", r[5]);
            map.put("totalWins", r[6]);
            map.put("winRatePercentage", r[7]);
            map.put("lastGameDate", r[8]);
            result.add(map);
        }
        return result;
    }

    public List<Map<String, Object>> getAcademicBadgeLeaderboard(int limit) {
        List<Object[]> rows = leaderboardRepository.getAcademicBadgeLeaderboard(limit);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] r : rows) {
            Map<String, Object> map = new HashMap<>();
            map.put("rank", r[0]);
            map.put("userId", r[1]);
            map.put("name", r[2]);
            map.put("email", r[3]);
            map.put("totalAcademicPoints", r[4]);
            map.put("totalAcademicBadges", r[5]);
            map.put("bronzeBadges", r[6]);
            map.put("silverBadges", r[7]);
            map.put("goldBadges", r[8]);
            map.put("platinumBadges", r[9]);
            map.put("diamondBadges", r[10]);
            map.put("academicTierTitle", r[11]);
            map.put("lastStudyBadgeEarnedAt", r[12]);
            result.add(map);
        }
        return result;
    }

    public List<Map<String, Object>> getCommunityBadgeLeaderboard(int limit) {
        List<Object[]> rows = leaderboardRepository.getCommunityBadgeLeaderboard(limit);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] r : rows) {
            Map<String, Object> map = new HashMap<>();
            map.put("rank", r[0]);
            map.put("userId", r[1]);
            map.put("name", r[2]);
            map.put("email", r[3]);
            map.put("totalGamePoints", r[4]);
            map.put("totalGameBadges", r[5]);
            map.put("bronzeBadges", r[6]);
            map.put("silverBadges", r[7]);
            map.put("goldBadges", r[8]);
            map.put("platinumBadges", r[9]);
            map.put("diamondBadges", r[10]);
            map.put("gameTierTitle", r[11]);
            map.put("lastGameBadgeEarnedAt", r[12]);
            result.add(map);
        }
        return result;
    }

    public BadgeDto.StudentBadgeSummaryResponse getStudentBadgeSummary(Long userId) {
        Object[] r = leaderboardRepository.getStudentBadgeSummary(userId);
        if (r == null) {
            return null;
        }

        return BadgeDto.StudentBadgeSummaryResponse.builder()
                .userId(r[0] != null ? ((Number) r[0]).longValue() : userId)
                .name((String) r[1])
                .email((String) r[2])
                .academicRank(r[3] != null ? ((Number) r[3]).longValue() : null)
                .totalAcademicPoints(r[4] != null ? ((Number) r[4]).intValue() : 0)
                .totalAcademicBadges(r[5] != null ? ((Number) r[5]).longValue() : 0L)
                .academicTierTitle((String) r[6])
                .communityGameRank(r[7] != null ? ((Number) r[7]).longValue() : null)
                .totalGamePoints(r[8] != null ? ((Number) r[8]).intValue() : 0)
                .totalGameBadges(r[9] != null ? ((Number) r[9]).longValue() : 0L)
                .gameTierTitle((String) r[10])
                .build();
    }
}
