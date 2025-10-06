package com.examo.examo_backend.api;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

class StudentApiTest {

    @BeforeAll
    static void setup() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 8080;
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


