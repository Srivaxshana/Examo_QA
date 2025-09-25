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
      <nav className="navbar navbar-dark bg-dark"> 
         <div className="d-flex align-items-center">
          <span className="brand me-4">
            <span style={{ color: '#ffffffff' }}>E</span>xamo
          </span>
          <span className="text-white">Admin Dashboard</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-light btn-sm"
            onClick={loadDashboardStats}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <div className="profile-icon">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
            </svg>
          </div>
          <button className="logout-btn" onClick={() => navigator('/Home')}>
            Log Out
          </button>
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
                    <div className="card-body ">
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="stats-count display-6 fw-bold">
                            {card.count}
                          </div>
                          <div className="stats-title h6">
                            {card.title}
                          </div>
                        </div>
                        <div className="stats-icon" style={{ fontSize: '2rem', opacity: 0.8 }}>
                          {card.icon}
                        </div>
                      </div>
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