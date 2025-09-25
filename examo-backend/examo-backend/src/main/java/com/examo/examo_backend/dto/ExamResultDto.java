package com.examo.examo_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamResultDto {
    private Long resultId;
    private String studentName;
    private String studentEmail;
    private String examTitle;
    private Integer score;
    private Integer maxScore;
    private Double percentage;
    private Integer timeTaken;
    private LocalDateTime completedAt;
    private List<AnswerReviewDto> answers;
}