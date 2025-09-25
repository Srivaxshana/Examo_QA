package com.examo.examo_backend.service;

import com.examo.examo_backend.dto.QuestionDto;
import com.examo.examo_backend.entity.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface QuestionService {

    QuestionDto createQuestion(QuestionDto questionDto);

    QuestionDto getQuestionByQuestionId(Long questionId);

    List<QuestionDto> getAllQuestions();

    QuestionDto updateQuestion (Long questionId ,  QuestionDto updateQuestion);

    void deleteQuestion ( Long questionId );

    List<QuestionDto> getQuestionsByExamId(Long examId);



}
