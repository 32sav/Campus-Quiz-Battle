package com.campusquizbattle.repository;

import com.campusquizbattle.model.GameResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameResultRepository extends JpaRepository<GameResult, Long> {
    List<GameResult> findByGameSession_GameSessionId(Long gameSessionId);
    List<GameResult> findByUser_UserIdOrderByRecordedAtDesc(Long userId);
    Optional<GameResult> findByGameSession_GameSessionIdAndUser_UserId(Long gameSessionId, Long userId);
    long countByUser_UserId(Long userId);
    long countByUser_UserIdAndIsWinnerTrue(Long userId);
}
