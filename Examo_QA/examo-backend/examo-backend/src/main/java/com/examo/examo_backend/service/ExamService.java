package com.examo.examo_backend.service;

import com.examo.examo_backend.dto.ExamDto;

import java.util.List;

public interface ExamService {
    ExamDto createExam(ExamDto examDto);

    ExamDto getExamByExamId(Long examId);

    List<ExamDto> getAllExams();

    ExamDto updateExam (Long examId , ExamDto updateExam);

    void deleteExam (Long examId);


}
