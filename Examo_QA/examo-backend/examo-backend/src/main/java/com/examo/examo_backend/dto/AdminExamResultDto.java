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
public class AdminExamResultDto {
    private Long resultId;
    private String studentName;
    private String studentEmail;
    private Long examId;
    private String examTitle;
    private String examSubject;
    private Integer score;
    private Integer maxScore;
    private Double percentage;
    private Integer timeTaken;
    private Integer examDuration;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer wrongAnswers;
    private Integer unansweredQuestions;
    private String grade;
    private List<AnswerReviewDto> detailedAnswers;
}