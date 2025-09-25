package com.examo.examo_backend.controller;

import com.examo.examo_backend.dto.*;
import com.examo.examo_backend.service.StudentExamService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/student")
public class StudentExamController {

    private StudentExamService studentExamService;



    @PostMapping("/login")
    public ResponseEntity<StudentLoginResponseDto> authenticateStudent(@RequestBody StudentAuthDto authDto) {
        StudentLoginResponseDto response = studentExamService.authenticateStudent(authDto);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/exams")
    public ResponseEntity<List<StudentExamDto>> getAvailableExams() {
        List<StudentExamDto> exams = studentExamService.getAvailableExams();
        return ResponseEntity.ok(exams);
    }


    @GetMapping("/exam/{examId}")
    public ResponseEntity<StudentExamDto> startExam(@PathVariable Long examId) {
        StudentExamDto exam = studentExamService.getExamForStudent(examId);
        return ResponseEntity.ok(exam);
    }


    @PostMapping("/exam/{examId}/submit")
    public ResponseEntity<ExamResultDto> submitExam(
            @PathVariable Long examId,
            @RequestBody ExamSubmissionDto submission) {
        ExamResultDto result = studentExamService.submitExam(examId, submission);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/result/{resultId}")
    public ResponseEntity<ExamResultDto> getExamResult(@PathVariable Long resultId) {
        ExamResultDto result = studentExamService.getExamResult(resultId);
        return ResponseEntity.ok(result);
    }
}