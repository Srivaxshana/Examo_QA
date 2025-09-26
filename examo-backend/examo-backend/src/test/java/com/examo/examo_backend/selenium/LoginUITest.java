////////package com.examo.examo_backend.selenium;
////////
////////import org.junit.jupiter.api.AfterEach;
////////import org.junit.jupiter.api.BeforeEach;
////////import org.junit.jupiter.api.Test;
////////import org.openqa.selenium.By;
////////import org.openqa.selenium.WebDriver;
////////import org.openqa.selenium.WebElement;
////////import org.openqa.selenium.chrome.ChromeDriver;
////////import java.time.Duration;
////////
////////
////////import static org.junit.jupiter.api.Assertions.assertEquals;
////////
////////public class LoginUITest {
////////
////////    private WebDriver driver;
////////
////////    @BeforeEach
////////    void setUp() {
////////        // Make sure you have ChromeDriver installed
////////        driver = new ChromeDriver();
////////        driver.manage().window().maximize();
////////
////////        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
////////
////////    }
////////
////////    @Test
////////    void testLoginPageTitle() {
////////        driver.get("http://localhost:3000/login"); // Change URL to your frontend login page
////////        String title = driver.getTitle();
////////        assertEquals("Login - Examo", title); // Adjust expected title
////////    }
////////
////////    @Test
////////    void testSuccessfulLogin() {
////////        driver.get("http://localhost:3000/login");
////////
////////        WebElement emailField = driver.findElement(By.id("email"));
////////        WebElement passwordField = driver.findElement(By.id("password"));
////////        WebElement loginButton = driver.findElement(By.id("loginBtn"));
////////
////////        emailField.sendKeys("test@student.com");
////////        passwordField.sendKeys("1234");
////////        loginButton.click();
////////
////////        // After login, check redirected page
////////        String currentUrl = driver.getCurrentUrl();
////////        assertEquals("http://localhost:3000/dashboard", currentUrl); // adjust according to your app
////////    }
////////
////////    @AfterEach
////////    void tearDown() {
////////        if (driver != null) {
////////            driver.quit();
////////        }
////////    }
////////}
//////
////
////
////
////package com.examo.examo_backend.selenium;
////
////import org.junit.jupiter.api.AfterEach;
////import org.junit.jupiter.api.BeforeEach;
////import org.junit.jupiter.api.Test;
////import org.openqa.selenium.By;
////import org.openqa.selenium.WebDriver;
////import org.openqa.selenium.WebElement;
////import org.openqa.selenium.chrome.ChromeDriver;
////import org.openqa.selenium.support.ui.ExpectedConditions;
////import org.openqa.selenium.support.ui.WebDriverWait;
////
////import java.time.Duration;
////
////import static org.junit.jupiter.api.Assertions.assertEquals;
////
////public class LoginUITest {
////
////    private WebDriver driver;
////    private WebDriverWait wait;
////
////    @BeforeEach
////    void setUp() {
////        driver = new ChromeDriver();
////        driver.manage().window().maximize();
////        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
////    }
////
////    @Test
////    void testLoginPageTitle() {
////        driver.get("http://localhost:3000/student/login"); // ✅ updated URL
////        String title = driver.getTitle();
////        assertEquals("Login - Examo", title); // adjust if your frontend shows a different title
////    }
////
////    @Test
////    void testSuccessfulLogin() {
////        driver.get("http://localhost:3000/student/login"); // ✅ updated URL
////
////        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(
////                By.cssSelector("input[type='email'], input[name='email'], #email")
////        ));
////        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(
////                By.cssSelector("input[type='password'], input[name='password'], #password")
////        ));
////        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(
////                By.cssSelector("button[type='submit'], #loginBtn")
////        ));
////
////        //emailField.sendKeys("test@student.com");
////        //passwordField.sendKeys("1234");
////        emailField.sendKeys("sri@gmail.com");
////        passwordField.sendKeys("sri123");
////        loginButton.click();
////
////        // After login, check redirected page
////        wait.until(ExpectedConditions.urlContains("/student-dashboard")); // ✅ adjusted for student
////        String currentUrl = driver.getCurrentUrl();
////        assertEquals("http://localhost:3000/student-dashboard", currentUrl); // adjust for your app
////    }
////
////    @AfterEach
////    void tearDown() {
//////        if (driver != null) {
//////            driver.quit();
//////        }
////    }
////}
//
//
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
//public class LoginUITest {
//
//    private WebDriver driver;
//    private WebDriverWait wait;
//
//    @BeforeEach
//    void setUp() {
//        // Only instantiate ChromeDriver once
//        driver = new ChromeDriver();
//        driver.manage().window().maximize();
//        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
//    }
//
//
//    @Test
//    void testSuccessfulLogin() {
//        driver.get("http://localhost:3000/student/login");
//
//        // Locate input fields and button
//        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(
//                By.cssSelector("input[type='email'], input[name='email'], #email")
//        ));
//        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(
//                By.cssSelector("input[type='password'], input[name='password'], #password")
//        ));
//        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(
//                By.cssSelector("button[type='submit'], #loginBtn")
//        ));
//
//        // Enter credentials
//        emailField.sendKeys("sri@gmail.com");
//        passwordField.sendKeys("sri123");
//        loginButton.click();
//
//        // Wait for URL to change to dashboard
//        wait.until(ExpectedConditions.urlContains("/student-dashboard"));
//
//        // Ensure only one window is open
//        if (driver.getWindowHandles().size() > 1) {
//            String originalWindow = driver.getWindowHandle();
//            for (String handle : driver.getWindowHandles()) {
//                if (!handle.equals(originalWindow)) {
//                    driver.close(); // close extra window
//                    driver.switchTo().window(originalWindow);
//                }
//            }
//        }
//
//        // Verify current URL
//        String currentUrl = driver.getCurrentUrl();
//        assertEquals("http://localhost:3000/student-dashboard", currentUrl);
//    }
//
//    @AfterEach
//    void tearDown() {
////        if (driver != null) {
////            driver.quit();
////        }
//    }
//}


package com.examo.examo_backend.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginUITest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() {
        // ✅ Configure Chrome for CI/CD (headless)
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");   // Headless mode for GitHub Actions
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    void testSuccessfulLogin() {
        driver.get("http://localhost:3000/student/login");

        // ✅ Locate input fields and login button
        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("input[type='email'], input[name='email'], #email")
        ));
        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("input[type='password'], input[name='password'], #password")
        ));
        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector("button[type='submit'], #loginBtn")
        ));

        // ✅ Enter credentials
        emailField.sendKeys("sri@gmail.com");
        passwordField.sendKeys("sri123");
        loginButton.click();

        // ✅ Wait until redirected
        wait.until(ExpectedConditions.urlContains("/student-dashboard"));

        // ✅ Verify URL
        String currentUrl = driver.getCurrentUrl();
        assertEquals("http://localhost:3000/student-dashboard", currentUrl);
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit(); // ✅ Always close browser (important for CI/CD)
        }
    }
}
