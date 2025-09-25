import React, { useState, useEffect } from 'react'
import { getDetailedResult } from '../../../services/AdminResultService'

const ResultDetailModal = ({ resultId, onClose }) => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (resultId) {
      loadDetailedResult()
    }
  }, [resultId])

  const loadDetailedResult = () => {
    getDetailedResult(resultId)
      .then((response) => {
        setResult(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading detailed result:', error)
        setLoading(false)
      })
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'success'
      case 'B': return 'primary'
      case 'C': return 'info'
      case 'S': return 'warning'
      case 'F': return 'danger'
      default: return 'secondary'
    }
  }

  if (loading) {
    return (
      <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center p-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <p>Error loading result details.</p>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Exam Result Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            {/* Student and Exam Info */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card border-primary">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">Student Information</h6>
                  </div>
                  <div className="card-body">
                    <p><strong>Name:</strong> {result.studentName}</p>
                    <p><strong>Email:</strong> {result.studentEmail}</p>
                    <p><strong>Started:</strong> {new Date(result.startedAt).toLocaleString()}</p>
                    <p><strong>Completed:</strong> {new Date(result.completedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card border-secondary">
                  <div className="card-header bg-secondary text-white">
                    <h6 className="mb-0">Exam Information</h6>
                  </div>
                  <div className="card-body">
                    <p><strong>Title:</strong> {result.examTitle}</p>
                    <p><strong>Subject:</strong> {result.examSubject}</p>
                    <p><strong>Duration:</strong> {result.examDuration} minutes</p>
                    <p><strong>Total Questions:</strong> {result.totalQuestions}</p>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Performance Summary</h6>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-2">
                    <div className={`badge bg-${getGradeColor(result.grade)} fs-3 mb-2`}>
                      {result.grade}
                    </div>
                    <p className="small text-muted">Grade</p>
                  </div>
                  <div className="col-md-2">
                    <h4 className="mb-2">{result.score}/{result.maxScore}</h4>
                    <p className="small text-muted">Score</p>
                  </div>
                  <div className="col-md-2">
                    <h4 className="mb-2">{result.percentage.toFixed(1)}%</h4>
                    <p className="small text-muted">Percentage</p>
                  </div>
                  <div className="col-md-2">
                    <h4 className="mb-2">{result.timeTaken}m</h4>
                    <p className="small text-muted">Time Taken</p>
                  </div>
                  <div className="col-md-2">
                    <h4 className="text-success mb-2">{result.correctAnswers}</h4>
                    <p className="small text-muted">Correct</p>
                  </div>
                  <div className="col-md-2">
                    <h4 className="text-danger mb-2">{result.wrongAnswers}</h4>
                    <p className="small text-muted">Wrong</p>
                  </div>
                </div>
                
              
                <div className="mt-3">
                  <div className="progress" style={{ height: '25px' }}>
                    <div
                      className={`progress-bar bg-${getGradeColor(result.grade)}`}
                      role="progressbar"
                      style={{ width: `${result.percentage}%` }}
                    >
                      {result.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">Answer Details</h6>
              </div>
              <div className="card-body">
                {result.detailedAnswers.map((answer, index) => (
                  <div key={answer.questionId} className="mb-4 border-bottom pb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6>Question {index + 1}</h6>
                      <span className={`badge ${answer.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                        {answer.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    
                    <p className="mb-3"><strong>Q:</strong> {answer.questionText}</p>
                    
                    <div className="row">
                      <div className="col-md-8">
                        <div className="options">
                          {['A', 'B', 'C', 'D'].map((option) => {
                            const isCorrect = answer.correctOption === option
                            const isStudentAnswer = answer.studentAnswer === option
                            let className = 'mb-2 p-2 border rounded '
                            
                            if (isCorrect) {
                              className += 'bg-success text-white '
                            } else if (isStudentAnswer && !isCorrect) {
                              className += 'bg-danger text-white '
                            } else {
                              className += 'bg-light '
                            }
                            
                            return (
                              <div key={option} className={className}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span>
                                    <strong>{option})</strong> {answer[`option${option}`]}
                                  </span>
                                  <div>
                                    {isCorrect && <span className="badge bg-light text-success ms-2">✓</span>}
                                    {isStudentAnswer && !isCorrect && <span className="badge bg-light text-danger ms-2">✗</span>}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="card bg-light">
                          <div className="card-body">
                            <p className="small mb-1">
                              <strong>Correct Answer:</strong> {answer.correctOption}
                            </p>
                            <p className="small mb-1">
                              <strong>Student Answer:</strong> {answer.studentAnswer || 'Not Answered'}
                            </p>
                            <p className="small mb-0">
                              <strong>Status:</strong>
                              <span className={`ms-1 ${answer.isCorrect ? 'text-success' : 'text-danger'}`}>
                                {answer.isCorrect ? 'Correct' : answer.studentAnswer ? 'Incorrect' : 'Unanswered'}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => window.print()}
            >
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultDetailModal