package com.examo.examo_backend.service.impl;

import com.examo.examo_backend.dto.*;
import com.examo.examo_backend.entity.*;
import com.examo.examo_backend.exception.ResourceNotFoundException;
import com.examo.examo_backend.repository.*;
import com.examo.examo_backend.service.StudentExamService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class StudentExamServiceImpl implements StudentExamService {

    private ExamRepository examRepository;
    private QuestionRepository questionRepository;
    private ExamResultRepository examResultRepository;
    private StudentAnswerRepository studentAnswerRepository;
    private StudentRepository studentRepository;

    @Override
    public StudentLoginResponseDto authenticateStudent(StudentAuthDto authDto) {
        Optional<Student> studentOpt = studentRepository.findByEmail(authDto.getEmail());

        if (studentOpt.isEmpty()) {
            return new StudentLoginResponseDto(null, null, null, null, null,
                    "Student not found with email: " + authDto.getEmail());
        }

        Student student = studentOpt.get();

        if (!student.getStudentPassword().equals(authDto.getPassword())) {
            return new StudentLoginResponseDto(null, null, null, null, null,
                    "Invalid password");
        }

        return new StudentLoginResponseDto(
                student.getStudentId(),
                student.getFullName(),
                student.getEmail(),
                student.getSchool(),
                student.getGrade(),
                "Authentication successful"
        );
    }



    @Override
    public List<StudentExamDto> getAvailableExams() {
        List<Exam> activeExams = examRepository.findByIsActiveTrue();
        return activeExams.stream()
                .map(this::mapToStudentExamDto)
                .collect(Collectors.toList());
    }

    @Override
    public StudentExamDto getExamForStudent(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + examId));

        if (!exam.getIsActive()) {
            throw new RuntimeException("This exam is not currently active");
        }

        return mapToStudentExamDto(exam);
    }

    @Override
    public ExamResultDto submitExam(Long examId, ExamSubmissionDto submission) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + examId));


        ExamResult examResult = new ExamResult();
        examResult.setStudentName(submission.getStudentName());
        examResult.setStudentEmail(submission.getStudentEmail());
        examResult.setExam(exam);
        examResult.setMaxScore(exam.getMaxMarks());
        examResult.setTimeTaken(submission.getTimeTaken());
        examResult.setStartedAt(submission.getStartedAt());
        examResult.setCompletedAt(LocalDateTime.now());


        int score = 0;
        List<StudentAnswer> studentAnswers = submission.getAnswers().stream()
                .map(answerDto -> {
                    Question question = questionRepository.findById(answerDto.getQuestionId())
                            .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + answerDto.getQuestionId()));

                    StudentAnswer studentAnswer = new StudentAnswer();
                    studentAnswer.setExamResult(examResult);
                    studentAnswer.setQuestion(question);
                    studentAnswer.setStudentAnswer(answerDto.getAnswer());
                    studentAnswer.setIsCorrect(question.getCorrectOption().equals(answerDto.getAnswer()));

                    return studentAnswer;
                })
                .collect(Collectors.toList());

        score = (int) studentAnswers.stream().mapToLong(sa -> sa.getIsCorrect() ? 1 : 0).sum();
        double percentage = (score * 100.0) / exam.getMaxMarks();

        examResult.setScore(score);
        examResult.setPercentage(percentage);
        examResult.setStudentAnswers(studentAnswers);


        ExamResult savedResult = examResultRepository.save(examResult);

        return mapToExamResultDto(savedResult);
    }

    @Override
    public ExamResultDto getExamResult(Long resultId) {
        ExamResult examResult = examResultRepository.findById(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam result not found with id: " + resultId));

        return mapToExamResultDto(examResult);
    }

    private StudentExamDto mapToStudentExamDto(Exam exam) {
        List<Question> questions = questionRepository.findByExamExamId(exam.getExamId());

        List<StudentQuestionDto> studentQuestions = questions.stream()
                .map(q -> new StudentQuestionDto(
                        q.getQuestionId(),
                        q.getQuestionText(),
                        q.getOptionA(),
                        q.getOptionB(),
                        q.getOptionC(),
                        q.getOptionD()

                ))
                .collect(Collectors.toList());

        return new StudentExamDto(
                exam.getExamId(),
                exam.getTitle(),
                exam.getSubject(),
                exam.getDuration(),
                exam.getMaxMarks(),
                exam.getDescription(),
                studentQuestions
        );
    }

    private ExamResultDto mapToExamResultDto(ExamResult examResult) {
        List<AnswerReviewDto> answerReviews = examResult.getStudentAnswers().stream()
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

        return new ExamResultDto(
                examResult.getResultId(),
                examResult.getStudentName(),
                examResult.getStudentEmail(),
                examResult.getExam().getTitle(),
                examResult.getScore(),
                examResult.getMaxScore(),
                examResult.getPercentage(),
                examResult.getTimeTaken(),
                examResult.getCompletedAt(),
                answerReviews
        );
    }
}