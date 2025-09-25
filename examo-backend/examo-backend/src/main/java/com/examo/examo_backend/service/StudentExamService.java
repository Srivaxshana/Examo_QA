package com.examo.examo_backend.service;

import com.examo.examo_backend.dto.*;

import java.util.List;

public interface StudentExamService {

    StudentLoginResponseDto authenticateStudent(StudentAuthDto authDto);

    List<StudentExamDto> getAvailableExams();

    StudentExamDto getExamForStudent(Long examId);

    ExamResultDto submitExam(Long examId, ExamSubmissionDto submission);

    ExamResultDto getExamResult(Long resultId);
}