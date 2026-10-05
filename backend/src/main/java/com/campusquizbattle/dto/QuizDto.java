package com.campusquizbattle.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class QuizDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizSummaryResponse {
        private Long quizId;
        private String title;
        private String description;
        private String courseName;
        private String categoryName;
        private Integer timeLimit;
        private Integer totalQuestions;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionResponse {
        private Long questionId;
        private String questionText;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
        private Integer questionOrder;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizDetailResponse {
        private Long quizId;
        private String title;
        private String description;
        private String courseName;
        private String categoryName;
        private Integer timeLimit;
        private List<QuestionResponse> questions;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubmitAnswerItem {
        @NotNull
        private Long questionId;
        @NotNull
        private String answer; // 'a', 'b', 'c', 'd'
        private Integer timeTaken;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizSubmitRequest {
        @NotNull
        private List<SubmitAnswerItem> answers;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AttemptResultResponse {
        private Long attemptId;
        private Long quizId;
        private String quizTitle;
        private Integer score;
        private Integer totalQuestions;
        private BigDecimal percentage;
        private LocalDateTime submittedAt;
        private List<BadgeDto.BadgeResponse> newlyEarnedBadges;
    }
}
