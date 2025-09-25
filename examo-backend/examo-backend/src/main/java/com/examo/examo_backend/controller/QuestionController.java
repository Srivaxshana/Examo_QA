package com.examo.examo_backend.controller;


import com.examo.examo_backend.dto.QuestionDto;
import com.examo.examo_backend.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private QuestionService questionService;

    @PostMapping
    public ResponseEntity<QuestionDto>createQuestion(@RequestBody QuestionDto questionDto ){
        QuestionDto savedQuestion = questionService.createQuestion(questionDto);
        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }

    @GetMapping("{questionId}")

    public ResponseEntity<QuestionDto>getQuestionByQuestionId(@PathVariable ("questionId") Long questionId){
        QuestionDto questionDto =questionService.getQuestionByQuestionId(questionId);
        return ResponseEntity.ok(questionDto);
    }

    @GetMapping
    public ResponseEntity<List<QuestionDto>>getAllQuestions(){
        List<QuestionDto>questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<QuestionDto>> getQuestionsByExamId(@PathVariable("examId") Long examId) {
        List<QuestionDto> questions = questionService.getQuestionsByExamId(examId);
        return ResponseEntity.ok(questions);
    }


    @PutMapping("{questionId}")

    public ResponseEntity<QuestionDto>updateQuestion(@PathVariable("questionId") Long questionId ,
                                                     @RequestBody QuestionDto updatedQuestion){
        QuestionDto questionDto=questionService.updateQuestion(questionId,updatedQuestion);
        return  ResponseEntity.ok(questionDto);
    }


    @DeleteMapping("{questionId}")

    public ResponseEntity<String> deleteQuestion (@PathVariable("questionId") Long questionId){
        questionService.deleteQuestion(questionId);
        return ResponseEntity.ok("QuestionId "+questionId +"  deleted successfully") ;
    }
}
