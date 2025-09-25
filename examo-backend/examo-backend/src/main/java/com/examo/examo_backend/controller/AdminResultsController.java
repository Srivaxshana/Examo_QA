package com.examo.examo_backend.controller;

import com.examo.examo_backend.dto.AdminExamResultDto;
import com.examo.examo_backend.service.AdminResultService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/admin/results")
public class AdminResultsController {

    private AdminResultService adminResultService;


    @GetMapping
    public ResponseEntity<List<AdminExamResultDto>> getAllExamResults() {
        List<AdminExamResultDto> results = adminResultService.getAllExamResults();
        return ResponseEntity.ok(results);
    }


    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<AdminExamResultDto>> getResultsByExamId(@PathVariable Long examId) {
        List<AdminExamResultDto> results = adminResultService.getResultsByExamId(examId);
        return ResponseEntity.ok(results);
    }


    @GetMapping("/{resultId}")
    public ResponseEntity<AdminExamResultDto> getDetailedResult(@PathVariable Long resultId) {
        AdminExamResultDto result = adminResultService.getDetailedResult(resultId);
        return ResponseEntity.ok(result);
    }


    @DeleteMapping("/{resultId}")
    public ResponseEntity<String> deleteResult(@PathVariable Long resultId) {
        adminResultService.deleteResult(resultId);
        return ResponseEntity.ok("Result deleted successfully");
    }
}