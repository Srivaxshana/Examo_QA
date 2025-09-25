Feature: Student Login
  As a student
  I want to log in with my email and password
  So that I can access exams

  Scenario: Successful login
    Given a student with email "test@student.com" and password "1234" exists
    When the student tries to login with email "test@student.com" and password "1234"
    Then the login should be successful

  Scenario: Failed login with wrong credentials
    Given a student with email "test@student.com" and password "1234" exists
    When the student tries to login with email "wrong@student.com" and password "wrong"
    Then the login should fail



