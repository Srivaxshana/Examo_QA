Feature: Exam Creation
  Scenario: Successfully create a new exam
    Given an exam with title "Java Basics" and subject "Java" does not exist
    When I create a new exam with title "Java Basics", subject "Java", duration 60, noOfQuestions 20, and maxMarks 100
    Then the exam should be saved successfully

  Scenario: Fail to create exam with missing title
    When I try to create a new exam with an empty title
    Then the exam creation should fail
