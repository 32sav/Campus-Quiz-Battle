package com.campusquizbattle.controller;

import com.campusquizbattle.dto.QuizDto;
import com.campusquizbattle.model.User;
import com.campusquizbattle.repository.UserRepository;
import com.campusquizbattle.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<QuizDto.QuizSummaryResponse>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<QuizDto.QuizDetailResponse> getQuizForTaking(@PathVariable Long quizId) {
        return ResponseEntity.ok(quizService.getQuizForTaking(quizId));
    }

    @PostMapping("/{quizId}/submit")
    public ResponseEntity<QuizDto.AttemptResultResponse> submitQuiz(
            @PathVariable Long quizId,
            @Valid @RequestBody QuizDto.QuizSubmitRequest submitRequest,
            Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        return ResponseEntity.ok(quizService.submitQuiz(quizId, user, submitRequest));
    }
}
