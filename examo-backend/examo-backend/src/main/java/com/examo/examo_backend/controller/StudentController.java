package com.examo.examo_backend.controller;


import com.examo.examo_backend.dto.StudentDto;
import com.examo.examo_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private StudentService studentService;


    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto){
        StudentDto savedStudent = studentService.createStudent(studentDto);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }


    @GetMapping("{studentId}")

    public ResponseEntity<StudentDto>getStudentByStudentId(@PathVariable("studentId")  Long studentId){
        StudentDto studentDto= studentService.getStudentByStudentId(studentId);
        return ResponseEntity.ok(studentDto);
    }


    @GetMapping
    public ResponseEntity<List<StudentDto>>getAllStudents(){
        List<StudentDto>students=studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }


    @PutMapping("{studentId}")
    public ResponseEntity<StudentDto>updateStudent( @PathVariable("studentId") Long studentId,
                                                   @RequestBody StudentDto updatedStudent){
        StudentDto studentDto = studentService.updateStudent(studentId, updatedStudent);
        return ResponseEntity.ok(studentDto);
    }


    @DeleteMapping("{studentId}")
    public ResponseEntity<String> deleteStudent(@PathVariable("studentId") Long studentId){
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok("StudentId "+studentId +"  deleted successfully") ;
    }

}
