package com.examo.examo_backend.service.impl;

import com.examo.examo_backend.dto.AdminExamResultDto;
import com.examo.examo_backend.dto.AnswerReviewDto;
import com.examo.examo_backend.entity.ExamResult;
import com.examo.examo_backend.exception.ResourceNotFoundException;
import com.examo.examo_backend.repository.ExamResultRepository;
import com.examo.examo_backend.service.AdminResultService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdminResultServiceImpl implements AdminResultService {

    private ExamResultRepository examResultRepository;

    @Override
    public List<AdminExamResultDto> getAllExamResults() {
        List<ExamResult> results = examResultRepository.findAllWithExamAndAnswers();
        return results.stream()
                .map(this::mapToAdminResultDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AdminExamResultDto> getResultsByExamId(Long examId) {
        List<ExamResult> results = examResultRepository.findByExamExamIdWithDetails(examId);
        return results.stream()
                .map(this::mapToAdminResultDto)
                .collect(Collectors.toList());
    }

    @Override
    public AdminExamResultDto getDetailedResult(Long resultId) {
        ExamResult result = examResultRepository.findByIdWithAllDetails(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found with id: " + resultId));
        return mapToDetailedAdminResultDto(result);
    }

    @Override
    public void deleteResult(Long resultId) {
        ExamResult result = examResultRepository.findById(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found with id: " + resultId));
        examResultRepository.delete(result);
    }

    private AdminExamResultDto mapToAdminResultDto(ExamResult result) {
        int correctAnswers = (int) result.getStudentAnswers().stream()
                .mapToLong(sa -> sa.getIsCorrect() ? 1 : 0).sum();
        int wrongAnswers = (int) result.getStudentAnswers().stream()
                .mapToLong(sa -> !sa.getIsCorrect() && sa.getStudentAnswer() != null ? 1 : 0).sum();
        int unanswered = (int) result.getStudentAnswers().stream()
                .mapToLong(sa -> sa.getStudentAnswer() == null ? 1 : 0).sum();

        return new AdminExamResultDto(
                result.getResultId(),
                result.getStudentName(),
                result.getStudentEmail(),
                result.getExam().getExamId(),
                result.getExam().getTitle(),
                result.getExam().getSubject(),
                result.getScore(),
                result.getMaxScore(),
                result.getPercentage(),
                result.getTimeTaken(),
                result.getExam().getDuration(),
                result.getStartedAt(),
                result.getCompletedAt(),
                result.getStudentAnswers().size(),
                correctAnswers,
                wrongAnswers,
                unanswered,
                calculateGrade(result.getPercentage()),
                null // Don't include detailed answers in summary view
        );
    }

    private AdminExamResultDto mapToDetailedAdminResultDto(ExamResult result) {
        AdminExamResultDto dto = mapToAdminResultDto(result);

        // Add detailed answers
        List<AnswerReviewDto> detailedAnswers = result.getStudentAnswers().stream()
                .map(sa -> new AnswerReviewDto(
                        sa.getQuestion().getQuestionId(),
                        sa.getQuestion().getQuestionText(),
                        sa.getQuestion().getOptionA(),
                        sa.getQuestion().getOptionB(),
                        sa.getQuestion().getOptionC(),
                        sa.getQuestion().getOptionD(),
                        sa.getQuestion().getCorrectOption(),
                        sa.getStudentAnswer(),
                        sa.getIsCorrect()
                ))
                .collect(Collectors.toList());

        dto.setDetailedAnswers(detailedAnswers);
        return dto;
    }

    private String calculateGrade(Double percentage) {
        if (percentage >= 75) return "A";
        if (percentage >= 65) return "B";
        if (percentage >= 55) return "C";
        if (percentage >= 45) return "S";
        return "F";
    }
}