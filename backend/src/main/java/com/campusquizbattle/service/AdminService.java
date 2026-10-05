package com.campusquizbattle.service;

import com.campusquizbattle.dto.AdminDto;
import com.campusquizbattle.exception.BadRequestException;
import com.campusquizbattle.exception.ResourceNotFoundException;
import com.campusquizbattle.model.*;
import com.campusquizbattle.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final AttemptRepository attemptRepository;
    private final GameSessionRepository gameSessionRepository;
    private final UserBadgeRepository userBadgeRepository;

    // ── STATS ───────────────────────────────────────────────
    @Transactional(readOnly = true)
    public AdminDto.AdminStatsResponse getStats() {
        return AdminDto.AdminStatsResponse.builder()
                .totalStudents(userRepository.findByRole("STUDENT").stream().count())
                .totalAdmins(userRepository.findByRole("ADMIN").stream().count())
                .totalLordes(userRepository.findByRole("LORDE").stream().count())
                .totalQuizzes((long) quizRepository.findAll().size())
                .totalCourses((long) courseRepository.findAll().size())
                .totalAttempts((long) attemptRepository.findAll().size())
                .totalGameSessions((long) gameSessionRepository.findAll().size())
                .totalBadgesAwarded((long) userBadgeRepository.findAll().size())
                .build();
    }

    // ── COURSES ─────────────────────────────────────────────
    @Transactional(readOnly = true)
    public List<AdminDto.CourseResponse> getAllCourses() {
        return courseRepository.findAll().stream().map(c -> AdminDto.CourseResponse.builder()
                .courseId(c.getCourseId())
                .name(c.getName())
                .description(c.getDescription())
                .createdByName(c.getCreatedBy().getName())
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public AdminDto.CourseResponse createCourse(AdminDto.CreateCourseRequest req, User admin) {
        if (courseRepository.existsByName(req.getName())) {
            throw new BadRequestException("A course with the name '" + req.getName() + "' already exists");
        }
        Course course = Course.builder()
                .name(req.getName())
                .description(req.getDescription())
                .createdBy(admin)
                .build();
        Course saved = courseRepository.save(course);
        return AdminDto.CourseResponse.builder()
                .courseId(saved.getCourseId())
                .name(saved.getName())
                .description(saved.getDescription())
                .createdByName(admin.getName())
                .build();
    }

    @Transactional
    public AdminDto.CourseResponse updateCourse(Long courseId, AdminDto.CreateCourseRequest req) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
        course.setName(req.getName());
        course.setDescription(req.getDescription());
        Course saved = courseRepository.save(course);
        return AdminDto.CourseResponse.builder()
                .courseId(saved.getCourseId())
                .name(saved.getName())
                .description(saved.getDescription())
                .createdByName(saved.getCreatedBy().getName())
                .build();
    }

    @Transactional
    public void deleteCourse(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("Course not found with id: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }

    // ── CATEGORIES ──────────────────────────────────────────
    @Transactional(readOnly = true)
    public List<AdminDto.CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream().map(c -> AdminDto.CategoryResponse.builder()
                .categoryId(c.getCategoryId())
                .name(c.getName())
                .description(c.getDescription())
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public AdminDto.CategoryResponse createCategory(AdminDto.CreateCategoryRequest req) {
        if (categoryRepository.existsByName(req.getName())) {
            throw new BadRequestException("A category with the name '" + req.getName() + "' already exists");
        }
        Category category = Category.builder()
                .name(req.getName())
                .description(req.getDescription())
                .build();
        Category saved = categoryRepository.save(category);
        return AdminDto.CategoryResponse.builder()
                .categoryId(saved.getCategoryId())
                .name(saved.getName())
                .description(saved.getDescription())
                .build();
    }

    @Transactional
    public void deleteCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }
        categoryRepository.deleteById(categoryId);
    }

    // ── QUIZZES ─────────────────────────────────────────────
    @Transactional
    public Quiz createQuiz(AdminDto.CreateQuizRequest req, User admin) {
        Course course = courseRepository.findById(req.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + req.getCourseId()));
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + req.getCategoryId()));

        Quiz quiz = Quiz.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .course(course)
                .category(category)
                .timeLimit(req.getTimeLimit())
                .createdBy(admin)
                .build();

        Quiz savedQuiz = quizRepository.save(quiz);

        if (req.getQuestions() != null) {
            for (AdminDto.CreateQuestionRequest q : req.getQuestions()) {
                Question question = Question.builder()
                        .quiz(savedQuiz)
                        .questionText(q.getQuestionText())
                        .optionA(q.getOptionA())
                        .optionB(q.getOptionB())
                        .optionC(q.getOptionC())
                        .optionD(q.getOptionD())
                        .correctAnswer(q.getCorrectAnswer().toLowerCase().trim())
                        .questionOrder(q.getQuestionOrder())
                        .build();
                questionRepository.save(question);
            }
        }
        return savedQuiz;
    }

    @Transactional
    public void deleteQuiz(Long quizId) {
        if (!quizRepository.existsById(quizId)) {
            throw new ResourceNotFoundException("Quiz not found with id: " + quizId);
        }
        quizRepository.deleteById(quizId);
    }

    // ── USER MANAGEMENT ─────────────────────────────────────
    @Transactional(readOnly = true)
    public List<AdminDto.UserSummaryResponse> getAllUsers() {
        return userRepository.findAll().stream().map(u -> AdminDto.UserSummaryResponse.builder()
                .userId(u.getUserId())
                .name(u.getName())
                .email(u.getEmail())
                .role(u.getRole())
                .createdAt(u.getCreatedAt() != null ? u.getCreatedAt().toString() : null)
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public AdminDto.UserSummaryResponse updateUserRole(Long userId, AdminDto.UpdateUserRoleRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        String newRole = req.getRole().toUpperCase();
        if (!newRole.equals("STUDENT") && !newRole.equals("ADMIN") && !newRole.equals("LORDE")) {
            throw new BadRequestException("Invalid role: " + req.getRole());
        }

        user.setRole(newRole);
        User saved = userRepository.save(user);

        return AdminDto.UserSummaryResponse.builder()
                .userId(saved.getUserId())
                .name(saved.getName())
                .email(saved.getEmail())
                .role(saved.getRole())
                .createdAt(saved.getCreatedAt() != null ? saved.getCreatedAt().toString() : null)
                .build();
    }

    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }
}
