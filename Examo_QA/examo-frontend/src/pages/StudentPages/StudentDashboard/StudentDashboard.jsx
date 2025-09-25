// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import NavbarStudent from '../../../components/common/NavBar/NavbarStudent'

// const StudentDashboard = () => {
//   const navigate = useNavigate()

  


//   return (
//     <div className="vh-100 d-flex flex-column">
//       <NavbarStudent/>

//       {/* Main Content */}
//       <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-8 text-center">
//               <h1 className="display-4 mb-4">Student Dashboard</h1>
//               <p className="lead mb-5">Welcome to your examination portal</p>

//               <div className="row g-4">
                
//                   <div className="card shadow border-dark">
//                     <div className="card-body p-5">
//                       <div className="display-1 text-dark mb-3">
//                         <i className="bi bi-list-check"></i>
//                       </div>
//                       <h3 className="card-title">Available Exams</h3>
//                       <p className="card-text text-muted mb-4">
//                         View and take available exams
//                       </p>
//                       <button 
//                         className="btn btn-dark btn-lg"
//                         onClick={() => navigate('/student-allexam')}
//                       >
//                         View Exams
//                       </button>
//                     </div>
//                   </div>
                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StudentDashboard

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarStudent from '../../../components/common/NavBar/NavbarStudent'

const StudentDashboard = () => {
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if student is logged in
    const storedStudentData = sessionStorage.getItem('studentData')
    if (!storedStudentData) {
      // If no student data, redirect to login
      navigate('/student/login')
      return
    }
    
    try {
      const parsedData = JSON.parse(storedStudentData)
      setStudentData(parsedData)
      setLoading(false)
    } catch (error) {
      console.error('Error parsing student data:', error)
      // If data is corrupted, redirect to login
      navigate('/student/login')
    }
  }, [navigate])

  if (loading) {
    return (
      <div className="vh-100 d-flex flex-column">
        <NavbarStudent />
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return null // This will be handled by the redirect
  }

  return (
    <div className="vh-100 d-flex flex-column">
      <NavbarStudent />
      
      {/* Main Content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              
              <div className="text-center mb-5">
                <h1 className="display-4 mb-3">
                  Welcome back, <span className="text-dark fw-bold">{studentData.fullName}</span>!
                </h1>
                <p className="lead mb-4">Ready to take your exams?</p>
                

              </div> 

              {/* Cards */}
              <div className="row g-4 justify-content-center">
                <div className="col-md-8 col-lg-6">
                  <div className="card shadow border-dark h-100">
                    <div className="card-body p-5 text-center">
                      <div className="display-1 text-dark mb-4">
                        <i className="bi bi-list-check"></i>
                      </div>
                      <h3 className="card-title mb-3">Available Exams</h3>
                      <p className="card-text text-muted mb-4">
                        View and take your assigned exams. Make sure you have a stable internet connection before starting.
                      </p>
                      <button 
                        className="btn btn-dark btn-lg px-4"
                        onClick={() => navigate('/student-allexam')}
                      >
                        View All Exams
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            
            

             
              <div className="mt-4 text-center">
                <small className="text-muted">
                  Logged in as <strong>{studentData.email}</strong> • Session active • 
                  Student ID: {studentData.studentId}
                </small>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard