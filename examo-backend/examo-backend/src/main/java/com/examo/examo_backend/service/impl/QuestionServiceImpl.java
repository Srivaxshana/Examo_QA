package com.examo.examo_backend.service.impl;

import com.examo.examo_backend.dto.QuestionDto;
import com.examo.examo_backend.entity.Question;
import com.examo.examo_backend.exception.ResourceNotFoundException;
import com.examo.examo_backend.mapper.QuestionMapper;
import com.examo.examo_backend.repository.QuestionRepository;
import com.examo.examo_backend.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.examo.examo_backend.entity.Exam;
import com.examo.examo_backend.repository.ExamRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private QuestionRepository questionRepository;
    private ExamRepository examRepository;

    @Override
    public QuestionDto createQuestion(QuestionDto questionDto) {
        Question question = QuestionMapper.mapToQuestion(questionDto);

        if (questionDto.getExamId() != null) {
            Exam exam = examRepository.findById(questionDto.getExamId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Exam not found with id: " + questionDto.getExamId()));
            question.setExam(exam);
        }

        Question savedQuestion = questionRepository.save(question);
        return QuestionMapper.mapToQuestionDto(savedQuestion);
    }

    @Override
    public QuestionDto getQuestionByQuestionId(Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Question is not exists with given id: "+ questionId));
        return QuestionMapper.mapToQuestionDto(question);
    }

    @Override
    public List<QuestionDto> getAllQuestions() {
        List<Question> questions= questionRepository.findAll();
        return questions.stream().map((question) -> QuestionMapper.mapToQuestionDto(question))
                .collect(Collectors.toList());
    }

    @Override
    public QuestionDto updateQuestion(Long questionId, QuestionDto updateQuestion) {
        Question question = questionRepository.findById(questionId).orElseThrow(
                ()-> new ResourceNotFoundException("Question is not exists with given id: "+ questionId));

        question.setQuestionText(updateQuestion.getQuestionText());
        question.setOptionA(updateQuestion.getOptionA());
        question.setOptionB(updateQuestion.getOptionB());
        question.setOptionC(updateQuestion.getOptionC());
        question.setOptionD(updateQuestion.getOptionD());
        question.setCorrectOption(updateQuestion.getCorrectOption());
        question.setCreatedAt(updateQuestion.getCreatedAt());
        question.setUpdatedAt(updateQuestion.getUpdatedAt());


        if (updateQuestion.getExamId() != null) {
            if (question.getExam() == null ||
                    !question.getExam().getExamId().equals(updateQuestion.getExamId())) {
                Exam exam = examRepository.findById(updateQuestion.getExamId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Exam not found with id: " + updateQuestion.getExamId()));
                question.setExam(exam);
            }
        }

        Question updatedQuestionObj = questionRepository.save(question);

        return QuestionMapper.mapToQuestionDto(updatedQuestionObj);


    }

    @Override
    public void deleteQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(
                ()-> new ResourceNotFoundException("Question is not exists with given id: "+ questionId));
        questionRepository.deleteById(questionId);
    }




    @Override
    public List<QuestionDto> getQuestionsByExamId(Long examId) {

        examRepository.findById(examId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Exam not found with id: " + examId));

        List<Question> questions = questionRepository.findByExamExamId(examId);
        return questions.stream()
                .map(QuestionMapper::mapToQuestionDto)
                .collect(Collectors.toList());
    }

}
