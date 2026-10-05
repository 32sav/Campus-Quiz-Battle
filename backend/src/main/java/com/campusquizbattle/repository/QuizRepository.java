package com.campusquizbattle.repository;

import com.campusquizbattle.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCourse_CourseId(Long courseId);
    List<Quiz> findByCategory_CategoryId(Long categoryId);
}
