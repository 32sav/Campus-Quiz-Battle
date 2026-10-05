package com.campusquizbattle.service;

import com.campusquizbattle.dto.BadgeDto;
import com.campusquizbattle.dto.QuizDto;
import com.campusquizbattle.exception.BadRequestException;
import com.campusquizbattle.exception.ResourceNotFoundException;
import com.campusquizbattle.model.*;
import com.campusquizbattle.repository.AttemptAnswerRepository;
import com.campusquizbattle.repository.AttemptRepository;
import com.campusquizbattle.repository.QuestionRepository;
import com.campusquizbattle.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final AttemptRepository attemptRepository;
    private final AttemptAnswerRepository attemptAnswerRepository;
    private final BadgeEvaluationService badgeEvaluationService;

    @Transactional(readOnly = true)
    public List<QuizDto.QuizSummaryResponse> getAllQuizzes() {
        return quizRepository.findAll().stream().map(q -> QuizDto.QuizSummaryResponse.builder()
                .quizId(q.getQuizId())
                .title(q.getTitle())
                .description(q.getDescription())
                .courseName(q.getCourse().getName())
                .categoryName(q.getCategory().getName())
                .timeLimit(q.getTimeLimit())
                .totalQuestions(q.getQuestions().size())
                .build()
        ).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public QuizDto.QuizDetailResponse getQuizForTaking(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        List<Question> questions = questionRepository.findByQuiz_QuizIdOrderByQuestionOrderAsc(quizId);

        List<QuizDto.QuestionResponse> questionDtos = questions.stream().map(q -> QuizDto.QuestionResponse.builder()
                .questionId(q.getQuestionId())
                .questionText(q.getQuestionText())
                .optionA(q.getOptionA())
                .optionB(q.getOptionB())
                .optionC(q.getOptionC())
                .optionD(q.getOptionD())
                .questionOrder(q.getQuestionOrder())
                .build()
        ).collect(Collectors.toList());

        return QuizDto.QuizDetailResponse.builder()
                .quizId(quiz.getQuizId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .courseName(quiz.getCourse().getName())
                .categoryName(quiz.getCategory().getName())
                .timeLimit(quiz.getTimeLimit())
                .questions(questionDtos)
                .build();
    }

    @Transactional
    public QuizDto.AttemptResultResponse submitQuiz(Long quizId, User user, QuizDto.QuizSubmitRequest submitRequest) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        List<Question> questions = questionRepository.findByQuiz_QuizIdOrderByQuestionOrderAsc(quizId);
        if (questions.isEmpty()) {
            throw new BadRequestException("Quiz has no questions configured");
        }

        Map<Long, Question> questionMap = questions.stream()
                .collect(Collectors.toMap(Question::getQuestionId, q -> q));

        int correctCount = 0;
        List<AttemptAnswer> answersToSave = new ArrayList<>();

        for (QuizDto.SubmitAnswerItem answerItem : submitRequest.getAnswers()) {
            Question question = questionMap.get(answerItem.getQuestionId());
            if (question != null) {
                boolean isCorrect = question.getCorrectAnswer().equalsIgnoreCase(answerItem.getAnswer().trim());
                if (isCorrect) {
                    correctCount++;
                }

                AttemptAnswer attemptAnswer = AttemptAnswer.builder()
                        .question(question)
                        .userAnswer(answerItem.getAnswer().toLowerCase().trim())
                        .isCorrect(isCorrect)
                        .timeTaken(answerItem.getTimeTaken())
                        .build();

                answersToSave.add(attemptAnswer);
            }
        }

        BigDecimal percentage = BigDecimal.valueOf(correctCount)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(questions.size()), 2, RoundingMode.HALF_UP);

        LocalDateTime now = LocalDateTime.now();

        Attempt attempt = Attempt.builder()
                .user(user)
                .quiz(quiz)
                .score(correctCount)
                .totalQuestions(questions.size())
                .percentage(percentage)
                .startedAt(now.minusMinutes(quiz.getTimeLimit()))
                .completedAt(now)
                .submittedAt(now)
                .build();

        Attempt savedAttempt = attemptRepository.save(attempt);

        for (AttemptAnswer ans : answersToSave) {
            ans.setAttempt(savedAttempt);
            attemptAnswerRepository.save(ans);
        }

        // Automatic evaluation for academic badges
        List<BadgeDto.BadgeResponse> newlyEarned = badgeEvaluationService.evaluateQuizBadges(user, percentage);

        return QuizDto.AttemptResultResponse.builder()
                .attemptId(savedAttempt.getAttemptId())
                .quizId(quiz.getQuizId())
                .quizTitle(quiz.getTitle())
                .score(correctCount)
                .totalQuestions(questions.size())
                .percentage(percentage)
                .submittedAt(now)
                .newlyEarnedBadges(newlyEarned)
                .build();
    }
}
