package com.examo.examo_backend.TDD.service;

import com.examo.examo_backend.dto.StudentDto;
import com.examo.examo_backend.entity.Student;
import com.examo.examo_backend.repository.StudentRepository;
import com.examo.examo_backend.service.impl.StudentServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentServiceImpl studentService;

    public StudentServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginWithValidCredentials() {
        Student student = new Student();
        student.setEmail("test@student.com");
        student.setStudentPassword("1234");

        when(studentRepository.findByEmail("test@student.com"))
                .thenReturn(Optional.of(student));

        StudentDto result = studentService.login("test@student.com", "1234");

        assertNotNull(result);
        assertEquals("test@student.com", result.getEmail());
    }

    @Test
    void testLoginWithInvalidCredentials() {
        when(studentRepository.findByEmail("wrong@student.com"))
                .thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            studentService.login("wrong@student.com", "wrong");
        });

        assertEquals("Invalid email or password", exception.getMessage());
    }
}
