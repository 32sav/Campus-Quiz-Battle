package com.campusquizbattle.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class GameDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateGameSessionRequest {
        @NotNull
        private Long gameTypeId;

        @NotBlank
        private String title;

        private String description;

        @NotNull
        private LocalDate scheduledDate;

        @NotNull
        private LocalTime scheduledTime;

        @NotBlank
        private String location;

        @NotNull
        @Min(2)
        private Integer maxParticipants;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GameSessionResponse {
        private Long gameSessionId;
        private Long gameTypeId;
        private String gameTypeName;
        private Long lordeId;
        private String lordeName;
        private String title;
        private String description;
        private LocalDate scheduledDate;
        private LocalTime scheduledTime;
        private String location;
        private Integer maxParticipants;
        private Integer currentParticipantsCount;
        private String status;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecordGameResultItem {
        @NotNull
        private Long userId;
        @NotBlank
        private String assignedRole;
        @NotNull
        private Boolean isWinner;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecordGameResultsRequest {
        @NotNull
        private List<RecordGameResultItem> results;
    }
}
