import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { listExams } from '../../services/ExamService'

const AllExamsComponent = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

    const goToHome = () => {
    navigate("/Home"); 
  };

  
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

return (
  
   <div>
          <nav className="navbar navbar-expand-lg  bg-dark px-3 fs-5 fixed-top">
                  <img 
                    src="/images/icon.png" 
                    alt="Team Member" 

                    width="200"
                    height="75"
                    style={{objectFit: 'cover'}}
                  />
                <div className="d-flex align-items-center" ></div>
                {/* <h2><a className="navbar-brand navbar-dark fw-bold fs-3">Examo</a></h2> */}
                <div className="justify-content-center" >

                  <button type="button" className="btn btn-dark ms-2" onClick={() => navigate('/admin-login')} ><h5>Admin</h5></button>
                  <button type="button" className="btn btn-dark"  onClick={() => navigate('/student/login')}> <h5>Student</h5> </button>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <button type="button" className="btn btn-dark"  onClick={goToHome} ><h5> Home </h5></button>
                </div>
          </nav>
 
          <div className="container mt-4">
          

            {/* Search box */}

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

            {filteredExams.length === 0 && (
              <p className="text-muted mt-3 text-center">No exams found for this subject.</p>
            )}

          </div>
  </div>
  
  );
};

export default AllExamsComponent
