package com.examo.examo_backend.mapper;

import com.examo.examo_backend.dto.QuestionDto;
import com.examo.examo_backend.entity.Question;

public class QuestionMapper {
    public  static QuestionDto mapToQuestionDto (Question question){
        return  new QuestionDto(
              question.getQuestionId(),
              question.getQuestionText(),
              question.getOptionA(),
              question.getOptionB(),
              question.getOptionC(),
              question.getOptionD(),
              question.getCorrectOption(),
              question.getCreatedAt(),
              question.getUpdatedAt(),
                question.getExam() != null ? question.getExam().getExamId() : null,
                question.getExam() != null ? question.getExam().getTitle() : null
        );
    }

    public static Question mapToQuestion(QuestionDto questionDto){

        Question question = new Question();
        question.setQuestionId(questionDto.getQuestionId());
        question.setQuestionText(questionDto.getQuestionText());
        question.setOptionA(questionDto.getOptionA());
        question.setOptionB(questionDto.getOptionB());
        question.setOptionC(questionDto.getOptionC());
        question.setOptionD(questionDto.getOptionD());
        question.setCorrectOption(questionDto.getCorrectOption());
        question.setCreatedAt(questionDto.getCreatedAt());
        question.setUpdatedAt(questionDto.getUpdatedAt());
        return question;
    }
}
