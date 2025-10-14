//package com.examo.examo_backend.service.impl;
//
//import com.examo.examo_backend.dto.StudentDto;
//import com.examo.examo_backend.entity.Student;
//import com.examo.examo_backend.exception.ResourceNotFoundException;
//import com.examo.examo_backend.mapper.StudentMapper;
//import com.examo.examo_backend.repository.StudentRepository;
//import com.examo.examo_backend.service.StudentService;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@AllArgsConstructor
//public class StudentServiceImpl implements StudentService {
//
//    private StudentRepository studentRepository;
//
//    @Override
//    public StudentDto createStudent(StudentDto studentDto) {
//
//        Student student= StudentMapper.mapToStudent(studentDto);
//        Student savedStudent =studentRepository.save(student);
//
//        return StudentMapper.mapToStudentDto(savedStudent);
//    }
//
//    @Override
//    public StudentDto getStudentByStudentId(Long studentId) {
//        Student student=  studentRepository.findById(studentId)
//                .orElseThrow(()->
//                        new ResourceNotFoundException("Student is not exists with given id: "+ studentId));
//
//        return StudentMapper.mapToStudentDto(student);
//    }
//
//    @Override
//    public List<StudentDto> getAllStudents() {
//        List<Student> students= studentRepository.findAll();
//        return students.stream().map((student) -> StudentMapper.mapToStudentDto(student))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public StudentDto updateStudent(Long studentId, StudentDto updateStudent) {
//
//        Student student= studentRepository.findById(studentId).orElseThrow(
//                ()-> new ResourceNotFoundException("Student is not exists with given id : "+studentId)
//        );
//
//        student.setFullName(updateStudent.getFullName());
//        student.setEmail(updateStudent.getEmail());
//        student.setPhoneNo(updateStudent.getPhoneNo());
//        student.setSchool(updateStudent.getSchool());
//        student.setGrade(updateStudent.getGrade());
//
//        student.setStudentPassword(updateStudent.getStudentPassword());
//
//        Student updatedStudentObj = studentRepository.save(student);
//
//
//        return StudentMapper.mapToStudentDto(updatedStudentObj);
//    }
//
//    @Override
//    public void deleteStudent(Long studentId) {
//        Student student= studentRepository.findById(studentId).orElseThrow(
//                ()-> new ResourceNotFoundException("Student is not exists with given id : "+studentId)
//        );
//        studentRepository.deleteById(studentId);
//
//    }
//
//    @Override
//    public StudentDto login(String email, String password) {
//        Student student = studentRepository.findByEmail(email)
//                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));
//
//
//        if (!student.getStudentPassword().equals(password)) {
//            throw new ResourceNotFoundException("Invalid email or password");
//        }
//
//        return StudentMapper.mapToStudentDto(student);
//    }
//
//}

