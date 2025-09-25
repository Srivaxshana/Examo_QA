package com.examo.examo_backend.service;

import com.examo.examo_backend.dto.AdminExamResultDto;
import java.util.List;

public interface AdminResultService {
    List<AdminExamResultDto> getAllExamResults();

    List<AdminExamResultDto> getResultsByExamId(Long examId);

    AdminExamResultDto getDetailedResult(Long resultId);

    void deleteResult(Long resultId);
}