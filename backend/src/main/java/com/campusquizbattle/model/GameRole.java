package com.campusquizbattle.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game_roles", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"game_type_id", "role_name"})
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_role_id")
    private Long gameRoleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_type_id", nullable = false)
    private GameType gameType;

    @Column(name = "role_name", nullable = false, length = 100)
    private String roleName;

    @Column(name = "role_description", columnDefinition = "TEXT")
    private String roleDescription;

    @Column(name = "winner_points", nullable = false)
    private Integer winnerPoints;

    @Column(name = "loser_points", nullable = false)
    private Integer loserPoints;

    @Column(name = "role_order", nullable = false)
    private Integer roleOrder;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
