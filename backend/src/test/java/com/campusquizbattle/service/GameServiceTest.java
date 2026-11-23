package com.campusquizbattle.service;

import com.campusquizbattle.dto.GameDto;
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

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class GameServiceTest {

    @Mock
    private GameSessionRepository gameSessionRepository;

    @Mock
    private GameTypeRepository gameTypeRepository;

    @Mock
    private GameParticipantRepository gameParticipantRepository;

    @Mock
    private GameResultRepository gameResultRepository;

    @Mock
    private GameRoleRepository gameRoleRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BadgeEvaluationService badgeEvaluationService;

    @InjectMocks
    private GameService gameService;

    private User sampleLorde;
    private User sampleStudent;
    private GameType sampleGameType;
    private GameSession sampleSession;

    @BeforeEach
    void setUp() {
        sampleLorde = User.builder().userId(10L).name("Lorde Master").email("lorde@campus.edu").role("LORDE").build();
        sampleStudent = User.builder().userId(20L).name("Player One").email("p1@campus.edu").role("STUDENT").build();

        sampleGameType = GameType.builder().gameTypeId(1L).name("Mafia").description("Social deduction").build();

        sampleSession = GameSession.builder()
                .gameSessionId(100L)
                .gameType(sampleGameType)
                .lorde(sampleLorde)
                .title("Friday Hall Mafia")
                .description("Night game")
                .scheduledDate(LocalDate.now().plusDays(2))
                .scheduledTime(LocalTime.of(18, 0))
                .location("Student Lounge 204")
                .maxParticipants(10)
                .status("WAITING")
                .participants(new ArrayList<>())
                .build();
    }

    @Test
    @DisplayName("Create game session persists session with WAITING status")
    void testCreateSession() {
        GameDto.CreateGameSessionRequest request = GameDto.CreateGameSessionRequest.builder()
                .gameTypeId(1L)
                .title("Friday Hall Mafia")
                .description("Night game")
                .scheduledDate(LocalDate.now().plusDays(2))
                .scheduledTime(LocalTime.of(18, 0))
                .location("Student Lounge 204")
                .maxParticipants(10)
                .build();

        when(gameTypeRepository.findById(1L)).thenReturn(Optional.of(sampleGameType));
        when(gameSessionRepository.save(any(GameSession.class))).thenReturn(sampleSession);

        GameDto.GameSessionResponse response = gameService.createSession(sampleLorde, request);

        assertNotNull(response);
        assertEquals("Friday Hall Mafia", response.getTitle());
        assertEquals("WAITING", response.getStatus());
        assertEquals("Mafia", response.getGameTypeName());
    }

    @Test
    @DisplayName("Sign up student for game session adds participant")
    void testSignUpForGameSuccess() {
        when(gameSessionRepository.findById(100L)).thenReturn(Optional.of(sampleSession));
        when(gameParticipantRepository.existsByGameSessionAndUser(sampleSession, sampleStudent)).thenReturn(false);
        when(gameParticipantRepository.countByGameSession(sampleSession)).thenReturn(5);

        assertDoesNotThrow(() -> gameService.signUpForGame(100L, sampleStudent));
        verify(gameParticipantRepository).save(any(GameParticipant.class));
    }

    @Test
    @DisplayName("Sign up throws BadRequestException when session is full")
    void testSignUpFullSession() {
        when(gameSessionRepository.findById(100L)).thenReturn(Optional.of(sampleSession));
        when(gameParticipantRepository.existsByGameSessionAndUser(sampleSession, sampleStudent)).thenReturn(false);
        when(gameParticipantRepository.countByGameSession(sampleSession)).thenReturn(10); // max is 10

        assertThrows(BadRequestException.class, () -> gameService.signUpForGame(100L, sampleStudent));
        verify(gameParticipantRepository, never()).save(any(GameParticipant.class));
    }

    @Test
    @DisplayName("Sign up throws BadRequestException when student already signed up")
    void testSignUpAlreadyJoined() {
        when(gameSessionRepository.findById(100L)).thenReturn(Optional.of(sampleSession));
        when(gameParticipantRepository.existsByGameSessionAndUser(sampleSession, sampleStudent)).thenReturn(true);

        assertThrows(BadRequestException.class, () -> gameService.signUpForGame(100L, sampleStudent));
    }
}
