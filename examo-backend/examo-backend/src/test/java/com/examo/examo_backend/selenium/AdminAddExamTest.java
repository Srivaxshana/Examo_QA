//package com.examo.examo_backend.selenium;
//
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//
//import java.time.Duration;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//public class AdminAddExamTest {
//
//    private WebDriver driver;
//    private WebDriverWait wait;
//
//    @BeforeEach
//    public void setUp() {
//        // Set path to chromedriver if required
//        System.setProperty("webdriver.chrome.driver", "C:/path/to/chromedriver.exe");
//        driver = new ChromeDriver();
//        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//        driver.manage().window().maximize();
//    }
//
//    @Test
//    public void testAdminAddExam() {
//        // 1. Navigate to admin login page
//        driver.get("http://localhost:3000/admin/login");
//
//        // 2. Perform admin login (default admin credentials)
//        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
//        WebElement passwordField = driver.findElement(By.id("password"));
//        WebElement loginButton = driver.findElement(By.id("loginButton"));
//
//        emailField.sendKeys("admin"); // default admin email
//        passwordField.sendKeys("admin123");       // default admin password
//        loginButton.click();
//
//        // 3. Navigate to "Add Exam" page
//        wait.until(ExpectedConditions.urlContains("/admin-exams"));
//        driver.get("http://localhost:3000/admin-exams");
//
//        // 4. Fill in exam details
//        WebElement examName = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("examName")));
//        WebElement examDate = driver.findElement(By.id("examDate"));
//        WebElement submitButton = driver.findElement(By.id("submitExam"));
//
//        examName.sendKeys("Math Final Test");
//        examDate.sendKeys("2025-10-05");
//        submitButton.click();
//
//        // 5. Verify the exam was added (success message)
//        WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("successMessage")));
//        assertEquals("Exam added successfully!", successMessage.getText());
//    }
//
//    @AfterEach
//    public void tearDown() {
//        if (driver != null) {
//            driver.quit();
//        }
//    }
//}
