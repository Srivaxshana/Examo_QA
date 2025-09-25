import React, { useEffect, useState } from 'react'
import { listExams } from '../../../services/ExamService'
import { useNavigate } from 'react-router-dom';
import NavbarStudent from '../../../components/common/NavBar/NavbarStudent';


const StudentAllExam = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true)
  

  const navigator = useNavigate();

  useEffect(() => {
    getAllExams()
  }, [])

  function getAllExams() {
    listExams()
      .then((response) => {
        setExams(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

    const takeExam = (examId) => {
    navigator(`/student/exam/${examId}`)
  }

  const filteredExams = exams.filter((exam) =>
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

return (
  <>
  
  <div>
    <NavbarStudent/>
      <div className="container mt-4">
       

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
                    className="btn btn-primary"
                    type="button"
                    style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}
                  >
                    Search {/* <i className="fas fa-search"></i> */}
                  </button>
                </div>
              </div>
            </div>
        </div>




        <div className="row">
          {filteredExams.map((exam) => (
      
            <div className="col-md-4 mb-4" key={exam.examId}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{exam.title}</h5>
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

                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => takeExam(exam.examId)}
                  >
                  Take Exam
                </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        {filteredExams.length === 0 && (
          <p className="text-muted mt-3 text-center">No exams found for this subject.</p>
        )}

      </div>
  </div>
  </>
    
  );
};

export default StudentAllExam
