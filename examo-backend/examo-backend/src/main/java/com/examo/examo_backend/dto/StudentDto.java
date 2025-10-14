//package com.examo.examo_backend.dto;
//
//import jakarta.persistence.Column;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class StudentDto {
//    private Long studentId;
//    private String fullName;
//    private String email;
//    private String phoneNo;
//    private String school;
//    private String grade;
//    private String studentPassword;
//}


//// for QA
package com.examo.examo_backend.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    private Long studentId;


    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Enter a valid email")
    private String email;

    private String phoneNo;
    private String school;
    private String grade;


    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters long") // ✅ Validation added
    private String studentPassword;

}
