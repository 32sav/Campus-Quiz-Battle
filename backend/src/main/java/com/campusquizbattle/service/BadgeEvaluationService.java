package com.campusquizbattle.service;

import com.campusquizbattle.dto.BadgeDto;
import com.campusquizbattle.model.Badge;
import com.campusquizbattle.model.User;
import com.campusquizbattle.model.UserBadge;
import com.campusquizbattle.repository.AttemptRepository;
import com.campusquizbattle.repository.BadgeRepository;
import com.campusquizbattle.repository.GameResultRepository;
import com.campusquizbattle.repository.UserBadgeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BadgeEvaluationService {

    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final AttemptRepository attemptRepository;
    private final GameResultRepository gameResultRepository;

    @Transactional
    public List<BadgeDto.BadgeResponse> evaluateQuizBadges(User user, BigDecimal latestScorePercentage) {
        List<BadgeDto.BadgeResponse> newlyEarned = new ArrayList<>();
        Long userId = user.getUserId();

        long totalAttempts = attemptRepository.countByUser_UserId(userId);
        long perfectScores = attemptRepository.countByUser_UserIdAndPercentageGreaterThanEqual(userId, new BigDecimal("100.00"));

        // QUIZ_ROOKIE (1 attempt)
        if (totalAttempts >= 1) {
            checkAndAwardBadge(user, "QUIZ_ROOKIE", newlyEarned);
        }

        // QUIZ_PRO (10 attempts)
        if (totalAttempts >= 10) {
            checkAndAwardBadge(user, "QUIZ_PRO", newlyEarned);
        }

        // SCHOLAR_ELITE (25 attempts)
        if (totalAttempts >= 25) {
            checkAndAwardBadge(user, "SCHOLAR_ELITE", newlyEarned);
        }

        // PERFECT_SCORE (1 perfect score)
        if (perfectScores >= 1 || (latestScorePercentage != null && latestScorePercentage.compareTo(new BigDecimal("100.00")) >= 0)) {
            checkAndAwardBadge(user, "PERFECT_SCORE", newlyEarned);
        }

        // FLAWLESS_MASTER (5 perfect scores)
        if (perfectScores >= 5) {
            checkAndAwardBadge(user, "FLAWLESS_MASTER", newlyEarned);
        }

        return newlyEarned;
    }

    @Transactional
    public List<BadgeDto.BadgeResponse> evaluateGameBadges(User user) {
        List<BadgeDto.BadgeResponse> newlyEarned = new ArrayList<>();
        Long userId = user.getUserId();

        long totalGames = gameResultRepository.countByUser_UserId(userId);
        long totalWins = gameResultRepository.countByUser_UserIdAndIsWinnerTrue(userId);

        // FIRST_GAME (1 game played)
        if (totalGames >= 1) {
            checkAndAwardBadge(user, "FIRST_GAME", newlyEarned);
        }

        // MAFIA_SURVIVOR / WEREWOLF_HUNTER (3 wins)
        if (totalWins >= 3) {
            checkAndAwardBadge(user, "MAFIA_SURVIVOR", newlyEarned);
        }

        // GAME_CHAMPION (10 wins)
        if (totalWins >= 10) {
            checkAndAwardBadge(user, "GAME_CHAMPION", newlyEarned);
        }

        // COMMUNITY_LEGEND (25 wins)
        if (totalWins >= 25) {
            checkAndAwardBadge(user, "COMMUNITY_LEGEND", newlyEarned);
        }

        return newlyEarned;
    }

    private void checkAndAwardBadge(User user, String badgeCode, List<BadgeDto.BadgeResponse> newlyEarned) {
        if (!userBadgeRepository.existsByUser_UserIdAndBadge_Code(user.getUserId(), badgeCode)) {
            badgeRepository.findByCode(badgeCode).ifPresent(badge -> {
                UserBadge userBadge = UserBadge.builder()
                        .user(user)
                        .badge(badge)
                        .build();
                UserBadge saved = userBadgeRepository.save(userBadge);

                newlyEarned.add(BadgeDto.BadgeResponse.builder()
                        .badgeId(badge.getBadgeId())
                        .code(badge.getCode())
                        .name(badge.getName())
                        .description(badge.getDescription())
                        .category(badge.getCategory())
                        .tier(badge.getTier())
                        .badgePoints(badge.getBadgePoints())
                        .iconUrl(badge.getIconUrl())
                        .earnedAt(saved.getEarnedAt())
                        .build());

                log.info("Awarded badge [{}] to user [{}]", badgeCode, user.getEmail());
            });
        }
    }
}
