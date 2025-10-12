import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const SlidebarAdmin = () => {

  const navigator = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { path: '/admin-dashboard', name: 'Dashboard'},
    { path: '/admin-exams',name: 'Exams'},
    { path:'/admin-questions',name: 'Questions' },
    { path:'/admin-results' , name: 'Results' },
    { path: '/admin-students', name: 'Student'}
  ];

  return (
        <div className="sidebar"><h5><b>
                {sidebarItems.map((item, index) => (
                    <button
                    key={index}
                    className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => navigator(item.path)}
                    >
                    {item.name}
                    </button>
                ))}
        </b></h5></div>
  )
}

export default SlidebarAdmin