//package com.examo.examo_backend.TDD.service;
//
//import com.examo.examo_backend.dto.StudentDto;
//import com.examo.examo_backend.entity.Student;
//import com.examo.examo_backend.repository.StudentRepository;
//import com.examo.examo_backend.service.impl.StudentServiceImpl;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//class StudentServiceTest {
//
//    @Mock
//    private StudentRepository studentRepository;
//
//    @InjectMocks
//    private StudentServiceImpl studentService;
//
//    public StudentServiceTest() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//
//
////    @Test
////    void testLoginWithValidCredentials() {
////        Student student = new Student();
////        student.setEmail("test@student.com");
////        student.setStudentPassword("1234");
////
////
////        when(studentRepository.findByEmail("test@student.com"))
////                .thenReturn(Optional.of(student));
////
////        StudentDto result = studentService.login("test@student.com", "1234");
////
////        assertNotNull(result);
////        assertEquals("test@student.com", result.getEmail());
////    }
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Test
//    void testLoginWithValidCredentials() {
//        Student student = new Student();
//        student.setEmail("test@student.com");
//        student.setStudentPassword(passwordEncoder.encode("1234")); // ✅ encode before save
//        studentRepository.save(student);
//
//        StudentDto result = studentService.login("test@student.com", "1234");
//        assertNotNull(result);
//        assertEquals("test@student.com", result.getEmail());
//    }
//
//
//    @Test
//    void testLoginWithInvalidCredentials() {
//        when(studentRepository.findByEmail("wrong@student.com"))
//                .thenReturn(Optional.empty());
//
//        Exception exception = assertThrows(RuntimeException.class, () -> {
//            studentService.login("wrong@student.com", "wrong");
//        });
//
//        assertEquals("Invalid email or password", exception.getMessage());
//    }
//
//
//}
//
////
////package com.examo.examo_backend.TDD.service;
////
////import com.examo.examo_backend.dto.StudentDto;
////import com.examo.examo_backend.entity.Student;
////import com.examo.examo_backend.repository.StudentRepository;
////import com.examo.examo_backend.service.impl.StudentServiceImpl;
////import org.junit.jupiter.api.BeforeEach;
////import org.junit.jupiter.api.Test;
////import org.mockito.InjectMocks;
////import org.mockito.Mock;
////import org.mockito.MockitoAnnotations;
////
////import java.util.Optional;
////
////import static org.junit.jupiter.api.Assertions.*;
////import static org.mockito.Mockito.*;
////
/////**
//// * TDD Example: Testing the Student Login feature
//// * (Red → Green → Refactor cycle)
//// */
////class StudentServiceTest {
////
////    @Mock
////    private StudentRepository studentRepository;
////
////    @InjectMocks
////    private StudentServiceImpl studentService;
////
////    @BeforeEach
////    void setUp() {
////        MockitoAnnotations.openMocks(this);
////    }
////
////    /**
////     * ✅ Test 1 – Valid login credentials (Green case)
////     */
////    @Test
////    void testLogin_WithValidCredentials_ShouldReturnStudentDto() {
////        // Arrange
////        Student student = new Student();
////        student.setEmail("test@student.com");
////        student.setStudentPassword("1234");
////
////        when(studentRepository.findByEmail("test@student.com"))
////                .thenReturn(Optional.of(student));
////
////        // Act
////        StudentDto result = studentService.login("test@student.com", "1234");
////
////        // Assert
////        assertNotNull(result, "Login should return a valid StudentDto");
////        assertEquals("test@student.com", result.getEmail());
////    }
////
////    /**
////     * ❌ Test 2 – Invalid login credentials (Red case)
////     */
////    @Test
////    void testLogin_WithInvalidCredentials_ShouldThrowException() {
////        // Arrange
////        when(studentRepository.findByEmail("wrong@student.com"))
////                .thenReturn(Optional.empty());
////
////        // Act & Assert
////        Exception exception = assertThrows(RuntimeException.class, () ->
////                studentService.login("wrong@student.com", "wrong")
////        );
////
////        assertEquals("Invalid email or password", exception.getMessage());
////    }
////}


package com.examo.examo_backend.TDD.service;

import com.examo.examo_backend.dto.StudentDto;
import com.examo.examo_backend.entity.Student;
import com.examo.examo_backend.repository.StudentRepository;
import com.examo.examo_backend.service.impl.StudentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentServiceImpl studentService;

    private PasswordEncoder passwordEncoder; //  will manually set it

    public StudentServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder(); //  initialize manually
        // inject manually into studentService since it's not managed by Spring
        try {
            var field = StudentServiceImpl.class.getDeclaredField("passwordEncoder");
            field.setAccessible(true);
            field.set(studentService, passwordEncoder);
        } catch (Exception e) {
            throw new RuntimeException("Failed to inject passwordEncoder", e);
        }
    }

    @Test
    void testLoginWithValidCredentials() {
        Student student = new Student();
        student.setEmail("test@student.com");
        student.setStudentPassword(passwordEncoder.encode("1234")); //  encode before mocking

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
