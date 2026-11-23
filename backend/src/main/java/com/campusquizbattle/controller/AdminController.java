package com.campusquizbattle.controller;

import com.campusquizbattle.dto.AdminDto;
import com.campusquizbattle.model.Quiz;
import com.campusquizbattle.model.User;
import com.campusquizbattle.repository.UserRepository;
import com.campusquizbattle.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;

    @GetMapping("/stats")
    public ResponseEntity<AdminDto.AdminStatsResponse> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    // Courses
    @GetMapping("/courses")
    public ResponseEntity<List<AdminDto.CourseResponse>> getAllCourses() {
        return ResponseEntity.ok(adminService.getAllCourses());
    }

    @PostMapping("/courses")
    public ResponseEntity<AdminDto.CourseResponse> createCourse(
            @Valid @RequestBody AdminDto.CreateCourseRequest request,
            Authentication authentication) {
        User admin = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
        return ResponseEntity.ok(adminService.createCourse(request, admin));
    }

    @PutMapping("/courses/{courseId}")
    public ResponseEntity<AdminDto.CourseResponse> updateCourse(
            @PathVariable Long courseId,
            @Valid @RequestBody AdminDto.CreateCourseRequest request) {
        return ResponseEntity.ok(adminService.updateCourse(courseId, request));
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<Map<String, String>> deleteCourse(@PathVariable Long courseId) {
        adminService.deleteCourse(courseId);
        return ResponseEntity.ok(Map.of("message", "Course deleted successfully"));
    }

    // Categories
    @GetMapping("/categories")
    public ResponseEntity<List<AdminDto.CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(adminService.getAllCategories());
    }

    @PostMapping("/categories")
    public ResponseEntity<AdminDto.CategoryResponse> createCategory(
            @Valid @RequestBody AdminDto.CreateCategoryRequest request) {
        return ResponseEntity.ok(adminService.createCategory(request));
    }

    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable Long categoryId) {
        adminService.deleteCategory(categoryId);
        return ResponseEntity.ok(Map.of("message", "Category deleted successfully"));
    }

    // Quizzes
    @PostMapping("/quizzes")
    public ResponseEntity<Map<String, Object>> createQuiz(
            @Valid @RequestBody AdminDto.CreateQuizRequest request,
            Authentication authentication) {
        User admin = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
        Quiz quiz = adminService.createQuiz(request, admin);
        return ResponseEntity.ok(Map.of(
                "message", "Quiz created successfully",
                "quizId", quiz.getQuizId(),
                "title", quiz.getTitle()
        ));
    }

    @DeleteMapping("/quizzes/{quizId}")
    public ResponseEntity<Map<String, String>> deleteQuiz(@PathVariable Long quizId) {
        adminService.deleteQuiz(quizId);
        return ResponseEntity.ok(Map.of("message", "Quiz deleted successfully"));
    }

    // Users
    @GetMapping("/users")
    public ResponseEntity<List<AdminDto.UserSummaryResponse>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<AdminDto.UserSummaryResponse> updateUserRole(
            @PathVariable Long userId,
            @Valid @RequestBody AdminDto.UpdateUserRoleRequest request) {
        return ResponseEntity.ok(adminService.updateUserRole(userId, request));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
}
