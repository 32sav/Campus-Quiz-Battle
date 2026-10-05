package com.campusquizbattle.service;

import com.campusquizbattle.dto.GameDto;
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
public class GameService {

    private final GameSessionRepository gameSessionRepository;
    private final GameTypeRepository gameTypeRepository;
    private final GameParticipantRepository gameParticipantRepository;
    private final GameResultRepository gameResultRepository;
    private final GameRoleRepository gameRoleRepository;
    private final UserRepository userRepository;
    private final BadgeEvaluationService badgeEvaluationService;

    @Transactional(readOnly = true)
    public List<GameDto.GameSessionResponse> getUpcomingSessions() {
        return gameSessionRepository.findByStatusOrderByScheduledDateAscScheduledTimeAsc("WAITING")
                .stream().map(this::mapToSessionResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public GameDto.GameSessionResponse createSession(User lorde, GameDto.CreateGameSessionRequest request) {
        GameType gameType = gameTypeRepository.findById(request.getGameTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Game type not found with id: " + request.getGameTypeId()));

        GameSession session = GameSession.builder()
                .gameType(gameType)
                .lorde(lorde)
                .title(request.getTitle())
                .description(request.getDescription())
                .scheduledDate(request.getScheduledDate())
                .scheduledTime(request.getScheduledTime())
                .location(request.getLocation())
                .maxParticipants(request.getMaxParticipants())
                .status("WAITING")
                .build();

        GameSession saved = gameSessionRepository.save(session);
        return mapToSessionResponse(saved);
    }

    @Transactional
    public void signUpForGame(Long sessionId, User student) {
        GameSession session = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Game session not found with id: " + sessionId));

        if (!"WAITING".equalsIgnoreCase(session.getStatus())) {
            throw new BadRequestException("Cannot sign up for game that is not in WAITING status");
        }

        if (gameParticipantRepository.existsByGameSession_GameSessionIdAndUser_UserIdAndCancelledAtIsNull(sessionId, student.getUserId())) {
            throw new BadRequestException("User already signed up for this session");
        }

        long currentCount = gameParticipantRepository.countByGameSession_GameSessionIdAndCancelledAtIsNull(sessionId);
        if (currentCount >= session.getMaxParticipants()) {
            throw new BadRequestException("Game session has reached maximum capacity");
        }

        GameParticipant participant = GameParticipant.builder()
                .gameSession(session)
                .user(student)
                .build();

        gameParticipantRepository.save(participant);
    }

    @Transactional
    public void recordGameResults(Long sessionId, GameDto.RecordGameResultsRequest request) {
        GameSession session = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Game session not found with id: " + sessionId));

        for (GameDto.RecordGameResultItem item : request.getResults()) {
            User student = userRepository.findById(item.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + item.getUserId()));

            int points = 50; // default points
            var roleOpt = gameRoleRepository.findByGameType_GameTypeIdAndRoleName(session.getGameType().getGameTypeId(), item.getAssignedRole());
            if (roleOpt.isPresent()) {
                points = item.getIsWinner() ? roleOpt.get().getWinnerPoints() : roleOpt.get().getLoserPoints();
            }

            GameResult result = GameResult.builder()
                    .gameSession(session)
                    .user(student)
                    .assignedRole(item.getAssignedRole())
                    .isWinner(item.getIsWinner())
                    .pointsEarned(points)
                    .build();

            gameResultRepository.save(result);

            // Automatically evaluate badges for the student after the game result is recorded
            badgeEvaluationService.evaluateGameBadges(student);
        }

        session.setStatus("COMPLETED");
        gameSessionRepository.save(session);
    }

    private GameDto.GameSessionResponse mapToSessionResponse(GameSession s) {
        long currentCount = gameParticipantRepository.countByGameSession_GameSessionIdAndCancelledAtIsNull(s.getGameSessionId());
        return GameDto.GameSessionResponse.builder()
                .gameSessionId(s.getGameSessionId())
                .gameTypeId(s.getGameType().getGameTypeId())
                .gameTypeName(s.getGameType().getName())
                .lordeId(s.getLorde().getUserId())
                .lordeName(s.getLorde().getName())
                .title(s.getTitle())
                .description(s.getDescription())
                .scheduledDate(s.getScheduledDate())
                .scheduledTime(s.getScheduledTime())
                .location(s.getLocation())
                .maxParticipants(s.getMaxParticipants())
                .currentParticipantsCount((int) currentCount)
                .status(s.getStatus())
                .build();
    }
}
