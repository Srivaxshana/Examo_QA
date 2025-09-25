package com.examo.examo_backend.repository;

import com.examo.examo_backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository  extends JpaRepository<Question, Long> {



    List<Question> findByExamExamId(Long examId);


    @Query("SELECT COUNT(q) FROM Question q WHERE q.exam.examId = :examId")
    Long countByExamId(@Param("examId") Long examId);


    @Query("SELECT q FROM Question q JOIN FETCH q.exam WHERE q.questionId = :questionId")
    Question findByIdWithExam(@Param("questionId") Long questionId);
}
