package com.campusquizbattle.repository;

import com.campusquizbattle.model.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    List<UserBadge> findByUser_UserId(Long userId);
    List<UserBadge> findByUser_UserIdAndBadge_Category(Long userId, String category);
    Optional<UserBadge> findByUser_UserIdAndBadge_BadgeId(Long userId, Long badgeId);
    boolean existsByUser_UserIdAndBadge_Code(Long userId, String badgeCode);

    @Query("SELECT COALESCE(SUM(ub.badge.badgePoints), 0) FROM UserBadge ub WHERE ub.user.userId = :userId AND ub.badge.category = :category")
    Integer sumBadgePointsByUserIdAndCategory(@Param("userId") Long userId, @Param("category") String category);
}
