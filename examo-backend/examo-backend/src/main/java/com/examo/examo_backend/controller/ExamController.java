package com.examo.examo_backend.controller;

import com.examo.examo_backend.dto.ExamDto;
import com.examo.examo_backend.dto.StudentDto;
import com.examo.examo_backend.service.ExamService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private ExamService examService;

    @PostMapping
    public ResponseEntity<ExamDto> createExam(@RequestBody ExamDto examDto){
        ExamDto savedExam = examService.createExam(examDto);
        return new ResponseEntity<>(savedExam, HttpStatus.CREATED);
    }

    @GetMapping("{examId}")
    public ResponseEntity<ExamDto>getExamByExamId(@PathVariable("examId") Long examId){
        ExamDto examDto = examService.getExamByExamId(examId);
        return ResponseEntity.ok(examDto);
    }

    @GetMapping
    public ResponseEntity<List<ExamDto>>getAllExams(){
        List<ExamDto>exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }


    @PutMapping("{examId}")
    public ResponseEntity<ExamDto>updateExam (@PathVariable("examId") Long examId,
                                              @RequestBody ExamDto updatedExam){
        ExamDto examDto = examService.updateExam(examId, updatedExam);
        return ResponseEntity.ok(examDto);
    }


    @DeleteMapping("{examId}")
    public ResponseEntity<String> deleteExam (@PathVariable("examId") Long examId){
        examService.deleteExam(examId);
        return ResponseEntity.ok("ExamId " + examId +" deleted successfully");
    }
}
