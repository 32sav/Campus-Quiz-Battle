package com.campusquizbattle.controller;

import com.campusquizbattle.dto.GameDto;
import com.campusquizbattle.model.User;
import com.campusquizbattle.repository.UserRepository;
import com.campusquizbattle.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final UserRepository userRepository;

    @GetMapping("/sessions")
    public ResponseEntity<List<GameDto.GameSessionResponse>> getUpcomingSessions() {
        return ResponseEntity.ok(gameService.getUpcomingSessions());
    }

    @PostMapping("/sessions")
    @PreAuthorize("hasAnyRole('LORDE', 'ADMIN')")
    public ResponseEntity<GameDto.GameSessionResponse> createSession(
            @Valid @RequestBody GameDto.CreateGameSessionRequest request,
            Authentication authentication) {
        User lorde = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        return ResponseEntity.ok(gameService.createSession(lorde, request));
    }

    @PostMapping("/sessions/{sessionId}/signup")
    public ResponseEntity<Map<String, String>> signUpForGame(
            @PathVariable Long sessionId,
            Authentication authentication) {
        User student = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        gameService.signUpForGame(sessionId, student);
        return ResponseEntity.ok(Map.of("message", "Successfully signed up for game session"));
    }

    @PostMapping("/sessions/{sessionId}/results")
    @PreAuthorize("hasAnyRole('LORDE', 'ADMIN')")
    public ResponseEntity<Map<String, String>> recordGameResults(
            @PathVariable Long sessionId,
            @Valid @RequestBody GameDto.RecordGameResultsRequest request) {
        gameService.recordGameResults(sessionId, request);
        return ResponseEntity.ok(Map.of("message", "Game results recorded and badges evaluated successfully"));
    }
}
