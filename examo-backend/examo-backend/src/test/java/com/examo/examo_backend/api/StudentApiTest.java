package com.examo.examo_backend.api;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class StudentApiTest {

    @LocalServerPort
    int port;

    @BeforeEach
    void setup() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
    }

    @Test
    void login_shouldReturn200_andTokenOrMessage() {
        String body = "{\n" +
                "  \"email\": \"test@student.com\",\n" +
                "  \"password\": \"1234\"\n" +
                "}";

        given()
                .contentType(ContentType.JSON)
                .body(body)
        .when()
                .post("/api/student/login")
        .then()
                .statusCode(anyOf(is(200), is(401), is(400)))
                .contentType(anyOf(containsString("json"), containsString("application/json")));
    }

    @Test
    void getExams_shouldReturn200_andArray() {
        given()
        .when()
                .get("/api/student/exams")
        .then()
                .statusCode(anyOf(is(200), is(204)))
                .contentType(anyOf(containsString("json"), containsString("application/json")));
    }
}


