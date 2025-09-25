import React, { useEffect, useState } from 'react'
import { listExams } from '../../services/ExamService'
import { useNavigate } from 'react-router-dom';


const ExamsCardComponent = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    getAllExams()
  }, [])

  function getAllExams() {
    listExams()
      .then((response) => {
        setExams(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const filteredExams = exams.filter((exam) =>
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const examsToShow = filteredExams.slice(0, 6);

return (
    <div className="container">

      {/* Search bar */}
      <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group shadow-sm rounded">
                <input
                  type="text"
                  className="form-control border-end-0"
                  placeholder="Search by subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}
                />
                <button
                  className="btn btn-dark"
                  type="button"
                  style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}
                >
                  Search 
                </button>
              </div>
            </div>
          </div>
      </div>

      <div className="row">
        {examsToShow.map((exam) => (
          <div className="col-md-4 mb-4" key={exam.examId}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{exam.title}</h3>
                <h6 className="card-subtitle mb-2 text-muted">
                  {exam.subject}
                </h6>
                <p className="card-text">
                  <strong>Duration:</strong> {exam.duration} min
                </p>
                <p className="card-text">
                  <strong>No of Questions:</strong> {exam.questions.length}
                </p>
                <p className="card-text">
                  <strong>Max Marks:</strong> {exam.maxMarks}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {exam.description}
                </p>
                <p className="card-text">
                  <strong>Created At:</strong>{" "}
                  {new Date(exam.createdAt).toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Updated At:</strong>{" "}
                  {new Date(exam.updatedAt).toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  {exam.isActive ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Inactive</span>
                  )}
                </p>


              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExams.length > 6 && (
        <div className="text-center mt-4">
          <button 
            className="btn btn-dark btn-lg"
            onClick={() => navigate('/all-exams')}
          >
            Show All Exams
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamsCardComponent
