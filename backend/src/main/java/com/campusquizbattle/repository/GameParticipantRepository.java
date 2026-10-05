package com.campusquizbattle.repository;

import com.campusquizbattle.model.GameParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameParticipantRepository extends JpaRepository<GameParticipant, Long> {
    List<GameParticipant> findByGameSession_GameSessionIdAndCancelledAtIsNull(Long gameSessionId);
    Optional<GameParticipant> findByGameSession_GameSessionIdAndUser_UserId(Long gameSessionId, Long userId);
    boolean existsByGameSession_GameSessionIdAndUser_UserIdAndCancelledAtIsNull(Long gameSessionId, Long userId);
    long countByGameSession_GameSessionIdAndCancelledAtIsNull(Long gameSessionId);
    long countByUser_UserIdAndCancelledAtIsNull(Long userId);
}
