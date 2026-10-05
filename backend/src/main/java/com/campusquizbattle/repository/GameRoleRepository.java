package com.campusquizbattle.repository;

import com.campusquizbattle.model.GameRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRoleRepository extends JpaRepository<GameRole, Long> {
    List<GameRole> findByGameType_GameTypeIdOrderByRoleOrderAsc(Long gameTypeId);
    Optional<GameRole> findByGameType_GameTypeIdAndRoleName(Long gameTypeId, String roleName);
}
