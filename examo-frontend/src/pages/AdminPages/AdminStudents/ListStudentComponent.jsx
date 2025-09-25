
import React, { useEffect, useState } from 'react'
import { deleteStudent, listStudents } from '../../../services/StudentService'
import StudentComponent from './StudentComponent'
import { useNavigate } from 'react-router-dom'
import NavbarAdmin from '../../../components/common/NavBar/NavbarAdmin'
import SlidebarAdmin from '../../../components/common/SlidebarAdmin/SlidebarAdmin'

const ListStudentComponent = () => {

    const [students, setStudents] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState(null)

    const navigator = useNavigate();

    useEffect(() => {
        getAllStudents();
    }, [])

    function getAllStudents() {
        listStudents().then((response) => {
            setStudents(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    function openModal(studentId = null) {
        setSelectedStudentId(studentId)
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
        setSelectedStudentId(null)
        getAllStudents()
    }

    function removeStudent(studentId) {
        deleteStudent(studentId).then(() => {
            getAllStudents();
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
                <div className='container-fluid p-4'>
                    <h2 className='text-center'>List of Students</h2>
                    <button type="button" className="btn btn-dark mb-3" onClick={() => openModal()}>Add Student</button>

                    <table className='table table-striped table-bordered'>
                        <thead className="table-dark">
                            <tr>
                                <th>Student Id</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>School</th>
                                <th>Grade</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                students.map(student =>
                                    <tr key={student.studentId}>
                                        <td>{student.studentId}</td>
                                        <td>{student.fullName}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phoneNo}</td>
                                        <td>{student.school}</td>
                                        <td>{student.grade}</td>
                                        <td>{student.studentPassword}</td>
                                        <td>
                                            <button className='btn btn-primary info me-2' onClick={() => openModal(student.studentId)}>Edit</button>
                                            <button className='btn btn-danger' onClick={() => removeStudent(student.studentId)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/*Modal */}
            {showModal && (
                    <>
                        <div className="modal fade show d-block " tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <StudentComponent studentId={selectedStudentId} onClose={closeModal} />
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

export default ListStudentComponent
