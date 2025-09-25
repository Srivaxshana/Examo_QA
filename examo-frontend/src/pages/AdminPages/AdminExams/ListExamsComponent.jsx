import React,{useEffect, useState} from 'react'
import { deleteExam,listExams } from '../../../services/ExamService'
import { ExamComponent } from './ExamComponent'
import { useNavigate } from 'react-router-dom'
import NavbarAdmin from '../../../components/common/NavBar/NavbarAdmin'
import SlidebarAdmin from '../../../components/common/SlidebarAdmin/SlidebarAdmin'

const ListExamsComponent = () => {
    const [ exams , setExams] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedExamId, setSelectedExamId] = useState(null)

    const navigator = useNavigate();

     useEffect(() => {
            getAllExams();
        }, [])

    function  getAllExams() {
        listExams().then((response )=>{
            setExams(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    function openModal(examId = null) {
        setSelectedExamId(examId)
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
        setSelectedExamId(null)
        getAllExams()
    }

    function removeExam(examId) {
        deleteExam(examId).then(() => {
            getAllExams();
        }).catch(error => {
            console.error(error);
        })
    } 

    

  return (
    <>
    <NavbarAdmin/>
     <div className="vh-100 d-flex flex-column">

            <div className="d-flex flex-grow-1">
             <SlidebarAdmin/>

                <div className="container-fluid p-4">
                    
                        <h2 className="text-center">List of Exams</h2>
                        <button type="button" className="btn btn-dark mb-3" onClick={() => openModal()}>Add Exam</button>
                        <div className="row">
                            {exams.map(exam => (
                                <div className="col-md-4 mb-4" key={exam.examId}>
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">{exam.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{exam.subject}</h6>
                                            <p className="card-text"><strong>Duration:</strong> {exam.duration} min</p>
                                            <p className="card-text"><strong>No of Questions:</strong> {exam.questions.length} </p>
                                            <p className="card-text"><strong>Max Marks:</strong> {exam.maxMarks}</p>
                                            <p className="card-text"><strong>Description:</strong> {exam.description}</p>
                                            <p className="card-text">
                                                <strong>Created At:</strong>{' '}
                                                {exam.createdAt ? new Date(exam.createdAt).toLocaleString() : 'N/A'}
                                                </p>
                                            <p className="card-text">
                                                <strong>Updated At:</strong>{' '}
                                                {exam.updatedAt ? new Date(exam.updatedAt).toLocaleString() : 'N/A'}
                                                </p>

                                            <p className="card-text">
                                                <strong>Status:</strong> {exam.isActive ? (
                                                    <span className="badge bg-success">Active</span>
                                                ) : (
                                                    <span className="badge bg-secondary">Inactive</span>
                                                )}
                                            </p>
                                            <button className="btn btn-primary me-2" onClick={() => openModal(exam.examId)}>Edit</button>
                                            <button className="btn btn-danger"  onClick={() => removeExam(exam.examId)}>Delete</button>
                                                
                                        </div>

                                    </div>                               
                                </div>
                            ))}
                        </div>
                            
                    </div>
                
            
            </div>

            {/*  Modal */}
            {showModal && (
                    <>
                        <div className="modal fade show d-block " tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <ExamComponent examId={selectedExamId} onClose={closeModal} />
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

export default ListExamsComponent