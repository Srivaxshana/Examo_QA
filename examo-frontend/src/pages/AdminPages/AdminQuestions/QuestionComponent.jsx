import React, { useEffect, useState } from 'react'
import { createQuestion, getQuestion, updateQuestion } from '../../../services/QuestionService'
import { listExams } from '../../../services/ExamService'

const QuestionComponent = ({ questionId, onClose }) => {
  const [questionText, setQuestionText] = useState('')
  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [optionC, setOptionC] = useState('')
  const [optionD, setOptionD] = useState('')
  const [correctOption, setCorrectOption] = useState('')

  const [examId, setExamId] = useState('')
  const [exams, setExams] = useState([])

  const [errors, setErrors] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
    examId: ''
  })

  useEffect(() => {

    loadExams()

    if (questionId) {
      getQuestion(questionId)
        .then((response) => {
          setQuestionText(response.data.questionText)
          setOptionA(response.data.optionA)
          setOptionB(response.data.optionB)
          setOptionC(response.data.optionC)
          setOptionD(response.data.optionD)
          setCorrectOption(response.data.correctOption)
          setExamId(response.data.examId || '')
        })
        .catch(console.error)
    }
  }, [questionId])

    function loadExams() {
    listExams()
      .then((response) => {
             // Filter only active exams
        // const activeExams = response.data.filter(exam => exam.isActive)
        // setExams(activeExams)
        setExams(response.data)

      })
      .catch((error) => {
        console.error('Error loading exams:', error)
      })
  }


  function validateForm() {
    let valid = true
    const errorsCopy = { ...errors }

    errorsCopy.questionText = questionText.trim()
      ? ''
      : 'Question text is required'
    errorsCopy.optionA = optionA.trim() ? '' : 'Option A is required'
    errorsCopy.optionB = optionB.trim() ? '' : 'Option B is required'
    errorsCopy.optionC = optionC.trim() ? '' : 'Option C is required'
    errorsCopy.optionD = optionD.trim() ? '' : 'Option D is required'
    errorsCopy.correctOption = correctOption.trim()
      ? ''
      : 'Correct option is required'

      errorsCopy.examId = examId ? '' : 'Exam selection is required'

    setErrors(errorsCopy)
    return Object.values(errorsCopy).every((e) => e === '')
  }

  function saveOrUpdateQuestion(e) {
    e.preventDefault()

    if (validateForm()) {
      const question = {
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
        examId: parseInt(examId)
      };

      if (questionId) {
        updateQuestion(questionId, question).then(() => onClose());
      } else {
        createQuestion(question).then(() => onClose());
      }
    }
  }

  return (
    <div>
      <button
        className="btn-close position-absolute top-0 end-0 m-2"
        onClick={onClose}
      ></button>
      <h2 className="text-center">
        {questionId ? 'Update Question' : 'Add Question'}
      </h2>
      <form>

         {/* Exam Selection */}
        <div className="form-group mb-2">
          <label className="form-label">Select Exam</label>
          <select
            value={examId}
            className={`form-control ${errors.examId ? 'is-invalid' : ''}`}
            onChange={(e) => setExamId(e.target.value)}
          >
            <option value="">Select an Exam</option>
            {exams.map((exam) => (
              <option key={exam.examId} value={exam.examId}>
                {exam.title} - {exam.subject}
              </option>
            ))}
          </select>
          {errors.examId && (
            <div className="invalid-feedback">{errors.examId}</div>
          )}
        </div>
        
        {/* Question Text */}
        <div className="form-group mb-2">
          <label className="form-label"> Question Text </label>
          <textarea
            placeholder="Enter Question"
            value={questionText}
            className={`form-control ${
              errors.questionText ? 'is-invalid' : ''
            }`}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          {errors.questionText && (
            <div className="invalid-feedback">{errors.questionText}</div>
          )}
        </div>

        {/* Options */}
        <div className="form-group mb-2">
          <label className="form-label"> Option A </label>
          <input
            type="text"
            placeholder="Enter Option A"
            value={optionA}
            className={`form-control ${errors.optionA ? 'is-invalid' : ''}`}
            onChange={(e) => setOptionA(e.target.value)}
          />
          {errors.optionA && (
            <div className="invalid-feedback">{errors.optionA}</div>
          )}
        </div>

        <div className="form-group mb-2">
          <label className="form-label"> Option B </label>
          <input
            type="text"
            placeholder="Enter Option B"
            value={optionB}
            className={`form-control ${errors.optionB ? 'is-invalid' : ''}`}
            onChange={(e) => setOptionB(e.target.value)}
          />
          {errors.optionB && (
            <div className="invalid-feedback">{errors.optionB}</div>
          )}
        </div>

        <div className="form-group mb-2">
          <label className="form-label"> Option C </label>
          <input
            type="text"
            placeholder="Enter Option C"
            value={optionC}
            className={`form-control ${errors.optionC ? 'is-invalid' : ''}`}
            onChange={(e) => setOptionC(e.target.value)}
          />
          {errors.optionC && (
            <div className="invalid-feedback">{errors.optionC}</div>
          )}
        </div>

        <div className="form-group mb-2">
          <label className="form-label"> Option D </label>
          <input
            type="text"
            placeholder="Enter Option D"
            value={optionD}
            className={`form-control ${errors.optionD ? 'is-invalid' : ''}`}
            onChange={(e) => setOptionD(e.target.value)}
          />
          {errors.optionD && (
            <div className="invalid-feedback">{errors.optionD}</div>
          )}
        </div>

        
        <div className="form-group mb-2">
          <label className="form-label"> Correct Option </label>
          
          <select
            value={correctOption}
            className={`form-control ${
              errors.correctOption ? 'is-invalid' : ''
            }`}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            <option value="">Select Correct Option</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>



          {errors.correctOption && (
            <div className="invalid-feedback">{errors.correctOption}</div>
          )}
        </div>

        
        <button
          type="button"
          className="btn btn-success"
          onClick={saveOrUpdateQuestion}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default QuestionComponent
