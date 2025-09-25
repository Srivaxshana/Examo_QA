package com.examo.examo_backend.service.impl;

import java.util.ArrayList;

import com.examo.examo_backend.dto.ExamDto;
import com.examo.examo_backend.entity.Exam;
import com.examo.examo_backend.exception.ResourceNotFoundException;
import com.examo.examo_backend.mapper.ExamMapper;
import com.examo.examo_backend.mapper.QuestionMapper;
import com.examo.examo_backend.repository.ExamRepository;
import com.examo.examo_backend.service.ExamService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExamServiceImpl implements ExamService {

    private ExamRepository examRepository;

    @Override
    public ExamDto createExam(ExamDto examDto) {

        if (examDto.getTitle() == null || examDto.getTitle().isBlank()) {
            throw new RuntimeException("Exam title cannot be empty");
        }
        Exam exam = ExamMapper.mapToExam(examDto);
        Exam savedExam = examRepository.save(exam);
        return ExamMapper.mapToExamDto(savedExam);
    }

    @Override
    public ExamDto getExamByExamId(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Exam is not exists with given id: " + examId ));
        return ExamMapper.mapToExamDto(exam);
    }

    @Override
    public List<ExamDto> getAllExams() {
        List<Exam> exams = examRepository.findAll();
        return exams.stream().map((exam) -> ExamMapper.mapToExamDto(exam))
                .collect(Collectors.toList());
    }

    @Override
    public ExamDto updateExam(Long examId, ExamDto updateExam) {
        Exam exam = examRepository.findById(examId).orElseThrow(
                ()->new ResourceNotFoundException("Exam is not exists with given id: " + examId)

        );

        exam.setTitle(updateExam.getTitle());
        exam.setSubject(updateExam.getSubject());
        exam.setDuration(updateExam.getDuration());
        exam.setNoOfQuestions(updateExam.getNoOfQuestions());
        exam.setMaxMarks(updateExam.getMaxMarks());
        exam.setCreatedAt(updateExam.getCreatedAt());
        exam.setUpdatedAt(updateExam.getUpdatedAt());
        exam.setDescription(updateExam.getDescription());
        exam.setIsActive(updateExam.getIsActive());

        exam.setQuestions(
                updateExam.getQuestions() != null
                        ? updateExam.getQuestions().stream()
                        .map(QuestionMapper::mapToQuestion)
                        .collect(Collectors.toList())
                        : new ArrayList<>()
        );



        Exam updatedExamObj = examRepository.save(exam);


        return ExamMapper.mapToExamDto(updatedExamObj);
    }

    @Override
    public void deleteExam(Long examId) {
        Exam exam = examRepository.findById(examId).orElseThrow(
                ()->new ResourceNotFoundException("Exam is not exists with given id: " + examId)

        );

        examRepository.deleteById(examId);

    }
}
