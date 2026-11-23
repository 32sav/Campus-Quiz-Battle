package com.campusquizbattle.service;

import com.campusquizbattle.dto.AdminDto;
import com.campusquizbattle.exception.BadRequestException;
import com.campusquizbattle.model.*;
import com.campusquizbattle.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private AttemptRepository attemptRepository;

    @Mock
    private GameSessionRepository gameSessionRepository;

    @Mock
    private UserBadgeRepository userBadgeRepository;

    @InjectMocks
    private AdminService adminService;

    private User sampleAdmin;
    private Course sampleCourse;
    private Category sampleCategory;

    @BeforeEach
    void setUp() {
        sampleAdmin = User.builder().userId(1L).name("Dean Smith").email("admin@campus.edu").role("ADMIN").build();
        sampleCourse = Course.builder().courseId(10L).name("Mathematics 201").createdBy(sampleAdmin).build();
        sampleCategory = Category.builder().categoryId(20L).name("Weekly Quiz").build();
    }

    @Test
    @DisplayName("Get stats aggregates counts across users, quizzes, attempts, and sessions")
    void testGetStats() {
        when(userRepository.findByRole("STUDENT")).thenReturn(List.of(User.builder().build(), User.builder().build()));
        when(userRepository.findByRole("ADMIN")).thenReturn(List.of(sampleAdmin));
        when(userRepository.findByRole("LORDE")).thenReturn(List.of(User.builder().build()));
        when(quizRepository.findAll()).thenReturn(List.of(Quiz.builder().build(), Quiz.builder().build()));
        when(courseRepository.findAll()).thenReturn(List.of(sampleCourse));
        when(attemptRepository.findAll()).thenReturn(List.of(Attempt.builder().build()));
        when(gameSessionRepository.findAll()).thenReturn(List.of(GameSession.builder().build()));
        when(userBadgeRepository.findAll()).thenReturn(List.of(UserBadge.builder().build()));

        AdminDto.AdminStatsResponse stats = adminService.getStats();

        assertNotNull(stats);
        assertEquals(2L, stats.getTotalStudents());
        assertEquals(1L, stats.getTotalAdmins());
        assertEquals(1L, stats.getTotalLordes());
        assertEquals(2L, stats.getTotalQuizzes());
        assertEquals(1L, stats.getTotalCourses());
        assertEquals(1L, stats.getTotalAttempts());
        assertEquals(1L, stats.getTotalGameSessions());
        assertEquals(1L, stats.getTotalBadgesAwarded());
    }

    @Test
    @DisplayName("Create course succeeds with unique name")
    void testCreateCourseSuccess() {
        AdminDto.CreateCourseRequest request = AdminDto.CreateCourseRequest.builder()
                .name("Mathematics 201")
                .description("Calculus & Algebra")
                .build();

        when(courseRepository.existsByName("Mathematics 201")).thenReturn(false);
        when(courseRepository.save(any(Course.class))).thenReturn(sampleCourse);

        AdminDto.CourseResponse response = adminService.createCourse(request, sampleAdmin);

        assertNotNull(response);
        assertEquals("Mathematics 201", response.getName());
        assertEquals("Dean Smith", response.getCreatedByName());
    }

    @Test
    @DisplayName("Create course with duplicate name throws BadRequestException")
    void testCreateCourseDuplicate() {
        AdminDto.CreateCourseRequest request = AdminDto.CreateCourseRequest.builder()
                .name("Mathematics 201")
                .build();

        when(courseRepository.existsByName("Mathematics 201")).thenReturn(true);

        assertThrows(BadRequestException.class, () -> adminService.createCourse(request, sampleAdmin));
    }

    @Test
    @DisplayName("Update user role promotes student to Lorde")
    void testUpdateUserRole() {
        User student = User.builder().userId(5L).name("Bob").role("STUDENT").build();
        when(userRepository.findById(5L)).thenReturn(Optional.of(student));
        when(userRepository.save(any(User.class))).thenReturn(student);

        AdminDto.UpdateUserRoleRequest req = AdminDto.UpdateUserRoleRequest.builder().role("LORDE").build();
        AdminDto.UserSummaryResponse response = adminService.updateUserRole(5L, req);

        assertNotNull(response);
        assertEquals("LORDE", response.getRole());
        assertEquals("Bob", response.getName());
    }
}
