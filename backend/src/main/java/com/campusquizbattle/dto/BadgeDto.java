package com.campusquizbattle.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class BadgeDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BadgeResponse {
        private Long badgeId;
        private String code;
        private String name;
        private String description;
        private String category; // ACADEMIC, COMMUNITY
        private String tier;     // BRONZE, SILVER, GOLD, PLATINUM, DIAMOND
        private Integer badgePoints;
        private String iconUrl;
        private LocalDateTime earnedAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StudentBadgeSummaryResponse {
        private Long userId;
        private String name;
        private String email;

        // Academic / Studies Track
        private Long academicRank;
        private Integer totalAcademicPoints;
        private Long totalAcademicBadges;
        private String academicTierTitle;

        // Community Games Track
        private Long communityGameRank;
        private Integer totalGamePoints;
        private Long totalGameBadges;
        private String gameTierTitle;
    }
}
