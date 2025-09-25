import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExamResult } from '../../../services/StudentExamService'
import NavbarStudent from '../../../components/common/NavBar/NavbarStudent'

const StudentResultComponent = () => {
  const { resultId } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (resultId) {
      loadResult()
    }
  }, [resultId])

  const loadResult = () => {
    getExamResult(resultId)
      .then((response) => {
        setResult(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading result:', error)
        setLoading(false)
      })
  }

  const getGradeColor = (percentage) => {
    if (percentage >= 75) return 'success'
    if (percentage >= 65) return 'primary'
    if (percentage >= 55) return 'info'
    if (percentage >= 45) return 'warning'
    return 'danger'
  }

  const getGradeLetter = (percentage) => {
    if (percentage >= 75) return 'A'
    if (percentage >= 65) return 'B'
    if (percentage >= 55) return 'C'
    if (percentage >= 45) return 'S'
    return 'F'
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

  if (!result) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Result Not Found</h4>
          <p>The requested exam result could not be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
     <NavbarStudent/>
    <div className="container mt-5">
       

      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4">Exam Result</h1>
            <p className="lead"><h5>{result.examTitle}</h5></p>
          </div>

          {/* Result Summary */}
          <div className="card shadow mb-4">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-md-3">
                  <h3 className="text-muted">Student</h3>
                  <p className="lead">{result.studentName}</p>
                  <small className="text-muted">{result.studentEmail}</small>
                </div>
                <div className="col-md-3">
                  <h3 className="text-muted">Score</h3>
                  <h2 className={`text-${getGradeColor(result.percentage)}`}>
                    {result.score}/{result.maxScore}
                  </h2>
                </div>
                <div className="col-md-3">
                  <h3 className="text-muted">Percentage</h3>
                  <h2 className={`text-${getGradeColor(result.percentage)}`}>
                    {result.percentage.toFixed(1)}%
                  </h2>
                </div>
                <div className="col-md-3">
                  <h3 className="text-muted">Grade</h3>
                  <h2 className={`badge bg-${getGradeColor(result.percentage)} fs-1`}>
                    {getGradeLetter(result.percentage)}
                  </h2>
                </div>
              </div>
            </div>
          </div>

 
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Time Taken</h5>
                  <h3 className="text-dark">{result.timeTaken} minutes</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Completed At</h5>
                  <h6 className="text-muted">
                    {new Date(result.completedAt).toLocaleString()}
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <button
              className="btn btn-dark"
              onClick={() => navigate('/student-allexam')}
            >
              Take Another Exam
            </button>
          </div>

          
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default StudentResultComponent