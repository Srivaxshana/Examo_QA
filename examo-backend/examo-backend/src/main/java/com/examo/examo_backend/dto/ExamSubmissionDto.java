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
public class ExamSubmissionDto {
    private String studentName;
    private String studentEmail;
    private List<AnswerDto> answers;
    private Integer timeTaken;
    private LocalDateTime startedAt;
}