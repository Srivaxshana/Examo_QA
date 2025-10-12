//package com.examo.examo_backend.selenium;
//
//import io.github.bonigarcia.wdm.WebDriverManager;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.chrome.ChromeOptions;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//
//import java.time.Duration;
//
//import static org.junit.jupiter.api.Assertions.assertTrue;
//
//public class ViewExamsUITest {
//
//    private WebDriver driver;
//    private WebDriverWait wait;
//
//    @BeforeEach
//    void setUp() {
//        WebDriverManager.chromedriver().setup();
//        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--headless=new");
//        options.addArguments("--no-sandbox");
//        options.addArguments("--disable-dev-shm-usage");
//        driver = new ChromeDriver(options);
//        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
//    }
//
//    @AfterEach
//    void tearDown() {
//        if (driver != null) {
//            driver.quit();
//        }
//    }
//
//    @Test
//    void student_can_view_exams_list() {
//        driver.get("http://localhost:3000/");
//
//        // Try to navigate to student all exams page if link exists
//        try {
//            WebElement link = wait.until(ExpectedConditions.presenceOfElementLocated(
//                    By.cssSelector("a[href='/student/all-exams'], a[href='/student-dashboard']")
//            ));
//            link.click();
//        } catch (Exception ignored) { }
//
//        // Verify there is at least one exam card/list element present
//        boolean hasExams = false;
//        try {
//            wait.until(ExpectedConditions.or(
//                    ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid='exam-card']")),
//                    ExpectedConditions.presenceOfElementLocated(By.cssSelector(".exam-card, .exam-item, [data-exam]"))
//            ));
//            hasExams = true;
//        } catch (Exception e) {
//            hasExams = false;
//        }
//
//        assertTrue(hasExams);
//    }
//}
//
//
