package com.campusquizbattle.repository;

import com.campusquizbattle.model.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByUser_UserIdOrderBySubmittedAtDesc(Long userId);
    List<Attempt> findByQuiz_QuizIdOrderByPercentageDesc(Long quizId);
    long countByUser_UserId(Long userId);
    long countByUser_UserIdAndPercentageGreaterThanEqual(Long userId, java.math.BigDecimal percentage);
}
