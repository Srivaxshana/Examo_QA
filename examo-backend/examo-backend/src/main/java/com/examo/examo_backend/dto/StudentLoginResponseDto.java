package com.examo.examo_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentLoginResponseDto {
    private Long studentId;
    private String fullName;
    private String email;
    private String school;
    private String grade;
    private String message;
}