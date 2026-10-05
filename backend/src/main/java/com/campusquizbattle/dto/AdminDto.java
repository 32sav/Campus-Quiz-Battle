package com.campusquizbattle.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

public class AdminDto {

    // ── Course DTOs ─────────────────────────────────────────
    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CreateCourseRequest {
        @NotBlank(message = "Course name is required")
        private String name;
        private String description;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CourseResponse {
        private Long courseId;
        private String name;
        private String description;
        private String createdByName;
    }

    // ── Category DTOs ────────────────────────────────────────
    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CreateCategoryRequest {
        @NotBlank(message = "Category name is required")
        private String name;
        private String description;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CategoryResponse {
        private Long categoryId;
        private String name;
        private String description;
    }

    // ── Quiz DTOs ────────────────────────────────────────────
    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CreateQuizRequest {
        @NotBlank(message = "Quiz title is required")
        private String title;
        private String description;
        @NotNull(message = "Course ID is required")
        private Long courseId;
        @NotNull(message = "Category ID is required")
        private Long categoryId;
        @NotNull @Positive(message = "Time limit must be positive")
        private Integer timeLimit;
        private List<CreateQuestionRequest> questions;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CreateQuestionRequest {
        @NotBlank private String questionText;
        @NotBlank private String optionA;
        @NotBlank private String optionB;
        @NotBlank private String optionC;
        @NotBlank private String optionD;
        @NotBlank private String correctAnswer; // 'a','b','c','d'
        @NotNull  private Integer questionOrder;
    }

    // ── User Management DTOs ─────────────────────────────────
    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class UserSummaryResponse {
        private Long userId;
        private String name;
        private String email;
        private String role;
        private String createdAt;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class UpdateUserRoleRequest {
        @NotBlank(message = "Role is required")
        private String role; // STUDENT, ADMIN, LORDE
    }

    // ── Admin Stats DTO ──────────────────────────────────────
    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class AdminStatsResponse {
        private Long totalStudents;
        private Long totalAdmins;
        private Long totalLordes;
        private Long totalQuizzes;
        private Long totalCourses;
        private Long totalAttempts;
        private Long totalGameSessions;
        private Long totalBadgesAwarded;
    }
}
