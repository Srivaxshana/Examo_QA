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
public class ExamDto {

    private Long examId;
    private String title;
    private String subject;
    private Integer duration;
    private Integer noOfQuestions;

    private Integer maxMarks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String description;
    private Boolean isActive;
    private List<QuestionDto> questions;

}
