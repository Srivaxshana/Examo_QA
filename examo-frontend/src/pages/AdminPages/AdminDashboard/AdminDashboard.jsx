import React, { useState, useEffect } from 'react'
import './AdminDashboard.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { listExams } from '../../../services/ExamService'
import { listQuestions } from '../../../services/QuestionService'
import { getAllExamResults } from '../../../services/AdminResultService'
import SlidebarAdmin from '../../../components/common/SlidebarAdmin/SlidebarAdmin';
import { listStudents } from '../../../services/StudentService'


const AdminDashboard = () => {

  const location = useLocation();
  const navigator = useNavigate();


  const [stats, setStats] = useState({
    exams: 0,
    questions: 0,
    results: 0,
    uniqueStudents: 0,
    students:0
  })
  
  const [loading, setLoading] = useState(true)



  const sidebarItems = [
    { path: '/admin-dashboard', name: 'Dashboard' ,active: false },
    { path: '/admin-exams',name: 'Exams',active: false },
    { path:'/admin-questions', name: 'Questions' },
    { path:'/admin-results' ,name: 'Results' },
    { path: '/admin-students', name: 'Student', active: false }
  ];


  
  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    try {
      setLoading(true)
      
      
      const [examsResponse, questionsResponse, resultsResponse, studentResponse] = await Promise.all([
        listExams(),
        listQuestions(),
        getAllExamResults(),
        listStudents()
      ])

      
      const uniqueStudents = new Set(resultsResponse.data.map(result => result.studentEmail)).size

      setStats({
        exams: examsResponse.data.length,
        questions: questionsResponse.data.length,
        results: resultsResponse.data.length,
        uniqueStudents: uniqueStudents,
        students:studentResponse.data.length
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
      setLoading(false)
    }
  }

  const statsCards = [
    { 
      title: 'Total Exams', 
      count: loading ? '...' : stats.exams, 
      bgColor: 'bg-secondary',
      path: '/admin-exams'
    },
    { 
      title: 'Total Questions', 
      count: loading ? '...' : stats.questions, 
      bgColor: 'bg-secondary',
      path: '/admin-questions'
    },
    { 
      title: 'Students Participated', 
      count: loading ? '...' : stats.uniqueStudents, 
      bgColor: 'bg-secondary',
      path: '/admin-results'
    },
        { 
      title: 'Students ', 
      count: loading ? '...' : stats.students, 
      bgColor: 'bg-secondary',
      path: '/admin-students'
    },
    { 
      title: 'Total Results', 
      count: loading ? '...' : stats.results, 
      bgColor: 'bg-secondary',
      path: '/admin-results'
    }
  ]

  
  const getAdditionalStats = () => {
    if (loading || stats.results === 0) return null
    
  }



  return (
 
    <div className="vh-100 d-flex flex-column">
      {/* Top Navigation */}
      <nav className="navbar navbar-expand-lg bg-dark px-3 fs-5"> 

        <div className="d-flex align-items-center">
              <img 
                src="/images/icon.png" 
                alt="Team Member" 

                width="200"
                height="50"
                style={{objectFit: 'cover'}}
              />
                <div className="d-flex align-items-center" ></div>
            {/* <h2 className="mb-0">
              <a className="navbar-brand navbar-dark fw-bold fs-3 text-white">
                Examo
              </a>
            </h2> */}
            <span className="text-white ms-3">
              <h5 className="mb-0">Admin Panel</h5>
            </span>
        </div>
        <div className="ms-auto d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-light btn-sm"
            onClick={loadDashboardStats}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          
          <div className="ms-auto d-flex align-items-center gap-3">
            <button className="btn btn-danger btn-sm" onClick={() => navigator('/Home')}>
             <h5> Log Out</h5>
            </button>
          </div>
        </div>
      </nav> 

      <div className="d-flex flex-grow-1">
        <SlidebarAdmin/>

       
        <div className="main-content flex-grow-1 p-4">
          <div className="container-fluid">
           
            <div className="row mb-4">
              <div className="col-12">
                <h2 className='text-center'> Welcome to Admin Dashboard</h2>
                <p className="text-muted">
                  Overview of your examination system
                  {!loading && ` • Last updated: ${new Date().toLocaleString()}`}
                </p>
              </div>
            </div>

            
            <div className="row justify-content-center">
              {statsCards.map((card, index) => (
                <div key={index} className=" col-lg-5 col- mb-5 ">
                  <div 
                    className={`card text-white  ${card.bgColor} h-100`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigator(card.path)}
                  >
                  <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="stats-count display-4 fw-bold mb-2">
                      {card.count}
                    </div>
                    <div className="stats-title h6">
                      {card.title}
                    </div>
                    {card.icon && (
                      <div className="stats-icon mt-2" style={{ fontSize: '2rem', opacity: 0.8 }}>
                        {card.icon}
                      </div>
                    )}
                  </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default AdminDashboard