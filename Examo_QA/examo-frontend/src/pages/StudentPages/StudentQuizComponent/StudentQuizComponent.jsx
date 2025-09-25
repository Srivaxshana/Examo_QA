
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExamForStudent, submitExam } from '../../../services/StudentExamService'
import NavbarStudent from '../../../components/common/NavBar/NavbarStudent'


const StudentQuizComponent = () => {
  const { examId } = useParams()
  const navigate = useNavigate()
  
  const [exam, setExam] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(true)
  const [studentInfo, setStudentInfo] = useState({ name: '', email: '' })
  const [showStudentForm, setShowStudentForm] = useState(true)
  const [startTime, setStartTime] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (examId && !showStudentForm) {
      loadExam()
    }
  }, [examId, showStudentForm])

  useEffect(() => {
    let timer
    if (timeLeft > 0 && !showStudentForm) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit() 
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [timeLeft, showStudentForm])

  const loadExam = () => {
    getExamForStudent(examId)
      .then((response) => {
        const examData = response.data
        setExam(examData)
        setTimeLeft(examData.duration * 60) 
        setStartTime(new Date())
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading exam:', error)
        setLoading(false)
      })
  }

  const handleStudentInfoSubmit = (e) => {
    e.preventDefault()
    if (studentInfo.name && studentInfo.email) {
      setShowStudentForm(false)
    }
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = () => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    const endTime = new Date()
    const timeTaken = Math.round((endTime - startTime) / (1000 * 60)) // in minutes

    const submission = {
      studentName: studentInfo.name,
      studentEmail: studentInfo.email,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer
      })),
      timeTaken,
      startedAt: startTime.toISOString()
    }

    submitExam(examId, submission)
      .then((response) => {
        navigate(`/student/result/${response.data.resultId}`)
      })
      .catch((error) => {
        console.error('Error submitting exam:', error)
        setIsSubmitting(false)
      })
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  if (showStudentForm) {
    return (
    <div>
      <NavbarStudent/>
      <div className="container mt-5">
        
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Student Information</h3>
                <form onSubmit={handleStudentInfoSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={studentInfo.name}
                      onChange={(e) => setStudentInfo(prev => ({...prev, name: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={studentInfo.email}
                      onChange={(e) => setStudentInfo(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Start Exam
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Exam Not Found</h4>
          <p>The requested exam could not be loaded.</p>
        </div>
      </div>
    )
  }

  const question = exam.questions[currentQuestion]

  return (
    <div className="container-fluid vh-100">
        <NavbarStudent/>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
    
      <div className="bg-primary text-white p-3 mb-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <h4 className="mb-0">{exam.title}</h4>
            <small>{exam.subject}</small>
          </div>
          <div className="col-md-4 text-center">
            <h5 className="mb-0">
              Question {currentQuestion + 1} of {exam.questions.length}
            </h5>
          </div>
          <div className="col-md-4 text-end">
            <div className={`h5 mb-0 ${timeLeft < 300 ? 'text-warning' : ''}`}>
              Time: {formatTime(timeLeft)}
            </div>
            <small>Answered: {getAnsweredCount()}/{exam.questions.length}</small>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {/* question  */}
     
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title mb-4">
                Question {currentQuestion + 1}
              </h5>
              <p className="lead mb-4">{question.questionText}</p>

              <div className="row">
                {['A', 'B', 'C', 'D'].map((option) => (
                  <div className="col-12 mb-3" key={option}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question_${question.questionId}`}
                        id={`option_${option}`}
                        value={option}
                        checked={answers[question.questionId] === option}
                        onChange={(e) => handleAnswerChange(question.questionId, e.target.value)}
                      />
                      <label className="form-check-label w-100" htmlFor={`option_${option}`}>
                        <div className="p-3 border rounded bg-light">
                          <strong>{option})</strong> {question[`option${option}`]}
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            
            {currentQuestion === exam.questions.length - 1 ? (
              <button
                className="btn btn-success btn-lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentQuestion(prev => Math.min(exam.questions.length - 1, prev + 1))}
              >
                Next
              </button>
            )}
          </div>
        </div>

        
      </div>

    </div>
  )
}

export default StudentQuizComponent