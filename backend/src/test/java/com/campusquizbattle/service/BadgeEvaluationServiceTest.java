package com.campusquizbattle.service;

import com.campusquizbattle.dto.BadgeDto;
import com.campusquizbattle.model.Badge;
import com.campusquizbattle.model.User;
import com.campusquizbattle.model.UserBadge;
import com.campusquizbattle.repository.AttemptRepository;
import com.campusquizbattle.repository.BadgeRepository;
import com.campusquizbattle.repository.GameResultRepository;
import com.campusquizbattle.repository.UserBadgeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BadgeEvaluationServiceTest {

    @Mock
    private BadgeRepository badgeRepository;

    @Mock
    private UserBadgeRepository userBadgeRepository;

    @Mock
    private AttemptRepository attemptRepository;

    @Mock
    private GameResultRepository gameResultRepository;

    @InjectMocks
    private BadgeEvaluationService badgeEvaluationService;

    private User sampleUser;
    private Badge rookieBadge;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder().userId(1L).name("Rookie Student").role("STUDENT").build();

        rookieBadge = Badge.builder()
                .badgeId(10L)
                .code("QUIZ_ROOKIE")
                .name("Quiz Rookie")
                .description("Completed your first quiz")
                .category("ACADEMIC")
                .tier("BRONZE")
                .badgePoints(25)
                .build();
    }

    @Test
    @DisplayName("Evaluate quiz badges awards QUIZ_ROOKIE on first attempt")
    void testAwardQuizRookieBadge() {
        when(attemptRepository.countByUser_UserId(1L)).thenReturn(1L);
        when(attemptRepository.countByUser_UserIdAndPercentageGreaterThanEqual(1L, new BigDecimal("100.00"))).thenReturn(0L);

        when(userBadgeRepository.existsByUser_UserIdAndBadge_Code(1L, "QUIZ_ROOKIE")).thenReturn(false);
        when(badgeRepository.findByCode("QUIZ_ROOKIE")).thenReturn(Optional.of(rookieBadge));
        when(userBadgeRepository.save(any(UserBadge.class))).thenReturn(UserBadge.builder().build());

        List<BadgeDto.BadgeResponse> earned = badgeEvaluationService.evaluateQuizBadges(sampleUser, new BigDecimal("80.00"));

        assertNotNull(earned);
        assertEquals(1, earned.size());
        assertEquals("QUIZ_ROOKIE", earned.get(0).getCode());
        assertEquals(25, earned.get(0).getBadgePoints());
        verify(userBadgeRepository).save(any(UserBadge.class));
    }

    @Test
    @DisplayName("Does not award duplicate badge if user already holds it")
    void testDoNotAwardDuplicateBadge() {
        when(attemptRepository.countByUser_UserId(1L)).thenReturn(1L);
        when(attemptRepository.countByUser_UserIdAndPercentageGreaterThanEqual(1L, new BigDecimal("100.00"))).thenReturn(0L);

        when(userBadgeRepository.existsByUser_UserIdAndBadge_Code(1L, "QUIZ_ROOKIE")).thenReturn(true);

        List<BadgeDto.BadgeResponse> earned = badgeEvaluationService.evaluateQuizBadges(sampleUser, new BigDecimal("80.00"));

        assertNotNull(earned);
        assertTrue(earned.isEmpty());
        verify(userBadgeRepository, never()).save(any(UserBadge.class));
    }
}
