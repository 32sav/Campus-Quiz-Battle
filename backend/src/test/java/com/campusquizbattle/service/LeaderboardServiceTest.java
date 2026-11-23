package com.campusquizbattle.service;

import com.campusquizbattle.dto.BadgeDto;
import com.campusquizbattle.repository.LeaderboardRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LeaderboardServiceTest {

    @Mock
    private LeaderboardRepository leaderboardRepository;

    @InjectMocks
    private LeaderboardService leaderboardService;

    @Test
    @DisplayName("Get education leaderboard formats rows into map")
    void testGetEducationLeaderboard() {
        Object[] row1 = new Object[]{1L, 10L, "Alice Scholar", "alice@campus.edu", 350, 4, 87.5, "2026-10-10"};
        when(leaderboardRepository.getEducationLeaderboard(10)).thenReturn(List.of(row1));

        List<Map<String, Object>> result = leaderboardService.getEducationLeaderboard(10);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).get("rank"));
        assertEquals("Alice Scholar", result.get(0).get("name"));
        assertEquals(350, result.get(0).get("totalPoints"));
    }

    @Test
    @DisplayName("Get community games leaderboard formats rows into map")
    void testGetCommunityGamesLeaderboard() {
        Object[] row1 = new Object[]{1L, 20L, "Mafia King", "king@campus.edu", 450, 5, 4, 80.0, "2026-10-10"};
        when(leaderboardRepository.getCommunityGamesLeaderboard(10)).thenReturn(List.of(row1));

        List<Map<String, Object>> result = leaderboardService.getCommunityGamesLeaderboard(10);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).get("rank"));
        assertEquals("Mafia King", result.get(0).get("name"));
        assertEquals(450, result.get(0).get("totalPoints"));
        assertEquals(80.0, result.get(0).get("winRatePercentage"));
    }

    @Test
    @DisplayName("Get student badge summary computes dual-track rank and tier")
    void testGetStudentBadgeSummary() {
        Object[] studentRow = new Object[]{10L, "Alice Scholar", "alice@campus.edu"};
        when(leaderboardRepository.findStudentSummaryRow(10L)).thenReturn(List.of(studentRow));

        // Academic leaderboard with Alice at rank 1
        Object[] eduRow = new Object[]{1L, 10L, "Alice Scholar", "alice@campus.edu", 500, 5, 90.0, "2026-10-10"};
        when(leaderboardRepository.getEducationLeaderboard(100)).thenReturn(List.of(eduRow));

        // Community leaderboard with Alice at rank 2
        Object[] gameRow = new Object[]{2L, 10L, "Alice Scholar", "alice@campus.edu", 200, 2, 2, 100.0, "2026-10-10"};
        when(leaderboardRepository.getCommunityGamesLeaderboard(100)).thenReturn(List.of(gameRow));

        when(leaderboardRepository.countUserBadgesByCategory(10L, "ACADEMIC")).thenReturn(3L);
        when(leaderboardRepository.countUserBadgesByCategory(10L, "COMMUNITY")).thenReturn(1L);

        BadgeDto.StudentBadgeSummaryResponse summary = leaderboardService.getStudentBadgeSummary(10L);

        assertNotNull(summary);
        assertEquals(10L, summary.getUserId());
        assertEquals("Alice Scholar", summary.getName());
        assertEquals(1L, summary.getAcademicRank());
        assertEquals(500, summary.getTotalAcademicPoints());
        assertEquals(3L, summary.getTotalAcademicBadges());
        assertEquals(2L, summary.getCommunityGameRank());
        assertEquals(200, summary.getTotalGamePoints());
        assertEquals(1L, summary.getTotalGameBadges());
    }
}
