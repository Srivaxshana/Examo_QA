package com.examo.examo_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentExamDto {
    private Long examId;
    private String title;
    private String subject;
    private Integer duration;
    private Integer maxMarks;
    private String description;
    private List<StudentQuestionDto> questions;
}
