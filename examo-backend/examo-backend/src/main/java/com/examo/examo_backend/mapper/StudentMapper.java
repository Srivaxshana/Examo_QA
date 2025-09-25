package com.examo.examo_backend.mapper;

import com.examo.examo_backend.dto.StudentDto;
import com.examo.examo_backend.entity.Student;

public class StudentMapper {
    public static StudentDto mapToStudentDto(Student student){
        return new StudentDto(
                student.getStudentId(),
                student.getFullName(),
                student.getEmail(),
                student.getPhoneNo(),
                student.getSchool(),
                student.getGrade(),
                student.getStudentPassword()

        );
    }

    public static Student mapToStudent(StudentDto studentDto){
        return new Student(
                studentDto.getStudentId(),
                studentDto.getFullName(),
                studentDto.getEmail(),
                studentDto.getPhoneNo(),
                studentDto.getSchool(),
                studentDto.getGrade(),
                studentDto.getStudentPassword()

        );
    }
}
