package com.examo.examo_backend.service;

import com.examo.examo_backend.dto.StudentDto;

import java.util.List;

public interface StudentService {
    StudentDto createStudent(StudentDto studentDto);

    StudentDto getStudentByStudentId(Long studentId);

    List<StudentDto> getAllStudents();

    StudentDto updateStudent(Long studentId, StudentDto updateStudent);

    void deleteStudent (Long studentId);

    StudentDto login(String email, String password);


}
