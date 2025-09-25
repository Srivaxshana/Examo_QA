package com.examo.examo_backend.TDD.service;

import com.examo.examo_backend.dto.ExamDto;
import com.examo.examo_backend.entity.Exam;
import com.examo.examo_backend.mapper.ExamMapper;
import com.examo.examo_backend.repository.ExamRepository;
import com.examo.examo_backend.service.impl.ExamServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExamServiceTest {

    @Mock
    private ExamRepository examRepository;

    @InjectMocks
    private ExamServiceImpl examService;

    public ExamServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateExamWithEmptyTitle() {
        ExamDto examDto = new ExamDto();
        examDto.setTitle(""); // invalid
        examDto.setSubject("Math");
        examDto.setDuration(90);
        examDto.setNoOfQuestions(20);
        examDto.setMaxMarks(100);
        examDto.setCreatedAt(LocalDateTime.now());
        examDto.setIsActive(true);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            examService.createExam(examDto);
        });

        assertEquals("Exam title cannot be empty", exception.getMessage());
    }

    @Test
    void testCreateValidExam() {
        ExamDto examDto = new ExamDto();
        examDto.setTitle("Science Exam");
        examDto.setSubject("Science");
        examDto.setDuration(60);
        examDto.setNoOfQuestions(10);
        examDto.setMaxMarks(50);
        examDto.setCreatedAt(LocalDateTime.now());
        examDto.setIsActive(true);

        Exam examEntity = ExamMapper.mapToExam(examDto);

        when(examRepository.save(any(Exam.class))).thenReturn(examEntity);

        ExamDto result = examService.createExam(examDto);

        assertNotNull(result);
        assertEquals("Science Exam", result.getTitle());
    }
}
