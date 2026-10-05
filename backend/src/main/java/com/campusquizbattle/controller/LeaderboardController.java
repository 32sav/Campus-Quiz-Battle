package com.campusquizbattle.controller;

import com.campusquizbattle.dto.BadgeDto;
import com.campusquizbattle.model.User;
import com.campusquizbattle.repository.UserRepository;
import com.campusquizbattle.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/leaderboards")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;
    private final UserRepository userRepository;

    @GetMapping("/education")
    public ResponseEntity<List<Map<String, Object>>> getEducationLeaderboard(
            @RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(leaderboardService.getEducationLeaderboard(limit));
    }

    @GetMapping("/community-games")
    public ResponseEntity<List<Map<String, Object>>> getCommunityGamesLeaderboard(
            @RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(leaderboardService.getCommunityGamesLeaderboard(limit));
    }

    @GetMapping("/badges/academic")
    public ResponseEntity<List<Map<String, Object>>> getAcademicBadgeLeaderboard(
            @RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(leaderboardService.getAcademicBadgeLeaderboard(limit));
    }

    @GetMapping("/badges/community")
    public ResponseEntity<List<Map<String, Object>>> getCommunityBadgeLeaderboard(
            @RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(leaderboardService.getCommunityBadgeLeaderboard(limit));
    }

    @GetMapping("/badges/summary/{userId}")
    public ResponseEntity<BadgeDto.StudentBadgeSummaryResponse> getStudentBadgeSummary(
            @PathVariable Long userId) {
        BadgeDto.StudentBadgeSummaryResponse summary = leaderboardService.getStudentBadgeSummary(userId);
        if (summary == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/badges/me")
    public ResponseEntity<BadgeDto.StudentBadgeSummaryResponse> getMyBadgeSummary(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        BadgeDto.StudentBadgeSummaryResponse summary = leaderboardService.getStudentBadgeSummary(user.getUserId());
        return ResponseEntity.ok(summary);
    }
}
