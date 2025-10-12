import React, { useEffect, useState } from 'react'
import { deleteQuestion, listQuestions } from '../../../services/QuestionService'
import { listExams } from '../../../services/ExamService'
import QuestionComponent from './QuestionComponent'
import { useNavigate } from 'react-router-dom'
import NavbarAdmin from '../../../components/common/NavBar/NavbarAdmin'
import SlidebarAdmin from '../../../components/common/SlidebarAdmin/SlidebarAdmin'

const ListQuestionComponent = () => {
  const [questions, setQuestions] = useState([])
  const [exams, setExams] = useState([])
  const [selectedExamId, setSelectedExamId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState(null)

  const navigator = useNavigate()

  useEffect(() => {
    getAllQuestions()
    getAllExams()
  }, [])

  function getAllQuestions() {
    listQuestions()
      .then((response) => {
        setQuestions(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getAllExams() {
    listExams()
      .then((response) => {
        setExams(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function openModal(questionId = null) {
    setSelectedQuestionId(questionId)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setSelectedQuestionId(null)
    getAllQuestions()
  }

  function removeQuestion(questionId) {
    deleteQuestion(questionId)
      .then(() => {
        getAllQuestions()
      })
      .catch((error) => {
        console.error(error)
      })
  }


  // Filter questions by selected exam
  const filteredQuestions = selectedExamId 
    ? questions.filter(question => question.examId === parseInt(selectedExamId))
    : questions

  return (
    <>
    <NavbarAdmin/>
    <div className="vh-100 d-flex flex-column">
  

      <div className="d-flex flex-grow-1">
        <SlidebarAdmin/>
        <div className="container-fluid p-4">
          <h2 className="text-center">List of Questions</h2>
          
          {/* Filter and Add Question Row */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <label className="form-label me-2">Filter by Exam:</label>
              <select
                className="form-select"
                style={{ width: '250px' }}
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
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => openModal()}
            >
              Add Question
            </button>
          </div>

          <table className="table table-striped table-bordered">
            <thead className='table-dark'>
              <tr>
                <th>Question Id</th>
                <th>Exam Title</th>
                <th>Question Text</th>
                <th>Option A</th>
                <th>Option B</th>
                <th>Option C</th>
                <th>Option D</th>
                <th>Correct Option</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredQuestions.map((question) => (
                <tr key={question.questionId}>
                  <td>{question.questionId}</td>
                  <td>
                    <span className="text">
                      {question.examTitle || 'No Exam'}
                    </span>
                  </td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {question.questionText}
                  </td>
                  <td>{question.optionA}</td>
                  <td>{question.optionB}</td>
                  <td>{question.optionC}</td>
                  <td>{question.optionD}</td>
                  <td>
                    <span className="text">
                      {question.correctOption}
                    </span>
                  </td>
                  <td>{question.createdAt ? new Date(question.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-primary info btn-sm me-2"
                      onClick={() => openModal(question.questionId)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeQuestion(question.questionId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredQuestions.length === 0 && (
            <div className="text-center mt-4">
              <p className="text-muted">
                {selectedExamId ? 'No questions found for selected exam.' : 'No questions available.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Popup */}
      {showModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-body">
                  <QuestionComponent
                    questionId={selectedQuestionId}
                    onClose={closeModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default ListQuestionComponent