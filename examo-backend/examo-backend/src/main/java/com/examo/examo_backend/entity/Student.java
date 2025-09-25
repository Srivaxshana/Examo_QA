package com.examo.examo_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="students")
public class Student {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @Column(name="full_name")
    private String fullName;
    @Column(name="email",nullable = false,unique = true)
    private String email;
    @Column(name = "phone_no")
    private String phoneNo;
    @Column(name = "school")
    private String school;
    @Column(name = "grade")
    private String grade;
    @Column(name = "student_password", nullable = false)
    private String studentPassword;

}
