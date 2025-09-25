package com.examo.examo_backend.mapper;

import com.examo.examo_backend.dto.ExamDto;
import com.examo.examo_backend.entity.Exam;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class ExamMapper {

    public static ExamDto mapToExamDto(Exam exam){
        return new ExamDto(
                exam.getExamId(),
                exam.getTitle(),
                exam.getSubject(),
                exam.getDuration(),
                exam.getNoOfQuestions(),

                exam.getMaxMarks(),
                exam.getCreatedAt(),
                exam.getUpdatedAt(),
                exam.getDescription(),
                exam.getIsActive(),
                exam.getQuestions() != null
                        ? exam.getQuestions().stream()
                        .map(QuestionMapper::mapToQuestionDto)
                        .collect(Collectors.toList())
                        : new ArrayList<>()
        );
    }

    public static Exam mapToExam (ExamDto examDto){

        Exam exam = new Exam();
        exam.setExamId(examDto.getExamId());
        exam.setTitle(examDto.getTitle());
        exam.setSubject(examDto.getSubject());
        exam.setDuration(examDto.getDuration());
        exam.setNoOfQuestions(examDto.getNoOfQuestions());
        exam.setMaxMarks(examDto.getMaxMarks());
        exam.setCreatedAt(examDto.getCreatedAt());
        exam.setUpdatedAt(examDto.getUpdatedAt());
        exam.setDescription(examDto.getDescription());
        exam.setIsActive(examDto.getIsActive());


        exam.setQuestions(
                examDto.getQuestions() != null
                        ? examDto.getQuestions().stream()
                        .map(QuestionMapper::mapToQuestion)
                        .collect(Collectors.toList())
                        : new ArrayList<>()
        );
        return exam;
    }

}
