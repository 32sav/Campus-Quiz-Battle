package com.campusquizbattle.service;

import com.campusquizbattle.dto.QuizDto;
import com.campusquizbattle.model.*;
import com.campusquizbattle.repository.AttemptAnswerRepository;
import com.campusquizbattle.repository.AttemptRepository;
import com.campusquizbattle.repository.QuestionRepository;
import com.campusquizbattle.repository.QuizRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QuizServiceTest {

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private AttemptRepository attemptRepository;

    @Mock
    private AttemptAnswerRepository attemptAnswerRepository;

    @Mock
    private BadgeEvaluationService badgeEvaluationService;

    @InjectMocks
    private QuizService quizService;

    private User sampleUser;
    private Course sampleCourse;
    private Category sampleCategory;
    private Quiz sampleQuiz;
    private Question question1;
    private Question question2;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder().userId(1L).name("Scholar Jane").email("jane@campus.edu").role("STUDENT").build();

        sampleCourse = Course.builder().courseId(10L).name("Computer Science 101").build();
        sampleCategory = Category.builder().categoryId(20L).name("Midterms").build();

        sampleQuiz = Quiz.builder()
                .quizId(100L)
                .title("Algorithms Quiz 1")
                .description("Intro to Sorting & Searching")
                .course(sampleCourse)
                .category(sampleCategory)
                .timeLimit(15)
                .questions(new ArrayList<>())
                .build();

        question1 = Question.builder()
                .questionId(1L)
                .quiz(sampleQuiz)
                .questionText("What is the time complexity of binary search?")
                .optionA("O(n)")
                .optionB("O(log n)")
                .optionC("O(n^2)")
                .optionD("O(1)")
                .correctAnswer("b")
                .questionOrder(1)
                .build();

        question2 = Question.builder()
                .questionId(2L)
                .quiz(sampleQuiz)
                .questionText("Which data structure operates on LIFO?")
                .optionA("Queue")
                .optionB("Stack")
                .optionC("Array")
                .optionD("Graph")
                .correctAnswer("b")
                .questionOrder(2)
                .build();

        sampleQuiz.getQuestions().add(question1);
        sampleQuiz.getQuestions().add(question2);
    }

    @Test
    @DisplayName("Get all quizzes returns summary responses")
    void testGetAllQuizzes() {
        when(quizRepository.findAll()).thenReturn(List.of(sampleQuiz));

        List<QuizDto.QuizSummaryResponse> result = quizService.getAllQuizzes();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Algorithms Quiz 1", result.get(0).getTitle());
        assertEquals("Computer Science 101", result.get(0).getCourseName());
        assertEquals(15, result.get(0).getTimeLimit());
    }

    @Test
    @DisplayName("Get quiz for taking hides correct answers and orders questions")
    void testGetQuizForTaking() {
        when(quizRepository.findById(100L)).thenReturn(Optional.of(sampleQuiz));
        when(questionRepository.findByQuiz_QuizIdOrderByQuestionOrderAsc(100L))
                .thenReturn(List.of(question1, question2));

        QuizDto.QuizDetailResponse response = quizService.getQuizForTaking(100L);

        assertNotNull(response);
        assertEquals(100L, response.getQuizId());
        assertEquals(2, response.getQuestions().size());
        assertEquals("What is the time complexity of binary search?", response.getQuestions().get(0).getQuestionText());
    }

    @Test
    @DisplayName("Submit quiz calculates score, percentage, and evaluates badges")
    void testSubmitQuizFullMarks() {
        when(quizRepository.findById(100L)).thenReturn(Optional.of(sampleQuiz));
        when(questionRepository.findByQuiz_QuizIdOrderByQuestionOrderAsc(100L))
                .thenReturn(List.of(question1, question2));

        Attempt savedAttempt = Attempt.builder()
                .attemptId(500L)
                .quiz(sampleQuiz)
                .user(sampleUser)
                .score(2)
                .totalQuestions(2)
                .percentage(BigDecimal.valueOf(100.00))
                .build();

        when(attemptRepository.save(any(Attempt.class))).thenReturn(savedAttempt);
        when(badgeEvaluationService.evaluateQuizBadges(eq(sampleUser), any())).thenReturn(Collections.emptyList());

        QuizDto.QuizSubmitRequest request = QuizDto.QuizSubmitRequest.builder()
                .answers(List.of(
                        QuizDto.SubmitAnswerItem.builder().questionId(1L).answer("b").timeTaken(10).build(),
                        QuizDto.SubmitAnswerItem.builder().questionId(2L).answer("b").timeTaken(12).build()
                ))
                .build();

        QuizDto.AttemptResultResponse result = quizService.submitQuiz(100L, sampleUser, request);

        assertNotNull(result);
        assertEquals(2, result.getScore());
        assertEquals(2, result.getTotalQuestions());
        assertEquals(BigDecimal.valueOf(100.00), result.getPercentage());
        verify(attemptRepository).save(any(Attempt.class));
        verify(attemptAnswerRepository, times(2)).save(any(AttemptAnswer.class));
        verify(badgeEvaluationService).evaluateQuizBadges(eq(sampleUser), any());
    }

    @Test
    @DisplayName("Submit quiz calculates partial score correctly")
    void testSubmitQuizPartialScore() {
        when(quizRepository.findById(100L)).thenReturn(Optional.of(sampleQuiz));
        when(questionRepository.findByQuiz_QuizIdOrderByQuestionOrderAsc(100L))
                .thenReturn(List.of(question1, question2));

        Attempt savedAttempt = Attempt.builder()
                .attemptId(501L)
                .quiz(sampleQuiz)
                .user(sampleUser)
                .score(1)
                .totalQuestions(2)
                .percentage(BigDecimal.valueOf(50.00))
                .build();

        when(attemptRepository.save(any(Attempt.class))).thenReturn(savedAttempt);
        when(badgeEvaluationService.evaluateQuizBadges(eq(sampleUser), any())).thenReturn(Collections.emptyList());

        QuizDto.QuizSubmitRequest request = QuizDto.QuizSubmitRequest.builder()
                .answers(List.of(
                        QuizDto.SubmitAnswerItem.builder().questionId(1L).answer("b").timeTaken(10).build(),
                        QuizDto.SubmitAnswerItem.builder().questionId(2L).answer("a").timeTaken(12).build() // wrong
                ))
                .build();

        QuizDto.AttemptResultResponse result = quizService.submitQuiz(100L, sampleUser, request);

        assertNotNull(result);
        assertEquals(1, result.getScore());
        assertEquals(BigDecimal.valueOf(50.00), result.getPercentage());
    }
}
