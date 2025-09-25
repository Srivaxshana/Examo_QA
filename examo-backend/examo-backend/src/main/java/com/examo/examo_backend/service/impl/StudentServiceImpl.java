package com.examo.examo_backend.service.impl;

import com.examo.examo_backend.dto.StudentDto;
import com.examo.examo_backend.entity.Student;
import com.examo.examo_backend.exception.ResourceNotFoundException;
import com.examo.examo_backend.mapper.StudentMapper;
import com.examo.examo_backend.repository.StudentRepository;
import com.examo.examo_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;

    @Override
    public StudentDto createStudent(StudentDto studentDto) {

        Student student= StudentMapper.mapToStudent(studentDto);
        Student savedStudent =studentRepository.save(student);

        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentByStudentId(Long studentId) {
        Student student=  studentRepository.findById(studentId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Student is not exists with given id: "+ studentId));

        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students= studentRepository.findAll();
        return students.stream().map((student) -> StudentMapper.mapToStudentDto(student))
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto updateStudent) {

        Student student= studentRepository.findById(studentId).orElseThrow(
                ()-> new ResourceNotFoundException("Student is not exists with given id : "+studentId)
        );

        student.setFullName(updateStudent.getFullName());
        student.setEmail(updateStudent.getEmail());
        student.setPhoneNo(updateStudent.getPhoneNo());
        student.setSchool(updateStudent.getSchool());
        student.setGrade(updateStudent.getGrade());
        student.setStudentPassword(updateStudent.getStudentPassword());

        Student updatedStudentObj = studentRepository.save(student);


        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Student student= studentRepository.findById(studentId).orElseThrow(
                ()-> new ResourceNotFoundException("Student is not exists with given id : "+studentId)
        );
        studentRepository.deleteById(studentId);

    }

    @Override
    public StudentDto login(String email, String password) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!student.getStudentPassword().equals(password)) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        return StudentMapper.mapToStudentDto(student);
    }

}
