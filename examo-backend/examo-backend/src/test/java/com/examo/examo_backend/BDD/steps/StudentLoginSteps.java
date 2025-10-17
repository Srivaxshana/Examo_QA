////package com.examo.examo_backend.BDD.steps;
////
////import com.examo.examo_backend.dto.StudentDto;
////import com.examo.examo_backend.entity.Student;
////import com.examo.examo_backend.repository.StudentRepository;
////import com.examo.examo_backend.service.impl.StudentServiceImpl;
////import io.cucumber.java.en.*;
////import org.junit.jupiter.api.Assertions;
////import org.mockito.Mockito;
////
////import java.util.Optional;
////
////import static org.mockito.Mockito.when;
////
////public class StudentLoginSteps {
////
////    private StudentRepository studentRepository;
////    private StudentServiceImpl studentService;
////    private Student student;
////    private StudentDto result;
////    private Exception exception;
////
////    @Given("a student with email {string} and password {string} exists")
////    public void a_student_exists(String email, String password) {
////        studentRepository = Mockito.mock(StudentRepository.class);
////        studentService = new StudentServiceImpl(studentRepository);
////
////        student = new Student();
////        student.setEmail(email);
////        student.setStudentPassword(password);
////
////        when(studentRepository.findByEmail(email)).thenReturn(Optional.of(student));
////    }
////
////    @When("the student tries to login with email {string} and password {string}")
////    public void student_tries_to_login(String email, String password) {
////        try {
////            result = studentService.login(email, password);
////        } catch (Exception e) {
////            exception = e;
////        }
////    }
////
////    @Then("the login should be successful")
////    public void login_should_be_successful() {
////        Assertions.assertNotNull(result);
////        Assertions.assertEquals(student.getEmail(), result.getEmail());
////    }
////
////    @Then("the login should fail")
////    public void login_should_fail() {
////        Assertions.assertNotNull(exception);
////        Assertions.assertEquals("Invalid email or password", exception.getMessage());
////    }
////}
//
//
//package com.examo.examo_backend.BDD.steps;
//
//import com.examo.examo_backend.entity.Student;
//import com.examo.examo_backend.repository.StudentRepository;
//import io.cucumber.java.en.Given;
//import io.cucumber.java.en.Then;
//import io.cucumber.java.en.When;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//public class StudentLoginSteps {
//
//    @Autowired
//    private StudentRepository studentRepository;
//
//    private Student student;
//    private Student loginResult;
//
//    @Given("a student with email {string} and password {string} exists")
//    public void a_student_exists(String email, String password) {
//        student = new Student();
//        student.setEmail(email);
//        student.setStudentPassword(password);
//        studentRepository.save(student);
//    }
//
//    @When("the student tries to login with email {string} and password {string}")
//    public void the_student_tries_to_login(String email, String password) {
//        loginResult = studentRepository.findByEmail(email).orElse(null);
//    }
//
//    @Then("the login should be successful")
//    public void login_should_be_successful() {
//        assertNotNull(loginResult);
//    }
//}
package com.examo.examo_backend.BDD.steps;

import com.examo.examo_backend.entity.Student;
import com.examo.examo_backend.repository.StudentRepository;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
public class StudentLoginSteps {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Student student;
    private Student loginResult;

    @Given("a student with email {string} and password {string} exists")
    public void a_student_exists(String email, String password) {
        // Prevent duplicate student creation
        student = studentRepository.findByEmail(email).orElse(null);

        if (student == null) {
            student = new Student();
            student.setEmail(email);
            //student.setStudentPassword(password);
            student.setStudentPassword(passwordEncoder.encode(password));
            studentRepository.save(student);
        }
    }

    @When("the student tries to login with email {string} and password {string}")
    public void the_student_tries_to_login(String email, String password) {
        loginResult = studentRepository.findByEmail(email).orElse(null);

//        if (loginResult != null && !loginResult.getStudentPassword().equals(password)) {
//            // Wrong password → treat as login fail
//            loginResult = null;
//        }
        if (loginResult != null && !passwordEncoder.matches(password, loginResult.getStudentPassword())) {
            //  Password mismatch — login should fail
            loginResult = null;
        }
    }

    @Then("the login should be successful")
    public void login_should_be_successful() {
        assertNotNull(loginResult, "Expected login to succeed but it failed!");
    }

    @Then("the login should fail")
    public void the_login_should_fail() {
        assertNull(loginResult, "Expected login to fail but it succeeded!");
    }
}
