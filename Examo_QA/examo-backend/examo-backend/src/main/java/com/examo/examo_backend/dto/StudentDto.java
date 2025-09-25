package com.examo.examo_backend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    private Long studentId;
    private String fullName;
    private String email;
    private String phoneNo;
    private String school;
    private String grade;
    private String studentPassword;
}
