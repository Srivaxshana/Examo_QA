package com.examo.examo_backend.BDD.steps;

import com.examo.examo_backend.dto.ExamDto;
import com.examo.examo_backend.repository.ExamRepository;
import com.examo.examo_backend.service.ExamService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class ExamCreationSteps {

    @Autowired
    private ExamService examService;

    @Autowired
    private ExamRepository examRepository;

    private ExamDto examDto;
    private ExamDto createdExam;
    private Exception exception;

    @Given("an exam with title {string} and subject {string} does not exist")
    public void exam_does_not_exist(String title, String subject) {
        examRepository.findAll().forEach(exam -> {
            if (exam.getTitle().equals(title) && exam.getSubject().equals(subject)) {
                examRepository.delete(exam);
            }
        });
    }

    @When("I create a new exam with title {string}, subject {string}, duration {int}, noOfQuestions {int}, and maxMarks {int}")
    public void i_create_a_new_exam(String title, String subject, int duration, int noOfQuestions, int maxMarks) {
        examDto = new ExamDto();
        examDto.setTitle(title);
        examDto.setSubject(subject);
        examDto.setDuration(duration);
        examDto.setNoOfQuestions(noOfQuestions);
        examDto.setMaxMarks(maxMarks);
        examDto.setIsActive(true);

        createdExam = examService.createExam(examDto);
    }

    @Then("the exam should be saved successfully")
    public void exam_should_be_saved_successfully() {
        assertNotNull(createdExam);
        assertEquals(examDto.getTitle(), createdExam.getTitle());
    }

    @When("I try to create a new exam with an empty title")
    public void i_try_to_create_exam_with_empty_title() {
        examDto = new ExamDto();
        examDto.setTitle(""); // invalid
        examDto.setSubject("Java");
        examDto.setDuration(60);
        examDto.setNoOfQuestions(20);
        examDto.setMaxMarks(100);

        try {
            createdExam = examService.createExam(examDto);
        } catch (Exception e) {
            exception = e;
        }
    }

    @Then("the exam creation should fail")
    public void exam_creation_should_fail() {
        assertNotNull(exception);
    }
}