//// for QA  security
//package com.examo.examo_backend.service.impl;
//
//import com.examo.examo_backend.dto.StudentDto;
//import com.examo.examo_backend.entity.Student;
//import com.examo.examo_backend.exception.ResourceNotFoundException;
//import com.examo.examo_backend.mapper.StudentMapper;
//import com.examo.examo_backend.repository.StudentRepository;
//import com.examo.examo_backend.service.StudentService;
//import lombok.AllArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder; //  Added
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@AllArgsConstructor
//public class StudentServiceImpl implements StudentService {
//
//    private final StudentRepository studentRepository;
//    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); //  Added dependency injection
//
//    @Override
//    public StudentDto createStudent(StudentDto studentDto) {
//
//        Student student = StudentMapper.mapToStudent(studentDto);
//
//        //  Hash password before saving to database
//        String encodedPassword = passwordEncoder.encode(student.getStudentPassword());
//        student.setStudentPassword(encodedPassword); // ⚠️ Changed line for QA
//
//        Student savedStudent = studentRepository.save(student);
//        return StudentMapper.mapToStudentDto(savedStudent);
//    }
//
//    @Override
//    public StudentDto getStudentByStudentId(Long studentId) {
//        Student student = studentRepository.findById(studentId)
//                .orElseThrow(() ->
//                        new ResourceNotFoundException("Student does not exist with id: " + studentId));
//
//        return StudentMapper.mapToStudentDto(student);
//    }
//
//    @Override
//    public List<StudentDto> getAllStudents() {
//        List<Student> students = studentRepository.findAll();
//        return students.stream().map(StudentMapper::mapToStudentDto)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public StudentDto updateStudent(Long studentId, StudentDto updateStudent) {
//        Student student = studentRepository.findById(studentId).orElseThrow(
//                () -> new ResourceNotFoundException("Student does not exist with id: " + studentId)
//        );
//
//        student.setFullName(updateStudent.getFullName());
//        student.setEmail(updateStudent.getEmail());
//        student.setPhoneNo(updateStudent.getPhoneNo());
//        student.setSchool(updateStudent.getSchool());
//        student.setGrade(updateStudent.getGrade());
//
//        //  Re-hash new password if user updates it
//        String encodedPassword = passwordEncoder.encode(updateStudent.getStudentPassword());
//        student.setStudentPassword(encodedPassword); // ⚠️ Changed line for QA
//
//        Student updatedStudentObj = studentRepository.save(student);
//        return StudentMapper.mapToStudentDto(updatedStudentObj);
//    }
//
//    @Override
//    public void deleteStudent(Long studentId) {
//        Student student = studentRepository.findById(studentId).orElseThrow(
//                () -> new ResourceNotFoundException("Student does not exist with id: " + studentId)
//        );
//        studentRepository.deleteById(studentId);
//    }
//
//    @Override
//    public StudentDto login(String email, String password) {
//        Student student = studentRepository.findByEmail(email)
//                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));
//
//        //  Verify hashed password
//        if (!passwordEncoder.matches(password, student.getStudentPassword())) { // ⚠️ Changed comparison
//            throw new ResourceNotFoundException("Invalid email or password");
//        }
//
//        return StudentMapper.mapToStudentDto(student);
//    }
//}
//


// QA final
package com.examo.examo_backend.service.impl;

import com.examo.examo_backend.dto.StudentDto;
import com.examo.examo_backend.entity.Student;
import com.examo.examo_backend.exception.ResourceNotFoundException;
import com.examo.examo_backend.mapper.StudentMapper;
import com.examo.examo_backend.repository.StudentRepository;
import com.examo.examo_backend.service.StudentService;
import jakarta.validation.Valid; // ✅ for input validation
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // ✅ Added secure password encoder

    // ------------------------------
    //  Create Student (Register)
    // ------------------------------
    @Override
    public StudentDto createStudent(@Valid StudentDto studentDto) { // ✅ Validate input before processing
        Student student = StudentMapper.mapToStudent(studentDto);

        //  Hash the password before saving
        String encodedPassword = passwordEncoder.encode(student.getStudentPassword());
        student.setStudentPassword(encodedPassword);

        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    // ------------------------------
    //  Get Single Student
    // ------------------------------
    @Override
    public StudentDto getStudentByStudentId(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student does not exist with id: " + studentId));
        return StudentMapper.mapToStudentDto(student);
    }

    // ------------------------------
    //  Get All Students
    // ------------------------------
    @Override
    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(StudentMapper::mapToStudentDto)
                .collect(Collectors.toList());
    }

    // ------------------------------
    //  Update Student
    // ------------------------------
    @Override
    public StudentDto updateStudent(Long studentId, @Valid StudentDto updateStudent) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student does not exist with id: " + studentId));

        student.setFullName(updateStudent.getFullName());
        student.setEmail(updateStudent.getEmail());
        student.setPhoneNo(updateStudent.getPhoneNo());
        student.setSchool(updateStudent.getSchool());
        student.setGrade(updateStudent.getGrade());

        // ✅ Re-hash the password before updating
        String encodedPassword = passwordEncoder.encode(updateStudent.getStudentPassword());
        student.setStudentPassword(encodedPassword);

        Student updatedStudentObj = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    // ------------------------------
    //  Delete Student
    // ------------------------------
    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student does not exist with id: " + studentId));
        studentRepository.deleteById(studentId);
    }

    // ------------------------------
    //  Login (Authentication)
    // ------------------------------
    @Override
    public StudentDto login(String email, String password) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        //  Verify password securely using BCrypt
        if (!passwordEncoder.matches(password, student.getStudentPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        return StudentMapper.mapToStudentDto(student);
    }
}
