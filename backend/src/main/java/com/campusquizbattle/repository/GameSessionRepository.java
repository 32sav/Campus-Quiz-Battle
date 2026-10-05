package com.campusquizbattle.repository;

import com.campusquizbattle.model.GameSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
    List<GameSession> findByStatusOrderByScheduledDateAscScheduledTimeAsc(String status);
    List<GameSession> findByLorde_UserId(Long lordeId);
    List<GameSession> findByScheduledDate(LocalDate date);
}
