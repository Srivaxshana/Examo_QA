import React, { useState, useEffect } from 'react'
import { getAllExamResults, getResultsByExamId, deleteResult } from '../../../services/AdminResultService'
import { listExams } from '../../../services/ExamService'
import { useNavigate } from 'react-router-dom'
import ResultDetailModal from './ResultDetailModal'
import NavbarAdmin from '../../../components/common/NavBar/NavbarAdmin'
import SlidebarAdmin from '../../../components/common/SlidebarAdmin/SlidebarAdmin'

const AdminResultsComponent = () => {
  const [results, setResults] = useState([])
  const [exams, setExams] = useState([])
  const [selectedExamId, setSelectedExamId] = useState('')
  const [loading, setLoading] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedResultId, setSelectedResultId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'completedAt', direction: 'desc' })

  const navigate = useNavigate()

  useEffect(() => {
    loadExams()
    loadResults()
  }, [])

  const loadExams = () => {
    listExams()
      .then((response) => {
        setExams(response.data)
      })
      .catch((error) => {
        console.error('Error loading exams:', error)
      })
  }

  const loadResults = () => {
    setLoading(true)
    if (selectedExamId) {
      getResultsByExamId(selectedExamId)
        .then((response) => {
          setResults(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error loading results:', error)
          setLoading(false)
        })
    } else {
      getAllExamResults()
        .then((response) => {
          setResults(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error loading results:', error)
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    loadResults()
  }, [selectedExamId])

  const handleDeleteResult = (resultId) => {
    if (window.confirm('Are you sure you want to delete this result? This action cannot be undone.')) {
      deleteResult(resultId)
        .then(() => {
          loadResults()
        })
        .catch((error) => {
          console.error('Error deleting result:', error)
          alert('Error deleting result. Please try again.')
        })
    }
  }

  const openDetailModal = (resultId) => {
    setSelectedResultId(resultId)
    setShowDetailModal(true)
  }

  const closeDetailModal = () => {
    setShowDetailModal(false)
    setSelectedResultId(null)
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

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortedResults = () => {
    let filteredResults = results.filter(result => 
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.examTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return filteredResults.sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
      }
    })
  }


  const sortedResults = getSortedResults()

  return (
    <>
    <NavbarAdmin/>
    <div className="vh-100 d-flex flex-column">
      
      <div className="d-flex flex-grow-1">
        <SlidebarAdmin/>
        
        <div className="container-fluid p-4">
          <h2 className="text-center">Exam Results </h2>

          
         
            <div className="card-body mb-4">
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label className="form-label">Filter by Exam</label>
                  <select
                    className="form-select"
                    value={selectedExamId}
                    onChange={(e) => setSelectedExamId(e.target.value)}
                  >
                    <option value="">All Exams</option>
                    {exams.map((exam) => (
                      <option key={exam.examId} value={exam.examId}>
                        {exam.title} - {exam.subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Search Students/Exams</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, or exam title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => {
                        setSelectedExamId('')
                        setSearchTerm('')
                      }}
                    >
                      Clear Filters
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={loadResults}
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
    

          {/* Results  */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-3">
              <div className="card text-center border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">{sortedResults.length}</h5>
                  <p className="card-text">Total Results</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center border-success">
                <div className="card-body">
                  <h5 className="card-title text-success">
                    {sortedResults.filter(r => r.percentage >= 45).length}
                  </h5>
                  <p className="card-text">Passed (≥45%)</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center border-danger">
                <div className="card-body">
                  <h5 className="card-title text-danger">
                    {sortedResults.filter(r => r.percentage < 45).length}
                  </h5>
                  <p className="card-text">Failed (&lt;45%)</p>
                </div>
              </div>
            </div>
          </div>

          {/* results  */}
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            
              <div className="card-body">
                
                  <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                      <tr>
                        <th 
                          scope="col" 
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('completedAt')}
                        >
                          Date/Time
                          {sortConfig.key === 'completedAt' && 
                            <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                          }
                        </th>
                        <th 
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('studentName')}
                        >
                          Student
                         
                        </th>
                        <th 
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('examTitle')}
                        >
                          Exam
                        </th>
                        <th 
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('percentage')}
                        >
                          Score
                          {sortConfig.key === 'percentage' && 
                            <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                          }
                        </th>
                        <th scope="col">Grade</th>
                        <th scope="col">Time</th>
                        {/* <th scope="col">Performance</th> */}
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedResults.map((result) => (
                        <tr key={result.resultId}>
                          <td>
                            <small>
                              {new Date(result.completedAt).toLocaleDateString()}<br/>
                              {new Date(result.completedAt).toLocaleTimeString()}
                            </small>
                          </td>
                          <td>
                            <div>
                              <strong>{result.studentName}</strong><br/>
                              <small className="text-muted">{result.studentEmail}</small>
                            </div>
                          </td>
                          <td>
                            <div>
                              <strong>{result.examTitle}</strong><br/>
                              <small className="text-muted">{result.examSubject}</small>
                            </div>
                          </td>
                          <td>
                            <div>
                              <strong>{result.score}/{result.maxScore}</strong><br/>
                              <small className="text-muted">{result.percentage.toFixed(1)}%</small>
                            </div>
                          </td>
                          <td>
                            <span className={`badge bg-${getGradeColor(result.grade)} fs-6`}>
                              {result.grade}
                            </span>
                          </td>
                          <td>
                            <div>
                              <strong>{result.timeTaken}/{result.examDuration} <br/>mins</strong>
                              
                            </div>
                          </td>
                          <td>
                            <div>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => openDetailModal(result.resultId)}
                              >
                                View Details
                              </button>
                              
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteResult(result.resultId)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {sortedResults.length === 0 && !loading && (
                    <div className="text-center p-4">
                      <p className="text-muted">
                        {selectedExamId || searchTerm 
                          ? 'No results found matching your criteria.' 
                          : 'No exam results available yet.'
                        }
                      </p>
                    </div>
                  )}
                </div>
              
            
          )}
        </div>
      </div>

      {/* Modal */}
      {showDetailModal && (
        <ResultDetailModal
          resultId={selectedResultId}
          onClose={closeDetailModal}
        />
      )}
    </div>
    </>
  )
}

export default AdminResultsComponent