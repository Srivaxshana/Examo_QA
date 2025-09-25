package com.examo.examo_backend.repository;

import com.examo.examo_backend.entity.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    @Query("SELECT er FROM ExamResult er " +
            "JOIN FETCH er.exam " +
            "JOIN FETCH er.studentAnswers sa " +
            "JOIN FETCH sa.question " +
            "ORDER BY er.completedAt DESC")
    List<ExamResult> findAllWithExamAndAnswers();

    @Query("SELECT er FROM ExamResult er " +
            "JOIN FETCH er.exam " +
            "JOIN FETCH er.studentAnswers sa " +
            "JOIN FETCH sa.question " +
            "WHERE er.exam.examId = :examId " +
            "ORDER BY er.completedAt DESC")
    List<ExamResult> findByExamExamIdWithDetails(@Param("examId") Long examId);

    @Query("SELECT er FROM ExamResult er " +
            "JOIN FETCH er.exam " +
            "JOIN FETCH er.studentAnswers sa " +
            "JOIN FETCH sa.question " +
            "WHERE er.resultId = :resultId")
    Optional<ExamResult> findByIdWithAllDetails(@Param("resultId") Long resultId);
}